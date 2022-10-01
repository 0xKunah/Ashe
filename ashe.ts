import express, { type Application, type RequestHandler } from 'express'
import cors from 'cors'
import Route from './Route'
import { api_port } from './config'
import { cyan } from 'colors'
import Database from './Database';
import Middleware from './Middleware'

export default class Ashe
{
    private static app: Application;
    public static api()
    {
        Ashe.app = express()
        Ashe.useMiddleware(cors())
        Ashe.useMiddleware(Middleware.auth)
        Ashe.useMiddleware(express.json())
        Database.getTables().then(tables => {
            tables.forEach((table: string) => {
                Ashe.useMiddleware(new Route(table).router)
                console.log(cyan(`> ${table} route ready !`))
            });
            console.log(cyan(`\n> All routes ready !`))
        })
        Ashe.app.listen(api_port)
    }

    public static useMiddleware(middleware: RequestHandler)
    {
        Ashe.app.use(middleware)
    }
}

Ashe.api()