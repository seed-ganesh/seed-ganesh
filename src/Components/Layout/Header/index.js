import React, { useState } from 'react'
import { Link } from "gatsby"
import useResize from '../../CustomHooks/useResize'

const Header = props => {
    const [hamClass, setHamClass] = useState('')
    const isMobile = useResize()
    const { logo, links, productContentShowableFun, isContactUs, buyNowClick, navBarClass } = props
    const productMenuClick = () => {
        buyNowClick('home')
        setHamClass('')
        productContentShowableFun()
    }
    return (
        <div className={navBarClass}>
            <div className="logo">
                <Link to="/" onClick={() => buyNowClick('home')}>
                    <img className={hamClass.length > 0 ? `${hamClass}Logo` : "logoAnchor"} src={logo.desktopImage && logo.desktopImage.file && logo.desktopImage.file.url} alt="logo" />
                </Link>
            </div>
            <div className="navbar">
                <div role="presentation" className="icon-bar" onClick={() => setHamClass('_Menus-show')}>
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <ul id="nav-lists" className={hamClass}>
                    <li role="presentation" className="closeIcon" onClick={() => setHamClass('')}><span>×</span></li>
                    {isMobile ? (
                        <>
                            {links.map(linkContent => linkContent.text === 'Product' && !isContactUs ? (
                                <li><a role="presentation" style={{
                                    fontSize: '19px',
                                    fontFamily: 'Actor'
                                }} onClick={productMenuClick}>{linkContent.text}</a></li>
                            ) : !isContactUs && (
                                <li><Link onClick={() => setHamClass('')} style={{
                                    fontSize: '19px',
                                    fontFamily: 'Actor'
                                }} to={linkContent.link}>{linkContent.text}</Link></li>
                            ))}
                        </>
                    ) : (
                            <>
                                {links.map(linkContent => linkContent.text === 'Product' ? (
                                    <li><a style={{
                                        fontSize: '19px',
                                        fontFamily: 'Actor'
                                    }} onClick={productMenuClick}>{linkContent.text}</a></li>
                                ) : (
                                        <li><Link onClick={() => setHamClass('')} style={{
                                            fontSize: '19px',
                                            fontFamily: 'Actor'
                                        }} to={linkContent.link}>{linkContent.text}</Link></li>
                                    )
                                )}
                            </>
                        )}
                </ul>
            </div>
        </div>
    )
}

export default Header