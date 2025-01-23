import auth0 from '../../../utils/initAuth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default auth0.handleAuth({
  async login(req: NextApiRequest, res: NextApiResponse) {
    await auth0.handleLogin(req, res);
  },

  async logout(req: NextApiRequest, res: NextApiResponse) {
    await auth0.handleLogout(req, res);
  },

  async callback(req: NextApiRequest, res: NextApiResponse) {
    await auth0.handleCallback(req, res);
  },

  async profile(req: NextApiRequest, res: NextApiResponse) {
    const session = await auth0.getSession(req, res);

    if (!session) {
      console.error('No active session found.');
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    res.status(200).json({ user: session.user });
  },
});
