# Task Manager

O projeto Task Manager, é uma API simples de gerenciamento de tarefas, desenvolvida com TypeScript, Fastify e Prisma ORM, utilizando um banco de dados MongoDB.

## Estrutura do Projeto

~~~txt
TASKMANAGER
├── prisma                    
│   └── schema.prisma        # Arquivo de esquema Prisma
└── src                       
    ├── controllers           
    │   └── taskController.ts    # Arquivo do controlador de tarefas
    ├── interfaces            
    │   └── task.ts               # Arquivo de interface de tarefas
    ├── locales                 # Diretório de arquivos de localização
    │   └── ptBR.ts               # Arquivo de localização para Português (Brasil)
    ├── prisma                  
    │   └── index.ts             # Arquivo de índice do cliente Prisma
    ├── services                
    │   ├── tasks                # Diretório de serviços relacionados a tarefas
    │   │   └── taskStateMachine.ts   # Arquivo de máquina de estados de tarefa
    │   └── taskService.ts       # Arquivo de serviço de tarefas
    ├── tests                   
    │   ├── controllers          # Diretório de testes para controladores
    │   │   └── task.controller.test.ts   # Arquivo de teste para o controlador de tarefas
    │   └── services             # Diretório de testes para serviços
    │       ├── task.service.test.ts   # Arquivo de teste para o serviço de tarefas
    │       └── taskStateMachine.test.ts   # Arquivo de teste para a máquina de estados de tarefas
    └── utils                   
        └── translate.ts         # Arquivo de utilitário para tradução
├── routes.ts                  # Arquivo de rotas (define os endpoints da API)
└── server.ts                  # Arquivo do servidor (ponto de entrada da aplicação)
├── .env                      # Arquivo de variáveis de ambiente
├── .eslintrc                 # Arquivo de configuração do ESLint
├── .gitignore                # Arquivo de ignorar do Git
├── jest.config.js            # Arquivo de configuração do Jest
├── package-lock.json         # Arquivo de bloqueio de dependências
├── package.json              # Dependências do projeto
├── README.md                 # Documentação do projeto
└── tsconfig.json             # Configuração do compilador TypeScript
~~~

## Tecnologias utilizadas

### Backend

- Node.js (Typescript)
- Gerenciador de Dependências: npm
- Ferramentas de Testes: Jest, TypeScript Jest
- Linter: ESLint, TypeScript ESLint
- Framework: Fastify
- ORM: Prisma
- Banco de Dados: MongoDB
- Plataforma Deploy: Vercel
- Bibliotecas Adicionais: 
    - @fastify/cors: Permite requisições CORS.
    - tsx: Suporte a arquivos TSX no Node.js.


## Instruções de Instalação

Clone o repositório:

~~~bash
git clone git@github.com:heyynat/taskmanager.git
~~~

## Instale as dependências:

~~~bash
cd taskmanager
npm install
~~~

Configure o arquivo .env com as informações do seu banco de dados MongoDB.

Execute a inicialização do Prisma:

~~~bash
npx prisma generate
npx prisma studio
~~~

Inicie o servidor:

~~~bash
npm run dev
~~~

## Rotas para Tarefas

Este documento descreve as rotas disponíveis para gerenciar tarefas na API.

### Sumário

`GET /tasks`: Recupera uma lista de todas as tarefas.

`POST /tasks/new`: Cria uma nova tarefa.

`GET /tasks/:id`: Recupera uma tarefa específica.

`PUT /tasks/edit/:id`: Atualiza uma tarefa existente.

`DELETE /tasks/:id`: Exclui uma tarefa.

`PUT /tasks/:id/transition_status`: Altera o status de uma tarefa.

## Detalhes das Rotas

`GET /tasks`

Descrição: Recupera uma lista de todas as tarefas no banco de dados.

Retorno: Um array de objetos JSON, cada um representando uma tarefa. Cada objeto de tarefa contém as seguintes propriedades:

- id: Identificador único da tarefa.
- title: Título da tarefa.
- description: Descrição da tarefa (opcional).
- status: Status atual da tarefa (ex: "pendente", "em andamento", "concluída", "cancelada").
- createdAt: Data e hora de criação da tarefa.
- updatedAt: Data e hora da última atualização da tarefa.


Exemplo de Resposta:

~~~json
[
  {
    "id": 1,
    "title": "Tarefa 1",
    "description": "Descrição da tarefa 1",
    "status": "pendente",
    "createdAt": "2024-05-21T00:00:00.000Z",
    "updatedAt": "2024-05-21T00:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Tarefa 2",
    "description": "Descrição da tarefa 2",
    "status": "em andamento",
    "createdAt": "2024-05-21T00:00:00.000Z",
    "updatedAt": "2024-05-21T00:00:00.000Z"
  },
  // ... outras tarefas
]
~~~

`POST /tasks/new`

Descrição: Cria uma nova tarefa no banco de dados.

Corpo da Requisição (JSON):

title: Título da tarefa (obrigatório).
description: Descrição da tarefa (opcional).


Exemplo de Corpo da Requisição:

~~~json
{
  "title": "Nova Tarefa",
  "description": "Descrição da nova tarefa"
}
~~~

Retorno: O objeto JSON da tarefa criada, contendo as mesmas propriedades descritas na rota GET /tasks.

Exemplo de Resposta:

~~~json
{
  "id": 3,
  "title": "Nova Tarefa",
  "description": "Descrição da nova tarefa",
  "status": "pendente",
  "createdAt": "2024-05-21T00:00:00.000Z",
  "updatedAt": "2024-05-21T00:00:00.000Z"
}
~~~

`GET /tasks/:id`

Descrição: Recupera uma tarefa específica pelo seu identificador único.

Parâmetros:

`:id`: Identificador único da tarefa (obrigatório).
Exemplo de Requisição:

~~~txt
GET /tasks/1
~~~

Retorno: O objeto JSON da tarefa encontrada, contendo as mesmas propriedades descritas na rota GET /tasks.

Exemplo de Resposta:

~~~json
{
  "id": 1,
  "title": "Tarefa 1",
  "description": "Descrição da tarefa 1",
  "status": "pendente",
  "createdAt": "2024-05-21T00:00:00.000Z",
  "updatedAt": "2024-05-21T00:00:00.000Z"
}
~~~

`PUT /tasks/edit/:id`

Descrição: Atualiza uma tarefa existente no banco de dados.

Parâmetros:

`:id`: Identificador único da tarefa (obrigatório).
Corpo da Requisição (JSON):

Propriedades da tarefa que deseja atualizar (ex: `title`, `description`)

Exemplo de Corpo da Requisição (atualizar título):

~~~json
{
  "title": "Tarefa 1 atualizada"
}
~~~

Retorno:

O objeto JSON da tarefa atualizada, contendo as mesmas propriedades descritas na rota GET /tasks.

Exemplo de Resposta (tarefa atualizada):

~~~json
{
  "id": 1,
  "title": "Tarefa 1 atualizada",
  "description": "Descrição da tarefa 1",
  "status": "pendente",
  "createdAt": "2024-05-21T00:00:00.000Z",
  "updatedAt": "2024-05-21T00:00:00.000Z"
}
~~~

`DELETE /tasks/:id`

Descrição: Exclui uma tarefa do banco de dados.

Parâmetros:

`:id`: Identificador único da tarefa (obrigatório).

Retorno: Um objeto JSON simples confirmando a exclusão.

Exemplo de Resposta:

~~~json
{
  "message": "Tarefa excluída com sucesso!"
}
~~~

`PUT /tasks/:id/transition_status`

Descrição: Altera o status de uma tarefa específica.

Parâmetros: `:id`: Identificador único da tarefa (obrigatório).

Corpo da Requisição (JSON):

status: Novo status da tarefa (ver documentação específica para valores válidos).

Retorno: O objeto JSON da tarefa com o status atualizado, contendo as mesmas propriedades descritas na rota GET /tasks.

Exemplo de Resposta (tarefa com status alterado):

~~~json
{
  "id": 1,
  "title": "Tarefa 1 atualizada",
  "description": "Descrição da tarefa 1",
  "status": "em andamento",
  "createdAt": "2024-05-21T00:00:00.000Z",
  "updatedAt": "2024-05-21T00:00:00.000Z"
}
~~~