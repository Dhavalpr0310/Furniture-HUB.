FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install http-server globally
RUN npm install -g http-server

# Copy website files
COPY . .

# Expose port 8080
EXPOSE 8080

# Start http-server
CMD ["http-server", "-p", "8080", "--cors", "-c-1"]
