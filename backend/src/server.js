const app = require('./app');
const env = require('./config/env');

app.listen(env.port, () => {
  console.log(`FarmBridge backend listening on port ${env.port}`);
});
