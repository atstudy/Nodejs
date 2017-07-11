var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      // //验证表单
      req.checkBody('email', 'Invalid email').notEmpty().isEmail();
      req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 4});
      var errors = req.validationErrors();
      if (errors) {
        var messages = [];
        errors.forEach(function(error){
          messages.push(error.msg);
        });
        return done(null, false, req.flash('signupMessage', messages));
      }


      User.findOne({ 'local.email':  email }, function(err, user) {
        if (err)
            return done(err);
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          var newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    User.findOne({ 'local.email':  email }, function(err, user) {
      if (err)
          return done(err);
      if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.'));
      if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      return done(null, user);
    });
  }));

};




// var passport = require('passport');
// var User = require('../models/user');
// var LocalStrategy = require('passport-local').Strategy;
//
//
// passport.serializeUser(function (user, done) {//保存user对象
//     done(null, user.id);//可以通过数据库方式操作
// });
//
// passport.deserializeUser(function (id, done) {//删除user对象
//     User.findById(id, function(err, user){
//     	done(err, user);
//     })
// });
//
// module.exports = function(passport) {
//
// passport.use('local.signup', new LocalStrategy({
// 	usernameField: 'email',
// 	passportField: 'password',
// 	passReqToCallback: true
// }), function(req, email, password, done){
// 	User.findOne({'email': email}, function(err, user) {
// 		if (err) {
// 			return	done(err);
// 		}
// 		if (user) {
// 			return	done(null, false, {message: 'email is already use'});
// 		}
// 		var newUser = new User();
// 		newUser.email = email;
// 		// newUser.password = password;
// 		newUser.password = newUser.encryptPassword(password);
// 		newUser.save(function(err, result){
// 			if (err) {
// 				return done(err);
// 			}
// 			return done(null, newUser);
// 		})
// 	})
// })
//
// }
//
//
//
// // passport.use('local.signup', new LocalStrategy({
// // 	usernameField: 'email',
// // 	passportField: 'password',
// // 	passReqToCallback: true
// // }), function(req, email, password, done){
// // 	User.findOne({'email': email}, function(err, user) {
// // 		if (err) {
// // 			return	done(err);
// // 		}
// // 		if (user) {
// // 			return	done(null, false, {message: 'email is already use'});
// // 		}
// // 		var newUser = new User();
// // 		newUser.email = email;
// // 		// newUser.password = password;
// // 		newUser.password = newUser.encryptPassword(password);
// // 		newUser.save(function(err, result){
// // 			if (err) {
// // 				return done(err);
// // 			}
// // 			return done(null, newUser);
// // 		})
// // 	})
// // })
