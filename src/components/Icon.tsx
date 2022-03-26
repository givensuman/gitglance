import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
    css?: string
}

const Icon = styled(FontAwesomeIcon)<Props>`
    ${props => props.css}
`

export default Icon