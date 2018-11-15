import FormItem from "antd/es/form/FormItem";
import Form from "antd/es/form/Form";
import React from "react";
import TextArea from "antd/es/input/TextArea";
import {connect} from "react-redux";

const ProfileInfo = ({getFieldDecorator, instagramProfiles}) => {
    const login = instagramProfiles[instagramProfiles.length-1].login;
    return (
        <div id='comment-container'>
            <div id='comment-profile-container'>
                <img id='comment-profile-image'
                     src={'https://pp.userapi.com/c844617/v844617683/f8d9c/lKSt8v-NIyQ.jpg?ava=1'}/>
                <a href={'https://instagram.com/' + login}
                   target='_blank'>{login}</a>
            </div>
            <Form>
                <FormItem>
                    {getFieldDecorator('comment', {
                        rules: [{
                            max: 1000, message: 'Comment should not exceed 1000 characters!'
                        }]
                    })(
                        <TextArea autosize={{minRows: 7, maxRows: 7}} placeholder="Your text"/>
                    )}
                </FormItem>
            </Form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        instagramProfiles: state.Auth.instagramProfiles
    }
};

export default connect(mapStateToProps)(ProfileInfo);