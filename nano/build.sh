#!/bin/bash

VER=1.0
REPO="default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default"
APP="nano"

docker build -t ${APP}:${VER}  .
docker tag ${APP}:${VER} ${REPO}/${APP}:${VER}

docker push ${REPO}/${APP}:${VER}
