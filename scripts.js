//Variables
let gameChoicesArray = ['Paper', 'Scissors', 'Rock'];
let rulesElement = document.querySelector('.container__rules');
let scoreNumberElement = document.querySelector('.header__scoreNumber');
let modalElement = document.querySelector('.modal');
let modalOverlayElement = document.querySelector('.modal__overlay');
let closeElement = document.querySelector('.modal__closeIcon');
let gameContentElement = document.querySelector('.gameContent');
let gameChoiceElements = document.querySelectorAll('.gameContent__gameChoice');
let gameChoiceImageElement = document.querySelector('.gameContent__gameChoiceImage');
let gameChoiceComputerElement = document.querySelector('.gameContent__gameChoice--isComputer');
let countdownTextElement = document.querySelector('.gameContent__countdownText');
let resultButtonElement = document.querySelector('.gameContent__resultButton');
let resultTextElement = document.querySelector('.gameContent__resultText');
let player = document.querySelector('lottie-player'); //animation

let countdown = 4;
let randomResult;

//FUNCTIONS
let rulesModalEvent = () => modalElement.classList.toggle('modal--isActive');

let getRandomNumber = () => Math.floor(Math.random() * 3);

let showResult = (userChoice, computerChoice) => {
    let score = parseInt(scoreNumberElement.textContent);

    if (userChoice === computerChoice) { //draw condition
        resultTextElement.textContent = 'Draw';
    }
    else if (
        (userChoice === gameChoicesArray[0] && computerChoice === gameChoicesArray[1]) ||
        (userChoice === gameChoicesArray[1] && computerChoice === gameChoicesArray[2]) ||
        (userChoice === gameChoicesArray[2] && computerChoice === gameChoicesArray[0])
    ) { //lose conditions
        resultTextElement.textContent = 'You lose';
        gameContentElement.classList.add('gameContent--isLost');
        
        if (score > 0) {
            scoreNumberElement.textContent = score - 1;
        }
    }
    else { //win condition
        resultTextElement.textContent = 'You win';
        setTimeout(() => player.load('https://assets10.lottiefiles.com/packages/lf20_aEFaHc.json'), 900);
        scoreNumberElement.textContent = score + 1;
    }
};

let startCountdown = () => {
    countdownTextElement.textContent = countdown - 1; //add countdown number to the html
    countdown -= 1;

    if (countdown) { //start the countdown until we reach 0
        setTimeout(() => startCountdown(), 600);
    }
    else { //select random choice and show it
        let selectedGameChoiceElement = document.querySelector('.gameContent__gameChoice--isActive');
        let selectedChoice = selectedGameChoiceElement.dataset.choice;
        randomResult = gameChoicesArray[getRandomNumber()];

        showResult(selectedChoice, randomResult);
        setTimeout(() => gameContentElement.classList.add(`gameContent--revealResult`), 500); //delay the final result for half second

        countdownTextElement.textContent = '';
        //set the selected choice style
        gameChoiceComputerElement.classList.add(`gameContent__gameChoice--is${randomResult}`);
        //set the selected choice image
        gameChoiceImageElement.setAttribute('src', `./images/icon-${randomResult.toLowerCase()}.svg`);
        countdown = 4; //reset the countdown number
    }
};

let gameChoiceEvent = (event) => {
    gameContentElement.classList.add('gameContent--isActive');
    event.target.classList.add('gameContent__gameChoice--isActive');

    startCountdown();
};

let playAgainEvent = () => {
    let activeChoiceElement = document.querySelector('.gameContent__gameChoice--isActive');

    gameContentElement.classList.remove(`gameContent--revealResult`);
    gameChoiceComputerElement.classList.remove(`gameContent__gameChoice--is${randomResult}`);
    gameChoiceImageElement.setAttribute('src', '');
    gameContentElement.classList.remove('gameContent--isActive', 'gameContent--isLost');
    activeChoiceElement.classList.remove('gameContent__gameChoice--isActive');
};

//MODAL EVENTS
rulesElement.addEventListener('click', rulesModalEvent);
closeElement.addEventListener('click', rulesModalEvent);
modalOverlayElement.addEventListener('click', rulesModalEvent);

//GAME CHOICES EVENTS
gameChoiceElements.forEach(item => item.addEventListener('click', gameChoiceEvent));
resultButtonElement.addEventListener('click', playAgainEvent);
