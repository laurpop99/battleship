import * as GAME from './gameBoard.js';
import * as MAIN from './index.js';
import * as SHIP from './ship.js';
import Icon from '../dist/image/GitHub-Mark-32px.png';
import 'babel-polyfill';
const player = require('./player.js');
const game = require('./gameBoard.js');
const checkReceiveAttack = game.checkReceiveAttack;
//HEADER
const header = document.createElement('div');
header.classList.add('header');
document.body.appendChild(header);

const headerTitleDiv = document.createElement('div');
headerTitleDiv.classList.add('headerTitleDiv');
header.appendChild(headerTitleDiv);

const headerTitle = document.createElement('h1');
headerTitle.classList.add('headerTitle');
headerTitleDiv.appendChild(headerTitle);
headerTitle.textContent = 'Battleship';

//CONTENT
const content = document.createElement('div');
content.classList.add('content');
document.body.appendChild(content);

//NEW GAME BUTTON
const newGameDiv = document.createElement('div');
content.appendChild(newGameDiv);
newGameDiv.classList.add('newGameDiv');

const newGameBtn = document.createElement('button');
newGameDiv.appendChild(newGameBtn);
newGameBtn.classList.add('newGameBtn');
newGameBtn.textContent = 'New Game';
newGameBtn.addEventListener('click', function () {
  if (COUNTER === 5) {
    boardsDiv.removeChild(computerBoard);
  }
  resetCounter();
  game.newGame();
});
//BOARDS
export const boardsDiv = document.createElement('div');
boardsDiv.classList.add('boards');
content.appendChild(boardsDiv);

//PLAYER BOARD
const playerBoard = document.createElement('div');
playerBoard.classList.add('playerBoard');
boardsDiv.appendChild(playerBoard);

const playerBoardTitle = document.createElement('h2');
playerBoardTitle.classList.add('playerBoardTitle');
playerBoard.appendChild(playerBoardTitle);
playerBoardTitle.textContent = 'Player Board';

const playerBoardContent = document.createElement('div');
playerBoardContent.classList.add('playerBoardContent');
playerBoard.appendChild(playerBoardContent);

//INITIALIZE PLAYER BOARD

// initializePlayerBoard();
export function initializePlayerBoard() {
  for (let column = 0; column < 10; column += 1) {
    for (let row = 0; row < 10; row += 1) {
      const coordinate = document.createElement('div');
      playerBoardContent.appendChild(coordinate);
      coordinate.classList.add('coordinate');
    }
  }
}
export function reinitializePlayerBoard(boards) {
  playerBoardContent.textContent = ' ';
  for (let column = 0; column < 10; column += 1) {
    for (let row = 0; row < 10; row += 1) {
      const coordinate = document.createElement('div');
      playerBoardContent.appendChild(coordinate);
      coordinate.classList.add('coordinate');
      if (boards['playerBoard'].coordinates[column][row] === 'E') {
        coordinate.style.backgroundColor = 'green';
      } else if (boards['playerBoard'].coordinates[column][row] === 'X') {
        coordinate.style.backgroundColor = 'red';
      }
    }
  }
}

let COUNTER = 0;
export function resetCounter() {
  COUNTER = 0;
}
export function placeShips(boards) {
  const shipFleet = SHIP.shipFleet;
  const ships = SHIP.ships;
  playerBoardContent.textContent = '';
  playerBoardTitle.textContent = `Place your ${shipFleet[ships[COUNTER]].name}`;
  placeShipCoords(shipFleet[ships[COUNTER]]);

  function placeShipCoords(ship) {
    let isClicked = false;
    let isOverlapping = false;

    playerBoardContent.textContent = '';
    let coordinates = new Array(10);
    for (let column = 0; column < 10; column += 1) {
      coordinates[column] = new Array(10);
      for (let row = 0; row < 10; row += 1) {
        const coordinate = document.createElement('div');
        playerBoardContent.appendChild(coordinate);
        coordinate.classList.add('coordinate');
        coordinates[column][row] = coordinate;
        let counter = 0;
        displayPlacedShips(game.boards, coordinates, column, row, counter);

        coordinate.addEventListener('mouseenter', function () {
          isClicked = false;
          if (row + ship.length > 10) {
            let counter = 0;
            for (let i = 0; i < ship.length; i += 1) {
              displayHoveredShip(coordinates, 'red', counter);
              counter += 1;
            }
          } else {
            let counter = 0;
            for (let i = 0; i < ship.length; i += 1) {
              displayHoveredShip(coordinates, 'green', counter);

              counter += 1;
            }

            for (let i = 0; i < ship.length; i += 1) {
              if (boards['playerBoard'].coordinates[column][row + i] !== ' ') {
                isOverlapping = true;
                for (let i = 0; i < ship.length; i += 1) {
                  displayHoveredShip(coordinates, 'red', i);
                }
              }
            }
          }
        });
        coordinate.addEventListener('mouseleave', function () {
          isClicked = false;
          isOverlapping = false;
          if (row + ship.length > 10) {
            let counter = 0;
            for (let i = 0; i < ship.length; i += 1) {
              displayHoveredShip(coordinates, '', counter);
              displayPlacedShips(
                game.boards,
                coordinates,
                column,
                row,
                counter
              );
              counter += 1;
            }
          } else {
            if (!isClicked) {
              let counter = 0;
              for (let i = 0; i < ship.length; i += 1) {
                displayHoveredShip(coordinates, '', counter);
                displayPlacedShips(
                  game.boards,
                  coordinates,
                  column,
                  row,
                  counter
                );
                counter += 1;
              }
            }
          }
        });
        coordinate.addEventListener('click', function () {
          if (COUNTER <= 4) {
            if (row + ship.length > 10 || isOverlapping) {
              return;
            } else {
              GAME.placeShip('playerBoard', `${ship.name}`, column, row);
              player.computerPlaceChoice(ship, ships, COUNTER);
              COUNTER += 1;

              if (COUNTER <= 4) {
                playerBoardTitle.textContent = `Place your ${
                  shipFleet[ships[COUNTER]].name
                }`;
                placeShipCoords(shipFleet[ships[COUNTER]]);
              } else if (COUNTER === 5) {
                boardsDiv.appendChild(computerBoard);
                playerBoardTitle.textContent = 'Player Board';
                reinitializePlayerBoard(game.boards);
              }
            }
          }
        });

        function displayHoveredShip(coordinates, color, counter) {
          coordinates[column][row + counter].style.backgroundColor = `${color}`;
        }
        function displayPlacedShips(boards, coordinates, column, row, counter) {
          if (
            boards['playerBoard'].coordinates[column][row + counter] !== ' '
          ) {
            coordinates[column][row + counter].style.backgroundColor = 'green';
          }
        }
      }
    }
  }
}

export function newBoard(board) {
  computerBoardContent.textContent = ' ';

  initializeComputerBoard(board);
}

//COMPUTER BOARD
let playerBoardInitialized = false;
export const computerBoard = document.createElement('div');
computerBoard.classList.add('computerBoard');
// boards.appendChild(computerBoard);

const computerBoardTitle = document.createElement('h2');
computerBoardTitle.classList.add('computerBoardTitle');
computerBoard.appendChild(computerBoardTitle);
computerBoardTitle.textContent = 'Computer Board';

const computerBoardContent = document.createElement('div');
computerBoardContent.classList.add('computerBoardContent');
computerBoard.appendChild(computerBoardContent);
initializeComputerBoard();

//INITIALIZE COMPUTER BOARD

export function initializeComputerBoard() {
  computerBoardContent.textContent = ' ';
  for (let column = 0; column < 10; column += 1) {
    for (let row = 0; row < 10; row += 1) {
      const coordinate = document.createElement('div');
      computerBoardContent.appendChild(coordinate);
      coordinate.classList.add('coordinate');
      coordinate.classList.add('pointer');
      coordinate.addEventListener('click', function () {
        if (
          this.style.backgroundColor !== 'green' &&
          this.style.backgroundColor !== 'red'
        ) {
          checkReceiveAttack(this, 'computerBoard', column, row);

          player.playerChoice(column, row);
          player.computerChoice();
          reinitializePlayerBoard(game.boards);
          game.checkWinner();
        }
      });
    }
  }
}
export function reinitializeComputerBoard(boards) {
  computerBoardContent.textContent = ' ';
  for (let column = 0; column < 10; column += 1) {
    for (let row = 0; row < 10; row += 1) {
      const coordinate = document.createElement('div');
      computerBoardContent.appendChild(coordinate);
      coordinate.classList.add('coordinate');
      if (boards['computerBoard'].coordinates[column][row] === 'E') {
        coordinate.style.backgroundColor = 'green';
      } else if (boards['computerBoard'].coordinates[column][row] === 'X') {
        coordinate.style.backgroundColor = 'red';
      }
    }
  }
}
// FOOTER
const footer = document.createElement('div');
footer.classList.add('footer');
document.body.appendChild(footer);

const footerText = document.createElement('p');
footerText.classList.add('footerText');
footer.appendChild(footerText);

footerText.textContent = 'Copyright © 2021 laurpop99';
const footerLink = document.createElement('a');
footerText.appendChild(footerLink);
footerLink.href = 'https://github.com/laurpop99/battleship';

const footerIcon = document.createElement('img');
footerIcon.classList.add('footerIcon');
footerLink.appendChild(footerIcon);
footerIcon.src = Icon;
