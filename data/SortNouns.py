import csv
from itertools import islice

start = 524

with open('nouns-freq.csv') as csvfile, open('nouns-type.csv', 'a') as outfile:
	nouns = csv.reader(csvfile, delimiter=',')
	for row in islice(nouns, start, None):
		temp = input(str(row[0])+": ")
		if (temp == 'quit'):
			break
		outfile.write("%s, %s\n" % (row[0],temp))


# o - object
# p - person
# a - animal/plant
# s - setting
# c - concept
# g - group (plural)
# b - body part
# io - indirect object