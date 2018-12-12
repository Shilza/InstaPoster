import React from "react";
import {connect} from "react-redux";
import MiniPic from "./MiniPic";

const Slider = ({images}) => {
    return (
        <div className='slider'>
            {
                images.map((item) => {
                    return <MiniPic key={item.id} item={item} checked={item.shown}/>
                })
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        images: state.images.images,
    }
};

export default connect(mapStateToProps)(Slider);