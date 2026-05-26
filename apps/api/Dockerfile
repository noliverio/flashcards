ARG BUN_VERSION=1.3.14
FROM oven/bun:${BUN_VERSION} AS builder
WORKDIR /app


COPY package.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages ./packages


RUN bun install --production

COPY . .

FROM oven/bun:${BUN_VERSION} AS runtime
WORKDIR /app
COPY --from=builder /app /app

ENV PORT=3000
EXPOSE 3000

# Run the API server using the lightweight Bun entrypoint
CMD ["bun", "./apps/api/serve.ts"]