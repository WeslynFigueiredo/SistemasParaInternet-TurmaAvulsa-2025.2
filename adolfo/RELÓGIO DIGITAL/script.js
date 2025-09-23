function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Adiciona zero à esquerda se o número for menor que 10
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    // Atualiza o conteúdo dos elementos HTML
    document.getElementById('hour').textContent = hours;
    document.getElementById('minute').textContent = minutes;
    document.getElementById('second').textContent = seconds;
}

// Atualiza o relógio a cada segundo (1000 milissegundos)
setInterval(updateClock, 1000);

// Chama a função uma vez para exibir a hora imediatamente ao carregar a página
updateClock();