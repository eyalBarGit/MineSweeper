
/****************************************************************** -  MODEL - ***************************************************************/

var gBoard;
var gLevel = {
    SIZE: 8,
    MINES: 12
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gClickCounter;
var gTimer;
var gHint = false;
var gHintedCells = [];
var gHintCounter;
var gBtn;
var gCellCounter = 0;
var gLives = 3;

/************************************************************* -  INITIALIZE THE GAME - *******************************************************/
function initGame() {
    gGame.isOn = true;
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard);
    clearInterval(gTimer)
    initHintBtns();
    gClickCounter = 0;
    gHintCounter = 3
    gGame.shownCount = 0;
    gHint = false;
    gGame.secsPassed = 0;
    gLives = 3;
    renderTime(gGame.secsPassed)
    renderScore()
    changeSmileyIcon()
    clearModal()
    renderHearts()
}


function newGame() {
    initGame()
    setTimeout(changeSmileyIcon, 140);
    gGame.isOn = true;
    gBtn.innerHTML = `${SCARED_FACE}`
}


function GameOver() {
    gGame.isOn = false;
    gBtn.innerHTML = `${SAD_FACE}`
    showAllMines(gBoard);
    clearInterval(gTimer)
    renderTime(0)
    var elWinModal = document.querySelector('.game-over-modal');
    elWinModal.style.display = 'block';
    elWinModal.style.opacity = '1';

}
/************************************************************************* - TIMER- *******************************************************************/

function startWatch() {
    if (gGame.isOn) {

        var startTime = Date.now();
        gTimer = setInterval(function () {
            var currTime = Date.now();
            var totalTime = Math.round((currTime - startTime) / 1000);
            renderTime(totalTime);
        }, 1000);
    }
}

function renderTime(time) {
    document.querySelector('#time-sec').innerText = `${gGame.secsPassed}`;
    gGame.secsPassed = time;
}




/******************************************************************* - DIFFICULTY BUTTONS - ***********************************************************/

function getDiffucultyLevel(cellCount, numOfMines) {
    gLevel = {
        SIZE: cellCount,
        MINES: numOfMines
    }
    initGame()

}


function renderHearts(){
    var strHtml = '';
    for (let i = 0; i < gLives; i++) {
      
        strHtml +=` 
       <img class="heart-lives" style="width:50px;" src="images/heart.png" alt="" srcset="">`
        
    }
    // <img class="heart-lives" style="width:50px;" src="images/heart.png" alt="" srcset="">
    // <img class="heart-lives" style="width:50px;" src="images/heart.png" alt="" srcset="">`
    var lives = document.querySelector('.lives');
    lives.innerHTML = strHtml;
}