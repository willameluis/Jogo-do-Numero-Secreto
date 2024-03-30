let listaDeNumerosSorteados = [];
let limiteDeNumeros = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

function exibirTexto (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTexto("h1", "Jogo do Número Secreto");
    exibirTexto("p", "Insira um número de 1 a 10:");
}

exibirMensagemInicial()

function gerarNumero() {
    let numeroEscolhido = parseInt(Math.random() * limiteDeNumeros + 1);
    let quantidadeLista = listaDeNumerosSorteados.length;

    if (quantidadeLista == limiteDeNumeros) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumero();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTexto("h1", "Acertou!");

        let palavraTentativa = tentativas > 1 ? 'tentativas' : "tentativa";
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`
        exibirTexto("p", mensagemTentativa);

        document.getElementById("reiniciar").removeAttribute("disabled");

    } else {
        if (chute > numeroSecreto) {
            exibirTexto("p", "O número secreto é menor.");
        } else {
            exibirTexto("p", "O número secreto é maior.");
        }
        tentativas++;
        limparCampo()
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
}