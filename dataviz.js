const collection = await fetch("https://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=https://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=676d5b220e27f2ab3683c0f4b95bbd5b&format=json&format=json")
    // .then((response) => {
    //     return response.json();
    //     console.log(response);
    // })
    // .then((json) => {
    //     console.log(json);
    // });
const music = await collection.json();
// console.log(music);
// console.log(music.toptags.tag);
let x = music.toptags.tag
console.log(x)

// function generateStyle(music) {
//     let article = [];
//     for (let i=0; i < music.length; i++) {
//         let y = article.push(music[i]);
//     } 
//     return article;
// }

// console.log(generateStyle(music.toptags.tag));