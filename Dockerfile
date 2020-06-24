FROM node:12-alpine as build
WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:12-alpine as runtime
WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY --from=build /usr/app/dist ./dist
ARG port=3000
ENV PORT ${port}
EXPOSE ${port}
CMD npm run start:cluster
