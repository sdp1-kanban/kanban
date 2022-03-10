const express = require("express");
const morgan = require("morgan");
const compress = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const send = require("send");
const path = require("path");

module.exports = () => {
    const app = express();

    if (process.env.NODE_ENV === "development")
        app.use(morgan("dev"));
    else if (process.env.NODE_ENV === "production")
        app.use(compress());

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    if (process.env.NODE_ENV === "development") {
        // Allow all CORS requests during development
        app.use((req, res, next) => {
            // Can't just use * because that doesn't send cookies
            res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
    }

    require("../app/routes/index.routes")(app);
    require("../app/routes/job.routes")(app);

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.resolve(__dirname, "..", "client", "build")));
        app.use((req, res, next) => {
            // Redirect all other requests to index.html
            const stream = send(req, path.resolve(__dirname, "..", "client", "build", "index.html"));
            stream.on("error", err => next(err));
            stream.pipe(res);
        });
    }

    return app;
};
