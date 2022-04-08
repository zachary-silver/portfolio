import { TreeTrunk } from 'portfolio';

import {
   Canvas,
   ICanvas,
   ICanvasConfig,
} from './Canvas';
import {
   IPosition,
   IrgbColor,
   MOUSE_POSITION,
} from '../common/util';

interface ITreeOfPythagoras extends ICanvas { };

interface ITreeOfPythagorasConfig {
   width: number,
   height: number,
   trunkWidth: number,
   maxDepth: number,
   treeColor: IrgbColor,
   canvasId: string,
};

class TreeOfPythagoras extends Canvas implements ITreeOfPythagoras {
   private trunk: TreeTrunk;

   private treeConfig: ITreeOfPythagorasConfig;

   constructor(treeConfig: ITreeOfPythagorasConfig) {
      const canvasConfig: ICanvasConfig = {
         width: treeConfig.width,
         height: treeConfig.height,
         id: treeConfig.canvasId,
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

   private drawLeftBranch(width: number, depth: number) {
      const leftWidth = this.trunk.left_ratio() * width;

      this.context.save();
      this.context.rotate(-this.trunk.left_angle());
      this.context.translate(0, -leftWidth);
      this.context.fillStyle = `rgba(${this.treeConfig.treeColor.red
         }, ${this.treeConfig.treeColor.green
         }, ${this.treeConfig.treeColor.blue
         }, ${depth * 0.1})`;
      this.context.fillRect(0, 0, leftWidth, leftWidth);
      this.drawBranches(leftWidth, depth);
      this.context.restore();
   }

   private drawRightBranch(width: number, depth: number) {
      const rightWidth = this.trunk.right_ratio() * width;

      this.context.save();
      this.context.translate(width, 0);
      this.context.rotate(this.trunk.right_angle());
      this.context.translate(-rightWidth, -rightWidth);
      this.context.fillStyle = `rgba(${this.treeConfig.treeColor.red
         }, ${this.treeConfig.treeColor.green
         }, ${this.treeConfig.treeColor.blue
         }, ${depth * 0.1})`;
      this.context.fillRect(0, 0, rightWidth, rightWidth);
      this.drawBranches(rightWidth, depth);
      this.context.restore();
   }

   private drawBranches(width: number, depth: number) {
      if (depth > this.trunk.depth()) {
         return;
      }

      depth++;

      this.drawLeftBranch(width, depth);
      this.drawRightBranch(width, depth);
   }

   private drawTrunk({ x, y }: IPosition, maxDepth: number) {
      this.trunk.update(x, y, maxDepth);

      this.context.translate(
         (this.treeConfig.width / 2) - (this.treeConfig.trunkWidth / 2),
         this.treeConfig.height - this.treeConfig.trunkWidth
      );
      this.context.fillStyle = `rgba(${this.treeConfig.treeColor.red
         }, ${this.treeConfig.treeColor.green
         }, ${this.treeConfig.treeColor.blue
         }, 0.1)`;
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
               this.clearCanvas();

               this.drawTrunk(
                  {
                     x: MOUSE_POSITION.x,
                     y: MOUSE_POSITION.y + this.treeConfig.trunkWidth * 2,
                  },
                  this.treeConfig.maxDepth
               );
               this.drawBranches(this.treeConfig.trunkWidth, 1);

               this.render();
            }
         });
      }, 1000 / 60);
   }
};

export {
   TreeOfPythagoras,
   ITreeOfPythagoras,
   ITreeOfPythagorasConfig,
};

