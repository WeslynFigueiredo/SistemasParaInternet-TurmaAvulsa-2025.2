let contador = 0;
const valorContadorElemento = document.getElementById('valorContador');
const btnDiminuir = document.getElementById('btnDiminuir');
const btnAumentar = document.getElementById('btnAumentar');
const btnResetar = document.getElementById('btnResetar');

// Atualiza o display do contador
function atualizarContador() {
  valorContadorElemento.textContent = contador;
}

// Funções para os botões
btnDiminuir.addEventListener('click', () => {
  contador--;
  atualizarContador();
});

btnAumentar.addEventListener('click', () => {
  contador++;
  atualizarContador();
});

btnResetar.addEventListener('click', () => {
  contador = 0;
  atualizarContador();
});

// Chamada inicial para exibir o valor 0
atualizarContador();