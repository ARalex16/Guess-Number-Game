let btnStart = document.getElementById('btnStart');
let checkBtn = document.getElementById('checkBtn');
let restartBtn = document.getElementById('restartBtn');
let startUp = document.getElementById('startUp');
let gameSection = document.getElementById('gameSection');
let userInp = document.getElementById('userInp');
let info = document.getElementById('info');
let err = document.getElementById('err');
let ourGuess = document.getElementById('ourGuess');
let attemptInfo = document.getElementById('attemptInfo');
let para = document.getElementById('para');
let backSect = document.getElementById('backSect');
let mode = document.getElementsByName('mode');
let guessNum = [];
let totalAttempt = 10;
let ranNum;

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

const modeState = () => {
    for(i = 0; i < mode.length; i++) {
        if (mode[i].checked) {
            if (mode[i].value == 'easy') {
                info.innerHTML = '<b>*10</b> attempts'; 
                totalAttempt = 10;
            }else if (mode[i].value == 'hard') {
                info.innerHTML = '<b>*5</b> attempts'; 
                totalAttempt = 5;
            }
        }
    }
}

const updateLS = (num) => {
    guessNum.push(num);
    localStorage.setItem('arr', JSON.stringify(guessNum));
    
    const guess = JSON.parse(localStorage.getItem('arr'));
    ourGuess.innerHTML = guess;    
}

const reset = () => {
    mode[0].checked = 'true';
    para.innerHTML = 'Guess the Number from 1 to 100';
    userInp.style.display = 'block';
    userInp.readonly = 'false';
    checkBtn.style.display = 'block';
    restartBtn.style.display = 'none';
    ourGuess.innerHTML = '';
    localStorage.removeItem('arr');   
    guessNum = []; 
}

const restartGame = () => {
    gameSection.style.display = 'none';
    startUp.style.display = 'block';
    reset();
}

const winOrLose = () => {
    checkBtn.style.display = 'none';
    restartBtn.style.display = 'block';
    userInp.style.display = 'none';
    para.style.paddingBottom = '15px';
    para.style.fontWeight = '900';
    attemptInfo.innerHTML = '';
}

const winCondition = () => {
    para.innerHTML = 'Congratulations! You Won 🥳🎖️🏆';
    err.innerHTML = `Correct Answer is ${ranNum}`;
    winOrLose();
}

const lostCondition = () => {
    para.innerHTML = 'You Lose!!';
    err.innerHTML = `Correct Answer was ${ranNum}`;
    winOrLose();
}

const checkAttempt = (att) => {
    if(att == 0) {
        lostCondition();
    }
}

const start = (totalChance) => {
   startUp.style.display = 'none';
   gameSection.style.display = 'block';
   
   ranNum = generateRandomNumber(1, 100);
   attemptInfo.innerHTML = `*${totalAttempt} attempts left`;
}

const checkNum = () => {
    err.style.display = 'block';
    
    if (userInp.value >= 1 && userInp.value <= 100) { 
        updateLS(userInp.value);
        totalAttempt--;
        attemptInfo.innerHTML = `*${totalAttempt} attempts left`;
        
        if(userInp.value == ranNum) {
            /* win = true; */
            winCondition();
        }
        else if(userInp.value < ranNum) {
            err.innerHTML = 'Your guess is Less!'; 
            checkAttempt(totalAttempt);
        }
        else if(userInp.value > ranNum) {
            err.innerHTML = 'Your guess is High!'; 
            checkAttempt(totalAttempt);
        }
    }
    else{
        err.innerHTML = 'Number must be between 1 and 100!';
    }    
    
    userInp.value = '';
}

btnStart.addEventListener('click', start);
checkBtn.addEventListener('click', checkNum);
restartBtn.addEventListener('click', restartGame);
backSect.addEventListener('click', restartGame);
