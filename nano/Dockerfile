 FROM ubuntu:latest
 ENV TERM xterm
 RUN apt-get update && \
     apt-get install nano vim -y && \
     apt-get autoclean && \
     apt-get --purge -y autoremove
CMD nano
