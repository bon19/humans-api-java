import React, { useEffect } from "react"
import { Modal, Button, Alert } from "react-bootstrap"
import useHomepage from "./useHomepage";

const Homepage = () => {

    const {fetchRecord, handleModalAdd, handleSubmit, handleClose, handleFormChange, handleAlertDisplay, record, showModal, modalConfig, formInput, alertConfig} = useHomepage()

    useEffect(() => {
        fetchRecord()
    },[])

    return (
        <div className="container">
             {alertConfig.show ?
                <Alert variant={alertConfig.variant} onClose={() => handleAlertDisplay(false)} dismissible>
                    <Alert.Heading>{alertConfig.header}</Alert.Heading>
                    <p>
                    {alertConfig.message}
                    </p>
                </Alert>
                :<></>
            }
            
            <button type="button" className="btn btn-primary m-2 float-right" onClick={handleModalAdd}>Add User</button>
            <table className="table table-striped table-borderless table-hover">
                <thead className="thead-light">
                    <tr>
                        <th>First Name</th>
                        <th>Last Names</th>
                        <th></th>
                    </tr>
                </thead>
                {record?.length !== 0
                    ?
                    <tbody>
                        {record?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.buttons}</td>
                            </tr>
                        ))}
                    </tbody>
                    :<></>   
                }
            </table>
            {record?.length === 0
                    ?
                    <div className="text-center">No record found</div>
                    :<></>   
                }
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{modalConfig.title}</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {modalConfig.action === "add" || modalConfig.action === "edit" 
                            ?
                                <div className="container">
                                    <input className="form-control mb-1" name="firstName" placeholder="first name" value={formInput.firstName} onChange={handleFormChange}></input>
                                    <input className="form-control" name="lastName" placeholder="last name" value={formInput.lastName} onChange={handleFormChange}></input>
                                </div>
                            :
                                <h5>Are you sure you want to delete this user?</h5>
                        }
                        
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={handleClose}>
                        {modalConfig.primaryBtnText}
                    </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )}

export default Homepage