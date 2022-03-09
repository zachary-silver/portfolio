export const transitionIn = (tagName: string) => {
   document.getElementsByTagName(tagName)[0].classList.remove('transition-out');
   document.getElementsByTagName(tagName)[0].classList.add('transition-in');
};

export const transitionOut = (tagName: string) => {
   document.getElementsByTagName(tagName)[0].classList.remove('transition-in');
   document.getElementsByTagName(tagName)[0].classList.add('transition-out');
};

