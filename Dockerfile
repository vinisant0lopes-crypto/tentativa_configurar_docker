# Utiliza uma imagem oficial do Node.js
FROM node:18

# Cria o diretório do app dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o restante dos arquivos (incluindo a pasta src e app.js)
COPY . .

# Expõe a porta que o Express está escutando
EXPOSE 3000

CMD [ "npm", "run", "dev" ]

