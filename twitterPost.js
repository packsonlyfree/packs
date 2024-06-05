const { TwitterApi } = require('twitter-api-v2');
// const fs = require('fs');
const path = require('path');

// Credenciais da API do Twitter
const client = new TwitterApi({
  appKey: 'VbtI2rOIRzpA2Eio4OzfjtjMB',
  appSecret: 'FddEsBpP9s8WQXkGQCqpbL3YxScq9wzFRDhoX9k6DOtBKjhLKD',
  accessToken: '1792291656382722048-TrmCgMGiKevLh8HzLrFaJo6XRksYb7',
  accessSecret: 'X9jqcQXzE2VAyJqd8fjlCJ71Ak16U7JP0Z8828asb8rJL',
});

async function tweet(model) {
  try {
    // Texto do tweet
    const { name, site, link } = model;
    const caption = `🍑 ${name} ${
      site.charAt(0).toUpperCase() + site.substring(1)
    } Completo - MEGA\n${link}\n\n🚀 Canal do Telegram:\nhttps://t.me/+V6Kyta4xTeFmZGYx`;
    console.log(caption);

    // Caminho das imagens
    const imagePath1 = path.join(__dirname, 'src', 'data', name, 'thumbnails', '1.jpg');
    const imagePath2 = path.join(__dirname, 'src', 'data', name, 'thumbnails', '2.jpg');

    // Carrega as imagens
    const mediaIds = await Promise.all([
      client.v1.uploadMedia(imagePath1),
      client.v1.uploadMedia(imagePath2),
    ]);

    // Posta o tweet com as imagens
    const { data: createdTweet } = await client.v1.tweet(caption, { media_ids: mediaIds });
    console.log('Tweet postado com sucesso:', createdTweet);
  } catch (error) {
    console.error('Erro ao postar o tweet:', error);
  }
}

// Chama a função para postar o tweet
module.exports = tweet;
