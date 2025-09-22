const botaoGerarCor = document.getElementById('botaoGerarCor');

botaoGerarCor.addEventListener('click', function() {
    const corAleatoria = gerarCorHexAleatoria();
    document.body.style.backgroundColor = corAleatoria;
});

function gerarCorHexAleatoria() {
    const caracteresHex = '0123456789ABCDEF';
    let cor = '#';
    for (let i = 0; i < 6; i++) {
        cor += caracteresHex[Math.floor(Math.random() * 16)];
    }
    return cor;
}