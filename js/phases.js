let raio=280;
svg= d3.select("svg");

let knownName = document.getElementById("knownName");
let category = document.getElementById("category");
let extra_info = document.getElementById("add_info");

knownName.innerText = " ";
category.innerText = " ";
extra_info.innerText = " ";

/*Colors*/
let backColor = '#F7F1E5';
let yellow = "#FFC100"; //organizations
let terra = "#B05E27"; //female
let green1 = "#898121"; //male
let green2 = "#4C4B16";

let c1 = "#460002"; //Medicina
let c2 = "#860A0A"; //Economia
let c3 = "#DE783A"; //Quimica
let c4 = "#C3A768"; //Literatura
let c5 = "#5F6B53"; //Paz
let c6 = "#15616E"; //Física

let title = document.querySelector("#title");
let other_text = document.querySelector("#other_text");
let body = document.querySelector("body");
let section = document.querySelector("section");
let maxPhase=10;

//estado inicial - imagem moeda
/*function phase0() {
    other_text.style.opacity = "1";
    title.style.opacity = "1";
    section.style.display = "none";

    svg.selectAll("text").remove()
    // Dados do círculo
    data = [{ id: 0, x: xScale(5), y: yScale(5), r: raio, color: yellow, imagePath: "../../src/moeda.png" }];

    // Remove qualquer imagem já existente
    svg.selectAll("clipPath").remove();
    svg.selectAll("image").remove();

    // Adiciona a imagem centralizada no círculo
    svg.append("image")
        .attr("xlink:href", data[0].imagePath) // Caminho da imagem
        .attr("x", data[0].x - data[0].r) // Centraliza horizontalmente
        .attr("y", data[0].y - data[0].r ) // Centraliza verticalmente
        .attr("width", 2*data[0].r) // Define a largura igual ao diâmetro do círculo
        .attr("height", 2*data[0].r); // Define a altura igual ao diâmetro do círculo
    update();
}*/

//estado inicial - moeda com número
function phase1() {
    section.style.display = "flex";
    // Remover qualquer imagem existente para evitar duplicação
    svg.selectAll("image").remove();

    // Dados do círculo para a fase 2
    data = [{ id: 0, x: xScale(5), y: yScale(5), r: raio, color: yellow }];
        
    // Atualiza a visualização (presumivelmente altera o círculo)
    update();

    // Adiciona um texto centralizado no SVG

    // Remover texto anterior (se houver)
    svg.selectAll("text").remove();

    // Adiciona o texto no centro do SVG
    svg.append("text")
        .attr("x", width / 2)  // Posição X centralizada
        .attr("y", height / 2)  // Posição Y centralizada
        .attr("text-anchor", "middle")  // Alinha o texto no centro
        .attr("dominant-baseline", "middle")  // Centraliza verticalmente
        .attr("font-size", "100px")  // Tamanho da fonte
        .attr("fill", "#000000")  // Cor do texto
        .text("1012");


    //other_text.style.opacity = "0";
    //title.style.opacity = "0";
    /*body.removeChild(other_text);
    body.removeChild(title);*/
}

//1012 bolas
function phase2() {
    console.log("fase 3");

    svg.selectAll("text").remove()

    const centerX = width / 2; // Centro da grelha
    const centerY = height / 2; // Centro da grelha
    const circleRadius = (raio * 7) / 300; //raio de cada circulo
    console.log(circleRadius + "px")
    const gap = 1; // Espaçamento entre círculos
    const effectiveRadius = circleRadius + gap; // Raio efetivo considerando o gap

    data = []; // Redefine os dados

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
                color: yellow,
                id: laureate.id,
                name: laureate.name,
                gender: laureate.gender,
                prizeCategory: laureate.prizeCategory,
                awardYear: laureate.awardYear,
                wikidata: laureate.wikidata,
            });
            index++; // Avança para o próximo laureado
        }
    }

    update();
}

//separa por cores entidades/género 
function phase3() {
    console.log("fase 4");

    const centerX = width / 2; // Centro da grelha
    const centerY = height / 2; // Centro da grelha
    const circleRadius = (raio * 7) / 300; 
    const gap = 1; // Espaçamento entre círculos
    const effectiveRadius = circleRadius + gap; // Raio efetivo considerando o gap

    data = []; // Redefine os dados

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
            const laureate = laureates[index] || { id: null, name: "Unknown", gender: "Unknown" };

            // Determina a cor com base no gênero
            const color = laureate.gender === "male"
                ? green1
                : laureate.gender === "female"
                ? terra
                : yellow;

            data.push({ // dá push apenas dos dados que quero ver
                x: x,
                y: y,
                r: circleRadius,
                color: color, // Usa a cor definida com base no gênero
                id: laureate.id,
                name: laureate.name,
                gender: laureate.gender,
                prizeCategory: laureate.prizeCategory,
                awardYear: laureate.awardYear,
                wikidata: laureate.wikidata,
            });
            index++; // Avança para o próximo laureado
        }
    }

    update(); // Atualiza o SVG com os novos círculos

}

//separa por grupos de cores entidades/género
function phase4() {
    console.log("fase 5");


    const centerX = width / 2; //Centro horizontal
    const centerY = height / 2; // Centro vertical
    const circleRadius = 7; // Raio de cada círculo
    const gap = 1; // Espaçamento entre círculos
    const effectiveRadius = circleRadius + gap; // Raio efetivo considerando o gap

    //valor que define o género de um triangulos
    let val = 250;
     // Definir centros para cada gênero
    const centers = {
        male: { x: centerX-val/2, y: centerY },
        female: { x: centerX+val, y: centerY+val/2 },
        other: { x: centerX+val, y: centerY-val/3 }
    };

    // Grupos de dados para cada gênero
    const groups = {
        male: [],
        female: [],
        other: []
    };

    // Separar laureados por gênero
    laureates.forEach(laureate => {
        const gender = laureate.gender;
        if (gender === 'male') {
            groups.male.push(laureate);
        } else if (gender === 'female') {
            groups.female.push(laureate);
        } else {
            groups.other.push(laureate);
        }
    });

    // Processar cada grupo
    data = []; // Redefine os dados
    Object.keys(groups).forEach(groupKey => {
        const laureates = groups[groupKey];
        const { x: groupCenterX, y: groupCenterY } = centers[groupKey];
        const color = groupKey === 'male' ? green1 : groupKey === 'female' ? terra : yellow;

        let currentRadius = 0; // Raio atual da camada
        let index = 0; // Índice para acessar laureates

        while (index < laureates.length) {
            currentRadius += effectiveRadius * 2; // Incrementa o raio da camada com base no tamanho efetivo
            // Número de círculos na camada atual, proporcional ao comprimento da circunferência
            const circumference = 2 * Math.PI * currentRadius;
            const circlesInLayer = Math.min(
                laureates.length - index,
                Math.floor(circumference / (effectiveRadius * 2))
            );

            // Ângulo entre círculos nesta camada
            const angleStep = (2 * Math.PI) / circlesInLayer;

            // Adiciona os círculos da camada
            for (let i = 0; i < circlesInLayer; i++) {
                const angle = i * angleStep;
                const x = groupCenterX + currentRadius * Math.cos(angle);
                const y = groupCenterY + currentRadius * Math.sin(angle);

                const laureate = laureates[index];

                data.push({
                    x: x,
                    y: y,
                    r: circleRadius,
                    color: color,
                    id: laureate.id,
                    name: laureate.name,
                    gender: laureate.gender,
                    prizeCategory: laureate.prizeCategory,
                    awardYear: laureate.awardYear,
                    wikidata: laureate.wikidata,
                });
                index++; // Avança para o próximo laureado
            }
        }
    });


    update();
}

//separa por categorias
function phase5() {

console.log("fase 6");

//se estiver na phase5() e voltar atras remove o pattern
  svg.selectAll("pattern").remove()
  const centerX = width / 2; // Centro horizontal
  const centerY = height / 2; // Centro vertical
  const circleRadius = 7; // Raio de cada círculo
  const gap = 1; // Espaçamento entre círculos
  const effectiveRadius = circleRadius + gap; // Raio efetivo considerando o gap

  // Valor para definir deslocamento entre as categorias
  const val = 280;

  // Lista de categorias únicas no dataset
  const categories = [...new Set(laureates.map(laureate => laureate.prizeCategory))];

  // Calcular centros para cada categoria (em uma distribuição circular)
  const centers = {};
  const angleStep = (2 * Math.PI) / categories.length;

  categories.forEach((category, index) => {
      const angle = index * angleStep;
      centers[category] = {
          x: centerX + val * Math.cos(angle),
          y: centerY + val * Math.sin(angle)
      };
  });

  // Grupos de dados para cada categoria
  const groups = {};
  categories.forEach(category => {
      groups[category] = [];
  });

  // Separar laureados por categoria
  laureates.forEach(laureate => {
      const category = laureate.prizeCategory;
      if (groups[category]) {
          groups[category].push(laureate);
      }
  });

  // Processar cada grupo
  data = []; // Redefine os dados
  Object.keys(groups).forEach(groupKey => {
      const laureates = groups[groupKey];
      const { x: groupCenterX, y: groupCenterY } = centers[groupKey];
      const color = getColorForCategory(groupKey); // Obtem a cor com base na categoria

      let currentRadius = 0; // Raio atual da camada
      let index = 0; // Índice para acessar laureates

      while (index < laureates.length) {
          currentRadius += effectiveRadius * 2; // Incrementa o raio da camada com base no tamanho efetivo
          // Número de círculos na camada atual, proporcional ao comprimento da circunferência
          const circumference = 2 * Math.PI * currentRadius;
          const circlesInLayer = Math.min(
              laureates.length - index,
              Math.floor(circumference / (effectiveRadius * 2))
          );

          // Ângulo entre círculos nesta camada
          const angleStep = (2 * Math.PI) / circlesInLayer;

          // Adiciona os círculos da camada
          for (let i = 0; i < circlesInLayer; i++) {
              const angle = i * angleStep;
              const x = groupCenterX + currentRadius * Math.cos(angle);
              const y = groupCenterY + currentRadius * Math.sin(angle);

              const laureate = laureates[index];

              data.push({
                  x: x,
                  y: y,
                  r: circleRadius,
                  color: color,
                  id: laureate.id,
                  name: laureate.name,
                  gender: laureate.gender,
                  prizeCategory: laureate.prizeCategory,
                  awardYear: laureate.awardYear,
                  wikidata: laureate.wikidata,
              });
              index++; // Avança para o próximo laureado
          }
      }
  });

  update(); // Atualiza o SVG com os novos círculos

  // Função para obter uma cor única para cada categoria
  function getColorForCategory(category) {
    const colors = {
        "Physics": c6,
        "Chemistry": c3,
        "Physiology or Medicine": c1,
        "Literature": c4,
        "Peace": c5,
        "Economic Sciences": c2
    };

    // Remove espaços extras e garanta que o texto seja comparado corretamente
    const trimmedCategory = category.trim();

    return colors[trimmedCategory] || yellow; // Cor padrão para categorias desconhecidas
}
    update();
}

function phase6() {
    console.log("fase 7");
    //se estiver na phase5() e voltar atras remove o pattern

    const centerX = width / 2; // Centro horizontal
    const centerY = height / 2; // Centro vertical
    const circleRadius = 7; // Raio de cada círculo
    const gap = 1; // Espaçamento entre círculos
    const effectiveRadius = circleRadius + gap; // Raio efetivo considerando o gap

    // Valor para definir deslocamento entre as categorias
    const val = 280;

    // Lista de categorias únicas no dataset
    const categories = [...new Set(laureates.map(laureate => laureate.prizeCategory))];

    // Calcular centros para cada categoria (em uma distribuição circular)
    const centers = {};
    const angleStep = (2 * Math.PI) / categories.length;

    categories.forEach((category, index) => {
        const angle = index * angleStep;
        centers[category] = {
            x: centerX + val * Math.cos(angle),
            y: centerY + val * Math.sin(angle)
        };
    });

    // Grupos de dados para cada categoria
    const groups = {};
    categories.forEach(category => {
        groups[category] = [];
    });

    // Separar laureados por categoria
    laureates.forEach(laureate => {
        const category = laureate.prizeCategory;
        if (groups[category]) {
            groups[category].push(laureate);
        }
    });

    // Processar cada grupo
    data = []; // Redefine os dados
    Object.keys(groups).forEach(groupKey => {
        const laureates = groups[groupKey];
        const { x: groupCenterX, y: groupCenterY } = centers[groupKey];

        let currentRadius = 0; // Raio atual da camada
        let index = 0; // Índice para acessar laureates

        while (index < laureates.length) {
            currentRadius += effectiveRadius * 2; // Incrementa o raio da camada com base no tamanho efetivo
            // Número de círculos na camada atual, proporcional ao comprimento da circunferência
            const circumference = 2 * Math.PI * currentRadius;
            const circlesInLayer = Math.min(
                laureates.length - index,
                Math.floor(circumference / (effectiveRadius * 2))
            );

            // Ângulo entre círculos nesta camada
            const angleStep = (2 * Math.PI) / circlesInLayer;

            // Adiciona os círculos da camada
            for (let i = 0; i < circlesInLayer; i++) {
                const angle = i * angleStep;
                const x = groupCenterX + currentRadius * Math.cos(angle);
                const y = groupCenterY + currentRadius * Math.sin(angle);

                const laureate = laureates[index];

                // A cor agora depende do gênero do laureado
                const color = getColorForGender(laureate.gender);

                data.push({
                    x: x,
                    y: y,
                    r: circleRadius,
                    color: color,
                    id: laureate.id,
                    name: laureate.name,
                    gender: laureate.gender,
                    prizeCategory: laureate.prizeCategory,
                    awardYear: laureate.awardYear,
                    wikidata: laureate.wikidata,
                });
                index++; // Avança para o próximo laureado
            }
        }
    });

    update(); // Atualiza o SVG com os novos círculos

    // Função para obter a cor com base no gênero
    function getColorForGender(gender) {
        if (gender === 'male') {
            return green1;  // Cor para male
        } else if (gender === 'female') {
            return terra;  // Cor para female
        } else {
            return yellow;  // Cor para other
        }
    }
}

function phase7(){

    knownName.innerText = " ";
    category.innerText = " ";
    extra_info.innerText = " ";

        console.log("fase 8");
    
        const centerX = width / 2; // Centro horizontal
        const centerY = height / 2; // Centro vertical
        const circleRadius = 7; // Raio de cada círculo
        const gap = 1; // Espaçamento entre círculos
        const effectiveRadius = circleRadius + gap; // Raio efetivo considerando o gap
    
        // Valor para definir deslocamento entre as categorias (diminuído para manter as categorias mais próximas)
        const val = 280; // Ajuste aqui para reduzir a distância entre as categorias
        
        // Lista de categorias únicas no dataset
        const categories = [...new Set(laureates.map(laureate => laureate.prizeCategory))];
    
        // Calcular centros para cada categoria (em uma distribuição circular)
        const centers = {};
        const angleStep = (2 * Math.PI) / categories.length;
    
        categories.forEach((category, index) => {
            const angle = index * angleStep;
            centers[category] = {
                x: centerX + val * Math.cos(angle),
                y: centerY + val * Math.sin(angle)
            };
        });
    
        // Grupos de dados para cada categoria
        const groups = {};
        categories.forEach(category => {
            groups[category] = {
                male: [],
                female: [],
                other: []
            };
        });
    
        // Separar laureados por categoria e gênero
        laureates.forEach(laureate => {
            const category = laureate.prizeCategory;
            const gender = laureate.gender;
    
            if (groups[category]) {
                if (gender === 'male') {
                    groups[category].male.push(laureate);
                } else if (gender === 'female') {
                    groups[category].female.push(laureate);
                } else {
                    groups[category].other.push(laureate);
                }
            }
        });
    
        // Processar cada grupo
        data = []; // Redefine os dados
        Object.keys(groups).forEach(groupKey => {
            const laureatesByGender = groups[groupKey];
            const { x: groupCenterX, y: groupCenterY } = centers[groupKey];
    
            // Definir os 3 pontos centrais para os gêneros (distribuídos ao longo da circunferência)
            const genderCenters = {
                male: { x: groupCenterX, y: groupCenterY},
                female: { x: groupCenterX+100, y: groupCenterY},
                other: { x: groupCenterX-100, y: groupCenterY}
            };
    
            // Processar laureados de cada gênero dentro da categoria
            Object.keys(laureatesByGender).forEach(genderKey => {
                const laureates = laureatesByGender[genderKey];
                const { x: genderCenterX, y: genderCenterY } = genderCenters[genderKey];
    
                // Cor associada ao gênero
                const color = getColorForGender(genderKey);
    
                let currentRadius = 0; // Raio atual da camada
                let index = 0; // Índice para acessar laureates
    
                while (index < laureates.length) {
                    currentRadius += effectiveRadius * 2; // Incrementa o raio da camada com base no tamanho efetivo
                    // Número de círculos na camada atual, proporcional ao comprimento da circunferência
                    const circumference = 2 * Math.PI * currentRadius;
                    const circlesInLayer = Math.min(
                        laureates.length - index,
                        Math.floor(circumference / (effectiveRadius * 2))
                    );
    
                    // Ângulo entre círculos nesta camada
                    const angleStep = (2 * Math.PI) / circlesInLayer;

                    // Adiciona os círculos da camada
                    for (let i = 0; i < circlesInLayer; i++) {
                        const angle = i * angleStep;
                        const x = genderCenterX + currentRadius * Math.cos(angle);
                        const y = genderCenterY + currentRadius * Math.sin(angle);
    
                        const laureate = laureates[index];
    
                        data.push({
                            x: x,
                            y: y,
                            r: circleRadius,
                            color: color,
                            id: laureate.id,
                            name: laureate.name,
                            gender: laureate.gender,
                            prizeCategory: laureate.prizeCategory,
                            awardYear: laureate.awardYear,
                            wikidata: laureate.wikidata,
                        });
                        index++; // Avança para o próximo laureado
                    }
                }
            });
        });
    
        update(); // Atualiza o SVG com os novos círculos
    
        // Função para obter a cor com base no gênero
        function getColorForGender(gender) {
            if (gender === 'male') {
                return green1;  // Cor para male
            } else if (gender === 'female') {
                return terra;  // Cor para female
            } else {
                return yellow;  // Cor para other
            }
        }
    
    
}

//Marie Curie
function phase8(){
    knownName.innerText = "Marie Curie";
    category.innerHTML = "Physics (1903) <br> Chemistry (1911)";
    extra_info.innerHTML ="<p>única mulher laureada com 2 prémios</p><p>primeira laureada com 2 prémios</p>"

    console.log("FASE 9");
    const url= "https://www.wikidata.org/wiki/Q7186"; //url da pagina completa da wikidata
    console.log(getWikidataId(url));
  //const backgroundImageURL = "../../marie_curie.png";
  const svg = d3.select("svg");

  (async () => {
    try {
        const wikidataId = getWikidataId(url); // Obtém o ID da Wikidata a partir da URL
        if (wikidataId) {
           
           const backgroundImageURL = await fetchWikidataImage(wikidataId); // Aguarda o resultado da Promise

                // Limpa o SVG antes de adicionar elementos
            //svg.selectAll("*").remove();

            // Define um padrão para a imagem
            const defs = svg.append("defs");
            defs.append("pattern")
                .attr("id", "circle-bg") // ID único do padrão
                //.attr("patternUnits", "objectBoundingBox")
                .attr("width", 1)
                .attr("height", 1)
                .append("image")
                .attr("xlink:href", backgroundImageURL)
                .attr("preserveAspectRatio", "xMidYMid slice") // Ajusta a proporção
                .attr("width", raio*2) // Ajuste para o tamanho correto da imagem
                .attr("height", raio*2); // Ajuste para o tamanho correto da imagem
            
        } else {
            console.log("Link da Wikidata inválido.");
        }
    } catch (error) {
        console.error("Erro ao buscar a imagem da Wikidata:", error);
    }
})();
    

  // Adiciona o círculo com o padrão de fundo
  data = [
      { id: 0, x: xScale(5), y: yScale(5), r: raio, color: "url(#circle-bg)" }
  ];

  svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", d => d.color)
      .attr("id", "backgroundCircle"); // Adiciona um ID para o círculo

  update();
}

function phase9(){
    console.log("FASE 10");
    //remove o pattern ao avançar para a phase6();
    svg.selectAll("pattern").remove()
    svg.selectAll("image").remove();
    section.style.display = "flex";
    knownName.innerText = " ";
    category.innerText = " ";
    extra_info.innerText = " ";
    //other_text.style.opacity = "0";
    //title.style.opacity = "0";
}

function phase10(){

}

function initializePhases() {
    runPhase(1);
}

function runPhase(phase) {
    //if (phase === 0) phase0();
    if (phase === 1) phase1();
    if (phase === 2) phase2();
    if (phase === 3) phase3();
    if (phase === 4) phase4();
    if (phase === 5) phase5();
    if (phase === 6) phase6();
    if (phase === 7) phase7();
    if (phase === 8) phase8();
    if (phase === 9) phase9();
    if (phase === 10) phase10();

}


// URL da Wikidata
//const wikidataLink = "https://www.wikidata.org/wiki/Q7186";

// Função para extrair o ID da Wikidata do link
function getWikidataId(url) {
  const match = url.match(/\/wiki\/(Q\d+)/);
  return match ? match[1] : null;
}

// Função para buscar a imagem associada a um item da Wikidata
async function fetchWikidataImage(wikidataId) {
  const apiUrl = `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${wikidataId}&property=P18&format=json&origin=*`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Verificar se a propriedade P18 (imagem) existe
    if (data.claims && data.claims.P18) {
      const imageName = data.claims.P18[0].mainsnak.datavalue.value;
      // Construir a URL da imagem no Wikimedia Commons
      const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(imageName)}`;
      //console.log(`Imagem encontrada: ${imageUrl}`);
      return imageUrl;
    } else {
      console.log("Nenhuma imagem encontrada para este item.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar a imagem:", error);
    return null;
  }
}