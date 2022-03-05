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
   private previousCells: Cell[];

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
      this.previousCells = [...this.cells];

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

      const startingColumn = this.universe.cell_offset();
      const previousCellIndexOffset = startingColumn === 1 ? -1 : 1;
      for (let row = 0; row < this.rows; row++) {
         for (let column = startingColumn; column < this.columns; column += 2) {
            const i = this.getIndex(row, column);
            const cell = this.cells[i];
            // const previousCell = this.previousCells[i];
            const previousCell = this.cells[i + previousCellIndexOffset];

            if (cell !== previousCell) {
               this.context.fillStyle = cell === Cell.Alive ? this.liveCellColor : this.deadCellColor;
               this.context.fillRect(
                  column * (this.pixelsPerCell + 1) + 1,
                  row * (this.pixelsPerCell + 1) + 1,
                  this.pixelsPerCell,
                  this.pixelsPerCell
               );
            }

            this.previousCells[i] = cell;
         }
      }

      this.context.stroke();
   }

   public render() {
      this.universe.tick();

      this.drawCells();

      setTimeout(() => requestAnimationFrame(this.render), 1000 / 60);
   }
};

export {
   Universe,
   IUniverse,
   IUniverseConfig,
};

