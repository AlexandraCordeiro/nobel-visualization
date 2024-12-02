function loadData(filePath, callback) {
    d3.csv(filePath, (d) => ({
        id: +d.id,
        name: d.knownName,
        prizeCategory: d.category,
        awardYear: d.awardYear,
        gender: d.gender,
        wikidata: d.wikidata,
    }))
    .then(callback)
    .catch((error) => {
        console.error("Erro ao carregar os dados:", error);
    });
}
