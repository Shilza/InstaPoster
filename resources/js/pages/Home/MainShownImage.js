import {connect} from "react-redux";
import ImageSideBar from "./ImageSideBar/ImageSideBar";
import {getShownImage} from "../../store/selectors/images";
import React from "react";

const MainShownImage = ({shown}) => {
    return (
        <div className='img-flex'>
            <img id='viewedImage' src={shown.image}/>
            <ImageSideBar shownNowPic={shown}/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        shown: getShownImage(state)
    };
};

export default connect(mapStateToProps)(MainShownImage);