# api

The backend api for flashcards app.

## Docker (production)

Build the image (from the repository root):

```bash
docker build -t flashcards-api:local -f apps/api/Dockerfile .
```

Run the container (mount your SQLite DB and set `DB_URL`):

```bash
# replace /host/path/to/sqlite.db with your local DB path
docker run --rm -p 3000:3000 \
	-e PORT=3000 \
	-e DB_URL=/data/sqlite.db \
	-v /host/path/to/sqlite.db:/data/sqlite.db:rw \
	flashcards-api:local
```

Notes:
- The image uses Bun to run TypeScript directly (`apps/api/serve.ts`).
- Do not bake your `.env` or secrets into the image; pass them at runtime.