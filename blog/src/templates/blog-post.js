import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const BlogPost = ({ data }) => {
  const post = data.contentfulBlogPost
  
  return (
    <Layout>
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ color: '#1E4D2B' }}>{post.title}</h1>
        
        <div style={{ color: '#666', marginBottom: '2rem' }}>
          {post.category && (
            <span style={{ fontWeight: 'bold' }}>Category:</span> 
          )}
          {post.category} 
          {post.publishDate && (
            <>
              <span style={{ fontWeight: 'bold', marginLeft: '1rem' }}>Published:</span> {post.publishDate}
            </>
          )}
        </div>
        
        {post.description && (
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '1rem', 
            borderRadius: '5px',
            marginBottom: '2rem',
            fontStyle: 'italic'
          }}>
            {post.description.description}
          </div>
        )}
        
        {post.body && post.body.body && (
          <div style={{ 
            lineHeight: '1.6',
            fontSize: '1.1rem'
          }}>
            {post.body.body.split('\n').map((paragraph, index) => (
              <p key={index} style={{ marginBottom: '1.5rem' }}>
                {paragraph}
              </p>
            ))}
          </div>
        )}
        
        {post.tags && post.tags.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <strong>Tags:</strong> {post.tags.join(', ')}
          </div>
        )}
        
        <div style={{ marginTop: '3rem', paddingTop: '1rem', borderTop: '1px solid #ddd' }}>
          <a href="/" style={{ color: '#1E4D2B', textDecoration: 'none' }}>
            ← Back to all posts
          </a>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      slug
      category
      publishDate(formatString: "MMMM DD, YYYY")
      description {
        description
      }
      body {
        body
      }
      tags
    }
  }
`

export default BlogPost