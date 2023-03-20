import React from 'react'

const List = ({ val, deleteItem, updateItem }) => {
    return (
        <>
            <tr className="align-middle">
                <td className='text-center'>{val.name}</td>
                <td className='text-center'>{val.email}</td>
                <td className='text-center'>{val.contact_no}</td>
                <td className='text-center'>{val.date_of_birth}</td>
                <td className='text-center'>{val.address}</td>
                <td className='text-end'>

                    <button type="button" className="btn ms-auto" data-bs-dismiss="modal" onClick={() => { deleteItem(val._id) }}><i className="fa-solid fa-trash edit-icon"></i></button>
                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => updateItem(val._id)}>
                        <i className="fa-solid fa-pen edit-icon"></i>
                    </button>
                </td>
            </tr>
        </>
    )
}

export default List
