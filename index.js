const express = require("express");
const app = express();
const path = require('path');
const db = require('./db');
const engine = require('ejs-mate');

// Configura o ejs-mate como o engine do EJS
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true })); // Interpreta formulários
app.use(express.static(path.join(__dirname, 'public'))); // Arquivos estáticos (CSS, JS, etc.)

app.get("/", (req, res) => {
  res.render('frontpage', {
    nome: "Manu",
    frutas: ["Maçã", "Banana", "Uva"]
  });
});



app.get('/cargos', (req, res) => {
  db.query('SELECT * FROM cargos', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    // Envia os dados para o navegador ou para o EJS
    res.render('cargos', { 
      title: 'cadastro de cargos',
      dados: results


     });
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

app.post("/cadastrar/cargo", (req, res) => {
  const { nome, salario, setor, carga_horaria } = req.body;

  const sql = `
    INSERT INTO cargos (cargo_nome, cargo_salario, cargo_setor, cargo_carga_horaria_semanal) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [nome, salario, setor, carga_horaria], (err, result) => {
    if (err) {
      console.error("Erro ao inserir cargo:", err);
      res.status(500).send("Erro no servidor");
      return;
    }

    // Redireciona para a página que lista os cargos ou outra que desejar
    res.redirect("/cargos"); 
  });
});



 
app.listen(3000) 