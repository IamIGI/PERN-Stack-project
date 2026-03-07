import express from 'express';
import CONSTS from './CONSTS';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(CONSTS.SERVER_PORT, () => {
  console.log(
    `Server running on port: ${CONSTS.SERVER_PORT}`,
  );
});
