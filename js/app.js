const SPOONACULAR_API_KEY = "783225f8d6e6482a93953b86b97b16b9";

async function getRandomUser() {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const user = data.results[0];

    const userInfo = {
        name: `${user.name.first} ${user.name.last}`,
        country: user.location.country,
        image: user.picture.large
    };
    console.log(userInfo);

}
getRandomUser();

async function getRandomRecipe(){
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${SPOONACULAR_API_KEY}`);
    const data = await response.json();
    const recipe = data.recipes[0];

    const recipeInfo = {
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings
    };
    console.log(recipeInfo);

}
getRandomRecipe();