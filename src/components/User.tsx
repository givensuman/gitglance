import React from 'react'
import styled from '@emotion/styled'
import { 
    faGlobe, faCode, faUserGroup, faHeart
} from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence as Animate, motion } from 'framer-motion'

import github from '../assets/github.svg'
import twitter from '../assets/twitter.svg'

import theme from '../styles/theme'

import Icon from './Icon'
import Tooltip from './Tooltip'


interface Props {
    data: {
        avatar_url: string,
        html_url: URL,
        login: string,
        name: string,
        blog?: string,
        twitter_username?: string,
        followers: number,
        following: number,
        public_repos: number
    }
}

const Wrapper = styled.div`
    padding: 10% 0;
    position: relative;
    max-width: 800px;
    margin: 0 auto;
`

const Avatar = styled.img`
    border-radius: 50%;
    height: 200px;
    width: 200px;

    border: solid 3px transparent;
    background-clip: padding-box;
    background: linear-gradient(to right,
        ${theme.blue},
        ${theme.green}
    );
`

const Name = styled.div`
    margin-left: 10px;
    cursor: default;

    h1 {
        font-size: 3rem;
        margin: 0;
    }

    h2 {
        font-size: 1.5rem;
        margin: 0;
        color: ${theme.grey};
    }

    h3 {
        font-size: 0.75rem;
        margin: 0;
    }
`

const Banners = styled.div`
    position: absolute;
    top: 0;
    right: 5%;
`

interface BannerProps {
    background: string
}

const Banner = styled.div<BannerProps>`
    height: 50px;
    width: 50px;
    background-color: blue;
    margin: 0 10px;
    border-radius: 0 0 0.5em 0.5em;
    cursor: pointer;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    transition: height 0.2s;
    background-color: ${props => props.background};

    &:hover {
        height: 75px;
    }

    img {
        height: 25px;
        margin-bottom: 12.5px;
    }
`

const Stats = styled.div`
    width: 100%;
    justify-content: space-around;
    margin-top: 10px;

    span {
        margin: 5px 5px 0;
        color: ${theme.grey};
        cursor: default;
        font-weight: bold;
        position: relative;
        right: 0.05em;
    }
`

const User = ({ data }: Props) => {
    return (
        <Wrapper className='row center'>

        {/* Avatar */}
        <Animate>
        <motion.div
            initial={{ x: -300, y: -50, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
        >
            <Avatar
                src={data.avatar_url}
                alt={`${data.name} profile picture`}
                onClick={() => console.log(data)}
            />
        </motion.div>
        </Animate>

        {/* User */}
        <Animate>
        <motion.div 
            className='col align-start'
            initial={{ x: 300, y: 50, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
        >
            <Name>
                <h1>{data.name}</h1>
                <h2 className='code'>/{data.login}</h2>
            </Name>

            {/* Stats */}
            <Stats className='row'>

                <Tooltip id='followers'>Followers</Tooltip>
                <div 
                    className='col align-center'
                    data-tip
                    data-for='followers'
                >
                    <Icon 
                        icon={faHeart} 
                        css={`color: ${theme.pink}`}
                    />
                    <span>{data.followers}</span>
                </div>
                <Tooltip id='following'>Following</Tooltip>
                <div 
                    className='col align-center'
                    data-tip
                    data-for='following'
                >
                    <Icon 
                        icon={faUserGroup} 
                        css={`color: ${theme.blue}`}
                    />
                    <span>{data.following}</span>
                </div>
                <Tooltip id='repos'>Repos</Tooltip>
                <div 
                    className='col align-center'
                    data-tip
                    data-for='repos'
                >
                    <Icon 
                        icon={faCode} 
                        css={`color: ${theme.orange}`}
                    />
                    <span>{data.public_repos}</span>
                </div>

            </Stats>

        </motion.div>
        </Animate>

        {/* Banners */}
        <Banners className='row'>
            <Banner 
                background={theme.grey}
                onClick={() => window.open(data.html_url)}
            >
                <img 
                    src={github}
                    alt='Github'
                />
            </Banner>
            {data.twitter_username && 
                <Banner 
                    background={theme.blue}
                    onClick={() => window.open(`https://twitter.com/${data.twitter_username}`)}
                >
                <img
                    src={twitter}
                    alt='Twitter'
                />
                </Banner>
            }
            {data.blog && 
                <Banner 
                    background={theme.green}
                    onClick={() => window.open(data.blog)}
                >
                    <Icon 
                        icon={faGlobe}
                        css={`
                            height: 25px;
                            margin-bottom: 12.5px;
                            color: black;
                        `}
                    />
                </Banner>
            }
        </Banners>

        </Wrapper>
    )
}

export default User