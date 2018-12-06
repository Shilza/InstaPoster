import React from "react";

class Carousel extends React.Component {

    componentDidMount() {
        let prefix = 'devices-slider-checker-';
        let id = 0;

        let timerId = setInterval(function () {
            for (let i = 0; i < 3; i++) {

                if (document.getElementById(prefix + i).checked) {
                    document.getElementById(prefix + i).checked = false;
                    id = ++i;

                    if (id === 3)
                        id = 0;
                    document.getElementById(prefix + id).checked = true;
                    return;
                }
            }
        }, 1500);
    }

    componentWillUnmount() {
        document.getElementById("stop").onclick = () => clearInterval(timerId);
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <div className="carousel-slider">
                    <input type="radio" id="devices-slider-checker-0" name="carousel-slider" title="Slide 1"
                           checked="checked"
                           className="carousel-slider__nav"/>
                    <input type="radio" id="devices-slider-checker-1" name="carousel-slider" title="Slide 2"
                           className="carousel-slider__nav"/>
                    <input type="radio" id="devices-slider-checker-2" name="carousel-slider" title="Slide 3"
                           className="carousel-slider__nav"/>
                    <div className="carousel_slider__inner">
                        {
                            this.props.children.map((device, index) => {
                                return (
                                    <div className="carousel_slider__contents" key={index}>
                                        {device}
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Carousel;