import React from "react";
import {Col} from 'reactstrap';
import Editor from "./Editor";
import CustomInputs from "./CustomInputs";
import Inputbox from "./Inputbox";
import Output from "./Output";
import Share from "./Share";
class Leftcomponent extends React.Component{
    state={
        model:false,
        isShare:false
    }

    setshare=()=>{
        this.setState({isShare:!this.state.isShare});
    }
    toggle=()=>{
        if(!this.state.model){
            this.setState({model:true});
        }
        else{
            this.setState({model:false});
        }
    }

    updateinputdata=(val)=>{
        this.props.updateinput(val);
    }

    seteditor=(val)=>{
        this.props.seteditor(val);
    }
    
    render(){
        return(
            <>
                <Share uid={this.props.uid} isShare={this.state.isShare} setshare={this.setshare} path={this.props.path} id={this.props.id} file="files"/>
                <Col lg="9" md="12" sm="12" xs="12">
                    <Editor change_after_no_type={this.props.change_after_no_type} changedata={this.props.changedata} savefile={this.props.savefile} setsignup={this.props.setsignup} uid={this.props.uid} setid={this.props.setid} setoldvalue={this.props.setoldvalue} oldvalue={this.props.oldvalue} setlength={this.props.setlength} length={this.props.length} editor={this.props.editor} seteditor={this.seteditor} toggle={this.props.toggle} setmode={this.props.setmode} setdropdown={this.props.setdropdown} dropdownvalue={this.props.dropdownvalue} issaved={this.props.issaved} setsaved={this.props.setsaved} status={this.props.status} setstatus={this.props.setstatus} setshare={this.setshare} updaterecent={this.props.updaterecent}/>
                    <CustomInputs toggle={this.toggle} Exicutecode={this.props.Exicutecode}/>
                    <Inputbox model={this.state.model} toggle={this.toggle} inputdata={this.props.inputdata} updateinputdata={this.updateinputdata}/>
                    <Output output={this.props.output} isoutput={this.props.isoutput}/>
                </Col>
            </>
        );
    }
}
export default Leftcomponent;