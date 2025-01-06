EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L onetouchlogo:LOGO logo1
U 1 1 607FAB83
P 6300 1700
AR Path="/607FAB83" Ref="logo1"  Part="1" 
AR Path="/607E61CC/607FAB83" Ref="logo?"  Part="1" 
F 0 "logo1" H 6350 1900 60  0000 C CNN
F 1 "LOGO" H 6301 1927 60  0001 C CNN
F 2 "logo:onetouchlogo" H 6300 1700 50  0001 C CNN
F 3 "" H 6300 1700 50  0001 C CNN
	1    6300 1700
	1    0    0    -1  
$EndComp
Text Notes 4950 1700 0    50   ~ 0
PIR
Wire Wire Line
	5200 2200 5200 2000
$Comp
L power:GND1 #PWR0101
U 1 1 607FAB8B
P 5200 2200
AR Path="/607FAB8B" Ref="#PWR0101"  Part="1" 
AR Path="/607E61CC/607FAB8B" Ref="#PWR?"  Part="1" 
F 0 "#PWR0101" H 5200 1950 50  0001 C CNN
F 1 "GND1" H 5205 2027 50  0000 C CNN
F 2 "" H 5200 2200 50  0001 C CNN
F 3 "" H 5200 2200 50  0001 C CNN
	1    5200 2200
	1    0    0    -1  
$EndComp
$Comp
L Mechanical:MountingHole H2
U 1 1 607FAB91
P 6150 2250
AR Path="/607FAB91" Ref="H2"  Part="1" 
AR Path="/607E61CC/607FAB91" Ref="H?"  Part="1" 
F 0 "H2" H 6250 2296 50  0000 L CNN
F 1 "MountingHole" H 6250 2205 50  0000 L CNN
F 2 "MountingHole:MountingHole_2.1mm" H 6150 2250 50  0001 C CNN
F 3 "~" H 6150 2250 50  0001 C CNN
	1    6150 2250
	1    0    0    -1  
$EndComp
$Comp
L Mechanical:MountingHole H1
U 1 1 607FAB97
P 6150 2050
AR Path="/607FAB97" Ref="H1"  Part="1" 
AR Path="/607E61CC/607FAB97" Ref="H?"  Part="1" 
F 0 "H1" H 6250 2096 50  0000 L CNN
F 1 "MountingHole" H 6250 2005 50  0000 L CNN
F 2 "MountingHole:MountingHole_2.1mm" H 6150 2050 50  0001 C CNN
F 3 "~" H 6150 2050 50  0001 C CNN
	1    6150 2050
	1    0    0    -1  
$EndComp
Wire Wire Line
	5350 2050 5400 2050
Wire Wire Line
	5350 2000 5350 2050
Wire Wire Line
	5200 2000 5350 2000
Wire Wire Line
	5350 1750 5400 1750
Wire Wire Line
	5350 1800 5350 1750
Wire Wire Line
	5200 1800 5350 1800
Wire Wire Line
	5400 1900 5200 1900
Connection ~ 5200 2000
$Comp
L Connector_Generic:Conn_01x03 J1
U 1 1 607FABA5
P 5000 1900
AR Path="/607FABA5" Ref="J1"  Part="1" 
AR Path="/607E61CC/607FABA5" Ref="J?"  Part="1" 
F 0 "J1" H 5080 1892 50  0000 L CNN
F 1 "LED" H 5080 1801 50  0000 L CNN
F 2 "Connector_JST:JST_XH_S3B-XH-A-1_1x03_P2.50mm_Horizontal" H 5000 1900 50  0001 C CNN
F 3 "~" H 5000 1900 50  0001 C CNN
	1    5000 1900
	-1   0    0    1   
$EndComp
$Comp
L Sensor_Distance:EKMC1601111 U1
U 1 1 607FABAB
P 5800 1900
AR Path="/607FABAB" Ref="U1"  Part="1" 
AR Path="/607E61CC/607FABAB" Ref="U?"  Part="1" 
F 0 "U1" H 5850 2150 50  0000 C CNN
F 1 "EKMC1601111" H 5600 1650 50  0000 L CNN
F 2 "Sensor_Distance:EKMC1601111" H 6000 1850 50  0001 C CNN
F 3 "http://www.farnell.com/datasheets/1792634.pdf" H 6000 1850 50  0001 C CNN
	1    5800 1900
	-1   0    0    1   
$EndComp
$EndSCHEMATC
