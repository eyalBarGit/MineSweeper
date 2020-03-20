'use-strict';
//TODOS:
/**
 * step 3, 3 = Implement that clicking a cell with “number” reveals the number of this cell
 * Furthur task - Make sure the first clicked cell is never a mine (like in the real game), the empty cell becomes a num
 * 
 * 
*/



/********************************************* -   - ****************************************/

const CELL_COVERED = `<img class="cell-size" src="images/coverd.png"></img>`;
const CELL_EMPTY = `<img class="cell-size" src="images/0.png"></img>`;
const CELL_MINE = `<img class="cell-size" src="images/bomb.png"></img>`;
const CELL_ONE_AROUND = `<img class="cell-size" src="images/1.png"></img>`;
const CELL_TWO_AROUND = `<img class="cell-size" src="images/2.png"></img>`;
const CELL_THREE_AROUND = `<img class="cell-size" src="images/3.png"></img>`;
const CELL_FOUR_AROUND = `<img class="cell-size" src="images/4.png"></img>`;
const CELL_FIVE_AROUND = `<img class="cell-size" src="images/5.png"></img>`;
const CELL_SIX_AROUND = `<img class="cell-size" src="images/6.png"></img>`;
const CELL_SEVEN_AROUND = `<img class="cell-size" src="images/7.png"></img>`;
const CELL_EIGHT_AROUND = `<img class="cell-size" src="images/8.png"></img>`;
const CELL_FLAG = `<img class="cell-size" src="images/flag.png"></img>`;
const SMILEY_FACE = `<img style="width:35px" src="images/Happy_face.png"</img>`
const SCARED_FACE = `<img style="width:35px" src="images/Scared_ face.png"</img>`
const SAD_FACE = `<img style="width:35px" src="images/sadFace.png"</img>`



/********************************************* -  MODEL - ****************************************/

var gBoard;
var gLevel = { SIZE: 4, MINES: 2 };
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
var gGameLvl = 0;
var gClickCounter = 0;
var gWatch;
var gHint = false;
var gHintedCells = [];
var gHintCounter = 3;
var gCellContent;
var gBtn;
// var gScore = 0


/********************************************* -  INITIALIZE THE GAME - ****************************************/
function initGame() {
    gGame.isOn = true;
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard);
    clearInterval(gWatch)
    gClickCounter = 0;
    gHintCounter = 3
    gGame.shownCount = 0;
    gHint = false;
    renderTime(0)
}


function newGame() {
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard);
    setTimeout(changeSmileyIcon, 140);
    clearInterval(gWatch)
    initHintBtns();
    renderTime(0)
    gGame.isOn = true;
    gGame.shownCount = 0;
    gHintCounter = 3
    gClickCounter = 0
    gBtn.innerHTML = `${SCARED_FACE}`
    gHint = false;
}


function GameOver() {
    gGame.isOn = false;
    console.log('game over');
    gBtn.innerHTML = `${SAD_FACE}`

}


/********************************************* - DIFFICULTY BUTTONS - *********************************/

function getDiffucultyLevel(cellCount, numOfMines) {
    gLevel = {
        SIZE: cellCount,
        MINES: numOfMines
    }
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard);
    clearInterval(gWatch)
    startMining();
    initHintBtns();
    renderTime(0)
    gClickCounter = 0;
    gHintCounter = 3
    gGame.shownCount = 0;
    gHint = false;
    gGame.isOn =true
}

/************************************************* - TIMER- *****************************************/

function startWatch() {
    if (gGame.isOn) {

        var startTime = Date.now();
        gWatch = setInterval(function () {
            var currTime = Date.now();
            var totalTime = Math.round((currTime - startTime) / 1000);
            renderTime(totalTime);
        }, 1000);
    }
}

function renderTime(time) {
    document.querySelector('#time-sec').innerText = `${ gGame.secsPassed}`;
    gGame.secsPassed = time;
}



/*************************************************** - GET HINT SECTION - **************************************************/
function getHint(board, elBtn) {
    if (gGame.isOn) {

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

}

/**************************************************** - Build the board - **********************************************/
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

/******************************************************** - Render the board - *****************************************/
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
            } else {
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



/**************************************************** - CREATE MINES - **********************************************/

function createMines(board) {

    for (var i = 0; i < gLevel.MINES; i++) {

        var iMine = getRandomInt(0, board.length - 1)
        var jMine = getRandomInt(0, board.length - 1)

        if (!board[iMine][jMine].isMine && !board[iMine][jMine].isShown) {

            board[iMine][jMine].isMine = true
        }
    }
}
/**************************************************** - FIND  MINES  AND START MINING- **********************************************/
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





/********************************************************** - Cells - *********************************************/
function cellClicked(elCell, i, j, ) {
    // console.log(e)

    if (gGame.isOn) {


        var clickSound = new Audio('audio/click.wav');
        var explosion = new Audio("audio/Explosion.mp3");
        gClickCounter++
        setTimeout(changeSmileyIcon, 140);
        gBtn.innerHTML = `${SCARED_FACE}`
        if (gClickCounter === 1) {
            startMining()
            startWatch()
        }

        cell = gBoard[i][j];
        if (!gHint) {
            if (!cell.isMine) {

                clickSound.play()
                gGame.shownCount
                var score = document.querySelector('.score');
                score.innerHTML = `Score: ${gGame.shownCount}`

            }
            cell.isShown = true;
            if (cell.isMine) {
                explosion.play()
                GameOver();
            }

        } else {
            gHint = true;
            clickSound.play()
            getMinesLocation(i, j, gBoard)
        }
        renderBoard(gBoard);
    }

}


/*************************************************************************************************************/

function cellMarked(elCell) {

    elCell.isMarked = true;
    renderBoard()
}




function changeSmileyIcon() {

    gBtn.innerHTML = `${SMILEY_FACE}`
}




// function expandShown(board, cellI, cellJ, elCell) {

//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= board.length) continue;
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (i === cellI && j === cellJ) continue;
//             if (j < 0 || j >= board[i].length) continue;
//             if (board[i][j].minesAroundCount === 0) {
//                 expandShown();
//             }
//         }
//     }
// }


