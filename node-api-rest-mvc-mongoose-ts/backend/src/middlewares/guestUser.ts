import { v4 as uuidv4 } from 'uuid'
import { Request, Response, NextFunction } from 'express'

export default function ensureGuestId(req: Request , res: Response, next: NextFunction) {
    if (!(req as any).user && !req.cookies.guestId) {
        res.cookie('guestId', uuidv4(), { httpOnly: true, sameSite: 'lax' })
    }
    next()
}