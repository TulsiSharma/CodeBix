import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Inputbox extends React.Component{
    inputref=React.createRef();
    handleclick=(event)=>{
        this.props.toggle();
        this.props.updateinputdata(this.inputref.current.value);
    }
    render(){
      const  input = !this.props.inputdata.length?"":this.props.inputdata;
        return(
            <div>
                <Modal isOpen={this.props.model}>
                    <ModalHeader toggle={this.props.toggle} charCode="X">Custom Inputs</ModalHeader>
                    <ModalBody style={{paddingLeft:"10px",paddingRight:"10px",paddingTop:"10px",paddingBottom:"4px"}}>
                        <textarea id="inputbox" defaultValue={input} placeholder="write your input here.." ref={this.inputref}>

                        
                        </textarea>
                    </ModalBody>
                    <ModalFooter>
                        <Button  color="secondary" onClick={this.handleclick}>Save</Button>
                    </ModalFooter>
                </Modal>
          </div>
        );
    }
}

export default Inputbox;