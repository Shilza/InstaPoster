import * as action from "../../store/actions";
import React, {Fragment} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import MiniPicActions from "./MiniPicActions";
import CheckBox from "antd/es/checkbox/index";

class MiniPic extends React.Component {

    constructor(props) {
        super(props);

        this.onWatch = this.onWatch.bind(this);
        this.checkerRef = React.createRef();
    }

    onWatch() {
        const {item, setShownImage} = this.props;
        this.checkerRef.current.checked = true;

        setShownImage(item);
    }

    componentWillReceiveProps(nextProps) {
        this.checkerRef.current.checked = nextProps.checked;
    }

    render() {
        const {item, checked} = this.props;

        return (
            <Fragment key={item.id}>
                <input type='radio'
                       name="image-switch"
                       ref={this.checkerRef}
                       id={'checker' + item.id}
                       defaultChecked={checked}
                />
                <span className='mini-pic-holder'>
                    <MiniPicActions image={item} onWatch={this.onWatch}/>
                    <img className='mini-pic' src={item.image}/>
                    <CheckBox checked={item.done}/>
                </span>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setShownImage: action.setShownImage
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(MiniPic);