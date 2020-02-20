#!/bin/bash
CONTAINER_NAME=testcontainerMongo
if [ ! "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=$CONTAINER_NAME)" ]; then
        # cleanup
        docker rm $CONTAINER_NAME
    fi
    # run your container
    docker run -d --name $CONTAINER_NAME -p 27017:27017 mongo:4.2.3
fi
