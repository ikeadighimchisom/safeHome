require("dotenv").config();
const dotenv = require("dotenv")
const express = require("express")
dotenv.config({path: "./CONFIG/config.env"})
const routes = require("./ROUTE/adminrotue")
const user = require ('./ROUTE/UserRoute')
//const Auth = require('./ROUTE/Adduser')
const Authen = require("./ROUTE/addAdmin")
const importData = require("./Dataimport")
const orderRouter = require("./ROUTE/order");
const cateRouter = require("./ROUTE/catRoute")
const commentRouter = require("./ROUTE/commentRoute")
const router = require("./ROUTE/ratingRout")
const stockRouter = require("./ROUTE/InStockRoute")
const superRoutes = require("./ROUTE/SuperAdmin")
const cors = require("cors")
const fileUpload = require('express-fileupload');


const app = express ();

app.use( cors ());
app.use(express.json());
app.use(fileUpload({
    useTempFiles:true
}))


app.use("/api/import", importData)


//app.use('/api', Auth);
app.use("/api", Authen)
app.use('/api', routes);
app.use("/api", user)
app.use("/api",commentRouter)
app.use("/api", superRoutes)
app.use("/api",orderRouter)
app.use("/api",cateRouter)
app.use("/api",router)
app.use("/api",stockRouter)
// Router.route("/import", importData )

app.use("/", (req, res) => {
    res.status(200).send("My Api is working fine")
})

module.exports = app
