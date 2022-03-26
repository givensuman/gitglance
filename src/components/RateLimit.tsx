import React from 'react'
import styled from '@emotion/styled'

interface Props {
    data: {
        limit: number,
        remaining: number
    }
}

const Value = styled.h1`
    margin: 0;
`

const Wrapper = styled.div`
    position: absolute;
    top: 15px;
    left: 50px;
`

const RateLimit = ({ data }: Props) => {

    return (
        <Wrapper className='col center'>

        <Value className='flex center'>
            {data?.remaining}/{data?.limit}
        </Value>
        <span>requests remaining</span>

        </Wrapper>
    )
}

export default RateLimit