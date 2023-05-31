import 'dotenv/config';
import express from 'express';
import { ClerkExpressWithAuth, ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// Define routes
app.get('/', async (req, res) => {
  let params = {
      clerk_pk: process.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
      title: "Chauncey Vaughn Loving - Full Stack Developer"
    }
  res.render('login', params);
});

app.get('/login', async (req, res) => {
  let params = {
      clerk_pk: process.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
      title: "Login"
    }
  res.render('login', params);
});

// Use the strict middleware that raises an error when unauthenticated
app.get(
  '/contact-me',
  ClerkExpressRequireAuth({
    // ...options
  }),
  (req, res) => {
    let params = {
      clerk_pk: process.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
      title: "Contact Me"
    }
    res.render('contact-me', params);
  }
);

app.use(express.static('public'));

// Start the server
app.listen(3000 || process.env.PORT, () => {});