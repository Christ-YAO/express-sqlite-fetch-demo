async function displayUsers() {
    const response = await fetch('/users');
    const users = await response.json();
    const ulElement = document.getElementById("users");

    ulElement.innerHTML = "";

    for (const user of users) {
        const li = document.createElement('li');
        li.innerText = user.name;
        ulElement.appendChild(li);
    };
};

document.addEventListener("DOMContentLoaded", () => {
    displayUsers();
});