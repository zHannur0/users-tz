import User from '../../models/User';
import db from '../../utils/db';

export default async function handler(req, res) {
    await db.connect();
    try {
        const users = await User.find({});
        res.status(200).json({ users });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
      }
}
