import winston, { format } from "winston";
const { combine, colorize, timestamp, prettyPrint, printf } = format;
import path from "path";

const createWinstonLogger = () => {
    const logger = winston.createLogger({
        level: "info",
        // format: combine(timestamp(), prettyPrint(), colorize()),
        transports: [
            new winston.transports.Console({
                format: combine(
                    prettyPrint(),
                    colorize(),
                    printf((log) => log.message),
                ),
            }),
            new winston.transports.File({
                filename: "logfile.log",
                dirname: path.join(__dirname, "./logs"),
                format: combine(timestamp(), prettyPrint(), colorize()),
            }),
            new winston.transports.File({
                filename: "error.log",
                dirname: path.join(__dirname, "./logs"),
                level: "error",
                format: combine(timestamp(), prettyPrint(), colorize()),
            }),
            new winston.transports.File({
                filename: "info.log",
                dirname: path.join(__dirname, "./logs"),
                level: "info",
                format: combine(timestamp(), prettyPrint(), colorize()),
            }),
        ],
    });

    winston.addColors({
        error: "red",
        warn: "yellow",
        info: "cyan",
        debug: "green",
    });

    return logger;
};

export default createWinstonLogger();
