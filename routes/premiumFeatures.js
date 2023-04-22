const express = require('express');

const premiumFeatureController = require('../Controller/premiumFeature');

const userauthenticate = require('../middleware/auth');

const router = express.Router();

router.get('/showLeaderBoard', userauthenticate.authenticate, premiumFeatureController.getUserLeaderBoard);

module.exports = router;