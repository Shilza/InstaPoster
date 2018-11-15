import React from "react";
import Icon from "antd/es/icon/index";
import {bindActionCreators} from "redux";
import * as action from "../../store/actions";
import {connect} from "react-redux";

class MiniPicActions extends React.Component {
    constructor(props) {
        super(props);

        this.idWatch = 'mini-pic-action-watch';
        this.idRemove = 'mini-pic-action-remove';
        this.remove = this.remove.bind(this);
    }

    remove() {
        const {removeImage, image} = this.props;
        removeImage(image);

    }

    render() {
        return (
            <div className='mini-pic-darkener' onClick={this.props.onWatch}>
                <Icon
                    id={this.idWatch}
                    className='slider-mini-pic-icons'
                    type='eye'
                    theme='outlined'
                />
                <Icon
                    id={this.idRemove}
                    className='slider-mini-pic-icons'
                    type='delete'
                    theme='outlined'
                    onClick={this.remove}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setShownImage: action.setShownImage,
        removeImage: action.removeImage
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(MiniPicActions);