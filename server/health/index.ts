import { createTerminus } from "@godaddy/terminus";
import { Server } from "http";

async function onHealthCheck() {
    // checks if the system is healthy, like the db connection is live
    // resolves, if health, rejects if not
}

// import { db } from "../db";
async function onSignal() {
    try {
        console.log("Server is starting cleanup");
        // await db.sync({ force: true });

        console.log("Server is shutting down.");
    } catch (err) {}

    // start cleanup of resource, like databases or file descriptors
}

// Server health check/shutdown sequence
export const serverHealthCheck = (server: Server) =>
    createTerminus(server, {
        signals: ["SIGINT", "SIGTERM"],
        healthChecks: { "/healthcheck": onHealthCheck },
        onSignal,
        timeout: 1000,
    });
