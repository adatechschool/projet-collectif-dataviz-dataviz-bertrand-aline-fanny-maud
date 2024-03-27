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
console.log(findByName('rock'))

// Fonction pour créer les Bubbles en fonction des datas
function getDataSet () {
  let dataSet = []
  let searchNames = ['rock', 'hard rock', 'metal', 'electronic', 'pop', 'folk','dance', 'Hip-Hop', 'jazz', 'blues'];
  
  // Parcourir le tableau et appliquer la fonction findByName à chaque élément
  searchNames.forEach(function(name) {
    let result = findByName(name);
    
    // Vérifier le résultat de la recherche et afficher les informations si trouvé
    if (result !== null) {
      let x = result.reach
      let r = parseInt(result.count / 30000)
      let data = {label: result.name, data: [{
        x: x, 
        y : randBubPosY(),
        r: r}
      ],
      borderWidth: 2,
      hoverRadius: 100
      }
      dataSet.push(data)
    } else {
      console.log("La catégorie avec le nom '" + name + "' n'a pas été trouvée.");
    }
  });
  return dataSet;
}

// Création des Bubbles
new Chart(ctx, {
  type: 'bubble', 
  data:{
    datasets: getDataSet(),
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