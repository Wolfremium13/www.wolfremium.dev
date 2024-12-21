import sharp from "sharp";
import fs from "fs";
import path from "path";

const publicFolder = path.join(__dirname, "../../public/layout");
const inputFolder = path.join(publicFolder);
const outputFolder = path.join(publicFolder);

fs.readdir(inputFolder, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    files.forEach((file) => {
        if (file.endsWith(".jpg") || file.endsWith(".png")) {
            const fileName = file.split(".")[0];
            sharp(`${inputFolder}/${file}`)
                .webp()
                .toFile(`${outputFolder}/${fileName}.webp`, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
        }
    });
});