import './TypingAnimation.css'
import React, { useState, useEffect } from 'react';

const Typewriter = () => {
  useEffect(() => {
  let strIndex = 0;
  let charIndex = 1;
  let direction = 0;
  const texts = ['JOURNEY', 'TRAVEL', 'LIVES'];
  const verTxt = document.querySelector('#dynText');

  const typewritter = () =>{
    const text = texts[strIndex];
    verTxt.textContent = text.slice(0,charIndex);
    if(charIndex<text.length && direction == 0){
      charIndex++;
    }
    else if(charIndex==text.length ){
      direction = 1;      
      charIndex--;
    }
    else if(charIndex<text.length && charIndex>0 && direction == 1){
      charIndex--;
    }
    else if(charIndex == 0){
      charIndex=0;
      strIndex = (strIndex + 1) % 3;
      direction = 0;
    }
  }

  setInterval(typewritter , 300);
});

  /*const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCharIndex((charIndex) => charIndex + 1);
    }, delay / texts[textIndex].length);
    return () => clearTimeout(timeout);
  }, [textIndex, charIndex]);

  useEffect(() => {
    if (charIndex === texts[textIndex].length) {
      setTimeout(() => {
        setTextIndex((textIndex) => (textIndex + 1) % texts.length);
        setCharIndex(0);
      }, delay);
    }
  }, [charIndex]);*/



  return (
    <>
      <div id="dynText" className='ani-text'></div>
    </>);
};

export default Typewriter;
