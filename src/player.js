import * as GAME from './gameBoard.js';
function Player(name) {
  this.name = name;
  this.myTurn = true;
}

export function createPlayers() {
  const playerOne = new Player('Player 1');
  const playerTwo = new Player('Player 2');
  const players = { playerOne: playerOne, playerTwo: playerTwo };
  return players;
}
export let players = createPlayers();

export function playerChoice(heightChoice, widthChoice) {
  GAME.receiveAttack('computerBoard', heightChoice, widthChoice);
  // players['playerOne'].myTurn = false;
  // players['playerTwo'].myTurn = true;
}

export function computerPlaceChoice(ship, ships, counter) {
  function generateCoords() {
    const heightGenerated = Math.floor(Math.random() * 10);
    const widthGenerated = Math.floor(Math.random() * 10);
    const coordsGenerated = {
      heightGenerated: heightGenerated,
      widthGenerated: widthGenerated,
    };
    return coordsGenerated;
  }
  let coordsGenerated = generateCoords();
  while (
    GAME.boards['computerBoard'].coordinates[
      coordsGenerated['heightGenerated']
    ][coordsGenerated['widthGenerated']] !== ' ' ||
    coordsGenerated['widthGenerated'] + ship.length > 10
  ) {
    coordsGenerated = generateCoords();
  }
  GAME.placeShip(
    'computerBoard',
    ships[counter],
    coordsGenerated['heightGenerated'],
    coordsGenerated['widthGenerated']
  );
}
export function computerChoice() {
  function generateCoords() {
    const heightGenerated = Math.floor(Math.random() * 10);
    const widthGenerated = Math.floor(Math.random() * 10);
    const coordsGenerated = {
      heightGenerated: heightGenerated,
      widthGenerated: widthGenerated,
    };
    return coordsGenerated;
  }
  let coordsGenerated = generateCoords();
  while (
    (GAME.boards['playerBoard'].coordinates[coordsGenerated['heightGenerated']][
      coordsGenerated['widthGenerated']
    ] === 'E' ||
      GAME.boards['playerBoard'].coordinates[
        coordsGenerated['heightGenerated']
      ][coordsGenerated['widthGenerated']] === 'X') &&
    computerLastTurn() === false
  ) {
    coordsGenerated = generateCoords();
  }
  GAME.receiveAttack(
    'playerBoard',
    coordsGenerated['heightGenerated'],
    coordsGenerated['widthGenerated']
  );
}

function computerLastTurn() {
  const board = GAME.boards['playerBoard'].coordinates;
  let emptyCells = 0;
  for (let i = 0; i < 10; i += 1) {
    for (let x = 0; x < 10; x += 1) {
      if (board[i][x] === ' ') {
        emptyCells += 1;
      }
    }
  }
  if (emptyCells === 0) {
    return true;
  } else {
    return false;
  }
}
export default {
  playerChoice: playerChoice,
  computerChoice: computerChoice,
  players: players,
  computerLastTurn: computerLastTurn,
};
