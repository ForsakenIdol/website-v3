FROM node:18 AS install
WORKDIR /app
# All commands will now be run from within the /app directory. "./" now references /app.
COPY package.json package-lock.json server.js ./
RUN npm install
RUN echo "---------- Installation complete, beginning slim build stage ----------"

# Copy installed files over to the final build
FROM node:18-alpine AS build
WORKDIR /app
COPY --from=install /app ./
CMD [ "node", "server.js" ]

# Build with "docker build -t lachldwaws/pgsql_server ."
# Run locally with "docker run -p 9001:9001 --env "PGHOST=host.docker.internal" --env PGPASSWORD lachldwaws/pgsql_server".