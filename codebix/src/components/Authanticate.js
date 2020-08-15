import React from "react";
import {Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

class Authanticate extends React.Component{
    render(){
        return(
            <div>
                <Modal isOpen={this.props.signup} toggle={()=>this.props.setsignup()}>
                    <ModalHeader style={{background:"whitesmoke"}}>Sign In</ModalHeader>
                    <ModalBody>
                        <div className="signin">
                            <span><Button outline color="secondary" onClick={()=>this.props.authenticate("Google")}><i class="fab fa-google"></i></Button></span>
                            <span><Button outline color="secondary" onClick={()=>this.props.authenticate("Github")}><i class="fab fa-github"></i></Button></span>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Authanticate;