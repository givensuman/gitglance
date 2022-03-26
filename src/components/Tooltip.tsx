import React from 'react'
import ReactTooltip from 'react-tooltip'

import theme from '../styles/theme'

interface Props {
    children: React.ReactNode,
    id: string,
    color?: string
}

const Tooltip = ({ id, children, color=theme.black }: Props) => {
    return (
        <div style={{ userSelect: 'none' }}>
        <ReactTooltip
            id={id}
            border={false}
            backgroundColor={color}
            borderColor={'transparent'}
            delayShow={250}
            effect='solid'
            clickable={false}
        >
            {children}
        </ReactTooltip>
        </div>
    )
}

export default Tooltip