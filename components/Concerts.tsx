
import { useEffect } from 'react';
import Edit from './Edit';
import { useStore } from './State';

interface ConcertsState {
  concerts: Object,
  setConcerts: (data: Object) => void;
  removeConcert: (id: string) => void;
}

export default function Try() {
  const concerts = useStore((state: ConcertsState) => state.concerts);
  const setConcerts = useStore((state: ConcertsState) => state.setConcerts);
  const removeConcert = useStore((state: ConcertsState) => state.removeConcert);
  
  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => {
        setConcerts(data);
      });
  }, []);

  const deleteId = async (i: any) => {
    removeConcert(i);
    try {
      const response = await fetch('/api/delete', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: i})
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
    <div>
        {concerts.map((concert: any)=>(
          <div key={concert._id}>
            <h1 >{concert.link}</h1>
            <button onClick={()=>deleteId(concert._id)}>Delete</button>
            <Edit id={concert._id}/>
          </div>
          )
        )}
    </div>
  )
}




// const useConcertsStore = create<ConcertsState>((set) => ({
//   concerts: [],
//   setConcerts: (data: Object) => set({ concerts: data }),
// }));