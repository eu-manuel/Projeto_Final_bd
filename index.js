const express = require("express")
const app = express()
const path = require('path');
const db = require('./db');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get("/", (req, res) => {
  res.render('frontpage', {
    nome: "Manu",
    frutas: ["Maçã", "Banana", "Uva"]
  });
});



app.get('/dados', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    // Envia os dados para o navegador ou para o EJS
    res.render('frontpage', { dados: results });
  });
});



 
app.listen(3000) 