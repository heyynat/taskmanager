# Task Manager

O projeto Task Manager, é uma API simples de gerenciamento de tarefas, desenvolvida com TypeScript, Fastify e Prisma ORM, utilizando um banco de dados MongoDB.

## Estrutura do Projeto

~~~txt
TASKMANAGER
├── .eslintrc             # Arquivo de configuração do ESLint
├── .gitignore            # Arquivo de ignorar do Git
├── jest.config.js        # Arquivo de configuração do Jest
├── package-lock.json     # Arquivo de bloqueio de dependências
├── package.json          # Dependências do projeto
├── README.md             # Documentação do projeto
├── tsconfig.json         # Configuração do compilador TypeScript
├── prisma                # Diretório Prisma
│   └── schema.prisma      # Arquivo de esquema Prisma
├── src                   # Diretório do código fonte
│   ├── controllers       # Diretório de controladores
│   │   └── taskController.ts  # Arquivo do controlador de tarefas
│   ├── interfaces        # Diretório de interfaces
│   │   └── task.ts         # Arquivo de interface de tarefas
│   ├── prisma            # Diretório do cliente Prisma
│   │   └── index.ts         # Arquivo de índice do cliente Prisma
│   ├── services          # Diretório de serviços
│   │   └── taskService.ts   # Arquivo de serviço de tarefas
│   ├── tests              # Diretório de testes (provavelmente contendo arquivos de teste)
│   └── routes.ts          # Arquivo de rotas (define os endpoints da API)
└── server.ts             # Arquivo do servidor (ponto de entrada da aplicação)
~~~

## Tecnologias utilizadas:

- Backend: Node.js (Typescript)
- Framework: Fastify
- ORM: Prisma
- Banco de Dados: MongoDB

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

Execute as migrações do Prisma:

~~~bash
npx prisma generate
npx prisma migrate
npx prisma studio

~~~

Inicie o servidor:

~~~bash
npm run dev
~~~