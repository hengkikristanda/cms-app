// app.js
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");

const { config } = require("dotenv");
const cors = require("cors");
const clientRoutes = require("./routes/clientRoutes");
const contentRoutes = require("./routes/contentRoutes");
const webSettingsRoutes = require("./routes/webSettingsRoutes");

config();

const app = express();

// Middleware
const allowedIps = ["153.92.10.227", "139.0.206.118", "139.162.57.105", "127.0.0.1", "::1"];

app.use((req, res, next) => {
	const clientIp = req.ip; // or req.headers['x-forwarded-for'] if you're behind a reverse proxy
	if (allowedIps.includes(clientIp)) {
		next();
	} else {
		// res.status(403).send("Your IP address is not allowed to access this server.");
		res.sendFile(path.join(__dirname, "/404-Not-Found.html"));
	}
});

const allowedDomains = [
	"http://127.0.0.1:3200",
	"http://localhost:3200",
	"https://uat-ilimits-v2.soliditi.tech/",
	"https://www.ilimitsinv.com/",
	"https://www.ilimits.id/",
]; // Add your allowed domains here

const corsOptions = {
	origin: function (origin, callback) {
		if (allowedDomains.indexOf(origin) !== -1 || !origin) {
			// If the origin is in the allowed domains list or if it's not provided (non-CORS request), allow access
			callback(null, true);
		} else {
			// If the origin is not in the allowed domains list, deny access
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};
app.use(cors(corsOptions));
app.set("trust proxy", true);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// Routes
app.use("/client", clientRoutes);

app.use("/content", contentRoutes);

app.use("/web-settings", webSettingsRoutes);
	
app.use((req, res) => {
	res.status(404).json({ message: "Not Found" });
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
