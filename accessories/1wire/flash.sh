#!/bin/bash
echo -e '\x00' |sudo dd of=/sys/bus/w1/devices/3a-0000005c12c9/output bs=1 count=1
echo -e '\x03' |sudo dd of=/sys/bus/w1/devices/3a-0000005c1d18/output bs=1 count=1
sleep 0.5 
echo -e '\x03' |sudo dd of=/sys/bus/w1/devices/3a-0000005c12c9/output bs=1 count=1
echo -e '\x03' |sudo dd of=/sys/bus/w1/devices/3a-0000005c1d18/output bs=1 count=1
sleep 0.5 
echo -e '\x03' |sudo dd of=/sys/bus/w1/devices/3a-0000005c12c9/output bs=1 count=1
echo -e '\x00' |sudo dd of=/sys/bus/w1/devices/3a-0000005c1d18/output bs=1 count=1
sleep 0.5 
echo -e '\x00' |sudo dd of=/sys/bus/w1/devices/3a-0000005c12c9/output bs=1 count=1
echo -e '\x03' |sudo dd of=/sys/bus/w1/devices/3a-0000005c1d18/output bs=1 count=1
sleep 0.5 
echo -e '\x03' |sudo dd of=/sys/bus/w1/devices/3a-0000005c12c9/output bs=1 count=1
echo -e '\x03' |sudo dd of=/sys/bus/w1/devices/3a-0000005c1d18/output bs=1 count=1
sleep 0.5 
echo -e '\x03' |sudo dd of=/sys/bus/w1/devices/3a-0000005c12c9/output bs=1 count=1
echo -e '\x00' |sudo dd of=/sys/bus/w1/devices/3a-0000005c1d18/output bs=1 count=1
sleep 0.5 
echo -e '\x00' |sudo dd of=/sys/bus/w1/devices/3a-0000005c12c9/output bs=1 count=1
echo -e '\x00' |sudo dd of=/sys/bus/w1/devices/3a-0000005c1d18/output bs=1 count=1
