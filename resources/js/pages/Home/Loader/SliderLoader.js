import Icon from "antd/es/icon/index";
import Button from "antd/es/button/button";
import React from "react";

const SliderLoader = ({uploadRef, emitToLoadLocalImage, disabled}) => {
    return (
        <Button
            onClick={emitToLoadLocalImage}
            disabled={disabled}>
            Upload
            <Icon type="download"/>
            <input type="file"
                   multiple
                   accept=".jpg,.jpeg" style={{display: 'none'}}
                   ref={uploadRef}/>
        </Button>
    );
};

export default SliderLoader;