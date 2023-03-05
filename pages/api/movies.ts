import clientPromise from "../../lib/mongodb";


export default async (req: any, res: any) => {
   try {
       const client = await clientPromise;
       const db = client.db("sample_mflix"); //db name

       const movies = await db
           .collection("movies")//collection name
           .find({})//gives everything
           .sort({ metacritic: -1 })
           .limit(10)
           .toArray();//returns json

       res.json(movies);
   } catch (e) {
       console.error(e);
   }
};  