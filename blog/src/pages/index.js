import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  // Log the data to see what fields are available
  console.log("Contentful data:", data)
  
  return (
    <Layout>
      <h1>Blog Posts</h1>
      
      {data.allContentfulBlogPost.nodes.map(post => {
        // Log each post to see its structure
        console.log("Post:", post)
        
        return (
          <article key={post.slug} style={{ marginBottom: '2rem' }}>
            <h2>
              <Link to={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            
            {/* Check for different possible image field names */}
            {post.heroImage && (
              <GatsbyImage
                image={post.heroImage.gatsbyImageData}
                alt={post.title}
              />
            )}
            
            {post.image && (
              <GatsbyImage
                image={post.image.gatsbyImageData}
                alt={post.title}
              />
            )}
            
            {post.featuredImage && (
              <GatsbyImage
                image={post.featuredImage.gatsbyImageData}
                alt={post.title}
              />
            )}
            
            {/* Display description if it exists */}
            {post.description && (
              <p>{post.description.description}</p>
            )}
            
            {/* Display excerpt if it exists */}
            {post.body?.childMarkdownRemark?.excerpt && (
              <p>{post.body.childMarkdownRemark.excerpt}</p>
            )}
            
            <hr />
          </article>
        )
      })}
      
      {/* Show a message if no blog posts */}
      {data.allContentfulBlogPost.nodes.length === 0 && (
        <p>No blog posts found. Add some in Contentful!</p>
      )}
    </Layout>
  )
}

// GraphQL query to fetch blog posts
export const query = graphql`
  query {
    allContentfulBlogPost {
      nodes {
        title
        slug
        # Try different possible image field names
        heroImage {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            width: 300
          )
        }
        image {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            width: 300
          )
        }
        featuredImage {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            width: 300
          )
        }
        description {
          description
        }
        body {
          childMarkdownRemark {
            excerpt(pruneLength: 200)
          }
        }
      }
    }
  }
`

/**
 * Head export to define metadata for the page
 */
export const Head = () => <Seo title="Home" />

export default IndexPage