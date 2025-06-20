// Seleciona o botão e o form
const botao = document.getElementById('abrir-form');
const formulario = document.getElementById('form-cadastro');

// Escuta o evento de clique
botao.addEventListener('click', () => {
  // Alterna entre block e none
  if (formulario.style.display === 'none' || formulario.style.display === '') {
    formulario.style.display = 'block';
  } else {
    formulario.style.display = 'none';
  }
});
