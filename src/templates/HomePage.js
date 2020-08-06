import React, { useRef, useState } from 'react'
import { graphql } from 'gatsby'
import Layout from '../Components/Layout'
import ProductImageGallery from '../Components/ProductImageGallery'
import Video from '../Components/Video/Video'
import useResize from '../Components/CustomHooks/useResize'
import Cart from '../Components/Checkout'


const HomePage = props => {
  const { pathContext, data } = props
  const { contentfulHomePage } = data
  const [checkoutDetails, setCheckoutDetails] = useState({ checkoutData: null })
  const [checkoutPage, setCheckoutPage] = useState(false)
  const isMobile = useResize()
  const productRef = useRef()

  const downIconClick = () => {
    let userAgentString = navigator.userAgent
    let IExplorerAgent = userAgentString.indexOf("MSIE") > -1 || userAgentString.indexOf("rv:") > -1
    if (IExplorerAgent === true) {
      window.scrollTo(0, productRef.current.offsetTop - 70)
    }
    else {
      productRef.current
        .scrollIntoView({
          behavior: "smooth"
        })
    }
  }

  const buyNowClick = (type, cartProductData) => {
    if (type === 'home') {
      setCheckoutPage(false)
    } else {
      setCheckoutDetails(() => ({
        checkoutData: cartProductData,
      }))
      setCheckoutPage(true)
      localStorage.setItem('productInfo', JSON.stringify(cartProductData))
    }
  }

  return (
    <Layout buyNowClick={buyNowClick} isMobile={isMobile} productRef={productRef} {...pathContext} >
      {checkoutPage ? (
        <div className="checkoutContainer">
          <Cart COD={contentfulHomePage.cod} homeClick={buyNowClick} {...checkoutDetails.checkoutData} />
        </div>
      ) : (
          <div style={{
            position: 'relative'
          }}>
            <div style={{
              position: 'relative'
            }}>
              <Video {...contentfulHomePage} />
              {!isMobile && (
                <div className="downIcon">
                  <div role="presentation" onClick={downIconClick} class="arrows" />
                </div>)}
            </div>
            <div ref={productRef} className="productRow">
              <ProductImageGallery buyNowClick={buyNowClick} {...contentfulHomePage} />
            </div>
          </div>
        )}
    </Layout>
  )
}

export const pageQuery = graphql`
    query HomePage {
        contentfulHomePage {
            cod
            name
            video {
              name
              mobileVideo {
                file {
                  url
                }
              }
              desktopVideo {
                file {
                  url
                }
              }
            }
            products {
                name
                productTitle
                productVariant {
                  ... on ContentfulVariant {
                    variantName
                    isNotAvailable
                    productPrice
                    variantImages {
                      mobileImage {
                        file {
                          url
                        }
                      }
                      desktopImage {
                        file {
                          url
                        }
                      }
                    }
                  }
                }
              }
            carousal {
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
        }
    }
`

export default HomePage