// On pose l'élément Chart dans le canvas HTML5 myChart
const ctx = document.getElementById('myChart');
// On appelle l'API LastFM - await ne peut fonctionner sans asynch --> tips = définir le type de ce fichier en tant que module
const collection = await fetch("https://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=https://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=676d5b220e27f2ab3683c0f4b95bbd5b&format=json&format=json")
const music = await collection.json();
// On récuère le chemin exacte pour n'obtenir plus qu'un tableau
const musicTags = music.toptags.tag;
console.log (musicTags)

// Fonction pour rechercher par valeur de la propriété 'name'
function findByName(name) {
  for (let key in musicTags) {
    if (musicTags.hasOwnProperty(key)) {
      if (musicTags[key].name === name) {
        return musicTags[key];
      }
    }
  }
  return null; // Si aucune correspondance n'est trouvée
}

// Valeur de la propriété 'name' à rechercher
let searchNameRock = 'rock';
let searchNameAltRock = 'alternative rock';
let searchNamePop = 'pop';
let searchNameElectro = 'electronic';

// Recherche par valeur de la propriété 'name'
let resultRock = findByName(searchNameRock);
let resultAltRock = findByName(searchNameAltRock);
let resultPop = findByName(searchNamePop);
let resultElectro = findByName(searchNameElectro);

// Vérification du résultat
if (resultRock !== null) {
  console.log("Vous avez sélectionné la catégorie '" + resultRock.name + "'.");
  console.log("Count:", resultRock.count);
  console.log("Reach:", resultRock.reach);
} else {
  console.log("La catégorie avec le nom '" + searchNameRock + "' n'a pas été trouvée.");
}

// Récupération des "count" pour chaque genre et relié
const rockCount = (musicTags[0]["count"])/100000;
const electroCount = (musicTags[1]["count"])/100000;
const popCount = (musicTags[5]["count"])/100000;
// Récupération des "reach" pour position x
const rockReach = (musicTags[0]["reach"]);
const electroReach = (musicTags[1]["reach"]);
const popReach = (musicTags[5]["reach"]);

// Création des Bubbles
new Chart(ctx, {
  type: 'bubble', 
  data: {
    //labels: labelFetch(),
    datasets: [
      {
        label: resultRock.name,
        data: [{
          x: rockReach,
          y: randBubPosY(),
          r: rockCount
        },
        //bubulles sup pour demo -start-
        {
          x: 300000,
          y: randBubPosY(),
          r: 45
        }, {
          x: 150000,
          y: randBubPosY(),
          r: 49
        }
        //bubulles sup pour demo -end-
      ],
        //Paramètres datasets[1]
        borderColor: '#de9eb2',
        borderWidth: 3,
        backgroundColor: 'rgba(255,99,132,0.6)',
        hoverBackgroundColor: 'rgba(256,99,132,0.9)',
        hoverBorderColor: 'rgb(255,0,54)',
        hoverRadius: 100
      },
      {
        label : resultElectro.name,
        data: [{
          x: electroReach,
          y: randBubPosY(),
          r: electroCount
        },
        //bubulles sup pour demo -start-
        {
          x: 485000,
          y: randBubPosY(),
          r: 9
        }, 
        {
          x: 358456,
          y: randBubPosY(),
          r: 65
        }
        //bubulles sup ppour demo -end-
      ],
        //Paramètres datasets[2]
        borderColor: '#82bfe8',
        borderWidth: 3,
        backgroundColor: 'rgba(54,162,235,0.6)',
        hoverBackgroundColor: 'rgba(54,162,235,0.9)',
        hoverBorderColor: 'rgb(0,152,255)',
        hoverRadius: 100 
      },
      {
        label : resultPop.name,
        data: [{
          x: popReach,
          y: randBubPosY(),
          r: popCount
        },
        //bubulles sup pour demo -start-
        {
          x: 110000,
          y: randBubPosY(),
          r: 35
        }, 
        {
          x: 488235,
          y: randBubPosY(),
          r: 32
        }
        //bubulles sup ppour demo -end-
      ],
        //Paramètres datasets[3]
        borderColor: '#f0e0bb',
        borderWidth: 3,
        backgroundColor: 'rgba(255,205,86,0.6)',
        hoverBackgroundColor: 'rgba(255,205,86,0.9)',
        hoverBorderColor: 'rgb(255,180,0)',
        hoverRadius: 100
      }
    ]
  },
  options: {
    responsive: true,
    scales : {
      x: {
        min: 10000,
        max: 600000,
        grid: {
          display: false
        },
        border: {
          display: true
        },
        ticks: {
          display: true
        },
        title: {
          display: true,
          text: 'Nombre Auditeurs Uniques',
          color: '#666',
          font: {
            family: 'Roboto',
            size: 11,
            weight: 'bold',
            lineHeight: 1.2
          }
        }
      },
      y: {
        min: 0,
        max: 100,
        grid : {
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    plugins: {
      title: {
        display: true,
        color: '#fffx',
        text: 'LastFM API DataViz'
      },
      legend: {
        title: {
          display: true,
          text: "Principaux Genres de Musiques"
        }
      } 
    }
  }
});