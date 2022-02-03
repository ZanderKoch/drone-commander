#!/bin/sh
mvn clean package && docker build -t nu.te4/dronecommander .
docker rm -f dronecommander || true && docker run -d -p 9080:9080 -p 9443:9443 --name dronecommander nu.te4/dronecommander