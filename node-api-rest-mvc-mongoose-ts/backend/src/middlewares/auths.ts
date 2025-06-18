import { RequestWithUser } from '../types/index.js' // This code imports the RequestWithUser type from the types module, which extends the Express Request object to include user information.
import  jwt, { JwtPayload }  from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express' // Importing types for Request, Response, and NextFunction from Express

const authenticateMiddleware = (req: Request , res: Response, next: NextFunction) => {

    // This code retrieves the token from the cookies of the incoming request.
    // If the token is not present, it sets the user in the session to null.
    // if (!token) {
    //     (req as RequestWithUser | any).session.user = null
    //     return next()
    // }
    // If the token is present, it initializes the session user to null.
    // This code initializes the session user to null if the token is not present in the request cookies.
    // This is useful for ensuring that the session user is always defined, even if no user is authenticated.
    (req as RequestWithUser | any).session = {
        user: null
    } as any

    try {
        const token = req.cookies.token
        console.log('token', token);
        // This code verifies the JWT token using the secret key and assigns the decoded user data to the session.
        // If the token is valid, it sets the user in the session to the decoded data.
        // If the token is invalid, it catches the error and logs it to the console.
        // if(token === undefined) return
        let decoded = jwt.verify(token , process.env.JWT_SECRET || 'secret') as JwtPayload
        // console.log(decoded);
        (req as RequestWithUser | any).session.user = decoded 
        // res.setHeader('Access-Control-Allow-Credentials', 'true') // This code sets the Access-Control-Allow-Credentials header to true, allowing cookies to be sent with cross-origin requests.
        
    } catch  {}
    next()
}

export default authenticateMiddleware