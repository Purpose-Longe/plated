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