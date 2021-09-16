import csv
from itertools import islice

start = 1056

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
# b - body part
# s - setting
# c - concept
# m - multiple objects (plural object)
# g - group of people (plural person)
# l - group of living things (plural animal/plant)
# k - group of concepts (plural concepts)
# io - indirect object

#whore
#It