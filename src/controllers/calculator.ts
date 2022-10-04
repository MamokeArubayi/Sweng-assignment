import {NextFunction, Request, Response} from 'express';

export let calculate = (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).send({ Application: 'Calculator application' })
    }
    catch (e) {
        return res.status(500).send({error: e.message});
    }
};