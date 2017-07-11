var express = require('express');
var router = express.Router();

var passport = require('passport');
var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');

//防止跨站点攻击
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);

//验证是否登陆
router.get('/profile', isLoggedIn, function(req, res, next) {
  console.log(req.user);
    Order.find({user: req.user}, function(err, orders){
        if (err) {
          return res.write('Error');
        }

        console.log(orders);
        var cart;
        orders.forEach(function(order){
            cart = new Cart(order.cart);
            order.items = cart.generateArray();

        });

        res.render('user/profile', {orders: orders});
    });
});

//如果登陆直接搜路由 根 / ---首页
router.use('/', notisLoggedIn, function(req, res, next) {
    next();
});

//登出, 如果已经登陆再登出
router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout();
  res.redirect('/');
});

//防止跨站点攻击
router.get('/signup', function(req, res, next){
  //传递错误信息,采用flash暂存
  //var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken, messages: req.flash('signupMessage') });

  //res.render('user/signup', {csrfToken: req.csrfToken, messages: messages, hasErrors: messages});
});



//注册页面的post / GET
// router.post('/signup', passport.authenticate('local-signup', {
//   successRedirect: '/user/profile',
//   failureRedirect: '/user/signup',
//   failureFlash: true,
// }));

router.post('/signup', passport.authenticate('local-signup', {
  failureRedirect: '/user/signup',
  failureFlash: true,
}), function(res, req, next) {
  if (req.session.oldURL) {
    var oldurl = req.session.oldURL;
    req.session.oldURL = null;
    res.redirect(oldurl);
  }else {
    res.redirect('/user/profile');
  }
});


//登陆 get post
router.get('/signin', function(req, res, next){
  res.render('user/signin', {csrfToken: req.csrfToken, messages: req.flash('loginMessage') });
});

//之前的跳转页面
// router.post('/signin', passport.authenticate('local-signin', {
//   successRedirect: '/user/profile',
//   failureRedirect: '/user/signin',
//   failureFlash: true,
// }));

//根据之前的访问,跳转相应的页面
router.post('/signin', passport.authenticate('local-signin', {
  failureRedirect: '/user/signin',
  failureFlash: true,
}), function(req, res, next){
  if (req.session.oldURL) {
    var oldurl = req.session.oldURL;
    req.session.oldURL = null;
    res.redirect(oldurl);
  }else {
    res.redirect('/user/profile');
  }
});



module.exports = router;

//判断是否登陆
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}

//判断没有登录
function notisLoggedIn(req, res, next) {
  if (!req.isAuthenticated())
      return next();
      //如果登陆链接 /
  res.redirect('/');
}
