import React from "react";
import {connect} from "react-redux";
import MiniPic from "./MiniPic";

const Slider = ({images}) => {

    return (
        <div className='slider'>
            {
                images.map((item, index) => {
                    return <MiniPic key={item.id} item={item} checked={images.length - 1 === index}/>
                })
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        images: state.Images.images,
    }
};

export default connect(mapStateToProps)(Slider);