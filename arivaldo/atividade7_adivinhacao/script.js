let valorAleatorio = Math.floor(Math.random() * 100) + 1;

function confirmar() {
  const palpiteEL = document.getElementById("palpite");
  const respostaEL = document.getElementById("resposta");
  const palpite = parseInt(palpiteEL.value);

  if (palpite === valorAleatorio) {
    respostaEL.innerHTML = "Você acertou!";
    respostaEL.style.color = "green";
  } else if (palpite < valorAleatorio) {
    respostaEL.innerHTML = "Muito baixo! Tente outra vez.";
    respostaEL.style.color = "red";
  } else {
    respostaEL.innerHTML = "Muito alto! Tente outra vez.";
    respostaEL.style.color = "red";
  }
}