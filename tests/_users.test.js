const pactum = require('pactum');

describe('API Testing - Users', () => {
  it('Deve retornar lista de usuários', async () => {
    await pactum
      .spec() //SPEC: cria uma “especificação de teste”.
      .get('https://reqres.in/api/users?page=2')
      .withHeaders('x-api-key', 'free_user_3DXxmtOsTFL2aSp9XbiHckHR58G') //valida Autentificação
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
    await pactum
      .spec()
      .get('https://reqres.in/api/users/99')
      .withHeaders('x-api-key', 'free_user_3DXxmtOsTFL2aSp9XbiHckHR58G') //valida Autentificação
      .expectStatus(404) //valida Status Code
      .inspect(); //mostra no terminal (request, headers, response,...)
  });

  it('Deve criar um usuário', async () => {
    await pactum
      .spec() //cria uma instância/configuração da requisição de teste
      .post('https://reqres.in/api/users') //➡️ tenta criar um usuário
      .withHeaders('x-api-key', 'free_user_3DXxmtOsTFL2aSp9XbiHckHR58G') //➡️ envia autenticação/ENVIA headers para API
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

  it('Não deve criar usuário sem payload', async () => {
    await pactum
      .spec() //ddd
      .post('https://reqres.in/api/users') //dddd
      .withHeaders('x-api-key', 'free_user_3DXxmtOsTFL2aSp9XbiHckHR58G') //➡️ envia autenticação/ENVIA headers para API
      .withJson({
        name: 'Jean',
      })
      .inspect();
  });

  it('Deve atualizar usuário', async () => {
    await pactum
      .spec()
      .put('https://reqres.in/api/users/ID') //ddd
      .withHeaders('x-api-key', 'free_user_3DXxmtOsTFL2aSp9XbiHckHR58G') //➡️ envia autenticação/ENVIA headers para API
      .withJson({
        name: 'Jean',
        job: 'Senior QA',
      })
      .expectStatus(200)
      .inspect();
  });

  it('Deve deletar usuário', async () => {
    await pactum
      .spec() //d
      .delete('https://reqres.in/api/users/2') //d
      .withHeaders('x-api-key', 'free_user_3DXxmtOsTFL2aSp9XbiHckHR58G') //➡️ envia autenticação/ENVIA headers para API
      .expectStatus(204)
      .inspect();
  });
}); //FECHA DESCRIBE
