const velha = {
    velha1: {
        valor: '👵🏾'
    },
    velha2: {
        valor: '👵🏼'
    }
};

const quadrados = document.querySelectorAll('.quadrado');
const possibilidades = {
    possibilidade1: [1, 2, 3],
    possibilidade2: [4, 5, 6],
    possibilidade3: [7, 8, 9],
    possibilidade4: [1, 4, 7],
    possibilidade5: [2, 5, 8],
    possibilidade6: [3, 6, 9],
    possibilidade7: [1, 5, 9],
    possibilidade8: [3, 5, 7]
};

const tabela = document.querySelector(".container-principal");
const textoDoRodape = document.querySelector('h2');
const fimDeJogo = document.getElementById('div-fim-de-jogo');
const textoFimDeJogo = document.querySelector(".fim-de-jogo");
const btnReiniciarJogo = document.getElementById("btnReiniciar");
const placarNaTela = document.querySelector(".placar");
const btnNovoJogo = document.querySelector('.btn-novo-jogo');

let alternar = true;
const escolhasP1 = [];
const escolhasP2 = [];
let pontuacaoP1 = 0;
let pontuacaoP2 = 0;

fimDeJogo.classList.add('hidden');
tabela.classList.remove('hidden');

// Carregar placar do localStorage ao abrir a página
(function carregarPlacar() {
    const salvo = JSON.parse(localStorage.getItem('placarVelha'));

    if (salvo) {
        pontuacaoP1 = salvo.p1;
        pontuacaoP2 = salvo.p2;
    }

    placarNaTela.textContent =
        `${velha.velha1.valor} ${pontuacaoP1} X ${pontuacaoP2} ${velha.velha2.valor}`;
})();

// Função para salvar placar
function salvarPlacar() {
    const placarAtual = {
        p1: pontuacaoP1,
        p2: pontuacaoP2
    };
    localStorage.setItem('placarVelha', JSON.stringify(placarAtual));
}

// Função para verificar se alguém ganhou
function ganhou(escolhas) {
    return Object.values(possibilidades).some(combinacao =>
        combinacao.every(posicao => escolhas.includes(posicao))
    );
}

// Clicar nos quadrados
quadrados.forEach(quadrado => {
    quadrado.addEventListener('click', function () {
        const idQuadrado = Number(this.id);

        if (alternar) {
            quadrado.textContent = velha.velha1.valor;
            escolhasP1.push(idQuadrado);
            textoDoRodape.innerHTML = 'É a vez do P2';
        } else {
            quadrado.textContent = velha.velha2.valor;
            escolhasP2.push(idQuadrado);
            textoDoRodape.innerHTML = 'É a vez do P1';
        }

        quadrado.style.pointerEvents = 'none';
        alternar = !alternar;

        if (ganhou(escolhasP1)) {
            tabela.classList.add('hidden');
            fimDeJogo.classList.remove('hidden');
            textoFimDeJogo.innerHTML = 'Fim de jogo,<br>P1 é o vencedor! 👵🏾';
            pontuacaoP1++;
            salvarPlacar();
        } else if (ganhou(escolhasP2)) {
            tabela.classList.add('hidden');
            fimDeJogo.classList.remove('hidden');
            textoFimDeJogo.innerHTML = 'Fim de jogo,<br>P2 é o vencedor! 👵🏼';
            pontuacaoP2++;
            salvarPlacar();
        }

        placarNaTela.innerHTML =
            `${velha.velha1.valor} ${pontuacaoP1} X ${pontuacaoP2} ${velha.velha2.valor}`;
            
            
        if (escolhasP1.length + escolhasP2.length == 9) {
            tabela.classList.add('hidden');
            fimDeJogo.classList.remove('hidden');
            textoFimDeJogo.innerHTML = 'Jogo empatado, vamos novamente!'
            btnReiniciarJogo.innerText = 'Recomeçar'

        }
    });
});



// Botão para reiniciar o jogo (mas manter o placar)
btnReiniciarJogo.addEventListener('click', (e) => {
    e.preventDefault();
    
    quadrados.forEach(quadrado => {
        quadrado.textContent = '';
        quadrado.style.pointerEvents = 'auto';
    });

    escolhasP1.length = 0;
    escolhasP2.length = 0;
    alternar = true;
    fimDeJogo.classList.add('hidden');
    tabela.classList.remove('hidden');
});

// Botão para novo jogo (zera tudo)
btnNovoJogo.addEventListener('click', () => {
    pontuacaoP1 = 0;
    pontuacaoP2 = 0;
    salvarPlacar();

    placarNaTela.innerHTML =
        `${velha.velha1.valor} 0 X 0 ${velha.velha2.valor}`;

    quadrados.forEach(quadrado => {
        quadrado.textContent = '';
        quadrado.style.pointerEvents = 'auto';
    });

    escolhasP1.length = 0;
    escolhasP2.length = 0;
    alternar = true;

    textoDoRodape.innerHTML = 'É a vez do P1';
    fimDeJogo.classList.add('hidden');
    tabela.classList.remove('hidden');
});
