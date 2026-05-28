# api

The backend api for flashcards app.

## Commands

Build the image (from the repository root):

```bash
docker build -t flashcards-api:local -f apps/api/Dockerfile .
```

Run the container (mount your SQLite DB and set `DB_URL`):

```bash
# replace ./sqlite.db with your local DB path, if not executing from repo root
docker run --rm -p 3000:3000 \
	-e PORT=3000 \
	-e DB_URL=/data/sqlite.db \
	-v ./sqlite.db:/data/sqlite.db:rw \
	flashcards-api:local
```
