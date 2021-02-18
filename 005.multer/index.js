const express = require('express');
const app = express();
//파일 업로드
const multer = require('multer');
//파일 스크립트
const fs = require('fs');
//경로 설정
const path = require('path');
const AdmZip = require('adm-zip');
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

app.post("/upload-multiple", upload.array("many"), (req, res) => {
    console.log(req.files);
})

app.post("/upload-multiple-fields", upload.fields([{ name: "file1" }, { name: "file2" }, { name: "title" }]), (req, res) => {
    console.log(req.files);
})

app.get("/download", async (req, res) => {
    try {
        res.set('Content-Disposition', `attachment; filename=download.png`);
        res.set('Content-Type', 'application/octet-stream');
        //image를 읽을 때 사용함
        const file = fs.createReadStream(`${__dirname}/uploads/test1.jpg`);
        return file.pipe(res);
    } catch (err) {
        console.log(err);
    }
})

app.get("/download-multiple", async (req, res) => {
    try {
        const zip = new AdmZip();

        zip.addLocalFile("./uploads/test.png");
        zip.addLocalFile("./uploads/test1.jpg");
        zip.addLocalFile("./uploads/test2.jpg");

        const willSendThis = zip.toBuffer();

        res.set('Content-Disposition', `attachment; filename=download.zip`);
        res.set('Content-Type', 'application/octet-stream');
        res.send(willSendThis);
    } catch (err) {
        console.log(err);
    }
})

app.listen(PORT, () => console.log(`PORT : ${PORT}`));