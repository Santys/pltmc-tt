var axios = require('axios');
var express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
var app = express();

dotenv.config();

const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const token_secret = process.env.REACT_APP_TOKEN_SECRET;

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/auth', (req, res) => {
  const code = req.query.code;
  axios
    .post(
      'https://github.com/login/oauth/access_token',
      {
        client_id,
        client_secret,
        code,
        redirect_uri,
      },
      axiosConfig,
    )
    .then((response) => {
      const access_token = response.data.access_token;
      axios
        .get('https://api.github.com/user', {
          headers: {
            Authorization: `token ${access_token}`,
          },
        })
        .then((responseUser) => {
          const username = responseUser.data.login;
          const payload = { access_token, username };
          const authToken = jwt.sign(payload, token_secret, { algorithm: 'HS256', expiresIn: 3600000 });
          return res.status(200).json({ authToken, username });
        })
        .catch((errorUser) => {
          console.error('Error ' + errorUser.message);
          return res.status(400).json('Auth failed:' + errorUser.message);
        });
    })
    .catch((error) => {
      console.error('Error ' + error.message);
      return res.status(400).json('Auth failed:' + error.message);
    });
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
