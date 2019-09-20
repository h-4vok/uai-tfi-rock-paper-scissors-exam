const controls = {
    wonMatchesLabel: null,
    lostMatchesLabel: null,
    drawedMatchesLabel: null,

    cpuAreaSelection: null,
    playerAreaSelection: null,
    resultArea: null,

    playRock: null,
    playPaper: null,
    playScissors: null,

    newGameButton: null,
};

const playElementsIndexed = [ 'rock', 'paper', 'scissors' ];

const playElements = {
    rock: {
        image: 'rock.png',
        winsTo: null,
        losesTo: null,
    },
    paper: {
        image: 'paper.png',
        winsTo: null,
        losesTo: null,
    },
    scissors: {
        image: 'scissors.png',
        winsTo: null,
        losesTo: null,
    }
};

function init() {
    const initControls = () => {
        controls.wonMatchesLabel = document.querySelector("#wonMatchesLabel");
        controls.lostMatchesLabel = document.querySelector("#lostMatchesLabel");
        controls.drawedMatchesLabel = document.querySelector("#drawnMatchesLabel");
        
        controls.cpuAreaSelection = document.querySelector("#cpu-area-selection img");
        controls.playerAreaSelection = document.querySelector("#player-area-selection img");
        controls.resultArea = document.querySelector("#result-area");

        controls.playRock = document.querySelector("#play-rock");
        controls.playPaper = document.querySelector("#play-paper");
        controls.playScissors = document.querySelector("#play-scissors");

        controls.playRock.addEventListener('click', () => HumanPlayer.playRock());
        controls.playPaper.addEventListener('click', () => HumanPlayer.playPaper());
        controls.playScissors.addEventListener('click', () => HumanPlayer.playScissors());

        controls.newGameButton = document.querySelector("#new-game-button");
        controls.newGameButton.addEventListener('click', () => Game.resetGame());
    };

    const initPlayElements = () => {
        playElements.paper.winsTo = playElements.rock;
        playElements.paper.losesTo = playElements.scissors;

        playElements.rock.winsTo = playElements.scissors;
        playElements.rock.losesTo = playElements.paper;

        playElements.scissors.winsTo = playElements.paper;
        playElements.scissors.losesTo = playElements.rock;
    };

    initControls();
    initPlayElements();
}

document.addEventListener('DOMContentLoaded', init);

// Game Object
const Game = {

    score: {
        wins: 0,
        loses: 0,
        draws: 0
    },

    currentHumanPlay: null,
    currentCpuPlay: null,

    resetGame: () => {
        Game.score.wins = 0;
        Game.score.loses = 0;
        Game.score.draws = 0;

        controls.wonMatchesLabel.innerHTML = Game.score.wins;
        controls.lostMatchesLabel.innerHTML = Game.score.loses;
        controls.drawedMatchesLabel.innerHTML = Game.score.draws;

        controls.cpuAreaSelection.src = "https://yt3.ggpht.com/a/AGF-l78QZoZo3H4_Tt1ECmRQqBmrqtoX_hVQ0OHTzQ=s900-c-k-c0xffffffff-no-rj-mo";
        controls.playerAreaSelection.src = "https://yt3.ggpht.com/a/AGF-l78QZoZo3H4_Tt1ECmRQqBmrqtoX_hVQ0OHTzQ=s900-c-k-c0xffffffff-no-rj-mo";
    },

    scoreWin: () => {
        Game.score.wins++;
        controls.wonMatchesLabel.innerHTML = Game.score.wins;
    },

    scoreLoss: () => {
        Game.score.loses++;
        controls.lostMatchesLabel.innerHTML = Game.score.loses;
    },

    scoreDraw: () => {
        Game.score.draws++;
        controls.drawedMatchesLabel.innerHTML = Game.score.draws;
    },

    setImageTo: (image, imgControl) => {
        imgControl.src = image;
    },

    continueGame: () => {
        Game.currentCpuPlay = CpuPlayer.playRandom();

        Game.setImageTo(Game.currentHumanPlay.image, controls.playerAreaSelection);
        Game.setImageTo(Game.currentCpuPlay.image, controls.cpuAreaSelection);

        Game.assessResult();
    },

    assessResult: () => {
        if (Game.currentHumanPlay.winsTo === Game.currentCpuPlay) {
            controls.resultArea.innerHTML = "Ganaste papurri!";
            Game.scoreWin();
        }
        else if (Game.currentHumanPlay.losesTo === Game.currentCpuPlay) {
            controls.resultArea.innerHTML = "Perdiste porque sos alto manco.";
            Game.scoreLoss();
        }
        else {
            controls.resultArea.innerHTML = "Empate. Un embole.";
            Game.scoreDraw();
        }
    }

};

// Objeto Player
const HumanPlayer = {

    playPaper: () => {
        Game.currentHumanPlay = playElements.paper;
        Game.continueGame();
    },

    playRock: () => {
        Game.currentHumanPlay = playElements.rock;
        Game.continueGame();
    },

    playScissors: () => {
        Game.currentHumanPlay = playElements.scissors;
        Game.continueGame();
    }
};

// Objeto Cpu
const CpuPlayer = {

    playRandom: () => {
        const selectedIndex = Math.floor(Math.random() * 3);
        const selectedPlayName = playElementsIndexed[selectedIndex];
        const selectedPlay = playElements[selectedPlayName];

        Game.setImageTo(selectedPlay.image, controls.cpuAreaSelection);

        return selectedPlay;
    }

};