/* =====================================
   FRASES
===================================== */

const quotes = [
    "Algumas flores precisam de mais tempo para abrir.",
    "Você não precisa ter tudo resolvido hoje.",
    "Pequenos passos também levam para frente.",
    "Descansar também faz parte do caminho.",
    "Pedir ajuda é uma forma de cuidar de si.",
    "Você merece ser ouvido.",
    "Um dia difícil não define toda a sua história.",
    "Respire. Você pode ir com calma.",
    "Há espaço para recomeços.",
    "Você não precisa passar por tudo sozinho."
];

const quoteElement = document.getElementById("quote");
const quoteButton = document.getElementById("newQuote");

quoteButton.addEventListener("click", () => {

    const currentQuote = quoteElement.textContent;

    let newQuote;

    do {
        newQuote =
            quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote === currentQuote);

    quoteElement.style.opacity = "0";

    setTimeout(() => {
        quoteElement.textContent = newQuote;
        quoteElement.style.opacity = "1";
    }, 250);
});


/* =====================================
   HUMOR
===================================== */

const moods = document.querySelectorAll(".mood");
const moodResult = document.getElementById("moodResult");

const moodMessages = {
    "Muito bem":
        "Que bom que hoje existe um pouco de sol por aí. Aproveite esse momento. 🌻",

    "Bem":
        "Que bom. Continue cuidando desse pequeno espaço de tranquilidade. ☀️",

    "Neutro":
        "Tudo bem estar no meio do caminho. Nem todo dia precisa ser extraordinário. 🌼",

    "Cansado(a)":
        "Talvez seu corpo e sua mente estejam pedindo uma pausa. Se puder, seja gentil consigo hoje. 🍂",

    "Triste":
        "Sinto muito que hoje esteja pesado. Considere conversar com alguém de confiança e procurar apoio se precisar. 💛"
};

moods.forEach((mood) => {

    mood.addEventListener("click", () => {

        moods.forEach((item) => {
            item.classList.remove("active");
        });

        mood.classList.add("active");

        const selectedMood = mood.dataset.mood;

        moodResult.textContent =
            moodMessages[selectedMood];

    });

});


/* =====================================
   RESPIRAÇÃO
===================================== */

const breathingButton =
    document.getElementById("breathingButton");

const breathingCircle =
    document.querySelector(".breathing-circle");

const breathingText =
    document.getElementById("breathingText");

const breathingInstruction =
    document.getElementById("breathingInstruction");

const breathingCounter =
    document.getElementById("breathingCounter");

let breathingRunning = false;
let breathingTimeout;
let breathingInterval;


/* função de contagem */

function countdown(seconds) {

    let remaining = seconds;

    breathingCounter.textContent = remaining;

    clearInterval(breathingInterval);

    breathingInterval = setInterval(() => {

        remaining--;

        breathingCounter.textContent =
            remaining > 0 ? remaining : "";

        if (remaining <= 0) {
            clearInterval(breathingInterval);
        }

    }, 1000);
}


/* ciclo de respiração */

function breathingCycle() {

    if (!breathingRunning) {
        return;
    }


    /* INSPIRAR */

    breathingCircle.classList.remove("exhale");
    breathingCircle.classList.add("inhale");

    breathingText.textContent = "INSPIRE";

    breathingInstruction.textContent =
        "Puxe o ar lentamente pelo nariz.";

    countdown(4);


    breathingTimeout = setTimeout(() => {

        if (!breathingRunning) return;


        /* SEGURAR */

        breathingText.textContent = "SEGURE";

        breathingInstruction.textContent =
            "Segure o ar suavemente por alguns segundos.";

        countdown(2);


        breathingTimeout = setTimeout(() => {

            if (!breathingRunning) return;


            /* EXPIRAR */

            breathingCircle.classList.remove("inhale");
            breathingCircle.classList.add("exhale");

            breathingText.textContent = "EXPIRE";

            breathingInstruction.textContent =
                "Solte o ar devagar.";

            countdown(6);


            breathingTimeout = setTimeout(() => {

                breathingCycle();

            }, 6000);

        }, 2000);

    }, 4000);
}


/* botão */

breathingButton.addEventListener("click", () => {

    if (!breathingRunning) {

        breathingRunning = true;

        breathingButton.textContent =
            "Parar exercício";

        breathingCycle();

    } else {

        breathingRunning = false;

        clearTimeout(breathingTimeout);
        clearInterval(breathingInterval);

        breathingCircle.classList.remove(
            "inhale",
            "exhale"
        );

        breathingText.textContent = "PAUSA";

        breathingCounter.textContent = "—";

        breathingInstruction.textContent =
            "Quando quiser, você pode começar novamente.";

        breathingButton.textContent =
            "Começar exercício";
    }

});
