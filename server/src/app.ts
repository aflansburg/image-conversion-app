import express, { Request, Response, NextFunction } from 'express';
// import * as domainCheckRoute from './api/routes/domainCheck';
const imageConvertRoutes = require('./api/routes/imageConvert');

const app: express.Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(imageConvertRoutes);
// app.use(domainCheckRoute);

app.listen(5000, function () {
  console.log('App is listening on port 5000');
});
