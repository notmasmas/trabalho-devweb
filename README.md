# Hub de Conhecimento para o Centro Acadêmico de Design IFSC

A Proposta da plataforma é centralizar conhecimentos úteis para alunos de graduação do curso de Design do IFSC

> Contando com fórum, biblioteca de PDFs, área de compartilhamento de trabalhos de design realizados por outros alunos e fluxograma de matérias do curso incluindo seus requerimentos prévios

## Inspirações

Nos foi apresentado esse problema de descentralização de informações pelo próprio centro acadêmico em questão. O pedido deles foi nosso auxílio para criar uma plataforma em que seja possível encontrar todas as informações úteis para os alunos em um só lugar.

## Funcionalidades

- Fórum da comunidade para tirar dúvidas ou conhecer outros alunos
- Biblioteca de PDFs, com a possibilidade de pesquisa, download e upload de arquivos. Professores podem fazer o upload de PDFs na plataforma e marcá-los como disponíveis apenas para outros professores ou alunos de determinado semestre
- Fluxograma das matérias do curso, apontando seus requerimentos e que matéria é recomendada ser feita em determinada fase do curso
- Seção de divulgação de trabalhos dos próprios alunos para inspiração e portfólio

## Cores utilizadas

--cream:  #f2ede4;\
--dark:   #1c1c1c;\
--dark_blue: #171253;\
--border: #c8bfb0;\
--muted:  #7a7060;\
--green-ifsc: #84CB87;\
--red-ifsc: #F55A0A;

## Instalação dos módulos

- É necessário ter o Node.js/NPM instalado
  
Se a IDE utilizada possuir terminal integrado, com o projeto aberto:

`$ npm install`

Senão, em um terminal:\
`$ cd diretorio_em_que_o_projeto_esta/trabalho-devweb`\
`$ npm install`

## Integrantes do grupo
- Pietra Mota
- Sarah Meireles
- Gustavo de Pinho
- Maria Helena Melo
- Filipe Pereira da Silva

# api/pdf-library

Essa branch é dedicada ao desenvolvimento das rotas de API relacionadas à sessão de biblioteca de PDFs do site, onde o usuário poderá fazer upload, editar e baixar PDFs

## Modelo de dado

Um arquivo PDF contém os seguintes atributos no banco de dados:

| Nome | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | id automaticamente gerado pelo MongoDB |
| `name`| `string`|nome do arquivo|
|`author`|`string`|autor do arquivo|
|`uploader`|`ObjectID`|quem fez upload do arquivo|
|`description`|`string`|descrição do arquivo|
|`proctected`|`bool`|se o arquivo está disponível somente para professores
|`fileSize`|`number`|tamanho do arquivo |
|`fileURI`|`string`|URI de onde está armazenado o arquivo PDF em si|
|`previewImageURI`|`string`|URI de onde está armazenada a imagem de preview do arquivo|
|`uploadDate`|`Date`|data de upload do arquivo|


## Rotas

#### Get all items

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
|`uploader`| `Pietra` | Sim |
|`description` | `Essa história aqui [...]` | Não (default = '')| 
|`protected` | `true` | Não (default = true)|

#### Get all items

Pega apenas um arquivo.


```http
  GET /api/v1/files/{id}
```

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
| `name`      | `Arquivo bem legal` | Não |
|`author` | `John`| Não |
|`uploader`| `Pietra` | Não |
|`description` | `Essa história aqui [...]` | Não | 
|`protected` | `true` | Não |

### Download File

Manda para o client o arquivo .pdf requisitado para download

```http
  GET /api/v1/files/download/{id}
```
| Parâmetros | Exemplo     | Obrigatório?                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `12345` | Sim |

