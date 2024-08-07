FROM node:20-alpine

WORKDIR /app

# This docker file will copy code from app directory
# including the node_modules and .next folder.
COPY . .

# Copy the entrypoint script
COPY entrypoint.sh .

# Make the entrypoint script executable
RUN chmod +x /app/entrypoint.sh

RUN npm install

EXPOSE 3000
# This run the server at default port 3000
CMD ["./entrypoint.sh"]
