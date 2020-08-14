import { ApolloServerTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { anonymous, loggedTestUser } from './utils/tests';

const CREATE_ACCOUNT = gql`
mutation {
  register (email: "test${Math.floor(Math.random() * 1000)}@test.com" passwordSHA256: "pass")
}
`

const ACCOUNT = gql`
query {
  account {
    email
    obligations {
      id
    }
    criterions {
      id
    }
  }
}
`

const DELETE_ACCOUNT = gql`
mutation {
  deleteAccount(passwordSHA256: "pass")
}
`

let client: ApolloServerTestClient;

beforeAll(async () => {
  const res = await anonymous.mutate({ mutation: CREATE_ACCOUNT });
  client = loggedTestUser(res.data!.register);
});

afterAll(async () => {
  await client.mutate({ mutation: DELETE_ACCOUNT });
});


describe('Account', () => {
  it('should retrive the user email', async () => {
    const res = await client.query({ query: ACCOUNT });
    expect(res.errors?.length).not.toBeTruthy();
    expect(res.data!.account.email.includes("@test.com")).toBeTruthy();
  })

  // it('handle filters and obligations poperly', async () => {

  // })
})