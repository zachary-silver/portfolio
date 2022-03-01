import { Universe as asmUniverse, Cell } from "portfolio";

import { memory } from "portfolio/portfolio_bg.wasm";

import { sleep } from './util';

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

      this.canvas = document.getElementById("universe-canvas") as HTMLCanvasElement;
      this.canvas.height = (this.pixelsPerCell + 1) * this.rows + 1;
      this.canvas.width = (this.pixelsPerCell + 1) * (this.columns / 2) + 1;
      this.context = this.canvas.getContext('2d');

      this.getIndex = this.getIndex.bind(this);
      this.drawCells = this.drawCells.bind(this);
      this.render = this.render.bind(this);
   }

   private getIndex(row: number, column: number) {
      return row * this.columns + column;
   }

   private drawCells() {
      this.context.beginPath();

      const starting_column = this.universe.cell_offset();
      for (let row = 0; row < this.rows; row++) {
         for (let column = starting_column; column < this.columns; column += 2) {
            const cell = this.cells[this.getIndex(row, column)];

            this.context.fillStyle = cell === Cell.Alive ? this.liveCellColor : this.deadCellColor;
            this.context.fillRect(
               column * (this.pixelsPerCell + 1) + 1,
               row * (this.pixelsPerCell + 1) + 1,
               this.pixelsPerCell,
               this.pixelsPerCell
            );
         }
      }

      this.context.stroke();
   }

   public async render() {
      this.universe.tick();

      this.drawCells();
      await sleep(16);

      requestAnimationFrame(this.render);
   }
};

export {
   Universe,
   IUniverse,
   IUniverseConfig,
};

