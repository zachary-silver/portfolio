import { Universe as asmUniverse, Cell } from 'portfolio';
import { memory } from 'portfolio/portfolio_bg.wasm';

import { Canvas, ICanvas, ICanvasConfig } from './Canvas';

interface IUniverse extends ICanvas { };

interface IUniverseConfig {
   rows: number,
   columns: number,
   pixelsPerCell: number,
   liveCellColor: string,
   deadCellColor: string,
};

class Universe extends Canvas {
   private universe: asmUniverse;
   private cells: Cell[];

   private universeConfig: IUniverseConfig;

   constructor(universeConfig: IUniverseConfig) {
      const canvasConfig: ICanvasConfig = {
         height: universeConfig.rows * universeConfig.pixelsPerCell + 1,
         width: universeConfig.columns * universeConfig.pixelsPerCell + 1,
         id: 'canvas',
      };
      super(canvasConfig);

      this.universe = asmUniverse.new(universeConfig.rows, universeConfig.columns);
      this.cells = new Uint8Array(
         memory.buffer,
         this.universe.cells(),
         this.universe.rows() * this.universe.columns()
      ) as unknown as Cell[];

      universeConfig.rows = this.universe.rows();
      universeConfig.columns = this.universe.columns();
      universeConfig.pixelsPerCell -= 1;
      this.universeConfig = universeConfig;

      this.draw = this.draw.bind(this);

      this.render = this.render.bind(this);
   }

   private draw() {
      const startingColumn = this.universe.cell_offset();
      const previousCellIndexOffset = startingColumn ? -1 : 1;

      for (let row = 0; row < this.universeConfig.rows; row++) {
         const y = row * (this.universeConfig.pixelsPerCell + 1) + 1;

         for (let column = startingColumn; column < this.universeConfig.columns; column += 2) {
            const i = row * this.universeConfig.columns + column;
            const cell = this.cells[i];
            const previousCell = this.cells[i + previousCellIndexOffset];

            if (cell !== previousCell) {
               // ((column / 2) | 0) === Faster Math.floor(column / 2)
               const x = ((column / 2) | 0) * (this.universeConfig.pixelsPerCell + 1) + 1;
               this.context.fillStyle = cell === Cell.Alive
                  ? this.universeConfig.liveCellColor
                  : this.universeConfig.deadCellColor;
               this.context.fillRect(
                  x,
                  y,
                  this.universeConfig.pixelsPerCell,
                  this.universeConfig.pixelsPerCell
               );
            }
         }
      }
   }

   protected render() {
      if (this.shouldRender) {
         this.universe.tick();

         this.draw();

         // requestAnimationFrame aims to run 60 times per second.
         // Moving it behind setTimeout allows us to limit fps.
         setTimeout(() => requestAnimationFrame(this.render), 1000 / 10);
      }
   }

   public initializeCanvas() {
      this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
      this.canvas.height =
         this.universeConfig.rows * (this.universeConfig.pixelsPerCell + 1) + 1;
      this.canvas.width =
         this.universeConfig.columns / 2 *
         (this.universeConfig.pixelsPerCell + 1) + 1;
      this.context = this.canvas.getContext('2d');
   }
};

export {
   Universe,
   IUniverse,
   IUniverseConfig,
};

