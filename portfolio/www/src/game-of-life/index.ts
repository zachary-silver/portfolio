import { Universe } from "portfolio";

const memory = require("portfolio/portfolio_bg").memory;

interface CellClusterArray {
   getCellValue: (row: number, column: number) => number;
   clusters: Uint8Array;
};

const CELL_SIZE = 1; // pixels
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

const UNIVERSE = Universe.new(512, 1024);
const ROWS = UNIVERSE.rows();
const COLUMNS = UNIVERSE.columns();
const CELLS_PER_CLUSTER = UNIVERSE.cells_per_cluster();
const CELL_CLUSTERS: CellClusterArray = {
   clusters: new Uint8Array(
      memory.buffer as ArrayBufferLike,
      UNIVERSE.cell_clusters(),
      Math.ceil(ROWS * COLUMNS / CELLS_PER_CLUSTER)
   ),
   getCellValue: function(row: number, column: number) {
      const cellNumber = row * COLUMNS + column;
      const cellClusterIndex = Math.floor(cellNumber / CELLS_PER_CLUSTER);
      const cellIndex = cellNumber % CELLS_PER_CLUSTER;
      return (this.clusters[cellClusterIndex] >>> cellIndex) & 1;
   },
};

const CANVAS = document.getElementById("portfolio-canvas") as HTMLCanvasElement;
CANVAS.height = (CELL_SIZE + 1) * ROWS + 1;
CANVAS.width = (CELL_SIZE + 1) * (COLUMNS / 2) + 1;

const CONTEXT = CANVAS.getContext('2d');

const drawCells = () => {
   const starting_column = UNIVERSE.cell_offset();

   CONTEXT.beginPath();

   for (let row = 0; row < ROWS; row++) {
      for (let column = starting_column; column < COLUMNS; column += 2) {
         CONTEXT.fillStyle = CELL_CLUSTERS.getCellValue(row, column)
            ? ALIVE_COLOR
            : DEAD_COLOR;
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
