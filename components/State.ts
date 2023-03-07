import {create} from 'zustand';

export const useStore = create<any>((set: any) => ({
  concerts: [],
  setConcerts: (concerts: any) => set({ concerts }),
  removeConcert: (i: string)=> set((state: any) => ({concerts: state.concerts.filter((concert: any) => concert._id !== i)})),
  editConcertDb: (userData: any)=> set((state: any)=> ({concerts: state.concerts === userData}))
}));