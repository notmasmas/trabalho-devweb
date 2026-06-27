# api/v1/files

Essa branch é dedicada ao desenvolvimento das rotas de API relacionadas à sessão de biblioteca de PDFs do site, onde o usuário poderá fazer upload, editar e baixar PDFs

## Modelo de dado

Um arquivo PDF contém os seguintes atributos no banco de dados:

| Nome | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `id` | `ObjectId` | id automaticamente gerado pelo MongoDB |
| `name`| `string`|nome do arquivo|
|`author`|`string`|autor do arquivo|
|`uploader`|`ObjectID`|quem fez upload do arquivo (id dele no banco)|
|`description`|`string`|descrição do arquivo|
|`proctected`|`bool`|se o arquivo está disponível somente para professores
|`fileSize`|`number`|tamanho do arquivo |
|`fileURI`|`string`|URI de onde está armazenado o arquivo PDF em si|
|`previewImageURI`|`string`|URI de onde está armazenada a imagem de preview do arquivo|
|`uploadDate`|`Date`|data de upload do arquivo|


## Rotas

#### Get all files

Pega todos os arquivos disponívels no banco de dados.


```http
  GET /api/v1/files
```

| Query | Exemplo     | Descrição                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `api/v1/files?name="Word"` | Arquivos cujo nome possui essa palavra |
|`author` | `api/v1/files?author="John"`| Arquivos cujo autor possui esse nome |
|`uploader`| `api/v1/files?uploader="Pietra"` | Arquivos cujo dono possui esse nome |
|`page` | `api/v1/files?page=2` | Arquivos da página solicitada dependendo do limite
|`limite` | `api/v1/files?limit=10` | Limita a quantidade de arquivos retornados

<details>
<summary>Saída</summary>

```http
  {
    "files": [
        {
            "_id": "69e57f60b0de1134a4f6741e",
            "name": "Testing Patch lololol",
            "author": "John Doe",
            "uploader": "Jane Smith",
            "description": "This is a test file for the API request.",
            "protected": false,
            "fileSize": 1024,
            "fileURI": "uploads/files/test_file.pdf",
            "previewImageURI": "/uploads/images/default.jpg",
            "uploadDate": "2026-04-20T01:20:32.915Z",
            "__v": 0
        },
        {
            "_id": "69f501963943353a8e2c23fb",
            "name": "Test File",
            "author": "John Doe",
            "uploader": "Jane Smith",
            "description": "This is a test file for the API request",
            "protected": false,
            "fileSize": 1024,
            "fileURI": "uploads/file/test_file.pdf",
            "previewImageURI": "/uploads/images/default.jpg",
            "uploadDate": "2026-05-01T19:40:06.194Z",
            "__v": 0
        }]
    }
```
</details>

#### Create file

Faz upload de um arquivo e cria ele no banco de dados.

```http
  POST /api/v1/files
```

| Parâmetros | Exemplo     | Obrigatório?                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `Arquivo bem legal` | Sim |
|`author` | `John`| Sim |
|`description` | `Essa história aqui [...]` | Não (default = '')| 
|`protected` | `true` | Não (default = false)|

#### Get file

Pega apenas um arquivo.


```http
  GET /api/v1/files/{id}
```
| Parâmetros | Exemplo     | Obrigatório?                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `12345` | Sim |


<details>
<summary>Saída</summary>

```http
{
  "_id": "6a19d65629856ed2a2e5c9cc",
  "name": "Test File",
  "author": "Jack Doe",
  "uploader": "Lara Smith",
  "description": "This is a test file for the API request",
  "protected": false,
  "fileSize": 68096,
  "fileURI": "uploads/files/1780078166431-Curriculo_Maria_Helena_Melo.pdf",
  "previewImageURI": "uploads/images/default.jpg",
  "uploadDate": "2026-05-29T18:09:26.438Z",
  "__v": 0
}
```
</details>

### Delete File

Deleta um arquivo do banco de dados e da pasta de uploads.

```http
  DELETE /api/v1/files/{id}
```
| Parâmetros | Exemplo     | Obrigatório?                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `12345` | Sim |

### Edit File

Edita um arquivo que o usuário criou.

```http
  PATCH /api/v1/files/{id}
```

| Parâmetros | Exemplo     | Obrigatório?                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `123`| Sim |
| `name (body)`      | `Arquivo bem legal` | Não |
|`author (body)` | `John`| Não |
|`description (body)` | `Essa história aqui [...]` | Não | 
|`protected (body)` | `true` | Não |

### Download File

Manda para o client o arquivo .pdf requisitado para download

```http
  GET /api/v1/files/download/{id}
```
| Parâmetros | Exemplo     | Obrigatório?                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `12345` | Sim |