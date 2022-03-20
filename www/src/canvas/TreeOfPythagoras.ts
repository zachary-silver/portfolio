import { TreeTrunk } from 'portfolio';

import { Canvas, ICanvas, ICanvasConfig } from './Canvas';

const TREE_COLOR_RGB = '167, 195, 217';

interface IPosition {
   x: number,
   y: number,
};

let mousePosition: IPosition = {
   x: 0,
   y: 0,
};

onmousemove = (event) => {
   mousePosition.x = event.clientX;
   mousePosition.y = event.clientY;
};

interface ITreeOfPythagoras extends ICanvas { };

interface ITreeOfPythagorasConfig {
   width: number,
   height: number,
   trunkWidth: number,
   maxOrder: number,
   treeColor: string,
};

class TreeOfPythagoras extends Canvas implements ITreeOfPythagoras {
   private trunk: TreeTrunk;

   private treeConfig: ITreeOfPythagorasConfig;

   constructor(treeConfig: ITreeOfPythagorasConfig) {
      const canvasConfig: ICanvasConfig = {
         width: treeConfig.width,
         height: treeConfig.height,
         id: 'canvas',
      };
      super(canvasConfig);

      this.trunk = TreeTrunk.new(treeConfig.width, treeConfig.height);

      this.treeConfig = treeConfig;

      this.drawLeftBranch = this.drawLeftBranch.bind(this);
      this.drawRightBranch = this.drawRightBranch.bind(this);
      this.drawBranches = this.drawBranches.bind(this);
      this.drawTrunk = this.drawTrunk.bind(this);

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
         (this.treeConfig.width / 2) - (this.treeConfig.trunkWidth / 2),
         this.treeConfig.height - this.treeConfig.trunkWidth
      );
      this.context.fillStyle = `rgba(${TREE_COLOR_RGB}, 0.1)`;
      this.context.fillRect(
         0,
         0,
         this.treeConfig.trunkWidth,
         this.treeConfig.trunkWidth
      );
   }

   protected render() {
      setTimeout(() => {
         requestAnimationFrame(() => {
            if (this.shouldRender) {
               console.log(mousePosition.x, mousePosition.y);
               this.clearCanvas();
               this.drawTrunk(mousePosition.x, mousePosition.y + this.treeConfig.trunkWidth * 2, this.treeConfig.maxOrder);
               this.drawBranches(1, this.treeConfig.trunkWidth);
               this.render();
            }
         });
      }, 1000 / 60);
   }
}

export {
   TreeOfPythagoras,
   ITreeOfPythagoras,
   ITreeOfPythagorasConfig,
};

