
import { IResolvers } from "@graphql-tools/utils";
import { getDB } from "../db/mongo";
import { ObjectId } from "mongodb";
import { createUser } from "../collections/userPosts";
import { signToken } from "../auth";
import { validateUser } from "../collections/userPosts";

const COLLECTION = "Posts";

export const resolvers: IResolvers = {
  Query: {
    getPost: async () => {
      const db = getDB();
      return db.collection(COLLECTION).find().toArray();
    },
    getPostID: async (_, { _id }: { _id: string }) => {
      const db = getDB();
      return db.collection(COLLECTION).findOne({ _id: new ObjectId(_id) });
    },

    me : async(_,__, {user})=>{
      if(!user) return null
      return {
        id: user._id.toString(),
        email: user.email
      }
    }
  },

  Mutation: {
    addPost: async (_,{ titulo, contenido,  fechaCreada}: { titulo: string; contenido: string; fechaCreada: string},{user}) => {
      if(!user){
        throw new Error("Usuario no autentificado")
      }
        const db = getDB();

        const result = await db.collection(COLLECTION).insertOne({
          titulo,
          contenido,
          autor:user.name,
          fechaCreada,
          userId:new ObjectId(user._id)
        });

        return {
          _id: result.insertedId,
          titulo,
          contenido, 
          autor:user.name,
          fechaCreada,
        };

    },

    updatePost: async (_, { _id, titulo, contenido, autor, fechaCreada }, {}) => {
      const db = getDB();
      const updateObj: any = {};

      const result = await db.collection(COLLECTION).updateOne(
          { _id: new ObjectId(_id) },
          { $set: updateObj },
        );

      if (result.matchedCount === 0) {
        throw new Error("No se encontró el post con ese ID");
      }
      return result;
    },


    deletePost: async (_, { _id }: { _id: string },{user}) => {
      if(!user){
        throw new Error("Usuario no autentificado")
      }
      const db = getDB();
      const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(_id) });

      if (result.deletedCount === 0) {
        throw new Error("no se encontro el id");
      }

      return true;
    },

    
    register: async(_, {name,email, password}: {name:string,email: string, password: string}) => {
      const userId = await createUser(name,email, password)
      return signToken(userId)
    }, 

    login: async(_, {email, password}: {email: string, password: string}) => {
      const user = await validateUser(email, password)
      if(!user){
        throw new Error("Las credenciales no son correctas")
      }
      return signToken(user._id.toString())
    },
    
    updatePost:async(_,{_id,titulo,contenido,autor,fechaCreada}:{_id:string;titulo: string; contenido: string; autor: string,  fechaCreada: string},{user})=>{

      if(!user){
        throw new Error("Usuario no autentificado")
      }

    }
    
  },
};
