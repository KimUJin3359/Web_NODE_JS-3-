const express = require('express');
const app = express();
const { pool } = require("./mysql");
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
    const data = await pool.query("SELECT * FROM order_lists;");
    return res.json({ data: data[0] });
});

app.post("/", async (req, res) => {
    const body = req.body;
    const date = new Date();
    try {
        const query = await pool.query("INSERT INTO order_lists SET ?", [
            { item: body.item, type: body.type, createdAt: date, updatedAt: date },
        ]);
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
});

app.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const date = new Date();
    try {
        if (body.item) {
            const query = await pool.query("UPDATE order_lists SET item = ? WHERE id = ?", [
                body.item,
                id
            ]);
        }
        if (body.type) {
            const query = await pool.query("UPDATE order_lists SET type = ? WHERE id = ?", [
                body.type,
                id
            ])
        }
        const update_update = await pool.query("UPDATE order_lists SET updatedAt = ? WHERE id = ?", [
            date,
            id
        ])
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
});

app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = await pool.query("DELETE FROM order_lists WHERE id = ?", [id]);
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
})

app.listen(PORT, () => console.log(`PORT : ${PORT}`));