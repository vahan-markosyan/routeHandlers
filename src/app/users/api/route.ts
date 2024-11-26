import { IUser } from "@/types"
import Database from "better-sqlite3"
import { NextRequest, NextResponse } from "next/server"

const sql = new Database("crud.db")

const addNewUser = (name:string, surname:string, age:number) => {
    const stm = `
    INSERT INTO users (name, email, age) 
    VALUES (?, ?, ?)
    RETURNING *`
    const newUser = sql.prepare(stm).get(name, surname, age) as IUser | null

    return newUser
    
}

export const GET = async() => {
    const users:IUser[] =  sql.prepare("SELECT * FROM users").all() as IUser[]
    return Response.json(users)
    
}

export const POST = async(req:NextRequest) => {
    const body = await req.json()
    const { name, surname, age } = body

    if (!name || !surname || !age) {
        return Response.json(
            { error: "Error" }
        )
    }

    const addedUser = addNewUser(name, surname, age)
    return Response.json(addedUser)
}



