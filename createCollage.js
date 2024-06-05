const Jimp = require("jimp");
const path = require("path");

const overlayPath = path.join(__dirname, "overlay.png"); // Caminho da imagem overlay
const outputPath = path.join(__dirname, "collage.png"); // Salva na mesma pasta onde o script está localizado

async function createCollage(modelName) {
  console.log(1, "criando paths");
  const thumbnailsDir = path.join(
    __dirname,
    "src",
    "data",
    modelName,
    "thumbnails"
  );
  const imagePaths = [];

  console.log(2, "criando images paths");

  for (let index = 1; index <= 4; index += 1) {
    const imgPath = `${thumbnailsDir}/${index}.jpg`;
    imagePaths.push(imgPath);
  }

  console.log(3, "iniciando collage");

  const collageSize = 600; // Define o tamanho da colagem
  const halfSize = collageSize / 2;
  const overlaySize = collageSize * 0.2; // Define o tamanho da imagem overlay (20% da colagem)

  // Cria uma nova imagem vazia para a colagem
  const collage = new Jimp(collageSize, collageSize, 0xffffffff);

  const images = await Promise.all(imagePaths.map((path) => Jimp.read(path)));
  const overlay = await Jimp.read(overlayPath); // Lê a imagem overlay

  images.forEach((img, index) => {
    const minSize = Math.min(img.bitmap.width, img.bitmap.height);

    // Cortar a imagem para ser quadrada
    img.crop(
      (img.bitmap.width - minSize) / 2,
      (img.bitmap.height - minSize) / 2,
      minSize,
      minSize
    );

    // Redimensionar para caber no quadrante
    img.resize(halfSize, halfSize);

    // Posicionar a imagem no quadrante correspondente
    switch (index) {
      case 0:
        collage.composite(img, 0, 0); // Top-left
        break;
      case 1:
        collage.composite(img, halfSize, 0); // Top-right
        break;
      case 2:
        collage.composite(img, 0, halfSize); // Bottom-left
        break;
      case 3:
        collage.composite(img, halfSize, halfSize); // Bottom-right
        break;
      default:
        return;
    }
  });

  // Redimensionar e centralizar a imagem overlay
  overlay.resize(overlaySize, overlaySize);
  const centerX = (collageSize - overlaySize) / 2;
  const centerY = (collageSize - overlaySize) / 2;
  collage.composite(overlay, centerX, centerY, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacitySource: 1,
    opacityDest: 1,
  });

  // Salva a colagem como um arquivo JPEG
  await collage.quality(100).writeAsync(outputPath);

  console.log(`Collage saved to ${outputPath}`);
}

module.exports = { createCollage };
