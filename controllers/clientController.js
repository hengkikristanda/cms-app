const subscriberService = require("../services/subscriberService");
const ResponseBody = require("../models/ResponseBody");
const maxmind = require("maxmind");

const {
	validateInputEmail,
	validateInputPassword,
	generateRandomPassword,
} = require("../utils/commonUtils");

const addSubscriber = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const { emailAddress, ipAddress } = req.body;

		responseBody.statusCode = 400;

		if (!emailAddress) {
			responseBody.message = "emailAddress is Required";
			return res.status(400).json(responseBody);
		}

		if (emailAddress.length > 128) {
			responseBody.message = "Max emailAddress length is 128";
			return res.status(400).json(responseBody);
		}

		const isValidEmailFormat = validateInputEmail(emailAddress);

		if (!isValidEmailFormat) {
			responseBody.message = "Invalid Email Format";
			return res.status(400).json(responseBody);
		}

		let source;
		if (ipAddress) {
			const location = await getLocation(location);
			if (location) {
				source = `${location.country}/${location.city}`;
			}
		}

		const result = await subscriberService.subscribe(emailAddress, source);

		responseBody.statusCode = 200;
		responseBody.message = "Success";
		responseBody.isSuccess = true;
		responseBody.objectData = {
			result: emailAddress,
		};
		res.status(200).json(responseBody);
	} catch (error) {
		console.log(error);
		responseBody.responseMessage = "Something went wrong";
		responseBody.statusCode = 500;
		res.status(500).json(responseBody);
	}
};

const getSubscriber = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const startIndex = req.params.startIndex || 0;

		const result = await subscriberService.findAll(parseInt(startIndex));

		responseBody.statusCode = 200;
		responseBody.message = "Success";
		responseBody.isSuccess = true;
		responseBody.objectData = result;
		res.status(200).json(responseBody);
	} catch (error) {
		console.log(error);
	}
};

const getLocation = async (ipAddress) => {
	try {
		const cityLookup = await maxmind.open("GeoLite2-City_20240116/GeoLite2-City.mmdb");
		const location = cityLookup.get(ipAddress);
		return {
			city: location.city.names.en,
			country: location.country.names.en,
		};
	} catch (error) {
		console.log(error);
	}
	return null;
};

module.exports = { addSubscriber, getSubscriber };
