const wheel = document.getElementById('wheel');
const resultText = document.getElementById('result');
const spinButton = document.getElementById('spinButton');
const audio = new Audio('spin2.mp3'); // Ruta al archivo de sonido
const bell=new Audio('bell.mp3'); // Ruta al archivo de sonido
//const updateWheelButton = document.getElementById('updateWheel');
const optionsInput = document.getElementById('optionsInput');
let i=1 //i= numero de rondas
// Opciones iniciales
let options = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'];
var selanterior=""
function isadel(str){
  let retornar=false
  if(str.toUpperCase() =="adel".toUpperCase() || str.toUpperCase() =="Paco".toUpperCase() ){
    retornar= true
  }
  return retornar
}
function issebas(str){
  if(str.toUpperCase() =="sebas".toUpperCase() || str.toUpperCase() =="sebastian".toUpperCase() ){
    return true
  } else{
    return false
  }
}
function isjose(str){
  if(str.toUpperCase() =="jose".toUpperCase() || str.toUpperCase() =="josé".toUpperCase() || str.toUpperCase() =="quispe".toUpperCase()){
    return true
  } else{
    return false
  }
}
function ismechi(str){
  if(str.toUpperCase() =="mechi".toUpperCase() || str.toUpperCase() =="maria".toUpperCase() || str.toUpperCase() =="maría".toUpperCase() || str.toUpperCase() =="mercedes".toUpperCase() ){
    return true
  } else{
    return false
  }
}
function isfer(str){
  let retornar=false
  if(str.toUpperCase() =="fer".toUpperCase() || str.toUpperCase() =="fercho".toUpperCase() || str.toUpperCase() =="fernando".toUpperCase() || str.toUpperCase() =="vargas".toUpperCase() ){
    retornar=true
  } 
  return retornar
}
function generaraleatorio(){
  var numintentos=0
  let randomIndex = Math.floor(Math.random() * options.length);
  if (selanterior==options[randomIndex]){
    randomIndex = Math.floor(Math.random() * options.length);
  }
  if(isfer(selanterior)){
    //En caso de que sea fer el numero no debe ser de adel o de 
    
    let validar=false
    while (!validar){
      if ((isadel((options[randomIndex])) || issebas(options[randomIndex]) || ismechi(options[randomIndex]))&&numintentos<20){
        randomIndex = Math.floor(Math.random() * options.length)
        numintentos+=1
        //console.log(options[randomIndex])
      }else{
        validar=true
      }
        
    }
  }
  validar=false
  if(issebas(selanterior)){
    //Sebas no debe regalar a jose
    while (!validar){
    if(isjose(options[randomIndex])&&numintentos<20){
      randomIndex = Math.floor(Math.random() * options.length)
      numintentos+=1
    }else{
      validar=true
    }
  }
  }
  validar=false
  if(isjose(selanterior)){
    //Jose no debe regalar a Sebas
    while (!validar){
    if(issebas(options[randomIndex])&&numintentos<20){
      randomIndex = Math.floor(Math.random() * options.length)
      numintentos+=1
    }else{
      validar=true
    }
  }
  }
  return randomIndex
}
// Generar ruleta dinámica con nombres
function generateWheel() {
  // Limpiar ruleta
  wheel.innerHTML = '';
  resultText.textContent = `Resultado: ?`;
  const segmentAngle = 360 / options.length;

  // Generar colores para la ruleta
  const gradientColors = options
    .map((_, index) => {
      const color = `hsl(${(index * 360) / options.length}, 70%, 50%)`; // Colores diferenciados automáticamente
      return `${color} ${index * segmentAngle}deg ${(index + 1) * segmentAngle}deg`;
    })
    .join(', ');

  wheel.style.background = `conic-gradient(${gradientColors})`;
// Recorremos las opciones y las distribuimos
// Ajuste especial para casos con pocas opciones (por ejemplo, 2 opciones)
options.forEach((option, index) => {
    const label = document.createElement('div');
    label.className = 'option-label';
    label.textContent = option;
  
    // Calcular el ángulo de cada opción
    const angle = index * segmentAngle;
  
    // Hacer un ajuste al ángulo para que el texto se alinee correctamente con su color
    const angleAdjustment = segmentAngle / 2; // Ajuste para mover el texto al centro de su color
    const adjustedAngle = angle + angleAdjustment;  // Restamos la mitad del ángulo para que el texto se desplace un poco
  
    // Calcular el desplazamiento radial basado en el ángulo ajustado
    const offsetX = Math.cos((adjustedAngle - 90) * (Math.PI / 180)) * 150;  // Desplazamiento horizontal
    const offsetY = Math.sin((adjustedAngle - 90) * (Math.PI / 180)) * 150;  // Desplazamiento vertical
  
    // Aplicar la rotación y el desplazamiento
    label.style.transform = `translateX(-50%) translateY(-50%) translateX(${offsetX}px) translateY(${offsetY}px) rotate(${adjustedAngle}deg)`;
  
    // Agregar el texto a la ruleta
    wheel.appendChild(label);
  });
}

// Actualizar opciones desde el textarea
//updateWheelButton.addEventListener('click', () => updateWheelauto())

// Girar la ruleta
spinButton.addEventListener('click', () => {
  audio.currentTime = 0; // Reinicia el audio por si se hace clic varias veces
  audio.play(); // Reproducir el sonido
  if (options.length === 0) {
    alert('La ruleta no tiene opciones. Ac tualízala primero.');
    return;
  }

  const segmentAngle = 360 / options.length;
 // const randomIndex = Math.floor(Math.random() * options.length);
 let randomIndex=generaraleatorio()
 
  const randomRotation = 360 * 8*i; // Mínimo 8 vueltas completas
  i=i+1
  const finalRotation = randomRotation + randomIndex * segmentAngle + segmentAngle / 2;

  // Mostrar resultado
  selanterior=options[randomIndex]
  //resultText.textContent = `Resultado: ${options[randomIndex]}`;

  // Girar ruleta
  wheel.style.transition = 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)';
  wheel.style.transform = `rotate(-${finalRotation}deg)`;

  spinButton.disabled = true;

  setTimeout(() => {
    spinButton.disabled = false;
    resultText.textContent = `Resultado: ${options[randomIndex]}`;
    bell.play()
  }, 5000); //7 segundos
});

// Inicializar ruleta
generateWheel();

function updateWheelauto(){
  //resultText.textContent = `Resultado: ?`;
  const inputText = optionsInput.value.trim();
  if (inputText) {
    options = inputText.split('\n').filter(option => option.trim() !== ''); // Dividir por líneas y eliminar vacíos
    generateWheel();
  } else {
    options=[]
    options.push("Opción 1")
    options.push("Opción 2")
    generateWheel();
    //alert('Por favor, ingresa al menos una opción.');
  }
}

document.querySelector('textarea').addEventListener('input',() =>  updateWheelauto());