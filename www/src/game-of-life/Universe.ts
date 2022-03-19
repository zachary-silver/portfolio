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

   private config: IUniverseConfig;
   private rows: number;
   private columns: number;
   private pixelsPerCell: number;

   private rerender: boolean;
   private rendered: boolean;

   constructor(config: IUniverseConfig) {
      this.universe = asmUniverse.new(config.rows, config.columns);
      this.cells = new Uint8Array(
         memory.buffer,
         this.universe.cells(),
         this.universe.rows() * this.universe.columns()
      ) as unknown as Cell[];

      this.rows = config.rows;
      this.columns = config.columns;
      this.pixelsPerCell = config.pixelsPerCell;
      config.rows = this.universe.rows();
      config.columns = this.universe.columns();
      config.pixelsPerCell -= 1;
      this.config = config;

      this.rerender = true;
      this.rendered = false;

      this.draw = this.draw.bind(this);
      this.initializeCanvas = this.initializeCanvas.bind(this);
      this.clearCanvas = this.clearCanvas.bind(this);
      this.startRendering = this.startRendering.bind(this);
      this.stopRendering = this.stopRendering.bind(this);
   }

   private draw() {
      const startingColumn = this.universe.cell_offset();
      const previousCellIndexOffset = startingColumn ? -1 : 1;

      for (let row = 0; row < this.config.rows; row++) {
         const y = row * (this.config.pixelsPerCell + 1) + 1;

         for (let column = startingColumn; column < this.config.columns; column += 2) {
            const i = row * this.config.columns + column;
            const cell = this.cells[i];
            const previousCell = this.cells[i + previousCellIndexOffset];

            if (cell !== previousCell) {
               // ((column / 2) | 0) === Faster Math.floor(column / 2)
               const x = ((column / 2) | 0) * (this.config.pixelsPerCell + 1) + 1;
               this.context.fillStyle = cell === Cell.Alive
                  ? this.config.liveCellColor
                  : this.config.deadCellColor;
               this.context.fillRect(
                  x,
                  y,
                  this.config.pixelsPerCell,
                  this.config.pixelsPerCell
               );
            }
         }
      }
   }

   private initializeCanvas() {
      this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
      this.canvas.height = this.rows * this.pixelsPerCell + 1;
      this.canvas.width = this.columns * this.pixelsPerCell + 1;
      this.context = this.canvas.getContext('2d');
   }

   private clearCanvas() {
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
   }

   public startRendering() {
      if (!this.rerender) {
         this.rerender = true;
         return;
      }

      if (!this.canvas) {
         this.initializeCanvas();
      }

      if (!this.rendered) {
         this.clearCanvas();
         this.rendered = true;
      }

      this.universe.tick();

      this.draw();

      // requestAnimationFrame aims to run 60 times per second.
      // Moving it behind setTimeout allows us to limit fps.
      setTimeout(() => requestAnimationFrame(this.startRendering), 1000 / 10);
   }

   public stopRendering() {
      this.rerender = false;
      this.rendered = false;
   }
};

export {
   Universe,
   IUniverse,
   IUniverseConfig,
};

