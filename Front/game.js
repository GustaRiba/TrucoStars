// Definição das cartas
const baralho = ['4', '5', '6', '7', 'Q', 'J', 'K', 'A', '2', '3'];
const naipes = ['Ouros', 'Espadas', 'Copas', 'Paus'];
const cartas = [];
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
    return cartas.slice(0, 3);
}

// Função para determinar o vencedor da rodada
function determinarVencedorRodada(jogadores, rodada) {
    const cartaJogador1 = jogadores[0].cartas[rodada];
    const cartaJogador2 = jogadores[1].cartas[rodada];

    if (baralho.indexOf(cartaJogador1.valor) > baralho.indexOf(cartaJogador2.valor)) {
        return jogadores[0];
    } else if (baralho.indexOf(cartaJogador1.valor) < baralho.indexOf(cartaJogador2.valor)) {
        return jogadores[1];
    } else {
        return null; // Empate
    }
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
        { nome: 'Jogador 1', cartas: distribuirCartas(), vitorias: 0 },
        { nome: 'Jogador 2', cartas: distribuirCartas(), vitorias: 0 }
    ];

    // Jogador joga cada rodada
    for (let i = 0; i < 3; i++) {
        const vencedorRodada = determinarVencedorRodada(jogadores, i);
        if (vencedorRodada === jogadores[0]) {
            console.log('Jogador 1 ganhou esta rodada!');
            jogadores[0].vitorias++;
        } else if (vencedorRodada === jogadores[1]) {
            console.log('Jogador 2 ganhou esta rodada.');
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
