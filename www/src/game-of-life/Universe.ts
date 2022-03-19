import { Universe as asmUniverse, Cell } from "portfolio";

import { memory } from "portfolio/portfolio_bg.wasm";

interface IUniverse {
   startRendering: () => void,
   stopRendering: () => void,
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

   private rerender: boolean;

   constructor(config: IUniverseConfig) {
      this.universe = asmUniverse.new(config.rows, config.columns);
      this.rows = this.universe.rows();
      this.columns = this.universe.columns();
      this.pixelsPerCell = config.pixelsPerCell - 1;
      this.liveCellColor = config.liveCellColor;
      this.deadCellColor = config.deadCellColor;

      this.cells = new Uint8Array(
         memory.buffer,
         this.universe.cells(),
         this.rows * this.columns
      ) as unknown as Cell[];

      this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
      this.canvas.height = config.rows * (this.pixelsPerCell + 1) + 1;
      this.canvas.width = config.columns * (this.pixelsPerCell + 1) + 1;
      this.context = this.canvas.getContext('2d');

      this.rerender = true;

      this.draw = this.draw.bind(this);
      this.startRendering = this.startRendering.bind(this);
      this.stopRendering = this.stopRendering.bind(this);
   }

   private draw() {
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

   public startRendering() {
      if (!this.rerender) {
         this.rerender = true;
         return;
      }

      this.universe.tick();

      this.draw();

      // requestAnimationFrame aims to run 60 times per second.
      // Moving it behind setTimeout allows us to limit fps.
      setTimeout(() => requestAnimationFrame(this.startRendering), 1000 / 10);
   }

   public stopRendering() {
      this.rerender = false;
   }
};

export {
   Universe,
   IUniverse,
   IUniverseConfig,
};

