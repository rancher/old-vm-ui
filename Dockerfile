FROM luissalgadofreire/nginx-node:6.x
MAINTAINER logan@rancher.com

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /web && cp -a /tmp/node_modules /web
COPY nginx.conf.template /etc/nginx/nginx.conf.template

COPY . /web
WORKDIR /web

EXPOSE 8000
ENV LONGHORN_MANAGER_IP http://localhost:9500
RUN npm run build

CMD ["/bin/bash", "-c", "envsubst '${RANCHERVM_BACKEND_SERVICE_HOST},${RANCHERVM_BACKEND_SERVICE_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
