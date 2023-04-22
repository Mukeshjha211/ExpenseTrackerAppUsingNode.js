const express = require('express');

const purchaseController = require('../Controller/purchaseController')

const userauthenticate = require('../middleware/auth')

const router = express.Router();

router.get('/premiummembership', userauthenticate.authenticate, purchaseController.purchasepremium);

router.post('/updatetransactionstatus', userauthenticate.authenticate, purchaseController.updateTransactionStatus)


module.exports = router;