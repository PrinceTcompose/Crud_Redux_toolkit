import React, { useContext } from 'react';
import { mycontext } from '../App';

const Modal = ({ handleChange, getData, validateMobile }) => {
    const [formData, edit, setEdit, mobileError, setMobileError] = useContext(mycontext);

    return (
        <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{(edit) ? "Update User" : "Add User"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setEdit(false)}></button>
                        </div>
                        <div className="modal-body">

                            <form action="" onSubmit={getData}>
                                <label htmlFor="" className='form-label'>Name</label>
                                <input type="text" name="name" id="" value={formData.name} className='form-control' onChange={handleChange} />

                                <label htmlFor="" className='form-label mt-2 mb-0'>Email</label>
                                <input type="email" name="email" id="" value={formData.email} className='form-control' onChange={handleChange} />

                                <label htmlFor="" className='form-label mt-2 mb-0'>Contact No</label>
                                <label htmlFor="" style={{ color: "red" }} className="ms-2">{mobileError}</label>
                                <input type="tel" name="contact_no" id="" value={formData.contact_no} className='form-control' onChange={handleChange} onBlur={validateMobile} onFocus={() => setMobileError("")} />

                                <label htmlFor="" className='form-label mt-2 mb-0'>Date Of Birth</label>
                                <input type="date" name="date_of_birth" id="" value={formData.date_of_birth} className='form-control' onChange={handleChange} />

                                <label htmlFor="" className='form-label mt-2 mb-0'>Address</label>
                                <textarea name="address" id="" value={formData.address} rows="5" className='form-control' onChange={handleChange}></textarea>

                                <div className="mt-3">
                                    <button type="submit" className="btn btn-add px-3" id="task-added" data-bs-dismiss={(formData.name == "" || formData.email == "" || formData.contact_no == "" || formData.date_of_birth == "" || formData.address == "" || mobileError !== "") ? "" : "modal2"}>{(edit) ? "Update User" : "Add User"}</button>
                                    <button type="button" className="btn btn-cancel px-3 ms-2" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
