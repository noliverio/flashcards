# Infrastructure.

Infrastructure code.
## Helm chart


## Migrations container
Build with:
```bash
docker build -t flashcards-migrations:local -f infrastructure/migration.dockerfile .
```

Run as :
```bash
# replace /host/path/to/sqlite.db with your local DB path
docker run --rm	-v ./sqlite.db:/data/sqlite.db:rw flashcards-migrations:local
```
