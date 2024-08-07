# Function to check if the database exists
check_db_exists() {
  npx sequelize-cli db:migrate:status > /dev/null 2>&1
  return $?
}

# Wait for the database to be ready
until nc -z -v -w30 $POSTGRES_DB_HOST $POSTGRES_DB_PORT
do
  echo "Waiting for database connection..."
  sleep 1
done

echo "Database is up - executing command"

# Initialize a flag for database creation
DB_CREATED=false

# Check if the database exists
if check_db_exists; then
  echo "Database already exists, skipping creation"
else
  # Create the database if it doesn't exist
  if npx sequelize-cli db:create; then
    echo "Database created successfully"
    DB_CREATED=true
  else
    echo "Failed to create database" >&2
    exit 1
  fi
fi

# Run migrations
if npx sequelize-cli db:migrate; then
  echo "Migrations ran successfully"
else
  echo "Failed to run migrations" >&2
  exit 1
fi

# Seed the database only if it was newly created
if [ "$DB_CREATED" = true ]; then
  if npx sequelize-cli db:seed:all; then
    echo "Seeds ran successfully"
  else
    echo "Failed to seed database" >&2
    exit 1
  fi
else
  echo "Skipping seeds as the database was not created in this run"
fi

# Start the application
npm start
