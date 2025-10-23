const express = require( "express" );
const jwt = require( "jsonwebtoken" );
const bodyParser = require( "body-parser" );
const path = require( "path" );

const app = express();
app.use(bodyParser.json());

// serve the frontend files
app.use( express.static( path.join( __dirname, "public")));

const SECRET_KEY = "SuperSecretKey123"; // use strong secret in production

// --- Login route ---
app.post( "/api/login", ( req, res ) => {
  const { username, password } = req.body;

  // Simple example validation
  if ( username === "ruwan" && password === "1234" ) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// --- Token verification route ---
app.get("/api/verify", ( req, res ) => {
  const authHeader = req.headers.authorization;
  if ( !authHeader ) return res.status( 403 ).json({ message: "Missing token" });

  const token = authHeader.split(" ")[ 1 ];
  try {
    jwt.verify( token, SECRET_KEY );
    res.json({ valid: true });
  } catch {
    res.status(401).json({ valid: false });
  }
});

// fallback: send index.html for any unknown route (optional)
app.get("*", ( req, res ) => {
  res.sendFile( path.join(__dirname, "public", "index.html" ));
});

app.listen(3000, () => console.log( "✅ Server running on http://localhost:3000" ));


/*


const express = require("express");
const jwt = require("jsonwebtoken");
const budyParser = require("body-parser");
const path = require("path");

const app =express();
app.use(bodyPaser.json());

app.use(express.static(path.join(__dirname, "public")));

const SECRET__KEY = "chamindaRuwan@1975";

app.post("/api/login", (req, res) => {
  const {username, password} = req.body;

  if (username === "admin" && password === "1234") {
    const token = jwt.sign({username}, SECRET__KEY, {expiresIn: "1h"});
      res.json({token});
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/api/verify", ( req, res ) => {

  const authHeader = req.headers.authorization;
  if ( !authorization ) return res.status(403).json( { message: "Missing token" } );



const token = authHeader.split(" ") [1];
try {
  jwt.verify(token. SECRET__KEY );
} catch {
  res.status(401).json({ valid: false});
}
});

app.get("*", (req, res ) => {

  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => console.log("server running on http://local:3000"));
*/
