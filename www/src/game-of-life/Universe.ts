import { Universe as asmUniverse, Cell } from "portfolio";

import { memory } from "portfolio/portfolio_bg.wasm";

interface IUniverse {
   render: () => void,
};

interface IUniverseConfig {
   rows: number,
   columns: number,
   pixelsPerCell: number,
   liveCellColor: string,
   deadCellColor: string,
};

class Universe implements IUniverse {
   private universe: asmUniverse;
   private cells: Cell[];

   private canvas: HTMLCanvasElement;
   private context: CanvasRenderingContext2D;

   private rows: number;
   private columns: number;
   private pixelsPerCell: number;
   private liveCellColor: string;
   private deadCellColor: string;

   constructor(config: IUniverseConfig) {
      this.universe = asmUniverse.new(config.rows, config.columns);
      this.rows = this.universe.rows();
      this.columns = this.universe.columns();
      this.pixelsPerCell = config.pixelsPerCell;
      this.liveCellColor = config.liveCellColor;
      this.deadCellColor = config.deadCellColor;

      this.cells = new Uint8Array(
         memory.buffer,
         this.universe.cells(),
         this.rows * this.columns
      ) as unknown as Cell[];

      this.canvas = document.getElementById('universe-canvas') as HTMLCanvasElement;
      this.canvas.height = config.rows * (this.pixelsPerCell + 1) + 1;
      this.canvas.width = config.columns * (this.pixelsPerCell + 1) + 1;
      this.context = this.canvas.getContext('2d');

      this.drawCells = this.drawCells.bind(this);
      this.render = this.render.bind(this);
   }

   private drawCells() {
      const startingColumn = this.universe.cell_offset();
      const previousCellIndexOffset = startingColumn ? -1 : 1;
      for (let row = 0; row < this.rows; row++) {
         const y = row * (this.pixelsPerCell + 1) + 1;
         for (let column = startingColumn; column < this.columns; column += 2) {
            const i = row * this.columns + column;
            const cell = this.cells[i];
            const previousCell = this.cells[i + previousCellIndexOffset];

            if (cell !== previousCell) {
               // ((column / 2) | 0) === Faster Math.floor(column / 2)
               const x = ((column / 2) | 0) * (this.pixelsPerCell + 1) + 1;
               this.context.fillStyle = cell === Cell.Alive
                  ? this.liveCellColor
                  : this.deadCellColor;
               this.context.fillRect(x, y, this.pixelsPerCell, this.pixelsPerCell);
            }
         }
      }
   }

   public render() {
      this.universe.tick();

      this.drawCells();

      // requestAnimationFrame aims to run 60 times per second.
      // Moving it behind setTimeout allows us to limit fps.
      setTimeout(() => requestAnimationFrame(this.render), 1000 / 30);
   }
};

export {
   Universe,
   IUniverse,
   IUniverseConfig,
};

