const colorScale = fruitType => ({
  apple: '#c11d1d',
  lemon: '#eae600',
}[fruitType]);

const radiusScale = fruitType => ({
  apple: 50,
  lemon: 30,
}[fruitType]);

const xPosition = (d, i) => i * 120 + 60;

// Função principal para renderizar o fruit bowl
const fruitBowl = (selection, props) => {
  const { fruits, height } = props;

  // Seleciona todos os círculos
  const existingCircles = Array.from(selection.querySelectorAll('circle'));
  
  // Cria um mapa das frutas existentes usando o `id` como chave
  const fruitMap = new Map(existingCircles.map(circle => [circle.__data__.id, circle]));

  // Atualiza os elementos
  fruits.forEach((fruit, i) => {
    let circle = fruitMap.get(fruit.id);

    if (!circle) {
      // Entra - Adiciona novas bolinhas
      circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.__data__ = fruit;
      selection.appendChild(circle);

      // Configuração inicial
      circle.setAttribute('cx', xPosition(fruit, i));
      circle.setAttribute('cy', height / 2);
      circle.setAttribute('r', 0);
      circle.setAttribute('fill', colorScale(fruit.type));
    }

    // Atualiza a posição e o raio
    setTimeout(() => {
      circle.setAttribute('cx', xPosition(fruit, i));
      circle.setAttribute('r', radiusScale(fruit.type));
    }, 0);

    // Remove do mapa para que não seja tratado como `exit`
    fruitMap.delete(fruit.id);
  });

  // Sai - Remove as frutas que não estão mais no conjunto
  fruitMap.forEach(circle => {
    setTimeout(() => {
      circle.setAttribute('r', 0);
      circle.addEventListener('transitionend', () => circle.remove());
    }, 0);
  });
};
