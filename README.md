# PeTinder

PeTinder é uma plataforma para conectar ONGs e pessoas interessadas em adotar pets, facilitando o cadastro, gerenciamento e divulgação de animais para adoção.

---

## Pré-requisitos

- **Node.js** (recomendado: 18.x ou superior)
- **npm** (gerenciador de pacotes)
- **Backend Java** (API REST, disponível em outro repositório)

---

## Instalação do Frontend

1. **Clone este repositório:**
   ```sh
   git clone https://github.com/WeGoSolutions/PeTinder.git
   cd app-petinder
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configuração do ambiente:**
   - Abra o arquivo `.env` e ajuste as variáveis de ambiente conforme necessário. O arquivo `.env` armazena configurações sensíveis e específicas do ambiente, como a URL da API backend.
   - Exemplo de variável importante:
     ```
     VITE_API_URL=http://localhost:8080
     ```
   - Certifique-se de que `VITE_API_URL` aponte para o endereço onde o backend Java está rodando. Caso o backend esteja em outro servidor ou porta, atualize esse valor.
   - Salve o arquivo após as alterações.

4. **Executando o projeto:**
   ```sh
   npm run dev
   ```
   O frontend estará disponível em [http://localhost:5173].

---

## Integração com o Backend

Este frontend **deve ser executado junto com o repositório backend em Java** responsável pela API.

1. **Clone e rode o backend Java** conforme as instruções do repositório correspondente = https://github.com/WeGoSolutions/PeTinder-Back
2. **Verifique se o backend está rodando** e acessível (por padrão, geralmente em `http://localhost:8080`).
3. **Ajuste as variáveis de ambiente** do frontend (`.env`) para apontar para a URL correta da API, se necessário.

O frontend depende do backend para autenticação, cadastro de ONGs, pets, etc.

---

## Scripts úteis

- `npm run dev` — Inicia o servidor de desenvolvimento.
- `npm run build` — Gera a versão de produção.
- `npm run preview` — Visualiza a build de produção localmente.

---

## Estrutura do Projeto

- `public/` — Arquivos estáticos e imagens.
- `src/` — Código-fonte da aplicação React.
  - `components/` — Componentes reutilizáveis.
  - `pages/` — Páginas principais da aplicação.
  - `utils/` — Funções utilitárias (ex: formatação de CPF/CNPJ/CEP).
  - `provider/` — Instâncias de API e configuração de serviços.

---

## Observações

- Certifique-se de que as variáveis de ambiente estejam corretas para integração com a API.
- Para dúvidas sobre componentes, consulte os arquivos em `src/components/`.
- O projeto utiliza React, com componentes customizados para inputs, botões, dropdowns e upload de imagens.

---

## Contato

Dúvidas ou sugestões? Entre em contato com a equipe de desenvolvimento.

---