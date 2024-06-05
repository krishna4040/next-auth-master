ARG NODE_VERSION=21.2.0
FROM node:${NODE_VERSION}-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]