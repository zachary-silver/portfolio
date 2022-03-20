import { Universe as asmUniverse, Cell } from 'portfolio';
import { memory } from 'portfolio/portfolio_bg.wasm';

import { Canvas, ICanvas, ICanvasConfig } from './Canvas';

interface IGameOfLife extends ICanvas { };

interface IGameOfLifeConfig {
   rows: number,
   columns: number,
   pixelsPerCell: number,
   liveCellColor: string,
   deadCellColor: string,
};

class GameOfLife extends Canvas {
   private universe: asmUniverse;
   private cells: Cell[];

   private gameOfLifeConfig: IGameOfLifeConfig;

   constructor(gameOfLifeConfig: IGameOfLifeConfig) {
      const canvasConfig: ICanvasConfig = {
         height: gameOfLifeConfig.rows * gameOfLifeConfig.pixelsPerCell + 1,
         width: gameOfLifeConfig.columns * gameOfLifeConfig.pixelsPerCell + 1,
         id: 'canvas',
      };
      super(canvasConfig);

      this.universe = asmUniverse.new(gameOfLifeConfig.rows, gameOfLifeConfig.columns);
      this.cells = new Uint8Array(
         memory.buffer,
         this.universe.cells(),
         this.universe.rows() * this.universe.columns()
      ) as unknown as Cell[];

      gameOfLifeConfig.rows = this.universe.rows();
      gameOfLifeConfig.columns = this.universe.columns();
      gameOfLifeConfig.pixelsPerCell -= 1;
      this.gameOfLifeConfig = gameOfLifeConfig;

      this.draw = this.draw.bind(this);

      this.render = this.render.bind(this);
   }

   private draw() {
      const startingColumn = this.universe.cell_offset();
      const previousCellIndexOffset = startingColumn ? -1 : 1;

      for (let row = 0; row < this.gameOfLifeConfig.rows; row++) {
         const y = row * (this.gameOfLifeConfig.pixelsPerCell + 1) + 1;

         for (let column = startingColumn; column < this.gameOfLifeConfig.columns; column += 2) {
            const i = row * this.gameOfLifeConfig.columns + column;
            const cell = this.cells[i];
            const previousCell = this.cells[i + previousCellIndexOffset];

            if (cell !== previousCell) {
               // ((column / 2) | 0) === Faster Math.floor(column / 2)
               const x = ((column / 2) | 0) * (this.gameOfLifeConfig.pixelsPerCell + 1) + 1;
               this.context.fillStyle = cell === Cell.Alive
                  ? this.gameOfLifeConfig.liveCellColor
                  : this.gameOfLifeConfig.deadCellColor;
               this.context.fillRect(
                  x,
                  y,
                  this.gameOfLifeConfig.pixelsPerCell,
                  this.gameOfLifeConfig.pixelsPerCell
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
         this.gameOfLifeConfig.rows * (this.gameOfLifeConfig.pixelsPerCell + 1) + 1;
      this.canvas.width =
         this.gameOfLifeConfig.columns / 2 *
         (this.gameOfLifeConfig.pixelsPerCell + 1) + 1;
      this.context = this.canvas.getContext('2d');
   }
};

export {
   GameOfLife,
   IGameOfLife,
   IGameOfLifeConfig,
};

