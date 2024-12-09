const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const result = matrix.map(row => row.slice());

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j]) {
        result[i][j] = 1;
      } else {
        let mineCount = 0;

        for (let [dx, dy] of directions) {
          const ni = i + dx;
          const nj = j + dy;

          if (ni >= 0 && ni < matrix.length && nj >= 0 && nj < matrix[i].length) {
            if (matrix[ni][nj]) {
              mineCount++;
            }
          }
        }

        result[i][j] = mineCount;
      }
    }
  }

  return result;
}

module.exports = {
  minesweeper
};
