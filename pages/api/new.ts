import clientPromise from "../../lib/mongodb";


export default async (req: any, res: any) => {
    let name = "Mike";
    let last = "gov";
   try {
       const client = await clientPromise;
       const db = client.db("chess"); //db name

       const movies = await db
           .collection("users")//collection name
           .insertOne({ name, last });

       res.json(movies);
   } catch (e) {
       console.error(e);
   }
};  