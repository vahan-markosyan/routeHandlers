import { IUser } from "@/types";
import Database from "better-sqlite3";
import { NextRequest } from "next/server";

const sql = new Database("crud.db")

interface IProps{
    params:{id:number}
}

export const getUserById = async(id:number):Promise<IUser | null> => {
    const stm = `
    SELECT * FROM users WHERE id = ?
    `
    const user = sql.prepare(stm).get(id)
    return user as IUser || null
}

export const deleteUserById = async(id:number):Promise<IUser | null> => {
    const stm = `DELETE FROM users WHERE ID = ?`
    const deletedUser = sql.prepare(stm).get(id)
    return deletedUser as IUser || null
}

export const GET = async (req:NextRequest, {params}:IProps) => {
    const user = await getUserById(params.id)
    if(!user) 
        return Response.json({users:null})
    else
    return Response.json(user)
}

export const DELETE = async (req:NextRequest, {params}:IProps) => {
    const deletedUser = await deleteUserById(params.id)
    if(!deletedUser) 
        return Response.json({users:null})
    else
    return Response.json(deletedUser)
}

