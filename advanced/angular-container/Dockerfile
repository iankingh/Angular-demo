# # Dockerfile
# # Set the base image.
# FROM node:lts
# # FROM node:10

# # Create and define the node_modules's cache directory.
# RUN mkdir /usr/src/cache
# WORKDIR /usr/src/cache

# # Install the application's dependencies into the node_modules's cache directory.
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install

# # Create and define the application's working directory.
# RUN mkdir /usr/src/app
# WORKDIR /usr/src/app


FROM node:lts

WORKDIR  /home/node/app

COPY package*.json ./

RUN npm install && npm install -g @angular/cli

EXPOSE 4201

CMD ["npm", "start"]



