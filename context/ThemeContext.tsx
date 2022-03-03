
import React, { createContext, useEffect, useState } from 'react';



// export const themes = {
//   dark: {
//     color: 'white',
//     backGround: 'black',
//   },
//   light: {
//     color: 'black',
//     backGround: 'white',
//   },
// };

const ThemeContext = createContext({});

function ThemeProvider1({ children }: any) {
  let item: string;
 
  const [backgroundUrl, setBackgroundUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      item = JSON.parse(localStorage.getItem("backGround") ?? '');
      return item 
   }
  });

  
  return (
    <ThemeContext.Provider
      value={{
        backgroundUrl,
        setBackgroundUrl
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}



export { ThemeContext, ThemeProvider1 };
