const express = require("express");
const router = express.Router();

const webSettingsController = require("../controllers/webSettingsController");

router.get("/site-menus", webSettingsController.fetchSiteMenu);
router.get("/site-menus/mapping/:sectionId", webSettingsController.fetchSiteMenuMapping);

router.get("/section", webSettingsController.fetchSection);
router.get("/section/:sectionId", webSettingsController.fetchSectionById);

module.exports = router;
