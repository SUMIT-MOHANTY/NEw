FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY src/ ./src/
COPY *.js ./
COPY .env.example ./.env

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "src/index.js"]
