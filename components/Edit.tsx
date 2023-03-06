import { FormEvent, useState } from "react";

type Props = {
    id: string
}

export default function Edit(props: Props) {
    const [open, setOpen] = useState(false);
    const [link, setLink] = useState("");

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
        console.log('updated tru:', userData);
        
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