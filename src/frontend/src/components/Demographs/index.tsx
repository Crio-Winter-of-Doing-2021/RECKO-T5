import { Doughnut } from 'react-chartjs-2';
import {journalDataContext} from '../../context/journalDataProvider'
import {useContext} from 'react'
import {AccountRowProps} from '../AccountRow'



 const Demographs: React.FC<any> = () => {
   const {journals} = useContext(journalDataContext)
   // find no of type of credits and debits
   const creditTypes = journals.filter((journal: AccountRowProps) => journal.type === "CREDIT")

   const data = {
    labels: ["CREDIT", "DEBIT"],
    datasets: [
      {
        label: '# of Votes',
        data: [creditTypes.length,journals.length - creditTypes.length],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
    ],
  }
   return (
     <div>
      <Doughnut data= {data} />
      <Doughnut data= {data} />
      <Doughnut data= {data} />
     </div>
   );
 }
  
 export default Demographs;
