const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs-extra");
const path = require("path");
const convert = require("./convertToWebp");

// Substitua pelo token do seu bot
const token = "7229250165:AAHSM1_RqHxwJxEIdyFcyJpmWVyXMm0ST0U";
const bot = new TelegramBot(token, { polling: true });

// Definição das variáveis globais
let authenticatedUsers = new Set();
let userSession = {};

const PASSWORD = "io";

let thumbs = [];

const channelId = "-1002091345032";
// const channelId = "-1002158434567" //Test

const configureXMessage = async (chatId, model) => {
  const { name, site, link } = model;
  const message = `🍑 ${name} ${
    site.charAt(0).toUpperCase() + site.substring(1)
  } Completo - MEGA\n${link}\n\n🚀 Canal do Telegram:\nhttps://t.me/+V6Kyta4xTeFmZGYx`;
  
  await bot.sendMessage(chatId, message);
};

const sendModelImages = async (model) => {
  const media = [];
  for (let i = 0; i < thumbs.length; i += 1) {
    const caption = i === 0 ? `🍑 ${model.name}\n\n${model.link}` : "";
    media.push({
      type: "photo",
      media: thumbs[i],
      caption,
    });
  }

  console.log(media);
  await bot.sendMediaGroup(channelId, media);
};

const askNextQuestion = (chatId, questionIndex, currentValue) => {
  const questions = [
    "Pergunta 1 de 5 | 👩🏻 Nome da modelo:",
    "Pergunta 2 de 5 | 👤 @ da modelo:",
    "Pergunta 3 de 5 | 💎 Plataforma da modelo:",
    "Pergunta 4 de 5 | 🔗 Link da modelo:",
    "Pergunta 5 de 5 | 📸 Por favor, envie 4 fotos da modelo de uma vez (em JPG):",
  ];

  const question = questions[questionIndex];
  if (currentValue !== undefined) {
    bot.sendMessage(chatId, `Você respondeu: ${currentValue}`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Confirmar", callback_data: "confirm" }],
          [{ text: "Editar", callback_data: "edit" }],
        ],
      },
    });
  } else {
    bot.sendMessage(chatId, question);
  }
};

const processResponse = async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const userId = msg.from.id;

  if (!authenticatedUsers.has(userId)) {
    if (text === PASSWORD) {
      authenticatedUsers.add(userId);
      userSession[userId] = { stage: 1, model: {}, edit: false };
      bot.sendMessage(chatId, "Autenticado com sucesso!");
      bot.sendMessage(chatId, "Pergunta 1 de 5 | 👩🏻 Nome da modelo:");
    } else {
      bot.sendMessage(chatId, "Senha incorreta. Tente novamente.");
    }
    return;
  }

  const session = userSession[userId];

  if (session.edit) {
    session.edit = false;
    processStage(chatId, text, session.stage);
  } else {
    if (session.stage === 5) {
      console.log(111, msg.photo.length);
      // if (!session.model.photos) {
      //   session.model.photos = [];
      // }
      if (msg.photo) {
        const thumbnailsDir = path.join(
          __dirname,
          "src",
          "data",
          session.model.name,
          "thumbnails"
        );
        fs.ensureDirSync(thumbnailsDir);
        thumbs.push(msg.photo[msg.photo.length - 1].file_id);

        if (thumbs.length === 4) {
          const photoPromises = thumbs.map((photo, index) => {
            return bot.downloadFile(photo, thumbnailsDir).then((tempPath) => {
              const destPath = path.join(thumbnailsDir, `${index + 1}.jpg`);
              fs.renameSync(tempPath, destPath);
              return destPath;
            });
          });
          await Promise.all(photoPromises);
          convert();
          await sendModelImages(session.model);
          thumbs = [];
          createModelFiles(session.model, chatId);
          bot.sendMessage(
            chatId,
            "Informações e fotos recebidas e salvas com sucesso!"
          );
          await configureXMessage(chatId, session.model);
          authenticatedUsers.delete(userId);
          delete userSession[userId];
        }
      } else {
        bot.sendMessage(
          chatId,
          "Por favor, envie exatamente 4 fotos de uma vez."
        );
      }
    } else {
      processStage(chatId, text, session.stage);
    }
  }
};

const processStage = (chatId, text, stage) => {
  const userId = chatId;
  const session = userSession[userId];

  switch (stage) {
    case 1:
      session.model.name = text;
      askNextQuestion(chatId, stage, session.model.name);
      break;
    case 2:
      session.model.nick = text;
      askNextQuestion(chatId, stage, session.model.nick);
      break;
    case 3:
      session.model.site = text;
      askNextQuestion(chatId, stage, session.model.site);
      break;
    case 4:
      session.model.link = text;
      askNextQuestion(chatId, stage, session.model.link);
      break;
    case 5:
      session.model.photos = [];
      askNextQuestion(chatId, stage);
      break;
    default:
      bot.sendMessage(chatId, "Erro na sequência de perguntas.");
  }
};

const createModelFiles = (model) => {
  const modelDir = path.join(__dirname, "src", "data", model.name);
  fs.ensureDirSync(modelDir);

  const indexPath = path.join(modelDir, "index.js");
  const thumbnailsDir = path.join(modelDir, "thumbnails");
  fs.ensureDirSync(thumbnailsDir);

  const indexContent = `import tmb1 from "./thumbnails/1.webp";
import tmb2 from "./thumbnails/2.webp";
import tmb3 from "./thumbnails/3.webp";
import tmb4 from "./thumbnails/4.webp";

const ${model.name.replace(/\s+/g, "")} = {
  date: "${new Date().toISOString().split("T")[0]}",
  link: "${model.link}",
  name: "${model.name}",
  nick: "${model.nick}",
  site: "${model.site}",
  thumbnail: [tmb1, tmb2, tmb3, tmb4],
};

export default ${model.name.replace(/\s+/g, "")};`;

  fs.writeFileSync(indexPath, indexContent);
  updateMainIndex(model);
};

const updateMainIndex = (model) => {
  const mainIndexPath = path.join(__dirname, "src", "data", "index.js");
  let mainIndexContent = fs.readFileSync(mainIndexPath, "utf8");

  // Adiciona a nova importação no início do arquivo
  const importLine = `import ${model.name.replace(/\s+/g, "")} from "./${
    model.name
  }";\n`;
  const insertPosition = mainIndexContent.indexOf("\nconst data = [");
  mainIndexContent =
    mainIndexContent.slice(0, insertPosition) +
    importLine +
    mainIndexContent.slice(insertPosition);

  // Adiciona o novo item ao array data
  const dataInsertPosition = mainIndexContent.indexOf("];");
  mainIndexContent =
    mainIndexContent.slice(0, dataInsertPosition) +
    `  ${model.name.replace(/\s+/g, "")},\n` +
    mainIndexContent.slice(dataInsertPosition);

  fs.writeFileSync(mainIndexPath, mainIndexContent);
};

bot.on("message", (msg) => {
  const userId = msg.from.id;
  if (!authenticatedUsers.has(userId) && msg.text) {
    if (msg.text === PASSWORD) {
      authenticatedUsers.add(userId);
      userSession[userId] = { stage: 1, model: {}, edit: false };
      bot.sendMessage(msg.chat.id, "Autenticado com sucesso!");
      bot.sendMessage(msg.chat.id, "Pergunta 1 de 5 | 👩🏻 Nome da modelo:");
    } else {
      bot.sendMessage(msg.chat.id, "Senha incorreta. Tente novamente.");
    }
  } else {
    processResponse(msg);
  }
});

bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const userId = query.from.id;

  if (!authenticatedUsers.has(userId)) {
    bot.answerCallbackQuery(query.id, "Autenticação necessária.");
    return;
  }

  const session = userSession[userId];

  if (query.data === "confirm") {
    session.stage++;
    askNextQuestion(chatId, session.stage - 1);
  } else if (query.data === "edit") {
    session.edit = true;
    askNextQuestion(chatId, session.stage - 1);
  }

  bot.answerCallbackQuery(query.id);
});
