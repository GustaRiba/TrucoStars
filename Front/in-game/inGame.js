// Definição das cartas
const baralho = ['4', '5', '6', '7', 'Q', 'J', 'K', 'A', '2', '3'];
const naipes = ['Ouros', 'Espadas', 'Copas', 'Paus'];
const cartas = [];

// Criando o baralho completo
naipes.forEach(naipe => {
    baralho.forEach(valor => {
        cartas.push({ valor: valor, naipe: naipe });
    });
});

// Função para embaralhar o baralho
function embaralharBaralho() {
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }
}

// Função para distribuir cartas aos jogadores
function distribuirCartas() {
    embaralharBaralho();
    const cartasJogador = [];
    for (let i = 0; i < 3; i++) {
        cartasJogador.push(cartas[i]); // Distribuir as primeiras 3 cartas do baralho
    }
    return cartasJogador;
}

// Função para avaliar a mão de um jogador
function avaliarMao(mao) {
    // Lógica para avaliar a mão do jogador
    // Exemplo simplificado: a mão com a maior carta vence
    return mao.reduce((maiorCarta, carta) => {
        if (baralho.indexOf(carta.valor) > baralho.indexOf(maiorCarta.valor)) {
            return carta;
        } else {
            return maiorCarta;
        }
    });
}

// Função para determinar o vencedor da rodada
function determinarVencedorRodada(jogadores, rodada) {
    const cartaJogador1 = jogadores[0].cartas[rodada];
    const cartaJogador2 = jogadores[1].cartas[rodada];

    console.log(`Jogador 1 jogou: ${cartaJogador1.valor} ${cartaJogador1.naipe}`);
    console.log(`Jogador 2 jogou: ${cartaJogador2.valor} ${cartaJogador2.naipe}`);

    if (baralho.indexOf(cartaJogador1.valor) > baralho.indexOf(cartaJogador2.valor)) {
        return jogadores[0];
    } else if (baralho.indexOf(cartaJogador1.valor) < baralho.indexOf(cartaJogador2.valor)) {
        return jogadores[1];
    } else {
        return null; // Empate
    }
}



// Função para exibir as cartas dos jogadores
function exibirCartasDosJogadores(jogadores) {
    jogadores.forEach((jogador, index) => {
        console.log(`Cartas do Jogador ${index + 1}:`);
        jogador.cartas.forEach(carta => {
            console.log(`${carta.valor} ${carta.naipe}`);
        });
    });
}

// Função para permitir que o desenvolvedor (você) jogue uma carta
function jogadorJogaCarta(jogador) {
    const cartaEscolhida = prompt(`Escolha uma carta para jogar (1, 2 ou 3) como ${jogador.cartas.map(carta => `${carta.valor} ${carta.naipe}`).join(', ')}:`);
    const indiceCarta = parseInt(cartaEscolhida) - 1;
    if (indiceCarta >= 0 && indiceCarta < jogador.cartas.length) {
        return jogador.cartas.splice(indiceCarta, 1)[0];
    } else {
        console.log('Carta inválida! Escolha uma carta válida.');
        return jogadorJogaCarta(jogador);
    }
}

// Função para permitir que o jogador (você) jogue uma rodada
function jogadorJogaRodada(jogadores, rodada) {
    const jogador = jogadores[0]; // Você é o primeiro jogador
    console.log(`Rodada ${rodada + 1}`);
    console.log(`Suas cartas: ${jogador.cartas.map(carta => `${carta.valor} ${carta.naipe}`).join(', ')}`);
    const cartaJogada = jogadorJogaCarta(jogador);
    console.log(`Você jogou: ${cartaJogada.valor} ${cartaJogada.naipe}`);
    return cartaJogada;
}

// Função para determinar o vencedor do jogo
function determinarVencedorDoJogo(jogadores) {
    const vitoriasJogador1 = jogadores[0].vitorias;
    const vitoriasJogador2 = jogadores[1].vitorias;

    if (vitoriasJogador1 > vitoriasJogador2) {
        return jogadores[0];
    } else if (vitoriasJogador1 < vitoriasJogador2) {
        return jogadores[1];
    } else {
        return null; // Empate
    }
}

// Função para iniciar o jogo
function startGame() {
    const jogadores = [
        { nome: 'Desenvolvedor', cartas: distribuirCartas(), vitorias: 0 },
        { nome: 'Jogador 2', cartas: distribuirCartas(), vitorias: 0 }
    ];

    // Jogador (você) joga cada rodada
    for (let i = 0; i < 3; i++) {
        const cartaJogada = jogadorJogaRodada(jogadores, i);
        const vencedorRodada = determinarVencedorRodada(jogadores, i);
        if (vencedorRodada === jogadores[0]) {
            console.log('Você ganhou esta rodada!');
            jogadores[0].vitorias++;
        } else if (vencedorRodada === jogadores[1]) {
            console.log('Você perdeu esta rodada.');
            jogadores[1].vitorias++;
        } else {
            console.log('Rodada empatada.');
        }
    }

    // Determina o vencedor do jogo
    const vencedorDoJogo = determinarVencedorDoJogo(jogadores);
    if (vencedorDoJogo) {
        console.log('Vencedor do Jogo:', vencedorDoJogo.nome);
    } else {
        console.log('Jogo empatado');
    }
}

// Inicia o jogo
startGame();