import React from 'react'
import styled from '@emotion/styled'

import loading from '../assets/loading.svg'

const Image = styled.img`
    margin: auto auto;
`

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
`

const Loader = () => 
    <Wrapper className='col center'>
        <Image
            src={loading}
            alt='Loading...'
        />
    </Wrapper>

export default Loader