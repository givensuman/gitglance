import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence as Animate, motion } from 'framer-motion'

import theme from '../styles/theme'
import useEventListener from '../hooks/useEventListener'

import Icon from '../components/Icon'

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    max-width: 300px;
    margin: auto auto;
`

const Title = styled.h1`
    font-size: 4rem;
    margin: 10px;
    width: 1000px;

    span {
        background: linear-gradient(to right,
            ${theme.pink}, ${theme.orange}, ${theme.green}, ${theme.blue}
            );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`

interface SearchbarProps {
    active: boolean
}

const Searchbar = styled.input<SearchbarProps>`
    padding: 7% 10%;
    font-size: 1.2rem;
    border-radius: 0.5em;
    height: 30px;
    border: none;
    background-color: ${theme.grey};
    transition: width 0.2s;
    margin-right: auto;
    
    width: ${props => props.active ? '65%' : '100%'};

    &:focus {
        outline: none;
    }
`

const Error = styled.h4`
    margin: 20px auto;
`

const Pretty = styled.div`
    width: 100%;
    height: 10px;
    background-image: linear-gradient(to right,
        ${theme.blue}, ${theme.green}, ${theme.orange}, ${theme.pink}
        );
    position: absolute;
    bottom: 0;
`

interface Props {
    error: number
}

const Search = ({ error }: Props) => {

    const [ search, setSearch ] = useState('')
    const [ showSubmit, setShowSubmit ] = useState(false)
    const navigate = useNavigate()

    const handleSearch = (e: any) => setSearch(e.target.value)
    const handleSubmit = () => navigate(`/${search}`)

    useEffect(() => {
        search.length > 0 ? setShowSubmit(true) : setShowSubmit(false)
    }, [search])

    useEventListener('keydown', e => {
        // @ts-ignore
        if (e?.key === 'Enter') handleSubmit()
    })

    return (
        <Animate>
        <Wrapper className='col center'>

            <Title className='row center'>
                git<span>glance</span>
            </Title>
            <div className='col justify-center'>
                <div 
                    className='row center' 
                    style={{position: 'relative'}}
                    >
                    <Searchbar
                        type='text'
                        onChange={handleSearch}
                        className='code'
                        spellCheck={false}
                        active={search.length > 0}
                    />
                    {showSubmit && 
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ height: '100%' }}
                        className='flex center'
                    >
                    <Icon 
                        icon={faAngleRight}
                        css={`
                            width: 10%;
                            margin-left: 10px;
                            height: 30px;
                            position: absolute;
                            right: 0;
                            color: ${theme.grey};
                            cursor: pointer;
                        `} 
                        onClick={handleSubmit}
                    />
                    </motion.div>
                    }
                </div>
                {
                error === 404 ? <Error>Can't find a GitHub user with that name.</Error> :
                error === 403 ? <Error>GitHub has limited the rate of our requests. Try again later!</Error> :
                null
                }
            </div>

                <Pretty />
        </Wrapper>
        </Animate>
    )
}

export default Search