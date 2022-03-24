import { Canvas, ICanvas, ICanvasConfig } from './Canvas';
import { IPosition } from '../common/util';

// const TRIANGLE_COLOR_RGB = '104, 167, 212';

interface ISierpinskiTriangle extends ICanvas { };

interface ISierpinskiTriangleConfig {
   width: number,
   height: number,
   positions: IPosition[],
   sideLength: number,
   maxDepth: number,
   triangleColor: string,
};

class SierpinskiTriangle extends Canvas implements ISierpinskiTriangle {
   private triangleConfig: ISierpinskiTriangleConfig;

   constructor(triangleConfig: ISierpinskiTriangleConfig) {
      const canvasConfig: ICanvasConfig = {
         width: triangleConfig.width,
         height: triangleConfig.height,
         id: 'canvas',
      };
      super(canvasConfig);

      this.triangleConfig = triangleConfig;

      this.draw = this.draw.bind(this);
      this.drawTriangles = this.drawTriangles.bind(this);

      this.render = this.render.bind(this);
   }

   private draw(position: IPosition, sideLength: number) {
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

   protected render() {
      setTimeout(() => {
         requestAnimationFrame(() => {
            if (this.shouldRender) {
               this.clearCanvas();
               this.context.fillStyle = 'white';
               this.context.strokeStyle = 'white';

               this.triangleConfig.positions.forEach((position) => {
                  this.drawTriangles(
                     position,
                     this.triangleConfig.sideLength,
                     1
                  );
               });

               // this.render();
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

