import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import 'bootswatch/dist/lux/bootstrap.css'

import Header from './Header'
import Footer from './Footer'

const Layout = props => {
    const { children, isMobile, isContactUs, buyNowClick, productRef, headerData, footerData } = props
    const [navBarClass, setNavBarClass] = useState('containers')
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    const handleScroll = () => {
        if (window && window.pageYOffset > 0) {
            setNavBarClass('containerMobile')
        } else {
            setNavBarClass('containers')
        }
    }
    const productContentShowableFun = () => {
        let userAgentString = navigator.userAgent
        let IExplorerAgent = userAgentString.indexOf("MSIE") > -1 || userAgentString.indexOf("rv:") > -1
        if (IExplorerAgent === true) {
            window.scrollTo(0, productRef.current.offsetTop - 70)
        }
        else {
            productRef && productRef.current && productRef.current
                .scrollIntoView({
                    behavior: "smooth"
                })
        }
    }
    return (
        <React.Fragment>
            <Helmet>
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                <script src='https://kit.fontawesome.com/a076d05399.js'></script>
                <link href='https://fonts.googleapis.com/css?family=Actor' rel='stylesheet'></link>
            </Helmet>
            <Header isContactUs={isContactUs} buyNowClick={buyNowClick} productContentShowableFun={productContentShowableFun} isMobile={isMobile} navBarClass={navBarClass} {...headerData} />
            {children}
            <Footer productContentShowableFun={productContentShowableFun} {...footerData} />
        </React.Fragment>
    )
}

export default Layout