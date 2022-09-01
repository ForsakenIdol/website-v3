FROM node:alpine
WORKDIR /app
COPY . .

RUN npm install 
RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]

# Build locally with "docker build -t lachldwaws/next_frontend ."
# docker run -p 9002:3000 --env "DB_SERVER=host.docker.internal" --env "SERVER_PORT=9001" --env "NODE_ENV=production" lachldwaws/next_frontend