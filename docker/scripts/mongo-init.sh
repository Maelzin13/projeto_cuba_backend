Start MongoDB in the background
mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 &
MONGOD_PID=$!

Function to check if replica set is initialized
is_initialized() {
  $MONGO_COMMAND --port $MONGO_REPLICA_PORT --eval "rs.status()" | grep -q "myState"
}

Function to initialize replica set
init_replica() {
  INIT_REPL_CMD="rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }] })"
  $MONGO_COMMAND --port $MONGO_REPLICA_PORT --eval "$INIT_REPL_CMD"
}

Wait for MongoDB to start
until $MONGO_COMMAND --port $MONGO_REPLICA_PORT --eval "print("waited for connection")"; do
  sleep 1
done

Check if MongoDB is already initialized, if not, initialize it
if ! is_initialized; then
  echo "Initializing replica set"
  init_replica
  until is_initialized; do
    sleep 1
  done
  echo "Replica set initialized"
else
  echo "Replica set already initialized"
fi

wait $MONGOD_PID