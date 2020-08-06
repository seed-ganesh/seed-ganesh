import React, { Fragment } from 'react'
import useResize from '../CustomHooks/useResize'

const Banner = props => {
    const isMobile = useResize()
    const { desktopImage, smartPhoneImage, height } = props
  
    return (
        <Fragment>
            {isMobile ? <img style={{
                width: '100%',
                maxHeight: `${height}`
            }} alt="mobileAltImage" src={smartPhoneImage && smartPhoneImage.file && smartPhoneImage.file.url} /> :
                <img style={{
                    width: '100%',
                    maxHeight: `${height}`
                }} alt="mobileAltImage" src={desktopImage && desktopImage.file && desktopImage.file.url} />}
        </Fragment>
    )
}


export default Banner