import React, { ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

const SuccesContext = createContext<SuccesContextType | undefined>(undefined);

type SuccesContextType = [
    state: boolean,
    dispatch: React.Dispatch<SetStateAction<boolean>>,
]

const SuccesProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useState(false);
    const contextValue: SuccesContextType = [
        state,
        dispatch,
    ];
    return (
        <SuccesContext.Provider value={contextValue}>
            {children}
        </SuccesContext.Provider>
    );
};

export const useSucces = () => {
    const context = useContext(SuccesContext);
    if (!context) {
        throw new Error('useSucces must be used within a SuccesProvider');
    }
    return context;
};


export default SuccesProvider