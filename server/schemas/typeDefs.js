//TODO: update user with all fields
const typeDefs = `#graphql
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    friends: [User]
    friendCount:Int
  }
  # type CreateUser{
  #   _id: ID
  #   firstName: String
  #   lastName: String
  #   username: String
  #   password:String
  # }
  input UserInput{
    firstName:String,
    lastName:String,
    username:String,
    password:String
  }
  type Query {
    users: [User]
  }

  type Mutation {
    # addUser(firstName: String!, lastName: String!, username: String!, password:String!): CreateUser 
    addUser(user:UserInput):User
    updateUser(criteria:UserInput):User
    deleteUser:User
    addFriend(userId:ID!):User
    deleteFriend(userId:ID!):User
  }
`;

module.exports = typeDefs;
