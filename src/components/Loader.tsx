import React from 'react'
import styled from '@emotion/styled'

import loading from '../assets/loading.svg'

const Image = styled.img`
    margin: auto auto;
`

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
`

const Loader = () => 
    <Wrapper className='col center'>
        <Image
            src={loading}
            alt='Loading...'
        />
    </Wrapper>

export default Loader