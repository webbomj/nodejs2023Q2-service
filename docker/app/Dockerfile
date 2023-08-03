FROM node:18-alpine3.18
EXPOSE 4000
WORKDIR /app
COPY . .
COPY package.json .
RUN npm install
CMD ["npm", "run", "start:prisma"]