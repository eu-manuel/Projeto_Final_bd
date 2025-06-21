module.exports = {
  HOME: "/",
  CARGOS_LISTAR: "/cargos",
  CARGOS_CADASTRAR: "cadastrar/cargos",
  CARGOS_EXCLUIR: (id) => `/cargos/delete/${id}`,
  USUARIOS_LISTAR: "/usuarios",
  USUARIOS_CADASTRAR: "formulario/usuarios",
  EXCLUIR: "/excluir/:tabela/:pk/:id",
  

  FORMULARIO: (tabela) => `formulario/${tabela}`
};
