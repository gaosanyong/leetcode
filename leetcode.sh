# 192. Word Frequency (Medium)
#
# Write a bash script to calculate the frequency of each word in a text file words.txt.
#
# For simplicity sake, you may assume:
# words.txt contains only lowercase characters and space ' ' characters.
# Each word must consist of lowercase characters only.
# Words are separated by one or more whitespace characters.
#
# Example:
# Assume that words.txt has the following content:
#
# the day is sunny the the
# the sunny is is
#
# Your script should output the following, sorted by descending frequency:
#
# the 4
# is 3
# sunny 2
# day 1
#
# Note:
# Don't worry about handling ties, it is guaranteed that each word's frequency count is unique.
# Could you write it in one-line using Unix pipes?

tr -s ' ' '\n' < words.txt | sort | uniq -c | sort -r | awk '{print $2, $1}'

# 193. Valid Phone Numbers (Easy)
#
# Given a text file file.txt that contains list of phone numbers (one per line), 
# write a one liner bash script to print all valid phone numbers.
#
# You may assume that a valid phone number must appear in one of the following two formats: (xxx) xxx-xxxx or xxx-xxx-xxxx. (x means a digit)

# You may also assume each line in the text file must not contain leading or trailing white spaces.

# Example:

# Assume that file.txt has the following content:

# 987-123-4567
# 123 456 7890
# (123) 456-7890
# Your script should output the following valid phone numbers:

# 987-123-4567
# (123) 456-7890