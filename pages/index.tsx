import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { InferGetServerSidePropsType } from 'next'
import Try from '../components/Concerts';
import { useStore } from 'zustand';

export async function getServerSideProps() {

    try {
        const client = await clientPromise;
        const db = client.db("chess");

        const users = await db
            .collection("users")
            .find({})
            .sort({ metacritic: -1 })
            .limit(20)
            .toArray();

        return {
            props: { users: JSON.parse(JSON.stringify(users)) },
        };
    } catch (e) {
        console.error(e);
    }
}

export default function Home({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  let user = "sdfsdafds"
  console.log(users)
  //update
  const updateCall = async () => {
    try {
      const response = await fetch('/api/update', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
      });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        console.log('updated tru:', userData);
        
        return userData;
      } catch (error) {
        console.error('Error fetching user data:', error);
  }
}


const deleteCall = async () => {
    try {
      const response = await fetch('/api/delete', {
      method: 'DELETE',
      });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const deletedData = await response.json();
        console.log('updated tru:', deletedData);
        
        return deletedData; 
      } catch (error) {
        console.error('Error fetching user data:', error);
  }
}

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
     {users.map((us: any)=>(
        <div key={us._id}>
          <h2>{us.last}</h2>
        </div>
     ))}

     <button onClick={updateCall}>update</button>
     <button onClick={deleteCall}>Delete</button>

     <Try />
    </div>
  )
}
