#!/usr/bin/python

import re, os, time, struct
fpOut = 0

def read_sensor(path):
	try:
		f = open(path+"/state", "r")
		status = f.read(1) 
		status=struct.unpack('B', status)[0] 
		print(status) 
		f.close()
	except (IOError), e:
	# print time.strftime("%x %X"), "Error reading", path, ": ", e
	time.sleep(0.001)
	return

# function: read and parse sensor data file 
def write_sensor(status, path):
	try:
		f = open(path+"/output", "w")
		status = f.write(struct.pack('B', status)) 
		f.close()
	except (IOError), e:
	# print time.strftime("%x %X"), "Error writing", path, ": ", e
	time.sleep(0.001)
	return

# define pathes to 1-wire sensor 
paths = (
"/sys/bus/w1/devices/3a-0000005c0342",
"/sys/bus/w1/devices/3a-0000005c1d1f"
)

# read sensor data 
for x in range(300):
	for path in paths:
		write_sensor(1,path) 
		read_sensor(path)
		write_sensor(0,path) 
		read_sensor(path) 
		time.sleep(0.051)
