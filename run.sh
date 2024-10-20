#!/bin/bash

IMAGE_NAME='network-protocols-interactive-tui-quiz'

docker build -t $IMAGE_NAME . &> /dev/null
docker run --rm -it $IMAGE_NAME
docker image rm -f $IMAGE_NAME &> /dev/null
