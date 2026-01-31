import * as React from 'react'
import { graphql } from 'gatsby'

const AboutPage = ({ data }) => {
  const siteMetadata = data.site.siteMetadata
  
  return (
    <main>
      <h1>About {siteMetadata.title}</h1>
      <p>{siteMetadata.description}</p>
      <p>Contact: {siteMetadata.contact.name}</p>
      <p>Company: {siteMetadata.contact.company}</p>
    </main>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        contact {
          name
          company
        }
      }
    }
  }
`

export default AboutPage