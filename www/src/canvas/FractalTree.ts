import {
   Canvas,
   ICanvas,
   ICanvasConfig,
} from './Canvas';
import { IPosition, IrgbColor } from '../common/util';

const TRANSITION_WAIT_TIME = 4000;
const STARTING_ANGLE_RATIO = 0.9;
const ANGLE_OFFSET = 0.005;

interface IFractalTree extends ICanvas { };

interface IFractalTreeConfig {
   positions: IPosition[],
   width: number,
   height: number,
   branchLength: number,
   branchWidth: number,
   startingAngle: number,
   endingAngle: number,
   maxDepth: number,
   treeColor: IrgbColor,
   canvasId: string,
};

class FractalTree extends Canvas implements IFractalTree {
   private treeConfig: IFractalTreeConfig;

   constructor(treeConfig: IFractalTreeConfig) {
      const canvasConfig: ICanvasConfig = {
         width: treeConfig.width,
         height: treeConfig.height,
         id: treeConfig.canvasId,
      };
      super(canvasConfig);

      this.treeConfig = treeConfig;

      this.draw = this.draw.bind(this);
      this.isTargetAngle = this.isTargetAngle.bind(this);
   }

   private draw(
      position: IPosition,
      length: number,
      width: number,
      angle: number,
      angleAdjustment: number,
      depth: number,
   ) {
      this.context.lineWidth = width;

      this.context.beginPath();
      this.context.save();

      this.context.strokeStyle = `rgba(${this.treeConfig.treeColor.red
         }, ${this.treeConfig.treeColor.green
         }, ${this.treeConfig.treeColor.blue
         }, ${depth * 0.1})`;

      this.context.translate(position.x, position.y);
      this.context.rotate(angle * Math.PI / 180);
      this.context.moveTo(0, 0);
      this.context.lineTo(0, -length);
      this.context.stroke();

      if (depth > this.treeConfig.maxDepth) {
         this.context.restore();
         return;
      }

      this.draw(
         { x: 0, y: -length },
         length * 0.8,
         width * 0.8,
         angle - angleAdjustment,
         angleAdjustment,
         depth + 1
      );
      this.draw(
         { x: 0, y: -length },
         length * 0.8,
         width * 0.8,
         angle + angleAdjustment,
         angleAdjustment,
         depth + 1
      );

      this.context.restore();
   }

   private isTargetAngle(angle: number) {
      return Math.floor(angle) === this.treeConfig.startingAngle ||
         Math.floor(angle) === this.treeConfig.endingAngle;
   }

   protected render(
      ratio = STARTING_ANGLE_RATIO,
      offset = ANGLE_OFFSET
   ) {
      setTimeout(() => {
         requestAnimationFrame(() => {
            if (this.shouldRender) {
               this.clearCanvas();

               const angle = ratio * this.treeConfig.endingAngle;
               this.treeConfig.positions.forEach((position) => {
                  this.draw(
                     position,
                     this.treeConfig.branchLength,
                     this.treeConfig.branchWidth,
                     0,
                     angle,
                     1
                  );
               });

               if (this.isTargetAngle(angle)) {
                  offset *= -1;
                  setTimeout(() => {
                     this.render(ratio + offset, offset);
                  }, TRANSITION_WAIT_TIME);
               } else {
                  this.render(ratio + offset, offset);
               }
            }
         });
      }, 1000 / 60);
   }
};

export {
   FractalTree,
   IFractalTree,
   IFractalTreeConfig,
};

