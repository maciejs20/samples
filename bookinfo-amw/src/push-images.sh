# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-ratings-v2:1.0
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-ratings-v1:1.0
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v3:1.0
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v2:1.0
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v1:1.0
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-details-v2:1.0
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-details-v1:1.0
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-productpage-v1:1.0

docker pull docker.io/istio/examples-bookinfo-ratings-v1:1.16.2
docker tag docker.io/istio/examples-bookinfo-ratings-v1:1.16.2 default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-ratings-v1:1.0
docker pull docker.io/istio/examples-bookinfo-reviews-v1:1.16.2
docker tag docker.io/istio/examples-bookinfo-reviews-v1:1.16.2 default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v1:1.0

docker pull docker.io/istio/examples-bookinfo-reviews-v2:1.16.2
docker tag docker.io/istio/examples-bookinfo-reviews-v2:1.16.2 default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v2:1.0

docker pull docker.io/istio/examples-bookinfo-reviews-v3:1.16.2
docker tag docker.io/istio/examples-bookinfo-reviews-v3:1.16.2 default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v2:1.0

docker pull docker.io/istio/examples-bookinfo-details-v1:1.16.2
docker tag docker.io/istio/examples-bookinfo-details-v1:1.16.2 default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-details-v2:1.0

docker pull docker.io/istio/examples-bookinfo-productpage-v1:1.16.2
docker tag docker.io/istio/examples-bookinfo-productpage-v1:1.16.2 default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-productpage-v1:1.0

# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-ratings-v2:1.0
docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-ratings-v1:1.0
docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v3:1.0
docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v2:1.0
docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-reviews-v1:1.0
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-details-v2:1.0
# docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-details-v1:1.0
docker push default-route-openshift-image-registry.apps.ocp.lab.cloudpak.site/default/examples-bookinfo-productpage-v1:1.0
