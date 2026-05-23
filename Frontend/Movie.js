const API_LINK = "http://localhost:8000/api/v1/reviews/"

const url =new URL(location.href)
const MovieId = url.searchParams.get("id");
const MovieTitle = url.searchParams.get("title");

const main = document.getElementById('section');
const movieTitle = document.getElementById('Movietitle');

movieTitle.innerText=MovieTitle;

FetchReview(API_LINK);
function FetchReview(url)
{
fetch(url+ "movie/" + MovieId)
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
         console.log(data_FromJSON);
         data_FromJSON.forEach
         (
function(review)
{
    const Row_div = document.createElement('div');
    Row_div.innerHTML = 
       <div class="row">
          <div class="column">
            <div class="card" id="${review ._ id}">
              <p><strong>Review: </strong>${review.ReviewContent}</p>
              <p><strong>User: </strong>${review.User}</p>
              <p><a href="#" onclick="editReview('${review ._ id}', '${review.ReviewContent}',
'${review. user}')">🖊️</a> <a href="#" onclick="deleteReview( '${review ._ id}')">🚮</a></p>
</div>
</div>
</div>
  
    main.appendChild(Row_div);

    
}
);

}
)

}

function editReview(id, review, user)
 {

const element = document.getElementById(id);
const reviewInputId = "review" + id
const userInputId = "user" + id

element. innerHTML =`
    <p><strong>Review: </strong>
    <input type="text" id="${reviewInputId}" value="$review}">
    </p>
    <p><strong>User: </strong>
    <input type="text" id="${userInputId}" value="${user}">
    </p>
    <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}', )">💾</a>
    </p>`
}
