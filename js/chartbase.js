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
const rock = (musicTags[0]["count"])/100000;
const electro = (musicTags[1]["count"])/100000;
const pop = (musicTags[5]["count"])/100000;

// Création des Bubbles
new Chart(ctx, {
  type: 'bubble', 
  data: {
    //labels: labelFetch(),
    datasets: [
      {
        label: resultRock.name,
        data: [{
          x: 3,
          y: 4,
          r: resultRock.count/50000
        },
        {
          x: 3,
          y: 3,
          r: resultAltRock.count/50000
        }, 
        //{
        //   x: 5,
        //   y: 9,
        //   r: 49
        // }
      ],
        borderColor: '#de9eb2',
        borderWidth: 3,
        backgroundColor: 'rgb(255,99,132)',
        hoverBorderColor: 'rgb(56,123,234)',
        //drawActiveElementsOnTop
      },
      {
        label : resultElectro.name,
        data: [{
          x: 4,
          y: 4,
          r: resultElectro.count/50000
        },
        // {
        //   x: 7,
        //   y: 7,
        //   r: 9
        // }, 
        // {
        //   x: 15,
        //   y: 6,
        //   r: 65
        // }
      ],
        borderColor: '#82bfe8',
        borderWidth: 3,
        backgroundColor: 'rgb(54,162,235)',
      },
      {
        label : resultPop.name,
        data: [{
          x: 9,
          y: 6,
          r: resultPop.count/50000
        },
        // {
        //   x: 11,
        //   y: 4,
        //   r: 35
        // }, 
        // {
        //   x: 5,
        //   y: 6,
        //   r: 32
        // }
      ],
        borderColor: '#f0e0bb',
        borderWidth: 3,
        backgroundColor: 'rgb(255,205,86)',

      }
    ]
  },
  options: {
    animations: {
      tension: {
        duration: 1000,
        easing: 'easeInCirc',
        from: 1,
        to: 0,
        loop: true
      }
    },
    scales : {
      x: {
        grid: {
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          display: false
        }
      },
      y: {
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
      }
    }
  }
});