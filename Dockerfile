FROM node:latest as build
WORKDIR /usr/local/app
COPY ./  /usr/local/app
ARG API_URL
ENV API_URL=${API_URL}
RUN npm install
RUN npm run build


FROM nginx:latest
COPY --from=build /usr/local/app/dist/dashboard /usr/share/nginx/html
COPY --from=build /usr/local/app/nginx.conf /etc/nginx/conf.d/default.conf




# Set environment variable for API_URL during runtime
ARG API_URL
ENV API_URL=${API_URL}


EXPOSE 80





