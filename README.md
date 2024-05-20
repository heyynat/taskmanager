# Task Manager

O projeto Task Manager, é uma API simples de gerenciamento de tarefas, desenvolvida com TypeScript, Fastify e Prisma ORM, utilizando um banco de dados MongoDB.

## Estrutura do Projeto

~~~txt
~~~

## Tecnologias utilizadas:

- Backend: Node.js (Typescript)
- Framework: Fastify
- ORM: Prisma
- Banco de Dados: MongoDB
- Plataforma Deploy: Vercel

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