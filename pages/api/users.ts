import User from '../../models/User';
import db from '../../utils/db';
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await db.connect();
    try {
        const users = await User.find({});
        res.status(200).json({ users });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
      }
}
