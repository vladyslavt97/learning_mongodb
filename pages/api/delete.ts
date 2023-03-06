

import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";


export default async (req: any, res: any) => {
    const {id} = req.body;
    
   try {
        const client = await clientPromise;
        const db = client.db("Maxim_Rysanov"); //db name
        const collection = db.collection('concerts-2023');
        const movies = await collection//collection name
           .deleteOne({ _id: new ObjectId(id) });

       res.json(movies);
   } catch (e) {
       console.error(e);
   }
};  
