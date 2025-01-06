EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 4 5
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
L Connector_Generic:Conn_02x20_Odd_Even P?
U 1 1 61391BFE
P 1400 2000
AR Path="/61391BFE" Ref="P?"  Part="1" 
AR Path="/61381202/61391BFE" Ref="P1"  Part="1" 
F 0 "P1" H 1450 3117 50  0000 C CNN
F 1 "pi" H 1450 3026 50  0000 C CNN
F 2 "Connector_PinSocket_2.54mm:PinSocket_2x20_P2.54mm_Vertical" H -3450 1050 50  0001 C CNN
F 3 "" H -3450 1050 50  0001 C CNN
	1    1400 2000
	1    0    0    -1  
$EndComp
Text GLabel 1850 1100 2    50   UnSpc ~ 0
5v
Text GLabel 1000 1600 0    39   Output ~ 0
Rpi11
Text GLabel 1000 1900 0    39   UnSpc ~ 0
3V3
Text GLabel 1000 2300 0    39   Input ~ 0
GND
Text GLabel 1000 3000 0    39   Input ~ 0
GND
Text GLabel 1000 1500 0    39   Input ~ 0
GND
Text GLabel 1850 1300 2    39   Input ~ 0
GND
Text GLabel 1850 1700 2    39   Input ~ 0
GND
Text GLabel 1850 2000 2    39   Input ~ 0
GND
Text GLabel 1850 2500 2    39   Input ~ 0
GND
Text GLabel 1850 2700 2    39   Input ~ 0
GND
Text GLabel 1850 1200 2    50   UnSpc ~ 0
5v
Wire Wire Line
	1700 1200 1850 1200
Wire Wire Line
	1700 1100 1750 1100
Wire Wire Line
	1700 1300 1850 1300
Wire Wire Line
	1700 1700 1850 1700
Wire Wire Line
	1850 2000 1700 2000
Wire Wire Line
	1850 2500 1700 2500
Wire Wire Line
	1850 2700 1700 2700
Wire Wire Line
	1200 1100 1100 1100
Wire Wire Line
	1000 1500 1200 1500
Wire Wire Line
	1000 1600 1200 1600
Wire Wire Line
	1000 2300 1200 2300
Wire Wire Line
	1000 3000 1150 3000
Wire Wire Line
	1200 1900 1000 1900
Text GLabel 1000 1100 0    39   UnSpc ~ 0
3V3
Text GLabel 1000 1700 0    39   Output ~ 0
Rpi13
Wire Wire Line
	1000 1700 1200 1700
$Comp
L power:GND #PWR?
U 1 1 61391C2A
P 1150 3100
AR Path="/61391C2A" Ref="#PWR?"  Part="1" 
AR Path="/61381202/61391C2A" Ref="#PWR02"  Part="1" 
F 0 "#PWR02" H 1150 2850 50  0001 C CNN
F 1 "GND" H 1155 2927 50  0000 C CNN
F 2 "" H 1150 3100 50  0001 C CNN
F 3 "" H 1150 3100 50  0001 C CNN
	1    1150 3100
	1    0    0    -1  
$EndComp
Wire Wire Line
	1150 3100 1150 3000
Connection ~ 1150 3000
Wire Wire Line
	1150 3000 1200 3000
Text GLabel 1000 1200 0    39   Output ~ 0
SDA1
Text GLabel 1000 1300 0    39   Output ~ 0
SCL1
Wire Wire Line
	1200 1200 1000 1200
Wire Wire Line
	1200 1300 1000 1300
$Comp
L power:+3.3V #PWR?
U 1 1 61391C37
P 1100 900
AR Path="/61391C37" Ref="#PWR?"  Part="1" 
AR Path="/61381202/61391C37" Ref="#PWR01"  Part="1" 
F 0 "#PWR01" H 1100 750 50  0001 C CNN
F 1 "+3.3V" H 1115 1073 50  0000 C CNN
F 2 "" H 1100 900 50  0001 C CNN
F 3 "" H 1100 900 50  0001 C CNN
	1    1100 900 
	1    0    0    -1  
$EndComp
Wire Wire Line
	1100 900  1100 1100
Connection ~ 1100 1100
Wire Wire Line
	1100 1100 1000 1100
$Comp
L Mechanical:MountingHole MK?
U 1 1 613A69C2
P 1200 3750
AR Path="/613A69C2" Ref="MK?"  Part="1" 
AR Path="/61381202/613A69C2" Ref="MK1"  Part="1" 
F 0 "MK1" H 1300 3796 50  0000 L CNN
F 1 "M3.2" H 1300 3705 50  0000 L CNN
F 2 "MountingHole:MountingHole_3.2mm_M3_DIN965_Pad" H 1200 3750 60  0001 C CNN
F 3 "" H 1200 3750 60  0001 C CNN
	1    1200 3750
	1    0    0    -1  
$EndComp
$Comp
L Mechanical:MountingHole MK?
U 1 1 613A69C8
P 1600 3750
AR Path="/613A69C8" Ref="MK?"  Part="1" 
AR Path="/61381202/613A69C8" Ref="MK3"  Part="1" 
F 0 "MK3" H 1700 3796 50  0000 L CNN
F 1 "M3.2" H 1700 3705 50  0000 L CNN
F 2 "MountingHole:MountingHole_3.2mm_M3_DIN965_Pad" H 1600 3750 60  0001 C CNN
F 3 "" H 1600 3750 60  0001 C CNN
	1    1600 3750
	1    0    0    -1  
$EndComp
$Comp
L Mechanical:MountingHole MK?
U 1 1 613A69CE
P 1200 3950
AR Path="/613A69CE" Ref="MK?"  Part="1" 
AR Path="/61381202/613A69CE" Ref="MK2"  Part="1" 
F 0 "MK2" H 1300 3996 50  0000 L CNN
F 1 "M3.2" H 1300 3905 50  0000 L CNN
F 2 "MountingHole:MountingHole_3.2mm_M3_DIN965_Pad" H 1200 3950 60  0001 C CNN
F 3 "" H 1200 3950 60  0001 C CNN
	1    1200 3950
	1    0    0    -1  
$EndComp
$Comp
L Mechanical:MountingHole MK?
U 1 1 613A69D4
P 1600 3950
AR Path="/613A69D4" Ref="MK?"  Part="1" 
AR Path="/61381202/613A69D4" Ref="MK4"  Part="1" 
F 0 "MK4" H 1700 3996 50  0000 L CNN
F 1 "M3.2" H 1700 3905 50  0000 L CNN
F 2 "MountingHole:MountingHole_3.2mm_M3_DIN965_Pad" H 1600 3950 60  0001 C CNN
F 3 "" H 1600 3950 60  0001 C CNN
	1    1600 3950
	1    0    0    -1  
$EndComp
Text Notes 1750 3600 2    50   ~ 0
Mounting Holes
Text GLabel 4500 1350 0    39   Input ~ 0
Rpi11
$Comp
L Connector:RJ45 J6
U 1 1 6108DF0E
P 9250 5550
F 0 "J6" V 9353 5120 50  0000 R CNN
F 1 "Ethernet" V 9262 5120 50  0000 R CNN
F 2 "RJ45:RJ45_Amphenol_RJHSE5380" V 9250 5575 50  0001 C CNN
F 3 "~" V 9250 5575 50  0001 C CNN
	1    9250 5550
	0    -1   -1   0   
$EndComp
$Comp
L Connector:RJ45 J5
U 1 1 61090540
P 7750 5550
F 0 "J5" V 7853 5120 50  0000 R CNN
F 1 "POE Camera" V 7762 5120 50  0000 R CNN
F 2 "RJ45:RJ45_Amphenol_RJHSE5380" V 7750 5575 50  0001 C CNN
F 3 "https://ie.farnell.com/amphenol-icc-commercial-products/rjhse-5380/jack-rj45-shield-1port/dp/1860580?st=rjhse5380" V 7750 5575 50  0001 C CNN
	1    7750 5550
	0    -1   -1   0   
$EndComp
$Comp
L power:+12V #PWR014
U 1 1 610A6787
P 7650 4700
F 0 "#PWR014" H 7650 4550 50  0001 C CNN
F 1 "+12V" H 7665 4873 50  0000 C CNN
F 2 "" H 7650 4700 50  0001 C CNN
F 3 "" H 7650 4700 50  0001 C CNN
	1    7650 4700
	1    0    0    -1  
$EndComp
Wire Wire Line
	7650 4700 7650 4950
$Comp
L power:GND #PWR?
U 1 1 610AB992
P 7050 5200
AR Path="/610AB992" Ref="#PWR?"  Part="1" 
AR Path="/613934C7/610AB992" Ref="#PWR?"  Part="1" 
AR Path="/61381202/610AB992" Ref="#PWR012"  Part="1" 
F 0 "#PWR012" H 7050 4950 50  0001 C CNN
F 1 "GND" H 7055 5027 50  0000 C CNN
F 2 "" H 7050 5200 50  0001 C CNN
F 3 "" H 7050 5200 50  0001 C CNN
	1    7050 5200
	-1   0    0    -1  
$EndComp
Wire Wire Line
	7050 5200 7050 4950
Wire Wire Line
	7050 4950 7350 4950
Wire Wire Line
	7350 4950 7350 5150
Wire Wire Line
	7350 4950 7450 4950
Wire Wire Line
	7450 4950 7450 5150
Connection ~ 7350 4950
Wire Wire Line
	7750 5150 7750 4950
Wire Wire Line
	7750 4950 7650 4950
Connection ~ 7650 4950
Wire Wire Line
	7650 4950 7650 5150
Wire Wire Line
	8050 5150 8050 5100
Wire Wire Line
	8050 5100 9550 5100
Wire Wire Line
	9550 5100 9550 5150
Wire Wire Line
	9450 5150 9450 5000
Wire Wire Line
	9450 5000 7950 5000
Wire Wire Line
	7950 5000 7950 5150
Wire Wire Line
	7850 5150 7850 4900
Wire Wire Line
	7850 4900 9350 4900
Wire Wire Line
	9350 4900 9350 5150
Wire Wire Line
	7550 5150 7550 4800
Wire Wire Line
	7550 4800 9050 4800
Wire Wire Line
	9050 4800 9050 5150
$Comp
L Connector_Generic:Conn_01x03 J1
U 1 1 610BF23E
P 1450 4800
F 0 "J1" V 1322 4980 50  0000 L CNN
F 1 "Power" V 1413 4980 50  0000 L CNN
F 2 "Connector_JST:JST_XH_B3B-XH-A_1x03_P2.50mm_Vertical" H 1450 4800 50  0001 C CNN
F 3 "~" H 1450 4800 50  0001 C CNN
	1    1450 4800
	0    1    1    0   
$EndComp
$Comp
L power:+12V #PWR04
U 1 1 610C0836
P 1350 4450
F 0 "#PWR04" H 1350 4300 50  0001 C CNN
F 1 "+12V" H 1365 4623 50  0000 C CNN
F 2 "" H 1350 4450 50  0001 C CNN
F 3 "" H 1350 4450 50  0001 C CNN
	1    1350 4450
	1    0    0    -1  
$EndComp
$Comp
L power:+5V #PWR?
U 1 1 610C10ED
P 1550 4450
AR Path="/610C10ED" Ref="#PWR?"  Part="1" 
AR Path="/613934C7/610C10ED" Ref="#PWR?"  Part="1" 
AR Path="/61381202/610C10ED" Ref="#PWR05"  Part="1" 
F 0 "#PWR05" H 1550 4300 50  0001 C CNN
F 1 "+5V" H 1565 4623 50  0000 C CNN
F 2 "" H 1550 4450 50  0001 C CNN
F 3 "" H 1550 4450 50  0001 C CNN
	1    1550 4450
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR?
U 1 1 610C1706
P 1150 4650
AR Path="/610C1706" Ref="#PWR?"  Part="1" 
AR Path="/613934C7/610C1706" Ref="#PWR?"  Part="1" 
AR Path="/61381202/610C1706" Ref="#PWR03"  Part="1" 
F 0 "#PWR03" H 1150 4400 50  0001 C CNN
F 1 "GND" H 1155 4477 50  0000 C CNN
F 2 "" H 1150 4650 50  0001 C CNN
F 3 "" H 1150 4650 50  0001 C CNN
	1    1150 4650
	-1   0    0    -1  
$EndComp
Wire Wire Line
	1150 4650 1150 4550
Wire Wire Line
	1150 4550 1450 4550
Wire Wire Line
	1450 4550 1450 4600
Wire Wire Line
	1550 4450 1550 4600
$Comp
L power:GND #PWR?
U 1 1 610DB5EA
P 7350 6050
AR Path="/610DB5EA" Ref="#PWR?"  Part="1" 
AR Path="/613934C7/610DB5EA" Ref="#PWR?"  Part="1" 
AR Path="/61381202/610DB5EA" Ref="#PWR013"  Part="1" 
F 0 "#PWR013" H 7350 5800 50  0001 C CNN
F 1 "GND" H 7355 5877 50  0000 C CNN
F 2 "" H 7350 6050 50  0001 C CNN
F 3 "" H 7350 6050 50  0001 C CNN
	1    7350 6050
	-1   0    0    -1  
$EndComp
$Comp
L power:GND #PWR?
U 1 1 610E5177
P 8850 6050
AR Path="/610E5177" Ref="#PWR?"  Part="1" 
AR Path="/613934C7/610E5177" Ref="#PWR?"  Part="1" 
AR Path="/61381202/610E5177" Ref="#PWR015"  Part="1" 
F 0 "#PWR015" H 8850 5800 50  0001 C CNN
F 1 "GND" H 8855 5877 50  0000 C CNN
F 2 "" H 8850 6050 50  0001 C CNN
F 3 "" H 8850 6050 50  0001 C CNN
	1    8850 6050
	-1   0    0    -1  
$EndComp
Wire Wire Line
	7350 6050 7350 6000
Wire Wire Line
	7450 5950 7450 6000
Wire Wire Line
	7450 6000 7350 6000
Connection ~ 7350 6000
Wire Wire Line
	7350 6000 7350 5950
Wire Wire Line
	8850 6050 8850 6000
Wire Wire Line
	8950 5950 8950 6000
Wire Wire Line
	8950 6000 8850 6000
Connection ~ 8850 6000
Wire Wire Line
	8850 6000 8850 5950
Wire Wire Line
	6650 1800 7750 1800
Wire Wire Line
	7750 1800 8000 1800
Wire Wire Line
	8000 1900 7900 1900
$Comp
L Connector_Generic:Conn_01x06 J3
U 1 1 6112C741
P 6350 3450
F 0 "J3" V 6450 3000 50  0000 L CNN
F 1 "Motor PCB" V 6450 3250 50  0000 L CNN
F 2 "Connector_JST:JST_XH_B6B-XH-AM_1x06_P2.50mm_Vertical" H 6350 3450 50  0001 C CNN
F 3 "~" H 6350 3450 50  0001 C CNN
	1    6350 3450
	0    1    1    0   
$EndComp
$Comp
L power:GND #PWR?
U 1 1 6112E1A2
P 6750 2000
AR Path="/6112E1A2" Ref="#PWR?"  Part="1" 
AR Path="/613934C7/6112E1A2" Ref="#PWR?"  Part="1" 
AR Path="/61381202/6112E1A2" Ref="#PWR010"  Part="1" 
F 0 "#PWR010" H 6750 1750 50  0001 C CNN
F 1 "GND" H 6755 1827 50  0000 C CNN
F 2 "" H 6750 2000 50  0001 C CNN
F 3 "" H 6750 2000 50  0001 C CNN
	1    6750 2000
	-1   0    0    -1  
$EndComp
Wire Wire Line
	6750 2000 6750 1900
Connection ~ 6750 1900
Wire Wire Line
	6750 1900 6650 1900
$Comp
L power:GND #PWR?
U 1 1 6113E187
P 6900 3300
AR Path="/6113E187" Ref="#PWR?"  Part="1" 
AR Path="/613934C7/6113E187" Ref="#PWR?"  Part="1" 
AR Path="/61381202/6113E187" Ref="#PWR011"  Part="1" 
F 0 "#PWR011" H 6900 3050 50  0001 C CNN
F 1 "GND" H 6905 3127 50  0000 C CNN
F 2 "" H 6900 3300 50  0001 C CNN
F 3 "" H 6900 3300 50  0001 C CNN
	1    6900 3300
	-1   0    0    -1  
$EndComp
Wire Wire Line
	7750 1800 7750 3050
Connection ~ 7750 1800
Connection ~ 7750 3050
Wire Wire Line
	7750 3050 8000 3050
Text GLabel 5850 3000 0    39   Output ~ 0
SDA1
Text GLabel 5850 3100 0    39   Output ~ 0
SCL1
Wire Wire Line
	6550 3250 6550 3050
Wire Wire Line
	6550 3050 7750 3050
Wire Wire Line
	8000 2950 6450 2950
Wire Wire Line
	8000 2850 6350 2850
Wire Wire Line
	6350 2850 6350 3100
Wire Wire Line
	6250 2750 6250 3250
Wire Wire Line
	6450 2950 6450 3000
Wire Wire Line
	5850 3100 6350 3100
Connection ~ 6350 3100
Wire Wire Line
	6350 3100 6350 3250
Wire Wire Line
	5850 3000 6450 3000
Connection ~ 6450 3000
Wire Wire Line
	6450 3000 6450 3250
Text GLabel 8000 2650 2    50   Input ~ 0
LeftPost_Light_12v
Text GLabel 8000 2750 2    50   Input ~ 0
LeftPost_GND
Text GLabel 8000 2850 2    50   Input ~ 0
LeftPost_SCL1
Text GLabel 8000 2950 2    50   Input ~ 0
LeftPost_SDA1
Text GLabel 8000 3050 2    50   Input ~ 0
LeftPost_CN1_24v(FL)
Text GLabel 8000 1900 2    50   Input ~ 0
RightPost_InfraRed-
Text GLabel 8000 1800 2    50   Input ~ 0
RightPost_InfraRed+
Text GLabel 8000 2000 2    50   Input ~ 0
RightPost_Light_GND
Text GLabel 8000 1700 2    50   Input ~ 0
RightPost_Light_12v
Wire Notes Line
	6950 4450 10100 4450
Wire Notes Line
	10100 4450 10100 6350
Wire Notes Line
	10100 6350 6950 6350
Wire Notes Line
	6950 6350 6950 4450
Text Notes 10000 4550 2    39   ~ 0
Power over Ethernet circuit for camera
$Comp
L power:+5V #PWR?
U 1 1 611CC2B1
P 1750 900
AR Path="/611CC2B1" Ref="#PWR?"  Part="1" 
AR Path="/613934C7/611CC2B1" Ref="#PWR?"  Part="1" 
AR Path="/61381202/611CC2B1" Ref="#PWR06"  Part="1" 
F 0 "#PWR06" H 1750 750 50  0001 C CNN
F 1 "+5V" H 1765 1073 50  0000 C CNN
F 2 "" H 1750 900 50  0001 C CNN
F 3 "" H 1750 900 50  0001 C CNN
	1    1750 900 
	1    0    0    -1  
$EndComp
Wire Wire Line
	1750 900  1750 1100
Connection ~ 1750 1100
Wire Wire Line
	1750 1100 1850 1100
Wire Notes Line
	5150 2850 5900 2850
Wire Notes Line
	5900 2850 5900 3200
Wire Notes Line
	5900 3200 5150 3200
Wire Notes Line
	5150 3200 5150 2850
Text Notes 5450 3000 2    39   ~ 0
12C From\nRaspberry
Wire Notes Line
	7850 2100 9250 2100
Wire Notes Line
	9250 2100 9250 1500
Wire Notes Line
	9250 1500 7850 1500
Wire Notes Line
	7850 1500 7850 2100
Text Notes 9200 1600 2    39   ~ 0
CAT-5 cable from right post
Wire Notes Line
	7850 2250 7850 3300
Wire Notes Line
	7850 3300 9250 3300
Wire Notes Line
	9250 3300 9250 2250
Wire Notes Line
	9250 2250 7850 2250
Text Notes 9200 2350 2    39   ~ 0
CAT-5 cable from left post
$Comp
L Connector_Generic:Conn_01x04 J2
U 1 1 6108C852
P 5250 4750
F 0 "J2" H 5330 4742 50  0000 L CNN
F 1 "Driveway lights" H 5330 4651 50  0000 L CNN
F 2 "TerminalBlock:TerminalBlock_bornier-4_P5.08mm" H 5250 4750 50  0001 C CNN
F 3 "~" H 5250 4750 50  0001 C CNN
	1    5250 4750
	1    0    0    -1  
$EndComp
Text GLabel 1000 1400 0    39   BiDi ~ 0
W1
Wire Wire Line
	1000 1400 1200 1400
Text GLabel 4900 4650 0    39   BiDi ~ 0
W1
Text GLabel 4900 4750 0    39   Input ~ 0
GND
Text GLabel 1050 4450 0    39   UnSpc ~ 0
12V
Wire Wire Line
	1350 4450 1350 4600
Wire Wire Line
	1050 4450 1350 4450
Connection ~ 1350 4450
Text GLabel 4900 4850 0    39   UnSpc ~ 0
12V
Text GLabel 4900 4950 0    39   UnSpc ~ 0
3V3
NoConn ~ 1700 1400
NoConn ~ 1700 1500
NoConn ~ 1700 1600
NoConn ~ 1700 1800
NoConn ~ 1700 1900
NoConn ~ 1700 2100
NoConn ~ 1700 2200
NoConn ~ 1700 2300
NoConn ~ 1700 2400
NoConn ~ 1700 2600
NoConn ~ 1700 2800
NoConn ~ 1700 2900
NoConn ~ 1700 3000
NoConn ~ 1200 2900
NoConn ~ 1200 2800
NoConn ~ 1200 2500
NoConn ~ 1200 2600
NoConn ~ 1200 2700
NoConn ~ 1200 2000
NoConn ~ 1200 1800
NoConn ~ 1200 2100
NoConn ~ 1200 2200
Wire Wire Line
	4900 4650 5050 4650
Wire Wire Line
	4900 4750 5050 4750
Wire Wire Line
	4900 4850 5050 4850
Wire Wire Line
	4900 4950 5050 4950
Wire Notes Line
	4650 4450 6700 4450
Wire Notes Line
	6700 4450 6700 5100
Wire Notes Line
	6700 5100 4650 5100
Wire Notes Line
	4650 5100 4650 4450
Text Notes 6600 4550 2    39   ~ 0
Driveway Connector
Wire Wire Line
	7900 1900 7900 2000
Wire Wire Line
	7900 2000 8000 2000
Connection ~ 7900 1900
Wire Wire Line
	6750 1900 7900 1900
$Comp
L onetouchlogo:LOGO G1
U 1 1 6128AE9C
P 1400 5150
F 0 "G1" H 1400 5015 60  0001 C CNN
F 1 "LOGO" H 1400 5285 60  0001 C CNN
F 2 "OneTouch_Logo:onetouchlogo" H 1400 5150 50  0001 C CNN
F 3 "" H 1400 5150 50  0001 C CNN
	1    1400 5150
	1    0    0    -1  
$EndComp
$Comp
L power:+3.3V #PWR?
U 1 1 612261AF
P 6050 2350
AR Path="/612261AF" Ref="#PWR?"  Part="1" 
AR Path="/61381202/612261AF" Ref="#PWR09"  Part="1" 
F 0 "#PWR09" H 6050 2200 50  0001 C CNN
F 1 "+3.3V" H 6065 2523 50  0000 C CNN
F 2 "" H 6050 2350 50  0001 C CNN
F 3 "" H 6050 2350 50  0001 C CNN
	1    6050 2350
	1    0    0    -1  
$EndComp
$Comp
L STD40NF10:STD40NF10 T?
U 1 1 61248E3D
P 4950 1250
AR Path="/61248E3D" Ref="T?"  Part="1" 
AR Path="/613934C7/61248E3D" Ref="T?"  Part="1" 
AR Path="/61381202/61248E3D" Ref="T1"  Part="1" 
F 0 "T1" H 5210 1296 50  0000 L CNN
F 1 "STD40NF10" H 5210 1205 50  0000 L CNN
F 2 "D_PAK" H 4950 1250 50  0001 L BNN
F 3 "" H 4950 1250 50  0001 L BNN
	1    4950 1250
	1    0    0    -1  
$EndComp
Wire Wire Line
	4850 1350 4500 1350
Wire Wire Line
	5050 1050 5050 1000
$Comp
L power:+12V #PWR?
U 1 1 61248E57
P 5050 1000
AR Path="/61248E57" Ref="#PWR?"  Part="1" 
AR Path="/613934C7/61248E57" Ref="#PWR?"  Part="1" 
AR Path="/61381202/61248E57" Ref="#PWR07"  Part="1" 
F 0 "#PWR07" H 5050 850 50  0001 C CNN
F 1 "+12V" H 5065 1173 50  0000 C CNN
F 2 "" H 5050 1000 50  0001 C CNN
F 3 "" H 5050 1000 50  0001 C CNN
	1    5050 1000
	1    0    0    -1  
$EndComp
Wire Wire Line
	6650 1700 6750 1700
Wire Wire Line
	6150 2650 6900 2650
Wire Wire Line
	5050 1550 5050 1450
$Comp
L Connector_Generic:Conn_01x03 J4
U 1 1 611032D3
P 6450 1800
F 0 "J4" H 6368 1375 50  0000 C CNN
F 1 "Right Post" H 6368 1466 50  0000 C CNN
F 2 "Connector_JST:JST_XH_B3B-XH-AM_1x03_P2.50mm_Vertical" H 6450 1800 50  0001 C CNN
F 3 "~" H 6450 1800 50  0001 C CNN
	1    6450 1800
	-1   0    0    1   
$EndComp
Wire Wire Line
	6750 1550 6750 1700
Wire Wire Line
	5050 1550 6750 1550
Connection ~ 6750 1700
Wire Wire Line
	6750 1700 6900 1700
Wire Wire Line
	6900 1700 6900 2650
Connection ~ 6900 1700
Wire Wire Line
	6900 1700 8000 1700
Connection ~ 6900 2650
Wire Wire Line
	6900 2650 8000 2650
Wire Wire Line
	6150 2650 6150 3250
Text GLabel 8000 2550 2    50   Input ~ 0
LeftPost_3.3V
Wire Wire Line
	6050 3250 6050 2550
Wire Wire Line
	8000 2550 6050 2550
Connection ~ 6050 2550
Wire Wire Line
	6050 2350 6050 2550
Wire Wire Line
	6250 2750 6900 2750
Wire Wire Line
	6900 3300 6900 2750
Connection ~ 6900 2750
Wire Wire Line
	6900 2750 8000 2750
$EndSCHEMATC
