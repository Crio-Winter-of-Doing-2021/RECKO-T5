import { Bar, Doughnut } from 'react-chartjs-2';
import {journalDataContext} from '../../context/journalDataProvider'
import {useContext} from 'react'
import {JournalRowProps} from '../JournalRow'



 const Demographs: React.FC<any> = () => {
   const {journals} = useContext(journalDataContext)
   // find no of type of credits and debits
   const creditTypes = journals.filter((journal: JournalRowProps) => journal.type === "CREDIT")

   const doughnutData = {
    labels: ["CREDIT", "DEBIT"],
    datasets: [
      {
        label: '# of Votes',
        data: [creditTypes.length,journals.length - creditTypes.length],
        backgroundColor: [
          '#C6F6D5',
          '#F9D7D6',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
    ],
  }


  const months:any = {}

  journals.forEach((j:JournalRowProps) => {
    let date:string = new Date(j.date).toLocaleDateString().substring(3)
    if(months[date]){
      if(j.type === "CREDIT") months[date].credit++
      else months[date].debit++
    }else{
      months[date] = {
        credit: 0,
        debit : 0
      }
      if(j.type === "CREDIT") months[date].credit++
      else months[date].debit++
    }
  })
  const credit_values:any = []
  const debit_values:any = []
  const label_values:any = []
  for (const [key, value] of Object.entries(months)) {
    label_values.push(key)
  // @ts-ignore
    credit_values.push(value.credit)
  // @ts-ignore
    debit_values.push(value.debit)
  }
  const barData = {
    labels: label_values,
    datasets: [
      {
        label: 'Debit',
        data: debit_values,
        backgroundColor: '#F3A5A2',
      },
      {
        label: 'Credit',
        data: credit_values,
        backgroundColor: '#8CF7B1',
      },
    ],
  }
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
   return (
     <div>
        <Doughnut data= {doughnutData} />
        <br />
        <p>Doughnut representing total number of credit and debit journals</p>
        <br />
        <br />

        <Bar data= {barData} options={options} />
        <br />
        <p>Bar chart representing number of debit and credit journals per month</p>
     </div>
   );
 }
  
 export default Demographs;
