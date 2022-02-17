/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { conn } from 'src/utils/database';

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
                const { listingBusy, totalPrice } = body;
                
                //tener en cuenta que he puesto las comillas a los valores manualmente
                const newListingQuery = `UPDATE spaces SET listingBusy = listingBusy || '{"startDateTime": "${listingBusy.startDateTime}", "endDateTime": "${listingBusy.endDateTime}", "status": "${listingBusy.status}"}' ::jsonb WHERE listingID = ${query.id}`;
                const result = await conn.query(newListingQuery);

                if(result.rowCount !== 1) 
                    return res.status(400).json({ message: "Space not found" })

                const bookingQuery = 'INSERT INTO bookings (checkin, checkout, totalPrice, listingID) VALUES ($1, $2, $3, $4) RETURNING *';
                const values =  [listingBusy.startDateTime, listingBusy.endDateTime, totalPrice ,query.id];
                const resBooking = await conn.query(bookingQuery, values);

                return res.json(resBooking.rows[0]);
            } catch (error: any) {
                return res.status(500).json({ message: error.message })
            }
        default:
            return res.status(400).json('method not allowed');
    }
}