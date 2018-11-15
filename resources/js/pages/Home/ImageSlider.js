import React from "react";
import Slider from "./Slider";
import MainShownImage from "./MainShownImage";
import UploadSubmit from "./UploadSubmit";


const ImageSlider = () => {
    return (
        <div className='sliderImages'>
            <MainShownImage/>
            <Slider/>
            <UploadSubmit/>
        </div>
    );
};

export default ImageSlider;