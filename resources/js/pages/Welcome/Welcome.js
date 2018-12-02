import React, {Fragment} from "react";
import InstTel from '../../../../public/images/telephone.png'
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Card from "antd/es/card/index";
import Meta from "antd/es/card/Meta";
import Login from "./Login";

class Welcome extends React.Component {
    render() {
        return (
            <Fragment>
                <div className='telephone-login'>
                    <img id="telephone-login" src={InstTel}/>
                    <Card style={{borderRadius: '2%', height: '40%', margin: '3%'}}>
                        {this.props.children}
                    </Card>
                </div>
                <Other/>
            </Fragment>
        )
    }
}

const Other = () => {
    return (
        <Fragment>
            <div className='text-divider'>
                <h1>Best Instagram scheduler</h1>
                <p>Because we DO IT</p>
            </div>
            <Row type="flex" justify="center" className='info-card'>
                <Col span={4}>
                    <Card
                        hoverable
                        style={{width: 240}}
                        cover={<img alt="example"
                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                    >
                        <Meta
                            title="Europe Street beat"
                            description="www.instagram.com"
                        />
                    </Card>
                </Col>
                <Col span={4} offset={2}>
                    <Card
                        hoverable
                        style={{width: 240}}
                        cover={<img alt="example"
                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                    >
                        <Meta
                            title="Europe Street beat"
                            description="www.instagram.com"
                        />
                    </Card>
                </Col>
                <Col span={4} offset={2}>
                    <Card
                        hoverable
                        style={{width: 240}}
                        cover={<img alt="example"
                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                    >
                        <Meta
                            title="Europe Street beat"
                            description="www.instagram.com"
                        />
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

Welcome.defaultProps = {
    children: <Login/>
};

export default Welcome;