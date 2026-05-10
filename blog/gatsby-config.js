/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

// ADD THIS AT THE VERY TOP
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Harpreet Saini's ITDEV-164 Project`,
    description: `A Gatsby website created for ITDEV-164 Web Development course at Milwaukee Area Technical College`,
    author: `Harpreet Saini`,
    siteUrl: `https://www.harpreetsaini.dev`,
    contact: {
      name: `Harpreet Saini`,
      company: `Milwaukee Area Technical College`,
      address: `700 W State St, Milwaukee, WI 53233`
    }
  },
  plugins: [
    // ===== CONTENTFUL PLUGIN =====
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    // ===== MARKDOWN SUPPORT =====
    `gatsby-transformer-remark`,
    
    // ===== YOUR EXISTING PLUGINS =====
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Harpreet's MATC ITDEV-164 Site`,
        short_name: `ITDEV-164`,
        start_url: `/`,
        background_color: `#1E4D2B`,
        theme_color: `#1E4D2B`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
  ],
}