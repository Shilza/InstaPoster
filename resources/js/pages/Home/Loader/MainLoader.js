import Icon from "antd/es/icon/index";
import React from "react";

const MainLoader = ({uploadRef, emitToLoadLocalImage, disabled}) => {
    return (
        <div className='main-upload-button-holder'>
        <button className="main-upload-button"
                onClick={emitToLoadLocalImage}
                disabled={disabled}
        >
            <Icon type="download"/>
            <div>Upload</div>
            <input type="file"
                   multiple
                   accept=".jpg,.jpeg" style={{display: 'none'}}
                   ref={uploadRef}/>
        </button>
        </div>
    );
};

export default MainLoader;