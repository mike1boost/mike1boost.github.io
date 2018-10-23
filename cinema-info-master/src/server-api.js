const uuidv1 = require('uuid/v1');     
    export async function  getMovies(){
        const namesAr = ['fight-club', 'Pulp-Fiction', ' Forrest-Gump', 'Inception', ' The-Godfather', 'City-of-God'];
        let movieInfo;
        let movies = [];
        for(let i=0; i<namesAr.length; i++){
            movieInfo = await get('http://www.omdbapi.com/?t='+namesAr[i]+'&apikey=f271ffa5');
            movieInfo.id = uuidv1();
            let iMovie = Object.assign({}, {id:movieInfo.id}, {Title:movieInfo.Title}, {Year:movieInfo.Year},{Runtime:movieInfo.Runtime}, {Genre:movieInfo.Genre}, {Director:movieInfo.Director});
            movies.push(iMovie);
        }
        return movies;
    }

    function get(url){
        return fetch(url)
            .then(res => res.json());
    }


