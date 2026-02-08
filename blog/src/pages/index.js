import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  const posts = data.allContentfulBlogPost.nodes

  return (
    <Layout>
      <Seo title="Home" />
      <h1 style={{ color: '#1E4D2B' }}>Harpreet Saini's ITDEV-164 Blog</h1>
      <p style={{ fontSize: '1.1rem' }}>Milwaukee Area Technical College - Web Development Course</p>
      
      <h2 style={{ borderBottom: '2px solid #1E4D2B', paddingBottom: '0.5rem', marginTop: '2rem' }}>
        My Contentful Blog Posts
      </h2>
      
      {posts.length > 0 ? (
        <div style={{ marginTop: '2rem' }}>
          {posts.map((post) => (
            <div 
              key={post.id} 
              style={{ 
                marginBottom: '2rem', 
                padding: '1.5rem', 
                border: '1px solid #ddd', 
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <Link 
                to={`/blog/${post.slug}/`} 
                style={{ 
                  textDecoration: 'none',
                  color: '#1E4D2B'
                }}
              >
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                  {post.title}
                </h3>
              </Link>
              
              {post.description && (
                <p style={{ 
                  color: '#555', 
                  marginBottom: '0.5rem',
                  lineHeight: '1.4'
                }}>
                  {post.description.description}
                </p>
              )}
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                color: '#777',
                fontSize: '0.9rem',
                marginTop: '1rem'
              }}>
                {post.category && (
                  <span>
                    <strong>Category:</strong> {post.category}
                  </span>
                )}
                {post.publishDate && (
                  <span>
                    <strong>Published:</strong> {post.publishDate}
                  </span>
                )}
              </div>
              
              <div style={{ marginTop: '1rem' }}>
                <Link 
                  to={`/blog/${post.slug}/`}
                  style={{
                    color: '#fff',
                    backgroundColor: '#1E4D2B',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}
                >
                  Read Full Post →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          padding: '2rem', 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffeaa7',
          borderRadius: '5px',
          marginTop: '2rem'
        }}>
          <p style={{ margin: 0 }}>
            <strong>No blog posts found.</strong> Please add blog posts in Contentful.
          </p>
        </div>
      )}
      
      <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: '#f0f7f0', borderRadius: '5px' }}>
        <h3>About This Project</h3>
        <p>This is my project for ITDEV-164 Web Development at MATC, demonstrating:</p>
        <ul>
          <li>✅ Gatsby static site generation</li>
          <li>✅ Contentful CMS integration</li>
          <li>✅ GraphQL data querying</li>
          <li>✅ React components</li>
          <li>✅ Dynamic page creation from Contentful</li>
        </ul>
        <p><strong>Contentful Status:</strong> Connected with {posts.length} blog post(s)</p>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulBlogPost(sort: {publishDate: DESC}) {
      nodes {
        id
        title
        slug
        category
        description {
          description
        }
        publishDate(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

export const Head = () => <Seo title="Home" />

export default IndexPage