FROM node:12-alpine as build
WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:12-alpine as runtime
WORKDIR /usr/app
COPY package.json package-lock.json ./
COPY --from=build /usr/app/dist .
RUN npm ci --production
ARG port=3000
ENV PORT ${port}
EXPOSE ${port}
CMD npm start
