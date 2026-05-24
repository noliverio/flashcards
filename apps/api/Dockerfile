ARG BUN_VERSION=1.3.14
FROM oven/bun:${BUN_VERSION} AS builder
WORKDIR /app

# Copy lockfiles and workspace manifests for deterministic installs
COPY package.json bun.lock* ./
COPY package.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages ./packages

# RUN bun install --verbose
RUN bun install --production
# Copy source files
COPY . .

FROM oven/bun:${BUN_VERSION} AS runtime
WORKDIR /app
COPY --from=builder /app /app

ENV PORT=3000
EXPOSE 3000

# Run the API server using the lightweight Bun entrypoint
CMD ["bun", "./apps/api/serve.ts"]