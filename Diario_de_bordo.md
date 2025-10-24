## 20/10/2025 
Primeiramente, olá!

Por enquanto esse será o meu diário de bordo onde registrarei
todas as minhas atividades e explicitarei cada parte do
desenvolvimento desta API. Esse diário servirá primordialmente
para a construção do meu _README.md_ no futuro quando estiver 
com o projeto concluído ou praticamente concluío.

Segundamente, é importante frizar o motivo de eu ter criado 
esse arquivo tão tardiamente sendo que ele teve 2 semanas 
inteiras para ser entrege. Estava em foco na produção da 
documentação solicitada pela minha outra trilha para me manter 
dentro do prazo. Isso além de minhas obrigações na faculdade.

Apesar disso, o trabalho será entrege dentro do prazo se Deus 
assim permitir. Sem mais delongas, segue o relatório ordinário 
do dia de hoje:

****
### TEMA
O tema selecionado para atividade será uma simples lista de 
compras colaborativa, onde os usuários poderão gerenciar 
suas listas de compras compartilhadas e seus itens respectivos 
dentro delas.

As três entidades-chave desse projeto serão: Usuário, Lista de
compras (Board) e Item (Task)

Segue uma tabela com os respectivos papeis e relações entre si:
| Entidade    | Papel no projeto                           | Relações    |
|-------------|--------------------------------------------|-------------|
| Usuário     | Membro da casa ou da equipe colaboradora   | 1:N com Lista, 1:N com Item (rastreia quem adicionou/marcou o item). |
| Lista       | Listas especificas com títulos             | N:1 com Usuário (o criador da lista), 1:N com Item. |
| Item        | Produto que precisa ser comprado           | N:1 com Lista (a qual pertence), N:1 com Usuário (o responsável ou quem precisa comprar). |

A entidade Usuário deverá ter 5 informações básicas para a 
identificação: 'id', 'email', 'senha', 'nome_usuario', 
'nivel_de_acesso', sendo desnecessária a "Foreign Key", já 
que a Chave Estrangeira é uma restrição de integridade que 
atua nos bastidores de um banco de dados, sendo uma preocupação 
apenas interligar outros bancos a este e não o contrário.

As listas deverão possuir 3 informações básicas, também para
identificação: 'id', 'titulo', 'data_de_criacao'. Deverá 
também conter uma chave 'criador_id', para relacionar-se com 
seu respectivo usuário no banco de dados.

Os itens 4 itens básicos e 1 item completamente opcional: 'id',
'nome_do_produto', 'quantidade', 'comprado' e 
'data_de_vencimento' [opcional]. Além disso, serão necessárias
2 "Foreign Keys" uma para relacionar o item à lista de origem 
(lista_id) e outra para relacionar o item diretamente ao 
usuário (responsavel_id).

****

Existirão apenas 2 níveis de permissão de acesso ao sistema,
sendo eles: colaborador (padrão) e admnistrador:

### Colaborador
O nível de acesso colaborador permite que o usuário crie, leia,
atualize e exclua (CRUD) qualquer uma de suas próprias listas e
dos itens presentes dentro delas. Além disso o usuário deve ser
capaz de alterar informações de cadastro (o nome e a senha do 
seu próprio usuário e sua senha) e ler listas compartilhadas
por outros usuários.

Um usuário-colaborador não deve ser capaz de realizar operações
críticas (que afetam o sistema ou outros usuários). Isso se 
define por:
- **Gerenciar outros usuários**: Criar, excluir, mudar
    informações de acesso (ou itens pessoais) de outros usuários 
    ou o nível de acesso que eles possuem.
- **Excluir listas críticas**:  Excluir uma Lista inteira (o 
    board principal), pois essa é uma ação administrativa.

### Admnistrador
Este usuário tem o controle pleno sobre todo o sistema e realiza
as operações de manutenção. Sendo assim, ele pode executar
qualquer ação que um usuário comum executaria, alterar o nível 
de acesso de outros usuários; Criar, editar e excluir qualquer
usuário; E realizar o CRUD em qualquer entidade.

****

### Linguagem de programação [JavaScript]
A linguagem de programação que selecionei foi o JavaScript. Essa
linguagem é naturalmente single-thread o que significa que ela 
possui um único "fio" de execução. Essa característica pode ser
tanto uma vantagem quanto uma desvantagem para o projeto, já que 
significa que o código executará uma tarefa por vez o que é bem
mais simples, porém muito mais fácil de se lidar ainda mais quando
se inicia o processo de aprendizagem de bancos de dados.

Outra característica, é que o JavaScript possui outra "faca de 
dois gumes": seu amplo ecossistema de pacotes (NPM) com muitas
soluções bem desenvolvidas e ferramentas úteis. Isso pode ser ruim
também porque o grande número de pacotes pode levar ao problema de 
dependency hell (excesso de dependências), exigindo gerenciamento 
cuidadoso de quem desenvolve o programa.

O desempenho da linguagem também é ótimo e ideal para operações de
bancos de dados que é justamente o objetivo principal do projeto. 
Além disso, o JavaScript tem uma comunidade extensa com uma 
excelente gama de documentações, tutoriais, suporte da comunidade e
afins, isso agiliza a produção do código e na resolução de problemas
e impasses.

****
### Prática
Com todas essas informações definidas, pude dar início à programação
em si, criando arquivos essenciais ao projeto como:
- package.jason
- index.js
- Dockerfile
- docker-compose.yml
- init.sql

### package.jason
para criar este arquivo, abri o terminal na pasta onde se localizava o
meu projeto e rodei o seguinte comando:

    npm init -y

Este comando criou um arquivo.jason que tem como função principal 
definir os metadados do meu projeto, as dependências e os scripts de 
inicialização. Quanto às alterações que fiz nele, foram apenas 2 linhas
dentro de "scripts":

    "start": "node index.js",
    "dev": "npm start",

Linhas que servem para definir o comando que o Docker usará para iniciar 
e rodar a API.

### index.js
Para o funcionamento correto do programa, index.js deve cumprir três 
coisas essenciais:
 - Iniciar o servidor Express
 - Ler as variáveis de ambiente (DB_HOST, DB_USER, etc) do 
    'docker-compose.yml'
 - Testar a conexão com o ProstgreSQL
ele é a alma do nosso projeto.

### Dockerfile
Dockerfile, ensina o Docker a empacotar o código Node.js em um 
container, cumprindo o requisito de containerização.

### docker-compose.yml
Este arquivo é essencial porque ele define e conecta os dois 
containers (a API e o PostgreSQL).

### init.sql
Este arquivo auxilia o PostgreSQL a criar as tabelas das 3 entidades do
projeto.

****

Bem, já são 01:16 da manhã do dia seguinte e eu fiz bastante coisa, 
estou com sono!!! vou indo dormir então, amanhã eu retorno para continuar.

****
****

## 21/10/2025

Muito bem, agora que finalizei e testei o projeto é preciso 
fazer um tutorial de como ele funciona para que as pessoas (vulgo superiores
da Comp) venham a executa-lo de forma adequada.


Separei em etapas para ficar mais fácil de acompanhar o que já foi feito e
o que ainda está para ser feito.

### Pré-requisitos (O que você precisa ter instalado)
Você precisará das seguintes ferramentas instaladas e ativas no seu ambiente
de desenvolvimento:
- Git: Para clonar o repositório
- Node.js e NPM: Para instalar as dependências da aplicação
- Docker Desktop: Essencial para containerização da API e do 
    Banco de Dados
- Insomnia/Postman: Para testar os endpoints HTTP

Observação (Windows): Para que o Docker Desktop funcione, é essencial que 
a Virtualização esteja Habilitada na BIOS/UEFI do seu computador, e que o 
WSL 2 esteja instalado e configurado.

### Instalação e Inicialização da Infraestrutura
Execute estes comandos no terminal, na ordem, para subir toda a sua 
infraestrutura:

**Clonar e Acessar o Projeto**
1. Clone o repositório para o seu computador

        git clone https://github.com/IsabelPessoa/desafio_backend.git

2. Navegue até a pasta do projeto

        cd ~/usuario/endereco_generico/desafio_backend

**Instalar Dependências e Iniciar o Docker**
- Instale as dependências Node.js (Express, PG, dotenv)

        npm install

1. Inicie a Infraestrutura Docker:

        --build: Constrói a imagem da API a partir do Dockerfile

        -d: Roda os containers em modo 'detached' (em segundo plano)

        docker compose up --build -d

O que o comando faz: O Docker Compose lê o docker-compose.yml, sobe o 
container PostgreSQL (postgres-db) e o container API (lista-compras-api), 
conectando-os automaticamente. O script init.sql é executado na 
primeira vez, criando todas as tabelas.

2. Verifique o Status dos Containers
Para garantir que tudo subiu corretamente:

        docker ps

Resultado Esperado: Você deve ver os dois containers (lista-compras-api 
e postgres-db) listados e com o status Up (Ativo).

### Teste de Conexão e Validação
O teste do endpoint /status é a prova final de que a API está rodando e 
se comunicando com o Banco de Dados.

1. Abra o Insomnia ou Postman.

2. Crie uma nova requisição com o Método: GET.

3. Insira a URL: http://localhost:3000/status

4. Envie a requisição.

Resultado Esperado
Status HTTP: 200 OK

Corpo da Resposta (JSON):

    {

        "message": "Infraestrutura OK: API e Banco de Dados conectados com sucesso!",
        "dbTime": "2025-10-21T..." 

    }

****
