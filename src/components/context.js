import React, { useContext, useReducer } from 'react';

const AppContext = React.createContext();


const AppProvider = ({children}) => {

  

    return (

        <AppContext.Provider value={{name:"ashu" , age : 23}}>
            {children}
        </AppContext.Provider>
    )
}

const Global = () => {
    return useContext(AppContext);
}

export{AppContext,AppProvider,Global};
