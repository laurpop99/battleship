const player = require('./player.js');

// test('displays player', () => {
//   expect(player.players).toEqual('hi');
// });

// test('displays myTurn false after turn', () => {
//   player.players['playerOne'].playerChoice(5, 5);
//   player.players['playerTwo'].computerChoice();
//   expect(player.players).toEqual('hi');
// });

// test('outputs computerChoice', () => {
//   player.players['playerOne'].playerChoice(5, 5);
//   player.players['playerTwo'].computerChoice();
//   expect(player.players['playerTwo'].computerChoice()).toEqual('hi');
// });

test('display attack on board', () => {
  player.players['playerTwo'].computerChoice();
  expect(player.players['playerTwo'].computerChoice()).toEqual('hi');
});
