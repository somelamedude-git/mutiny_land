const express = require('express');
const earlySignUpRoutes = require('./routes/earlyAccess.routes.js');
const email_verif_routes = require('./routes/email_verif.route.js');
const app = express();
const cors = require('cors');

app.use(cors({
	origin: "https://mutiny-land.vercel.app",
    credentials: true,
}));
app.use(express.json({
	limit: "10kb",
}));

app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"));

app.use('/register', earlySignUpRoutes);
app.use('/api', email_verif_routes);

module.exports = { app };
