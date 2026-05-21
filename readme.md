# Projeto de Automação de Testes API - ReqRes

Este projeto foi desenvolvido com foco em automação de testes de API utilizando Node.js, PactumJS e Chai.

O objetivo é validar operações CRUD em uma API REST, aplicando boas práticas de organização, reutilização e validação de testes automatizados.

---

# Tecnologias utilizadas

- Node.js
- PactumJS
- Chai
- Mocha

---

# Funcionalidades testadas

- Criar usuário (POST)
- Atualizar usuário (PUT)
- Buscar usuário (GET)
- Deletar usuário (DELETE)
- Validação de dados inválidos

---

# Estrutura do projeto

```bash
project/
│
├── config/
├── data/
├── helpers/
├── tests/
├── package.json
```

---

# Recursos aplicados

- Helpers para reutilização de lógica
- Payloads externos
- Hooks (`beforeEach`)
- Assertions com Chai
- Configuração centralizada (`env.js`)
- Fluxo encadeado utilizando ID dinâmico
- Validação de status code e response body

---

# Como executar o projeto

Instalar dependências:

```bash
npm install
```

Executar testes:

```bash
npm test
```

---

# Observações

A API utilizada no projeto é a ReqRes, uma API pública para fins de estudo e prática de testes automatizados.

Alguns endpoints possuem comportamento mockado e limite diário de requisições.
