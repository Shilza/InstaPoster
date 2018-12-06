import React, {Fragment} from "react";
import InstTel from '../../../../public/images/telephone.png'
import Macbook from '../../../../public/images/macbook.png'
import Imac from '../../../../public/images/imac.png'
import Ipad from '../../../../public/images/ipad-1.png'
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Card from "antd/es/card/index";
import Meta from "antd/es/card/Meta";
import Login from "./Login";
import Carousel from "../../common/Carousel";

class Welcome extends React.Component {
    render() {
        return (
            <div style={{height: '100%'}}>
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <div className='telephone-login'>
                        <img id="telephone-login" src={InstTel}/>
                        <Card id='main-card'>
                            {this.props.children}
                        </Card>
                    </div>
                </div>
                <span>InstaPoster on different devices</span>
                <Devices/>
            </div>

        )
    }
}

const Devices = () => {
    return (
        <Carousel>
            <Fragment>
                <h2 className="carousel-slider__caption">Desktop</h2>
                <img className="carousel_slider__image" src={Imac}/>
            </Fragment>
            <Fragment>
                <h2 className="carousel-slider__caption">Tablet</h2>
                <img className="carousel_slider__image" src={Ipad}/>
            </Fragment>
            <Fragment>
                <h2 className="carousel-slider__caption">Notebook</h2>
                <img className="carousel_slider__image" src={Macbook}/>
            </Fragment>
        </Carousel>
    );
};

Welcome.defaultProps = {
    children: <Login/>
};

export default Welcome;