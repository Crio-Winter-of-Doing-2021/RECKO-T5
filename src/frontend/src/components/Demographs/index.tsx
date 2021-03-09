import { Doughnut } from 'react-chartjs-2';
 

 export interface DemographsProps {
   
 }
  
 const data = {
  labels: ["credit", "debit"],
  datasets: [
    {
      label: '# of Votes',
      data: [12,20],
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

 const Demographs: React.FC<DemographsProps> = () => {
   return (
     <div>
      <Doughnut data= {data} />
      <Doughnut data= {data} />
      <Doughnut data= {data} />
     </div>
   );
 }
  
 export default Demographs;
