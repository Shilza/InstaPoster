import {connect} from "react-redux";
import ImageSideBar from "./ImageSideBar/ImageSideBar";
import React from "react";

const MainShownImage = ({shownNowPic}) => {
    return (
        <div className='img-flex'>
            <img id='viewedImage' src={shownNowPic.image}/>
            <ImageSideBar shownNowPic={shownNowPic}/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        shownNowPic: state.Images.shownNowPic
    };
};

export default connect(mapStateToProps)(MainShownImage);