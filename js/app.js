'use-strict';
//TODOS:
/**
 * step 3, 3 = Implement that clicking a cell with “number” reveals the number of this cell
 * Furthur task - Make sure the first clicked cell is never a mine (like in the real game), the empty cell becomes a num
 * 
 * 
*/




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
const CELL_FLAG = `<img class="cell-size" src="../images/flag.png"></img>`;
const SMILEY_FACE = `<img style="width:35px" src="../images/Happy_face.png"</img>`
const SCARED_FACE = `<img style="width:35px" src="../images/Scared_ face.png"</img>`
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
var gHintCounter = 3;
var gCellContent;
var gBtn;
var gScore = 0


/********************************************* -  Initialize the game - ****************************************/
function initGame() {
    gBoard = buildBoard(4);
    renderBoard(gBoard);
    clearInterval(gWatch)
    gClickCounter = 0;
    gHintCounter = 3
    gScore = 0
    gHint = false;
}



/********************************************* - radio buttons for difficulty - *********************************/
// Difficulty leves 
function getDiffucultyLevel(cellCount) {
    gBoard = buildBoard(gGameLvl);
    renderBoard(gBoard);
    clearInterval(gWatch)
    startMining();
    initHintBtns();
    gLevel.SIZE = cellCount;
    gGameLvl = gLevel.SIZE;
    gClickCounter = 0;
    gHintCounter = 3
    gScore =0
    gHint = false;
}


/********************************************* - RENDER radio buttons for difficulty - *********************************/
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
    } if (gBoard.length === 16) {

        amount = 30
    }

    for (var i = 0; i < amount; i++) {
     
            var iMine = getRandomInt(0, board.length - 1)
            var jMine = getRandomInt(0, board.length - 1)

            if (!board[iMine][jMine].isMine && !board[iMine][jMine].isShown) {
            
                board[iMine][jMine].isMine = true
            }
       


    }
}

/************************************************* - TOP LINE OF TIME AND HINT- *****************************************/

function startWatch() {
    var startTime = Date.now();
    gWatch = setInterval(function () {
        var currTime = Date.now();
        var totalTime = Math.round((currTime - startTime) / 1000);
        renderTime(totalTime);
    }, 1000);
}

function renderTime(time) {
    document.querySelector('#time-sec').innerText = `${time}`;
}

/************************************************* - Render the board - *****************************************/
function renderBoard(board) {

    var strHtml = '';


    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            
            if (cell.isShown) {
                if (cell.isMine) {
                    strHtml += `<td id="cell-${i}-${j}" class=""> ${CELL_MINE} </td>`
                } else {
                    

                    if (cell.minesAroundCount === 0) {
                        strHtml += `<td id="cell-${i}-${j}" class="">${CELL_EMPTY}</td>`
                    }
                    if (cell.minesAroundCount === 1) {
                        strHtml += `<td id="cell-${i}-${j}" class="">${CELL_ONE_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 2) {
                        strHtml += `<td id="cell-${i}-${j}" class="" >${CELL_TWO_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 3) {
                        strHtml += `<td id="cell-${i}-${j}" class="">${CELL_THREE_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 4) {
                        strHtml += `<td id="cell-${i}-${j}" class="">${CELL_FOUR_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 5) {
                        strHtml += `<td id="cell-${i}-${j}" class="">${CELL_FIVE_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 6) {
                        strHtml += `<td id="cell-${i}-${j}" class="">${CELL_SIX_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 7) {
                        strHtml += `<td id="cell-${i}-${j}" class="">${CELL_SEVEN_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 8) {
                        strHtml += `<td id="cell-${i}-${j}" class="">${CELL_EIGHT_AROUND}</td>`
                    }

                    else if (!cell.isShown) {
                        strHtml += `<td id="cell-${i}-${j}" class="" oncontextmenu="cellMarked(this)" onclick="cellClicked(this,${i},${j})"> ${CELL_COVERED} </td>`
                    }
                    
                }
            } else{
                strHtml += `<td id="cell-${i}-${j}" class="" oncontextmenu="cellMarked(this)" onclick="cellClicked(this,${i},${j})"> ${CELL_COVERED} </td>`

            }
        }
        strHtml += '</td>';
    }
    var elMat = document.querySelector('.board');
    elMat.innerHTML = strHtml;
}

gBtn = document.querySelector('.new-game');
gBtn.innerHTML = `${SMILEY_FACE}`


/********************************************************** - Cells - *********************************************/
function cellClicked(elCell, i, j,e) {
    console.log(e)
    gBtn.innerHTML = `${SCARED_FACE}`
    setTimeout(changeSmileyIcon, 140);
    var clickSound = new Audio('/audio/click.wav');
    var explosion = new Audio("/audio/Explosion.mp3");
    gClickCounter++
    if (gClickCounter === 1) {
        startMining()
        startWatch()
    }

    cell = gBoard[i][j];
    if (!gHint) {
        if (!cell.isMine) {
   
            clickSound.play()
            gScore++
            var score = document.querySelector('.score');
            score.innerHTML = `Score: ${gScore}`
           
        }
        cell.isShown = true;
        if (cell.isMine) {
            // gCellContent = CELL_MINE;
            explosion.play()
            GameOver();
        }

        // gBtn.innerHTML = `${SMILEY_FACE}`
    } else {
        gHint = true;
        clickSound.play()
        getMinesLocation(i, j, gBoard)
        // setTimeout(revealCards, 1000)
    }
    renderBoard(gBoard);

    // renderCell({i: i, j: j },gCellContent)
}


/*************************************************************************************************************/

function cellMarked(elCell) {

elCell.isMarked = true;
renderBoard()
}



function newGame() {
    gBoard = buildBoard(getSquareRoot(gGameLvl));
    gScore =0
    renderBoard(gBoard);
    setTimeout(changeSmileyIcon, 140);
    clearInterval(gWatch)
    initHintBtns();
    gHintCounter = 3
    gClickCounter = 0
    gBtn.innerHTML = `${SCARED_FACE}`
    gHint = false;
}

function initHintBtns(){
    var btnsHint = document.querySelectorAll('.hint-btn');
    for (var i = 0; i < btnsHint.length; i++) {
       
        var btn = btnsHint[i];
        btn.classList.remove('hidden')
    }
}
// Check if game is over
function checkGameOver() {

}


function GameOver() {
    // for (var i = 0; i < gBoard.length; i++) {
    //     var row = gBoard[i]
    //     for (var j = 0; j < array.length; j++) {
    //         var cell = row[j];
            
    //     }
        
    // }
    console.log('game over');
    setTimeout(initGame, 500)
    clearInterval(gWatch)
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




function startMining() {
    // if (gClickCounter === 2) {

    createMines(gBoard);
    findMines(gBoard);
    // }
}

function getHint(board,elBtn) {
    if (gHintCounter >= 0) {
        elBtn.classList.add('hidden');
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


function changeSmileyIcon() {

    gBtn.innerHTML = `${SMILEY_FACE}`
}




function expandShown(board, cellI, cellJ, elCell ) {

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j].minesAroundCount === 0) {
                expandShown();
            }
        }
    }
}