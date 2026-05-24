ARG BUN_VERSION=1.3.14
FROM oven/bun:${BUN_VERSION} AS builder
WORKDIR /app

# Copy lockfiles and workspace manifests for deterministic installs
COPY package.json bun.lock* bun.lockb* ./
COPY apps/web/package.json apps/web/package.json
COPY packages ./packages

RUN bun install

# Copy source and build
COPY . .
WORKDIR /app/apps/web
RUN bun run build

FROM nginx:stable-alpine AS runtime
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# SPA fallback (serve index.html for client-side routes)
RUN printf 'server {\n  listen 80;\n  server_name _;\n  root /usr/share/nginx/html;\n  index index.html;\n  location / {\n    try_files $uri $uri/ /index.html;\n  }\n}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
