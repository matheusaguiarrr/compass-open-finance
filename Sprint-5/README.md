# Desafio: API Agregadora de Contas Bancárias (Mini Banco Central)

## Objetivo

Desenvolver uma API REST que consolida informações bancárias de um usuário, simulando o papel de um "banco central" no contexto de Open Finance. A aplicação deve permitir visualizar saldos e extratos de diferentes instituições financeiras, bem como o total consolidado.

## Requisitos

### 1. Entidades principais

-   **Usuário**: Cada usuário pode ter contas em diferentes instituições.
-   **Instituição**: Representa um banco (ex: Itaú, Banco do Brasil).
-   **Conta**: Relaciona um usuário com uma instituição e tem um saldo.
-   **Transação**: Representa um lançamento financeiro (crédito ou débito) em uma conta.

### 2. Funcionalidades obrigatórias

-   Cadastrar instituições financeiras.
-   Cadastrar contas para usuários em instituições diferentes.
-   Realizar lançamentos (transações) nas contas.
-   Obter saldo total do usuário.
-   Obter saldo por instituição.
-   Obter extrato completo do usuário.
-   Filtrar extrato por instituição.

### 3. Endpoints sugeridos

-   **Criar instituição**  
     `POST /instituicoes`
-   **Criar conta**  
     `POST /usuarios/:id/contas`
-   **Adicionar transação**  
     `POST /usuarios/:id/transacoes`
-   **Ver saldos**  
     `GET /usuarios/:id/saldo` → mostra o total consolidado  
     `GET /usuarios/:id/saldo?instituicao=Itau` → mostra saldo só do Itaú
-   **Ver extrato**  
     `GET /usuarios/:id/extrato` → mostra todas as transações  
     `GET /usuarios/:id/extrato?instituicao=BB` → filtra por banco

## Critérios de Avaliação

| Critério                           | Peso |
| ---------------------------------- | ---- |
| Funcionalidades obrigatórias       | 50%  |
| Organização e clareza do código    | 20%  |
| Uso correto de conceitos de API    | 15%  |
| Boas práticas (nomenclatura, REST) | 15%  |

## Dicas

-   Mantenha as estruturas de dados organizadas.
-   Pense como um agregador: sua API deve centralizar informações que poderiam vir de diversos bancos.
-   Explore filtros e agrupamentos para deixar as consultas mais interessantes.
