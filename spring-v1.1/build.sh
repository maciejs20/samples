#!/bin/bash

VER=1.1
REPO="default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default"

docker build -t hellospring:${VER} .
docker tag hellospring:${VER} ${REPO}/hellospring:${VER}

docker push ${REPO}/hellospring:${VER}
