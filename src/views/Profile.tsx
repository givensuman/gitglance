import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import GhPolyglot from 'gh-polyglot'

import User from '../components/User'
import Repo from '../components/Repo'
import Popover from '../components/Popover'
import Loader from '../components/Loader'
import RateLimit from '../components/RateLimit'
import Languages from '../components/Languages'
import Icon from '../components/Icon'

const Profile = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(true)
    const [ user, setUser ] = useState<any>({})
    const [ repos, setRepos ] = useState([])
    const [ rateLimit, setRateLimit ] = useState<any>({})
    const [ languages, setLanguages ] = useState<any>([])
    const [ popover, setPopover ] = useState<any>({})

    useEffect(() => {

        const id = location.pathname.substring(1)

        const getUser = async () => 
            await fetch(`https://api.github.com/users/${id}`)
                .then(res => res.json())
                .then(data => setUser(data))
        
        const getRepos = async () =>
            await fetch(`https://api.github.com/users/${id}/repos?per_page=100`)
                .then(res => res.json())
                .then(data => setRepos(data))

        const getRateLimit = async () => 
            await fetch('https://api.github.com/rate_limit')
                .then(res => res.json())
                .then(data => setRateLimit(data.resources.core))

        const getLanguages = async () => {
            const you = await new GhPolyglot(id)
            await you.userStats((err: any, stats: any) => {
                if (err) {
                    console.error(err)
                } else {
                    setLanguages(stats)
                }
            })
        }


        const load = async () => {
            setLoading(true)
            await getUser()
            await getRepos()
            await getRateLimit()
            await getLanguages()
            setLoading(false)
        }
        
        load()

        return () => {
            setUser({})
            setRepos([])
            setLoading(true)
            setRateLimit({})
            setLanguages({})
        }
    }, [])

    type Repo = {
        stargazers_count: number,
        forks_count: number,
        watchers_count: number
    }

    const sortRepos = (a: Repo, b: Repo) => {
        let as = a.stargazers_count || 0
        let bs = b.stargazers_count || 0
        let af = a.forks_count || 0
        let bf = b.forks_count || 0
        let aw = a.watchers_count || 0
        let bw = b.watchers_count || 0

        return (
            as > bs ? -1 : bs > as ? 1 :
            af > bf ? -1 : bf > af ? 1 :
            aw > bw ? -1 : bw > aw ? 1 : 0
        )
    }

    return (
        <>
        {loading ? <Loader /> : <>
        <Icon 
            icon={faArrowLeft} 
            css={`
                height: 50px;
                cursor: pointer;
                position: absolute;
                top: 5px;
                left: 5px;
            `}
            onClick={() => navigate('/')}
        />

        {Object.keys(rateLimit).length > 0 && <RateLimit data={rateLimit} />}

        {languages.length > 0 && <Languages data={languages} />}

        {Object.keys(user).length > 0 && <User data={user} />}

        <div className='row center'>
            {repos.length > 0 && repos.sort(sortRepos).map((repo, index) => 
                <Repo 
                    key={index} 
                    data={repo}
                    open={() => setPopover(repo)}
                />
            )}
        </div>

        {Object.keys(popover).length > 0 && 
        <Popover 
            data={popover}
            close={() => setPopover({})}
        />
        }
        </>}
        </>
    )
}

export default Profile