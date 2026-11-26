# The `track` component of vps.yaml: server.mjs (no dependencies) on distroless Node 26.13.1,
# the version the host runs it with today. Non-root (65532), no shell, read-only root.
# vps.yaml sets HOST=0.0.0.0 and OTLP_GRPC_ENDPOINT: pods reach SigNoz's ingester on gRPC only.
FROM gcr.io/distroless/nodejs26-debian13:nonroot@sha256:b965261090418798034704c69500c123e6fc398be20a1ae9c0c4e8d5bee4110d
WORKDIR /app
COPY server.mjs /app/server.mjs
USER 65532
EXPOSE 8787
CMD ["/app/server.mjs"]
