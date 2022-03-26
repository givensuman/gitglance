import React, { useEffect, useState } from 'react';
import { ArcElement, Tooltip, Legend, Chart } from 'chart.js'
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'transparent',
//         'transparent',
//         'transparent',
//         'transparent',
//         'rtransparent',
//         'transparent',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

// function App() {
//   return <Doughnut data={data} />;
// }

// export default App

interface Props {
    data: [{
        label: string,
        value: number,
        color: string
    }]
}

const Languages = ({ data }: Props) => {

    const [ doughnutData, setDoughnutData ] = useState<any>({})

    useEffect(() => {
        if (data && data.length > 0) {
            const doughnut = {
                labels: data.map((item: { label: string }) => item.label),
                datasets: [
                    {
                        label: 'Languages',
                        data: data.map((item: { value: number }) => item.value),
                        backgroundColor: data.map((item: { color: string }) => item.color),
                        borderWidth: 0
                    }
                ]
            }

            setDoughnutData(doughnut)
        }
    }, [data])
    
    useEffect(() => console.log(data), [data])

    return (
        null
    )
}

export default Languages
