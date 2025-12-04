import express from "express";
import cors from "cors";
import { operationsRoutes } from "./Controllers/operationsControllers";
import { accountsRoutes } from "./Controllers/accountsContollers";


const server = express();

server.use(cors({ origin: ["http://localhost:5173"] }));
server.use(express.json());
server.use(operationsRoutes);
server.use(accountsRoutes);


server.listen(3030, () => {
    console.log(`Express server started on http://localhost:3030`);
    console.log("Connecting to DB");
});