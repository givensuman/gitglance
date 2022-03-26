import React from 'react'
import styled from '@emotion/styled'

import loadingalt from '../assets/loadingalt.svg'

const Wrapper = styled.div`
    width: 100%;
    height: 300px;
`

const Image = styled.img`
    margin: auto auto;
`

const LoaderAlt = () => 
    <Wrapper className='row center'>
        <Image
            src={loadingalt}
            alt='Loading...'
        />
    </Wrapper>

export default LoaderAlt