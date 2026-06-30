# api/v1/auth e api/v1/user

Essa documentação mostra o funcionamento da autenticação e usuários no servidor

## Modelo de dado

Um usuário possui os seguintes atributos no banco:

| Nome | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `id` | `ObjectId` | id automaticamente gerado pelo MongoDB |
| `name`| `string`|nome do usuário|
|`email`|`string`|email do usuário|
|`password`|`string`|senha criptografada do usuário|
|`role` |`string`| função do usuário (student, professor)|

## Rotas

#### Register

Registra um usuário no sistema


```http
  POST /api/v1/auth/register
```

| Parâmetros | Exemplo     | Obrigatório?                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `Maria` | Sim |
| `email` | `email@gmail.com` | Sim |
| `password` | `123` | Sim |
| `role` | `student` | Não (default = student)|


#### Login

Realiza login de um usuáro no sistema

```http
  POST /api/v1/auth/login
```

| Parâmetros | Exemplo     | Obrigatório?                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `email@gmail.com` | Sim |
| `password` | `123` | Sim |

#### Logout

Realiza logout do usuário no servidor


```http
  POST /api/v1/auth/logout
```

### Change User Data

Altera dados do usuário no sistema

```http
  POST /api/v1/user/edit
```
| Parâmetros | Exemplo     | Obrigatório?                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `Novo nome` | Não |
| `oldPassword` | `123` | Não (Sim se houver newPassword) |
| `newPassword` | `456 ` | Não |

