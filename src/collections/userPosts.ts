import bcrypt from "bcryptjs";
import { getDB } from "../db/mongo";
import { ObjectId } from "mongodb";

const COLLECTION="Users"

export const createUser=async(name:string,email:string,password:string)=>{
    const db=getDB()
    const PassEncriptao= await bcrypt.hash(password,10)

    const result= await db.collection(COLLECTION).insertOne({
        name,
        email,
        password:PassEncriptao
    })

    return result.insertedId.toString()
}

export const validateUser=async(email:string,password:string)=>{
    const db=getDB()
    const existUser=await db.collection(COLLECTION).findOne({email})
    if(!existUser){
        return null
    }

    const PasswordLaMisma= await bcrypt.compare(password,existUser.password)

    if(!PasswordLaMisma){
        return null
    }

    return existUser
}

export const findUserById = async (id: string) => {
    const db = getDB();
    return await db.collection(COLLECTION).findOne({_id: new ObjectId(id)})
}