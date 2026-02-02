import { gql } from 'apollo-server-express';
import { buildSubgraphSchema } from '@apollo/federation';

const accountSchema = gql`
  scalar Date 

  # Đối tượng Account có @key để định danh bởi _id
  type Account @key(fields: "_id") {
    _id: ID!
    email: String!
    password: String!
    role_account: String!
    createdAt: Date!
    employee_id: ID
    customer_id: ID
  }

  # Đối tượng User có @key để định danh bởi _id
  type User @key(fields: "_id") {
    _id: ID
    name: String!
  }

  # AccountResponse sẽ sử dụng @external cho các trường mà chúng ta muốn lấy từ các subgraph khác
  type AccountResponse {
    token: String @external
    success: Boolean! @external
    message: String! @external

    # Không nên dùng @external cho _id nếu nó là trường chủ sở hữu trong subgraph này
    _id: ID! 

    # Các trường cần dữ liệu từ Account và User, sử dụng @requires để yêu cầu _id
    dataAccount: [Account] @requires(fields: "_id")
    dataUser: [User] @requires(fields: "_id")
  }

  # Mở rộng các query hiện có trong schema
  type Query {
    accounts: [Account]
    getAccountByEmail(email: String!): AccountResponse!
    getAllAccounts: [AccountResponse]!
    getAccountById(id: String!): AccountResponse!
    getAllAccountsByRoleAccount(role_account: String!): AccountResponse!
    getAccountsByName(name: String!): AccountResponse!
    getAccountsByEmployeeHireDate: AccountResponse!
    getAccountByToken: AccountResponse
    getAccountsByGender: AccountResponse!
  }

  # Mở rộng các mutation hiện có trong schema
  type Mutation {
    updatePassword(
      email: String!
      oldpassword: String!
      confirmPassword: String!
      newPassword: String!
    ): String
    registerAccount(
      name: String!
      email: String!
      password: String!
      confirmPassword: String!
      role_account: String!
    ): AccountResponse
    forgotPassword(email: String!): String
    resetPassword(
      token: String!
      newPassword: String!
      confirmPassword: String!
    ): AccountResponse
    logoutAccount(token: String!): AccountResponse
    loginAccount(
      email: String!
      role_account: String!
      password: String!
    ): AccountResponse
  }
`;

export default accountSchema;
