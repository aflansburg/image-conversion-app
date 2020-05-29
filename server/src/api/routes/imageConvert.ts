import express, { Request, Response, Router } from 'express';
import CloudmersiveService from '../../middleware/cloudmersiveClient';

const router: Router = express.Router();

router.use(
  '/image_conversion/convert/to/png',
  express.raw(),
  (req: Request, res: Response, next: express.NextFunction) => {
    try {
      const imageData: string = req.body;
      const service = new CloudmersiveService();
      service.convertImage(imageData, (err, data, response) => {
        if (err) {
          console.error('Error from Cloudmersive\n' + response.body);
          res.status(500).send(response.body);
        } else {
          console.log('Converted image received from Cloudmersive.');
          res.status(200).send(data);
        }
      });
    } catch (e) {
      res.status(404).send(e.message);
    }
  }
);

module.exports = router;
