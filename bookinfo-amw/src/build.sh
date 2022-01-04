REPO="default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default"

cd details
IMG="examples-bookinfo-details-v1:1.0"
docker build -t ${IMG} .
docker tag ${IMG} ${REPO}/${IMG}
docker push ${REPO}/${IMG}
cd ..

cd productpage
IMG="examples-bookinfo-productpage-v1:1.0"
docker build -t ${IMG} .
docker tag ${IMG} ${REPO}/${IMG}
docker push ${REPO}/${IMG}
cd ..

cd reviews

docker run --rm -u root -v "$(pwd)":/home/gradle/project -w /home/gradle/project gradle:4.8.1 gradle clean build
pushd reviews-wlpcfg

IMG="examples-bookinfo-reviews-v1:1.0"
docker build --build-arg service_version=v1 -t ${IMG} .
docker tag ${IMG} ${REPO}/${IMG}
docker push ${REPO}/${IMG}

IMG="examples-bookinfo-reviews-v2:1.0"
docker build --build-arg service_version=v2 -t ${IMG} .
docker tag ${IMG} ${REPO}/${IMG}
docker push ${REPO}/${IMG}

IMG="examples-bookinfo-reviews-v3:1.0"
docker build --build-arg service_version=v3 -t ${IMG} .
docker tag ${IMG} ${REPO}/${IMG}
docker push ${REPO}/${IMG}
popd
