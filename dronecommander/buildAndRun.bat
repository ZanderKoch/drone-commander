@echo off
call mvn clean package
call docker build -t nu.te4/dronecommander .
call docker rm -f dronecommander
call docker run -d -p 9080:9080 -p 9443:9443 --name dronecommander nu.te4/dronecommander