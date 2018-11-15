import React from "react";
import SubmitErrorModal from "./SubmitErrorModal";
import Loader from "./Loader/Loader";
import SliderLoader from "./Loader/SliderLoader";

const UploadSubmit = () => {
    return (
        <div className='upload-submit'>
            <Loader>
                <SliderLoader/>
            </Loader>
            <SubmitErrorModal/>
        </div>
    );
};

export default UploadSubmit;