# API Testing Profissional

Projeto de automação de testes de API desenvolvido com PactumJS e Mocha.

O objetivo do projeto é validar operações CRUD em APIs REST, aplicando boas práticas de automação e validação de respostas.

---

# Tecnologias utilizadas

- Node.js
- PactumJS
- Mocha

---

# Cenários automatizados

## GET

- Buscar lista de usuários
- Validar usuário inexistente (404)

## POST

- Criar usuário
- Validar resposta da criação

## PUT

- Atualizar usuário
- Validar alteração de dados

## DELETE

- Deletar usuário
- Validar status 204

## Fluxo dinâmico

- Criar usuário
- Capturar ID dinamicamente
- Atualizar usuário criado
- Deletar usuário criado

---

# Estrutura do projeto

```bash
tests/
├── users.test.js
├── users.flow.test.js
```
