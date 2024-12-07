let data = [];
let laureates = [];
const laureatesFile = "../../dataset/laureates_data.csv";

function loadDataset(callback) {
    d3.csv(laureatesFile)
        .then((data) => {
            laureates = data.map((d) => ({
                id: +d.id,
                name: d.knownName,
                prizeCategory: d.category,
                awardYear: d.awardYear,
                gender: d.gender,
                wikidata: d.wikidata
            }));
            callback(); // Executa o callback depois do carregamento
        })
        .catch((error) => {
            console.error("Erro ao carregar os dados:", error);
        });
}

/*function getLaureates() {
    return laureates;
}*/