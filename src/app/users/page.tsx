"use client"


import { IUser } from "@/types"
import axios from "axios"
import { useEffect } from "react"

export default function Users(id:number,  user:{ name: string; surname: string; age: number }) {
    useEffect(() => {
        axios.get("http://localhost:3000/users/api")
        .then(res => console.log(res.data))
    },[])

    useEffect(() => {
        axios.get("http://localhost:3000/users/"+id)
        .then(res => console.log(res.data))
    },[])

    useEffect(() => {
        axios.delete("http://localhost:3000/users/"+id)
        .then(res => console.log(res.data))
    },[])

    useEffect(() => {
        axios.post("http://localhost:3000/users", user)
        .then(res => console.log(res.data))
    })

    return <>
    <h1>Users</h1>
    </>
}