const container = document.querySelector(".video-container");


function nextVideo() {

    container.scrollBy({

        left: 240,

        behavior: "smooth"

    });

}


function previousVideo() {

    container.scrollBy({

        left: -240,

        behavior: "smooth"

    });

}

const historiaToggle =
    document.getElementById("historiaToggle");

const historiaPanel =
    document.getElementById("historiaPanel");

historiaToggle.addEventListener("click", function () {

    historiaPanel.classList.toggle("aberto");

    historiaToggle.classList.toggle("aberto");

});


const europaToggle =
    document.getElementById("europaToggle");

const europaPanel =
    document.getElementById("europaPanel");

europaToggle.addEventListener("click", function () {

    europaPanel.classList.toggle("aberto");

    europaToggle.classList.toggle("aberto");

});

/* ================================================= */
/* DESTAQUE AO PASSAR O MOUSE */
/* ================================================= */

const videoCards = document.querySelectorAll(".video-card");


videoCards.forEach(function(card) {

    card.addEventListener("mouseenter", function() {

        card.classList.add("video-destaque");

    });


    card.addEventListener("mouseleave", function() {

        card.classList.remove("video-destaque");

    });

});

function abrirVideo(botao) {

    const wrapper = botao.parentElement;

    const capa = wrapper.querySelector(".video-capa");

    const iframe = wrapper.querySelector("iframe");

    capa.style.display = "none";

    botao.style.display = "none";

    iframe.src = iframe.src + "?autoplay=1";
}


/* ========================================= */
/* EFEITO DE SOBREPOSIÇÃO */
/* ========================================= */

const topicos = document.querySelectorAll(".topico");


function atualizarTopicos() {

    const alturaTela = window.innerHeight;


    topicos.forEach(function(topico, index) {

        /*
        O último tópico não tem
        outro tópico depois dele.
        */

        if (index === topicos.length - 1) {

            topico.style.opacity = "1";

            return;

        }


        const proximoTopico = topicos[index + 1];


        const posicao =
            proximoTopico.getBoundingClientRect().top;


        /*
        Calcula quanto o próximo tópico
        já entrou na tela.

        0 = ainda não entrou
        1 = chegou completamente
        */

        let progresso =
            1 - (posicao / alturaTela);


        /*
        Limita entre 0 e 1
        */

        progresso = Math.max(
            0,
            Math.min(1, progresso)
        );


        /*
        Opacidade mínima do tópico anterior.
        */

        const opacidade =
            1 - (progresso * 0.75);


        topico.style.opacity = opacidade;

    });

}


/* Executa quando rolar */

window.addEventListener(
    "scroll",
    atualizarTopicos
);


/* Executa quando a página carregar */

window.addEventListener(
    "load",
    atualizarTopicos
);

/* ================================================= */
/* YOUTUBE - VOLTAR A CAPA QUANDO O VÍDEO TERMINAR */
/* ================================================= */

let players = [];


// Carrega a API do YouTube
const youtubeScript = document.createElement("script");

youtubeScript.src = "https://www.youtube.com/iframe_api";

document.head.appendChild(youtubeScript);


// Essa função é chamada automaticamente pela API
function onYouTubeIframeAPIReady() {

    const iframes = document.querySelectorAll(
        ".video-card iframe"
    );

    iframes.forEach(function(iframe) {

        const player = new YT.Player(iframe, {

            events: {

                onStateChange: function(event) {

                    // 0 = vídeo terminou
                    if (event.data === YT.PlayerState.ENDED) {

                        const wrapper =
                            iframe.closest(".video-wrapper");

                        const capa =
                            wrapper.querySelector(".video-capa");

                        const botao =
                            wrapper.querySelector(".play-button");


                        // Mostra novamente a capa
                        capa.style.display = "block";

                        // Mostra novamente o botão
                        botao.style.display = "flex";

                    }

                }

            }

        });

        players.push(player);

    });

}