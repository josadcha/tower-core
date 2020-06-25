FROM node:10.11 AS builder

ARG BUILD_DOMAIN=${BUILD_DOMAIN:-""}

WORKDIR /home/node
COPY --chown=node:node . .

USER node
ENV BUILD_DOMAIN=${BUILD_DOMAIN}

RUN yarn install
RUN REACT_APP_GIT_SHA=$(git describe --tags $(git rev-list --tags --max-count=1)) bash -c 'yarn build'

FROM quay.io/openware/wio:0.1.0 AS production

RUN addgroup -S app -g 1000 && adduser -S -h /home/app -s /bin/sh -u 1000 app

COPY --from=builder --chown=app:app /home/node/build /home/app

USER app
EXPOSE 8080

ENTRYPOINT ["wio"]
CMD ["-s", "1", "-d", "/home/app"]
