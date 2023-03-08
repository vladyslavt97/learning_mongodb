import { FormEvent, useState } from "react";
import { useStore } from "./State";

type Props = {
    id: string
}

interface ConcertsState {
  concerts: Object,
  editConcertDb: (newArr: Object) => void;
}

export default function Edit(props: Props) {
    const [open, setOpen] = useState(false);
    const [link, setLink] = useState("");
    const concerts = useStore((state: ConcertsState) => state.concerts);
    const editConcertDb = useStore((state: ConcertsState) => state.editConcertDb);
    const editConcert = () =>{
        setOpen(!open);
    }
    
    const updateDBandZustand = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
      const response = await fetch('/api/update', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({link: link, id: props.id})
      });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        let index = concerts.findIndex((el:any)=>el._id === userData._id)
        const newConcerts = [...concerts];
        newConcerts[index] = userData;
        editConcertDb(newConcerts);
            return userData;
        } catch (error) {
        console.error('Error fetching user data:', error);
        }

        setLink('');
    }

  return (
    <div>
        <button onClick={()=>editConcert()}>Edit</button>
        {open && <div>
            <form onSubmit={updateDBandZustand}>
                <input 
                type="text" 
                onChange={e=>setLink(e.target.value)}
                value={link}
                placeholder="link"/>
                <button>update</button>
            </form>
            </div>}
    </div>
  )
}