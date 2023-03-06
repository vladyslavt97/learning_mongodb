

import clientPromise from "../../lib/mongodb";


export default async (req: any, res: any) => {
    console.log("req.body", req.body);
    
   try {
        const client = await clientPromise;
        const db = client.db("chess"); //db name
        const collection = db.collection('users');
        const movies = await collection//collection name
           .updateOne({ name: "Tom" }, {$set: {last: "stated new"}} );

       res.json(movies);
   } catch (e) {
       console.error(e);
   }
};  
