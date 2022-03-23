import { Canvas, ICanvas, ICanvasConfig } from './Canvas';
import { IPosition } from '../common/util';

// const TREE_COLOR_RGB = '167, 195, 217';
const TREE_COLOR_RGB = '104, 167, 212';

interface ISierpinskiTree extends ICanvas { };

interface ISierpinskiTreeConfig {
   positions: IPosition[],
   width: number,
   height: number,
   branchLength: number,
   branchWidth: number,
   maxOrder: number,
   treeColor: string,
};

class SierpinskiTree extends Canvas implements ISierpinskiTree {
   private treeConfig: ISierpinskiTreeConfig;

   constructor(treeConfig: ISierpinskiTreeConfig) {
      const canvasConfig: ICanvasConfig = {
         width: treeConfig.width,
         height: treeConfig.height,
         id: 'canvas',
      };
      super(canvasConfig);

      this.treeConfig = treeConfig;

      this.draw = this.draw.bind(this);

      this.render = this.render.bind(this);
   }

   private draw(
      x: number,
      y: number,
      length: number,
      width: number,
      angle: number,
      angleAdjustment: number,
      order: number,
   ) {
      this.context.lineWidth = width;

      this.context.beginPath();
      this.context.save();

      this.context.fillStyle = `rgba(${TREE_COLOR_RGB}, 1.0)`;
      this.context.strokeStyle = `rgba(${TREE_COLOR_RGB}, 1.0)`;

      this.context.translate(x, y);
      this.context.rotate(angle * Math.PI / 180);
      this.context.moveTo(0, 0);
      this.context.lineTo(0, -length);
      this.context.stroke();

      if (order > this.treeConfig.maxOrder) {
         this.context.restore();
         return;
      }

      this.draw(
         0,
         -length,
         length * 0.8,
         width * 0.8,
         angle - angleAdjustment,
         angleAdjustment,
         order + 1
      );
      this.draw(
         0,
         -length,
         length * 0.8,
         width * 0.8,
         angle + angleAdjustment,
         angleAdjustment,
         order + 1
      );

      this.context.restore();
   }

   protected render(baseAngle = 0, adjustment = .005) {
      setTimeout(() => {
         requestAnimationFrame(() => {
            if (this.shouldRender) {
               this.clearCanvas();

               this.treeConfig.positions.forEach((position) => {
                  this.draw(
                     position.x,
                     position.y,
                     this.treeConfig.branchLength,
                     this.treeConfig.branchWidth,
                     0,
                     baseAngle * 45,
                     1
                  );
               });

               if (Math.floor(Math.abs(baseAngle)) === 1) {
                  adjustment *= -1;
                  setTimeout(() => this.render(baseAngle + adjustment, adjustment), 4000);
               } else {
                  this.render(baseAngle + adjustment, adjustment);
               }
            }
         });
      }, 1000 / 60);
   }
}

export {
   SierpinskiTree,
   ISierpinskiTree,
   ISierpinskiTreeConfig,
};

