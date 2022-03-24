import {createContext, useContext, useState, useMemo} from 'react';
export const BoardContext = createContext();

export function useBoardKey() {
  return useContext(BoardContext);
}

export function BoardContextProvider({children}) {
    const [boardKey, setBoardKey] = useState(Date.now()); // used for rerendering board from children

    const value = useMemo(
        () => ({ boardKey, setBoardKey }), 
        [boardKey]
    );

    return (
        <BoardContext.Provider value={value}>
          {children}
        </BoardContext.Provider>
    )
}