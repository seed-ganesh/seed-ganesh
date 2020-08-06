import React from 'react'
import { Link } from 'gatsby'

const Footer = props => {
    const { links, productContentShowableFun } = props
    return (
        <div className="footerContent">
            <div className="footerColumn">
                {links.map(linkContent => linkContent.text === 'Product' ? (
                    <div style={{
                        marginTop: '13px',
                        cursor: 'pointer'
                    }}>
                        <a role="presentation" onClick={productContentShowableFun} style={{
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: '19px',
                            fontFamily: 'Actor'
                        }} >{linkContent.text}</a>
                    </div>
                ) : (
                        <div style={{
                            marginTop: '13px'
                        }}>
                            <Link style={{
                                color: 'white',
                                fontSize: '19px',
                                textDecoration: 'none',
                                fontFamily: 'Actor'
                            }} to={linkContent.link}>{linkContent.text}</Link>
                        </div>
                    ))}
            </div>
            <div className="footerColumn2">
                <div className="divider">
                    <span className="officeAddress">Office Address:</span>
                    <div className="fullOfficeAdd">
                        XXX, YYY, ZZZ, Chennai-xxx
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer