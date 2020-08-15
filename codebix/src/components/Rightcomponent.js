import React from"react";
import {Col} from 'reactstrap';
import Modebutton from "./Modebuttons";

class Rightcomponent extends React.Component{
    render(){
        if(this.props.recent===null){
            return null;
        }
        return(
            <Col lg="3" md="12" sm="12" xs="12">
                <Modebutton recent={this.props.recent} editrecent={this.props.editrecent}/>
            </Col>
        );
    }
}
export default Rightcomponent;