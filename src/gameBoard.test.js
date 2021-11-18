const gameBoard = require('./gameBoard.js');
const player = require('./player.js');
const placeShip = gameBoard.placeShip;
const boards = gameBoard.boards;
const receiveAttack = gameBoard.receiveAttack;
const reportFleet = gameBoard.reportFleet;
const displayBoards = gameBoard.displayBoards;

const coordArr = [
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['E', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['C', 'C', 'C', 'X', 'C', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
];

// test('displays height', () => {
//   expect(boards['playerBoard'].height).toBe(10);
// });

// test('place one ship onto board', () => {
//   expect(placeShip('playerBoard', 'carrier', 4, 0)).toEqual(coordArr);
// });

// test('attacks one ship', () => {
//   //   expect(placeShip('playerBoard', 'carrier', 4, 0)).toEqual(coordArr);
//
//   placeShip('playerBoard', 'submarine', 3, 0);
//   receiveAttack('playerBoard', 3, 1);
//   receiveAttack('playerBoard', 2, 0);
//   expect(receiveAttack('playerBoard', 4, 3)).toEqual(coordArr);
// });
// test('show both boards', () => {
//   placeShip('playerBoard', 'carrier', 4, 0);
//   placeShip('playerBoard', 'submarine', 3, 0);
//   receiveAttack('playerBoard', 2, 0);
//   receiveAttack('playerBoard', 3, 0);
//   receiveAttack('playerBoard', 3, 1);
//   receiveAttack('playerBoard', 4, 3);
//   receiveAttack('playerBoard', 3, 2);
//   // expect(reportFleet('computerBoard')).toEqual(true);
//   expect(displayBoards()).toBe();
// });
test('show if boat isSunk', () => {
  placeShip('playerBoard', 'destroyer', 1, 0);
  placeShip('playerBoard', 'cruiser', 5, 0);
  placeShip('playerBoard', 'battleship', 6, 0);
  placeShip('playerBoard', 'carrier', 4, 0);
  placeShip('playerBoard', 'submarine', 3, 0);
  for (let i = 0; i < 10; i += 1) {
    receiveAttack('playerBoard', 0, i);
    receiveAttack('playerBoard', 1, i);
    receiveAttack('playerBoard', 2, i);
    receiveAttack('playerBoard', 3, i);
    receiveAttack('playerBoard', 4, i);
    receiveAttack('playerBoard', 5, i);
    receiveAttack('playerBoard', 6, i);
    receiveAttack('playerBoard', 7, i);
    receiveAttack('playerBoard', 8, i);
    receiveAttack('playerBoard', 9, 0);
    receiveAttack('playerBoard', 9, 1);
    receiveAttack('playerBoard', 9, 2);
    receiveAttack('playerBoard', 9, 3);
    receiveAttack('playerBoard', 9, 4);
    receiveAttack('playerBoard', 9, 5);
    receiveAttack('playerBoard', 9, 6);
    receiveAttack('playerBoard', 9, 9);
  }
  placeShip('computerBoard', 'battleship', 0, 0);
  player.players['playerOne'].playerChoice(0, 0);
  player.players['playerTwo'].computerChoice();
  expect(reportFleet('playerBoard', 'computerBoard')).toEqual();
  // expect(gameBoard.addToFleet('playerBoard')).toEqual('hi');
  // expect(reportFleet('computerBoard')).toEqual(true);
});
// test('show fleet of board', () => {
//   placeShip('playerBoard', 'carrier', 4, 0);
//   placeShip('playerBoard', 'submarine', 3, 0);
//   receiveAttack('playerBoard', 2, 0);
//   receiveAttack('playerBoard', 3, 0);
//   receiveAttack('playerBoard', 3, 1);
//   receiveAttack('playerBoard', 4, 3);
//   receiveAttack('playerBoard', 3, 2);
//   //   expect(receiveAttack('playerBoard', 3, 2)).toEqual(coordArr);
//
// });

test('test last computer turn ', () => {
  expect(player.computerLastTurn()).toBe();
});
