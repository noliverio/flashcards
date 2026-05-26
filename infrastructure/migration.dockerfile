ARG BUN_VERSION=1.3.14
FROM oven/bun:${BUN_VERSION}
WORKDIR /app
ENV DB_URL=/data/sqlite.db

COPY packages ./packages
COPY infrastructure/migration-drizzle.config.ts drizzle.config.ts


WORKDIR /app/packages/database
RUN bun install

ENTRYPOINT [ "bunx", "drizzle-kit", "push", "--config=drizzle.config.ts"]
