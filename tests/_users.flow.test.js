// testes encadeados (fluxo real)
//Variáveis dinâmicas (ex: id do usuário criado) podem ser usadas em testes subsequentes
const pactum = require('pactum');
const { BASE_URL, API_KEY } = require('../config/env');
// const BASE_URL = 'https://reqres.in/api'; //base URL da API
// const API_KEY = 'free_user_3DXxmtOsTFL2aSp9XbiHckHR58G'; //define headers padrão
const userData = require('../data/users');
const { createUser } = require('../helpers/user-helper'); //Importa FUNÇÃO específíca
const { updateUser, deleteUser, getUser } = require('../helpers/user-helper'); //trazendo vários de uma vez
const { expect } = require('chai'); //função EXPECT da bibilioteca CHAI

beforeEach(() => {
  console.log('Start novo test');
  pactum.request.setDefaultHeaders({
    //setDefaultHeaders() ==>p/ evitar repetição
    'x-api-key': API_KEY, //✅ estamos enviando a chave da API p/ ✅ autenticar/liberar acesso
  }); //tipo de 🔥 identificação/autorização
});

describe('Fluxo de usuários', () => {
  let userId; //VAR para armazenar o ID do usuário criado

  after(() => {
    //Fora do describe:
    console.log('Fluxo finalizado');
  });

  it('criar usuário', async () => {
    let response = await createUser(userData.defaultUser, BASE_URL); //Usando HELPERS
    // .spec();
    // .post(`${BASE_URL}/users`) //Post = CRIAR
    // .withJson({          //Substutuído por UserData
    //   name: 'Jean',
    //   job: 'QA',
    // })

    // .withJson(userData.defaultUser)
    // .expectStatus(201)
    // .expectJsonLike(userData.defaultUser); //Valida que a resposta contém os dados do usuário criado)
    // .expectJsonLike({                   //Substituído por UserData
    //   name: 'Jean',
    //   job: 'QA',
    console.log(response.statusCode); //usado c/ createUser
    console.log(response.body); //usado c/ createUser
    // });
    userId = response.body.id; //Armazena o ID do usuário criado a partir da resposta da requisição
    let userName = response.body.name; //VAR para armazenar o nome do usuário criado a partir da resposta da requisição
    console.log('Nome do usuário criado:', userName);
    let userJob = response.body.job; //VAR para armazenar o cargo do usuário criado a partir da resposta da requisição
    console.log(userJob);

    expect(response.body.name).to.equal(userData.defaultUser.name);
    expect(response.body.job).to.equal(userData.defaultUser.job);

    // if (response.statusCode !== 201) {
    //   throw new Error('Usuário não criado'); //Validação statusCode      //Substituído por "expect(response.statusCode).to.equal(201)"
    // }

    expect(response.statusCode).to.equal(201); //Usando CHAI  (+ profissional que if...."throw new Error")
  });

  it('atualizar usuário', async () => {
    let response = await updateUser(userId, userData.managerUser, BASE_URL); //Usando HELPERS
    // await pactum
    //   .spec()
    //   .put(`${BASE_URL}/users/${userId}`) //Put = ATUALIZAR   + utiliza o ID do usuário criado no teste anterior
    //   .withJson(userData.managerUser) //Substituído por UserData
    //   .expectStatus(200)
    //   .expectJsonLike(userData.managerUser);
    // .expectJsonLike({              //Substutuído por UserData
    //   name: 'Maria', //Validando de dados foram atualizados
    //   job: 'Manager',
    // });
    let userName = response.body.name;
    let userJob = response.body.job;
    console.log('Nome atualizado:: Maria'); //Validação manual/HARDCODED
    console.log('Cargo atualizado: Manager'); //Validação manual/HARDCODED
    console.log('Nome atualizado ' + userName); //print mas n/ valida!
    console.log('Cargo atualizado:' + userJob); //print mas n/ valida!

    if (response.body.name !== userData.managerUser.name) {
      throw new Error('nome errado'); //Substituído por expect
    }

    expect(response.body.name).to.equal(userData.managerUser.name); //Versão PRO
    expect(response.body.job).to.equal(userData.managerUser.job); //Versão PRO

    // console.log(response.body);
  });

  it('deletar usuário', async () => {
    // let response = await pactum// S/ HELPERS
    let response = await deleteUser(userId, BASE_URL); //usando HELPERS
    // .spec() //S/ HELPERS
    // .delete(`${BASE_URL}/users/${userId}`) // Delete = DELETAR + utiliza o ID do usuário criado no teste anterior  S/ HELPERS
    // .expectStatus(204) //
    // .expectBody('') //Valida que o corpo da resposta está vazio (204 No Content)
    // .inspect();
    // console.log('FIM');
    console.log(response.statusCode);

    if (response.body !== '') {
      throw new Error('Usuário ainda existe'); //Substituído por expect
    }

    expect(response.body).to.be.empty; //Versão PRO
  });

  it('Não deve criar usuário com dados inválidos', async () => {
    await pactum.spec().post(`${BASE_URL}/users`).withJson(userData.invalidUser).expectStatus(201).inspect();
  });

  it('Deve buscar usuário', async () => {
    let response = await getUser(userId, BASE_URL);
  });
}); //Fechamento do describe (Fluxo de usuários)
