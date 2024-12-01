import { svg, data, laureates} from './data.js';
import { update } from '../update.js';
import {} from './resize.js';

export function phase1() {
  data.splice(0, data.length); // Limpar dados anteriores
  data.push({ id: 0, x: 500, y: 500, r: 300, color: "#E9DF69" });
  update();
}

export function phase2() {
    let width = window.innerWidth;
    let height = window.innerHeight;
  // Implemente lógica da fase 2
  const centerX = width / 2; // Centro da grelha
  const centerY = height / 2; // Centro da grelha
  const circleRadius = 7; // Raio de cada círculo
  const gap = 1; // Espaçamento entre círculos
  const effectiveRadius = circleRadius + gap; // Raio efetivo considerando o gap

  let data = []; // Redefine os dados

  let currentRadius = 0; // Raio atual da camada
  let index = 0; // Índice para acessar laureates

  // Processa apenas os laureados disponíveis
  const totalLaureates = laureates.length;

  while (index < totalLaureates) {
      currentRadius += effectiveRadius * 2; // Incrementa o raio da camada com base no tamanho efetivo
      // Número de círculos na camada atual, proporcional ao comprimento da circunferência
      const circumference = 2 * Math.PI * currentRadius;
      const circlesInLayer = Math.min(
          totalLaureates - index,
          Math.floor(circumference / (effectiveRadius * 2))
      );

      // Ângulo entre círculos nesta camada
      const angleStep = (2 * Math.PI) / circlesInLayer;

      // Adiciona os círculos da camada
      for (let i = 0; i < circlesInLayer; i++) {
          const angle = i * angleStep;
          const x = centerX + currentRadius * Math.cos(angle);
          const y = centerY + currentRadius * Math.sin(angle);

          // Obtem o laureado correspondente
          const laureate = laureates[index] || { id: null, name: "Unknown", gender: "Unknown"};
          //console.log(laureate);

          data.push({ //dá push apenas dos dados que quero ver
              x: x,
              y: y,
              r: circleRadius,
              color: "#E9DF69",
              id: laureate.id,
              name: laureate.name,
              gender: laureate.gender,
              prizeCategory: laureate.prizeCategory,
              awardYear: laureate.awardYear
          });
          index++; // Avança para o próximo laureado
      }
  }

  update();
}

export function phase3() {
  // Implemente lógica da fase 3
  update();
}

export function phase4() {
  // Implemente lógica da fase 4
  update();
}

export function phase5() {
  // Implemente lógica da fase 5
  update();
}

export function phase6() {
  // Implemente lógica da fase 6
  update();
}
