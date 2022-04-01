const getTypingRate = (text: string) => {
   return 30 + 1000 * (1 / (text.length * text.length));
};

const showCanvas = (opacity: string) => {
   document.getElementById('canvas').style.opacity = opacity;
};

const hideCanvas = () => {
   document.getElementById('canvas').style.opacity = '0';
};

interface IPosition {
   x: number,
   y: number,
};

const mousePosition: IPosition = {
   x: 0,
   y: 0,
};

onmousemove = (event) => {
   mousePosition.x = event.clientX;
   mousePosition.y = event.clientY;
};

export {
   getTypingRate,
   showCanvas,
   hideCanvas,
   IPosition,
   mousePosition,
};

