// Estado da transição inicial
  let transitionState = 0;
  
  // Seleção do SVG e definição de largura e altura
  const svg = d3.select("#bubble-chart");
  
  // Função para criar e atualizar as bolinhas no gráfico
  function updateChart(data, state) {
    const bubbles = svg.selectAll("circle")
      .data(data, d => d.id);
  
    // Entra - Adiciona novas bolinhas se necessário
    bubbles.enter()
      .append("circle")
      //.attr("cx", () => Math.random() * width)
      //.attr("cy", () => Math.random() * height)
      .attr("r", 10)
      .style("fill", "steelblue")
      .merge(bubbles) // Atualiza as bolinhas existentes
      .transition()
      .duration(1000)
      .attr("r", d => state === 1 ? d.size : d.otherSize) // Muda o tamanho
      .attr("cx", d => state === 1 ? d.cx : d.cxF) //muda a posição x
      .attr("cy", d => state === 1 ? d.cy : d.cyF) //muda a posição y
      //.style("fill", d => state === 2 ? "orange" : "steelblue"); // Muda a cor
  
    // Sai - Remove as bolinhas que não estão nos dados
    bubbles.exit().remove();
  }
  
  //Desenha o gráfico incialmente
  updateChart(data, transitionState);
  
  // Função para alternar a transição ao fazer scroll na página ou a usar as teclas de seta
  function changeTransitionState(newState) {
   transitionState = (newState + 3) % 3; // Mantém o estado entre 0 e 2
   updateChart(data, transitionState); //faz update dos valores do char  
  }
  
  // Event listeners para teclas de seta
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") changeTransitionState(transitionState + 1);
    if (e.key === "ArrowLeft") changeTransitionState(transitionState - 1);
  });
  
  // Event listener para o *scroll*
  window.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) changeTransitionState(transitionState + 1);
    if (e.deltaY < 0) changeTransitionState(transitionState - 1);
  });
  