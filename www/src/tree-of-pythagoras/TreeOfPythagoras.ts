import { TreeTrunk, Canvas } from 'portfolio';

interface ITreeOfPythagoras {
   render: (row: number, column: number) => void,
};

interface ITreeOfPythagorasConfig {
   rows: number,
   columns: number,
   pixelsPerCell: number,
   treeColor: string,
   backgroundColor: string,
};

class TreeOfPythagoras implements ITreeOfPythagoras {
   private trunk: TreeTrunk;

   private canvas: HTMLCanvasElement;
   private context: CanvasRenderingContext2D;

   private config: ITreeOfPythagorasConfig;
   private baseColumns: number;

   constructor(config: ITreeOfPythagorasConfig) {
      const canvas = Canvas.new(config.rows, config.columns);
      this.trunk = TreeTrunk.new(canvas, 500, 500, 10);

      this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
      this.canvas.height = config.rows;
      this.canvas.width = config.columns;
      this.context = this.canvas.getContext('2d');
      this.context.fillStyle = config.treeColor;

      this.config = config;
      this.baseColumns = config.columns / 8;

      this.drawBranches = this.drawBranches.bind(this);
      this.drawTrunk = this.drawTrunk.bind(this);
      this.render = this.render.bind(this);
   }

   private drawBranches(order: number, columns: number) {
      const leftColumns = this.trunk.left_ratio() * columns;
      const rightColumns = this.trunk.right_ratio() * columns;

      if (order > this.trunk.order()) {
         return;
      }

      order++;

      this.context.save();
      this.context.rotate(-this.trunk.left_angle());
      this.context.translate(0, -leftColumns);
      this.context.fillRect(
         0,
         0,
         leftColumns,
         leftColumns ,
      );
      this.drawBranches(order, leftColumns);
      this.context.restore();

      this.context.save();
      this.context.translate(columns, 0);
      this.context.rotate(this.trunk.right_angle());
      this.context.translate(-rightColumns, -leftColumns);
      this.context.fillRect(
         0,
         0,
         rightColumns,
         rightColumns,
      );
      this.drawBranches(order, rightColumns);
      this.context.restore();
   }

   private drawTrunk(row: number, column: number) {
      this.trunk.update(row, column);

      this.context.translate(
         (this.config.columns / 2) - (this.baseColumns / 2),
         this.config.rows - this.baseColumns
      );
      this.context.fillRect(0, 0, this.baseColumns, this.baseColumns);
   }

   public render(row: number, column: number) {
      console.log(this.trunk.order());
      requestAnimationFrame(() => {
         this.drawTrunk(row, column);
         this.drawBranches(1, this.baseColumns);
      });
   }
}

export {
   TreeOfPythagoras,
   ITreeOfPythagoras,
   ITreeOfPythagorasConfig,
};

