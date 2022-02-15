/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { conn } from 'src/utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {method, query, body} = req;

    switch (method) {
        case 'GET':
            try {
                const text = "SELECT * FROM tareas WHERE id = $1";
                const values = [query.id];
                const result = await conn.query(text, values);
    
                if(result.rows.length === 0) 
                    return res.status(400).json({ message: "Task not found" })
    
                return res.json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({ message: error.message })
            }
        case 'PUT':
            try {
                const { title, description } = body;
                const text = "UPDATE tareas SET title = $1, description = $2 WHERE id = $3 RETURNING *";
                const values = [title, description, query.id];
                const result = await conn.query(text, values);
    
                if(result.rows.length === 0) 
                    return res.status(400).json({ message: "Task not found" })
    
                return res.json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({ message: error.message })
            }
        case 'DELETE':
            try {
                const text = "DELETE FROM tareas WHERE id = $1 RETURNING *";
                const values = [query.id];
                const result = await conn.query(text, values);

                if(result.rowCount === 0) 
                    return res.status(400).json({ message: "Task not found" })
    
                return res.json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({ message: error.message })
            }
        default:
            return res.status(400).json('method not allowed');
    }
}