import { TreeTrunk } from 'portfolio';

const TREE_COLOR_RGB = '167, 195, 217';

interface ITreeOfPythagoras {
   render: (x: number, y: number, maxOrder: number) => void,
};

interface ITreeOfPythagorasConfig {
   width: number,
   height: number,
   trunkWidth: number,
   treeColor: string,
};

class TreeOfPythagoras implements ITreeOfPythagoras {
   private trunk: TreeTrunk;

   private canvas: HTMLCanvasElement;
   private context: CanvasRenderingContext2D;

   private config: ITreeOfPythagorasConfig;

   constructor(config: ITreeOfPythagorasConfig) {
      this.trunk = TreeTrunk.new(config.width, config.height);

      this.config = config;

      this.drawLeftBranch = this.drawLeftBranch.bind(this);
      this.drawRightBranch = this.drawRightBranch.bind(this);
      this.drawBranches = this.drawBranches.bind(this);
      this.drawTrunk = this.drawTrunk.bind(this);
      this.initializeCanvas = this.initializeCanvas.bind(this);
      this.clearCanvas = this.clearCanvas.bind(this);
      this.render = this.render.bind(this);
   }

   private drawLeftBranch(order: number, width: number) {
      const leftWidth = this.trunk.left_ratio() * width;

      this.context.save();
      this.context.rotate(-this.trunk.left_angle());
      this.context.translate(0, -leftWidth);
      this.context.fillStyle = `rgba(${TREE_COLOR_RGB}, ${order * 0.1})`;
      this.context.fillRect(0, 0, leftWidth, leftWidth);
      this.drawBranches(order, leftWidth);
      this.context.restore();
   }

   private drawRightBranch(order: number, width: number) {
      const rightWidth = this.trunk.right_ratio() * width;

      this.context.save();
      this.context.translate(width, 0);
      this.context.rotate(this.trunk.right_angle());
      this.context.translate(-rightWidth, -rightWidth);
      this.context.fillStyle = `rgba(${TREE_COLOR_RGB}, ${order * 0.1})`;
      this.context.fillRect(0, 0, rightWidth, rightWidth);
      this.drawBranches(order, rightWidth);
      this.context.restore();
   }

   private drawBranches(order: number, width: number) {
      if (order > this.trunk.order()) {
         return;
      }

      order++;

      this.drawLeftBranch(order, width);
      this.drawRightBranch(order, width);
   }

   private drawTrunk(x: number, y: number, order: number) {
      this.trunk.update(x, y, order);

      this.context.translate(
         (this.config.width / 2) - (this.config.trunkWidth / 2),
         this.config.height - this.config.trunkWidth
      );
      this.context.fillStyle = `rgba(${TREE_COLOR_RGB}, 0.1)`;
      this.context.fillRect(
         0,
         0,
         this.config.trunkWidth,
         this.config.trunkWidth
      );
   }

   private initializeCanvas() {
      this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
      this.canvas.height = this.config.height;
      this.canvas.width = this.config.width;
      this.context = this.canvas.getContext('2d');
   }

   private clearCanvas() {
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
   }

   public render(x: number, y: number, maxOrder: number) {
      requestAnimationFrame(() => {
         if (!this.canvas) {
            this.initializeCanvas();
         }

         this.clearCanvas();
         this.drawTrunk(x, y, maxOrder);
         this.drawBranches(1, this.config.trunkWidth);
      });
   }
}

export {
   TreeOfPythagoras,
   ITreeOfPythagoras,
   ITreeOfPythagorasConfig,
};

