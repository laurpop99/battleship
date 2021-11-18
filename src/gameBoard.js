import * as SHIP from './ship.js';
import * as MAIN from './index.js';
import * as DOM from './dom.js';
function Gameboard(name, height, width) {
  this.name = name;
  this.height = height;
  this.width = width;
  this.coordinates = createCoordinates(this.height, this.width);
  this.shipFleet = SHIP.createShips();
}

// EXECUTION
createBoards();
// EXECUTION
function createCoordinates(height, width) {
  const coordinates = new Array(height);
  for (let i = 0; i < height; i += 1) {
    coordinates[i] = new Array(width);
    for (let x = 0; x < width; x += 1) {
      coordinates[i][x] = ' ';
    }
  }
  return coordinates;
}

export function createBoards() {
  const playerBoard = new Gameboard('playerBoard', 10, 10);
  const computerBoard = new Gameboard('computerBoard', 10, 10);
  const boards = {
    playerBoard: playerBoard,
    computerBoard: computerBoard,
  };
  return boards;
}
export let boards = createBoards();

export function placeShip(board, ship, height, width) {
  for (let i = 0; i < SHIP.shipFleet[ship].length; i += 1) {
    boards[board].coordinates[height][width + i] =
      boards[board].shipFleet[ship].hitsReceivedArr[i];
    boards[board].shipFleet[ship].startPosition = width;
  }
  // return boards[board].coordinates;
}

export function receiveAttack(board, height, width) {
  const placeHit = boards[board].coordinates[height][width];
  if (placeHit === 'C') {
    boards[board].shipFleet['carrier'].hit(
      width - boards[board].shipFleet['carrier'].startPosition
    );
    boards[board].coordinates[height][width] =
      boards[board].shipFleet['carrier'].hitsReceivedArr[
        width - boards[board].shipFleet['carrier'].startPosition
      ];
  } else if (placeHit === 'B') {
    boards[board].shipFleet['battleship'].hit(
      width - boards[board].shipFleet['battleship'].startPosition
    );
    boards[board].coordinates[height][width] =
      boards[board].shipFleet['battleship'].hitsReceivedArr[
        width - boards[board].shipFleet['battleship'].startPosition
      ];
  } else if (placeHit === 'c') {
    boards[board].shipFleet['cruiser'].hit(
      width - boards[board].shipFleet['cruiser'].startPosition
    );
    boards[board].coordinates[height][width] =
      boards[board].shipFleet['cruiser'].hitsReceivedArr[
        width - boards[board].shipFleet['cruiser'].startPosition
      ];
  } else if (placeHit === 'S') {
    boards[board].shipFleet['submarine'].hit(
      width - boards[board].shipFleet['submarine'].startPosition
    );
    boards[board].coordinates[height][width] =
      boards[board].shipFleet['submarine'].hitsReceivedArr[
        width - boards[board].shipFleet['submarine'].startPosition
      ];
  } else if (placeHit === 'D') {
    boards[board].shipFleet['destroyer'].hit(
      width - boards[board].shipFleet['destroyer'].startPosition
    );
    boards[board].coordinates[height][width] =
      boards[board].shipFleet['destroyer'].hitsReceivedArr[
        width - boards[board].shipFleet['destroyer'].startPosition
      ];
  } else if (placeHit === ' ') {
    boards[board].coordinates[height][width] = 'E';
  }

  return boards[board].coordinates;
}
export function checkReceiveAttack(obj, board, column, row) {
  if (boards[board].coordinates[column][row] === ' ') {
    obj.style.backgroundColor = 'green';
  } else if (
    boards[board].coordinates[column][row] !== ' ' &&
    boards[board].coordinates[column][row] !== 'X' &&
    boards[board].coordinates[column][row] !== 'E'
  ) {
    obj.style.backgroundColor = 'red';
  }
}
export function reportFleet(board1, board2) {
  const fleets = {};
  fleets[board1] = {
    submarine: boards[board1],
    sunk: fleetSunk(board1),
    // isSunk: boards[board1].shipFleet['carrier'].isSunk,
  };
  fleets[board2] = {
    submarine: boards[board2],
    // isSunk: boards[board2].shipFleet['carrier'].isSunk,
  };
  return fleets;
}

function displayBoards() {
  return boards;
}

function addToFleet(board) {
  boards[board].shipFleet['submarine'];
}

export function fleetSunk(board) {
  if (
    boards[board].shipFleet['battleship'].isSunk &&
    boards[board].shipFleet['carrier'].isSunk &&
    boards[board].shipFleet['cruiser'].isSunk &&
    boards[board].shipFleet['destroyer'].isSunk &&
    boards[board].shipFleet['submarine'].isSunk
  ) {
    return true;
  } else {
    return false;
  }
}
export function checkWinner() {
  if (fleetSunk('computerBoard')) {
    alert('You won!');
    const response = prompt('Play again? Y/N');
    playAgain(response);
  } else if (fleetSunk('playerBoard')) {
    alert('Computer won!');
    const response = prompt('Play again? Y/N');
    playAgain(response);
  }
}

function playAgain(arg) {
  if (arg === 'Y' || arg === 'y' || arg === 'yes' || arg === 'Yes') {
    DOM.boardsDiv.removeChild(DOM.computerBoard);
    DOM.resetCounter();
    newGame();
  }
}
export function newGame() {
  boards = MAIN.initializeGame()['boards'];
  DOM.placeShips(boards);
  DOM.newBoard(boards);
}

export default {
  placeShip: placeShip,
  boards: boards,
  receiveAttack: receiveAttack,
  reportFleet: reportFleet,
  displayBoards: displayBoards,
  addToFleet: addToFleet,
  fleetSunk: fleetSunk,
  checkReceiveAttack: checkReceiveAttack,
};
