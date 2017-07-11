var express = require('express');
var router = express.Router();
//获取model
var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];

  //前提是需要连接数据库,在appjs中链接了
  Product.find(function(error, result){
    if(error) {
        console.log(error);
    } else {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < result.length; i += chunkSize) {
            productChunks.push(result.slice(i, i + chunkSize));
        }
        //传值取值是依据products
        res.render('shop/index', { title: 'Express' , products: productChunks, successMsg: successMsg, noMessage: !successMsg});
      //  console.log(result);
    }
  });

});

//加入购物车
router.get('/add-to-cart/:id', function(req, res, next){
  // 取得id
    var productID = req.params.id;
    //将点击添加的物品,传入cart进行判断, 使用三目运算, 最后的为空,
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

    Product.findById(productID, function(err, product){
        if (err) {
          return res.redirect('/');
        }
        cart.add(product, productID);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    })
})

router.get("/reduce/:id", function(req, res, next){
    // 取得id
    var productID = req.params.id;
    console.log(req.session.cart);
    //将点击添加的物品,传入cart进行判断, 使用三目运算, 最后的为空,
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

    cart.reduceByOne(productID);
    req.session.cart = cart;
    res.redirect('/shoping-cart');
});

router.get("/removeItem/:id", function(req, res, next){
    // 取得id
    var productID = req.params.id;
    console.log(req.session.cart);
    //将点击添加的物品,传入cart进行判断, 使用三目运算, 最后的为空,
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

    cart.removeItem(productID);
    req.session.cart = cart;
    res.redirect('/shoping-cart');
});



router.get('/shoping-cart',function(req, res, next) {
  if (!req.session.cart) {
      return res.render('shop/shoping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  console.log(cart.generateArray());
  res.render('shop/shoping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});

});



router.get('/checkout', isLoggedIn, function(req, res, next){
    if (!req.session.cart) {
        return res.redirect('/shoping-cart');
    }

    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', isLoggedIn, function(req, res, next){
    if (!req.session.cart) {
      return res.redirect('/shoping-cart');
    }
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")(
        "sk_test_he5nRuXZhAhv9j9JMDcE9bdf"
    );

    stripe.charges.create({
      amount: cart.totalPrice * 100,
      currency: "usd",
      source: req.body.stripeToken, // obtained with Stripe.js
      description: "test charge"
      }, function(err, charge) {
         if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
         }

         var order = new Order({
              user: req.user,
              address: req.body.address,
              name: req.body.name,
              cart: cart,
              paymentId: charge.id
         });

         order.save(function(err, result){
           if (err) {

           }
           req.flash('success', '结算成功');
           req.session.cart = null;
           res.redirect('/');
         });


    });

})


// router.post('checkout', function(req, res, next){
//     if (!req.session.cart) {
//       return res.redirect('/shoping-cart');
//     }
//     var cart = new Cart(req.session.cart);
//
//     var stripe = require("stripe")(
//         "sk_test_he5nRuXZhAhv9j9JMDcE9bdf"
//     );
//
//     stripe.charges.create({
//       amount: 100,//cart.totalPrice,
//       currency: "usd",
//       source: 'tok_19pZw2IWeGNAaxGqepdS9Kbs',//req.body.stripeToken, // obtained with Stripe.js
//       description: "test charge"
//       }, function(err, charge) {
//          if (err) {
//             req.flash('error', err.message);
//             return res.redirect('/checkout');
//          }
//          req.flash('success', 'success buy product');
//          req.cart = null;
//          res.redirect('/');
//     });
//
// })

module.exports = router;

//判断是否登陆
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  //存储最后离开时的URL
  console.log(req.url);
  req.session.oldURL = req.url;
  res.redirect('/user/signin');
}
