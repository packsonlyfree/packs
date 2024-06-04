const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(__dirname, "src/data");
const outputDir = path.join(__dirname, "src/data");

const convertImagesToWebP = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      fs.stat(fullPath, (err, stats) => {
        if (err) {
          console.error("Error stating file:", err);
          return;
        }

        if (stats.isDirectory()) {
          convertImagesToWebP(fullPath);
        } else if (path.extname(fullPath).toLowerCase() === ".jpg") {
          const outputFilePath = path.join(
            outputDir,
            path.relative(inputDir, fullPath).replace(".jpg", ".webp")
          );

          sharp(fullPath)
            .toFormat("webp")
            .toFile(outputFilePath, (err) => {
              if (err) {
                console.error("Error converting image:", err);
              } else {
                console.log("Converted:", fullPath, "to", outputFilePath);
                fs.unlink(fullPath, (err) => {
                  if (err) {
                    console.error("Error deleting original JPEG file:", err);
                  } else {
                    console.log("Deleted original JPEG file:", fullPath);
                  }
                });
              }
            });
        }
      });
    });
  });
};

convertImagesToWebP(inputDir);
