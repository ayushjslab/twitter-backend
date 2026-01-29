import { initServer } from "./app/index.js";

async function init(){
    const app = await initServer();
    app.listen({port: 8000}, () => {
        console.log("Server running on port 8000");
    });
}

init();