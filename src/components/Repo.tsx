import React from 'react'
import styled from '@emotion/styled'
import { 
    faCodeFork, faStar, faEye
} from '@fortawesome/free-solid-svg-icons'

import theme from '../styles/theme'

import Icon from './Icon'
import Tooltip from './Tooltip'

interface Props {
    data: {
        name: string,
        forks_count: number,
        stargazers_count: number,
        watchers_count: number
    },
    open: () => void
}

const Wrapper = styled.div`
    background-color: ${theme.black};
    color: ${theme.white};
    padding-top: 10px;
    width: 150px;
    height: 100px;
    border-radius: 0.2em;
    margin: 20px;
    cursor: pointer;
    border: solid 2px ${theme.black};
    position: relative;
    background-clip: padding-box;
    transition: border-color 0.2s;

    &:before {
        content: '';
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        z-index: -1;
        margin: -2px;
        border-radius: inherit;
        background: linear-gradient(to right, ${theme.pink}, ${theme.orange});
    }

    &:hover {
        border-color: transparent;
    }
`

const Name = styled.span`
    font-size: 1.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 125px;
    max-width: fit-content;
`

const Stats = styled.div`
    position: absolute;
    bottom: 0;
    justify-content: space-around;
    padding-bottom: 5px;

    span {
        font-weight: bold;
        color: ${theme.grey};
        margin: 0 3px;
        font-size: 0.8rem;
    }

    div {
        margin: 0 5px;
    }
`

const Repo = ({ data, open }: Props) => 
    <Wrapper
    className='col align-center justify-start'
    onClick={open}
    >
        <Name>{data.name}</Name>

        <Stats className='row'>
            
            <div className='row align-center'>
                <Icon icon={faCodeFork} />
                <span>{data.forks_count}</span>
            </div>
            <div className='row align-center'>
                <Icon icon={faStar} />
                <span>{data.stargazers_count}</span>
            </div>
            <div className='row align-center'>
                <Icon icon={faEye} />
                <span>{data.watchers_count}</span>
            </div>
            
        </Stats>

        {/* Badges */}
        {/* <div className='row center'>
        {data.topics.length > 0 && data.topics.map((item, index) =>
            index < 3 && <Badge key={index} className='flex center'>{item}</Badge>
        )}
        </div> */}
    </Wrapper>

export default Repo