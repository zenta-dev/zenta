FROM node:20.12.2 AS init


# RUN npm install -g unzip
RUN npm install -g bun

RUN bun upgrade --canary

RUN npm install -g synp
RUN npm install -g turbo@1.12.3


WORKDIR /app
COPY . .

RUN turbo prune --scope=@apps/cv --docker; exit 0

FROM init AS installer

WORKDIR /app


COPY --chown=node .gitignore .gitignore
COPY --from=init --chown=node /app/out/json/ ./



COPY --from=init --chown=node /app/out/full/ ./

RUN rm -rf /app/out/
RUN bun install --frozen-lockfile --production
RUN bun run build

ENV PORT=3002

EXPOSE $PORT

WORKDIR /app/apps/cv

RUN chown node /app/* && chmod 755 /app/*

USER node
CMD ["bun", "run", "dev"]