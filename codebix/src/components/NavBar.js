import React from "react";
import {useState} from "react";
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem,NavbarText,Dropdown, Row, Col, Button} from 'reactstrap';
import { Link } from "react-router-dom";

const NavBar=(props)=>{
        const inputRef=React.createRef();
        const [isOpen, setIsOpen] = useState(false);
        const [Dropright,setDropright]=useState(false);
        const toggle = () => setIsOpen(!isOpen);
        const changeval=()=> setDropright(!Dropright);
        const logout=<Button size="sm" outline color="secondary" onClick={()=>props.logout()}>Log Out</Button>
        const handletheme=(event)=>{
          props.settheme(event.currentTarget.getAttribute("dropdownvalue"));
        }
        const handletab=(event)=>{
            props.settab(parseInt(event.currentTarget.value));
        }
        const handlesize=(event)=>{
          props.setsize(event.currentTarget.value);
        }
        const handlesubmit=(event)=>{
            event.preventDefault();
            props.savefile(inputRef.current.value);
            props.toggle();

        }
        const authanticateuser=(event)=>{
          if(props.uid===null){
            event.preventDefault();
            props.setsignup();

          }
        }

       const extension=(val)=>{
          if(val==="cpp") {
              return "C++ 14";
          }
          else if(val=== "c"){
              return "C";
          }
          else if(val==="py"){
              return "Python 3";
          }
          else if(val==="java"){
              return "Java";
          }
          else if(val==="rb"){
              return "Ruby";
          }
          else if(val==="cs"){
              return "C#";
          }
          else if(val==="js"){
              return "NodeJs";
          }
          else{
              return "";
          }
        
        }
        const readfile =(event)=>{
          props.editor.setValue("Please Wait!! File Uploading....");
          var fr= new FileReader();
          if(event.currentTarget.files[0]){
          fr.readAsText(event.currentTarget.files[0]);
          var file=event.currentTarget.files[0].name;
          var exten=file.substr((file.lastIndexOf('.')+1));
          fr.onload=()=>{
            props.editor.setValue(fr.result);
            switch (exten) {
              case "cpp":
                props.editor.setOption("mode","text/x-c++src");
                break;
              case "c":
                props.editor.setOption("mode","text/x-csrc");
                break;
              case "py":
                props.editor.setOption("mode","text/x-python");
                props.editor.setOption("version",3);
                break;
              case "java":
                props.editor.setOption("mode","text/x-java");
                break;
              case "rb":
                props.editor.setOption("mode","text/x-ruby");
                break;
              case "cs":
                props.editor.setOption("mode","text/x-csharp");
                break;
              case "js":
                props.editor.setOption("mode","text/javascript");
                break;
              default:
                break;
            }
            props.setdropdown(extension(exten));
            props.setmode(extension(exten)); 
            props.setunsaved();
          }
        }

        }
        return(
          <>
            <div>
              <Navbar color="light" light expand="md">
                <div className="container">
                    <NavbarBrand href="/"><i className="fas fa-code"></i></NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                      <Nav className="mr-auto" navbar>
                        <NavItem>
                        <NavLink href="#" onClick={props.setabout}>About</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                            Customized
                          </DropdownToggle>
                          <DropdownMenu right>
              
                            <Dropdown direction="right" isOpen={Dropright} toggle={changeval} style={{width:"100%"}}>
                              <DropdownToggle caret style={{border:"block",marginLeft:"10%",width:"80%"}}>
                                Theme
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem dropdownvalue="base16-light" onClick={handletheme}>Day light</DropdownItem>
                                <DropdownItem dropdownvalue="monokai" onClick={handletheme}>Monokai</DropdownItem>
                                <DropdownItem dropdownvalue="ayu-dark" onClick={handletheme}>ayu-dark</DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                            <DropdownItem divider />
                              <label style={{display:"block",textAlign:"center"}}>
                                <b>Tab Size:</b>
                              </label>
                              <select style={{display:"block",border:"block",width:"80%",borderColor:"lightgray",borderRadius:"3px",height:"30px",marginLeft:"10%"}} onChange={handletab}>
                                  <option value="2">2 Spaces</option>
                                  <option value="4" selected>4 Spaces</option>
                                  <option value="8">8 Spaces</option>
                              </select>
                            <DropdownItem divider />
                            <label style={{display:"block",textAlign:"center"}}>
                                <b>Font Size:</b>
                            </label>
                            <input type="number" style={{width:"80%",height:"30px",borderRadius:"3px",borderColor:"lightgray",display:"block",border:"block",marginLeft:"10%"}} defaultValue="14"
                            onChange={handlesize}></input>
                          
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                          <NavLink><Link to="/files" style={{color:"inherit",textDecoration:"none"}} onClick={authanticateuser}>Files <i className="fas fa-file"></i></Link></NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink><input type="file" style={{fontSize:"14px"}} placeHolder="Upload file" onChange={readfile}></input></NavLink>
                        </NavItem>
                      </Nav>
                    <NavbarText>
                        {props.uid ? `CodeBix  |   `:"CodeBix"}
                        {props.uid ? logout: null}
                    </NavbarText>
                    </Collapse>
                </div>
              </Navbar>
            </div>
            <div className="container">  
              <Row>
                <Col lg="9" md="9" sm="12" xs="12">
                  <Collapse isOpen={props.isopen}>
                    <div className="filename">
                      <form onSubmit={handlesubmit}>
                        <input type="text" id="search" ref={inputRef} placeholder="File Name" required></input>
                      </form>
                    </div>
                </Collapse>
                </Col>
                <Col>
                </Col>
              </Row>
            </div>
            
          </>  
        );

}
export default NavBar;