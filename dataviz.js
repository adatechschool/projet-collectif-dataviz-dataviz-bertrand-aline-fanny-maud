fetch ("https://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=https://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=676d5b220e27f2ab3683c0f4b95bbd5b&format=json&format=json")
    .then((response) => {
        return response.json();
        console.log(response);
    })
    .then((json) => {
        console.log(json);
    });

const styleMusic

