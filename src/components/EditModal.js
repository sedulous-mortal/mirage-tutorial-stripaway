import React, { useState } from "react";
// I want this component to manage its own state
// such as all the form data that it has to submit

const EditModal = () => {
    const [bannerToEdit, setBannerToEdit] = useState({})

    return (
        <div>
            <button onClick={document.getElementsByClassName('update-modal')[0] ? document.getElementsByClassName('update-modal')[0].style.display='block' : ()=>{}}>Open Modal</button>

            <div className="update-modal">
                <div className="update-content-container">
                <div className="flex column">
                    <span className='exit-button' onClick={document.getElementsByClassName('update-modal')[0] ? document.getElementsByClassName('update-modal')[0].style.display='none' : ()=>{}}></span>
                    <p>{bannerToEdit.bannerText}</p>
                    <form>
                    {/* <label for="bannerText">Banner Text</label><br> */}
                    <input type="text" id="bannerText" name="bannerText" value={bannerToEdit.bannerText} />
                    <br />
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}
export default EditModal;