'use strict'

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
  //esto es para ver el resultado a la vez que hablas y no esperar a que se termine el speech para ver el resultado
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e =>{
    //e.results te devuelve una lista con info muy anidada y hay que ir sacandola poco a poco
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('')
      
      p.textContent = transcript;
      
      //cuando detecte que la frase ha terminado, crea un nuevo parrafo para que cuando se llame la funcion otra vez no sobreescriba lo anterior
    if(e.results[0].isFinal){
        p = document.createElement('p');
        words.appendChild(p);
    }
  });

  //al terminar de hablar, se reactiva otra vez el addeventlistener de antes por si continuas hablando
recognition.addEventListener('end', recognition.start);

recognition.start();
