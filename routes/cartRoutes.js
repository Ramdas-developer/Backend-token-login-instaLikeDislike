const {Router} = require("express");
const {createAddToCart, cartUpload, getCartById, getAllProduct, updateCart} = require("../controllers/addToCart/cartController");
const cartPostControl = require("../controllers/addToCart/cartPostControll");



const cartRoute = Router();

cartRoute.post('/add', createAddToCart)
cartRoute.get('/getproduct/:productId',getCartById)
cartRoute.get('/getproduct',getAllProduct)
cartRoute.put('/updatecart',updateCart)

cartRoute.post('/uploadproduct/',cartUpload.single("product"),cartPostControl)




module.exports =  cartRoute;

