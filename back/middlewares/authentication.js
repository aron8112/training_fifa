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

const authenticateUser = passport.authenticate('jwt', { session: false });

const authorizeUser = (roles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: 'Access forbidden: insufficient rights' });
    }

    next();
  };
};

module.exports = { authenticateUser, authorizeUser };
