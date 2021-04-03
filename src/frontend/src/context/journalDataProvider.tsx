import { createContext , useState} from "react";
import {JournalRowProps} from '../components/JournalRow'
export const journalDataContext = createContext<any>(null)

const JournalDataContextProvider: React.FC<any> = ({children}) => {

  const [journals, setJournals] = useState<Array<JournalRowProps>>([])
  return (
    <journalDataContext.Provider value={{journals, setJournals}}>
      {children}
    </journalDataContext.Provider>
  );
}
 
export default JournalDataContextProvider;