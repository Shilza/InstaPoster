import React, {Fragment} from "react";
import InstTel from '../../../../public/images/telephone.png'
import Laptop from '../../../../public/images/laptop.png'
import Desktop from '../../../../public/images/desktop.png'
import Tablet from '../../../../public/images/tablet.png'
import Card from "antd/es/card/index";
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
                <img className="carousel-slider__image" src={Desktop}/>
            </Fragment>
            <Fragment>
                <h2 className="carousel-slider__caption">Laptop</h2>
                <img className="carousel-slider__image" src={Laptop}/>
            </Fragment>
            <Fragment>
                <h2 className="carousel-slider__caption">Tablet</h2>
                <img className="carousel-slider__image" src={Tablet}/>
            </Fragment>
        </Carousel>
    );
};

Welcome.defaultProps = {
    children: <Login/>
};

export default Welcome;