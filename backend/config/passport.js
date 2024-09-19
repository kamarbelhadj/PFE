import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import Patient from '../models/patient.js';
import Medecin from '../models/Medecin.js';
import dotenv from 'dotenv';
dotenv.config();

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
opts.secretOrKey = process.env.PRIVATE_KEY;

const passportConfig = (passport) => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        const user = await Patient.findOne({ _id: jwt_payload.id });
        if (user) {
          return done(null, user);
        }
        const medecin = await Medecin.findOne({ _id: jwt_payload.id });
        if (medecin) {
          return done(null, medecin);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

if (!process.env.PRIVATE_KEY) {
  console.error('PRIVATE_KEY not defined in .env file');
}

export default passportConfig;
