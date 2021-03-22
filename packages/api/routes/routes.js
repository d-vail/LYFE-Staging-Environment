require('dotenv').config();

const path = require('path');
const { userRouter } = require('./users');
const { NODE_ENV } = process.env;

module.exports = {
  routes: (server) => {
    server.use('/api/users', userRouter);

    server.get('/api', (req, res) => {
      res.set('Content-Type', 'application/json');
      res.send('{"message": "LYFE API"}');
    });

    // In production redirect all other routes to the client home.
    if (NODE_ENV === 'production') {
      server.get('*', (req, res) => {
        res.sendFile(
          path.resolve(__dirname, '../../client/build', 'index.html')
        );
      });
    } else {
      server.get('*', (req, res) => {
        res.set('Content-Type', 'application/json');
        res.send(
          '{"message": "In production this action will result in a redirect to the client."}'
        );
      });
    }
  },
};
