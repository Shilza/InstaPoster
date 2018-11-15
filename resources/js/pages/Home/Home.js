import React, {Fragment} from "react";
import ImageSlider from "./ImageSlider";
import Loader from './Loader/Loader';
import {connect} from "react-redux";
import MainLoader from "./Loader/MainLoader";

const Home = ({images}) => {
    return (
        <Fragment>
            {
                images.length > 0 ? <ImageSlider/> :
                    <Loader>
                        <MainLoader/>
                    </Loader>
            }
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        images: state.images.images
    };
};

export default connect(mapStateToProps)(Home);