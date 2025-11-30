import bcrypt from "bcryptjs";
import { getDB } from "../db/mongo";
import { ObjectId } from "mongodb";

const COLLECTION="Users"

export const createUser=async(email:string,password:string)=>{
    const db=getDB()
    const PassEncriptao= await bcrypt.hash(password,10)
    


}