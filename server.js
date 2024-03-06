if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const express = require("express");
const ejsMate = require("ejs-mate");
const session = require('cookie-session');
const methodOverride = require("method-override");
const compression = require("compression");
const rateLimit = require('express-rate-limit');
const helmet = require("helmet");
const { verifyLogin } = require("./middleware.js");
const Logger = require("./utils/Logger.js");
const usuarios = require("./routes/usuarios")
// const entidad = require("./routes/entidad")
const path = require("path");
const app = express();
const secret = process.env.secret;
const { errorLogger, errorHandler } = require("./utils/ErrorHandler.js");

app.use(compression());
app.use(helmet());
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://polyfill.io",
    "https://fonts.gstatic.com",
    "https://code.jquery.com",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://unpkg.com",
    "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
    "https://ka-f.fontawesome.com",
];
const fontSrcUrls = [
    "https://fonts.gstatic.com",
    "https://ka-f.fontawesome.com",
    "https://cdn.jsdelivr.net",
];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'self'", "'unsafe-inline'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            scriptSrcAttr: ["'self'", "'unsafe-inline'", ...scriptSrcUrls],
            imgSrc: ["'self'", "blob:", "data:",
                "https://res.cloudinary.com/dyxgwsvk9/",
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

// Init EJS
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Static files
app.use(express.static(path.join(__dirname, "/assets/css")));
app.use(express.static(path.join(__dirname, "/assets/scss")));
app.use(express.static(path.join(__dirname, "/assets/js")));
app.use(express.static(path.join(__dirname, "/assets/imgs")));

// Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Session
const sessionConfig = {
    name: "session",
    secret,
    resave: true,
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    // secure: true,
}
app.use(session(sessionConfig));

// Permanent locals
app.use((req, res, next) => {
    res.locals = {
        loggedin: req.session.loggedin,
        usuario: req.session.username,
        idUsuario: req.session.idUsuario,
        admin: req.session.admin
    }
    next();
})

// Routes
app.use("/gestion/usuarios", usuarios);

// Rate limiters
const informesLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 4,
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/gestion/informes', informesLimiter);

// Error handling
app.use(errorLogger);
app.use(errorHandler);

// Start server
Logger.log("Starting server...");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    Logger.log(`App is running on port ${PORT}`);
});

// Redirects
app.get(["/", "/gestion"], (req, res) => {
    if (req.session.loggedin) {
        res.redirect("/gestion/main");
    } else {
        res.redirect("/gestion/usuarios/login");
    }
})

app.get("/gestion/main", verifyLogin, (req, res) => {
    res.render("index.ejs");
});

// Catch all
app.get("*", (req, res) => {
    if (req.session.loggedin) {
        res.redirect("/gestion/main");
    } else {
        res.redirect("/gestion/usuarios/login");
    }
})