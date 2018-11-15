import React from "react";
import SubmitAll from "./SubmitAll";
import Loader from "../Loader/Loader";
import SliderLoader from "../Loader/SliderLoader";

const UploadSubmit = () => {
    return (
        <div className='upload-submit'>
            <Loader>
                <SliderLoader/>
            </Loader>
            <SubmitAll/>
        </div>
    );
};

export default UploadSubmit;