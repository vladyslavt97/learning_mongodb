import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";


export default async (req: any, res: any) => {
    const {link, id} = req.body;
   try {
        const client = await clientPromise;
        const db = client.db("Maxim_Rysanov"); //db name
        const collection = db.collection('concerts-2023');
        const concertsUpd = await collection//collection name
           .findOneAndUpdate({ _id: new ObjectId(id) }, {$set: {link: link}}, { returnDocument: "after" }  );
        
       res.json(concertsUpd.value);
   } catch (e) {
       console.error(e);
   }
};  
