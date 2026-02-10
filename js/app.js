const SPOONACULAR_API_KEY = "183bd38af7cb411c95d9ba568b454620";

const userSection = document.getElementById("user");
const recipeSection = document.getElementById("recipe");
const triviaSection = document.getElementById("trivia");
const refreshButton = document.getElementById("refresh");

async function getRandomUser() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const users = await response.json();
  const randomIndex = Math.floor(Math.random() * users.length);
  const user = users[randomIndex];

  return {
    name: user.name,
    country: user.address.city,
    image: `https://i.pravatar.cc/150?u=${user.id}`
  };
}


async function getRandomRecipe(){
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${SPOONACULAR_API_KEY}`);
    
    if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }
    const data = await response.json();
    const recipe = data.recipes[0];

    return {
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings
    };
}

function renderUser(user){
    userSection.innerHTML = `
    <div class="user-card">
    <img src="${user.image}" alt="${user.name}"/>
    <h2>${user.name}</h2>
    <p>${user.country}</p>
    </div>
    `;
}

function renderRecipe(recipe){
    recipeSection.innerHTML = `
    <div class= "recipe-card">
    <img src= "${recipe.image}" alt="${recipe.title}"/>
    <h2>${recipe.title}</h2>
    <p>Ready in ${recipe.readyInMinutes} minutes</p>
    <p>Servings: ${recipe.servings}</p>
    </div>
    `;
}

async function loadPlated(){
    refreshButton.disabled = true;
   userSection.innerHTML = "<p> Plating for someone...</p>";
    recipeSection.innerHTML = "<p> Finding a recipe...</p>";

    try{
        const user = await getRandomUser();
        const recipe = await getRandomRecipe();

        renderUser(user);
        renderRecipe(recipe);

    }catch(error){
        console.error(error);
        userSection.innerHTML = "<p>Something went wrong.</p>";
        recipeSection.innerHTML = "<p> Please try again.</p>";
    }finally{
        refreshButton.disabled = false;
    }

    }

refreshButton.addEventListener("click", loadPlated);

loadPlated();