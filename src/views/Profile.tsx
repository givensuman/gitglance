import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import GhPolyglot from 'gh-polyglot'

import User from '../components/User'
import Repo from '../components/Repo'
import Popover from '../components/Popover'
import Loader from '../components/Loader'
import LoaderAlt from '../components/LoaderAlt'
import RateLimit from '../components/RateLimit'
import Languages from '../components/Languages'
import Icon from '../components/Icon'

interface Props {
    handleError: (value: number) => void
}

const Profile = ({ handleError }: Props) => {

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
                .then(data => {
                    if (data?.message === 'Not Found') {
                        handleError(404)
                        navigate('/')
                        return '404'
                    } else if (data?.message && data?.message.substring(0, 8) === 'API rate') {
                        handleError(403)
                        navigate('/')
                        return '403'
                    }
                    setUser(data)
                })
        
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
            let validUser
            setLoading(true)
            await getUser()
                .then(res => {
                    (res === '404' || res === '403') ? 
                        validUser = false : 
                        validUser = true
                })
            if (validUser) {
                handleError(200)
                await getLanguages()
                await getRepos()
                await getRateLimit()
            }
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
        {loading ? <Loader /> : 
        <React.Suspense fallback={null}>
        <Icon 
            icon={faArrowLeft} 
            css={`
                height: 50px;
                cursor: pointer;
                position: absolute;
                top: 15px;
                left: 15px;
            `}
            onClick={() => navigate('/')}
        />

        {/* {Object.keys(rateLimit).length > 0 && <RateLimit data={rateLimit} />} */}

        {Object.keys(user).length > 0 && <User data={user} />}


        {languages.length > 0 ? <Languages data={languages} /> :
        <LoaderAlt />}
        
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
        </React.Suspense>}
        </>
    )
}

export default Profile