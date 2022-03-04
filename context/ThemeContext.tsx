
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
 
  // const [backgroundUrl, setBackgroundUrl] = useState(() => {
  //   if (typeof window !== 'undefined') {
  //     item = JSON.parse(localStorage.getItem("backGround") ?? '') || '#170f23';
  //     return item 
  //  }
  // });

const [backgroundUrl, setBackgroundUrl] = useState(() =>{
  let theme = ''
  if (typeof window !== 'undefined') {

    if (localStorage.getItem("backGround") !== null){
      theme =  JSON.parse(localStorage.getItem("backGround") ?? '') 
    }
   
    return (theme === '' ? '#170f23' : theme);
}

  return theme;
})
  
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
