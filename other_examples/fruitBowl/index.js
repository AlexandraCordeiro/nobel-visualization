const svg = document.querySelector('svg');

// Função para criar uma fruta
const makeFruit = type => ({
  type,
  id: Math.random()
});

// Array inicial de frutas
let fruits = Array.from({ length: 5 }, () => makeFruit('apple'));

// Função para renderizar o fruit bowl
const render = () => {
  fruitBowl(svg, {
    fruits,
    height: parseInt(svg.getAttribute('height'), 10),
  });
};

// Renderiza o estado inicial
render();

// Comer uma maçã
/*setTimeout(() => {
  fruits.pop();
  render();
}, 1000);*/

// Substituir uma maçã por um limão
/*setTimeout(() => {
  fruits[2].type = 'lemon';
  render();
}, 2000);
*/

// Comer outra maçã
setTimeout(() => {
  fruits = fruits.filter((_, i) => i !== 2); //i!= bola que sai
  render();
}, 2000);
