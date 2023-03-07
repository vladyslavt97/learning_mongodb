import { FormEvent, useState } from "react";
import { useStore } from "zustand";

type Props = {
    id: string
}

interface ConcertsState {
  editConcertDb: (newArr: []) => void;
}

export default function Edit(props: Props) {
    const [open, setOpen] = useState(false);
    const [link, setLink] = useState("");
    const editConcertDb = useStore((state: ConcertsState) => state.editConcertDb);
    const editConcert = () =>{
        setOpen(!open);
    }
    
    const updateDBandZustand = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('link, props.id',link, props.id);

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
        console.log('updated tru:', userData);
        editConcertDb(userData);
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