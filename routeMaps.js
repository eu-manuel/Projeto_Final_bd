module.exports = {
  HOME: "/",
  USUARIOS_LISTAR: "/usuarios",
  USUARIOS_CADASTRAR: "/formulario/usuarios",

  CARGOS_LISTAR: "/cargos",
  CARGOS_CADASTRAR: "/cadastrar/cargos",

  PROFESSORES_LISTAR: "/professores",
  PROFESSORES_CADASTRAR: "/cadastrar/professores",

  FINANCEIROS_LISTAR: "/financeiros",
  FINANCEIROS_CADASTRAR: "/cadastrar/financeiros",

  ADMINISTRATIVOS_LISTAR: "/administrativos",
  ADMINISTRATIVOS_CADASTRAR: "/cadastrar/administrativos",

  CURSOS_LISTAR: "/cursos",
  CURSOS_CADASTRAR: "/cadastrar/cursos",

  DISCIPLINAS_LISTAR: "/disciplinas",
  DISCIPLINAS_CADASTRAR: "/cadastrar/disciplinas",

  CURSOS_DISCIPLINAS_LISTAR: "/cursos_disciplinas",
  CURSOS_DISCIPLINAS_CADASTRAR: "/cadastrar/cursos_disciplinas",

  ALUNOS_LISTAR: "/alunos",
  ALUNOS_CADASTRAR: "/cadastrar/alunos",

  TURMAS_LISTAR: "/turmas",
  TURMAS_CADASTRAR: "/cadastrar/turmas",

  ALUNOS_DISCIPLINAS_LISTAR: "/alunos_disciplinas",
  ALUNOS_DISCIPLINAS_CADASTRAR: "/cadastrar/alunos_disciplinas",

  NOTAS_LISTAR: "/notas",
  NOTAS_CADASTRAR: "/cadastrar/notas",

  TIPOS_PAGAMENTOS_LISTAR: "/tipos_pagamentos",
  TIPOS_PAGAMENTOS_CADASTRAR: "/cadastrar/tipos_pagamentos",

  PAGAMENTOS_LISTAR: "/pagamentos",
  PAGAMENTOS_CADASTRAR: "/cadastrar/pagamentos",

  AULAS_LISTAR: "/aulas",
  AULAS_CADASTRAR: "/cadastrar/aulas",

  FALTAS_LISTAR: "/faltas",
  FALTAS_CADASTRAR: "/cadastrar/faltas",



  
  USUARIOS_EXCLUIR: (id) => `/usuario/delete/${id}`,

  SCRIPTS: "/JS/script.js",
  CSS:"/CSS/style.css",
  
  
  EXCLUIR: "/delete/:tabela/:pk/:id",
  EXCLUIR2: "/delete/:tabela", //excluir para tabelas com chaves compostas

  FORMULARIO: (tabela) => `formulario/${tabela}`
};
