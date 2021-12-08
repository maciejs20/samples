#!/bin/bash

VER=7.0
REPO="default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default"

docker build -t env:${VER} -f Dockerfile .
docker tag env:${VER} ${REPO}/env:${VER}
docker push ${REPO}/env:${VER}
