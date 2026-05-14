const API_LINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=10e485328cc27932734575eeb67c1803&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=10e485328cc27932734575eeb67c1803&query=";

const main = document.getElementById("section");
const form = document.getElementById("SearchForm");
const search = document.getElementById("query");

FetchMovie(API_LINK);
function FetchMovie(url)
{
    fetch(url)
    .then
    (
        function(results)
        {
          return results.json();
        }
    )
    .then
    (
        function(data_FromJSON)
        {
         console.log(data_FromJSON.results);
         data_FromJSON.results.forEach
         (
            function(EachResult)
            {
             const Row_div = document.createElement('div');
             Row_div.setAttribute('class','row');

             const Column_div = document.createElement('div');
             Column_div.setAttribute('id','column');

             const tumbnail_div = document.createElement('div');
             tumbnail_div.setAttribute('id','tumbnail');

             const Movie_title = document.createElement('h4');
             Movie_title.setAttribute('id','MovieTitle');

             const image = document.createElement('img');
             image.setAttribute('id','MovieThumbnail');
             

             const center = document.createElement('center');

             image.src = IMG_PATH + EachResult.poster_path;
             Movie_title.innerHTML = `${EachResult.title}`;

             center.appendChild(image);
             tumbnail_div.appendChild(center);
             tumbnail_div.appendChild(Movie_title);
             Column_div.appendChild(tumbnail_div);
             Row_div.appendChild(Column_div);

             main.appendChild(Row_div);

             
            }
          );

        }
    )

}

form.addEventListener
(
    "submit", 
    function(e)
    {
        e.preventDefault();
        main.innerHTML='';

        if(search.value)
        {
          FetchMovie(SEARCH_API+search.value)
          search.value='';
        }

    }
);