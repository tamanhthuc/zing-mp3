import { createContext, useState } from 'react';

const SingerContext = createContext({});

function SingerProvider({ children }: any) {

  const [listComment, setListComment] = useState([])

 

  return (
    <SingerContext.Provider value={{ listComment, setListComment}}>{children}</SingerContext.Provider>
  );
}

export { SingerContext, SingerProvider };

