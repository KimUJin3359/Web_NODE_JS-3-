const express = require('express');
const app = express();
const { pool } = require("./mysql");
const PORT = 8000;

//for post
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    return res.json({ data: "hello world" });
});

app.get("/:id", async (req, res) => {
    const data = await pool.query("SELECT * FROM USER;");
    return res.json({ data: data });
})

app.listen(PORT, () => { console.log(`port : ${PORT}`) });