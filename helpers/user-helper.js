const pactum = require('pactum');

async function createUser(userData, BASE_URL) {
  return await pactum //await = espera resposta - RETURN devolve o resultado
    .spec()
    .post(`${BASE_URL}/users`)
    .withJson(userData);
} //função devolte a resposta da API   ==>permite utulizar const response = await createUser(...)[

async function updateUser(userId, userData, BASE_URL) {
  return await pactum.spec().put(`${BASE_URL}/users/${userId}`).withJson(userData);
}

async function deleteUser(userId, BASE_URL) {
  return await pactum.spec().delete(`${BASE_URL}/users/${userId}`);
}

async function getUser(userId, BASE_URL) {
  return await pactum.spec().get(`${BASE_URL}/users/${userId}`);
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
};
