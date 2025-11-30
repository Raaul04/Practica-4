import { gql } from 'apollo-server';

export const typeDefs = gql`

    type User{
        _id:ID!,
        email: srtring,
        name:string,
        password:string
    }

    type Post{
        _id: ID!,
        titulo:string,
        contenido:string,
        autor:string,
        fechaCreada:string
    }

    type Query {

        me: User
        getPost: [Post]!
        getPost(id : ID!): Post
    }

    type Mutation {
    
        register(
            email: string!,
            password: string!
        ) : string!

        login(
            email: string!,
            password: string!
        ) : string!

        addPost(
            titulo:string!,
            contenido:string!,
            autor:string!,
            fechaCreada:string!
        ): Post!

        updatePost(
            _id:ID!,
            titulo:string,
            contenido:string,
            autor:string,
            fechaCreada:string
        ): Post!

        deletePost(
            _id:ID!
        ): Post!

    }

`;