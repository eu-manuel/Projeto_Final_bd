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


app.use('/', usuarioRoutes);
/*
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
*/

app.get(rotas.PROFESSORES_LISTAR, (req, res) => {
  db.query('SELECT * FROM professores', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    // Envia os dados para o navegador ou para o EJS
    res.render('professores', { 
      title: 'Cadastro de professores',
      dados: results
    });
  });
});

app.get(rotas.FINANCEIROS_LISTAR, (req, res) => {
  db.query('SELECT * FROM financeiros', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT em financeiros:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    res.render('financeiros', { 
      title: 'Cadastro de financeiros',
      dados: results
    });
  });
});

app.get(rotas.ADMINISTRATIVOS_LISTAR, (req, res) => {
  db.query('SELECT * FROM administrativos', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT em administrativos:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    res.render('administrativos', { 
      title: 'Cadastro de administrativos',
      dados: results
    });
  });
});

app.get(rotas.CURSOS_LISTAR, (req, res) => {
  db.query('SELECT * FROM cursos', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT em cursos:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    res.render('cursos', { 
      title: 'Cadastro de cursos',
      dados: results
    });
  });
});

app.get(rotas.DISCIPLINAS_LISTAR, (req, res) => {
  db.query('SELECT * FROM disciplinas', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT em disciplinas:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    res.render('disciplinas', { 
      title: 'Cadastro de disciplinas',
      dados: results
    });
  });
});

app.get(rotas.CURSOS_DISCIPLINAS_LISTAR, (req, res) => {
  db.query('SELECT * FROM cursos_disciplinas', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT em cursos_disciplinas:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    res.render('cursos_disciplinas', { 
      title: 'Relacionamento Cursos x Disciplinas',
      dados: results
    });
  });
});

app.get(rotas.ALUNOS_LISTAR, (req, res) => {
  db.query('SELECT * FROM alunos', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT em alunos:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    res.render('alunos', { 
      title: 'Cadastro de alunos',
      dados: results
    });
  });
});

app.get(rotas.TURMAS_LISTAR, (req, res) => {
  db.query('SELECT * FROM turmas', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT em turmas:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    res.render('turmas', { 
      title: 'Cadastro de turmas',
      dados: results
    });
  });
});

app.get(rotas.ALUNOS_DISCIPLINAS_LISTAR, (req, res) => {
  db.query('SELECT * FROM alunos_disciplinas', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT em alunos_disciplinas:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    res.render('alunos_disciplinas', { 
      title: 'Vínculo Alunos x Disciplinas',
      dados: results
    });
  });
});

app.get(rotas.NOTAS_LISTAR, (req, res) => {
  db.query('SELECT * FROM notas', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT em notas:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    res.render('notas', { 
      title: 'Cadastro de notas',
      dados: results
    });
  });
});

app.get(rotas.TIPOS_PAGAMENTOS_LISTAR, (req, res) => {
  db.query('SELECT * FROM tipos_pagamentos', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT em tipos_pagamentos:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    res.render('tipos_pagamentos', { 
      title: 'Cadastro de Tipos de Pagamento',
      dados: results
    });
  });
});

app.get(rotas.PAGAMENTOS_LISTAR, (req, res) => {
  db.query('SELECT * FROM pagamentos', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT em pagamentos:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    res.render('pagamentos', { 
      title: 'Cadastro de Pagamentos',
      dados: results
    });
  });
});

app.get(rotas.AULAS_LISTAR, (req, res) => {
  db.query('SELECT * FROM aulas', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT em aulas:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    res.render('aulas', { 
      title: 'Cadastro de Aulas',
      dados: results
    });
  });
});

app.get(rotas.FALTAS_LISTAR, (req, res) => {
  db.query('SELECT * FROM faltas', (err, results) => {
    if (err) {
      console.error('Erro ao executar SELECT em faltas:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    res.render('faltas', { 
      title: 'Registro de Faltas',
      dados: results
    });
  });
});










/*

Rotas para registrar no banco de dados

*/

/*
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
*/


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

app.post(rotas.FINANCEIROS_CADASTRAR, (req, res) => {
  const { financeiro_usuario_id, financeiro_cargo_id } = req.body;

  const sql = `
    INSERT INTO financeiros (financeiro_usuario_id, financeiro_cargo_id)
    VALUES (?, ?)
  `;

  db.query(sql, [financeiro_usuario_id, financeiro_cargo_id], (err, result) => {
    if (err) {
      console.error("Erro ao inserir financeiro:", err);
      res.status(500).send("Erro no servidor");
      return;
    }

    res.redirect(rotas.FINANCEIROS_LISTAR);
  });
});

app.post(rotas.ADMINISTRATIVOS_CADASTRAR, (req, res) => {
  const { administrativo_usuario_id, administrativo_funcao, administrativo_cargo_id } = req.body;

  const sql = `
    INSERT INTO administrativos (administrativo_usuario_id, administrativo_funcao, administrativo_cargo_id)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [administrativo_usuario_id, administrativo_funcao, administrativo_cargo_id], (err, result) => {
    if (err) {
      console.error("Erro ao inserir administrativo:", err);
      res.status(500).send("Erro no servidor");
      return;
    }

    res.redirect(rotas.ADMINISTRATIVOS_LISTAR);
  });
});

app.post(rotas.CURSOS_CADASTRAR, (req, res) => {
  const { curso_nome, curso_carga_horaria_total } = req.body;

  const sql = `
    INSERT INTO cursos (curso_nome, curso_carga_horaria_total)
    VALUES (?, ?)
  `;

  db.query(sql, [curso_nome, curso_carga_horaria_total], (err, result) => {
    if (err) {
      console.error("Erro ao inserir curso:", err);
      res.status(500).send("Erro no servidor");
      return;
    }

    res.redirect(rotas.CURSOS_LISTAR);
  });
});

app.post(rotas.DISCIPLINAS_CADASTRAR, (req, res) => {
  const { disciplina_nome, disciplina_carga_horaria } = req.body;

  const sql = `
    INSERT INTO disciplinas (disciplina_nome, disciplina_carga_horaria)
    VALUES (?, ?)
  `;

  db.query(sql, [disciplina_nome, disciplina_carga_horaria], (err, result) => {
    if (err) {
      console.error("Erro ao inserir disciplina:", err);
      res.status(500).send("Erro no servidor");
      return;
    }

    res.redirect(rotas.DISCIPLINAS_LISTAR);
  });
});

app.post(rotas.CURSOS_DISCIPLINAS_CADASTRAR, (req, res) => {
  const { curso_disciplina_curso_id, curso_disciplina_disciplina_id } = req.body;

  const sql = `
    INSERT INTO cursos_disciplinas (curso_disciplina_curso_id, curso_disciplina_disciplina_id)
    VALUES (?, ?)
  `;

  db.query(sql, [curso_disciplina_curso_id, curso_disciplina_disciplina_id], (err, result) => {
    if (err) {
      console.error("Erro ao inserir curso-disciplina:", err);
      res.status(500).send("Erro no servidor");
      return;
    }

    res.redirect(rotas.CURSOS_DISCIPLINAS_LISTAR);
  });
});

app.post(rotas.ALUNOS_CADASTRAR, (req, res) => {
  const { aluno_usuario_id, aluno_nome, aluno_cpf, aluno_data_ingresso } = req.body;

  const sql = `
    INSERT INTO alunos (aluno_usuario_id, aluno_nome, aluno_cpf, aluno_data_ingresso)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [aluno_usuario_id, aluno_nome, aluno_cpf, aluno_data_ingresso], (err, result) => {
    if (err) {
      console.error("Erro ao inserir aluno:", err);
      res.status(500).send("Erro no servidor");
      return;
    }

    res.redirect(rotas.ALUNOS_LISTAR);
  });
});

app.post(rotas.TURMAS_CADASTRAR, (req, res) => {
  const { turma_nome, turma_ano_letivo, turma_semestre } = req.body;

  const sql = `
    INSERT INTO turmas (turma_nome, turma_ano_letivo, turma_semestre)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [turma_nome, turma_ano_letivo, turma_semestre], (err, result) => {
    if (err) {
      console.error("Erro ao inserir turma:", err);
      res.status(500).send("Erro no servidor");
      return;
    }

    res.redirect(rotas.TURMAS_LISTAR);
  });
});

app.post(rotas.ALUNOS_DISCIPLINAS_CADASTRAR, (req, res) => {
  const { 
    aluno_disciplina_aluno_id, 
    aluno_disciplina_curso_id, 
    aluno_disciplina_disciplina_id, 
    aluno_disciplina_turma_id, 
    aluno_disciplina_data_matricula, 
    aluno_disciplina_data_conclusao, 
    aluno_disciplina_status 
  } = req.body;

  const sql = `
    INSERT INTO alunos_disciplinas (
      aluno_disciplina_aluno_id, 
      aluno_disciplina_curso_id, 
      aluno_disciplina_disciplina_id, 
      aluno_disciplina_turma_id, 
      aluno_disciplina_data_matricula, 
      aluno_disciplina_data_conclusao, 
      aluno_disciplina_status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    aluno_disciplina_aluno_id, 
    aluno_disciplina_curso_id, 
    aluno_disciplina_disciplina_id, 
    aluno_disciplina_turma_id, 
    aluno_disciplina_data_matricula, 
    aluno_disciplina_data_conclusao || null, 
    aluno_disciplina_status || null
  ], (err, result) => {
    if (err) {
      console.error("Erro ao inserir vínculo aluno-disciplina:", err);
      res.status(500).send("Erro no servidor");
      return;
    }

    res.redirect(rotas.ALUNOS_DISCIPLINAS_LISTAR);
  });
});

app.post(rotas.NOTAS_CADASTRAR, (req, res) => {
  const { nota_aluno_disciplina_id, nota_valor, nota_tipo, nota_data } = req.body;

  const sql = `
    INSERT INTO notas (nota_aluno_disciplina_id, nota_valor, nota_tipo, nota_data)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [
    nota_aluno_disciplina_id,
    nota_valor,
    nota_tipo || null,
    nota_data || null
  ], (err, result) => {
    if (err) {
      console.error("Erro ao inserir nota:", err);
      res.status(500).send("Erro no servidor");
      return;
    }

    res.redirect(rotas.NOTAS_LISTAR);
  });
});

app.post(rotas.TIPOS_PAGAMENTOS_CADASTRAR, (req, res) => {
  const { tipo_pagamento_nome, tipo_pagamento_descricao } = req.body;

  const sql = `
    INSERT INTO tipos_pagamentos (tipo_pagamento_nome, tipo_pagamento_descricao)
    VALUES (?, ?)
  `;

  db.query(sql, [
    tipo_pagamento_nome, 
    tipo_pagamento_descricao || null
  ], (err, result) => {
    if (err) {
      console.error("Erro ao inserir tipo de pagamento:", err);
      res.status(500).send("Erro no servidor");
      return;
    }

    res.redirect(rotas.TIPOS_PAGAMENTOS_LISTAR);
  });
});

app.post(rotas.PAGAMENTOS_CADASTRAR, (req, res) => {
  const {
    pagamento_aluno_disciplina_id,
    pagamento_tipo_pagamento_id,
    pagamento_valor,
    pagamento_data_pagamento,
    pagamento_status
  } = req.body;

  const sql = `
    INSERT INTO pagamentos (
      pagamento_aluno_disciplina_id,
      pagamento_tipo_pagamento_id,
      pagamento_valor,
      pagamento_data_pagamento,
      pagamento_status
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    pagamento_aluno_disciplina_id,
    pagamento_tipo_pagamento_id,
    pagamento_valor,
    pagamento_data_pagamento || null,
    pagamento_status
  ], (err, result) => {
    if (err) {
      console.error("Erro ao inserir pagamento:", err);
      res.status(500).send("Erro no servidor");
      return;
    }

    res.redirect(rotas.PAGAMENTOS_LISTAR);
  });
});

app.post(rotas.AULAS_CADASTRAR, (req, res) => {
  const { aula_professor_id, aula_disciplina_id, aula_turma_id, aulas_data } = req.body;

  const sql = `
    INSERT INTO aulas (aula_professor_id, aula_disciplina_id, aula_turma_id, aulas_data)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [
    aula_professor_id,
    aula_disciplina_id,
    aula_turma_id,
    aulas_data || null
  ], (err, result) => {
    if (err) {
      console.error("Erro ao inserir aula:", err);
      res.status(500).send("Erro no servidor");
      return;
    }

    res.redirect(rotas.AULAS_LISTAR);
  });
});

app.post(rotas.FALTAS_CADASTRAR, (req, res) => {
  const { falta_aluno_id, falta_aula_id } = req.body;

  const sql = `
    INSERT INTO faltas (falta_aluno_id, falta_aula_id)
    VALUES (?, ?)
  `;

  db.query(sql, [falta_aluno_id, falta_aula_id], (err, result) => {
    if (err) {
      console.error("Erro ao inserir falta:", err);
      res.status(500).send("Erro no servidor");
      return;
    }

    res.redirect(rotas.FALTAS_LISTAR);
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

  // Validação básica para não deixar excluir qualquer coisa de forma maliciosa
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
];

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

app.post(rotas.EXCLUIR2, (req, res) => {
  const { tabela } = req.params;
  const { registros } = req.body; 
  // registros deve ser um array de objetos com as chaves do PK

  const tabelasPermitidas = [
    "usuarios", "cargos", "professores", "financeiros", "administrativos",
    "cursos", "disciplinas", "cursos_disciplinas", "alunos", "turmas",
    "alunos_disciplinas", "notas", "tipos_pagamentos", "pagamentos", 
    "aulas", "faltas"
  ];

  if (!tabelasPermitidas.includes(tabela)) {
    return res.status(400).send("Operação não permitida: tabela inválida");
  }

  if (!Array.isArray(registros) || registros.length === 0) {
    return res.status(400).send("Nenhum registro informado");
  }

  const queries = registros.map((pkObj) => {
    const whereClauses = [];
    const values = [];
    for (const [campo, valor] of Object.entries(pkObj)) {
      whereClauses.push(`?? = ?`);
      values.push(campo, valor);
    }
    return {
      sql: `DELETE FROM ?? WHERE ${whereClauses.join(' AND ')}`,
      params: [tabela, ...values]
    };
  });

  // Executa as queries em série
  const execNext = (i) => {
    if (i >= queries.length) {
      return res.redirect(`/${tabela}`); // redireciona após todas exclusões
    }
    const { sql, params } = queries[i];
    db.query(sql, params, (err) => {
      if (err) {
        console.error(`Erro ao excluir em ${tabela}:`, err);
        return res.status(500).send("Erro no servidor");
      }
      execNext(i + 1);
    });
  };

  execNext(0);
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