const express = require('express');
const app = express();
const { pool } = require('./mysql');
const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM todo;");
        res.render("index", { data: data[0] });
    } catch (err) {
        res.render("error404");
    }
});

app.post('/add', async (req, res) => {
    const { todo } = req.body;
    try {
        const data = await pool.query("INSERT INTO todo SET ?", [
            { todo: todo, checked: false },
        ]);
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
});

app.get("/update/check/:id", async (req, res) => {
    const { id } = req.params;
    const { checked } = req.query;

    try {
        const data = await pool.query("UPDATE todo SET checked = ? WHERE ID = ?", [
            checked, 
            id,
        ]);
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
});

app.get("/update/todo/:id", async (req, res) => {
    const { id } = req.params;
    const { todo } = req.query;

    try {
        const data = await pool.query("UPDATE todo SET todo = ? WHERE ID = ?", [
            todo, 
            id,
        ]);
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }    
})

app.get('/delete/todo/:id', async(req,res) => {
    const {id} = req.params;

    try {
        const data = await pool.query("DELETE FROM todo WHERE ?", [{id}]);
        res.redirect("/");
    } catch(err) {
        console.log(err);
    }
})

app.listen(PORT, () => console.log(`PORT : ${PORT}`));