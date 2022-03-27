interface ICanvas {
   startRendering: () => void,
   stopRendering: () => void,
   initializeCanvas: () => void,
   clearCanvas: () => void,
};

interface ICanvasConfig {
   height: number,
   width: number,
   id: string,
}

abstract class Canvas implements ICanvas {
   protected canvas: HTMLCanvasElement;
   protected context: CanvasRenderingContext2D;

   protected canvasConfig: ICanvasConfig;

   protected shouldRender: boolean;

   constructor(canvasConfig: ICanvasConfig) {
      this.canvasConfig = canvasConfig;

      this.render = this.render.bind(this);

      this.initializeCanvas = this.initializeCanvas.bind(this);
      this.clearCanvas = this.clearCanvas.bind(this);
      this.startRendering = this.startRendering.bind(this);
      this.stopRendering = this.stopRendering.bind(this);
   }

   protected abstract render(): void;

   public initializeCanvas() {
      this.canvas = document.getElementById(this.canvasConfig.id) as HTMLCanvasElement;
      this.canvas.height = this.canvasConfig.height;
      this.canvas.width = this.canvasConfig.width;
      this.context = this.canvas.getContext('2d');
   }

   public clearCanvas() {
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
   }

   public startRendering() {
      this.shouldRender = true;
      this.render();
   }

   public stopRendering() {
      this.shouldRender = false;
   }
}

export {
   Canvas,
   ICanvas,
   ICanvasConfig,
};

