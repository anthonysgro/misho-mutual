// Server setup
import express, { Response, Request, NextFunction } from "express";
const compression = require("compression");
import dotenv from "dotenv";
import path from "path";
import http from "http";
import morgan from "morgan";
const PORT = process.env.PORT || 8888;
import logger from "./logger/winston";
import { serverHealthCheck } from "./health";

export interface ServerError extends Error {
    status?: number;
}

const initializeServer = async () => {
    const app = express();

    // Initialize our environment variable configuration
    dotenv.config();

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "../public")));
    app.use(compression({ level: 9 }));

    // Middleware Logging
    app.use(morgan("dev"));

    // Setup main api route
    app.get("/", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // Error handling middleware
    app.use(
        (err: ServerError, req: Request, res: Response, next: NextFunction) => {
            res.status(err.status || 500);
            res.send(err.message || "Internal server error");
        },
    );

    // Create http server with app
    const server = http.createServer(app);
    serverHealthCheck(server);

    // Set server to listen to port number
    server.listen(PORT, () =>
        logger.info(
            `Server started, listening on port ${PORT} at http://localhost:${PORT}`,
        ),
    );
};

initializeServer();
