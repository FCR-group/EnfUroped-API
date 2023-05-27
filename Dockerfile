FROM node:16-alpine

# Create app directory
WORKDIR /app

# Copy the dependencies file
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install --silent --only=production

# Bundle app source
COPY . .

# Run on port 8080
EXPOSE 8080

# Run app
CMD ["/bin/sh","./scripts/compose.sh"]