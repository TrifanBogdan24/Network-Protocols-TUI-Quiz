#!/bin/bash

IMAGE_NAME='network-protocols-interactive-quiz'

docker build -t $IMAGE_NAME . &> /dev/null
docker run --rm -it $IMAGE_NAME
docker image rm $IMAGE_NAME &> /dev/null
