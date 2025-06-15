const velha = {
    velha1: {
        valor: '👵🏾'
    },
    velha2: {
        valor: '👵🏼'
    }
}
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
}
const textoDoRodape = document.querySelector('h2');
let alternar = true;
const escolhasP1 = [];
const escolhasP2 = [];

function ganhou(escolhas) {
        return Object.values(possibilidades).some(combinacao =>
            combinacao.every(posicao => escolhas.includes(posicao))
        );
    }


quadrados.forEach(quadrado => {
    quadrado.addEventListener('click', function () {
        const idQuadrado = Number(this.id);

    if(alternar) {
        quadrado.textContent = velha.velha1.valor;
        escolhasP1.push(idQuadrado);
        textoDoRodape.innerHTML = 'É a vez do P2';
        quadrado.style.pointerEvents = 'none';
    } else {
        quadrado.textContent = velha.velha2.valor;
        escolhasP2.push(idQuadrado);
        textoDoRodape.innerHTML = 'É a vez do P1';
        quadrado.style.pointerEvents = 'none'
    }
    alternar = !alternar;

        if(ganhou(escolhasP1)) {
            textoDoRodape.textContent = 'Fim de jogo';
            setTimeout(() =>{
                alert("P1 é o vencedor!")
                location.reload();
            }, 200);
        } else if (ganhou(escolhasP2)) {
            textoDoRodape.textContent = 'Fim de jogo';
            setTimeout(() => {
                alert('P2 é o vencedor');
                location.reload();
            }, 200);
        }   
    })
        
});