const path = require(`path`)

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'develop' || stage === 'build-javascript') {
    if (process.env.GATSBY_ENV === 'development') {
      actions.setWebpackConfig({ devtool: 'source-map' })
    }
  }
}
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
            {
              allContentfulHeader {
                edges {
                  node {
                    name
                    logo {
                      name
                      desktopImage {
                        file {
                          url
                        }
                      }
                      mobileImage {
                        file {
                          url
                        }
                      }
                    }
                    links {
                      name
                      link
                      text
                    }
                  }
                }
              }
                allContentfulFooter {
                    edges {
                      node {
                        name
                        links {
                          name
                          link
                          text
                        }
                      }
                    }
                  }
            }
            `).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        const HomePage = path.resolve('./src/templates/HomePage.js')
        const ContactUS = path.resolve('./src/templates/ContactUS.js')

        createPage({
          path: '/',
          component: HomePage,
          context: {
            headerData: result.data.allContentfulHeader.edges[0].node,
            footerData: result.data.allContentfulFooter.edges[0].node
          }
        })

        createPage({
          path: '/contact-us',
          component: ContactUS,
          context: {
            headerData: result.data.allContentfulHeader.edges[0].node,
            footerData: result.data.allContentfulFooter.edges[0].node
          }
        })
      })
    )
  })
}