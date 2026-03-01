import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

// Create styled components
const StyledHeader = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
  margin: 0 auto;
  padding: var(--space-4) var(--size-gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledLink = styled(Link)`
  font-size: var(--font-sm);
  text-decoration: none;
  color: white;
`

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <StyledLink to="/">
      {siteTitle}
    </StyledLink>
    {/* Image removed as per instructions */}
  </StyledHeader>
)

export default Header