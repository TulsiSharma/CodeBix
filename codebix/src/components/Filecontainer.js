import React from "react";
import { Row} from "reactstrap";
import Savecards from "./Savecards";
import { Spinner } from 'reactstrap';

class Filecontainer extends React.Component{
    handledelete=(ind)=>{
        this.props.handledelete(ind);
    }
    render(){
        if(!this.props.flag){
            return(
            <div className="emptymsg">
                <h4 style={{color:"lightgray"}}>Choose language first.</h4>
            </div>);
        }
        if((this.props.uid===null) || (this.props.result===null && this.props.flag)){
            
            return(
                <div className="emptymsg">
                    <Spinner style={{ width: '4rem', height: '4rem' }} type="grow"/>
                </div>
            );
        }
        if(!Object.keys(this.props.result).length){
            return(<div className="emptymsg"> 
                <h3 style={{color:"lightgray"}}>No Such Files.</h3>
            </div>);

        }
        return(
                <Row>
                   {Object.keys(this.props.result).map(key=>(
                       <Savecards uid={this.props.uid} key={key} ind={key} result={this.props.result} handledelete={this.handledelete} editfile={this.props.editfile} setid={this.props.setid} setshare={this.props.setshare}/> 
                   ))}
                </Row>
        );
    }
}
export default Filecontainer;