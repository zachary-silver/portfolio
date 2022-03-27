export const DOCUMENT_STYLE = getComputedStyle(document.documentElement);

export const VIEWPORT_HEIGHT = window.innerHeight;
export const VIEWPORT_WIDTH = window.innerWidth;

export const showCanvas = (opacity: string) => {
   document.getElementById('canvas').style.opacity = opacity;
};

export const hideCanvas = () => {
   document.getElementById('canvas').style.opacity = '0';
};

export interface IPosition {
   x: number,
   y: number,
};

export const mousePosition: IPosition = {
   x: 0,
   y: 0,
};

onmousemove = (event) => {
   mousePosition.x = event.clientX;
   mousePosition.y = event.clientY;
};

