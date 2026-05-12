const pactum = require('pactum');
const BASE_URL = 'https://reqres.in/api'; //base URL da API
const API_KEY = 'free_user_3DXxmtOsTFL2aSp9XbiHckHR58G'; //define headers padrão

beforeEach(() => {
  console.log('Iniciando testes...');
  pactum.request.setDefaultHeaders({
    'x-api-key': API_KEY,
  });
});

describe('GET/Users', () => {
  it('Deve retornar lista de usuários', async () => {
    const response = await pactum //guarda a resposta da requisição em uma variável
      .spec() //SPEC: cria uma “especificação de teste”.
      .get(`${BASE_URL}/users?page=2`) //Busca dados da página 2
      //   .withHeaders('x-api-key', API_KEY)
      .expectStatus(200) //valida Status Code
      .expectJsonLike({
        page: 2, //valida propriedade page (SIMPLES)
        data: [
          {
            id: 7, //valida Array JSON (COMPLEXO)
          },
        ],
      })
      .inspect(); //mostra no terminal (request, headers, response,...)
  });

  it('Deve retornar 404 para usuário inexistente', async () => {
    const response = await pactum //guarda a resposta da requisição em uma variável
      .spec()
      .get(`${BASE_URL}/users/99`)
      //   .withHeaders('x-api-key', API_KEY)
      .expectStatus(404) //valida Status Code
      .inspect(); //mostra no terminal (request, headers, response,...)
  });
});

describe('POST/Users', () => {
  it('Deve criar um usuário', async () => {
    const response = await pactum //guarda a resposta da requisição em uma variável
      .spec() //cria uma instância/configuração da requisição de teste
      .post(`${BASE_URL}/users`) //➡️ tenta criar um usuário
      //   .withHeaders('x-api-key', API_KEY)
      .withJson({
        name: 'Jean',
        job: 'QA',
      })
      .expectStatus(201)
      .expectJsonLike({
        name: 'Jean',
        job: 'QA',
        id: /\d+/, //valida se o id é um número (REGEX)
        createdAt: /2026/,
      })
      .inspect();
  });

  it('Deve criar usuário com payload parcial', async () => {
    const response = await pactum //guarda a resposta da requisição em uma variável
      .spec() //ddd
      .post(`${BASE_URL}/users/99`) //dddd
      //   .withHeaders('x-api-key', API_KEY)
      .withJson({
        name: 'Jean',
      })
      .inspect();
  });
});

describe('PUT/Users', () => {
  it('Deve atualizar usuário', async () => {
    const response = await pactum //guarda a resposta da requisição/API em uma variável
      .spec()
      .put(`${BASE_URL}/users/2`) //buscar USER 2
      //   .withHeaders('x-api-key', API_KEY)
      .withJson({
        name: 'Jean',
        job: 'Senior QA',
      })
      .expectStatus(200)
      .inspect();

    const userName = response.body.name; //✅ acessou propriedade do JSON //só é possível por conta do  const response
    console.log(userName);

    const userJob = response.body.job;
    console.log(userJob);
  });
});

describe('DELETE/Users', () => {
  it('Deve deletar usuário', async () => {
    const response = await pactum //guarda a resposta da requisição em uma variável
      .spec() //d
      .delete(`${BASE_URL}/users/2`) //d
      //   .withHeaders('x-api-key', API_KEY)
      .expectStatus(204)
      .inspect();
  });
});
