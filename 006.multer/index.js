const express = require('express');
const app = express();
//파일 업로드
const multer = require('multer');
//파일 스크립트
const fs = require('fs');
//경로 설정
const path = require('path');
const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    console.log(__dirname);
    return res.render('index');
});

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, done) => {
            //성공했을 때
            done(null, "uploads/");
            //실패했을 때
            //done(false, null);
        },
        filename: (req, file, done) => {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

app.post("/upload", upload.single("userfile"), (req, res) => {
    console.log(req.file);
});

app.get("/download", async (req, res) => {
    try {
        res.set('Content-Disposition', `attachment; filename=download.jfif`);
        res.set('Content-Type', 'application/octet-stream');
        //image를 읽을 때 사용함
        const file = fs.createReadStream(`${__dirname}/uploads/download.jfif`);
        return file.pipe(res);
    } catch (err) {
        console.log(err);
    }
});

app.listen(PORT, () => console.log(`PORT : ${PORT}`));