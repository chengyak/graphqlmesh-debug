FROM node:16-alpine
EXPOSE 8080

COPY . app/
WORKDIR /app

# Install some depenendencies
RUN npm install --production
RUN npm cache clean --force

# Default command
CMD ["npm", "run", "start"]