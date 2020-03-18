'use-strict';

const MINE_IMG = '☠'
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
// const UNCLICKED = ' '


// Model
var gBoard;
var gLevel = { SIZE: 4, MINES: 2 };
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
var gGameLvl = 0;
var gMineCounter = 0;

const UNCLICKEDCELL = ' ';

/*************************************** -  Initialize the game - ************************************/
function initGame() {
    gBoard = buildBoard(4);
    createMines(gBoard);
    findMines(gBoard);
    renderBoard(gBoard);
    // TODO: set neighbours count = null
    console.log(gBoard);


    renderlevelDifficulty();
    // console.log('gGameLvl ',gGameLvl)
}





/********************************** - radio buttons for difficulty - *********************************/
// Difficulty leves 
function getDiffucultyLevel(elRadioBtn) {
    gLevel.SIZE = elRadioBtn.value;
    gGameLvl = gLevel.SIZE;

}



/********************************** - RENDER radio buttons for difficulty - *********************************/
function renderlevelDifficulty() {
    var strHtml = '';
    var onClickF = 'class="radio-button" onclick="getDiffucultyLevel(this)" type="radio"';
    strHtml += `
    <input ${onClickF}  value="16">
    <label class="labels" for="16">Easy</label>
    <input ${onClickF} type="radio"  name="level" value="64">
    <label class="labels" for="64">Hard</label>
    <input ${onClickF} type="radio" name="level" value="144">
    <label class="labels" for="144">Killer</label>
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


/****************************************** - Build the board - **********************************************/
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

/****************************************** - CREATE MINES - **********************************************/
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

            if (board[iMine][jMine].isMine === false) {
                count++
                board[iMine][jMine].isMine = true
            }
        }


    }
}

/********************************************* - Render the board - *****************************************/
function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];

            if (cell.isShown) {
                if (cell.isMine) {
                    strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})"> ${CELL_MINE} </td>`
                } else {
                    if (cell.minesAroundCount === 0){
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_EMPTY}</td>`
                    }
                    if (cell.minesAroundCount === 1){
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_ONE_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 2){
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_TWO_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 3){
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_THREE_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 4){
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_FOUR_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 5){
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_FIVE_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 6){
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_SIX_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 7){
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_SEVEN_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 8){
                        strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${CELL_EIGHT_AROUND}</td>`
                    }
                    
                    // else{
                    //     strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})">${cell.minesAroundCount}</td>`
                    // }
                }
            } else {
                strHtml += `<td id="cell-${i}-${j}" class="" onclick="cellClicked(this,${i},${j})"> ${CELL_COVERED} </td>`
            }



            // var cell = row[j];
            // var className = '';
            // var tdId = `cell-${i}-${j}`;
            // strHtml += `<td id="${tdId}" class="${className}" onclick="cellClicked(this,${i},${j})">${cell}</td>`
        }
        strHtml += '</td>';
    }
    var elMat = document.querySelector('.board');
    elMat.innerHTML = strHtml;
}



/******************************************************* - Cells - *********************************************/
function cellClicked(elCell, i, j) {
    var clickSound = new Audio('/audio/click.wav');
    clickSound.play()

    // var cell = elCell;
    cell = gBoard[i][j];
    cell.isShown = true;
    if(cell.isMine){
        GameOver();
    }
    renderBoard(gBoard);
    console.log('cell clicked is ', cell, '\n this is i ', i, '\n this is j ', j, '\n this is Cell is shown ', cell.isShown)
}


function renderCell(location, value) {
    var elCell = document.getElementById(`cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}
/*************************************************************************************************************/

function cellMarked(elCell) {

}



function expandShown(board, elCell, i, j) {

    


}


function newGame() {

    gBoard = buildBoard(getSquareRoot(gGameLvl));
    createMines(gBoard);
    findMines(gBoard);
    renderBoard(gBoard);


    renderlevelDifficulty();
}


// Check if game is over
function checkGameOver() {

}


function GameOver() {
    alert('game over');
}


function findMines(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            var cell = board[i][j];

            if (cell.isMine === true) {
                console.log('found mine ', i, j)
                setMinesNegsCount(i, j, board)
                console.log('neighbours are: ', board[i][j].minesAroundCount)
            }

        }
    }

    // setMinesNegsCount(gBoard)
}


function startTimer (){
// var startTiming = new Date().getTime();
//     var timeMin = document.getElementById('time-min');
//     var timeSec = document.getElementById('time-sec');

// var later = new Date().getTime();
// var time = later - startTiming;
// var final = Math.floor((time % (1000 * 60) / 1000))
// console.log('this is timer ',final);





}
// setInterval(startTimer,100)