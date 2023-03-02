import React from 'react'

const Image = ({
    src,
    imageContent,
    image
}) => {
    return (
        <div className={`${imageContent}`}>
            <img
                src={src}
                className='w-full h-full'
            />
        </div>
    )
}

export default Image
