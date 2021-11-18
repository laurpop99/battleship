function Ship(name, length, symbol) {
  this.name = name;
  this.length = length;
  this.symbol = symbol;
  this.hitsReceivedArr = hitsReceivedArr(this.length, this.symbol);
  this.hit = function (num) {
    this.hitsReceivedArr[num] = 'X';
    this.isSunk = isSunk(this.hitsReceivedArr);
    return this.hitsReceivedArr;
  };
  this.isSunk = false;
}

//EXECUTION
createShips();
//EXECUTION

export function createShips() {
  const carrier = new Ship('carrier', 5, 'C');
  const battleship = new Ship('battleship', 4, 'B');
  const cruiser = new Ship('cruiser', 3, 'c');
  const submarine = new Ship('submarine', 3, 'S');
  const destroyer = new Ship('destroyer', 2, 'D');
  const shipFleet = {
    carrier: carrier,
    battleship: battleship,
    cruiser: cruiser,
    submarine: submarine,
    destroyer: destroyer,
    length: () => {
      return 5;
    },
  };
  return shipFleet;
}

export const shipFleet = createShips();
export const ships = [
  'battleship',
  'carrier',
  'cruiser',
  'submarine',
  'destroyer',
];

function hitsReceivedArr(length, symbol) {
  const hitsReceivedArr = [];
  for (let i = 0; i < length; i += 1) {
    hitsReceivedArr[i] = `${symbol}`;
  }
  return hitsReceivedArr;
}

function isSunk(hitsReceivedArr) {
  if (
    hitsReceivedArr.every((element) => {
      return element === 'X';
    })
  ) {
    return true;
  } else {
    return false;
  }
}

export default {
  createShips: createShips,
  shipFleet: shipFleet,
  isSunk: isSunk,
  ships: ships,
};
