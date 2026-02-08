const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // 1. Keep the existing DSG page (optional, you can remove if you don't need it)
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })

  // 2. Add Contentful blog posts pages
  try {
    // GraphQL query to fetch id and slug from Contentful
    const result = await graphql(`
      query {
        allContentfulBlogPost {
          nodes {
            id
            slug
          }
        }
      }
    `)

    // Check for errors
    if (result.errors) {
      console.error("Error creating pages:", result.errors)
      return
    }

    // Create a page for each blog post
    const posts = result.data.allContentfulBlogPost.nodes
    
    posts.forEach(node => {
      createPage({
        path: `/blog/${node.slug}/`,
        component: path.resolve("./src/templates/blog-post.js"),
        context: {
          id: node.id,
        },
      })
    })

    console.log(`✅ Created ${posts.length} blog post pages from Contentful`)
  } catch (error) {
    console.error("Error in createPages:", error)
  }
}