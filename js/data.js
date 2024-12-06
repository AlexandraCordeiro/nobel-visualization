

export function loadDataset(callback) {
    let data = [];
    let laureates = [];
    const laureatesFile = "../../dataset/laureates_data.csv";
    let totalCircles=0;

    d3.csv(laureatesFile, (d) => ({
        id: +d.id,
        name: d.knownName,
        prizeCategory: d.category,
        awardYear: d.awardYear,
        gender: d.gender,
        wikidata: d.wikidata
    }))
        .then((loadedData) => {
            laureates = loadedData;
            totalCircles = laureates.length;
            callback();
        })
        .catch((error) => {
            console.error("Erro ao carregar os dados:", error);
        });
}

export default {loadDataset};