# api/v1/posts

Essa documentação mostra o funcionamento das rotas de posts no fórum

## Modelo de dado

Um post de forum possui os seguintes atributos no banco de dados:

| Nome | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `id` | `ObjectId` | id automaticamente gerado pelo MongoDB |
| `title`| `string`|título do post|
|`body`|`string`|corpo do post (texto)|
|`author`|`string`|quem fez upload do arquivo (nome)|
|`authorId` |`string`| id de quem fez upload do arquivo|
|`comments`|`[{user, text, createdAt}]`|conjunto de comentários|
|`tags`|`[string]`|lista de tags do post|
|`imageSize`|`number`|tamanho da imagem (se tiver) |
|`imageURI`|`string`|URI de onde está armazenada a imagem em si|
|`uploadDate`|`Date`|data de upload do arquivo|

## Rotas

#### Get all posts

Pega todos os posts disponívels no banco de dados.


```http
  GET /api/v1/posts
```

| Query | Exemplo     | Descrição                       |
| :-------- | :------- | :-------------------------------- |
|`page` | `api/v1/posts?page=2` | Arquivos da página solicitada dependendo do limite
|`limit` | `api/v1/posts?limit=10` | Limita a quantidade de posts retornados

<details>
<summary>Saída</summary>

```http
  {
    "posts": [
    {
        "_id": "6a3f1e38c721aaf64b86764c",
        "title": "Test post",
        "body": "This is a test post to test this API Route",
        "author": "Maria",
        "authorId": "6a3ef61633777e10c3035c2b"
        "tags": [
            "cool,amazing"
        ],
        "likes": 0,
        "imageSize": 2661806,
        "imageURI": "uploads/1782521400424-plasma.jpg",
        "comments": [
            {
                "user": "6a3ef61633777e10c3035c2b",
                "text": "wow, what a great post!",
                "createdAt": "2026-06-27T00:50:00.444+00:00"
            }
        ],
        "uploadDate": "2026-06-27T00:50:00.444Z",
        "__v": 0
    }
    ]   
  }
```
</details>

#### Create post

Cria um post no fórum

```http
  POST /api/v1/posts
```

| Parâmetros | Exemplo     | Obrigatório?                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `Post bem legal` | Sim |
|`body`| `Pipipipopopo` | Sim |
|`tags` | `['cool', 'hints']` | Não (default = '[]')| 

#### Get post

Pega apenas um post.


```http
  GET /api/v1/posts/{id}
```
| Parâmetros | Exemplo     | Obrigatório?                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `12345` | Sim |

<details>
<summary>Saída</summary>

```http
{
    "_id": "6a3f1e38c721aaf64b86764c",
    "title": "Test post",
    "body": "This is a test post to test this API Route",
    "author": "Maria",
    "authorId": "6a3ef61633777e10c3035c2b"
    "tags": [
        "cool,amazing"
    ],
    "likes": 0,
    "imageSize": 2661806,
    "imageURI": "uploads/1782521400424-plasma.jpg",
    "comments": [],
    "uploadDate": "2026-06-27T00:50:00.444Z",
    "__v": 0
}
```
</details>

### Delete Post

Deleta um arquivo do banco de dados e da pasta de uploads.

```http
  DELETE /api/v1/posts/{id}
```
| Parâmetros | Exemplo     | Obrigatório?                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `12345` | Sim |

### Edit Post

Edita um post que o usuário criou

```http
  PATCH /api/v1/posts/{id}
```

| Parâmetros | Exemplo     | Obrigatório?                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `123`| Sim |
| `title (body)`      | `Novo título do post` | Não |
|`body (body)` | `Novo corpo de texto...` | Não | 

### Create Comment

Cria um comentário no post

```http
  POST /api/v1/posts/comments/{id}
```
| Parâmetros | Exemplo     | Obrigatório?                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `123`| Sim |
| `body (body)`      | `Comentário muito legal!` | Sim |