import { Universe, Cell } from "portfolio";

import { memory } from "portfolio/portfolio_bg.wasm";

const CELL_SIZE = 1; // pixels
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

const UNIVERSE = Universe.new(512, 1024);
const ROWS = UNIVERSE.rows();
const COLUMNS = UNIVERSE.columns();
const CELLS = new Uint8Array(
   memory.buffer as ArrayBufferLike,
   UNIVERSE.cells(),
   ROWS * COLUMNS
);

const CANVAS = document.getElementById("portfolio-canvas") as HTMLCanvasElement;
CANVAS.height = (CELL_SIZE + 1) * ROWS + 1;
CANVAS.width = (CELL_SIZE + 1) * (COLUMNS / 2) + 1;

const CONTEXT = CANVAS.getContext('2d');

const getIndex = (row: number, column: number) => row * COLUMNS + column;

const drawCells = () => {
   CONTEXT.beginPath();

   const starting_column = UNIVERSE.cell_offset();
   for (let row = 0; row < ROWS; row++) {
      for (let column = starting_column; column < COLUMNS; column += 2) {
         const cell = CELLS[getIndex(row, column)];
         CONTEXT.fillStyle = cell === Cell.Alive ? ALIVE_COLOR : DEAD_COLOR;
         CONTEXT.fillRect(
            column * (CELL_SIZE + 1) + 1,
            row * (CELL_SIZE + 1) + 1,
            CELL_SIZE,
            CELL_SIZE
         );
      }
   }

   CONTEXT.stroke();
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const renderLoop = async () => {
   UNIVERSE.tick();

   drawCells();
   await sleep(50);

   requestAnimationFrame(renderLoop);
};

export {
   renderLoop,
};
