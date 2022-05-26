const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.user;

const bcrypt = require("bcryptjs");
require("dotenv");
//auth
// Formulaire de connexion
/*exports.login = (req, res) => {
  
  // Pas d'information à traiter
  if (req.body.username == "") {
    res.status(401).send("invalid credentials");
    return;
  }
  // TODO: check que le mot de passe du user est correct
  if (req.body.password == "") {
    res.status(401).send("invalid credentials");
    return;
  }

  // Checking
  const user = users.find(
    (u) => u.username === req.body.username && u.password === req.body.password
  );
  // Pas bon
  if (!user) {
  res.status(401).send("Error. Wrong login or password");
    return;
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    SECRET,
    { expiresIn: "3 hours" }
  );

  return res.json({ access_token: token, success: true });
}
// Récupération du header bearer
const extractBearerToken = (headerValue) => {
  if (typeof headerValue !== "string") {
    return false;
  }

  const matches = headerValue.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

// Vérification du token
exports.checkTokenMiddleware = (req, res, next) => {
  // Récupération du token
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);

  // Présence d'un token
  if (!token) {
    return res.status(401).json({ message: "Error. Need a token" });
  }

  // Véracité du token
  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "Error. Bad token" });
    } else {
      return next();
    }
  });
};*/
exports.signin = (req, res) => {
  let user = User.findOne({ username: req.body.username }).exec(
    async (error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
        const isPassword = bcrypt.compareSync(req.body.password, user.password);
        if (isPassword) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          const { _id, username } = user;
          res.cookie(String(user._id), token, {
            expiresIn: "1d",
            httpOnly: true,
            sameSite: "lax",
            //path: "/",
          });
          res.status(200).json({
            token,
            user: { _id, username },
          });
        } else {
          return res.status(400).json({
            message: "Invalid Password",
          });
        }
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    }
  );
};

exports.requireSignin = (req, res, next) => {
  const cookies = req.headers.cookie;
  console.log(cookies);
  const token = cookies.split("=")[2];
  console.log(token);
  if (!token) {
    return res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    console.log(user._id);
    req._id = user._id;
  });

  next();
  //jwt.decode()
};
exports.getAdmin = async (req, res, next) => {
  const _id = req.id;
  let user;
  try {
    user = await User.findOne({ _id }, "-password");
    if (!user) {
      return res.status(404).json({});
    } else {
      return res.status(200).json({ user });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }

  next();
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
