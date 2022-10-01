import { type Request, type Response, Router } from "express";
import Database from "./Database";
export default class Route
{
    public structure: Object;
    public path: string;
    public router = Router()
    constructor(path: string)
    {
        this.path = path
        this.router = Router()
        this.structure = {}
        this.getInfos()
        this.router.route(`/${path}`).get(this.get).post(this.post).delete(this.delete).patch(this.patch)
    }

    // GET method
    // Return Database.all or Database.find results 
    get = (req: Request, res: Response) => {
        if(req.body.filter) Database.table(this.path).find(Object.keys(this.structure), req.body.filter).then(results => this.success(results, res))
        else Database.table(this.path).all().then(results => this.success(results, res))
    }

    // POST method
    // Return Database.insert results
    post = (req: Request, res: Response) => {
        if(req.body.data) Database.table(this.path).insert(req.body.data).then(results => this.success(results, res)).catch(err => res.status(400).json({code: "Bad request", message: "Missing data", err}))
        else res.status(400).json({code: "Bad request", message: "Missing data"})
    }

    // DELETE method
    // Return Database.delete results
    delete = (req: Request, res: Response) => {
        if(!req.body.data) return res.status(400).json({code: "Bad request", message: "Missing data"})
        Database.table(this.path).delete(req.body.data).then(results => this.success(results, res)) 
    }

    // PATCH method
    // Return Database.update results
    patch = (req: Request, res: Response) => {
        if(!req.body.data.old || !req.body.data.new) return res.status(400).json({code: "Bad request", message: "Missing data"})
        Database.table(this.path).update(req.body.data).then(results => this.success(results, res)) 
    }

    // Return a success response, with results as data
    success = (results: any, res: Response) => {
        return res.status(200).json({ results })
    }

    // This method is only here because class constructor doesn't allow an async usage
    private async getInfos()
    {
        this.structure = await Database.getTableInfos(this.path)
    }
}