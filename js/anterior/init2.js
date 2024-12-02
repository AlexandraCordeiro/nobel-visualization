
    function update() {
      const svg = d3.select("#bubble-chart");
      const width = +svg.attr("width");
      const height = +svg.attr("height");

      // Dados iniciais
      let data = [{ id: 1, size: 50, cx: width / 2, cy: height / 2 }];

      let state = 0; // Estado inicial

      // Função de renderização
      function updateChart(data) {
        const circles = svg.selectAll("circle").data(data, d => d.id);

        // Remove as bolas que não estão mais nos dados
        circles.exit()
          .transition()
          .duration(500)
          .attr("r", 0)
          .remove();

        // Atualiza bolas existentes
        circles
          .transition()
          .duration(1000)
          .attr("cx", d => d.cx)
          .attr("cy", d => d.cy)
          .attr("r", d => d.size)
          .style("fill", d => d.color || "steelblue");

        // Adiciona novas bolas
        circles.enter()
          .append("circle")
          .attr("r", 0)
          .attr("cx", width / 2)
          .attr("cy", height / 2)
          .style("fill", d => d.color || "steelblue")
          .merge(circles)
          .transition()
          .duration(1000)
          .attr("cx", d => d.cx)
          .attr("cy", d => d.cy)
          .attr("r", d => d.size);
      }

      // Transições baseadas no estado
      function changeState(newState) {
        state = newState;

        if (state === 0) {
          // Estado 0: Apenas uma bola no centro
          data = [{ id: 1, size: 50, cx: width / 2, cy: height / 2 }];
        } else if (state === 1) {
          // Estado 1: Adiciona 10 bolas com raio menor
          const startId = data.length + 1;
          const newBalls = d3.range(startId, startId + 10).map(i => ({
            id: i,
            size: 20,
            cx: 100,
            cy: 300,
          }));
          data = data.concat(newBalls);
        } else if (state === 2) {
          // Estado 2: Remove 5 bolas
          data = data.slice(0, Math.max(data.length - 5, 1));
        } else if (state === 3) {
          // Estado 3: Adiciona uma nova bola amarela
          const newId = data.length > 0 ? d3.max(data, d => d.id) + 1 : 1;
          data.push({
            id: newId,
            size: 30,
            cx: Math.random() * width,
            cy: Math.random() * height,
            color: "yellow",
          });
        }

        updateChart(data);
      }

      // Inicializa o gráfico
      updateChart(data);

      // Eventos de tecla para alternar estados
      window.addEventListener("keydown", e => {
        if (e.key === "ArrowRight") changeState((state + 1) % 4);
        if (e.key === "ArrowLeft") changeState((state - 1 + 4) % 4);
      });
    }

    // Inicializa o gráfico
    update();

    // Atualiza ao redimensionar a janela
    d3.select(window).on("resize", update);
