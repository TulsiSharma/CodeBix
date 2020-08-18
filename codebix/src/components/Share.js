import React from "react"
import { Button, Modal, ModalHeader, ModalBody,InputGroup, InputGroupAddon } from 'reactstrap';
class Share extends React.Component{
    inputRef=React.createRef();
    handleclick=(event)=>{
        const input=this.inputRef.current;
        input.select();
        document.execCommand("copy");
    }
    render(){
        const file1 =`${this.props.path}${this.props.file}/${btoa(this.props.uid)}/${this.props.id}`;
        
        const file2=`${this.props.path}${btoa(this.props.uid)}/${this.props.id}`;
    
        return(
            <div>
                <Modal isOpen={this.props.isShare} toggle={()=>this.props.setshare()}>
                    <ModalHeader toggle={()=>this.props.setshare()} charCode="X">Shareable Link</ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            <input type="text" ref={this.inputRef} style={{width:"75%",height:"40px"}} value={this.props.file?file1:file2}></input>
                            <InputGroupAddon addonType="append">
                                <Button color="secondary" onClick={this.handleclick}>Copy Link</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </ModalBody>
                </Modal>
          </div>
        );
    }
}
export default Share;