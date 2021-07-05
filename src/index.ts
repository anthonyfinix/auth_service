// imports
import express, { Application, Router } from 'express';
import router from './routes';
import configuration, { IConfig } from './config';
import handleAccessToken from './middleware/handleAccessToken';
import error_handler from './routes/error_handler';
export default async (options: IConfig): Promise<Application> => {
    configuration.setConfiguration(options);
    const app: Application = express();
    // app.all("*", (req, res) => { res.send('auth service') })
    app.use(handleAccessToken);
    app.use(error_handler)
    app.use(router);
    return app;
}

