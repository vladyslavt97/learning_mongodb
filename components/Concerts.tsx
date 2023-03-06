
import { useEffect } from 'react';
import { create } from 'zustand';
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
  console.log('removeConcert', removeConcert);
  
  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => {
        setConcerts(data);
      });
  }, []);

  const figureId = (i: any) => {
    console.log('ididididi', i);
    removeConcert(i);
  } 
  
  return (
    <div>
        {concerts.map((concert: any)=>(
          <div key={concert._id}>
            <h1 >{concert.link}</h1>
            <button onClick={()=>figureId(concert._id)}>Delete</button>
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