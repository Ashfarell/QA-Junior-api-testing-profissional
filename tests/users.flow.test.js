// testes encadeados (fluxo real)
//Variáveis dinâmicas (ex: id do usuário criado) podem ser usadas em testes subsequentes

const pactum = require('pactum');
const BASE_URL = 'https://reqres.in/api'; //base URL da API
const API_KEY = 'free_user_3DXxmtOsTFL2aSp9XbiHckHR58G'; //define headers padrão

beforeEach(() => {
  console.log('Start novo test)');
  pactum.request.setDefaultHeaders({
    'x-api-key': API_KEY,
  });
});

describe('Fluxo de usuários', () => {
  let userId; //VAR para armazenar o ID do usuário criado

  it('criar usuário', async () => {
    let response = await pactum // VAR p/ armazenar a resposta da requisição em uma variável
      .spec()
      .post(`${BASE_URL}/users`) //Post = CRIAR
      .withJson({
        name: 'Jean',
        job: 'QA',
      })
      .expectStatus(201)
      .expectJsonLike({
        name: 'Jean',
        job: 'QA',
      });
    userId = response.body.id; //Armazena o ID do usuário criado a partir da resposta da requisição
    let userName = response.body.name; //VAR para armazenar o nome do usuário criado a partir da resposta da requisição
    console.log('Nome do usuário criado:', userName);
    let userJob = response.body.job; //VAR para armazenar o cargo do usuário criado a partir da resposta da requisição
    console.log(userJob);
  });

  it('atualizar usuário', async () => {
    await pactum
      .spec()
      .put(`${BASE_URL}/users/${userId}`) //Put = ATUALIZAR   + utiliza o ID do usuário criado no teste anterior
      .withJson({
        name: 'Maria',
        job: 'QA',
      })
      .expectStatus(200)
      .expectJsonLike({
        name: 'Maria', //Validando de dados foram atualizados
        job: 'QA',
      });
  });

  it('deletar usuário', async () => {
    let response = await pactum
      .spec() //
      .delete(`${BASE_URL}/users/${userId}`) // Delete = DELETAR + utiliza o ID do usuário criado no teste anterior
      .expectStatus(204) //
      .expectBody('') //Valida que o corpo da resposta está vazio (204 No Content)
      .inspect();
  });
}); //Fechamento do describe (Fluxo de usuários)
