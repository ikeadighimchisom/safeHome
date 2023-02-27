const express = require("express");

const { allUsers, allAdmin,delAdmin, allUser, SuperSignUp} = require("../controller/admin");
const { IsSuperAdmin } = require("../helper/auth");

const superRoutes = express.Router();

superRoutes.route("/super").post(SuperSignUp);
superRoutes.route("/allUsers/:superId").get( IsSuperAdmin,allUsers)
//superRoutes.route("/alladmin/:superId").get(IsSuperAdmin, allAdmin);
//superRoutes.route("/alluser/:superId").get(IsSuperAdmin, allUser);
//superRoutes.route("/deluser/:userId/:superId").delete(IsSuperAdmin, delAdmin);

module.exports = superRoutes