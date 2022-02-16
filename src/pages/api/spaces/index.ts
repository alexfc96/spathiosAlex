import { NextApiRequest, NextApiResponse } from "next";
import { conn } from 'src/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {

    // throw new Error(JSON.stringify('something went wrong'));
    const { method, body } = req;
    
    switch (method) {
        case 'GET':
            try {
                const query = 'SELECT * FROM spaces';
                const response = await conn.query(query);

                return res.status(200).json(response.rows);
            } catch (error:any) {
                return res.status(500).json({ error: error.message });
            }
        default:
            return res.status(400).json('invalid method')
    }
}