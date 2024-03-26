// On pose l'élément Chart dans le canvas HTML5 myChart
const ctx = document.getElementById('myChart');
// On appelle l'API LastFM - await ne peut fonctionner sans asynch --> tips = définir le type de ce fichier en tant que module
const collection = await fetch("https://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=https://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=676d5b220e27f2ab3683c0f4b95bbd5b&format=json&format=json")
const music = await collection.json();
// On récuère le chemin exacte pour n'obtenir plus qu'un tableau
const musicTags = music.toptags.tag;
console.log (musicTags)

//Fonction donnant une coordonnée aléatoire en y aux bubulles
function randBubPosY(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (90 - 10 +1)) + 10;
}

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

// Recherche par valeur de la propriété 'name'
let resultRock = findByName('rock');
let resultAltRock = findByName('alternative rock');
let resultHardRock = findByName('hard rock');
let resultElectro = findByName('electronic');
let resultExpe = findByName('experimental');
let resultElecA = findByName('electronica');
let resultPop = findByName('pop');
let resultFolk = findByName('folk');
let resultDance = findByName('dance');


// Création des Bubbles
new Chart(ctx, {
  type: 'bubble', 
  data: {
    datasets: [
      {
        label: resultRock.name,
        data: [{
          x: resultRock.reach,
          y: randBubPosY(),
          r: resultRock.count/30000
        },
        //bubulles sup pour demo -start-
        {
          x: resultAltRock.reach,
          y: randBubPosY(),
          r: resultAltRock.count/30000
        }, {
          x: resultHardRock.reach,
          y: randBubPosY(),
          r: resultHardRock.count/30000
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
          x: resultElectro.reach,
          y: randBubPosY(),
          r: resultElectro.count/30000
        },
        //bubulles sup pour demo -start-
        {
          x: resultExpe.reach,
          y: randBubPosY(),
          r: resultExpe.count/30000
        }, 
        {
          x: resultElecA.reach,
          y: randBubPosY(),
          r: resultElecA.count/30000
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
          x: resultPop.reach,
          y: randBubPosY(),
          r: resultPop.count/30000
        },
        //bubulles sup pour demo -start-
        {
          x: resultFolk.reach,
          y: randBubPosY(),
          r: resultFolk.count/30000
        }, 
        {
          x: resultDance.reach,
          y: randBubPosY(),
          r: resultDance.count/30000
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