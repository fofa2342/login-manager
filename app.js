// imports
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import cors from 'cors';
import indexRouter from './routes/index.js';
import userRouter from './routes/users.js';
import apiRouter from './routes/api.js';
import bd from './configs/db.js';
import passportConfig from './configs/passport.js';

// Passport Config
passportConfig(passport);

// defining stuffs ... 
const app = express()

// CORS
app.use(cors({
  origin: 'https://marche-pagne.vercel.app',
  credentials: true
}));

// EJS and layout
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.set('trust proxy', 1);
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // Only send over HTTPS
      httpOnly: true, // Prevent client-side JS access
      sameSite: 'none' // Allow cross-domain cookies
    }
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//routes 
app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/api', apiRouter);

const PORT = process.env.PORT; // Default to 1890 if not set

app.listen(PORT, () => console.log('server running'));