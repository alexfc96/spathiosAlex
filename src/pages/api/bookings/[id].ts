/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { conn } from 'src/utils/database';

// id de reserva, fecha de check in,
// fecha de check out, precio total de la reserva, y la nueva ocupación del listing

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {method, query, body} = req;

    switch (method) {
        case 'GET':
            try {
                const text = "SELECT * FROM spaces WHERE listingID = $1";
                const values = [query.id];
                const result = await conn.query(text, values);
    
                if(result.rows.length === 0) 
                    return res.status(400).json({ message: "Space not found" })
    
                return res.json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({ message: error.message })
            }
        case 'PUT':
            try {
                const { listingBusy } = body;
                
                //tener en cuenta que he puesto las comillas a los valores manualmente
                const text = `UPDATE spaces SET listingBusy = listingBusy || '{"startDateTime": "${listingBusy.startDateTime}", "endDateTime": "${listingBusy.endDateTime}", "status": "${listingBusy.status}"}' ::jsonb WHERE listingID = ${query.id} RETURNING *`;
                const result = await conn.query(text);
    
                if(result.rows.length === 0) 
                    return res.status(400).json({ message: "Space not found" })
    
                return res.json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({ message: error.message })
            }
        default:
            return res.status(400).json('method not allowed');
    }
}