const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes</h2>";
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
<img src="${meal.strMealThumb}">
<h3>${meal.strMeal}</h3>
<p>${meal.strArea}</p>
<p>${meal.strCategory}</p>

`

const favicon = document.createElement("div");
favicon.innerHTML = `<i class="fas fa-heart heart-icon"></i>`;

favicon.addEventListener('click', () => {
    if (favicon.style.color === "red") {
        favicon.style.color = "black"; 
        alert("Favorite item has been removed from your wishlist.");
    } else {
        favicon.style.color = "red"; 
        alert("Favorite item has been added to your wishlist!");
    }
});
recipeDiv.append(favicon);





         const button = document.createElement('button');
            button.textContent ="View Recipe";
            recipeDiv.appendChild(button);
            
            button.addEventListener('click', () => {
                openRecipepopup(meal)
            });
            recipeContainer.appendChild(recipeDiv)
});
        
    }
    const fetchIngredients=(meal)=>{
        //console.log(meal)  
        let ingredientsList ="";
        for(let i=1;i<=20;i++){
         const ingredients =meal[`strIngredient${i}`];
         if(ingredients){
          const measure=meal[`strMeasure${i}`];
          ingredientsList+=`<li>${measure}${ingredients}</li>`
         }
         else{
          break;
         }
        }
        return ingredientsList;
      }
      const openRecipepopup=(meal)=>{
          recipeDetailsContent.innerHTML=`
          <h2 class="recipeName">${meal.strMeal}</h2>
          <h3>Ingredents:</h3>
          <ul class="ingredientList">${fetchIngredients(meal)}</ul>
          <div class="recipeInstructions>
          <h3>Instructions:</h3>
          <p class="recipeInstructions">${meal.strInstructions}</p>
          </div>
          `
      
          recipeDetailsContent.parentElement.style.display="block";
      }
      recipeCloseBtn.addEventListener('click',()=>{

          recipeDetailsContent.parentElement.style.display="none";
      })
      searchBtn.addEventListener("click",(e)=>{
          e.preventDefault();

          const searchInput=searchBox.value.trim();
          if(!searchInput){
            recipeContainer.innerHTML=`<h2>Type the meal in the search box.</h2>`
          }
          fetchRecipes(searchInput);
      //console.log("button clicked")
      });
      
           
      

    
      






    
            

            
    