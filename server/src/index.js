import express from "express";
import cors from "cors";
import rootRouter from "./routes/rootRouter.js";

const app = express();
const port = 8080;  

//middleware
app.use(express.json())
app.use(cors())
app.use(rootRouter)

app.listen(port, () => {
    console.log(`Server Listening on ${port}`);
})
