

import clientPromise from "../../lib/mongodb";


export default async (req: any, res: any) => {
    console.log("req.body", req.body);
    
   try {
        const client = await clientPromise;
        const db = client.db("chess"); //db name

        const collection = db.collection('mycollection');
        const changeStream = collection.watch();
        changeStream.on('change', function(change) {
            console.log(change);
        });

       const movies = await db
           .collection("users")//collection name
           .updateOne({ name: "Tom" }, {$set: {last: "hgfdhf"}} );

       res.json(movies);
   } catch (e) {
       console.error(e);
   }
};  

// db.users.updateOne(
//   { _id: ObjectId("616de8d7e48f930eae5f7f0c") },
//   { $set: { email: "newemail@example.com" } }
// );