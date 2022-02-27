import { Universe } from "portfolio";

import { memory } from "portfolio/portfolio_bg";

const CELL_SIZE = 1; // pixels
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

const universe = Universe.new(256, 512);
const rows = universe.rows();
const columns = universe.columns();
const CELLS_PER_CLUSTER = universe.cells_per_cluster();

const canvas = document.getElementById("portfolio-canvas");
canvas.height = (CELL_SIZE + 1) * rows + 1;
canvas.width = (CELL_SIZE + 1) * (columns / 2) + 1;

const context = canvas.getContext('2d');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getCellValue = (row, column, cellClusters) => {
   const cellNumber = row * columns + column;
   const cellClusterIndex = Math.floor(cellNumber / CELLS_PER_CLUSTER);
   const cellIndex = cellNumber % CELLS_PER_CLUSTER;
   return (cellClusters[cellClusterIndex] >>> cellIndex) & 1;
};

const renderLoop = async () => {
   universe.tick();

   drawCells();
   await sleep(50);

   requestAnimationFrame(renderLoop);
};

const drawCells = () => {
   const cellClustersPtr = universe.cell_clusters();
   const cellClusters = new Uint8Array(memory.buffer, cellClustersPtr, Math.ceil(rows * columns / CELLS_PER_CLUSTER));
   const starting_column = universe.cell_offset();

   context.beginPath();

   for (let row = 0; row < rows; row++) {
      for (let column = starting_column; column < columns; column += 2) {
         context.fillStyle = getCellValue(row, column, cellClusters)
            ? ALIVE_COLOR
            : DEAD_COLOR;
         context.fillRect(
            column * (CELL_SIZE + 1) + 1,
            row * (CELL_SIZE + 1) + 1,
            CELL_SIZE,
            CELL_SIZE
         );
      }
   }

   context.stroke();
};

requestAnimationFrame(renderLoop);
