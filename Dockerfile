FROM node

WORKDIR /developer/nodejs/user-store-pathao

COPY . .

RUN npm ci

CMD ["npm","run","dev"]