import {connect} from "react-redux";
import ImageSideBar from "./ImageSideBar/ImageSideBar";
import React from "react";

const MainShownImage = ({shownNowPic}) => {
    console.log('re-render shownNowPic');

    return (
        <div className='img-flex'>
            <img id='viewedImage' src={shownNowPic.image}/>
            <ImageSideBar shownNowPic={shownNowPic}/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        shownNowPic: state.images.shownNowPic
    };
};

export default connect(mapStateToProps)(MainShownImage);