import React from "react"
import {Collapse} from "reactstrap";
import { Spinner } from 'reactstrap';

class Output extends React.Component{
    render(){
        const spinner= <div style={{width:"100%",textAlign:"center",paddingTop:"40px",paddingBottom:"30px",marginTop:"30px",marginBottom:"30px"}}>
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow"/></div>
        const showoutput= this.props.output?<div className="outputarea" style={{height:"auto"}}>
        <h6>CPU Time : {this.props.output.cpuTime!==null?this.props.output.cpuTime:"?"} </h6>
        <h6>Memory : {this.props.output.memory!==null?this.props.output.memory:"?"}</h6>
        <h6>OUTPUT :</h6>                        
        <textarea readOnly className="outputarea scrollbar" style={{resize:"none", height:"260px",scrollBehavior:"smooth",color:this.props.output.memory===null && this.props.output.cpuTime===null?"red":"black"}} defaultValue={this.props.output.output}></textarea>
        </div>:null;
        return(
            <Collapse isOpen={this.props.isoutput} style={{transitionDelay:"10s"}} >
                <div className="outputbox" style={{marginBottom:"20px"}}>
                    <div className="header">
                        <h4 style={{fontWeight:"300"}}>Output</h4>
                    </div>
                    {this.props.output===null?spinner:showoutput}
                </div>
            </Collapse>
        );
    }
}
export default Output;