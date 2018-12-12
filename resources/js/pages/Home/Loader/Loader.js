import {bindActionCreators} from "redux";
import * as action from "../../../store/actions";
import {connect} from "react-redux";
import {Component} from "react";
import * as React from "react";

class Loader extends Component{

    constructor() {
        super();

        this.maxImages = 10;

        this.localOnLoad = this.localOnLoad.bind(this);
        this.emitToLoadLocalImage = this.emitToLoadLocalImage.bind(this);
        this.uploadRef = React.createRef();
    }

    setImages(item){
        const {images, addToImages} = this.props;

        if (images.length < this.maxImages)
            addToImages(item);
    }

    localOnLoad(event) {
        const files = event.target.files;

        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (!file.type.match('image')) continue;

            let picReader = new FileReader();
            picReader.onload = event => this.setImages(event.target.result);
            picReader.readAsDataURL(file);
        }
    }

    emitToLoadLocalImage() {
        this.uploadRef.current.click();
    }

    componentDidMount() {
        this.uploadRef.current.onchange = event => this.localOnLoad(event);
    }

    render(){
        const {children, images} = this.props;
        const disabled = images.length >= this.maxImages;

        return React.cloneElement(children, {
            disabled,
            emitToLoadLocalImage: this.emitToLoadLocalImage,
            uploadRef: this.uploadRef
        });
    }
}

const mapStateToProps = state => {
    return {
        images: state.images.images
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        addToImages: action.setImages
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);