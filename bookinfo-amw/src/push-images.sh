# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-ratings-v2:${DSTVER}
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-ratings-v1:${DSTVER}
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v3:${DSTVER}
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v2:${DSTVER}
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v1:${DSTVER}
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-details-v2:${DSTVER}
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-details-v1:${DSTVER}
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-productpage-v1:${DSTVER}

VER="1.16.1"
DSTVER="amw"

oc get is -n default  | grep bookinfo | awk '{print $1}' | xargs oc delete is -n default
echo "*** ratings v1"
docker pull docker.io/istio/examples-bookinfo-ratings-v1:${VER}
docker tag docker.io/istio/examples-bookinfo-ratings-v1:${VER} default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-ratings-v1:${DSTVER}

echo "*** ratings v2"
docker pull docker.io/istio/examples-bookinfo-ratings-v2:${VER}
docker tag docker.io/istio/examples-bookinfo-ratings-v2:${VER} default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-ratings-v2:${DSTVER}


echo "reviews-v1"
docker pull docker.io/istio/examples-bookinfo-reviews-v1:${VER}
docker tag docker.io/istio/examples-bookinfo-reviews-v1:${VER} default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v1:${DSTVER}

echo "reviews-v2"
docker pull docker.io/istio/examples-bookinfo-reviews-v2:${VER}
docker tag docker.io/istio/examples-bookinfo-reviews-v2:${VER} default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v2:${DSTVER}

echo "reviews-v3"
docker pull docker.io/istio/examples-bookinfo-reviews-v3:${VER}
docker tag docker.io/istio/examples-bookinfo-reviews-v3:${VER} default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v3:${DSTVER}

echo "details-v1"
docker pull docker.io/istio/examples-bookinfo-details-v1:${VER}
docker tag docker.io/istio/examples-bookinfo-details-v1:${VER} default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-details-v1:${DSTVER}

echo "productpage-v1"
docker pull docker.io/istio/examples-bookinfo-productpage-v1:${VER}
docker tag docker.io/istio/examples-bookinfo-productpage-v1:${VER} default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-productpage-v1:${DSTVER}

echo "mysql"
docker pull docker.io/istio/examples-bookinfo-mysqldb:${VER}
docker tag docker.io/istio/examples-bookinfo-mysqldb:${VER} default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-mysqldb:${VER}

echo "----- PUSH -----"
echo "ratings-v2"
docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-ratings-v2:${DSTVER}
echo "ratings-v1"
docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-ratings-v1:${DSTVER}
echo "ratings-v2"
docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-ratings-v2:${DSTVER}
echo "reviews-v3"
docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v3:${DSTVER}
echo "reviews-v2"
docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v2:${DSTVER}
echo "reviews-v1"
docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v1:${DSTVER}
echo "details-v1"
docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-details-v2:${DSTVER}
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-details-v1:${DSTVER}
echo "productpage-v1"
docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-productpage-v1:${DSTVER}
echo "mysql"
docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-mysqldb:${VER}

