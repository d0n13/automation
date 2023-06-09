EESchema Schematic File Version 5
EELAYER 36 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title "Driveway light, 1-wire, dual output"
Date "2021-04-10"
Rev "1.1"
Comp "OneTouch Mobile"
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
Comment5 ""
Comment6 ""
Comment7 ""
Comment8 ""
Comment9 ""
$EndDescr
Connection ~ 2700 1150
Connection ~ 2700 1450
Connection ~ 3000 1250
Connection ~ 3950 2400
Connection ~ 6100 1550
Connection ~ 6100 2500
Connection ~ 6150 3350
Connection ~ 6150 4050
Wire Wire Line
	1910 1150 2700 1150
Wire Wire Line
	1910 1250 3000 1250
Wire Wire Line
	1910 1350 2430 1350
Wire Wire Line
	1910 1450 2700 1450
Wire Wire Line
	2430 750  2430 1350
Wire Wire Line
	2700 750  2700 1150
Wire Wire Line
	2700 1150 3750 1150
Wire Wire Line
	2700 1450 2700 1580
Wire Wire Line
	2700 1450 4100 1450
Wire Wire Line
	3000 600  3000 1250
Wire Wire Line
	3000 1250 3950 1250
Wire Wire Line
	3150 600  3000 600 
Wire Wire Line
	3750 1750 3750 1150
Wire Wire Line
	3750 2050 3750 2400
Wire Wire Line
	3750 2400 3950 2400
Wire Wire Line
	3950 2400 3950 1250
Wire Wire Line
	3950 3200 3950 2400
Wire Wire Line
	4100 1450 4100 2900
Wire Wire Line
	4200 2900 4100 2900
Wire Wire Line
	4200 3200 3950 3200
Wire Wire Line
	5400 3100 5600 3100
Wire Wire Line
	5400 3200 5600 3200
Wire Wire Line
	5600 2500 6100 2500
Wire Wire Line
	5600 3100 5600 2500
Wire Wire Line
	5600 3200 5600 4050
Wire Wire Line
	5600 4050 6150 4050
Wire Wire Line
	6100 1500 6100 1550
Wire Wire Line
	6100 1550 6100 1650
Wire Wire Line
	6100 1950 6100 2500
Wire Wire Line
	6100 2500 6400 2500
Wire Wire Line
	6150 3350 6150 3300
Wire Wire Line
	6150 3350 6600 3350
Wire Wire Line
	6150 3500 6150 3350
Wire Wire Line
	6150 3800 6150 4050
Wire Wire Line
	6150 4050 6150 4150
Wire Wire Line
	6150 4150 6400 4150
Wire Wire Line
	6600 1550 6100 1550
Wire Wire Line
	6600 1700 6600 1550
Wire Wire Line
	6600 1800 6600 2200
Wire Wire Line
	6600 2800 6600 2600
Wire Wire Line
	6600 3350 6600 3550
Wire Wire Line
	6600 3650 6600 3850
Wire Wire Line
	6600 4400 6600 4250
Wire Wire Line
	6750 1700 6600 1700
Wire Wire Line
	6750 1800 6600 1800
Wire Wire Line
	6750 3550 6600 3550
Wire Wire Line
	6750 3650 6600 3650
Text GLabel 3150 600  2    50   Output ~ 0
GPIO
$Comp
L power:+12V #PWR0101
U 1 1 605C4255
P 2430 750
F 0 "#PWR0101" H 2430 600 50  0001 C CNN
F 1 "+12V" H 2445 923 50  0000 C CNN
F 2 "" H 2430 750 50  0001 C CNN
F 3 "" H 2430 750 50  0001 C CNN
	1    2430 750 
	1    0    0    -1  
$EndComp
$Comp
L power:+3.3V #PWR02
U 1 1 605A950B
P 2700 750
F 0 "#PWR02" H 2700 600 50  0001 C CNN
F 1 "+3.3V" H 2715 923 50  0000 C CNN
F 2 "" H 2700 750 50  0001 C CNN
F 3 "" H 2700 750 50  0001 C CNN
	1    2700 750 
	1    0    0    -1  
$EndComp
$Comp
L power:+12V #PWR05
U 1 1 605CEF51
P 6100 1500
F 0 "#PWR05" H 6100 1350 50  0001 C CNN
F 1 "+12V" H 6115 1673 50  0000 C CNN
F 2 "" H 6100 1500 50  0001 C CNN
F 3 "" H 6100 1500 50  0001 C CNN
	1    6100 1500
	1    0    0    -1  
$EndComp
$Comp
L power:+12V #PWR03
U 1 1 605BF12E
P 6150 3300
F 0 "#PWR03" H 6150 3150 50  0001 C CNN
F 1 "+12V" H 6165 3473 50  0000 C CNN
F 2 "" H 6150 3300 50  0001 C CNN
F 3 "" H 6150 3300 50  0001 C CNN
	1    6150 3300
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR01
U 1 1 605B189C
P 2700 1580
F 0 "#PWR01" H 2700 1330 50  0001 C CNN
F 1 "GND" H 2705 1407 50  0000 C CNN
F 2 "" H 2700 1580 50  0001 C CNN
F 3 "" H 2700 1580 50  0001 C CNN
	1    2700 1580
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR06
U 1 1 605CC303
P 6600 2800
F 0 "#PWR06" H 6600 2550 50  0001 C CNN
F 1 "GND" H 6605 2627 50  0000 C CNN
F 2 "" H 6600 2800 50  0001 C CNN
F 3 "" H 6600 2800 50  0001 C CNN
	1    6600 2800
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR04
U 1 1 605C8208
P 6600 4400
F 0 "#PWR04" H 6600 4150 50  0001 C CNN
F 1 "GND" H 6605 4227 50  0000 C CNN
F 2 "" H 6600 4400 50  0001 C CNN
F 3 "" H 6600 4400 50  0001 C CNN
	1    6600 4400
	1    0    0    -1  
$EndComp
$Comp
L Device:R R1
U 1 1 605A70D2
P 3750 1900
F 0 "R1" H 3820 1946 50  0000 L CNN
F 1 "1K" H 3820 1855 50  0000 L CNN
F 2 "Resistor_SMD:R_1206_3216Metric" V 3680 1900 50  0001 C CNN
F 3 "~" H 3750 1900 50  0001 C CNN
	1    3750 1900
	1    0    0    -1  
$EndComp
$Comp
L Device:R R3
U 1 1 605CF729
P 6100 1800
F 0 "R3" H 6170 1846 50  0000 L CNN
F 1 "10K" H 6170 1755 50  0000 L CNN
F 2 "Resistor_SMD:R_1206_3216Metric" V 6030 1800 50  0001 C CNN
F 3 "~" H 6100 1800 50  0001 C CNN
	1    6100 1800
	1    0    0    -1  
$EndComp
$Comp
L Device:R R2
U 1 1 605BE695
P 6150 3650
F 0 "R2" H 6220 3696 50  0000 L CNN
F 1 "10K" H 6220 3605 50  0000 L CNN
F 2 "Resistor_SMD:R_1206_3216Metric" V 6080 3650 50  0001 C CNN
F 3 "~" H 6150 3650 50  0001 C CNN
	1    6150 3650
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x02 J4
U 1 1 605D1513
P 6950 1700
F 0 "J4" H 7030 1692 50  0000 L CNN
F 1 "LED" H 7030 1601 50  0000 L CNN
F 2 "Connector_JST:JST_EH_S2B-EH_1x02_P2.50mm_Horizontal" H 6950 1700 50  0001 C CNN
F 3 "~" H 6950 1700 50  0001 C CNN
	1    6950 1700
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x02 J3
U 1 1 605C53BB
P 6950 3550
F 0 "J3" H 7030 3542 50  0000 L CNN
F 1 "LED" H 7030 3451 50  0000 L CNN
F 2 "Connector_JST:JST_EH_S2B-EH_1x02_P2.50mm_Horizontal" H 6950 3550 50  0001 C CNN
F 3 "~" H 6950 3550 50  0001 C CNN
	1    6950 3550
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x04 J?
U 1 1 00000000
P 1710 1350
F 0 "J?" H 1710 944 50  0000 C CNN
F 1 "Power/Data In" H 1710 1053 50  0000 C CNN
F 2 "" H 1710 1350 50  0001 C CNN
F 3 "~" H 1710 1350 50  0001 C CNN
	1    1710 1350
	-1   0    0    1   
$EndComp
$Comp
L Connector_Generic:Conn_01x04 J?
U 1 1 00000000
P 1720 2020
F 0 "J?" H 1720 1614 50  0000 C CNN
F 1 "Power/Data In" H 1720 1723 50  0000 C CNN
F 2 "" H 1720 2020 50  0001 C CNN
F 3 "~" H 1720 2020 50  0001 C CNN
	1    1720 2020
	-1   0    0    1   
$EndComp
$Comp
L STD40NF10:STD40NF10 T1
U 1 1 605CB166
P 6500 2400
F 0 "T1" H 6760 2446 50  0000 L CNN
F 1 "STD40NF10" H 6760 2355 50  0000 L CNN
F 2 "STD40NF10:D_PAK" H 6500 2400 50  0001 L BNN
F 3 "" H 6500 2400 50  0001 L BNN
	1    6500 2400
	1    0    0    -1  
$EndComp
$Comp
L STD40NF10:STD40NF10 T2
U 1 1 605D7DDE
P 6500 4050
F 0 "T2" H 6760 4096 50  0000 L CNN
F 1 "STD40NF10" H 6760 4005 50  0000 L CNN
F 2 "STD40NF10:D_PAK" H 6500 4050 50  0001 L BNN
F 3 "https://ie.farnell.com/stmicroelectronics/std40nf03lt4/mosfet-n-ch-30v-40a-dpak/dp/1752039?ost=std40nf03l&iscrfnonsku=false" H 6500 4050 50  0001 L BNN
	1    6500 4050
	1    0    0    -1  
$EndComp
$Comp
L onetouchlogo:LOGO logo1
U 1 1 605DAB09
P 5600 950
F 0 "logo1" H 5650 1150 60  0000 C CNN
F 1 "LOGO" H 5601 1177 60  0001 C CNN
F 2 "logo:onetouchlogo" H 5600 950 50  0001 C CNN
F 3 "" H 5600 950 50  0001 C CNN
	1    5600 950 
	1    0    0    -1  
$EndComp
$Comp
L DS2413P_:DS2413P+ U1
U 1 1 6058E10F
P 4800 3100
F 0 "U1" H 4800 3467 50  0000 C CNN
F 1 "DS2413P+" H 4800 3376 50  0000 C CNN
F 2 "DS2413P_:SOIC127P429X150-N" H 4800 3100 50  0001 L BNN
F 3 "http://www.farnell.com/datasheets/1911564.pdf" H 4800 3100 50  0001 L BNN
	1    4800 3100
	-1   0    0    1   
$EndComp
$EndSCHEMATC
