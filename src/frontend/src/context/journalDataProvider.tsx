import { createContext , useState} from "react";
import {AccountRowProps} from '../components/AccountRow'
export const journalDataContext = createContext<any>(null)

const JournalDataContextProvider: React.FC<any> = ({children}) => {

  const [journals, setJournals] = useState<Array<AccountRowProps>>([])
  return (
    <journalDataContext.Provider value={{journals, setJournals}}>
      {children}
    </journalDataContext.Provider>
  );
}
 
export default JournalDataContextProvider;