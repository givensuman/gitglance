import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { AnimatePresence as Animate, motion } from 'framer-motion'
import { 
    faXmark, faCodeBranch, faCodeFork, faStar, faEye, faCertificate, faFileCode, faArrowUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons'
import { faGitAlt } from '@fortawesome/free-brands-svg-icons'

import theme from '../styles/theme'

import Icon from './Icon'
import Tooltip from './Tooltip'

interface Props {
    close: () => void,
    data: {
        html_url: string,
        name: string,
        topics: Array<string>,
        forks_count: number,
        stargazers_count: number,
        watchers_count: number,
        description: string,
        owner: { login: string },
        default_branch: string,
        license: { key: string },
        homepage: string,
        language: string
    }
}

interface WrapperProps {
    top: number | null
}

const Wrapper = styled.div<WrapperProps>`
    position: absolute;
    right: 0;
    top: ${props => props.top ? String(props.top) + 'px' : '0'};
    height: 100vh;
    background-color: ${theme.black};
    color: ${theme.white};
    max-width: 500px;
    min-width: 30%;
    background-color: ${theme.black};
    padding: 10px 10px 10px 30px;
`

interface ComponentProps {
    css?: string
}

const Text = styled.span<ComponentProps>`
    color: ${theme.grey};
    cursor: default;
    max-width: fit-content;
    ${props => props.css}
`
const Badge = styled.span`
    background-color: ${theme.grey};
    color: ${theme.black};
    border-radius: 0.2em;
    padding: 0.1em 0.2em;
    margin: 0.2em 0.2em 1em 0;
    cursor: default;
`

const Link = styled.a<ComponentProps>`
    color: ${theme.blue};
    text-decoration: none;
    margin: 0.2em 0;
    ${props => props.css}
`

const Popover = ({ data, close }: Props) => {

    const [ topOffset, setTopOffset ] = useState<null | number>(null)

    useEffect((): (() => void) => {

        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

        setTopOffset(scrollTop)

        window.onscroll = () => window.scrollTo(scrollLeft, scrollTop)

        return () => window.onscroll = () => {}
    })

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Wrapper 
                top={topOffset} 
                className='col justify-start'
            >
                <Icon 
                    icon={faXmark} 
                    css={`
                        position: absolute;
                        top: 10px; left: 10px;
                        cursor: pointer;
                        height: 20px;
                    `}
                    onClick={close}
                />

                <Text css={`
                    font-size: 2rem;
                    color: ${theme.white};
                    margin: 30px 0 15px 0;
                `}>
                    {data.name}
                </Text>

                <div className='row'>

                    <Tooltip id='defaultbranch'>Default Branch</Tooltip>
                    <Text 
                        css={`margin-right: 0.5em`}
                        data-tip
                        data-for='defaultbranch'
                    >
                        <Icon 
                            icon={faCodeBranch}
                            css={`margin-right: 0.25em`}
                        />
                        {data.default_branch}
                    </Text>

                    <Tooltip id='forks'>Forks</Tooltip>
                    <Text 
                        css={`margin-right: 0.5em`}
                        data-tip
                        data-for='forks'
                    >
                        <Icon 
                            icon={faCodeFork} 
                            css={`margin-right: 0.25em`}
                        />
                        {data.forks_count}
                    </Text>

                    <Tooltip id='stars'>Stars</Tooltip>
                    <Text 
                        css={`margin-right: 0.5em`}
                        data-tip
                        data-for='stars'
                    >
                        <Icon 
                            icon={faStar}
                            css={`margin-right: 0.25em`}
                        />
                        {data.stargazers_count}
                    </Text>

                    <Tooltip id='watching'>Watching</Tooltip>
                    <Text 
                        css={`margin-right: 0.5em`}
                        data-tip
                        data-for='watching'
                    >
                        <Icon 
                            icon={faEye}
                            css={`margin-right: 0.25em`}
                        />
                        {data.watchers_count}
                    </Text>

                </div>


                <Text 
                    className='code'
                    css={`margin: 0.5em 0`}
                >
                    /{data.owner.login}
                </Text>

                <Text css={`margin: 5px 0`}>
                    {data.description}
                </Text>

                <Tooltip id='language'>Language</Tooltip>
                <Text 
                    css={`margin: 0.5em 0`}
                    data-tip
                    data-for='language'
                >
                    <Icon 
                        icon={faFileCode}
                        css={`padding-right: 0.5em`}
                    />
                    {data.language ? data.language : 'Misc'}
                </Text>
                
                {data.license && <>
                <Tooltip id='license'>License</Tooltip>
                <Text 
                    css={`margin-bottom: 0.5em`}
                    data-tip
                    data-for='license'
                >
                    <Icon 
                        icon={faCertificate} 
                        css={`padding-right: 0.5em;`}
                    />
                    {data.license.key.toUpperCase()}
                </Text>
                </>}

                {data.topics && data.topics.length > 0 && 
                <div className='row'>
                    {data.topics.map((item, index) => 
                        <Badge key={index}>{item}</Badge>
                    )}
                </div>
                }

                <div className='col align-start'>
                    <Link href={data.html_url}>
                        <Icon
                            /* @ts-ignore */
                            icon={faGitAlt}
                            css={`
                                padding-right: 0.5em;
                            `}
                        />
                        Repo
                    </Link>
                    {data.homepage && data.homepage.length > 0 &&
                    <Link 
                        href={data.homepage}
                        css={`margin-left: 0.25em`}
                    >
                        <Icon
                            icon={faArrowUpRightFromSquare}
                            css={`
                                padding-right: 0.5em;
                            `}
                        />
                        Homepage
                    </Link>
                    }
                </div>

            </Wrapper>
        </motion.div>
    )
}

export default Popover