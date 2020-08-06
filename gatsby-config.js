const currentEnv = process.env.GATSBY_ACTIVE_ENV.trim() || 'development'

require('dotenv').config({
  path: `.env.${currentEnv}`
})
const SPACEID = process.env.GATSBY_CONTENTFUL_SPACEID
const ACCESS_TOKEN = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN
const CONTENTFUL_HOST = process.env.GATSBY_CONTENTFUL_HOST

module.exports = {
  /* Your site config here */
  plugins: [`gatsby-plugin-offline`, {
    resolve: 'gatsby-source-contentful',
    options: {
      host: CONTENTFUL_HOST,
      spaceId: SPACEID,
      accessToken: ACCESS_TOKEN
    }
  }],
}

module.exports.plugins.push(
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: 'Ganesha Eco friendly store',
      short_name: `Ganesha Eco Friendly`,
      start_url: `/`,
      background_color: `#FF453C`,
      theme_color: `#070707`,
      display: "standalone",
      icon: `assets/icon/Ganesh.png`,
      legacy: true,
    },
  });

