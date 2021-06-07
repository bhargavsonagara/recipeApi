myBtn = document.getElementsByClassName('myBtn');
//recipeBtn = document.getElementsByClassName('recipe-btn')

function addPreloader() {
    // if the preloader doesn't already exist, add one to the page
    if(!document.querySelector('#preloader')) {
      var preloaderHTML = '<img src="images/ajax-loader.gif" style="min-height: 50px; min-width: 50px; position: fixed; top: 50%; left: 50%" id="preloader">';
      document.querySelector('body').innerHTML += preloaderHTML;
    }
}

function removePreloader() {
    // select the preloader element
    var preloader = document.querySelector('#preloader');
    // if it exists, remove it from the page
    if(preloader) {
      preloader.remove();
    }
}


for(i=0; i<1; i++){
    myBtn[i].addEventListener('click', getData, {once:true});
}

/* for(i=0; i<recipeBtn.length; i++){
    console.log(recipeBtn[i])
    recipeBtn[i].addEventListener('click', getMealRecipe, {once:true});
} */


function getData(){
    let searchBtn = document.getElementById("searchBtn").value.trim();

   
    /*const  result = */fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchBtn}`).then(
        response=> {
                if(!response.ok){
                    addPreloader();
                    throw Error('ERROR');
                }
                removePreloader();
                return response.json();
            })
            .then(
            data => {
                
                teamContainer = document.getElementsByClassName('teamContainer')[0];
                if(data.meals){
                    data.meals.forEach(meal => {
                        div = document.createElement('div');
                        div.classList.add('col-sm-6' ,'col-md-4' ,'col-lg-3', 'mb-4');
                        insideDiv = `
                                        <div class="card mb-4" style="box-shadow: 3px 2px 10px rgba(0, 0, 0, 1);">
                                        <img src="${meal.strMealThumb}" class="img-fluid w-100 d-block">
                                        <div class="card-body bg-light">
                                            <h4 class="card-title">${meal.strMeal}</h4>  
                                            <button type="button" class="btn btn-outline-dark btn-sm recipe-btn mt-2" data-target="#${meal.idMeal}" data-toggle="modal" onclick="getMealRecipe(${meal.idMeal})">Get Recipe</button>
                                        </div>
                                    `;
                        
                        div.innerHTML = insideDiv;
                        teamContainer.appendChild(div);
                        //mealList.classList.remove('notFound');
                    })
                }else{
                    div = document.createElement('div');
                    insideDiv = `
                                    <h3 class="text-danger">Sorry, we didn't find any meals!</h3>
                                `;
                    div.innerHTML = insideDiv;
                    teamContainer.appendChild(div);
                }
                /*for(i=0; i<idMeal.length; i++){
                    idMeal[i] = document.getElementById("idMeal").value;
                    console.log(idMeal[i])
                    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal[i]}`);
                }*/
            })
            //.then(response => response.json())
            

            /* result.then(r => {
                console.log(r); // 2nd request result first_stage property
              })*/
              .catch(error=>{
                console.log(error);
            });
        }

        function getMealRecipe(e){
            
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`)
                .then(response => response.json())
                .then(
                    data => {
                        
                        teamContainer = document.getElementsByClassName('teamContainer')[0];
                        if(data.meals){
                            data.meals.forEach(meal => {
                                div = document.createElement('div');
                                insideDiv = `
                                <!-- Modal -->
                                <div class="modal fade" id="${data.meals[0].idMeal}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                  <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">${data.meals[0].strMeal}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                      </div>
                                      <div class="modal-body">
                                        <p>${data.meals[0].strCategory}</p>
                                        <h3>Instructions:</h3>
                                        <p>${meal.strInstructions}</p>
                                        <div class="text-center">
                                            <img src = "${meal.strMealThumb}" alt = "" class="img-fluid w-25 rounded-circle"><br>
                                            <a href = "${meal.strYoutube}" target = "_blank" class="mt-3 btn btn-outline-primary">Watch Video</a>
                                        </div>
                                      </div>
                                      <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>   
                                            `;
                                
                                div.innerHTML = insideDiv;
                                teamContainer.appendChild(div);
                                $(document).ready(function() {
                                    if (sessionStorage.getItem('#myModal') == 'true') {
                                        $(`#${data.meals[0].idMeal}`).modal('show');
                                        sessionStorage.setItem('#myModal','true');     
                                    }
                                });
                            })
                        }else{
                            div = document.createElement('div');
                            insideDiv = `
                                            <h3 class="text-danger">Sorry, we didn't find any meals!</h3>
                                        `;
                            div.innerHTML = insideDiv;
                            teamContainer.appendChild(div);
                        }
                        
                    })
        }
        