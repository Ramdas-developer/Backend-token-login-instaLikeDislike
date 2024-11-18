const {Router} = require("express");
const {createAddToCart, cartUpload, getCartById, getAllProduct} = require("../controllers/addToCart/cartController");
const cartPostControl = require("../controllers/addToCart/cartPostControll");



const cartRoute = Router();

cartRoute.post('/add', createAddToCart)
cartRoute.get('/getproduct/:productId',getCartById)
cartRoute.get('/getproduct',getAllProduct)
// cartRoute.put()

cartRoute.post('/uploadproduct/',cartUpload.single("product"),cartPostControl)




module.exports =  cartRoute;

