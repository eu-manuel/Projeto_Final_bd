const express = require("express");
const app = express();
const path = require('path');
const db = require('./db');
const engine = require('ejs-mate');
const rotas = require("./routeMaps");

// Configura o ejs-mate como o engine do EJS
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true })); // Interpreta formulários
app.use(express.static(path.join(__dirname, 'public'))); // Arquivos estáticos (CSS, JS, etc.)

// Middleware global para deixar as rotas disponíveis no EJS
app.use((req, res, next) => {
  res.locals.rotas = rotas; 
  next();
});



//rota padrão
app.get("/", (req, res) => {
  res.render('frontpage', {
    title: 'tela inicial',
    dados: null 
  });
});


/*

Rotas para criar as paginas de cadastro cadastro

*/

app.get(rotas.CARGOS_LISTAR, (req, res) => {
  db.query('SELECT * FROM cargos', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    // Envia os dados para o navegador ou para o EJS
    res.render('cargos', { 
      title: 'Cadastro de cargos',
      dados: results


     });
  });
});

app.get(rotas.USUARIOS_LISTAR, (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    // Envia os dados para o navegador ou para o EJS
    res.render('usuarios', { 
      title: 'Cadastro de usuarios',
      dados: results
    });
  });
});

app.get(rotas.PROFESSORES_LISTAR, (req, res) => {
  db.query('SELECT * FROM professores', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    // Envia os dados para o navegador ou para o EJS
    res.render('Professores', { 
      title: 'Cadastro de professores',
      dados: results
    });
  });
});




/*

Rotas para registrar no banco de dados

*/


//cadastrar usuario
app.post(rotas.USUARIOS_CADASTRAR, (req, res) => {
  const { nome, email, senha, cpf } = req.body;

  const sql = "INSERT INTO usuarios (usuario_nome, usuario_email, usuario_senha, usuario_cpf) VALUES (?, ?, ?, ?)";
  
  db.query(sql, [nome, email, senha,cpf], (err, result) => {
    if (err) {
      console.error("Erro ao inserir:", err);
      res.status(500).send("Erro no servidor");
      return;
    }


    // Redireciona para a tela inicial para mostrar oque foi registrado
    res.redirect(rotas.USUARIOS_LISTAR);
  });
});


// cadastrar cargo
app.post(rotas.CARGOS_CADASTRAR, (req, res) => {
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

    // Redireciona para a tela inicial para mostrar oque foi registrado
    res.redirect(rotas.CARGOS_LISTAR); 
  });
});

app.post(rotas.PROFESSORES_CADASTRAR, (req, res) => {
  const { professor_usuario_id, professor_formacao, professor_especialidade, professor_cargo_id } = req.body;

  const sql = `
    INSERT INTO professores (professor_usuario_id, professor_formacao, professor_especialidade, professor_cargo_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [professor_usuario_id, professor_formacao, professor_especialidade, professor_cargo_id], (err, result) => {
    if (err) {
      console.error("Erro ao inserir professor:", err);
      res.status(500).send("Erro no servidor");
      return;
    }

    // Redireciona para a listagem de professores
    res.redirect(rotas.PROFESSORES_LISTAR);
  });
});





/*

Rotas para excluir registros na tabela

*/









/*ROTA GENERICA PARA EXCLUIR AINDA NAO IMPLEMENTEI DIREITO


app.post(rotas.CARGOS_EXCLUIR, (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM cargos WHERE cargo_id = ?', [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir cargo:", err);
      return res.status(500).send("Erro no servidor");
    }
    res.redirect('/cargos');
  });
});

*/


app.post(rotas.EXCLUIR, (req, res) => {
  const { tabela, pk, id } = req.params;

  // ⚠️ Validação básica para não deixar excluir qualquer coisa de forma maliciosa
  const tabelasPermitidas = [
          "usuarios",
          "cargos",
          "professores",
          "financeiros",
          "administrativos",
          "cursos",
          "disciplinas",
          "cursos_disciplinas",
          "alunos",
          "turmas",
          "alunos_disciplinas",
          "notas",
          "tipos_pagamentos",
          "pagamentos",
          "aulas",
          "faltas"
]; // Adicione outras tabelas permitidas
  const pksPermitidas = [
        "usuario_id",
        "cargo_id",
        "professor_usuario_id",
        "financeiro_usuario_id",
        "administrativo_usuario_id",
        "curso_id",
        "disciplina_id",
        "PRIMARY KEY (curso_disciplina_curso_id, curso_disciplina_disciplina_id)",
        "aluno_id",
        "turma_id",
        "aluno_disciplina_id",
        "nota_id",
        "tipo_pagamento_id",
        "pagamento_id",
        "aula_id",
        "PRIMARY KEY (falta_aluno_id,falta_aula_id)"
];  // Adicione outras PKs permitidas

  if (!tabelasPermitidas.includes(tabela) || !pksPermitidas.includes(pk)) {
    return res.status(400).send("Operação não permitida");
  }

  const sql = `DELETE FROM ?? WHERE ?? = ?`;
  const params = [tabela, pk, id];

  db.query(sql, params, (err) => {
    if (err) {
      console.error(`Erro ao excluir em ${tabela}:`, err);
      return res.status(500).send("Erro no servidor");
    }
    // Redireciona de acordo com a tabela
    if (tabela === 'cargos') {
      res.redirect('/cargos');
    } else {
      res.redirect('/');
    }
  });
});








/*

rotas para atualizar registro na tabela

*/














app.get('/formulario/:tabela', (req, res) => {
  const { tabela } = req.params;

  const tabelasPermitidas = ['usuarios', 'cargos']; // lista branca
  if (!tabelasPermitidas.includes(tabela)) {
    return res.status(400).send('Tabela não permitida');
  }

  db.query(`DESCRIBE ??`, [tabela], (err, results) => {
    if (err) {
      console.error("Erro ao descrever tabela:", err);
      return res.status(500).send("Erro no servidor");
    }

    res.render('form_gerado', { tabela, colunas: results });
  });
});




 
app.listen(3000) 