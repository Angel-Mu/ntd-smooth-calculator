FROM node:20-alpine

WORKDIR /app

# This docker file will copy code from app directory
# including the node_modules and .next folder.
COPY . .

RUN npm install && \
  npm run build

EXPOSE 3000

# This run the server at default port 3000
CMD ["npm", "start"]
