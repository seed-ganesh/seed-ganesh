import React, { useState } from 'react'
import Slider from 'react-slick'
import Banner from '../Banner'

const Carousal = props => {
    const [currentThumbIndex, setCurrentThumbIndex] = useState(0)
    const { carousalData, settings, height, isProductCarousal, currentImageCallback } = props

    const currentThumb = index => {
        if (currentImageCallback) {
            currentImageCallback(index)
        }
        setCurrentThumbIndex(index)
    }
    return (
        <Slider {...settings}>
            {carousalData.map((carousal, index) => {
                return (
                    <div role="presentation" onClick={isProductCarousal ? () => currentThumb(index) : () => { }} className={(isProductCarousal && currentThumbIndex === index) ? 'border-thumb' : ''}>
                        <Banner {...{
                            height: height,
                            desktopImage: carousal.desktopImage,
                            smartPhoneImage: carousal.mobileImage,
                            isProductCarousal: isProductCarousal
                        }} />
                    </div>
                )
            })}
        </Slider>
    )
}

export default Carousal