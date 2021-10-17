import React, { Component, useState } from "react";

class EditModal extends Component {
    constructor(props) {
        super(props);
          
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
            ...this.props.bannerToEdit
        }

        this.editFormStyle = {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'center',
            justifyContent: 'center'
        }

        this.handleChange = (e) => {
            this.formContent[e.target.name] = e.target.value;
        }

        this.handleSubmitClick = (e) => {
            e.preventDefault();
            console.log(this.formContent)
            if(this && this.props && this.formContent){
                this.props.onSubmit(this.formContent)
            }  
        }
    }   
    render(){
        return (
            <div>
                <div className="update-modal" style={this.updateModalStyle}>
                    <div className="update-content-container" style={this.updateContentContainerStyle}>
                    
                        <span className="exit-button" onClick={()=>{document.getElementsByClassName('update-modal')[0] ? document.getElementsByClassName('update-modal')[0].style.display='none' : console.log('could not locate modal to close')}}>X</span>
                        
                        <form className="edit-form" style={this.editFormStyle}>
                        <p>
                        <label>Banner Text</label>
                        <input type="text" id="bannerText" name="bannerText" 
                        onChange={this.handleChange} defaultValue={this.props.bannerToEdit.bannerText} />
                        </p>
                        <p>
                        <label>Banner Link</label>
                        <input type="text" id="bannerLink" name="bannerLink" 
                        onChange={this.handleChange} defaultValue={this.props.bannerToEdit.bannerLink} />
                        </p>
                        <p>
                        <label>Banner Color</label>
                        <input type="text" id="bannerColor" name="bannerColor" 
                        onChange={this.handleChange} defaultValue={this.props.bannerToEdit.bannerColor} />
                        </p>
                        <span style={{display: 'flex'}}>
                            <p>Current Icon</p>
                            {this.props.bannerToEdit.bannerIcon? 
                            <img src={this.props.bannerToEdit.bannerIcon} width='3vw'/> :
                            <div width="10vw">No Icons</div>
                            }
                            {/* <div onChange={this.handleChange}>Upload New Icon?</div> */}
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