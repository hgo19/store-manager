
# Store Manager

Sistema de gerenciamento de vendas construído através de uma API RESTful.


## Habilidades

Nesse projeto foi desenvolvido as seguintes capacidades:
- Conectado uma aplicação ao banco de dados MySQL;
- Estruturado a aplicação em camadas MSC (Models, Services e Controllers);
- Delegado corretamente a responsabilidade de cada camada;
- Escrito código reutilizável;
- Aplicado padrões REST;
- Escrito testes unitários para a aplicação.
## Funcionalidades
Nessa aplicação é possível:
- Listar todos os produtos;
- Cadastrar um novo produto;
- Cadastrar uma nova venda;
- Listar todas as vendas;
- Atualizar um produto;
- Deletar um produto;
- Deletar uma venda;
- Atualizar uma venda;
- Pesquisar produtos através do nome;
Essas Funcionalidades são feitas através dos endpoints explicados abaixo;
## Rodando a aplicação

<details>
  <summary><strong>🐳 Rodando no Docker vs Localmente</strong></summary>

### Com Docker

> **Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**

1. Clone o repositório:

```bash
git clone git@github.com:hgo19/store-manager.git
```

2.  Inicie os containers através do comando:

```bash
docker-compose up -d
```

3.  Entre no container com node e instale as dependências:

```bash
docker exec -it store_manager bash
```
Dentro do Container:
```bash
npm install
```
```bash
npm run migration
```

```bash
npm run seed
```

4.  A aplicação estará rodando na porta 3000, para acessála basta acessar o endereço: http://localhost:3000 e então utilizar os endpoints.

 <br />

### Sem Docker

1. Instale as dependências com:
```bash
npm install
```
2. Na aplicação tem um arquivo chamado .env.example, renomei e o configure para que consiga rodar localmente.

3. Para rodar localmente você precisa ter instalado o `Node.js` na sua máquina, em que, a versão deve ser `"node": ">=16.0.0"` e a versão do `"npm": ">=7.0.0"`.

</details>

## Endpoints
<details>
<summary><strong>Na aplicação foram usados os seguintes endpoints: </strong></summary>

products:
- GET `/products` que retorna todos os produtos cadastrados;
- GET `/products/search?q=query` que pesquisa o produto pelo nome;
- GET `/products/:id` que retorna o produto pelo id passado, caso seja um id válido;
- POST `/products` para postar um produto novo, o body deve ter a propriedade `name`;
- PUT `/products/:id` para atualizar um produto em caso de id válido, no body da requisição deve ter as propriedades `name`;
- DELETE `/products/:id` para deletar um produto em caso de id válido.

sales:
- POST `/sales` adicionará uma nova venda, o body da requisição precisa ter as propriedades: `productId` sendo o id válido de um produto existente na tabela, e `quantity` sendo um número maior que 0;
- GET `/sales` retorna todas as vendas cadastradas;
- GET `/sales/:id` em caso de id válido, retorna a venda cadastrada de acordo com o id passado;
- DELETE `/sales/:id` deleta uma venda em caso de id válido;
- PUT `/sales/:id` atualiza uma venda em caso de id válido, o body da requisição precisa ter as propriedades: `productId` sendo o id válido de um produto existente na tabela, e `quantity` sendo um número maior que 0;
</details>

Projeto desenvolvido por: [Hugo Leonardo](https://www.linkedin.com/in/hugo-leop/).