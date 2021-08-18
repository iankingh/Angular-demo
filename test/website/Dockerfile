FROM node:12
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY . /app

# CMD [ "npx", "ng", "serve","--host","0.0.0.0","--poll","2000"]
CMD ["npm", "start"]
