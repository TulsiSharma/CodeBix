import React from "react";
import {Row, Col} from "reactstrap";
import Cards from "./Cards";
class Modebutton extends React.Component{
    render(){
        return(
            <div className="right-wrapper">
                <div style={{textAlign:"right"}}>
                    <h4 style={{color:"grey",fontWeight:"300"}}>
                        Recents
                    </h4>
                </div>
                <hr></hr>
                <Row>
                    {Object.keys(this.props.recent).map((key)=>(
                        <>
                        <Cards key={key} ind={key} recent={this.props.recent} editrecent={this.props.editrecent}/>
                        <Col md="3" sm="2"></Col>

                        </>
                    ))
                    }
                    
                </Row>
                
            </div>
        );
    }
}
export default Modebutton;