// Server backend
import express from "express"
import { getDB, initDB } from "./db.js";
import bodyParser from "body-parser";
import path from "path"

// Initialer l'application
const app = express()
app.use(bodyParser.json());
app.use(express.static('public'))

await initDB();

app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "/views/index.html"))
})

app.post("/new-user", async (req, res) => {
    const body = req.body;
    console.log('body ======>', body);

    const name = body.name;

    if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "Invalid name" });
    }

    const db = getDB();

    await db.run("INSERT INTO users (name) VALUES (?)", [name]);

    const user = await db.get("SELECT * FROM users WHERE id = (SELECT last_insert_rowid())");

    res.status(201).json(user);
})

app.get("/users", async (req, res) => {
    const db = await getDB();
    const users = await db.all(
        "SELECT * FROM users"
    );

    return res.json(users)
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`My app is running on URL http://localhost:${PORT}`);
})
