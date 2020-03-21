'use-strict';
//TODOS:
/**
 * step 3, 3 = Implement that clicking a cell with “number” reveals the number of this cell
 * Furthur task - Make sure the first clicked cell is never a mine (like in the real game), the empty cell becomes a num
 * 
 * 
*/



/************************************************************* - IMG STOCK  - ****************************************************/
const IMG_SRC = `<img class="cell-size" src="`
const CELL_COVERED = `${IMG_SRC}images/coverd.png"></img>`;
const CELL_EMPTY = `${IMG_SRC}images/0.png"></img>`;
const CELL_MINE = `${IMG_SRC}images/bomb.png"></img>`;
const CELL_ONE_AROUND = `${IMG_SRC}images/1.png"></img>`;
const CELL_TWO_AROUND = `${IMG_SRC}images/2.png"></img>`;
const CELL_THREE_AROUND = `${IMG_SRC}images/3.png"></img>`;
const CELL_FOUR_AROUND = `${IMG_SRC}images/4.png"></img>`;
const CELL_FIVE_AROUND = `${IMG_SRC}images/5.png"></img>`;
const CELL_SIX_AROUND = `${IMG_SRC}images/6.png"></img>`;
const CELL_SEVEN_AROUND = `${IMG_SRC}images/7.png"></img>`;
const CELL_EIGHT_AROUND = `${IMG_SRC}images/8.png"></img>`;
const CELL_FLAG = `${IMG_SRC}images/flag.png"></img>`;
const SMILEY_FACE = `${IMG_SRC}images/Happy_face.png"</img>`
const SCARED_FACE = `${IMG_SRC}images/Scared_ face.png"</img>`
const SAD_FACE = `${IMG_SRC}images/sadFace.jpg"</img>`



/************************************************************************* - GET HINT SECTION - ************************************************************/
function getHint(board, elBtn) {
    if (gGame.isOn) {
        if (gHintCounter >= 0) {
            elBtn.classList.add('hidden');
            gHintCounter--
            gHint = true
            var safeClick = document.querySelector('.safe-to-click');
            safeClick.style.opacity = 1;
            setTimeout(clearModal, 1500)
        }
    }
    // safeClick.style.display = 'block';

}

/**************************************************************************** - Build the board - **********************************************************/
function buildBoard(Length) {
    gCellCounter = 0
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
            gCellCounter++
        }
    }
    return board;
}

/************************************************************************* - Render the board - ***********************************************************/
function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {

            var cell = row[j];
            var className = '"cell"'
            var tdId = `<td id="cell-${i}-${j}"`

            if (cell.isShown) {
                if (cell.isMine) {
                    strHtml += `${tdId} class=${className}> ${CELL_MINE} </td>`
                } else {

                    if (cell.minesAroundCount === 0) {

                        strHtml += `${tdId} class=${className}>${CELL_EMPTY}</td>`
                    }
                    if (cell.minesAroundCount === 1) {
                        strHtml += `${tdId} class=${className}>${CELL_ONE_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 2) {
                        strHtml += `${tdId} class=${className} >${CELL_TWO_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 3) {
                        strHtml += `${tdId} class=${className}>${CELL_THREE_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 4) {
                        strHtml += `${tdId} class=${className}>${CELL_FOUR_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 5) {
                        strHtml += `${tdId} class=${className}>${CELL_FIVE_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 6) {
                        strHtml += `${tdId} class=${className}>${CELL_SIX_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 7) {
                        strHtml += `${tdId} class=${className}>${CELL_SEVEN_AROUND}</td>`
                    }
                    if (cell.minesAroundCount === 8) {
                        strHtml += `${tdId} class=${className}>${CELL_EIGHT_AROUND}</td>`
                    }

                }
            } else {

                if (!cell.isShown && !cell.isMarked) {

                    strHtml += `${tdId} class=${className} oncontextmenu="cellMarked(${i},${j})" onclick="cellClicked(this,${i},${j})"> ${CELL_COVERED} </td>`
                }
                else if ((!cell.isShown && cell.isMarked)) {

                    strHtml += `${tdId} class=${className} oncontextmenu="cellMarked(${i},${j})" onclick="cellClicked(this,${i},${j})"> ${CELL_FLAG} </td>`
                }


            }
        }
        strHtml += '</td>';
    }
    var elMat = document.querySelector('.board');
    elMat.innerHTML = strHtml;
}

gBtn = document.querySelector('.new-game');
gBtn.innerHTML = `${SMILEY_FACE}`


/************************************************************************* - CREATE MINES - ******************************************************/

function createMines(board, cellI, cellJ) {

    for (var i = 0; i < gLevel.MINES; i++) {

        var iMine = getRandomInt(0, board.length - 1)
        var jMine = getRandomInt(0, board.length - 1)
        if (cellI === iMine && cellJ === jMine) {
            iMine = getRandomInt(0, board.length - 1)
            jMine = getRandomInt(0, board.length - 1)

        }

        if (!board[iMine][jMine].isMine && !board[iMine][jMine].isShown) {

            board[iMine][jMine].isMine = true
        }

    }
}
/******************************************************************* - FIND  MINES  AND START MINING- ***********************************************/
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

function startMining(i, j) {
    createMines(gBoard, i, j);
    findMines(gBoard);

}


/************************************************************************* - CLICKED CELLS - ************************************************************/
function cellClicked(elCell, i, j) {

    var cell = gBoard[i][j];

    var heart = document.querySelectorAll('.heart-lives')
    var clickSound = new Audio('audio/click.wav');
    var explosion = new Audio("audio/Explosion.mp3");

    if (gGame.isOn) {

        gBtn.innerHTML = `${SCARED_FACE}`
        if (gClickCounter === 0) {
            gClickCounter++
            startMining(i, j)
            startWatch()
        }

        if (!gHint) {
            if (!cell.isMine) {
                if (cell.minesAroundCount === 0) {
                    expandShown(gBoard, i, j)
                    // gGame.shownCount++
                }
                clickSound.play()
                gGame.shownCount++
                renderScore()

            }
            cell.isShown = true;
            if (cell.isMine) {
                explosion.play()
                // debugger
                if (gLives > 0) {
                    // debugger
                    switch (gLives) {
                        case 3:
                            heart[2].style.display = 'none'
                            gLives--
                            break;
                            case 2:
                                gLives--
                                heart[1].style.display = 'none'
                                break;
                                case 1:
                                    heart[0].style.display = 'none'
                                    gLives--
                                        gGame.isOn = false;
                    
                                        setTimeout(GameOver, 500);
                            break;
                    }
                }
                //  else {
                    
                    //     gGame.isOn = false;
    
                    //     setTimeout(GameOver, 1500);
                // }
            }

        } else {
            getMinesLocation(i, j, gBoard)
        }
        setTimeout(changeSmileyIcon, 140);
        renderBoard(gBoard);

    }

    checkGameOver()

}


/********************************************************************** - MARKED CELLS- *********************************************************************/

function cellMarked(i, j) {
    if (!gGame.isOn) return;
    var cell = gBoard[i][j];
    if (!cell.isMarked) {
        cell.isMarked = true;
        if (cell.isMine) {
            gGame.markedCount++;
        }
        renderBoard(gBoard)
        return;
    }
    if (cell.isMarked) {
        cell.isMarked = false;
        gGame.markedCount--;
    }
    checkGameOver()
    renderBoard(gBoard)
}




/********************************************************************** - EXPAND EMPTY CELLS- *********************************************************************/


function expandShown(board, cellI, cellJ, elCell) {

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        if (board[i].isShown) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j].minesAroundCount >= 0 && !board[i][j].isMine && !board[i][j].isShown) {
                board[i][j].isShown = true;
                gGame.shownCount++
                renderBoard(gBoard)


            }

        }
    }
}


