import {app} from "../src/app.js"
import { main } from "./config/db.js"
import dotenv from "dotenv"

dotenv.config({
    path:'./.env'
})
const port=process.env.PORT
main()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${port}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})



