# Client build
FROM node:20-bullseye as build
RUN mkdir -p /client
RUN npm cache clear --force
WORKDIR /client
COPY package.json /client
RUN npm install
COPY . /client
RUN npm run build

# Web server setup
FROM nginx
COPY --from=build /client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]