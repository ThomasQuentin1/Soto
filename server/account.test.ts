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
      activated
    }
    criterions {
      id
      position
      activated
    }
  }
}
`

const UPDATE_OBLIGATIONS = gql`
mutation {
  setObligations(obligations: [{id: 1}])
}
`

const UPDATE_CRITERIONS = gql`
mutation {
  setCriterions(criterions: [{id: 2, position: 1}])
}
`

const DELETE_ACCOUNT = gql`
mutation {
  deleteAccount(passwordSHA256: "pass")
}
`

let client: ApolloServerTestClient;

beforeAll(async (done) => {
  const res = await anonymous.mutate({ mutation: CREATE_ACCOUNT });
  client = loggedTestUser(res.data!.register);
  done();
});

afterAll(async (done) => {
  await client.mutate({ mutation: DELETE_ACCOUNT });
  done();
});


describe('Account', () => {
  it('should retrive the user email', async () => {
    const res = await client.query({ query: ACCOUNT });
    expect(res.errors?.length).not.toBeTruthy();
    expect(res.data!.account.email.includes("@test.com")).toBeTruthy();
  })

  it('handle filters and obligations poperly', async () => {
    await client.mutate({ mutation: UPDATE_CRITERIONS });
    await client.mutate({ mutation: UPDATE_OBLIGATIONS });

    const res = await client.query({ query: ACCOUNT });

    expect(res.data?.account.criterions.find((c: any) => c.activated).position).toEqual(1);
    expect(res.data?.account.criterions.find((c: any) => c.activated).id).toEqual(2);
    expect(res.data?.account.obligations.find((c: any) => c.activated).id).toEqual(1);

    expect(res.data?.account.criterions).toMatchSnapshot();
    expect(res.data?.account.obligations).toMatchSnapshot();
  })
})