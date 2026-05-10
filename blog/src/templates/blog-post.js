import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"

const BlogPost = ({ data }) => {
  const { title, body, heroImage, description } = data.contentfulBlogPost
  
  return (
    <Layout>
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1>{title}</h1>
        
        {/* Display hero image if it exists */}
        {heroImage && heroImage.gatsbyImageData && (
          <GatsbyImage
            image={heroImage.gatsbyImageData}
            alt={title}
            style={{ marginBottom: '2rem' }}
          />
        )}
        
        {/* Display description if it exists */}
        {description && description.description && (
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '1rem', 
            borderRadius: '4px', 
            marginBottom: '2rem' 
          }}>
            <p><strong>Description:</strong> {description.description}</p>
          </div>
        )}
        
        {/* Display the body HTML */}
        {body && body.childMarkdownRemark && body.childMarkdownRemark.html && (
          <div 
            dangerouslySetInnerHTML={{
              __html: body.childMarkdownRemark.html
            }}
            style={{ 
              lineHeight: '1.6',
              fontFamily: 'Arial, sans-serif'
            }}
          />
        )}
      </article>
    </Layout>
  )
}

// This query matches what you tested in GraphiQL
export const pageQuery = graphql`
  query blogPostQuery($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      heroImage {
        gatsbyImageData(
          layout: CONSTRAINED
          placeholder: BLURRED
          width: 800
        )
      }
      description {
        description
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default BlogPost