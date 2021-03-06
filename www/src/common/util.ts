interface IPosition {
   x: number,
   y: number,
};

interface IrgbColor {
   red: string,
   green: string,
   blue: string,
}

const getDocumentStyle = () => getComputedStyle(document.documentElement);

const getWindowProperties = () => ({
   height: window.innerHeight,
   width: window.innerWidth,
});

const getTypingRate = (text: string) => {
   return 30 - Math.log2(text.length) % 30;
};

const showElement = (id: string, opacity: string) => {
   document.getElementById(id).style.opacity = opacity;
};

const hideElement = (id: string) => {
   document.getElementById(id).style.opacity = '0';
};

const CANVAS_ID = 'canvas';

const TRANSITION_TIME = 500;

const MOUSE_POSITION: IPosition = {
   x: 0,
   y: 0,
};

onmousemove = (event) => {
   MOUSE_POSITION.x = event.clientX;
   MOUSE_POSITION.y = event.clientY;
};

export {
   IPosition,
   IrgbColor,
   getDocumentStyle,
   getWindowProperties,
   getTypingRate,
   showElement,
   hideElement,
   CANVAS_ID,
   TRANSITION_TIME,
   MOUSE_POSITION,
};

