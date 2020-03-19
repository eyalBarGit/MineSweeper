'use-strict';
//TODOS:
// HINT SECTION
// FIX THE HINT BUG - ITS COVERING CELLS I'VE ALREADY CLICKED ON
// FIX THE GUI
// FIX THE COUNTER




// const MINE_IMG = '☠'
const MINE = 'X'
const CELL_COVERED = `<img class="cell-size" src="../images/coverd.png"></img>`;
const CELL_EMPTY = `<img class="cell-size" src="../images/0.png"></img>`;
const CELL_MINE = `<img class="cell-size" src="../images/bomb.png"></img>`;
const CELL_ONE_AROUND = `<img class="cell-size" src="../images/1.png"></img>`;
const CELL_TWO_AROUND = `<img class="cell-size" src="../images/2.png"></img>`;
const CELL_THREE_AROUND = `<img class="cell-size" src="../images/3.png"></img>`;
const CELL_FOUR_AROUND = `<img class="cell-size" src="../images/4.png"></img>`;
const CELL_FIVE_AROUND = `<img class="cell-size" src="../images/5.png"></img>`;
const CELL_SIX_AROUND = `<img class="cell-size" src="../images/6.png"></img>`;
const CELL_SEVEN_AROUND = `<img class="cell-size" src="../images/7.png"></img>`;
const CELL_EIGHT_AROUND = `<img class="cell-size" src="../images/8.png"></img>`;
// const HINT_BUTTONS = `<th class="hint-btns center"><img style="width:30px;" 
// class="hint-btn" onclick="getHint(gBoard)" src="../images/hint.png"></img>
// <lable>only ${gHintCounter} hints left</lable>
// </th>`
// console.log('gHintCounter ',gHintCounter)


// Model
var gBoard;
var gLevel = { SIZE: 4, MINES: 2 };
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
var gGameLvl = 0;
var gMineCounter = 0;
var gClickCounter = 0;
var gWatch;
var gHint = false;
var gHintedCells = [];
var gHintCounter=3;
var gCellContent;


/********************************************* -  Initialize the game - ****************************************/
function initGame() {
    gBoard = buildBoard(4);
    gClickCounter = 0;
    
    renderBoard(gBoard);
    console.log(gBoard);
    
    
    renderlevelDifficulty();
}



/********************************************* - radio buttons for difficulty - *********************************/
// Difficulty leves 
function getDiffucultyLevel(elRadioBtn) {
    gLevel.SIZE = elRadioBtn.value;
    gGameLvl = gLevel.SIZE;
    
}


/********************************************* - RENDER radio buttons for difficulty - *********************************/
function renderlevelDifficulty() {
    var strHtml = '';
    var onClickF = 'class="radio-button" onclick="getDiffucultyLevel(this)" type="radio"';
    strHtml += `
    <input ${onClickF}  value="16">
    <label class="labels" for="16">Beginner</label>
    <input ${onClickF} type="radio"  value="64">
    <label class="labels" >Medium</label>
    <input ${onClickF} type="radio" value="144">
    <label class="labels" for="144">Expert</label>
    `
    var lvlBtn = document.querySelector('.lvl-btns');
    lvlBtn.innerHTML = strHtml;
    
}

function setGlevel(size, mines) {
    gLevel = {
        SIZE: size,
        MINES: mines
    };
}


// Root the number to divide it to cells
function getSquareRoot(gameLevel) {
    var square = Math.sqrt(gameLevel);
    return square
}


/******************************************** - Build the board - **********************************************/
function buildBoard(Length) {
    var board = [];
    for (var i = 0; i < Length; i++) {
        board[i] = [];
        for (var j = 0; j < Length; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            };
            board[i][j] = cell;
        }
    }
    return board;
}

/**************************************************** - CREATE MINES - **********************************************/
function createMines(board) {
    var amount = 0;
    if (gBoard.length === 4) {
        
        amount = 2
    } if (gBoard.length === 8) {
        
        amount = 12
    } if (gBoard.length === 12) {
        
        amount = 30
    }
    
    for (var i = 0; i < amount; i++) {
        var count = 0;
        while (count < gLevel.MINES) {
            var iMine = getRandomInt(0, board.length - 1)
            var jMine = getRandomInt(0, board.length - 1)
            
            if (!board[iMine][jMine].isMine && !board[iMine][jMine].isShown) {
                count++
                board[iMine][jMine].isMine = true
            }
        }
        
        
    }
}

/************************************************* - TOP LINE OF SCORE - *****************************************/
function createLine(){
    
    var strHtml = '';
    strHtml += `<div class "hint-btns center"><img style="width:30px;" 
    class="hint-btn" onclick="getHint(gBoard)" src="../images/hint.png"></img>
    <div>TIME: <span id="time-min"></span><span id="time-sec"></span> </div>
    </div>`
    
    var infoLine = document.querySelector('.info-line');
    infoLine.innerHTML = strHtml;
}

/************************************************* - Render the board - *****************************************/
function renderBoard(board) {
    createLine()
    var strHtml = '';
    
    
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            // if
            if (cell.isShown) {
                if (cell.isMine) {
                    strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})"> ${CELL_MINE} </td>`
                } else {
                    if (cell.minesAroundCount === 0) {
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_EMPTY}</td>`
                    }
                    if (cell.minesAroundCount === 1) {
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_ONE_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 2) {
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_TWO_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 3) {
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_THREE_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 4) {
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_FOUR_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 5) {
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_FIVE_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 6) {
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_SIX_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 7) {
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_SEVEN_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 8) {
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_EIGHT_AROUND}</td>`
                    }
                    
                }
            } else {
                strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})"> ${CELL_COVERED} </td>`
            }
        }
        strHtml += '</td>';
    }
    var elMat = document.querySelector('.board');
    elMat.innerHTML = strHtml;
}



/********************************************************** - Cells - *********************************************/
function cellClicked(elCell, i, j) {
    var clickSound = new Audio('/audio/click.wav');
    var explosion = new Audio("/audio/Explosion.mp3");
    gClickCounter++
    if(gClickCounter ===1){
        
        startWatch()
    }
    startMining();
    
    cell = gBoard[i][j];
    if (!gHint) {
        if (!cell.isMine) {
            if(cell.minesAroundCount === 0){
                
                //   gCellContent = CELL_EMPTY;
                
            }
            // if(cell.minesAroundCount === 1){
                // gCellContent = CELL_ONE_AROUND;
            // }
            clickSound.play()
        }
        cell.isShown = true;
        if (cell.isMine) {
            // gCellContent = CELL_MINE;
            explosion.play()
            GameOver();
        }
        
    } else {
        gHint = true;
        clickSound.play()
        revealCards(i, j, gBoard)
        setTimeout(hideCards, 1000)
    }
    // renderBoard(gBoard);
    var imgSrc = `<img class="cell-size" src="${cell.minesAroundCount}.jpg`;
    gCellContent = imgSrc;
    renderCell({i: i, j: j },gCellContent)
}



/*************************************************************************************************************/

function cellMarked(elCell) {

}



function expandShown(board, elCell, i, j) {




}


function newGame() {

    gBoard = buildBoard(getSquareRoot(gGameLvl));
    gClickCounter = 0
    // createMines(gBoard);
    // findMines(gBoard);
    startMining();
    renderBoard(gBoard);


    renderlevelDifficulty();
}


// Check if game is over
function checkGameOver() {

}


function GameOver() {
    
    console.log('game over');
    setTimeout(initGame, 500)
clearInterval(gWatch)
gClickCounter = 0

}


function findMines(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            var cell = board[i][j];

            if (cell.isMine === true) {
                setMinesNegsCount(i, j, board)
            }

        }
    }

}


function startWatch() {
    var startTime = Date.now();
    gWatch = setInterval(function () {
        var currTime = Date.now();
        var totalTime = Math.floor((currTime - startTime)  / 1000);
        renderTime(totalTime);
    }, 1000);
}

function renderTime(time) {
    document.querySelector('#time-sec').innerText = `${time}`;
}

function startMining() {
    if (gClickCounter === 2) {

        createMines(gBoard);
        findMines(gBoard);
    }
}

function getHint(board) {
    if(gHintCounter>=0){
        
        gHintCounter--
        gHint = true
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                var cell = board[i][j];
                if (!cell.isShown && !cell.isMine) {
                    console.log('this is hint at i ', i, ' and j ', j)
                    return
                }
            }
    }
    }
}