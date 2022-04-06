var empCtrl = require("../controllers/employee.controller");
const express = require('express');
const router = express.Router()

router.get("/employees", empCtrl.getEmployees)
router.post('/employee', empCtrl.addEmployee)
router.delete('/employee/:id', empCtrl.deleteEmployee)

module.exports = router