import '../dist/style.css';
import * as SHIP from './ship.js';
import * as GAME from './gameBoard.js';
import * as PLAYER from './player.js';
import * as DOM from './dom.js';

export function initializeGame() {
  const shipFleet = SHIP.createShips();
  const players = PLAYER.createPlayers();
  const boards = GAME.createBoards();

  const game = {
    players: players,
    boards: boards,
  };
  return game;
}

GAME.newGame();
