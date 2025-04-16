# 🏦 Desafio - API Agregadora de Contas Bancárias (Mini Banco Central)

Este projeto simula uma API RESTful que consolida informações bancárias de um usuário, simulando o papel de um "banco central" no contexto de Open Finance. A aplicação permitir visualizar saldos e extratos de diferentes instituições financeiras, bem como o total consolidado.

---

## 🚀 Tecnologias Utilizadas

-   **NodeJS** + **Express** – Backend
-   **PostgreSQL** – Banco de dados relacional
-   **Docker** – Criação de ambientes isolados e reprodutíveis
-   **Sequelize** – ORM para abstração do banco de dados
-   **Yup** – Validação de dados
-   **ESLint** – Padronização de código
-   **dotenv** – Gerenciamento de variáveis de ambiente
-   **normalize-text** – Normalização de strings

---

## 📁 Estrutura de Pastas

```
src/
├── app/
│   └── models
│   └── controllers
├── config/
├── database/
│   └── migrations
```

## 🖥️ Executando o projeto na sua máquina local

### ✅ Pré-Requisitos

-   [NodeJS 22.14+](https://nodejs.org/)
-   [Docker 27,2+](https://www.docker.com/)
-   [Git](https://git-scm.com/)

### ⬇️ Clonando o projeto

```bash
    git clone https://github.com/matheusaguiarrr/compass-open-finance.git
    cd compass-open-finance
```

### 🧹 Limpando arquivos de sprints anteriores

#### Linux

```bash
    rm -rf Sprint-1 Sprint-2 Sprint-3 Sprint-4 README.md
```

#### Windows CMD

```bash
    del /s /q Sprint-1 Sprint-2 Sprint-3 Sprint-4 README.md
```

#### Windows PowerShell

```bash
    Remove-Item -Recurse -Force Sprint-1, Sprint-2, Sprint-3, Sprint-4, README.md
```

### 📂 Acessando o desafio

```bash
    cd Sprint-5/Desafio
```

### ⚙️ Configurando o ambiente

-   Copiar o arquivo .env.example

```bash
    cp .env.example .env
```

-   Edite as variáveis no novo .env com as credenciais desejadas:

```bash
    POSTGRES_USER=
    POSTGRES_PASSWORD=
    POSTGRES_DB=
```

-   Subindo o banco de dados com Docker

```bash
    docker-compose up -d
```

-   Instalando as dependências

```bash
    npm install
```

-   Rodando as migrations

```bash
    npx sequelize db:migrate
```

Iniciando o servidor

```bash
    npm run dev
```

## Tabela de Rotas da API

| Método | Endpoint                       | Descrição                                | Parâmetros                                         |
| ------ | ------------------------------ | ---------------------------------------- | -------------------------------------------------- |
| GET    | /ping                          | Retorna uma mensagem de teste ("pong")   | —                                                  |
| POST   | /users                         | Cria um novo usuário                     | cpf, name, email                                   |
| GET    | /users/:id                     | Retorna os detalhes de um usuário        | :id                                                |
| PUT    | /users/:id                     | Atualiza os dados de um usuário          | :id, name, email                                   |
| GET    | /institutions                  | Lista todas as instituições              | —                                                  |
| POST   | /institutions                  | Cadastra uma nova instituição            | name                                               |
| GET    | /institutions/:id              | Retorna os detalhes de uma instituição   | :id                                                |
| PUT    | /institutions/:id              | Atualiza os dados de uma instituição     | :id, name                                          |
| DELETE | /institutions/:id              | Remove uma instituição                   | :id                                                |
| GET    | /users/:id/accounts            | Lista todas as contas de um usuário      | :id                                                |
| POST   | /users/:id/accounts            | Cadastra uma nova conta para um usuário  | :id, institution_id, balance (opcional)            |
| GET    | /users/:id/accounts/:accountId | Retorna os detalhes de uma conta         | :id, accountId                                     |
| DELETE | /users/:id/accounts/:accountId | Remove uma conta de um usuário           | :id, accountId                                     |
| GET    | /users/:id/balance             | Retorna o saldo total do usuário         | :id, institution (query param - opcional)          |
| POST   | /users/:id/transactions        | Cadastra uma nova transação              | :id, institution_id, value, type (credit ou debit) |
| GET    | /users/:id/extract             | Lista o extrato de transações do usuário | :id, institution (query param - opcional)          |
