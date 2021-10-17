import React, { useState } from "react";
// I want this component to manage its own state
// such as all the form data that it has to submit

const EditModal = () => {
    const [bannerToEdit, setBannerToEdit] = useState({})  

    let updateModalStyle={
                  position: 'fixed',
                  padding: '20vh 20vw',
                  left: 0,
                  top: 0,
                  width: '100vw',
                  height: '100vh',
                  overflow: 'auto',
                  backgroundColor:'rgba(0,0,0,0.4)'
                }

    let updateContentContainerStyle = {
        backgroundColor: '#DDD',
        padding: '2vh 1vw'
    }

    let formContent = {
        bannerText: 'tadah'
    }

    let editFormStyle = {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <div>
            <button onClick={() => {
                document.getElementsByClassName('update-modal')[0] ?
                 document.getElementsByClassName('update-modal')[0].style.display='block' :
                  console.log('fail')}
                  }>Open Modal</button>

            <div className="update-modal" style={updateModalStyle}>
                <div className="update-content-container" style={updateContentContainerStyle}>
                
                    {/* it tells me onClick is getting a string instead of a callback...? */}
                    {/* <span className="exit-button" onClick={document.getElementsByClassName('update-modal')[0] ? document.getElementsByClassName('update-modal')[0].style.display='none' : console.log('fail')}></span> */}
                    <p>{bannerToEdit.bannerText}</p>
                    {/* need to stop the page refresh */}
                    <form className="edit-form" style={editFormStyle}>
                    <p>
                    <label>Banner Text</label>
                    <input type="text" id="bannerText" name="bannerText" value={bannerToEdit.bannerText} />
                    </p>
                    <p>
                    <label>Banner Link</label>
                    <input type="text" id="bannerLink" name="bannerLink" value={bannerToEdit.bannerLink} />
                    </p>
                    <p>
                    <label>Banner Color</label>
                    <input type="text" id="bannerColor" name="bannerColor" value={bannerToEdit.bannerColor} />
                    </p>
                    <p>Current Icon</p>
                    <img src={bannerToEdit.bannerIcon} width='3vw'/>
                    
                    <br />
                    <button onClick={this && this.props ? this.props.onSubmit(formContent) : null}>SUBMIT</button>
                    
                    </form>
             
                </div>
            </div>
        </div>
    )
}
export default EditModal;