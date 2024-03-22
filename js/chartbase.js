// On pose l'élémznt Chart dans le canvas HTML5 myChart
const ctx = document.getElementById('myChart');
// On appelle l'API LastFM - await ne peut fonctionner sans asynch --> tips = définir le type de ce fichier en tant que module
const collection = await fetch("https://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=https://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=676d5b220e27f2ab3683c0f4b95bbd5b&format=json&format=json")
const music = await collection.json();
// On récuère le chemin exacte pour n'obtneir plus qu'un tableau
const musicTags = music.toptags.tag;
const rock = (musicTags[0]["count"])/50000;
const electro = (musicTags[1]["count"])/50000;
const pop = (musicTags[5]["count"])/50000;
console.log(musicTags);

new Chart(ctx, {
  type: 'bubble', 
  data: {
    datasets: [
      {
        label: 'Rock',
        data: [{
          x: 3,
          y: 4,
          r: rock
        }
        // {
        //   x: 3,
        //   y: 3,
        //   r: 45
        // }, {
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
        label : 'Electronic',
        data: [{
          x: 4,
          y: 4,
          r: electro
        }
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
        label : 'Pop',
        data: [{
          x: 9,
          y: 6,
          r: pop
        }
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
        easing: 'linear',
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
          display: true
        },
        ticks: {
          display: true
        }
      },
      y: {
        grid : {
          display: false
        },
        border: {
          display: true
        },
        ticks: {
          display: true
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