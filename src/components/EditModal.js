import { render } from "@testing-library/react";
import React, { Component, useState } from "react";
// I would ideally want this component to manage its own state
// such as all the form data that it has to submit

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          bannerToEdit: {},
        };
      
    // const [bannerToEdit, setBannerToEdit] = useState({})  
    
    this.updateModalStyle={
                  position: 'fixed',
                  padding: '20vh 20vw',
                  left: 0,
                  top: 0,
                  width: '100vw',
                  height: '100vh',
                  overflow: 'auto',
                  backgroundColor:'rgba(0,0,0,0.4)'
                }

    this.updateContentContainerStyle = {
        backgroundColor: '#DDD',
        padding: '2vh 1vw'
    }

    this.formContent = {
        bannerText: 'tadah'
    }

    this.editFormStyle = {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        justifyContent: 'center'
    }

    let handleSubmitClick = (e) => {
        e.preventDefault();
        e.persist();
        console.log(e)
        if(this && this.props){
            this.props.onSubmit(this.formContent)
        }  
    }
}
render(){
    console.log(this.props.bannerToEdit)
    return (
        <div>
            <div className="update-modal" style={this.updateModalStyle}>
                <div className="update-content-container" style={this.updateContentContainerStyle}>
                
                    {/* it tells me onClick is getting a string instead of a callback...? */}
                    {/* <span className="exit-button" onClick={document.getElementsByClassName('update-modal')[0] ? document.getElementsByClassName('update-modal')[0].style.display='none' : console.log('fail')}></span> */}
                    
                    {/* need to stop the page refresh */}
                    <form className="edit-form" style={this.editFormStyle}>
                    <p>
                    <label>Banner Text</label>
                    <input type="text" id="bannerText" name="bannerText" defaultValue={this.props.bannerToEdit.bannerText} />
                    </p>
                    <p>
                    <label>Banner Link</label>
                    <input type="text" id="bannerLink" name="bannerLink" defaultValue={this.props.bannerToEdit.bannerLink} />
                    </p>
                    <p>
                    <label>Banner Color</label>
                    <input type="text" id="bannerColor" name="bannerColor" defaultValue={this.props.bannerToEdit.bannerColor} />
                    </p>
                    <span style={{display: 'flex'}}>
                        <p>Current Icon</p>
                        {this.props.bannerToEdit.bannerIcon? 
                        <img src={this.props.bannerToEdit.bannerIcon} width='3vw'/> :
                        <div width="10vw">No Icons</div>
                        }
                    </span>
                    
                    <br />
                    <button onClick={this.handleSubmitClick}>SUBMIT</button>
                    
                    </form>
             
                </div>
            </div>
        </div>
    )
}
}

export default EditModal;