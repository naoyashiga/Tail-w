# coding: UTF-8
import numpy

f = open('data/wakati_rashomon.txt')
data1 = f.read()
f.close()
 
lines1 = data1.split(' ')

wholeText = ""

for line in lines1:
	waraiLine = line
	if numpy.random.rand() < 0.3:
		waraiLine = line.replace("。", "w ")

	wholeText += waraiLine

print(wholeText)
