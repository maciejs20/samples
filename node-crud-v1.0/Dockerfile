FROM node:latest
RUN mkdir /app
WORKDIR /app
ADD config/ /app/config
ADD model/ /app/model
ADD routes/ /app/routes
ADD controllers/ /app/controllers
ADD *.js /app/
ADD *.json /app/
RUN ls -la /app/
RUN npm install
ENTRYPOINT ["npm", "start"]
