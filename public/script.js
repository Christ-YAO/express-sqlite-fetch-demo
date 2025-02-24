const BASE_URL = "http://localhost:3000"

async function displayUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const users = await response.json();
    const ulElement = document.getElementById("users");

    ulElement.innerHTML = "";

    for (const user of users) {
        const li = document.createElement('li');
        li.innerText = `${user.id} - ${user.name}`;
        ulElement.appendChild(li);
    };
};

async function addUserName(name) {
    const response = await fetch(`${BASE_URL}/new-user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    });

    if (response.ok) {
        const result = await response.json();
        console.log("User added:", result);
        displayUsers();
    } else {
        console.error("Failed to add user");
        throw new Error("Failed to add user");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayUsers();
});

const form = document.getElementById("user-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    await addUserName(name);
    form.reset();
});