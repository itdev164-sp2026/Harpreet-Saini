import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const StyledHeader = styled.header`
  background: ${props => props.theme.header.background};
  margin-bottom: 1.45rem;
`

const StyledDiv = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const StyledHeading = styled.h1`
  margin: 0;
`

const StyledLink = styled(Link)`
  color: ${props => props.theme.header.fontColor};
  text-decoration: none;
`

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <StyledDiv>
      <StyledHeading>
        <StyledLink to="/">
          {siteTitle}
        </StyledLink>
      </StyledHeading>
    </StyledDiv>
  </StyledHeader>
)

export default Header