FROM node:lts AS build

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY . .

FROM build AS base

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

CMD ["sh", "start.sh"]