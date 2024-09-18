const passport = require('passport');
const passportJwt = require('passport-jwt');
const JWTStrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET,
    },
    (jwtPayload, done) => {
      const user = jwtPayload;
      return done(null, user);
    }
  )
);

const isLoggedIn = (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      res.status(403).json({
        error: 'You are not allowed to access',
      });
      return;
    }

    if (user.isValid === true) {
      return next();
    }

    res.status(401).json({
      error: 'You are not allowed to access',
    });
  })(req, res, next);

module.exports = isLoggedIn;
