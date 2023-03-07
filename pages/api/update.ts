import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";


export default async (req: any, res: any) => {
    console.log("req.body", req.body);
    const {link, id} = req.body;
   try {
        const client = await clientPromise;
        const db = client.db("Maxim_Rysanov"); //db name
        const collection = db.collection('concerts-2023');
        const concertsUpd = await collection//collection name
           .findOneAndUpdate({ _id: new ObjectId(id) }, {$set: {link: link}}, { returnDocument: "after" }  );
        console.log('concertsUpd', concertsUpd);


        //return new array
        const updatedArr = await collection.find({})//gives everything
           .sort({ metacritic: -1 })
           .limit(10)
           .toArray();//returns json
        console.log('collection', updatedArr);
        
       res.json(updatedArr);
   } catch (e) {
       console.error(e);
   }
};  
