import { Universe as asmUniverse, Cell } from "portfolio";

import { memory } from "portfolio/portfolio_bg.wasm";

import { sleep } from './util';

const PIXELS_PER_CELL = 1;
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

interface IUniverse {
   render: () => void,
}

class Universe implements IUniverse {
   private universe: asmUniverse;
   private rows: number;
   private columns: number;
   private cells: Cell[];
   private canvas: HTMLCanvasElement;
   private context: CanvasRenderingContext2D;

   constructor(rows: number, columns: number) {
      this.universe = asmUniverse.new(rows, columns);
      this.rows = this.universe.rows();
      this.columns = this.universe.columns();

      this.cells = new Uint8Array(
         memory.buffer,
         this.universe.cells(),
         this.rows * this.columns
      ) as unknown as Cell[];

      this.canvas = document.getElementById("universe-canvas") as HTMLCanvasElement;
      this.canvas.height = (PIXELS_PER_CELL + 1) * this.rows + 1;
      this.canvas.width = (PIXELS_PER_CELL + 1) * (this.columns / 2) + 1;
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
            this.context.fillStyle = cell === Cell.Alive ? ALIVE_COLOR : DEAD_COLOR;
            this.context.fillRect(
               column * (PIXELS_PER_CELL + 1) + 1,
               row * (PIXELS_PER_CELL + 1) + 1,
               PIXELS_PER_CELL,
               PIXELS_PER_CELL
            );
         }
      }

      this.context.stroke();
   }

   public async render() {
      this.universe.tick();

      this.drawCells();
      await sleep(50);

      requestAnimationFrame(this.render);
   }
}

export default Universe;

