ARG MONGO_VERSION
FROM mongo:${MONGO_VERSION}
RUN mkdir -p /scripts
COPY docker/scripts/mongo-init.sh /scripts/mongo-init.sh
RUN chmod +x /scripts/mongo-init.sh
ENTRYPOINT ["/scripts/mongo-init.sh"]