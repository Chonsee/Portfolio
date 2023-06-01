import 'dotenv/config';
import express from 'express';
import { ClerkExpressWithAuth, ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Define routes
const routes = new Map();
routes.set('index', { uri: '/', isPublic: true, title: 'Home' });
routes.set('about', { uri: '/about', isPublic: true, title: 'About' });
routes.set('experience', { uri: '/experience', isPublic: true, title: 'Experience' });
routes.set('contact', { uri: '/contact', isPublic: false, title: 'Contact' });

routes.forEach((value, key) => {
  let clerkMiddleware = value.isPublic ? ClerkExpressWithAuth({}) : ClerkExpressRequireAuth({});
  
  app.get(
    value.uri, 
    clerkMiddleware,
    async (req, res) => {
    let params = {
      clerk_pk: process.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
      title: value.title,
      routes: routes,
      isAuthenticated: req.auth?.userId?.length,
    }
    res.render(key, params);
  });
});

// Start the server
app.listen(3000 || process.env.PORT, () => {});