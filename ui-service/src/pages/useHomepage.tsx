import React, { useState } from "react"
import { addHuman, deleteHuman, editHuman, getHumanById, getHumans } from "../api/requests";

const useHomepage = () => {

    // Form state
    const [formInput, setFormInput] = useState({
        id:"",
        firstName: "",
        lastName: ""
    })

    const handleFormChange = (e: React.FormEvent<HTMLInputElement>) =>{
        setFormInput({
            ...formInput,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    // Modal state and handlers
    const [showModal, setShowModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        action: "",
        title: "",
        primaryBtnText: ""
    })

    const handleClose = () => setShowModal(false)
    

    const handleModalAdd = () => {
        setModalConfig({
            action: "add",
            title: "Add New User",
            primaryBtnText: "Save"
        })
        
        setFormInput({
            id: "",
            firstName: "",
            lastName: ""
        })

        setShowModal(true)
    }

    const handleModalEdit = async (id: string) => {

        setModalConfig({
            action: "edit",
            title: "Edit User",
            primaryBtnText: "Update"
        })  
        
        const result = await getHumanById(id)

        setFormInput({
            id,
            firstName: result.record.first_name,
            lastName: result.record.last_name
        })

        setShowModal(true)
    }

    const handleModalDelete = (id: string) => {

        setModalConfig({
            action: "delete",
            title: "Delete User",
            primaryBtnText: "Delete"
        })
        setFormInput({
            ...formInput,
            id
        })
        setShowModal(true)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        let resp = 200
        if (modalConfig.action === "add") {
            let requestBody = {
                first_name: formInput.firstName,
                last_name: formInput.lastName
            }

            resp = await addHuman(requestBody)

            if (resp === 200) {
                setAlertConfig({
                    show: true,
                    header: "Add successful",
                    message: "User " + formInput.firstName + " has been added",
                    variant: "success"
                })
            }
        } else if (modalConfig.action === "edit") {
            let requestBody = {
                id: formInput.id,
                first_name: formInput.firstName,
                last_name: formInput.lastName
            }
            resp = await editHuman(requestBody)

            if (resp === 200) {
                setAlertConfig({
                    show: true,
                    header: "Update successful",
                    message: "User " + formInput.firstName + " has been updated",
                    variant: "success"
                })
            }

        } else if (modalConfig.action === "delete") {
            resp = await deleteHuman(formInput.id)

            if (resp === 200) {
                setAlertConfig({
                    show: true,
                    header: "Delete successful",
                    message: "User " + formInput.firstName + " has been deleted",
                    variant: "success"
                })
            }
        }

        fetchRecord()
    }


    type newRecType = {
        id:string,
        firstname:string,
        lastname:string,
        buttons:any
    }

    const [record, setRecord] = useState<Array<newRecType>>()

    const fetchRecord = async() => {
        const result = await getHumans()

        var modifiedRec:Array<newRecType> = [{
                    id: "",
                    firstname: "",
                    lastname: "",
                    buttons: <></>
                }]

        modifiedRec.length = 0

        result.record.map(rec => {
            let newRec = {
                id: rec.id,
                firstname: rec.first_name,
                lastname: rec.last_name,
                buttons: <><button type="button" className="btn btn-light" onClick={() => handleModalEdit(rec.id)}>Edit</button><button type="button" className="btn btn-danger" onClick={() => handleModalDelete(rec.id)}>Delete</button></>
            }
            modifiedRec.push(newRec)
        })

        setRecord(modifiedRec)
    }

    const [alertConfig, setAlertConfig] = useState({
        show: false,
        header:"",
        message: "",
        variant:"success"
    })

    const handleAlertDisplay = (show: boolean) => {
        setAlertConfig({
            ...alertConfig,
            show
        })
    }

    return {fetchRecord, handleModalAdd, handleSubmit, handleClose, handleFormChange, handleAlertDisplay, record, showModal, modalConfig, formInput, alertConfig}
 }

export default useHomepage