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
          <article key={post.slug} style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
            <h2>
              <Link to={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            
            {/* Display hero image if it exists */}
            {post.heroImage && (
              <GatsbyImage
                image={post.heroImage.gatsbyImageData}
                alt={post.title}
                style={{ marginBottom: '1rem' }}
              />
            )}
            
            {/* Display description if it exists */}
            {post.description && (
              <p><strong>Description:</strong> {post.description.description}</p>
            )}
            
            {/* Display excerpt if it exists */}
            {post.body?.childMarkdownRemark?.excerpt && (
              <div>
                <p>{post.body.childMarkdownRemark.excerpt}</p>
                <Link to={`/blog/${post.slug}`}>Read more →</Link>
              </div>
            )}
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

// CORRECTED QUERY - NO extra braces, using nodes instead of edges
export const query = graphql`
  query {
    allContentfulBlogPost {
      nodes {
        title
        slug
        heroImage {
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

export const Head = () => <Seo title="Home" />

export default IndexPage