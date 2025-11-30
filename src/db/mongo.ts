import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client: MongoClient;
let dB: Db;
const dbName ="Instagram";

export const connectToMongoDB = async () => {
    try{
        const mongoUrl =`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.CLUSTER}.fvbhm4j.mongodb.net/?appName=${process.env.CLUSTERNAME}`;
        client = new MongoClient(mongoUrl!);
        await client.connect();
        dB = client.db(dbName);
        console.log("Estás conectado al mondongo cosa guapa!");
    }
    catch(err){
        console.log("Error del mondongo baby: ", err)
    }
};

export const getDB = ():Db => dB;
