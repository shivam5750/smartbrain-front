import React from 'react';
import './FaceRecoginition.css'

const FaceRecoginition = ({imageSrc,box}) => {
    return (
        <div className=' ma center'>
            <div className='absolute mt2'>
                <img id="inputImage" width='500px' height='auto' alt="prediction-pic" src={imageSrc} />
                <div  className="bounding-box"  style={{top: box.topRow, right: box.rightcol, bottom: box.bottomRow, left: box.leftcol}}></div>
            </div>
        </div>
    )
}

export default FaceRecoginition;