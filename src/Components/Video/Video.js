import React from "react"

const Video = props => {
    const { video } = props
    return (
        <div className="videoContainer">
            <div className="videoWrapper">
                <video
                    className="video"
                    playsInline
                    preload='metadata'
                    loop
                    muted
                    controls={true}
                    autoPlay={true}
                    src={video[0].desktopVideo.file.url}
                >
                    <track kind='captions' />
                </video>
            </div>
        </div>
    )
}

export default Video
