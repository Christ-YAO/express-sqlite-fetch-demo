// Server backend
import express from "express"

// Initialer l'application
const app = express()

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`My app is running on URL http://localhost:${PORT}`);
})
