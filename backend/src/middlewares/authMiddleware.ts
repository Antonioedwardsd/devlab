import { auth } from 'express-oauth2-jwt-bearer';
import { Request, Response, NextFunction } from 'express';

const jwtCheck = auth({
  audience: 'https://taskapi.com/api/tasks',
  issuerBaseURL: 'https://dev-3iiyrnf7x5ya3qwp.us.auth0.com/',
  tokenSigningAlg: 'RS256',
});

export default (req: Request, res: Response, next: NextFunction): void => {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }
  jwtCheck(req, res, (err) => {
    if (err) {
      console.error('Token validation error:', err.message);
      return res.status(401).json({ error: 'Unauthorized', message: err.message });
    }
    next();
  });
};
