import React from "react";
import {Modal, ModalHeader, ModalBody} from 'reactstrap';

class About extends React.Component{
    render(){
        return(
            <div>
                <Modal isOpen={this.props.about} modalTransition={{ timeout: 600 }} backdropTransition={{ timeout: 1100 }}
                    toggle={this.props.setabout}>
                    <ModalHeader toggle={this.props.setabout}><i className="fas fa-code"></i> CodeBix</ModalHeader>
                    <ModalBody>
                        <p>
                        CodeBix is an online compiler and editor which will make you easily edit and compile your code as well as same as saved to the database, which you can easily retrieve any time.
                        </p>
                        Features:-<br></br>
                        1). Customize its editor.<br></br>
                        2). Save your files.<br></br>
                        3). Open local files on to the editor.<br></br>
                        4). Compile your code.<br></br>
                        5). Keeping the records of last five files which were opened and called as Recents.<br></br>
                        6). Access your saved files.<br></br>
                        7). User can also create a sharable link.<br></br>
                        8). Remember your customizations.<br></br>
                        9). Provide different choice of languages.<br></br>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default About;