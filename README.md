# Seu Barriga

<p style="text-align: center;">
<img src="./assets/img/seu-barriga.jpeg" alt="Seu Barriga"></p>

**Este é um projeto de estudo do Jest. O [Jest](https://jestjs.io/) é, como ele mesmo se define, "um poderoso Framework de Testes em JavaScript com um foco na simplicidade".**

O objetivo é utilizar o TDD para desenvolver um gerenciador financeiro com a segurança dos testes automatizados.

### Ajustes e melhorias

Sendo um projeto de estudo a sua trajetória está focada no desenvolvimento de testes como especificação e depois das funcionalidades em si,  compreendendo de forma macro o seguinte roteiro:

- [x] 1 - Iniciando uma API com Testes
- [ ] 2 - Endpoint de usuários
- [ ] 3 - Endpoint de contas
- [ ] 4 - Endpoint de autenticação
- [ ] 5 - Melhorias no endpoint de contas
- [ ] 6 - Endpoint de transações
- [ ] 7 - Endpoint de transferências
- [ ] 8 - Endpoint de balanço

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- NodeJs 14 LTS
- NPM 6

## ▶️ Rodando o Seu Barriga

Para rodar o **Seu Barriga**, siga estas etapas:

Instalação dos pacotes:

```
npm i
```

Start da aplicação:

```
npm start
```

## 🃏 Testando o Seu Barriga

Para testar o **Seu Barriga**, siga estas etapas:

Teste:

```
npm test
```

Teste em modo _watch_:

```
npm run secure-mode
```

## ☄️ Migrações de Banco

Para criar o banco de dados é necessário rodar uma migrate.

Esta depende de um ambiente, que no momento, só temos o de teste.

Subindo o banco:
```
node_modules/.bin/knex migrate:latest --env test
```

Voltando para estado anterior:
```
node_modules/.bin/knex migrate:rollback --env test
```

## 🤝 Autores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/halyssonfreitas">
        <img src="https://avatars.githubusercontent.com/u/20186882?s=400&u=8badab553b104d7c5fa99e49003b567df699a7f1&v=4" width="100px;" alt="Foto do Halysson Freitas no GitHub"/><br>
        <sub>
          <b>Halysson Freitas</b>
        </sub>
      </a>
      <br/>
      <a href="https://www.linkedin.com/in/halysson-freitas/">
        <sub>
          <b>LinkedIn</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📝 Licença

Este projeto está sob a licença GNU General Public License (GPL) - veja o site [GNU General Public License (GPL)](https://www.gnu.org/licenses/gpl-3.0.en.html) para detalhes.
