## Kawa

```
Name: Francisco Cajlon Jhonathan Moura Batista
Email: nathan3boss@gmail.com
LinkedIn: https://www.linkedin.com/in/nathan2slime/
Portfolio: https://www.nathan3boss.dev/
```

Esse projeto usa a versão 3 do framework JavaScript Vue.js. Na etapa inicial de construção da estrutura, optei pelo Vite, uma ferramenta recomendada pela comunidade Vue.js. O Vite não apenas simplifica a configuração inicial, mas também contribui para uma experiência de desenvolvimento mais eficiente, proporcionando velocidade e agilidade.

No aspecto de estilização, adotei o Sass para trabalhar com os estilos dos componentes. Em vez de depender de bibliotecas de componentes prontos, decidi construir meus próprios componentes. Essa abordagem oferece maior controle sobre a estilização e manutenção, eliminando as dependências desnecessárias que o uso de bibliotecas pode introduzir em um projeto.

A organização dos componentes foi realizada de forma contextualizada, com cada conjunto de componentes agrupado em pastas específicas dentro do diretório de componentes. Essa organização facilita a compreensão da estrutura do projeto e contribui para uma manutenção mais eficiente no longo prazo. Além disso, implementei testes unitários para alguns dos componentes. Embora não tenha tido tempo para cobrir todos os componentes, utilizei o ViteTest, que é padrão no setup do Vue.js e oferece rapidez na execução dos testes.

Para o gerenciamento de estado global da aplicação, adotei a biblioteca Pinia, uma escolha padrão no ecossistema Vue.js. A organização dos arquivos relacionados às definições de estado foi feita dentro da pasta "store". Cada definição de estado possui sua própria pasta contextualizada, contendo dois arquivos: um para a definição da store e outro para a tipagem do estado. Essa estruturação visa manter a clareza e a modularidade do código, facilitando a compreensão e a manutenção do gerenciamento de estado global da aplicação.

No que diz respeito ao registro e coleta de dados da aplicação, optei por utilizar o recurso de persistência de estado no Local Storage do navegador. Essa escolha permite armazenar dados localmente, proporcionando uma experiência mais fluida ao usuário e preservando o estado da aplicação mesmo após recarregamentos ou fechamentos do navegador.

> Além disso, tenho alguns projetos em meu GitHub nos quais realizo integrações com APIs. Essas integrações são implementadas para obter ou enviar dados entre a aplicação e serviços externos, proporcionando funcionalidades mais dinâmicas e interativas. Esses projetos estão disponíveis para consulta em meu perfil do GitHub.

Nas telas desenvolvidas, destaco duas principais: uma para a listagem de clientes e outra para a listagem de produtos. Em ambas, adicionei cards com dropdowns contendo opções para editar, ativar ou desativar. Esses dropdowns acionam modais com formulários e conteúdo específico relacionado à ação solicitada no item. Na tela de listagem de clientes, implementei a funcionalidade de adicionar um produto que ainda não foi associado ao cliente. A utilização de modais para as ações relacionadas aos dropdowns contribui para uma interface mais organizada e intuitiva, garantindo uma experiência de usuário aprimorada durante a interação com a aplicação.

Decidi incluir o arquivo .env.prod no controle de versão para facilitar potenciais testes com Docker. Embora não seja uma prática recomendada manter esse arquivo no repositório, é importante observar que, atualmente, ele não contém informações sensíveis.

Você pode testar a aplicação das seguintes maneiras:

- Utilizando Docker.
- Acessando o deploy online.
- Sem utilizar Docker.

### Utilizando Deploy

Acabei realizando o deploy desta aplicação na plataforma Vercel. Você pode acessá-la através do link: https://kawa-zeta.vercel.app/

### Utilizando Docker

Para iniciar, é necessário ter o Docker e o Git instalados em sua máquina. Caso ainda não tenha, você pode encontrá-los nos seguintes links:

- Docker:  https://docs.docker.com/get-docker
- Git: https://www.git-scm.com/downloads

Após configurar o Docker e o Git em sua máquina, baixe o repositório utilizando o comando git a seguir:

```bash
git clone git@github.com:nathan2slime/kawa.git
```
Em seguida, navegue até o diretório do repositório e execute o seguinte comando para configurar e iniciar o aplicativo:

```bash
docker-compose up
```
Certifique-se de que a porta configurada no arquivo .env.prod não esteja em uso no momento. Após a execução do comando, um link local será exibido, indicando onde o aplicativo está rodando.

### Sem utilizar Docker

Certifique-se de ter o Git, PNPM e Node.js 18 instalados em sua máquina. Se você ainda não os possui, pode baixá-los nos seguintes links:

- Git: https://git-scm.com/
- pnpm: https://pnpm.io/
- Node.js: https://nodejs.org/

  > Você pode usar um gerenciador de versões do Node.js, como o [nvm](https://github.com/nvm-sh/nvm), para instalar a versão 18 do Node.js

Após a instalação, utilize o comando a seguir para baixar o repositório:

```bash
git clone git@github.com:nathan2slime/kawa.git
```
Em seguida, acesse o diretório recém-criado e instale as dependências com o seguinte comando:

```bash
pnpm install
```

Por fim, execute o projeto utilizando:

```bash
pnpm run dev
```

Dessa forma, o aplicativo será iniciado localmente. Você também pode usar o comando abaixo, para rodar os testes unitários:

```bash
pnpm run test:unit
```
