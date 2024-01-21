# TTP-SEIDOR
## Como iniciar o projeto:

Dentro da pasta do projeto instale as dependências com o comando:

```bash
npm install
```

Para inicializar o banco com o prisma utilize o comando:

```bash
npx prisma migrate dev
```

## Funcionalidades:
### Cadastro de automóvel:
- [x] Cadastrar um novo automóvel
- [x] Atualizar um automóvel cadastrado
- [x] Excluir um automóvel cadastrado
- [x] Recuperar um automóvel cadastrado pelo seu identificador único
- [x] Listar os automóveis cadastrados. Deve ser possível filtrar a listagem dos automóveis por cor e marca.

### Cadastro de motoristas
- [ ] Cadastrar um novo motorista
- [ ] Atualizar um motorista cadastrado
- [ ] Excluir um motorista cadastrado
- [ ] Recuperar um motorista cadastrado pelo seu identificador único
- [ ] Listar os motoristas cadastrados. Deve ser possível filtrar a listagem dos motoristas por nome.

### Utilização de um automóvel
- [ ] Criar um registro que represente a utilização de um automóvel por um motorista, com uma data de início e um texto do motivo de utilização.
- [ ] Finalizar a utilização de um automóvel por um motorista guardando a data de finalização.
- [ ] Listar os registros de utilização cadastrados no sistema com o nome do motorista e as informações do automóvel utilizado.

## O que devemos controlar de cada recurso:
### Automóvel
- [x] Placa
- [x] Cor
- [x] Marca
### Motorista
- [x] Nome
### Utilização do automóvel
- [x] Data de início da utilização
- [x] Data de término da utilização
- [x] Motorista que utilizou
- [x] Automóvel utilizado
- [x] Motivo de utilização

## Regras de negócio: 
- [ ] Um automóvel só pode ser utilizado por um motorista por vez. 
- [ ] Um motorista que já esteja utilizando um automóvel não pode utilizar outro automóvel ao mesmo tempo.
