# The `web` component of vps.yaml: the Vite build, served by nginx-unprivileged (uid 101) on 8080.
# Built from the repository root (vps.yaml: build.context ".") by deploy-actions' vps-deploy.yml.
#
# The build stage does what deploy.yml's build job does: Node 26.13.1, NODE_ENV=production,
# npm ci with the dev dependencies, `npm run build` (tsc, vite build), with the public telemetry
# endpoint of the repo variable TRACK_ENDPOINT. The same commit so builds the same files.
FROM docker.io/library/node:26.13.1-trixie-slim@sha256:73c2e404ecdc6a8a8d7febe36ac62fab221fb61627659334a8855a2c198da7a0 AS build
ENV NODE_ENV=production
WORKDIR /src
COPY package.json package-lock.json .npmrc ./
RUN npm ci --include=dev --no-audit --no-fund
COPY . .
ARG VITE_TRACK_ENDPOINT=https://hostettler.io/track
RUN VITE_TRACK_ENDPOINT="$VITE_TRACK_ENDPOINT" npm run build

# The base smoke runs on the cluster too (vps-gitops bootstrap/lib.sh SMOKE_SRC_IMAGE): the
# linux/amd64 manifest of nginx-unprivileged 1.31.7-alpine3.24.
FROM docker.io/nginxinc/nginx-unprivileged:1.31.7-alpine3.24@sha256:c3bcf3d1a53a027bfa515b9fe4fbbe7bf6b791476a5af853de439ad494b145bd
USER root
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf
COPY deploy/web/nginx.conf /etc/nginx/nginx.conf
COPY deploy/web/mime.types /etc/nginx/mime.types
COPY --from=build /src/dist/ /usr/share/nginx/html/
USER 101
EXPOSE 8080
