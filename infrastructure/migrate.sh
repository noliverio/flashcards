if [ ! -f /data/sqlite.db ]; then
  touch /data/sqlite.db
fi

bunx drizzle-kit push --config=drizzle.config.ts

bun ./seed.ts