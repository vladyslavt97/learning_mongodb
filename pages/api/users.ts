import clientPromise from "../../lib/mongodb";


export default async (req: any, res: any) => {
   try {
       const client = await clientPromise;
       const db = client.db("Maxim_Rysanov"); //db name

       const movies = await db
           .collection("concerts-2023")//collection name
           .find({})//gives everything
           .sort({ metacritic: -1 })
           .limit(10)
           .toArray();//returns json
        // console.log(movies);
        
       res.json(movies);
   } catch (e) {
       console.error(e);
   }
};  