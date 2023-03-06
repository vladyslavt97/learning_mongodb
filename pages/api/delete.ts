

import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";


export default async (req: any, res: any) => {
    console.log("req.body", req.body);
    
   try {
        const client = await clientPromise;
        const db = client.db("chess"); //db name
        const collection = db.collection('users');
        const movies = await collection//collection name
           .deleteOne({ _id: new ObjectId('6405356e0a7eb61f74d97ad8') });

       res.json(movies);
   } catch (e) {
       console.error(e);
   }
};  
