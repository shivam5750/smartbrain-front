import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonClick }) => {
    return (
        <div>
            <p className="f3 dim">
                {'This is a Magic Brain that will detect your face. Give it a try! '}
            </p>
            <div className="center">
                <div className=" pa4 br3 shadow-2 center form">
                    <input type='tex' className="f4 pa2 w-70 center" onChange={onInputChange} />
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonClick}>Search</button>
                </div>
            </div>
        </div>
    )
}
 
export default ImageLinkForm;