// app.js
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const { config } = require("dotenv");
const cors = require("cors");
const clientRoutes = require("./routes/clientRoutes");
const contentRoutes = require("./routes/contentRoutes");
const webSettingsRoutes = require("./routes/webSettingsRoutes");


config();

const app = express();

// Middleware
/* app.use(
	cors({
		origin: "http://localhost:3100", 
		// credentials: true,
	})
); */
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
