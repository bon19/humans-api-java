
import React from "react"
import axios from "axios"
import { ADD_HUMAN_ENDPOINT, DELETE_HUMAN_ENDPOINT, EDIT_HUMAN_ENDPOINT, GET_HUMANS_ENDPOINT, GET_HUMAN_BY_ID_ENDPOINT } from "./endpoints"

export type recordTemplate = {
    id:string,
    first_name:string,
    last_name:string
}

type getHumanResp = {
    statusCode: number,
    record: Array<recordTemplate>
}

export const getHumans = async (): Promise<getHumanResp> => {

    let response:getHumanResp = {
        statusCode: 200,
        record: []
    }
    
    await axios.get(process.env.REACT_APP_API_URL + GET_HUMANS_ENDPOINT)
        .then(res => {
            response = {
                statusCode: res.status,
                record: res.data
            }
    })

    return response
}

type getHumanByIdResp = {
    statusCode: number,
    record: recordTemplate
}

export const getHumanById = async (id: string): Promise<getHumanByIdResp> => {

    let result:getHumanByIdResp = {
        statusCode: 200,
        record: {
            id:"",
            first_name:"",
            last_name:""
        }
    }

    var endpointWithId = GET_HUMAN_BY_ID_ENDPOINT.replace(":id", id)

    await axios.get(process.env.REACT_APP_API_URL + endpointWithId)
        .then(res => {
            result = {
                statusCode: res.status,
                record: res.data
            }
    })

    return result
}

export type requestBodyTemplate = {
    first_name:string,
    last_name:string
}

export const addHuman = async(body: requestBodyTemplate): Promise<number> => {

    let status = 200
    let requestBody = {
        first_name : body.first_name,
        last_name : body.last_name
    }

    await axios.post(process.env.REACT_APP_API_URL + ADD_HUMAN_ENDPOINT, requestBody)
    .then(resp => {
        status = resp.status
    })
        
    return status
}

export const editHuman = async(body: recordTemplate): Promise<number> => {

    let status = 200
    let requestBody = generateParam(body)

    var endpointWithId = EDIT_HUMAN_ENDPOINT.replace(":id", body.id)

    await axios.put(process.env.REACT_APP_API_URL + endpointWithId, null,{
        params : requestBody
    }).then(resp => {
        status = resp.status
    })

    
        
    return status
}

const generateParam = (body: recordTemplate) => {
    if (body.first_name !== "" && body.last_name != "") {
        return {
            firstName : body.first_name,
            lastName : body.last_name
        }
    } else if (body.first_name !== "" && body.last_name === "") {
        return {
            firstName : body.first_name
        }
    } else if (body.first_name === "" && body.last_name !== "") {
        return {
            lastName : body.last_name
        }
    } else {
        return ""
    }
}

export const deleteHuman = async(id: string): Promise<number> => {

    let status = 200

    var endpointWithId = DELETE_HUMAN_ENDPOINT.replace(":id", id)

    await axios.delete(process.env.REACT_APP_API_URL + endpointWithId)
    .then(resp => {
        status = resp.status
    })
        
    return status
}