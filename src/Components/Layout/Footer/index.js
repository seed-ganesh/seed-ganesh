import React from 'react'
import { Link } from 'gatsby'

import addressDetails from '../../../Constants/Address'
import useResize from '../../CustomHooks/useResize'

const Footer = props => {
    const { links, productContentShowableFun } = props
    const isMobile = useResize()
    return (
        <div className="footerContent row">
            <div style={{
                paddingBottom: '20px'
            }} className="col-12 col-sm-12 col-md-12 col-lg-6">
                {links.map(linkContent => linkContent.text === 'Product' ? (
                    <div style={{
                        marginTop: '13px',
                        cursor: 'pointer'
                    }}>
                        <a role="presentation" onClick={productContentShowableFun} style={{
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: '19px',
                            fontFamily: 'Roboto,Arial,sans-serif'
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
                                fontFamily: 'Roboto,Arial,sans-serif'
                            }} to={linkContent.link}>{linkContent.text}</Link>
                        </div>
                    ))}
            </div>
            <div style={{
                textAlign: isMobile ? 'center' : 'initial'
            }} className="col-12 col-sm-12 col-md-12 col-lg-6">
                <div className="divider">
                    <span className="text-center">Contact us</span>
                    <div className="text-center" dangerouslySetInnerHTML={{
                        __html: addressDetails
                    }} className="fullOfficeAdd">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer