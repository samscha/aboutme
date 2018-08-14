const LocalStrategy = require('passport-local').Strategy;

const User = require('../../users/model');

module.exports = new LocalStrategy(
  { usernameField: 'email' },
  (username, password, done) => {
    User.findOne({ email: username }, function(err, user) {
      if (err) return done(err);

      if (!user)
        return done(null, false, {
          message: `No username with ${username} found`,
        });

      user.comparePassword(password, (err, isMatch) => {
        if (err) done(err);

        if (!isMatch)
          return done(null, false, { message: `Incorrect password` });

        return done(null, user);
      });
    });
  },
);
