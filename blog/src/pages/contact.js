import * as React from 'react'
import { graphql } from 'gatsby'

const ContactPage = ({ data }) => {
  const contactInfo = data.site.siteMetadata.contact
  
  return (
    <main>
      <h1>Contact Us</h1>
      <h2>{contactInfo.name}</h2>
      <p><strong>Company:</strong> {contactInfo.company}</p>
      <p><strong>Address:</strong> {contactInfo.address}</p>
    </main>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        contact {
          name
          company
          address
        }
      }
    }
  }
`

export default ContactPage