import { Canvas, ICanvas, ICanvasConfig } from './Canvas';
import { IPosition } from '../common/util';

const TRIANGLE_COLOR_RGB = '104, 167, 212';

interface ISierpinskiTriangle extends ICanvas { };

interface ISierpinskiTriangleConfig {
   width: number,
   height: number,
   positions: IPosition[],
   sideLength: number,
   maxDepth: number,
   triangleColor: string,
};

const getDistance = (p1: IPosition, p2: IPosition) => {
   return Math.sqrt(
      (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y)
   );
};

class SierpinskiTriangle extends Canvas implements ISierpinskiTriangle {
   private triangleConfig: ISierpinskiTriangleConfig;
   private referencePosition: IPosition;
   private maxDistance: number;
   private relativeDistance: number;

   constructor(triangleConfig: ISierpinskiTriangleConfig) {
      const canvasConfig: ICanvasConfig = {
         width: triangleConfig.width,
         height: triangleConfig.height,
         id: 'canvas',
      };
      super(canvasConfig);

      this.triangleConfig = triangleConfig;

      this.referencePosition = {
         x: canvasConfig.width / 2,
         y: canvasConfig.height,
      };

      this.maxDistance = getDistance(
         this.referencePosition,
         { x: 0, y: canvasConfig.width / 2 }
      );
      this.relativeDistance = 0;

      this.draw = this.draw.bind(this);
      this.drawTriangles = this.drawTriangles.bind(this);

      this.render = this.render.bind(this);
   }

   private draw(position: IPosition, sideLength: number) {
      const distance = getDistance(position, this.referencePosition);
      const alpha = distance / this.relativeDistance / 4.0;
      this.context.strokeStyle = `rgba(${TRIANGLE_COLOR_RGB}, ${alpha})`;
      this.context.beginPath();
      this.context.moveTo(position.x, position.y);
      this.context.lineTo(
         position.x + sideLength / 2,
         position.y - sideLength * Math.sin(Math.PI / 3)
      );
      this.context.lineTo(position.x + sideLength, position.y);
      this.context.closePath();

      this.context.stroke();
   }

   private drawTriangles(position: IPosition, sideLength: number, depth: number) {
      const innerSideLength = sideLength / 2;
      const innerPositions = [
         {
            ...position
         },
         {
            x: position.x + innerSideLength,
            y: position.y
         },
         {
            x: position.x + innerSideLength / 2,
            y: position.y - Math.sin(Math.PI / 3) * innerSideLength
         }
      ];

      if (depth > this.triangleConfig.maxDepth) {
         innerPositions.forEach((position) => {
            this.draw(position, innerSideLength);
         });
      } else {
         innerPositions.forEach((position) => {
            this.drawTriangles(position, innerSideLength, depth + 1);
         });
      }
   }

   protected render(adjustment = 4) {
      if (this.relativeDistance === 0) {
         this.relativeDistance = adjustment * 2;
      }

      setTimeout(() => {
         requestAnimationFrame(() => {
            if (this.shouldRender) {
               this.clearCanvas();

               if (
                  this.relativeDistance <= Math.abs(adjustment) ||
                  this.relativeDistance >= this.maxDistance
               ) {
                  adjustment *= -1;
               }
               this.relativeDistance += adjustment;

               this.triangleConfig.positions.forEach((position) => {
                  this.drawTriangles(
                     position,
                     this.triangleConfig.sideLength,
                     1
                  );
               });

               this.render(adjustment);
            }
         });
      }, 1000 / 60);
   }
}

export {
   SierpinskiTriangle,
   ISierpinskiTriangle,
   ISierpinskiTriangleConfig,
};

