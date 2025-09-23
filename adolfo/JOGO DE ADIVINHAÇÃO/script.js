let randomNumber = Math.floor(Math.random() * 100) + 1;

let attempts = 10;

function checkGuess() {

  attempts--;

  const inputElement = document.getElementById("guess");

  const feedbackElement = document.getElementById("feedback");

  const guess = inputElement.value;

  while (attempts > 0) {

    if (guess == randomNumber) {

      attempts = 0;

      feedbackElement.innerHTML = "Parabéns, meu (minha) chapa!";

      feedbackElement.style.color = "green";

      break;

    } else if (guess < randomNumber) {

      feedbackElement.innerHTML = `Mais alto que isso! Vai de novo. ${attempts} Tentativas restantes..`;

      feedbackElement.style.color = "red";

      break;

    } else {

      feedbackElement.innerHTML = `Mais baixo que isso! Vai de novo. ${attempts} Tentativas restantes`;

      feedbackElement.style.color = "red";

      break;

    }

  }

    if (attempts === 0 && guess != randomNumber) {

    feedbackElement.innerHTML =

      `Foi mal, você está sem tentativas :C! O número correto era  ${randomNumber}.`;

    feedbackElement.style.color = "red";

  }

}

        