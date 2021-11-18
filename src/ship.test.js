const { outputShip } = require('./ship.js');
const ship = require('./ship.js');
const shipFleet = ship.shipFleet;
const isSunk = ship.isSunk;

// test('output battleship', () => {
//   expect(ship.outputShip('battleship').hitsReceivedArr).toEqual([
//     ' ',
//     ' ',
//     ' ',
//     ' ',
//   ]);
// });

// test('displays place hit', () => {
//   expect(shipFleet['battleship'].hit(3)).toEqual(['B', 'B', 'B', 'X']);
// });

// test('display isSunk correctly', () => {
//   expect(isSunk(['X', 'X', 'X'])).toBeTruthy();
// });

// test('expect true if hitsReceivedArr is full of X', () => {
//   expect(ship.outputShip('battleship').isSunk).toBeFalsy();
// });
