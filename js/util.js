'use-strict';


function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.getElementById(`cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomInt(min, max) {

  var res = Math.floor(Math.random() * (max - min)) + min
  return res
}


function getClassName(location) {
  var cellClass = 'cell-' + location.i + '-' + location.j;
  return cellClass;
}





// LOOK 1 CELL UP AND  1 CELL DOWN
// IF THERE IS NO MORE SPACE TO GO UP OR DOWN, SKIP THIS ITERATION
// LOOK 1 CELL LEFT AND 1 CELL RIGHT
// IF YOU ARE ON THE SAME COORDS, SKIP ITTERATION
// IF THERE IS NO MORE SPACE TO GO LEFT OR RIGHT, SKIP THIS ITERATION
// IF YOU FIND A CELL THAT HAS ISMINE.TRUE = PUSH IT TO THE RES
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




function getMinesLocation(cellI, cellJ, mat) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (mat[cellJ][cellJ].isShown) continue;
      if (j < 0 || j >= mat[i].length) continue;
      gHintedCells.push(mat[i][j])
    }
  }
  for (var i = 0; i < gHintedCells.length; i++) {
    gHintedCells[i].isShown = true
    gGame.isOn = false;
  }
  setTimeout(hideCards, 1000);


}


function hideCards() {

  for (var i = 0; i < gHintedCells.length; i++) {
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
// Check if game is over
function checkGameOver() {

}





