const pactum = require('pactum');
const { expect } = require('chai');

const { BASE_URL, API_KEY } = require('../config/env');

const userData = require('../data/users');

const { createUser, updateUser, deleteUser, getUser } = require('../helpers/user-helper');

beforeEach(() => {
  pactum.request.setDefaultHeaders({
    'x-api-key': API_KEY,
  });
});

describe('Fluxo de usuários', () => {
  let userId;

  after(() => {
    console.log('Fluxo finalizado');
  });

  it('criar usuário', async () => {
    const response = await createUser(userData.defaultUser, BASE_URL);

    userId = response.body.id;

    expect(response.statusCode).to.equal(201);

    expect(response.body.name).to.equal(userData.defaultUser.name);

    expect(response.body.job).to.equal(userData.defaultUser.job);
  });

  it('atualizar usuário', async () => {
    const response = await updateUser(userId, userData.managerUser, BASE_URL);

    expect(response.statusCode).to.equal(200);

    expect(response.body.name).to.equal(userData.managerUser.name);

    expect(response.body.job).to.equal(userData.managerUser.job);
  });

  it('deve buscar usuário', async () => {
    const response = await getUser(2, BASE_URL); //user 2 já existe na base
    //expect(response.statusCode).to.equal(200);   //N/ funciona c/ API mock/fake para treino
  });

  it('deletar usuário', async () => {
    const response = await deleteUser(userId, BASE_URL);

    expect(response.statusCode).to.equal(204);

    expect(response.body).to.be.empty;
  });

  it('não deve criar usuário com dados inválidos', async () => {
    await pactum.spec().post(`${BASE_URL}/users`).withJson(userData.invalidUser).expectStatus(201);
  });
});
