const express = require("express");
const router = express.Router();

const clientController = require("../controllers/clientController");

router.post("/subscriber", clientController.addSubscriber);
router.get("/subscriber/:startIndex?", clientController.getSubscriber);

module.exports = router;
