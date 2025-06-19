const express = require("express")
const app = express()
const path = require('path');
const db = require('./db');
app.use(express.urlencoded({ extended: true })); // Para interpretar dados de formulários




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

app.post("/cadastrar/usuario", (req, res) => {
  const { nome, email, senha, cpf } = req.body;

  const sql = "INSERT INTO usuarios (usuario_nome, usuario_email, usuario_senha, usuario_cpf) VALUES (?, ?, ?, ?)";
  
  db.query(sql, [nome, email, senha, cpf], (err, result) => {
    if (err) {
      console.error("Erro ao inserir:", err);
      res.status(500).send("Erro no servidor");
      return;
    }


    // Redireciona para a tela inicial para mostrar o dado registrado
    res.redirect("/dados");
  });
});


 
app.listen(3000) 