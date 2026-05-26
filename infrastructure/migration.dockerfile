ARG BUN_VERSION=1.3.14
FROM oven/bun:${BUN_VERSION}
WORKDIR /app
ENV DB_URL=/data/sqlite.db

COPY packages ./packages
# COPY packages/database/migration-drizzle.config.ts drizzle.config.ts
COPY infrastructure/migrate.sh packages/database/migrate.sh

WORKDIR /app/packages/database
RUN bun install
# WORKDIR /app

ENTRYPOINT ["/bin/bash", "migrate.sh"]