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
            padding: '2vh 1vw',
            position: 'relative'
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
                    
                        <div style={{position: "absolute", top: "2vh", right: '2vw', cursor: "pointer"}} className="exit-button" onClick={()=>{document.getElementsByClassName('update-modal')[0] ? document.getElementsByClassName('update-modal')[0].style.display='none' : console.log('could not locate modal to close')}}>X</div>
                        <h1 style={{padding: '2vh', textAlign: "center", fontWeight: 600}}>Modify Your Banner</h1>
                        <form className="edit-form" style={this.editFormStyle}>
                        <p>
                        <label style={{marginRight: '2vw'}}>Banner Text</label>
                        <input type="text" id="bannerText" name="bannerText" 
                        onChange={this.handleChange} defaultValue={this.props.bannerToEdit.bannerText} style={{paddingLeft: '2vw', width: '25vw', marginBottom: '2vh'}}/>
                        </p>

                        <p>
                        <label style={{marginRight: '2vw'}}>Banner Link</label>
                        <input type="text" id="bannerLink" name="bannerLink" 
                        onChange={this.handleChange} defaultValue={this.props.bannerToEdit.bannerLink} style={{paddingLeft: '2vw', width: '25vw', marginBottom: '2vh'}} />
                        </p>

                        <p>
                        <label style={{marginRight: '2vw'}}>Banner Color</label>
                        
                        <input style={{paddingLeft: '2vw', width: '25vw', marginBottom: '2vh'}} type="text" id="bannerColor" name="bannerColor" 
                        onChange={this.handleChange} defaultValue={this.props.bannerToEdit.bannerColor} />
                        </p>

                        <div style={{display: 'flex', flexFlow: 'column nowrap'}}>                            
                            {
                                this.props.bannerToEdit.bannerIcon ?

                                <span style={{display: 'flex', flexFlow: 'row nowrap'}}>
                                <p style={{paddingLeft: '5vw', flex: 1, textAlign: 'right'}}>
                                    Current Icon</p>
                                <div style={{padding: '1vw 5vw', flex: 2}}>
                                    <img src={this.props.bannerToEdit.bannerIcon} width='20%'/>
                                </div>
                                </span>
                                    :
                                    <span style={{display: 'flex', flexFlow: 'row nowrap'}}>
                                    <p style={{paddingLeft: '5vw', flex: 1, textAlign: 'right'}}>
                                        Current Icon
                                    </p>
                                    <div style={{paddingLeft: '5vw', flex: 1}}><p>No Icon</p></div>
                                </span>
                            }                           
                            
                            <span style={{paddingRight: '2vw', display: 'flex', flex: 4}}>
                                <label style={{marginRight: '2vw'}}>Upload New Icon Link:</label><br />
                                <input name="bannerIcon" style={{paddingLeft: '1vw', paddingRight: '1vw', width: '30vw', marginBottom: '2vh'}} onChange={this.handleChange} defaultValue={this.props.bannerToEdit.bannerIcon}></input>
                            </span>
                        </div>

                        <p>
                        <label style={{marginRight: '2vw'}}>Start Date</label>
                        <input style={{marginBottom: '2vh', paddingLeft: '2vw', width: '25vw'}} type="text" id="startDate" name="startDate" 
                        onChange={this.handleChange} defaultValue={this.props.bannerToEdit.startDate} />
                        </p>

                        <p>
                        <label style={{marginRight: '2vw'}}>End Date</label>
                        <input style={{marginBottom: '2vh', paddingLeft: '2vw', width: '25vw'}} type="text" id="endDate" name="endDate" 
                        onChange={this.handleChange} defaultValue={this.props.bannerToEdit.endDate} />
                        </p>

                        <br />
                        <button onClick={this.handleSubmitClick} style={{border: '1px solid #AAA', borderRadius: '5px', padding: '1vw'}}>SUBMIT</button>
                        </form>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default EditModal;