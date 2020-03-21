'use-strict';


function getRandomInt(min, max) {

  var res = Math.floor(Math.random() * (max - min)) + min
  return res
}


function setMinesNegsCount(cellI, cellJ, mat) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= mat[i].length) continue;
      if (!mat[i][j].isMine && !mat[i][j].isShown) {
        mat[i][j].minesAroundCount++
      }
    }
  }
}


function renderCell(location, value) {
  var elCell = document.getElementById(`cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}


/******************************************* - HINT FUNCTION SECTION - **********************************/

function getMinesLocation(cellI, cellJ, mat) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue;
      if (mat[i][j].isShown) continue;
      if (mat[cellI][cellJ].isShown) continue;
      gHintedCells.push(mat[i][j])
    }
  }
  for (var i = 0; i < gHintedCells.length; i++) {
    gHintedCells[i].isShown = true
    gGame.isOn = false;
  }
  setTimeout(hideCards, 1000);


}

function hideCards(cellI, cellJ) {
  for (var i = 0; i < gHintedCells.length; i++) {
    if (i === cellI && j === cellJ) continue;
    var cell = gHintedCells[i];
    cell.isShown = false;
  }
  gHintedCells = []
  gHint = false;
  gGame.isOn = true;
  renderBoard(gBoard);
}

function initHintBtns() {
  var btnsHint = document.querySelectorAll('.hint-btn');
  for (var i = 0; i < btnsHint.length; i++) {

    var btn = btnsHint[i];
    btn.classList.remove('hidden')
  }
}

/******************************************* - CHECK GAME OVER - **********************************/


function checkGameOver() {

  var cells = gCellCounter - gLevel.MINES;

  if (gGame.shownCount === cells) {
    win();
  }

}


function renderScore() {
  var score = document.querySelector('.score');
  score.innerHTML = `Score: ${gGame.shownCount}`
  score.style.color = 'white'
}


function showAllMines(board) {
  for (var i = 0; i < board.length; i++) {
    var row = board[i];
    for (var j = 0; j < row.length; j++) {
      var cell = row[j];
      if (cell.isMine) {
        cell.isShown = true;
        renderBoard(gBoard);

      }
    }
  }
}

function win() {
  gGame.isOn = false;
  clearInterval(gTimer)
  var elWinModal = document.querySelector('.win-modal');
  elWinModal.style.display = 'block';
  elWinModal.style.opacity = '1';

}


function changeSmileyIcon() {
  if (gGame.isOn) {

    gBtn.innerHTML = `${SMILEY_FACE}`
  }
}

function clearModal() {
  var elWinModal = document.querySelector('.win-modal');
  elWinModal.style.display = 'none';

  var elWinModal = document.querySelector('.game-over-modal');
  elWinModal.style.display = 'none';

  var safeClick = document.querySelector('.safe-to-click');
  safeClick.style.opacity = '0'
}