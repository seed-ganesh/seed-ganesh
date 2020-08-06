import React from "react"
import Magnifier from "react-magnifier"
import PropTypes from "prop-types"

export default function ImageMagnify(props) {
    const { src } = props
    return (
        <div style={{
            cursor: 'pointer',
            background: 'grey',
            margin: 'auto'
        }}>
            <Magnifier
                src={src}
            />
        </div>
    )
}
ImageMagnify.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}
