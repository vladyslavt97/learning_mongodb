
import { useEffect } from 'react';
import create from 'zustand';

const useStore = create((set) => ({
  data: null,
  setData: (data: any) => set({ data }),
}));

type Props = {}


export default function Try() {
    const { setData } = useStore();

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const { data } = useStore();

  return (
    <div>
        {data ? (
        <p>{JSON.stringify(data)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}