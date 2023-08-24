# Cadastro de usuários para Omnichannel

O objetivo deste projeto é realizar o cadastro de usuários em um sistema omnichannel. Apesar de compartilharem o mesmo repositório, o frontend e o backend foram desenvolvidos utilizando tecnologias distintas, criando partes independentes de um software fullstack. O backend foi implementado com o uso de Flask e MongoDB, enquanto o frontend foi desenvolvido em React.

## Como executar o projeto

Há duas maneiras de executar o projeto em sua máquina local: utilizando o Docker ou instalando os pacotes, configurando e executando cada parte do projeto manualmente. Independentemente da abordagem escolhida, o primeiro passo é clonar este repositório.

### Executando com o docker

Para executar com o docker, é necessário o Docker e docker-compose instalados.

Acesse o terminal na raiz do diretório clonado e execute com o docker-compose:

```bash
docker-compose up
```

Assim que o docker-compose inicializar todos os containers, basta acessar o frontend através do navegador pelo endereço `http://localhost:5173`.

Para fazer requisições diretamente a API através de um Client API ou de outro frontend, basta usar o endereço `http://localhost:5555`

### Executando manualmente

Para executar manualmente, é necessário ter o Python na versão 3.8 ou acima, o Node.js na versão 18, e o MongoDB. Caso não queira instalar o MongoDB, recomendo usar o [Atlas](https://www.mongodb.com/atlas/database) ou o [Docker](https://hub.docker.com/_/mongo).

#### Backend

Acesse o diretório **_backend_** usando o terminal, crie e ative um ambiente virtual do Python, e instale as dependências:

```bash
python3 -m venv venv
```

```bash
# Linux e MacOS
source venv/bin/activate

# Windows
./venv/Scripts/activate
```

```bash
pip install -r requirements.txt
```

Com as dependências instaladas, configure as variáveis de ambiente. Para isso, crie uma cópia do arquivo **.env.example**, dê o nome de **.env** e preencha com a URL de conexão ao MongoDB.

Com tudo instalado e configurado, acesse o diretório **_app_** e execute o flask:

```bash
cd app
```

```bash
flask run
```

O backend estará executando e pode ser acessado atráves de `http://127.0.0.1:5000`.

#### Frontend

Acesse o diretório **_frontend_** usando o terminal e instale as dependências:

```bash
npm install
```

Com as dependências instaladas, configure as variáveis de ambiente. Para isso, crie uma cópia do arquivo **.env.example**, dê o nome de **.env** e preencha os dados com a URL de acesso a API que já está executando (`http://127.0.0.1:5000`).

Com tudo instalado e configurado, basta executar o projeto:

```bash
npm run dev
```

O frontend estará executando e pode ser acessado atráves de `http://127.0.0.1:5173`.

## Documentação das Rotas da API

Criando uma nova conta de usuário

**URL**: `/users`

**Method**: `POST`

Dados que devem ser enviados:

```json
{
	"name": "name",
	"email": "valid email",
	"address": {
		"street": "street name",
		"zip_code": "valid zip_code",
		"number": "number",
		"country": "country name",
		"city": "city name"
	}
}
```

### Resposta de sucesso

**Condição**: Todos os campos devem ser enviados, email ainda não cadastrado e zip_code válido.

**Code**: `201 CREATED`

**Response body**

```json
{
	"_id": {
		"$oid": "valid id"
	},
	"name": "name",
	"email": "valid email",
	"address": {
		"street": "street name",
		"zip_code": "valid zip_code",
		"number": "number",
		"country": "country name",
		"city": "city name"
	}
}
```

### Respostas de erro

**Condição**: Email já foi cadastrado

**Code**: `409 CONFLICT`

**Response body**

```json
{
	"message": "Register already exists"
}
```

---

**Condição**: Campo não enviado

**Code**: `400 BAD REQUEST`

**Response body**

```json
{
	"message": "ValidationError (User:None) (Field is required: ['email'])"
}
```

---

**Condição**: Campo incorreto enviado

**Code**: `400 BAD REQUEST`

**Response body**

```json
{
	"message": "The fields \"{'haha'}\" do not exist on the document \"User\""
}
```

---

**Condição**: zip_code inválido

**Code**: `400 BAD REQUEST`

**Response body**

```json
{
	"message": "Invalid address"
}
```

## Tecnologias utilizadas

- [Flask](https://flask.palletsprojects.com/en/2.3.x/)
- [React](https://react.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
