import React from 'react'
import styled from '@emotion/styled'
import { AnimatePresence as Animate, motion } from 'framer-motion'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import theme from '../styles/theme'

import Loader from './Loader'

interface Props {
    data: [{
        label: string,
        value: number,
        color: string
    }]
}

const Wrapper = styled.div`
    max-width: 300px;
    width: 100%;
    margin: 2% auto;
    transition: height 0.3s;
`

ChartJS.register(ArcElement, Tooltip, Legend)

const Languages = ({ data }: Props) => {

    React.useEffect(() => console.log(data), [data])

    return (
        <Wrapper className='row center'>
        {data && data.length > 0 &&
        <Animate>
        <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 300 }}
            exit={{ opacity: 0, width: 0 }}
        >

        <Doughnut 
            data={{
                labels: data.map(item => item.label),
                datasets: [
                    {
                        label: 'Favorite languages',
                        data: data.map(item => item.value),
                        backgroundColor: data.map(item => item.color),
                        borderColor: data.map(() => 'transparent'),
                        borderWidth: 3
                    },
                ],
            }}
            options={{
                responsive: true,
                color: theme.grey
            }}
        />
        
        </motion.div>
        </Animate>
        }
        </Wrapper>
    )
}

export default Languages
