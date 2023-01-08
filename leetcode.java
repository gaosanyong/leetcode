import java.util.HashMap;

class Solution {

    /*1. Two Sum (Easy)
    Given an array of integers nums and an integer target, return indices of 
    the two numbers such that they add up to target. You may assume that each 
    input would have exactly one solution, and you may not use the same element 
    twice. You can return the answer in any order.

    Example 1:
    Input: nums = [2,7,11,15], target = 9
    Output: [0,1]
    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

    Example 2:
    Input: nums = [3,2,4], target = 6
    Output: [1,2]

    Example 3:
    Input: nums = [3,3], target = 6
    Output: [0,1]

    Constraints:
    * 2 <= nums.length <= 10^4
    * -10^9 <= nums[i] <= 10^9
    * -10^9 <= target <= 10^9
    * Only one valid answer exists.

    Follow-up: Can you come up with an algorithm that is less than O(n2) time 
               complexity?*/

    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> seen = new HashMap<>(); 
        for (int i = 0; i < nums.length; ++i) {
            int diff = target - nums[i]; 
            if (seen.containsKey(diff)) return new int[]{seen.get(diff), i}; 
            seen.put(nums[i], i); 
        }
        return null; 
    }


    /*9. Palindrome Number (Easy)
    Given an integer x, return true if x is a palindrome, and false otherwise.

    Example 1:
    Input: x = 121
    Output: true
    Explanation: 121 reads as 121 from left to right and from right to left.

    Example 2:
    Input: x = -121
    Output: false
    Explanation: From left to right, it reads -121. From right to left, it 
                 becomes 121-. Therefore it is not a palindrome.

    Example 3:
    Input: x = 10
    Output: false
    Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

    Constraints: -2^31 <= x <= 2^31 - 1

    Follow up: Could you solve it without converting the integer to a string?*/

    public boolean isPalindrome(int x) {
        if (x % 10 == 0 && x != 0 || x < 0) return false; 
        int rev = 0; 
        for (; x > rev; x /= 10) 
            rev = 10*rev + x%10; 
        return x == rev || x == rev/10; 
    }


    /*13. Roman to Integer (Easy)
    Roman numerals are represented by seven different symbols: I, V, X, L, C, D 
    and M.
        Symbol       Value
        I             1
        V             5
        X             10
        L             50
        C             100
        D             500
        M             1000
    For example, 2 is written as II in Roman numeral, just two ones added 
    together. 12 is written as XII, which is simply X + II. The number 27 is 
    written as XXVII, which is XX + V + II. Roman numerals are usually written 
    largest to smallest from left to right. However, the numeral for four is 
    not IIII. Instead, the number four is written as IV. Because the one is 
    before the five we subtract it making four. The same principle applies to 
    the number nine, which is written as IX. There are six instances where 
    subtraction is used:
    * I can be placed before V (5) and X (10) to make 4 and 9. 
    * X can be placed before L (50) and C (100) to make 40 and 90. 
    * C can be placed before D (500) and M (1000) to make 400 and 900.
    Given a roman numeral, convert it to an integer.

    Example 1:
    Input: s = "III"
    Output: 3
    Explanation: III = 3.

    Example 2:
    Input: s = "LVIII"
    Output: 58
    Explanation: L = 50, V= 5, III = 3.

    Example 3:
    Input: s = "MCMXCIV"
    Output: 1994
    Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

    Constraints:
    * 1 <= s.length <= 15
    * s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
    * It is guaranteed that s is a valid roman numeral in the range [1, 3999].*/

    public int romanToInt(String s) {
        HashMap<Character, Integer> mp = new HashMap<>() {{
            put('I', 1); 
            put('V', 5); 
            put('X', 10); 
            put('L', 50); 
            put('C', 100); 
            put('D', 500); 
            put('M', 1000); 
        }}; 
        int ans = 0; 
        for (int i = 0; i < s.length(); ++i) {
            if (i+1 < s.length() && mp.get(s.charAt(i)) < mp.get(s.charAt(i+1))) ans -= mp.get(s.charAt(i)); 
            else ans += mp.get(s.charAt(i)); 
        }
        return ans; 
    }


    /*14. Longest Common Prefix (Easy)
    Write a function to find the longest common prefix string amongst an array 
    of strings. If there is no common prefix, return an empty string "".

    Example 1:
    Input: strs = ["flower","flow","flight"]
    Output: "fl"

    Example 2:
    Input: strs = ["dog","racecar","car"]
    Output: ""
    Explanation: There is no common prefix among the input strings.

    Constraints:
    * 1 <= strs.length <= 200
    * 0 <= strs[i].length <= 200
    * strs[i] consists of only lowercase English letters.*/

    public String longestCommonPrefix(String[] strs) {
        String lo = Collections.min(Arrays.asList(strs)), hi = Collections.max(Arrays.asList(strs)); 
        int i = 0; 
        for (; i < lo.length() && i < hi.length() && lo.charAt(i) == hi.charAt(i); ++i); 
        return lo.substring(0, i); 
    }


    /*20. Valid Parentheses (Easy)
    Given a string s containing just the characters '(', ')', '{', '}', '[' and 
    ']', determine if the input string is valid. An input string is valid if:
    * Open brackets must be closed by the same type of brackets.
    * Open brackets must be closed in the correct order.
    * Every close bracket has a corresponding open bracket of the same type.

    Example 1:
    Input: s = "()"
    Output: true

    Example 2:
    Input: s = "()[]{}"
    Output: true

    Example 3:
    Input: s = "(]"
    Output: false

    Constraints:
    * 1 <= s.length <= 10^4
    * s consists of parentheses only '()[]{}'.*/

    public boolean isValid(String s) {
        Stack<Character> stk = new Stack<>(); 
        for (char ch : s.toCharArray()) {
            if (ch == '(') stk.push(')'); 
            else if (ch == '[') stk.push(']'); 
            else if (ch == '{') stk.push('}'); 
            else if (stk.empty() || stk.pop() != ch) return false; 
        }
        return stk.empty(); 
    }


    /*21. Merge Two Sorted Lists (Easy)
    You are given the heads of two sorted linked lists list1 and list2. Merge 
    the two lists in a one sorted list. The list should be made by splicing 
    together the nodes of the first two lists. Return the head of the merged 
    linked list.

    Example 1:
    Input: list1 = [1,2,4], list2 = [1,3,4]
    Output: [1,1,2,3,4,4]

    Example 2:
    Input: list1 = [], list2 = []
    Output: []

    Example 3:
    Input: list1 = [], list2 = [0]
    Output: [0]

    Constraints:
    * The number of nodes in both lists is in the range [0, 50].
    * -100 <= Node.val <= 100
    * Both list1 and list2 are sorted in non-decreasing order.*/

    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(), node = dummy; 
        while (list1 != null && list2 != null) 
            if (list1.val < list2.val) {
                node = node.next = list1; 
                list1 = list1.next; 
            } else {
                node = node.next = list2; 
                list2 = list2.next; 
            }
        if (list1 != null) node.next = list1; 
        if (list2 != null) node.next = list2; 
        return dummy.next; 
    }


    /*26. Remove Duplicates from Sorted Array (Easy)
    Given an integer array nums sorted in non-decreasing order, remove the 
    duplicates in-place such that each unique element appears only once. The 
    relative order of the elements should be kept the same. Since it is 
    impossible to change the length of the array in some languages, you must 
    instead have the result be placed in the first part of the array nums. More 
    formally, if there are k elements after removing the duplicates, then the 
    first k elements of nums should hold the final result. It does not matter 
    what you leave beyond the first k elements. Return k after placing the 
    final result in the first k slots of nums. Do not allocate extra space for 
    another array. You must do this by modifying the input array in-place with 
    O(1) extra memory.

    Custom Judge:
    The judge will test your solution with the following code:

    int[] nums = [...]; // Input array
    int[] expectedNums = [...]; // The expected answer with correct length

    int k = removeDuplicates(nums); // Calls your implementation

    assert k == expectedNums.length;
    for (int i = 0; i < k; i++) {
        assert nums[i] == expectedNums[i];
    }
    If all assertions pass, then your solution will be accepted.

    Example 1:
    Input: nums = [1,1,2]
    Output: 2, nums = [1,2,_]
    Explanation: Your function should return k = 2, with the first two elements 
                 of nums being 1 and 2 respectively. It does not matter what 
                 you leave beyond the returned k (hence they are underscores).
    
    Example 2:
    Input: nums = [0,0,1,1,1,2,2,3,3,4]
    Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
    Explanation: Your function should return k = 5, with the first five 
                 elements of nums being 0, 1, 2, 3, and 4 respectively. It does 
                 not matter what you leave beyond the returned k (hence they 
                 are underscores).

    Constraints:
    * 1 <= nums.length <= 3 * 10^4
    * -100 <= nums[i] <= 100
    * nums is sorted in non-decreasing order.*/

    public int removeDuplicates(int[] nums) {
        int k = 0; 
        for (int x : nums) 
            if (k == 0 || nums[k-1] < x) nums[k++] = x; 
        return k; 
    }


    /*27. Remove Element (Easy)
    Given an integer array nums and an integer val, remove all occurrences of 
    val in nums in-place. The relative order of the elements may be changed.
    Since it is impossible to change the length of the array in some languages, 
    you must instead have the result be placed in the first part of the array 
    nums. More formally, if there are k elements after removing the duplicates, 
    then the first k elements of nums should hold the final result. It does 
    not matter what you leave beyond the first k elements. Return k after 
    placing the final result in the first k slots of nums. Do not allocate 
    extra space for another array. You must do this by modifying the input 
    array in-place with O(1) extra memory.

    Custom Judge:
    The judge will test your solution with the following code:

    int[] nums = [...]; // Input array
    int val = ...; // Value to remove
    int[] expectedNums = [...]; // The expected answer with correct length.
                                // It is sorted with no values equaling val.

    int k = removeElement(nums, val); // Calls your implementation

    assert k == expectedNums.length;
    sort(nums, 0, k); // Sort the first k elements of nums
    for (int i = 0; i < actualLength; i++) {
        assert nums[i] == expectedNums[i];
    }
    If all assertions pass, then your solution will be accepted.

    Example 1:
    Input: nums = [3,2,2,3], val = 3
    Output: 2, nums = [2,2,_,_]
    Explanation: Your function should return k = 2, with the first two elements 
                 of nums being 2. It does not matter what you leave beyond the 
                 returned k (hence they are underscores).
    
    Example 2:
    Input: nums = [0,1,2,2,3,0,4,2], val = 2
    Output: 5, nums = [0,1,4,0,3,_,_,_]
    Explanation: Your function should return k = 5, with the first five 
                 elements of nums containing 0, 0, 1, 3, and 4. Note that the 
                 five elements can be returned in any order. It does not matter 
                 what you leave beyond the returned k (hence they are 
                 underscores).

    Constraints:
    * 0 <= nums.length <= 100
    * 0 <= nums[i] <= 50
    * 0 <= val <= 100*/

    public int removeElement(int[] nums, int val) {
        int k = 0; 
        for (int x : nums) 
            if (x != val) nums[k++] = x; 
        return k; 
    }


    /*35. Search Insert Position (Easy)
    Given a sorted array of distinct integers and a target value, return the 
    index if the target is found. If not, return the index where it would be if 
    it were inserted in order. You must write an algorithm with O(log n) 
    runtime complexity.

    Example 1:
    Input: nums = [1,3,5,6], target = 5
    Output: 2

    Example 2:
    Input: nums = [1,3,5,6], target = 2
    Output: 1

    Example 3:
    Input: nums = [1,3,5,6], target = 7
    Output: 4

    Constraints:
    * 1 <= nums.length <= 10^4
    * -10^4 <= nums[i] <= 10^4
    * nums contains distinct values sorted in ascending order.
    * -10^4 <= target <= 10^4*/

    public int searchInsert(int[] nums, int target) {
        int k = Arrays.binarySearch(nums, target); 
        return k >= 0 ? k : -k-1; 
    }
    

    /*55. Jump Game (Medium)
    You are given an integer array nums. You are initially positioned at the 
    array's first index, and each element in the array represents your maximum 
    jump length at that position. Return true if you can reach the last index, 
    or false otherwise.

    Example 1:
    Input: nums = [2,3,1,1,4]
    Output: true
    Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

    Example 2:
    Input: nums = [3,2,1,0,4]
    Output: false
    Explanation: You will always arrive at index 3 no matter what. Its maximum 
                 jump length is 0, which makes it impossible to reach the last 
                 index.

    Constraints:
    * 1 <= nums.length <= 10^4
    * 0 <= nums[i] <= 10^5*/

    public boolean canJump(int[] nums) {
        for (int i = 0, ii = 0; i < nums.length; ++i) {
            if (ii < i) return false; 
            ii = Math.max(ii, i+nums[i]); 
        }
        return true; 
    }


    /*58. Length of Last Word (Easy)
    Given a string s consisting of words and spaces, return the length of the 
    last word in the string. A word is a maximal substring consisting of non-
    space characters only.

    Example 1:
    Input: s = "Hello World"
    Output: 5
    Explanation: The last word is "World" with length 5.

    Example 2:
    Input: s = "   fly me   to   the moon  "
    Output: 4
    Explanation: The last word is "moon" with length 4.

    Example 3:
    Input: s = "luffy is still joyboy"
    Output: 6
    Explanation: The last word is "joyboy" with length 6.

    Constraints:
    * 1 <= s.length <= 10^4
    * s consists of only English letters and spaces ' '.
    * There will be at least one word in s.*/

    public int lengthOfLastWord(String s) {
        String[] words = s.split(" "); 
        return words[words.length-1].length(); 
    }


    /*66. Plus One (Easy)
    You are given a large integer represented as an integer array digits, where 
    each digits[i] is the ith digit of the integer. The digits are ordered from 
    most significant to least significant in left-to-right order. The large 
    integer does not contain any leading 0's. Increment the large integer by 
    one and return the resulting array of digits.

    Example 1:
    Input: digits = [1,2,3]
    Output: [1,2,4]
    Explanation: The array represents the integer 123. Incrementing by one 
                 gives 123 + 1 = 124. Thus, the result should be [1,2,4].
    
    Example 2:
    Input: digits = [4,3,2,1]
    Output: [4,3,2,2]
    Explanation: The array represents the integer 4321. Incrementing by one 
                 gives 4321 + 1 = 4322. Thus, the result should be [4,3,2,2].
    
    Example 3:
    Input: digits = [9]
    Output: [1,0]
    Explanation: The array represents the integer 9. Incrementing by one gives 
                 9 + 1 = 10. Thus, the result should be [1,0].

    Constraints:
    * 1 <= digits.length <= 100
    * 0 <= digits[i] <= 9
    * digits does not contain any leading 0's.*/

    public int[] plusOne(int[] digits) {
        int carry = 1; 
        for (int i = digits.length-1; i >= 0; --i, carry /= 10) {
            carry += digits[i]; 
            digits[i] = carry % 10; 
        }
        if (carry == 0) return digits; 
        int[] ans = new int[digits.length+1]; 
        ans[0] = 1; 
        return ans; 
    }


    /*67. Add Binary (Easy)
    Given two binary strings a and b, return their sum as a binary string.

    Example 1:
    Input: a = "11", b = "1"
    Output: "100"

    Example 2:
    Input: a = "1010", b = "1011"
    Output: "10101"

    Constraints:
    * 1 <= a.length, b.length <= 10^4
    * a and b consist only of '0' or '1' characters.
    * Each string does not contain leading zeros except for the zero itself.*/

    public String addBinary(String a, String b) {
        StringBuilder ans = new StringBuilder(); 
        for (int i = a.length()-1, j = b.length()-1, carry = 0; 0 <= i || 0 <= j || carry > 0; carry /= 2) {
            if (0 <= i) carry += a.charAt(i--) - '0'; 
            if (0 <= j) carry += b.charAt(j--) - '0'; 
            ans.append(carry % 2);
        }
        return ans.reverse().toString(); 
    }


    /*149. Max Points on a Line (Hard)
    Given an array of points where points[i] = [xi, yi] represents a point on 
    the X-Y plane, return the maximum number of points that lie on the same 
    straight line.

    Example 1:
    Input: points = [[1,1],[2,2],[3,3]]
    Output: 3

    Example 2:
    Input: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
    Output: 4

    Constraints:
    * 1 <= points.length <= 300
    * points[i].length == 2
    * -10^4 <= xi, yi <= 10^4
    * All the points are unique.*/

    public int maxPoints(int[][] points) {
        int ans = 1; 
        for (int i = 0, n = points.length; i < n; ++i) {
            int x = points[i][0], y = points[i][1]; 
            Map<Pair<Integer, Integer>, Integer> freq = new HashMap(); 
            for (int ii = i+1; ii < n; ++ii) {
                int dx = points[i][0] - points[ii][0], dy = points[i][1] - points[ii][1], g = dx; 
                for(int gg = dy; gg != 0; ) {
                    int tmp = g; g = gg; gg = tmp % gg; 
                }
                dx /= g; 
                dy /= g; 
                if (dx == 0) dy = Math.abs(dy); 
                var p = new Pair(dx, dy); 
                freq.merge(p, 1, Integer::sum); 
                ans = Math.max(ans, freq.get(p) + 1); 
            }
        }
        return ans; 
    }


    /*452. Minimum Number of Arrows to Burst Balloons (Medium)
    There are some spherical balloons taped onto a flat wall that represents 
    the XY-plane. The balloons are represented as a 2D integer array points 
    where points[i] = [xstart, xend] denotes a balloon whose horizontal 
    diameter stretches between xstart and xend. You do not know the exact 
    y-coordinates of the balloons. Arrows can be shot up directly vertically 
    (in the positive y-direction) from different points along the x-axis. A 
    balloon with xstart and xend is burst by an arrow shot at x if 
    xstart <= x <= xend. There is no limit to the number of arrows that can be 
    shot. A shot arrow keeps traveling up infinitely, bursting any balloons in 
    its path. Given the array points, return the minimum number of arrows that 
    must be shot to burst all balloons.

    Example 1:
    Input: points = [[10,16],[2,8],[1,6],[7,12]]
    Output: 2
    Explanation: The balloons can be burst by 2 arrows:
                 - Shoot an arrow at x = 6, bursting the balloons [2,8] and 
                   [1,6].
                 - Shoot an arrow at x = 11, bursting the balloons [10,16] and 
                   [7,12].
    
    Example 2:
    Input: points = [[1,2],[3,4],[5,6],[7,8]]
    Output: 4
    Explanation: One arrow needs to be shot for each balloon for a total of 4 
                 arrows.
    
    Example 3:
    Input: points = [[1,2],[2,3],[3,4],[4,5]]
    Output: 2
    Explanation: The balloons can be burst by 2 arrows:
                 - Shoot an arrow at x = 2, bursting the balloons [1,2] and 
                   [2,3].
                 - Shoot an arrow at x = 4, bursting the balloons [3,4] and 
                   [4,5].

    Constraints:
    * 1 <= points.length <= 10^5
    * points[i].length == 2
    * -231 <= xstart < xend <= 2^31 - 1*/

    public int findMinArrowShots(int[][] points) {
        int ans = 0; 
        long prev = Long.MIN_VALUE; 
        Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1])); 
        for (var p : points) 
            if (prev < p[0]) {
                ++ans; 
                prev = p[1]; 
            }
        return ans; 
    }


    /*616. Add Bold Tag in String (Medium)
    You are given a string s and an array of strings words. You should add a 
    closed pair of bold tag <b> and </b> to wrap the substrings in s that exist 
    in words.
    * If two such substrings overlap, you should wrap them together with only 
      one pair of closed bold-tag.
    * If two substrings wrapped by bold tags are consecutive, you should 
      combine them.
    Return s after adding the bold tags.

    Example 1:
    Input: s = "abcxyz123", words = ["abc","123"]
    Output: "<b>abc</b>xyz<b>123</b>"
    Explanation: The two strings of words are substrings of s as following: 
                 "abcxyz123". We add <b> before each substring and </b> after 
                 each substring.
    
    Example 2:
    Input: s = "aaabbb", words = ["aa","b"]
    Output: "<b>aaabbb</b>"
    Explanation: "aa" appears as a substring two times: "aaabbb" and "aaabbb".
                 "b" appears as a substring three times: "aaabbb", "aaabbb", 
                 and "aaabbb". We add <b> before each substring and </b> after 
                 each substring: "<b>a<b>a</b>a</b><b>b</b><b>b</b><b>b</b>".
                 Since the first two <b>'s overlap, we merge them: 
                 "<b>aaa</b><b>b</b><b>b</b><b>b</b>". Since now the four <b>'s 
                 are consecuutive, we merge them: "<b>aaabbb</b>".

    Constraints:
    * 1 <= s.length <= 1000
    * 0 <= words.length <= 100
    * 1 <= words[i].length <= 1000
    * s and words[i] consist of English letters and digits.
    * All the values of words are unique.

    Note: This question is the same as 758: 
          https://leetcode.com/problems/bold-words-in-string/*/

    public String addBoldTag(String s, String[] words) {
        int[] line = new int[s.length()+1]; 
        for (String word : words) {
            for (int k = -1; true; ) {
                k = s.indexOf(word, ++k); 
                if (k == -1) break; 
                ++line[k]; 
                --line[k+word.length()]; 
            }
        }
        StringBuilder ans = new StringBuilder(); 
        for (int i = 0, prefix = 0; i < s.length(); ++i) {
            if (prefix == 0 && prefix+line[i] > 0) ans.append("<b>"); 
            ans.append(s.charAt(i)); 
            prefix += line[i]; 
            if (prefix > 0 && prefix+line[i+1] == 0) ans.append("</b>"); 
        }
        return ans.toString(); 
    }


    /*758. Bold Words in String (Medium)
    Given an array of keywords words and a string s, make all appearances of 
    all keywords words[i] in s bold. Any letters between <b> and </b> tags 
    become bold. Return s after adding the bold tags. The returned string 
    should use the least number of tags possible, and the tags should form a 
    valid combination.

    Example 1:
    Input: words = ["ab","bc"], s = "aabcd"
    Output: "a<b>abc</b>d"
    Explanation: Note that returning "a<b>a<b>b</b>c</b>d" would use more tags, 
                 so it is incorrect.
    
    Example 2:
    Input: words = ["ab","cb"], s = "aabcd"
    Output: "a<b>ab</b>cd"

    Constraints:
    * 1 <= s.length <= 500
    * 0 <= words.length <= 50
    * 1 <= words[i].length <= 10
    * s and words[i] consist of lowercase English letters.

    Note: This question is the same as 616: 
          https://leetcode.com/problems/add-bold-tag-in-string/*/

    public String boldWords(String[] words, String s) {
        int[] line = new int[s.length()+1]; 
        for (String word : words) {
            for (int k = -1; true; ) {
                k = s.indexOf(word, ++k); 
                if (k == -1) break; 
                ++line[k]; 
                --line[k+word.length()]; 
            }
        }
        StringBuilder ans = new StringBuilder(); 
        for (int i = 0, prefix = 0; i < s.length(); ++i) {
            if (prefix == 0 && prefix+line[i] > 0) ans.append("<b>"); 
            ans.append(s.charAt(i)); 
            prefix += line[i]; 
            if (prefix > 0 && prefix+line[i+1] == 0) ans.append("</b>"); 
        }
        return ans.toString(); 
    }


    /*759. Employee Free Time (Hard)
    We are given a list schedule of employees, which represents the working 
    time for each employee. Each employee has a list of non-overlapping 
    Intervals, and these intervals are in sorted order. Return the list of 
    finite intervals representing common, positive-length free time for all 
    employees, also in sorted order. (Even though we are representing Intervals 
    in the form [x, y], the objects inside are Intervals, not lists or arrays. 
    For example, schedule[0][0].start = 1, schedule[0][0].end = 2, and 
    schedule[0][0][0] is not defined).  Also, we wouldn't include intervals 
    like [5, 5] in our answer, as they have zero length.

    Example 1:
    Input: schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
    Output: [[3,4]]
    Explanation: There are a total of three employees, and all common free time 
                 intervals would be [-inf, 1], [3, 4], [10, inf]. We discard 
                 any intervals that contain inf as they aren't finite.
    
    Example 2:
    Input: schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]
    Output: [[5,6],[7,9]]

    Constraints:
    * 1 <= schedule.length , schedule[i].length <= 50
    * 0 <= schedule[i].start < schedule[i].end <= 10^8*/

    public List<Interval> employeeFreeTime(List<List<Interval>> schedule) {
        List<int[]> line = new ArrayList(); 
        for (var elem : schedule) 
            for (var x : elem) {
                line.add(new int[] {x.start, 1}); 
                line.add(new int[] {x.end, -1}); 
            }
        Collections.sort(line, (a, b) -> (a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]))); 
        List<Interval> ans = new ArrayList(); 
        int prev = Integer.MIN_VALUE, prefix = 0; 
        for (int i = 0; i < line.size(); ) {
            int k = line.get(i)[0]; 
            if (prefix == 0 && prev > Integer.MIN_VALUE) ans.add(new Interval(prev, k)); 
            for (int ii = i; i < line.size() && line.get(ii)[0] == line.get(i)[0]; ++i) 
                prefix += line.get(i)[1]; 
            if (prefix == 0) prev = k; 
        }
        return ans; 
    }


    /*1063. Number of Valid Subarrays (Hard)
    Given an integer array nums, return the number of non-empty subarrays with 
    the leftmost element of the subarray not larger than other elements in the 
    subarray. A subarray is a contiguous part of an array.

    Example 1:
    Input: nums = [1,4,2,5,3]
    Output: 11
    Explanation: There are 11 valid subarrays: [1],[4],[2],[5],[3],[1,4],[2,5],
                 [1,4,2],[2,5,3],[1,4,2,5],[1,4,2,5,3].
    
    Example 2:
    Input: nums = [3,2,1]
    Output: 3
    Explanation: The 3 valid subarrays are: [3],[2],[1].

    Example 3:
    Input: nums = [2,2,2]
    Output: 6
    Explanation: There are 6 valid subarrays: [2],[2],[2],[2,2],[2,2],[2,2,2].

    Constraints:
    * 1 <= nums.length <= 5 * 10^4
    * 0 <= nums[i] <= 10^5*/

    public int validSubarrays(int[] nums) {
        int ans = 0; 
        Stack<Integer> stk = new Stack(); 
        for (var x : nums) {
            while (!stk.isEmpty() && stk.peek() > x) stk.pop(); 
            stk.push(x); 
            ans += stk.size(); 
        }
        return ans; 
    }


    /*1962. Remove Stones to Minimize the Total (Medium)
    You are given a 0-indexed integer array piles, where piles[i] represents 
    the number of stones in the ith pile, and an integer k. You should apply 
    the following operation exactly k times:
    * Choose any piles[i] and remove floor(piles[i] / 2) stones from it.
    Notice that you can apply the operation on the same pile more than once.
    Return the minimum possible total number of stones remaining after applying 
    the k operations. floor(x) is the greatest integer that is smaller than or 
    equal to x (i.e., rounds x down).

    Example 1:
    Input: piles = [5,4,9], k = 2
    Output: 12
    Explanation: Steps of a possible scenario are:
                 - Apply the operation on pile 2. The resulting piles are 
                   [5,4,5].
                 - Apply the operation on pile 0. The resulting piles are 
                   [3,4,5].
                 The total number of stones in [3,4,5] is 12.
    
    Example 2:
    Input: piles = [4,3,6,7], k = 3
    Output: 12
    Explanation: Steps of a possible scenario are:
                 - Apply the operation on pile 2. The resulting piles are 
                   [4,3,3,7].
                 - Apply the operation on pile 3. The resulting piles are 
                   [4,3,3,4].
                 - Apply the operation on pile 0. The resulting piles are 
                   [2,3,3,4].
                 The total number of stones in [2,3,3,4] is 12.

    Constraints:
    * 1 <= piles.length <= 10^5
    * 1 <= piles[i] <= 10^4
    * 1 <= k <= 10^5*/

    public int minStoneSum(int[] piles, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue(Collections.reverseOrder()); 
        for (var x : piles) pq.add(x); 
        while (k-- > 0) {
            var x = pq.poll(); 
            x -= x/2; 
            pq.add(x); 
        }
        int ans = 0; 
        while (!pq.isEmpty()) ans += pq.poll(); 
        return ans; 
    }


    /*2046. Sort Linked List Already Sorted Using Absolute Values (Medium)
    Given the head of a singly linked list that is sorted in non-decreasing 
    order using the absolute values of its nodes, return the list sorted in 
    non-decreasing order using the actual values of its nodes.

    Example 1:
    Input: head = [0,2,-5,5,10,-10]
    Output: [-10,-5,0,2,5,10]
    Explanation: The list sorted in non-descending order using the absolute 
                 values of the nodes is [0,2,-5,5,10,-10]. The list sorted in 
                 non-descending order using the actual values is 
                 [-10,-5,0,2,5,10].
    
    Example 2:
    Input: head = [0,1,2]
    Output: [0,1,2]
    Explanation: The linked list is already sorted in non-decreasing order.
    
    Example 3:
    Input: head = [1]
    Output: [1]
    Explanation: The linked list is already sorted in non-decreasing order.

    Constraints:
    * The number of nodes in the list is the range [1, 10^5].
    * -5000 <= Node.val <= 5000
    * head is sorted in non-decreasing order using the absolute value of its 
      nodes.

    Follow up: Can you think of a solution with O(n) time complexity?*/

    public ListNode sortLinkedList(ListNode head) {
        ListNode prev = head, node = head.next; 
        while (node != null) 
            if (node.val < 0) {
                prev.next = node.next; 
                node.next = head; 
                head = node; 
                node = prev.next; 
            } else {
                prev = node; 
                node = node.next; 
            }
        return head; 
    }


    /*2052. Minimum Cost to Separate Sentence Into Rows (Medium)
    You are given a string sentence containing words separated by spaces, and 
    an integer k. Your task is to separate sentence into rows where the number 
    of characters in each row is at most k. You may assume that sentence does 
    not begin or end with a space, and the words in sentence are separated by a 
    single space. You can split sentence into rows by inserting line breaks 
    between words in sentence. A word cannot be split between two rows. Each 
    word must be used exactly once, and the word order cannot be rearranged. 
    Adjacent words in a row should be separated by a single space, and rows 
    should not begin or end with spaces. The cost of a row with length n is 
    (k - n)2, and the total cost is the sum of the costs for all rows except 
    the last one.
    * For example if sentence = "i love leetcode" and k = 12:
      + Separating sentence into "i", "love", and "leetcode" has a cost of 
        (12 - 1)2 + (12 - 4)2 = 185.
      + Separating sentence into "i love", and "leetcode" has a cost of 
        (12 - 6)2 = 36.
      + Separating sentence into "i", and "love leetcode" is not possible 
        because the length of "love leetcode" is greater than k.
    Return the minimum possible total cost of separating sentence into rows.

    Example 1:
    Input: sentence = "i love leetcode", k = 12
    Output: 36
    Explanation: Separating sentence into "i", "love", and "leetcode" has a 
                 cost of (12 - 1)^2 + (12 - 4)^2 = 185. Separating sentence 
                 into "i love", and "leetcode" has a cost of (12 - 6)^2 = 36. 
                 Separating sentence into "i", "love leetcode" is not possible 
                 because "love leetcode" has length 13. 36 is the minimum 
                 possible total cost so return it.
    
    Example 2:
    Input: sentence = "apples and bananas taste great", k = 7
    Output: 21
    Explanation: Separating sentence into "apples", "and", "bananas", "taste", 
                 and "great" has a cost of 
                 (7 - 6)^2 + (7 - 3)^2 + (7 - 7)^2 + (7 - 5)^2 = 21. 21 is the 
                 minimum possible total cost so return it.
    
    Example 3:
    Input: sentence = "a", k = 5
    Output: 0
    Explanation: The cost of the last row is not included in the total cost, 
                 and since there is only one row, return 0.

    Constraints:
    * 1 <= sentence.length <= 5000
    * 1 <= k <= 5000
    * The length of each word in sentence is at most k.
    * sentence consists of only lowercase English letters and spaces.
    * sentence does not begin or end with a space.
    * Words in sentence are separated by a single space.*/

    public int minimumCost(String sentence, int k) {
        if (sentence.length() <= k) return 0; 
        String[] words = sentence.split(" ");
        int n = words.length; 
        int[] dp = new int[n]; 
        Arrays.fill(dp, Integer.MAX_VALUE); 
        dp[n-1] = 0; 
        for (int i = n-2; i >= 0; --i) {
            int prefix = -1; 
            for (int j = i; j < n; ++j) {
                prefix += 1 + words[j].length(); 
                if (prefix <= k) dp[i] = j == n-1 ? 0 : Math.min(dp[i], (prefix-k)*(prefix-k) + dp[j+1]); 
                else break; 
            }
        }
        return dp[0]; 
    }


    /*2061. Number of Spaces Cleaning Robot Cleaned (Medium)
    A room is represented by a 0-indexed 2D binary matrix room where a 0 
    represents an empty space and a 1 represents a space with an object. The 
    top left corner of the room will be empty in all test cases. A cleaning 
    robot starts at the top left corner of the room and is facing right. The 
    robot will continue heading straight until it reaches the edge of the room 
    or it hits an object, after which it will turn 90 degrees clockwise and 
    repeat this process. The starting space and all spaces that the robot 
    visits are cleaned by it. Return the number of clean spaces in the room if 
    the robot runs indefinetely.

    Example 1:
    Input: room = [[0,0,0],[1,1,0],[0,0,0]]
    Output: 7
    Explanation: The robot cleans the spaces at (0, 0), (0, 1), and (0, 2). The 
                 robot is at the edge of the room, so it turns 90 degrees 
                 clockwise and now faces down. The robot cleans the spaces at 
                 (1, 2), and (2, 2). The robot is at the edge of the room, so 
                 it turns 90 degrees clockwise and now faces left. The robot 
                 cleans the spaces at (2, 1), and (2, 0). The robot has cleaned 
                 all 7 empty spaces, so return 7.
    
    Example 2:
    Input: room = [[0,1,0],[1,0,0],[0,0,0]]
    Output: 1
    Explanation: The robot cleans the space at (0, 0). The robot hits an object, 
                 so it turns 90 degrees clockwise and now faces down. The robot 
                 hits an object, so it turns 90 degrees clockwise and now faces 
                 left. The robot is at the edge of the room, so it turns 90 
                 degrees clockwise and now faces up. The robot is at the edge 
                 of the room, so it turns 90 degrees clockwise and now faces 
                 right. The robot is back at its starting position. The robot 
                 has cleaned 1 space, so return 1.

    Constraints:
    * m == room.length
    * n == room[r].length
    * 1 <= m, n <= 300
    * room[r][c] is either 0 or 1.
    * room[0][0] == 0*/

    public int numberOfCleanRooms(int[][] room) {
        int m = room.length, n = room[0].length, ans = 0; 
        int[] dir = new int[]{0, 1, 0, -1, 0}; 
        int[][] seen = new int[m][n]; 
        for (int i = 0, j = 0, k = 0; (seen[i][j] & 1<<k) == 0; ) {
            if (room[i][j] == 0) {
                ++ans; 
                room[i][j] = -1; 
            }
            seen[i][j] |= 1<<k; 
            int ii = i + dir[k], jj = j + dir[k+1]; 
            if (0 <= ii && ii < m && 0 <= jj && jj < n && room[ii][jj] != 1) { i = ii; j = jj; }
            else k = (k+1) % 4; 
        }
        return ans; 
    }


    /*2067. Number of Equal Count Substrings (Medium)
    You are given a 0-indexed string s consisting of only lowercase English 
    letters, and an integer count. A substring of s is said to be an equal 
    count substring if, for each unique letter in the substring, it appears 
    exactly count times in the substring. Return the number of equal count 
    substrings in s. A substring is a contiguous non-empty sequence of 
    characters within a string.

    Example 1:
    Input: s = "aaabcbbcc", count = 3
    Output: 3
    Explanation: The substring that starts at index 0 and ends at index 2 is 
                 "aaa". The letter 'a' in the substring ap`pears exactly 3 
                 times. The substring that starts at index 3 and ends at index 
                 8 is "bcbbcc". The letters 'b' and 'c' in the substring appear 
                 exactly 3 times. The substring that starts at index 0 and ends 
                 at index 8 is "aaabcbbcc". The letters 'a', 'b', and 'c' in 
                 the substring appear exactly 3 times.
    
    Example 2:
    Input: s = "abcd", count = 2
    Output: 0
    Explanation: The number of times each letter appears in s is less than 
                 count. Therefore, no substrings in s are equal count 
                 substrings, so return 0.
    
    Example 3:
    Input: s = "a", count = 5
    Output: 0
    Explanation: The number of times each letter appears in s is less than 
                 count. Therefore, no substrings in s are equal count 
                 substrings, so return 0

    Constraints:
    * 1 <= s.length <= 3 * 10^4
    * 1 <= count <= 3 * 10^4
    * s consists only of lowercase English letters.*/

    public int equalCountSubstrings(String s, int count) {
        int ans = 0; 
        for (int k = 1; k <= 26; ++k) {
            int[] freq = new int[26]; 
            int uniq = 0; 
            for (int i = 0; i < s.length(); ++i) {
                if(++freq[s.charAt(i)-'a'] == count) ++uniq; 
                if (i >= k*count && freq[s.charAt(i-k*count)-'a']-- == count) --uniq; 
                if (uniq == k) ++ans; 
            }
        }
        return ans; 
    }


    /*2077. Paths in Maze That Lead to Same Room (Medium)
    A maze consists of n rooms numbered from 1 to n, and some rooms are 
    connected by corridors. You are given a 2D integer array corridors where 
    corridors[i] = [room1i, room2i] indicates that there is a corridor 
    connecting room1i and room2i, allowing a person in the maze to go from 
    room1i to room2i and vice versa. The designer of the maze wants to know 
    how confusing the maze is. The confusion score of the maze is the number 
    of different cycles of length 3.
    * For example, 1 → 2 → 3 → 1 is a cycle of length 3, but 1 → 2 → 3 → 4 and 
      1 → 2 → 3 → 2 → 1 are not.
    Two cycles are considered to be different if one or more of the rooms 
    visited in the first cycle is not in the second cycle. Return the confusion 
    score of the maze.

    Example 1:
    Input: n = 5, corridors = [[1,2],[5,2],[4,1],[2,4],[3,1],[3,4]]
    Output: 2
    Explanation: One cycle of length 3 is 4 → 1 → 3 → 4, denoted in red. Note 
                 that this is the same cycle as 3 → 4 → 1 → 3 or 1 → 3 → 4 → 1 
                 because the rooms are the same. Another cycle of length 3 is 
                 1 → 2 → 4 → 1, denoted in blue. Thus, there are two different 
                 cycles of length 3.
    
    Example 2:
    Input: n = 4, corridors = [[1,2],[3,4]]
    Output: 0
    Explanation: There are no cycles of length 3.

    Constraints:
    * 2 <= n <= 1000
    * 1 <= corridors.length <= 5 * 10^4
    * corridors[i].length == 2
    * 1 <= room1i, room2i <= n
    * room1i != room2i
    * There are no duplicate corridors.*/

    public int numberOfPaths(int n, int[][] corridors) {
        HashSet<Integer>[] graph = new HashSet[n]; 
        for (int i = 0; i < n; ++i) graph[i] = new HashSet(); 
        for (int[] c : corridors) {
            graph[c[0]-1].add(c[1]-1); 
            graph[c[1]-1].add(c[0]-1); 
        }
        int ans = 0; 
        for (int[] c : corridors) 
            for (int u : graph[c[0]-1]) 
                if (graph[c[1]-1].contains(u)) ++ans; 
        return ans/3; 
    }


    /*2083. Substrings That Begin and End With the Same Letter (Medium)
    You are given a 0-indexed string s consisting of only lowercase English 
    letters. Return the number of substrings in s that begin and end with the 
    same character. A substring is a contiguous non-empty sequence of 
    characters within a string.

    Example 1:
    Input: s = "abcba"
    Output: 7
    Explanation: The substrings of length 1 that start and end with the same 
                 letter are: "a", "b", "c", "b", and "a". The substring of 
                 length 3 that starts and ends with the same letter is: "bcb".
                 The substring of length 5 that starts and ends with the same 
                 letter is: "abcba".
    
    Example 2:
    Input: s = "abacad"
    Output: 9
    Explanation: The substrings of length 1 that start and end with the same 
                 letter are: "a", "b", "a", "c", "a", and "d". The substrings 
                 of length 3 that start and end with the same letter are: "aba" 
                 and "aca". The substring of length 5 that starts and ends with 
                 the same letter is: "abaca".
    
    Example 3:
    Input: s = "a"
    Output: 1
    Explanation: The substring of length 1 that starts and ends with the same 
                 letter is: "a".

    Constraints:
    * 1 <= s.length <= 10^5
    * s consists only of lowercase English letters.*/

    public long numberOfSubstrings(String s) {
        long ans = 0; 
        int[] freq = new int[26]; 
        for (char ch : s.toCharArray()) 
            ans += ++freq[ch - 'a']; 
        return ans; 
    }


    /*2098. Subsequence of Size K With the Largest Even Sum (Medium)
    You are given an integer array nums and an integer k. Find the largest even 
    sum of any subsequence of nums that has a length of k. Return this sum, or 
    -1 if such a sum does not exist. A subsequence is an array that can be 
    derived from another array by deleting some or no elements without changing 
    the order of the remaining elements.

    Example 1:
    Input: nums = [4,1,5,3,1], k = 3
    Output: 12
    Explanation: The subsequence with the largest possible even sum is [4,5,3]. 
                 It has a sum of 4 + 5 + 3 = 12.
    
    Example 2:
    Input: nums = [4,6,2], k = 3
    Output: 12
    Explanation: The subsequence with the largest possible even sum is [4,6,2]. 
                 It has a sum of 4 + 6 + 2 = 12.
    
    Example 3:
    Input: nums = [1,3,5], k = 1
    Output: -1
    Explanation: No subsequence of nums with length 1 has an even sum.

    Constraints:
    * 1 <= nums.length <= 10^5
    * 0 <= nums[i] <= 10^5
    * 1 <= k <= nums.length*/

    public long largestEvenSum(int[] nums, int k) {
        long ans = -1, prefix = 0; 
        int[] least = new int[]{Integer.MAX_VALUE, Integer.MAX_VALUE}; 
        Arrays.sort(nums); 
        for (int i = 0, n = nums.length; i < n/2; ++i) { 
            nums[i] ^= nums[n-1-i]; 
            nums[n-1-i] ^= nums[i]; 
            nums[i] ^= nums[n-1-i]; 
        }
        for (int i = 0; i < nums.length; ++i) 
            if (i < k) {
                prefix += nums[i]; 
                least[nums[i]&1] = Math.min(least[nums[i]&1], nums[i]); 
                if (i == k-1 && (prefix&1) == 0) return prefix; 
            } else ans = Math.max(ans, prefix - least[1-(nums[i]&1)] + nums[i]); 
        return ans; 
    }


    /*2107. Number of Unique Flavors After Sharing K Candies (Medium)
    You are given a 0-indexed integer array candies, where candies[i] 
    represents the flavor of the ith candy. Your mom wants you to share these 
    candies with your little sister by giving her k consecutive candies, but 
    you want to keep as many flavors of candies as possible. Return the maximum 
    number of unique flavors of candy you can keep after sharing with your 
    sister.

    Example 1:
    Input: candies = [1,2,2,3,4,3], k = 3
    Output: 3
    Explanation: Give the candies in the range [1, 3] (inclusive) with flavors 
                 [2,2,3]. You can eat candies with flavors [1,4,3]. There are 3 
                 unique flavors, so return 3.
    
    Example 2:
    Input: candies = [2,2,2,2,3,3], k = 2
    Output: 2
    Explanation: Give the candies in the range [3, 4] (inclusive) with flavors 
                 [2,3]. You can eat candies with flavors [2,2,2,3]. There are 2 
                 unique flavors, so return 2. Note that you can also share the 
                 candies with flavors [2,2] and eat the candies with flavors 
                 [2,2,3,3].
    
    Example 3:
    Input: candies = [2,4,5], k = 0
    Output: 3
    Explanation: You do not have to give any candies. You can eat the candies 
                 with flavors [2,4,5]. There are 3 unique flavors, so return 3.

    Constraints:
    * 1 <= candies.length <= 10^5
    * 1 <= candies[i] <= 10^5
    * 0 <= k <= candies.length*/

    public int shareCandies(int[] candies, int k) {
        int ans = 0; 
        HashMap<Integer, Integer> freq = new HashMap(); 
        for (int x : candies) freq.merge(x, 1, Integer::sum); 
        for (int i = 0; i < candies.length; ++i) {
            freq.merge(candies[i], -1, Integer::sum); 
            if (freq.get(candies[i]) == 0) freq.remove(candies[i]); 
            if (i >= k) freq.merge(candies[i-k], 1, Integer::sum); 
            if (i >= k-1) ans = Math.max(ans, freq.size()); 
        }
        return ans; 
    }


    /*2113. Elements in Array After Removing and Replacing Elements (Medium)
    You are given a 0-indexed integer array nums. Initially on minute 0, the 
    array is unchanged. Every minute, the leftmost element in nums is removed 
    until no elements remain. Then, every minute, one element is appended to 
    the end of nums, in the order they were removed in, until the original 
    array is restored. This process repeats indefinitely.
    * For example, the array [0,1,2] would change as follows: [0,1,2] → [1,2] 
      → [2] → [] → [0] → [0,1] → [0,1,2] → [1,2] → [2] → [] → [0] → [0,1] 
      → [0,1,2] → ...
    You are also given a 2D integer array queries of size n where 
    queries[j] = [timej, indexj]. The answer to the jth query is:
    * nums[indexj] if indexj < nums.length at minute timej
    * -1 if indexj >= nums.length at minute timej
    Return an integer array ans of size n where ans[j] is the answer to the jth 
    query.

    Example 1:
    Input: nums = [0,1,2], queries = [[0,2],[2,0],[3,2],[5,0]]
    Output: [2,2,-1,0]
    Explanation: Minute 0: [0,1,2] - All elements are in the nums.
                 Minute 1: [1,2]   - The leftmost element, 0, is removed.
                 Minute 2: [2]     - The leftmost element, 1, is removed.
                 Minute 3: []      - The leftmost element, 2, is removed.
                 Minute 4: [0]     - 0 is added to the end of nums.
                 Minute 5: [0,1]   - 1 is added to the end of nums.
                 At minute 0, nums[2] is 2.
                 At minute 2, nums[0] is 2.
                 At minute 3, nums[2] does not exist.
                 At minute 5, nums[0] is 0.

    Example 2:
    Input: nums = [2], queries = [[0,0],[1,0],[2,0],[3,0]]
    Output: [2,-1,2,-1]
    Explanation: Minute 0: [2] - All elements are in the nums.
                 Minute 1: []  - The leftmost element, 2, is removed.
                 Minute 2: [2] - 2 is added to the end of nums.
                 Minute 3: []  - The leftmost element, 2, is removed.
                 At minute 0, nums[0] is 2.
                 At minute 1, nums[0] does not exist.
                 At minute 2, nums[0] is 2.
                 At minute 3, nums[0] does not exist.

    Constraints:
    * 1 <= nums.length <= 100
    * 0 <= nums[i] <= 100
    * n == queries.length
    * 1 <= n <= 10^5
    * queries[j].length == 2
    * 0 <= timej <= 10^5
    * 0 <= indexj < nums.length*/

    public int[] elementInNums(int[] nums, int[][] queries) {
        int[] ans = new int[queries.length]; 
        for (int i = 0; i < queries.length; ++i) {
            int t = queries[i][0], k = queries[i][1]; 
            t %= 2*nums.length; 
            if (t < nums.length-k) ans[i] = nums[k+t]; 
            else if (t <= nums.length+k) ans[i] = -1; 
            else ans[i] = nums[k]; 
        }
        return ans; 
    }


    /*2152. Minimum Number of Lines to Cover Points (Medium)
    You are given an array points where points[i] = [xi, yi] represents a point 
    on an X-Y plane. Straight lines are going to be added to the X-Y plane, 
    such that every point is covered by at least one line. Return the minimum 
    number of straight lines needed to cover all the points.

    Example 1:
    Input: points = [[0,1],[2,3],[4,5],[4,3]]
    Output: 2
    Explanation: The minimum number of straight lines needed is two. One 
                 possible solution is to add:
                 - One line connecting the point at (0, 1) to the point at 
                   (4, 5).
                 - Another line connecting the point at (2, 3) to the point at 
                   (4, 3).
    
    Example 2:
    Input: points = [[0,2],[-2,-2],[1,4]]
    Output: 1
    Explanation: The minimum number of straight lines needed is one. The only 
                 solution is to add:
                 - One line connecting the point at (-2, -2) to the point at 
                   (1, 4).

    Constraints:
    * 1 <= points.length <= 10
    * points[i].length == 2
    * -100 <= xi, yi <= 100
    * All the points are unique.*/

    public int minimumLines(int[][] points) {
        int n = points.length; 
        int[][] mask = new int[n][n]; 
        for (int i = 0; i < n; ++i) 
            for (int j = i+1; j < n; ++j) {
                mask[i][j] ^= (1<<i) ^ (1<<j); 
                for (int k = j+1; k < n; ++k) 
                    if ((points[i][0]-points[j][0])*(points[i][1]-points[k][1]) == (points[i][1]-points[j][1])*(points[i][0]-points[k][0])) mask[i][j] ^= 1<<k; 
            }
        int[] dp = new int[1<<n]; 
        Arrays.fill(dp, n/2+1); 
        dp[0] = 0; 
        for (int m = 1; m < (1<<n); ++m) {
            int bits = 0; 
            for (int mm = m; mm > 0; ++bits, mm &= mm-1); 
            if (bits <= 2) dp[m] = 1; 
            else {
                int i = 0; 
                for (; i < n; ++i) 
                    if ((m & (1<<i)) > 0) break; 
                for (int j = i+1; j < n; ++j) 
                    if ((m & (1<<j)) > 0) dp[m] = Math.min(dp[m], 1+dp[m^mask[i][j]]); 
            }
        }
        return dp[(1<<n)-1]; 
    }


    /*2189. Number of Ways to Build House of Cards (Medium)
    You are given an integer n representing the number of playing cards you 
    have. A house of cards meets the following conditions:
    * A house of cards consists of one or more rows of triangles and horizontal 
      cards.
    * Triangles are created by leaning two cards against each other.
    * One card must be placed horizontally between all adjacent triangles in a 
      row.
    * Any triangle on a row higher than the first must be placed on a 
      horizontal card from the previous row.
    * Each triangle is placed in the leftmost available spot in the row.
    Return the number of distinct house of cards you can build using all n 
    cards. Two houses of cards are considered distinct if there exists a row 
    where the two houses contain a different number of cards.

    Example 1:
    Input: n = 16
    Output: 2
    Explanation: The two valid houses of cards are shown. The third house of 
                 cards in the diagram is not valid because the rightmost 
                 triangle on the top row is not placed on top of a horizontal 
                 card.
    
    Example 2:
    Input: n = 2
    Output: 1
    Explanation: The one valid house of cards is shown.

    Example 3:
    Input: n = 4
    Output: 0
    Explanation: The three houses of cards in the diagram are not valid. The 
                 first house of cards needs a horizontal card placed between 
                 the two triangles. The second house of cards uses 5 cards. The 
                 third house of cards uses 2 cards.

    Constraints: 1 <= n <= 500*/

    public int houseOfCards(int n) {
        int[] dp = new int[n+1]; 
        dp[0] = 1; 
        for (int x = 2; x <= n; x += 3) 
            for (int i = n; i >= x; --i)
                dp[i] += dp[i-x]; 
        return dp[n]; 
    }


    /*2198. Number of Single Divisor Triplets (Medium)
    You are given a 0-indexed array of positive integers nums. A triplet of 
    three distinct indices (i, j, k) is called a single divisor triplet of nums 
    if nums[i] + nums[j] + nums[k] is divisible by exactly one of nums[i], 
    nums[j], or nums[k]. Return the number of single divisor triplets of nums.

    Example 1:
    Input: nums = [4,6,7,3,2]
    Output: 12
    Explanation: The triplets (0, 3, 4), (0, 4, 3), (3, 0, 4), (3, 4, 0), 
                 (4, 0, 3), and (4, 3, 0) have the values of [4, 3, 2] (or a 
                 permutation of [4, 3, 2]). 4 + 3 + 2 = 9 which is only 
                 divisible by 3, so all such triplets are single divisor 
                 triplets. The triplets (0, 2, 3), (0, 3, 2), (2, 0, 3), 
                 (2, 3, 0), (3, 0, 2), and (3, 2, 0) have the values of 
                 [4, 7, 3] (or a permutation of [4, 7, 3]). 4 + 7 + 3 = 14 
                 which is only divisible by 7, so all such triplets are single 
                 divisor triplets. There are 12 single divisor triplets in 
                 total.
    
    Example 2:
    Input: nums = [1,2,2]
    Output: 6
    Explanation: The triplets (0, 1, 2), (0, 2, 1), (1, 0, 2), (1, 2, 0), 
                 (2, 0, 1), and (2, 1, 0) have the values of [1, 2, 2] (or a 
                 permutation of [1, 2, 2]). 1 + 2 + 2 = 5 which is only 
                 divisible by 1, so all such triplets are single divisor 
                 triplets. There are 6 single divisor triplets in total.
    
    Example 3:
    Input: nums = [1,1,1]
    Output: 0
    Explanation: There are no single divisor triplets. Note that (0, 1, 2) is 
                 not a single divisor triplet because 
                 nums[0] + nums[1] + nums[2] = 3 and 3 is divisible by nums[0], 
                 nums[1], and nums[2].

    Constraints:
    * 3 <= nums.length <= 10^5
    * 1 <= nums[i] <= 100*/

    public long singleDivisorTriplet(int[] nums) {
        int[] freq = new int[101]; 
        for (int x : nums) ++freq[x]; 
        long ans = 0; 
        for (int i = 1; i <= 100; ++i) 
            for (int j = i; freq[i] > 0 && j <= 100; ++j) 
                for (int k = j; freq[j] > 0 && k <= 100; ++k) 
                    if (freq[k] > 0) {
                        int total = i + j + k; 
                        if ((total%i > 0 ? 1 : 0) + (total%j > 0 ? 1 : 0) + (total%k > 0 ? 1 : 0) == 2) 
                            if (i == j) ans += (long) freq[i]*(freq[j]-1)/2*freq[k]; 
                            else if (j == k) ans += (long) freq[i]*freq[j]*(freq[k]-1)/2; 
                            else ans += (long) freq[i]*freq[j]*freq[k]; 
                    }
        return ans*6; 
    }


    /*2204. Distance to a Cycle in Undirected Graph (Hard)
    You are given a positive integer n representing the number of nodes in a 
    connected undirected graph containing exactly one cycle. The nodes are 
    numbered from 0 to n - 1 (inclusive). You are also given a 2D integer array 
    edges, where edges[i] = [node1i, node2i] denotes that there is a 
    bidirectional edge connecting node1i and node2i in the graph. The distance 
    between two nodes a and b is defined to be the minimum number of edges that 
    are needed to go from a to b. Return an integer array answer of size n, 
    where answer[i] is the minimum distance between the ith node and any node 
    in the cycle.

    Example 1:
    Input: n = 7, edges = [[1,2],[2,4],[4,3],[3,1],[0,1],[5,2],[6,5]]
    Output: [1,0,0,0,0,1,2]
    Explanation: The nodes 1, 2, 3, and 4 form the cycle.
                 The distance from 0 to 1 is 1.
                 The distance from 1 to 1 is 0.
                 The distance from 2 to 2 is 0.
                 The distance from 3 to 3 is 0.
                 The distance from 4 to 4 is 0.
                 The distance from 5 to 2 is 1.
                 The distance from 6 to 2 is 2.
    
    Example 2:
    Input: n = 9, edges = [[0,1],[1,2],[0,2],[2,6],[6,7],[6,8],[0,3],[3,4],[3,5]]
    Output: [0,0,0,1,2,2,1,2,2]
    Explanation: The nodes 0, 1, and 2 form the cycle.
                 The distance from 0 to 0 is 0.
                 The distance from 1 to 1 is 0.
                 The distance from 2 to 2 is 0.
                 The distance from 3 to 1 is 1.
                 The distance from 4 to 1 is 2.
                 The distance from 5 to 1 is 2.
                 The distance from 6 to 2 is 1.
                 The distance from 7 to 2 is 2.
                 The distance from 8 to 2 is 2.

    Constraints:
    * 3 <= n <= 10^5
    * edges.length == n
    * edges[i].length == 2
    * 0 <= node1i, node2i <= n - 1
    * node1i != node2i
    * The graph is connected.
    * The graph has exactly one cycle.
    * There is at most one edge between any pair of vertices.*/

    public int[] distanceToCycle(int n, int[][] edges) {
        List<Integer>[] graph = new ArrayList[n]; 
        for (int u = 0; u < n; ++u) 
            graph[u] = new ArrayList(); 
        for (var e : edges) {
            graph[e[0]].add(e[1]); 
            graph[e[1]].add(e[0]); 
        }
        Stack<Integer> stk = new Stack(); 
        int[] degree = new int[n]; 
        for (int u = 0; u < n; ++u) {
            degree[u] = graph[u].size(); 
            if (degree[u] == 1) stk.push(u); 
        }
        while (!stk.isEmpty()) {
            var u = stk.pop(); 
            for (var v : graph[u]) 
                if (degree[v] > 1 && --degree[v] == 1) stk.push(v); 
        }
        int[] ans = new int[n]; 
        Arrays.fill(ans, -1); 
        Queue<Integer> q = new LinkedList(); 
        for (int u = 0; u < n; ++u) 
            if (degree[u] > 1) {
                q.add(u); 
                ans[u] = 0; 
            }
        for (int val = 1; !q.isEmpty(); ++val) 
            for (int sz = q.size(); sz > 0; --sz) {
                var u = q.poll(); 
                for (var v : graph[u]) 
                    if (ans[v] == -1) {
                        q.add(v); 
                        ans[v] = val; 
                    }
            }
        return ans; 
    }


    /*2279. Maximum Bags With Full Capacity of Rocks (Medium)
    You have n bags numbered from 0 to n - 1. You are given two 0-indexed 
    integer arrays capacity and rocks. The ith bag can hold a maximum of 
    capacity[i] rocks and currently contains rocks[i] rocks. You are also given 
    an integer additionalRocks, the number of additional rocks you can place in 
    any of the bags. Return the maximum number of bags that could have full 
    capacity after placing the additional rocks in some bags.

    Example 1:
    Input: capacity = [2,3,4,5], rocks = [1,2,4,4], additionalRocks = 2
    Output: 3
    Explanation: Place 1 rock in bag 0 and 1 rock in bag 1. The number of rocks 
                 in each bag are now [2,3,4,4]. Bags 0, 1, and 2 have full 
                 capacity. There are 3 bags at full capacity, so we return 3. 
                 It can be shown that it is not possible to have more than 3 
                 bags at full capacity. Note that there may be other ways of 
                 placing the rocks that result in an answer of 3.
    
    Example 2:
    Input: capacity = [10,2,2], rocks = [2,2,0], additionalRocks = 100
    Output: 3
    Explanation: Place 8 rocks in bag 0 and 2 rocks in bag 2. The number of 
                 rocks in each bag are now [10,2,2]. Bags 0, 1, and 2 have full 
                 capacity. There are 3 bags at full capacity, so we return 3. 
                 It can be shown that it is not possible to have more than 3 
                 bags at full capacity. Note that we did not use all of the 
                 additional rocks.

    Constraints:
    * n == capacity.length == rocks.length
    * 1 <= n <= 5 * 10^4
    * 1 <= capacity[i] <= 10^9
    * 0 <= rocks[i] <= capacity[i]
    * 1 <= additionalRocks <= 10^9*/

    public int maximumBags(int[] capacity, int[] rocks, int additionalRocks) {
        int[] diff = new int[capacity.length]; 
        for (int i = 0; i < capacity.length; ++i) diff[i] = capacity[i] - rocks[i]; 
        Arrays.sort(diff);
        int ans = 0; 
        for (var x : diff) 
            if (x <= additionalRocks) {
                ++ans; 
                additionalRocks -= x; 
            }
        return ans; 
    }


    /*2307. Check for Contradictions in Equations (Hard)
    You are given a 2D array of strings equations and an array of real numbers 
    values, where equations[i] = [Ai, Bi] and values[i] means that 
    Ai / Bi = values[i]. Determine if there exists a contradiction in the 
    equations. Return true if there is a contradiction, or false otherwise.

    Note:
    * When checking if two numbers are equal, check that their absolute 
      difference is less than 10-5.
    * The testcases are generated such that there are no cases targeting 
      precision, i.e. using double is enough to solve the problem.

    Example 1:
    Input: equations = [["a","b"],["b","c"],["a","c"]], values = [3,0.5,1.5]
    Output: false
    Explanation: The given equations are: a / b = 3, b / c = 0.5, a / c = 1.5 
                 There are no contradictions in the equations. One possible 
                 assignment to satisfy all equations is: a = 3, b = 1 and c = 2.
    
    Example 2:
    Input: equations = [["le","et"],["le","code"],["code","et"]], values = [2,5,0.5]
    Output: true
    Explanation: The given equations are: le / et = 2, le / code = 5, 
                 code / et = 0.5 Based on the first two equations, we get 
                 code / et = 0.4. Since the third equation is 
                 code / et = 0.5, we get a contradiction.

    Constraints:
    * 1 <= equations.length <= 100
    * equations[i].length == 2
    * 1 <= Ai.length, Bi.length <= 5
    * Ai, Bi consist of lowercase English letters.
    * equations.length == values.length
    * 0.0 < values[i] <= 10.0
    * values[i] has a maximum of 2 decimal places.*/

    public boolean checkContradictions(List<List<String>> equations, double[] values) {
        Set<String> node = new HashSet(); 
        Map<String, List<Pair<String, Double>>> graph = new HashMap(); 
        for (int i = 0; i < equations.size(); ++i) {
            String u = equations.get(i).get(0), v = equations.get(i).get(1); 
            node.add(u); 
            node.add(v); 
            if (!graph.containsKey(u)) graph.put(u, new ArrayList()); 
            if (!graph.containsKey(v)) graph.put(v, new ArrayList()); 
            graph.get(u).add(new Pair(v, values[i])); 
            graph.get(v).add(new Pair(u, 1/values[i])); 
        }
        Map<String, Double> vals = new HashMap(); 
        for (var u : node) 
            if (!vals.containsKey(u)) {
                Stack<String> stk = new Stack(); stk.push(u); 
                vals.put(u, 1.); 
                while (!stk.isEmpty()) {
                    var x = stk.pop(); 
                    for (var elem : graph.get(x)) {
                        String v = elem.getKey(); 
                        Double w = elem.getValue(); 
                        if (vals.containsKey(v)) {
                            if (Math.abs(vals.get(v) - vals.get(x)/w) > 1e-5*vals.get(v)) return true; 
                        } else {
                            stk.push(v); 
                            vals.put(v, vals.get(x)/w); 
                        }
                    }
                }
            }
        return false; 
    }


    /*2481. Minimum Cuts to Divide a Circle (Easy)
    A valid cut in a circle can be:
    * A cut that is represented by a straight line that touches two points on 
      the edge of the circle and passes through its center, or
    * A cut that is represented by a straight line that touches one point on 
      the edge of the circle and its center.
    Some valid and invalid cuts are shown in the figures below. Given the 
    integer n, return the minimum number of cuts needed to divide a circle into 
    n equal slices.

    Example 1:
    Input: n = 4
    Output: 2
    Explanation: The above figure shows how cutting the circle twice through 
                 the middle divides it into 4 equal slices.
    
    Example 2:
    Input: n = 3
    Output: 3
    Explanation: At least 3 cuts are needed to divide the circle into 3 equal 
                 slices. It can be shown that less than 3 cuts cannot result in 
                 3 slices of equal size and shape. Also note that the first cut 
                 will not divide the circle into distinct parts.

    Constraints: 1 <= n <= 100*/

    public int numberOfCuts(int n) {
        if (n == 1) return 0; 
        return n%2 == 1 ? n : n/2; 
    }


    /*2482. Difference Between Ones and Zeros in Row and Column (Medium)
    You are given a 0-indexed m x n binary matrix grid. A 0-indexed m x n 
    difference matrix diff is created with the following procedure:
    * Let the number of ones in the ith row be onesRowi.
    * Let the number of ones in the jth column be onesColj.
    * Let the number of zeros in the ith row be zerosRowi.
    * Let the number of zeros in the jth column be zerosColj.
    * diff[i][j] = onesRowi + onesColj - zerosRowi - zerosColj
    Return the difference matrix diff.

    Example 1:
    Input: grid = [[0,1,1],[1,0,1],[0,0,1]]
    Output: [[0,0,4],[0,0,4],[-2,-2,2]]
    Explanation: - diff[0][0] = onesRow0 + onesCol0 - zerosRow0 - zerosCol0 
                   = 2 + 1 - 1 - 2 = 0 
                 - diff[0][1] = onesRow0 + onesCol1 - zerosRow0 - zerosCol1
                   = 2 + 1 - 1 - 2 = 0 
                 - diff[0][2] = onesRow0 + onesCol2 - zerosRow0 - zerosCol2 
                   = 2 + 3 - 1 - 0 = 4 
                 - diff[1][0] = onesRow1 + onesCol0 - zerosRow1 - zerosCol0 
                   = 2 + 1 - 1 - 2 = 0 
                 - diff[1][1] = onesRow1 + onesCol1 - zerosRow1 - zerosCol1 
                   = 2 + 1 - 1 - 2 = 0 
                 - diff[1][2] = onesRow1 + onesCol2 - zerosRow1 - zerosCol2 
                   = 2 + 3 - 1 - 0 = 4 
                 - diff[2][0] = onesRow2 + onesCol0 - zerosRow2 - zerosCol0 
                   = 1 + 1 - 2 - 2 = -2
                 - diff[2][1] = onesRow2 + onesCol1 - zerosRow2 - zerosCol1 
                   = 1 + 1 - 2 - 2 = -2
                 - diff[2][2] = onesRow2 + onesCol2 - zerosRow2 - zerosCol2 
                   = 1 + 3 - 2 - 0 = 2
    
    Example 2:
    Input: grid = [[1,1,1],[1,1,1]]
    Output: [[5,5,5],[5,5,5]]
    Explanation: - diff[0][0] = onesRow0 + onesCol0 - zerosRow0 - zerosCol0 
                   = 3 + 2 - 0 - 0 = 5
                 - diff[0][1] = onesRow0 + onesCol1 - zerosRow0 - zerosCol1 
                   = 3 + 2 - 0 - 0 = 5
                 - diff[0][2] = onesRow0 + onesCol2 - zerosRow0 - zerosCol2 
                   = 3 + 2 - 0 - 0 = 5
                 - diff[1][0] = onesRow1 + onesCol0 - zerosRow1 - zerosCol0 
                   = 3 + 2 - 0 - 0 = 5
                 - diff[1][1] = onesRow1 + onesCol1 - zerosRow1 - zerosCol1 
                   = 3 + 2 - 0 - 0 = 5
                 - diff[1][2] = onesRow1 + onesCol2 - zerosRow1 - zerosCol2 
                   = 3 + 2 - 0 - 0 = 5

    Constraints:
    * m == grid.length
    * n == grid[i].length
    * 1 <= m, n <= 10^5
    * 1 <= m * n <= 10^5
    * grid[i][j] is either 0 or 1.*/

    public int[][] onesMinusZeros(int[][] grid) {
        int m = grid.length, n = grid[0].length; 
        int[] row = new int[m], col = new int[n]; 
        for (int i = 0; i < m; ++i) 
            for (int j = 0; j < n; ++j) {
                row[i] += grid[i][j]; 
                col[j] += grid[i][j]; 
            }
        int[][] ans = new int[m][n]; 
        for (int i = 0; i < m; ++i) 
            for (int j = 0; j < n; ++j) 
                ans[i][j] = 2*row[i] + 2*col[j] - m - n; 
        return ans; 
    }


    /*2483. Minimum Penalty for a Shop (Medium)
    You are given the customer visit log of a shop represented by a 0-indexed 
    string customers consisting only of characters 'N' and 'Y':
    * if the ith character is 'Y', it means that customers come at the ith hour
    * whereas 'N' indicates that no customers come at the ith hour.
    If the shop closes at the jth hour (0 <= j <= n), the penalty is calculated 
    as follows:
    * For every hour when the shop is open and no customers come, the penalty 
      increases by 1.
    * For every hour when the shop is closed and customers come, the penalty 
      increases by 1.
    Return the earliest hour at which the shop must be closed to incur a 
    minimum penalty. Note that if a shop closes at the jth hour, it means the 
    shop is closed at the hour j.

    Example 1:
    Input: customers = "YYNY"
    Output: 2
    Explanation: - Closing the shop at the 0th hour incurs in 1+1+0+1 = 3 
                   penalty.
                 - Closing the shop at the 1st hour incurs in 0+1+0+1 = 2 
                   penalty.
                 - Closing the shop at the 2nd hour incurs in 0+0+0+1 = 1 
                   penalty.
                 - Closing the shop at the 3rd hour incurs in 0+0+1+1 = 2 
                   penalty.
                 - Closing the shop at the 4th hour incurs in 0+0+1+0 = 1 
                   penalty.
                 Closing the shop at 2nd or 4th hour gives a minimum penalty. 
                 Since 2 is earlier, the optimal closing time is 2.
    
    Example 2:
    Input: customers = "NNNNN"
    Output: 0
    Explanation: It is best to close the shop at the 0th hour as no customers 
                 arrive.
    
    Example 3:
    Input: customers = "YYYY"
    Output: 4
    Explanation: It is best to close the shop at the 4th hour as customers 
                 arrive at each hour.

    Constraints:
    * 1 <= customers.length <= 10^5
    * customers consists only of characters 'Y' and 'N'.*/

    public int bestClosingTime(String customers) {
        int ans = 0, prefix = (int) customers.chars().filter(ch -> ch =='Y').count(), least = prefix; 
        for (int i = 0; i < customers.length(); ++i) {
            if (customers.charAt(i) == 'N') ++prefix; 
            else --prefix; 
            if (prefix < least) {
                ans = i+1; 
                least = prefix; 
            }
        }
        return ans; 
    }


    /*2484. Count Palindromic Subsequences (Hard)
    Given a string of digits s, return the number of palindromic subsequences 
    of s having length 5. Since the answer may be very large, return it modulo 
    10^9 + 7.

    Note:
    * A string is palindromic if it reads the same forward and backward.
    * A subsequence is a string that can be derived from another string by 
      deleting some or no characters without changing the order of the 
      remaining characters.

    Example 1:
    Input: s = "103301"
    Output: 2
    Explanation: There are 6 possible subsequences of length 5: "10330","10331",
                 "10301","10301","13301","03301". Two of them (both equal to 
                 "10301") are palindromic.
    
    Example 2:
    Input: s = "0000000"
    Output: 21
    Explanation: All 21 subsequences are "00000", which is palindromic.

    Example 3:
    Input: s = "9999900000"
    Output: 2
    Explanation: The only two palindromic subsequences are "99999" and "00000".

    Constraints:
    * 1 <= s.length <= 10^4
    * s consists of digits.*/

    public int countPalindromes(String s) {
        final int mod = 1_000_000_007; 
        long ans = 0; 
        for (int x = 0; x <= 9; ++x) 
            for (int y = 0; y <= 9; ++y) {
                int[] pattern = new int[] {x, y, 0, y, x};
                long[] dp = new long[6]; 
                dp[5] = 1; 
                for (int i = 0; i < s.length(); ++i) 
                    for (int j = 0; j < 5; ++j) 
                        if (s.charAt(i) == pattern[j] + '0' || j == 2) dp[j] = (dp[j] + dp[j+1]) % mod; 
                ans = (ans + dp[0]) % mod; 
            }
        return (int) ans; 
    }


    /*2485. Find the Pivot Integer (Easy)
    Given a positive integer n, find the pivot integer x such that:
    * The sum of all elements between 1 and x inclusively equals the sum of all 
      elements between x and n inclusively.
    Return the pivot integer x. If no such integer exists, return -1. It is 
    guaranteed that there will be at most one pivot index for the given input.

    Example 1:
    Input: n = 8
    Output: 6
    Explanation: 6 is the pivot integer since: 1 + 2 + 3 + 4 + 5 + 6 = 6 + 7 + 8 = 21.

    Example 2:
    Input: n = 1
    Output: 1
    Explanation: 1 is the pivot integer since: 1 = 1.

    Example 3:
    Input: n = 4
    Output: -1
    Explanation: It can be proved that no such integer exist.

    Constraints: 1 <= n <= 1000*/

    public int pivotInteger(int n) {
        int sm = n*(n+1)/2, val = (int) Math.sqrt(sm); 
        return val*val == sm ? val : -1; 
    }


    /*2486. Append Characters to String to Make Subsequence (Medium)
    You are given two strings s and t consisting of only lowercase English 
    letters. Return the minimum number of characters that need to be appended 
    to the end of s so that t becomes a subsequence of s. A subsequence is a 
    string that can be derived from another string by deleting some or no 
    characters without changing the order of the remaining characters.

    Example 1:
    Input: s = "coaching", t = "coding"
    Output: 4
    Explanation: Append the characters "ding" to the end of s so that 
                 s = "coachingding". Now, t is a subsequence of s 
                 ("coachingding"). It can be shown that appending any 3 
                 characters to the end of s will never make t a subsequence.
    
    Example 2:
    Input: s = "abcde", t = "a"
    Output: 0
    Explanation: t is already a subsequence of s ("abcde").

    Example 3:
    Input: s = "z", t = "abcde"
    Output: 5
    Explanation: Append the characters "abcde" to the end of s so that 
                 s = "zabcde". Now, t is a subsequence of s ("zabcde"). It can 
                 be shown that appending any 4 characters to the end of s will 
                 never make t a subsequence.

    Constraints:
    * 1 <= s.length, t.length <= 10^5
    * s and t consist only of lowercase English letters.*/

    public int appendCharacters(String s, String t) {
        int i = 0; 
        for (char ch : s.toCharArray()) 
            if (i < t.length() && ch == t.charAt(i)) ++i; 
        return t.length()-i; 
    }


    /*2487. Remove Nodes From Linked List (Medium)
    You are given the head of a linked list. Remove every node which has a node 
    with a strictly greater value anywhere to the right side of it. Return the 
    head of the modified linked list.

    Example 1:
    Input: head = [5,2,13,3,8]
    Output: [13,8]
    Explanation: The nodes that should be removed are 5, 2 and 3.
                 - Node 13 is to the right of node 5.
                 - Node 13 is to the right of node 2.
                 - Node 8 is to the right of node 3.
    
    Example 2:
    Input: head = [1,1,1,1]
    Output: [1,1,1,1]
    Explanation: Every node has value 1, so no nodes are removed.

    Constraints:
    * The number of the nodes in the given list is in the range [1, 10^5].
    * 1 <= Node.val <= 10^5*/

    public ListNode removeNodes(ListNode head) {
        ListNode dummy = new ListNode(Integer.MAX_VALUE); 
        Stack<ListNode> stk = new Stack<ListNode>(); stk.push(dummy); 
        for (ListNode node = head; node != null; node = node.next) {
            while (stk.peek().val < node.val) stk.pop(); 
            stk.peek().next = node; 
            stk.push(node); 
        }
        return dummy.next; 
    }


    /*2488. Count Subarrays With Median K (Hard)
    You are given an array nums of size n consisting of distinct integers from 
    1 to n and a positive integer k. Return the number of non-empty subarrays 
    in nums that have a median equal to k.

    Note:
    * The median of an array is the middle element after sorting the array in 
      ascending order. If the array is of even length, the median is the left 
      middle element.
      + For example, the median of [2,3,1,4] is 2, and the median of [8,4,3,5,1] 
        is 4.
    * A subarray is a contiguous part of an array.

    Example 1:
    Input: nums = [3,2,1,4,5], k = 4
    Output: 3
    Explanation: The subarrays that have a median equal to 4 are: [4], [4,5] 
                 and [1,4,5].
    
    Example 2:
    Input: nums = [2,3,1], k = 3
    Output: 1
    Explanation: [3] is the only subarray that has a median equal to 3.

    Constraints:
    * n == nums.length
    * 1 <= n <= 10^5
    * 1 <= nums[i], k <= n
    * The integers in nums are distinct.*/

    public int countSubarrays(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>(); 
        freq.put(0, 1); 
        int ans = 0, diff = 0; 
        boolean found = false; 
        for (int x : nums) {
            if (x < k) --diff; 
            else if (x > k) ++diff; 
            else found = true; 
            if (found) ans += freq.getOrDefault(diff, 0) + freq.getOrDefault(diff-1, 0); 
            else freq.merge(diff, 1, Integer::sum); 
        }
        return ans; 
    }


    /*2489. Number of Substrings With Fixed Ratio (Medium)
    You are given a binary string s, and two integers num1 and num2. num1 and 
    num2 are coprime numbers. A ratio substring is a substring of s where the 
    ratio between the number of 0's and the number of 1's in the substring is 
    exactly num1 : num2.
    * For example, if num1 = 2 and num2 = 3, then "01011" and "1110000111" are 
      ratio substrings, while "11000" is not.
    Return the number of non-empty ratio substrings of s.

    Note that:
    * A substring is a contiguous sequence of characters within a string.
    * Two values x and y are coprime if gcd(x, y) == 1 where gcd(x, y) is the 
      greatest common divisor of x and y.

    Example 1:
    Input: s = "0110011", num1 = 1, num2 = 2
    Output: 4
    Explanation: There exist 4 non-empty ratio substrings.
                 - The substring s[0..2]: "0110011". It contains one 0 and two 
                   1's. The ratio is 1 : 2.
                 - The substring s[1..4]: "0110011". It contains one 0 and two 
                   1's. The ratio is 1 : 2.
                 - The substring s[4..6]: "0110011". It contains one 0 and two 
                   1's. The ratio is 1 : 2.
                 - The substring s[1..6]: "0110011". It contains two 0's and 
                   four 1's. The ratio is 2 : 4 == 1 : 2.
                 It can be shown that there are no more ratio substrings.
    
    Example 2:
    Input: s = "10101", num1 = 3, num2 = 1
    Output: 0
    Explanation: There is no ratio substrings of s. We return 0.

    Constraints:
    * 1 <= s.length <= 10^5
    * 1 <= num1, num2 <= s.length
    * num1 and num2 are coprime integers.*/

    public long fixedRatio(String s, int num1, int num2) {
        HashMap<Long, Integer> freq = new HashMap<>(); freq.put(0l, 1); 
        long ans = 0, prefix = 0; 
        for (char ch : s.toCharArray()) {
            if (ch == '0') prefix += num2; 
            else prefix -= num1; 
            ans += freq.getOrDefault(prefix, 0); 
            freq.merge(prefix, 1, Integer::sum); 
        }
        return ans; 
    }


    /*2495. Number of Subarrays Having Even Product (Medium)
    Given a 0-indexed integer array nums, return the number of subarrays of 
    nums having an even product.

    Example 1:
    Input: nums = [9,6,7,13]
    Output: 6
    Explanation: There are 6 subarrays with an even product:
                 - nums[0..1] = 9 * 6 = 54.
                 - nums[0..2] = 9 * 6 * 7 = 378.
                 - nums[0..3] = 9 * 6 * 7 * 13 = 4914.
                 - nums[1..1] = 6.
                 - nums[1..2] = 6 * 7 = 42.
                 - nums[1..3] = 6 * 7 * 13 = 546.
    
    Example 2:
    Input: nums = [7,3,5]
    Output: 0
    Explanation: There are no subarrays with an even product.

    Constraints:
    * 1 <= nums.length <= 10^5
    * 1 <= nums[i] <= 10^5*/

    public long evenProduct(int[] nums) {
        long ans = 0; 
        for (int i = 0, val = 0; i < nums.length; ++i) {
            if (nums[i] % 2 == 0) val = i+1; 
            ans += val; 
        }
        return ans; 
    }


    /*2496. Maximum Value of a String in an Array (Easy)
    The value of an alphanumeric string can be defined as:
    * The numeric representation of the string in base 10, if it comprises of 
      digits only.
    * The length of the string, otherwise.
    Given an array strs of alphanumeric strings, return the maximum value of 
    any string in strs.

    Example 1:
    Input: strs = ["alic3","bob","3","4","00000"]
    Output: 5
    Explanation: - "alic3" consists of both letters and digits, so its value is 
                   its length, i.e. 5.
                 - "bob" consists only of letters, so its value is also its 
                   length, i.e. 3.
                 - "3" consists only of digits, so its value is its numeric 
                   equivalent, i.e. 3.
                 - "4" also consists only of digits, so its value is 4.
                 - "00000" consists only of digits, so its value is 0.
                 Hence, the maximum value is 5, of "alic3".
    
    Example 2:
    Input: strs = ["1","01","001","0001"]
    Output: 1
    Explanation: Each string in the array has value 1. Hence, we return 1.

    Constraints:
    * 1 <= strs.length <= 100
    * 1 <= strs[i].length <= 9
    * strs[i] consists of only lowercase English letters and digits.*/

    public int maximumValue(String[] strs) {
        int ans = 0; 
        for (String s : strs) 
            if (s.matches("[0-9]+")) ans = Math.max(ans, Integer.valueOf(s)); 
            else ans = Math.max(ans, s.length()); 
        return ans; 
    }


    /*2497. Maximum Star Sum of a Graph (Medium)
    There is an undirected graph consisting of n nodes numbered from 0 to n - 1. 
    You are given a 0-indexed integer array vals of length n where vals[i] 
    denotes the value of the ith node. You are also given a 2D integer array 
    edges where edges[i] = [ai, bi] denotes that there exists an undirected 
    edge connecting nodes ai and bi. A star graph is a subgraph of the given 
    graph having a center node containing 0 or more neighbors. In other words, 
    it is a subset of edges of the given graph such that there exists a common 
    node for all edges. The image below shows star graphs with 3 and 4 
    neighbors respectively, centered at the blue node. The star sum is the sum 
    of the values of all the nodes present in the star graph. Given an integer 
    k, return the maximum star sum of a star graph containing at most k edges.

    Example 1:
    Input: vals = [1,2,3,4,10,-10,-20], edges = [[0,1],[1,2],[1,3],[3,4],[3,5],[3,6]], k = 2
    Output: 16
    Explanation: The above diagram represents the input graph. The star graph 
                 with the maximum star sum is denoted by blue. It is centered 
                 at 3 and includes its neighbors 1 and 4. It can be shown it is 
                 not possible to get a star graph with a sum greater than 16.
    
    Example 2:
    Input: vals = [-5], edges = [], k = 0
    Output: -5
    Explanation: There is only one possible star graph, which is node 0 itself. 
                 Hence, we return -5.

    Constraints:
    * n == vals.length
    * 1 <= n <= 10^5
    * -104 <= vals[i] <= 10^4
    * 0 <= edges.length <= min(n * (n - 1) / 2, 10^5)
    * edges[i].length == 2
    * 0 <= ai, bi <= n - 1
    * ai != bi
    * 0 <= k <= n - 1*/

    public int maxStarSum(int[] vals, int[][] edges, int k) {
        int n = vals.length; 
        List<Integer>[] graph = new ArrayList[n]; 
        for (int u = 0; u < n; ++u) graph[u] = new ArrayList(); 
        for (int[] e : edges) {
            graph[e[0]].add(e[1]); 
            graph[e[1]].add(e[0]); 
        }
        int ans = Integer.MIN_VALUE; 
        for (int u = 0; u < n; ++u) {
            int cand = vals[u]; 
            if (graph[u].size() > k) Collections.sort(graph[u], (a, b) -> vals[b] - vals[a]);
            for (int v = 0; v < k && v < graph[u].size(); ++v)
                cand += Math.max(0, vals[graph[u].get(v)]); 
            ans = Math.max(ans, cand); 
        }
        return ans; 
    }


    /*2498. Frog Jump II (Medium)
    You are given a 0-indexed integer array stones sorted in strictly 
    increasing order representing the positions of stones in a river. A frog, 
    initially on the first stone, wants to travel to the last stone and then 
    return to the first stone. However, it can jump to any stone at most once.
    The length of a jump is the absolute difference between the position of the 
    stone the frog is currently on and the position of the stone to which the 
    frog jumps. More formally, if the frog is at stones[i] and is jumping to 
    stones[j], the length of the jump is |stones[i] - stones[j]|. The cost of a 
    path is the maximum length of a jump among all jumps in the path. Return 
    the minimum cost of a path for the frog.

    Example 1:
    Input: stones = [0,2,5,6,7]
    Output: 5
    Explanation: The above figure represents one of the optimal paths the frog 
                 can take. The cost of this path is 5, which is the maximum 
                 length of a jump. Since it is not possible to achieve a cost 
                 of less than 5, we return it.
    
    Example 2:
    Input: stones = [0,3,9]
    Output: 9
    Explanation: The frog can jump directly to the last stone and come back to 
                 the first stone. In this case, the length of each jump will be 
                 9. The cost for the path will be max(9, 9) = 9. It can be 
                 shown that this is the minimum achievable cost.

    Constraints:
    * 2 <= stones.length <= 10^5
    * 0 <= stones[i] <= 10^9
    * stones[0] == 0
    * stones is sorted in a strictly increasing order.*/

    public int maxJump(int[] stones) {
        int ans = stones[1]; 
        for (int i = 2; i < stones.length; ++i) 
            ans = Math.max(ans, stones[i] - stones[i-2]); 
        return ans; 
    }


    /*2499. Minimum Total Cost to Make Arrays Unequal (Hard)
    You are given two 0-indexed integer arrays nums1 and nums2, of equal length 
    n. In one operation, you can swap the values of any two indices of nums1. 
    The cost of this operation is the sum of the indices. Find the minimum 
    total cost of performing the given operation any number of times such that 
    nums1[i] != nums2[i] for all 0 <= i <= n - 1 after performing all the 
    operations. Return the minimum total cost such that nums1 and nums2 satisfy 
    the above condition. In case it is not possible, return -1.

    Example 1:
    Input: nums1 = [1,2,3,4,5], nums2 = [1,2,3,4,5]
    Output: 10
    Explanation: One of the ways we can perform the operations is:
                 - Swap values at indices 0 and 3, incurring cost = 0 + 3 = 3. 
                   Now, nums1 = [4,2,3,1,5]
                 - Swap values at indices 1 and 2, incurring cost = 1 + 2 = 3. 
                   Now, nums1 = [4,3,2,1,5].
                 - Swap values at indices 0 and 4, incurring cost = 0 + 4 = 4. 
                   Now, nums1 =[5,3,2,1,4].
                 We can see that for each index i, nums1[i] != nums2[i]. The 
                 cost required here is 10. Note that there are other ways to 
                 swap values, but it can be proven that it is not possible to 
                 obtain a cost less than 10.
    
    Example 2:
    Input: nums1 = [2,2,2,1,3], nums2 = [1,2,2,3,3]
    Output: 10
    Explanation: One of the ways we can perform the operations is:
                 - Swap values at indices 2 and 3, incurring cost = 2 + 3 = 5. 
                   Now, nums1 = [2,2,1,2,3].
                 - Swap values at indices 1 and 4, incurring cost = 1 + 4 = 5. 
                   Now, nums1 = [2,3,1,2,2].
                 The total cost needed here is 10, which is the minimum 
                 possible.
    
    Example 3:
    Input: nums1 = [1,2,2], nums2 = [1,2,2]
    Output: -1
    Explanation: It can be shown that it is not possible to satisfy the given 
                 conditions irrespective of the number of operations we 
                 perform. Hence, we return -1.

    Constraints:
    * n == nums1.length == nums2.length
    * 1 <= n <= 10^5
    * 1 <= nums1[i], nums2[i] <= n*/

    public long minimumTotalCost(int[] nums1, int[] nums2) {
        int n = nums1.length, total = 0; 
        int[] freq = new int[n+1]; 
        long ans = 0; 
        for (int i = 0; i < n; ++i) 
            if (nums1[i] == nums2[i]) {
                ++freq[nums1[i]]; 
                ++total; 
                ans += i; 
            }
        int most = 0, key = 0; 
        for (int i = 0; i <= n; ++i) 
            if (freq[i] > most) {
                key = i; 
                most = freq[i]; 
            }
        for (int i = 0; i < n && 2*most > total; ++i) 
            if (nums1[i] != nums2[i] && key != nums1[i] && key != nums2[i]) {
                ++total; 
                ans += i; 
            }
        return 2*most <= total ? ans : -1; 
    }


    /*2500. Delete Greatest Value in Each Row (Easy)
    You are given an m x n matrix grid consisting of positive integers. Perform 
    the following operation until grid becomes empty:
    * Delete the element with the greatest value from each row. If multiple 
      such elements exist, delete any of them.
    * Add the maximum of deleted elements to the answer.
    Note that the number of columns decreases by one after each operation. 
    Return the answer after performing the operations described above.

    Example 1:
    Input: grid = [[1,2,4],[3,3,1]]
    Output: 8
    Explanation: The diagram above shows the removed values in each step.
                 - In the first operation, we remove 4 from the first row and 3 
                   from the second row (notice that, there are two cells with 
                   value 3 and we can remove any of them). We add 4 to the 
                   answer.
                 - In the second operation, we remove 2 from the first row and 
                   3 from the second row. We add 3 to the answer.
                 - In the third operation, we remove 1 from the first row and 1 
                   from the second row. We add 1 to the answer.
                 The final answer = 4 + 3 + 1 = 8.
    
    Example 2:
    Input: grid = [[10]]
    Output: 10
    Explanation: The diagram above shows the removed values in each step.
                 - In the first operation, we remove 10 from the first row. We 
                   add 10 to the answer.
                 The final answer = 10.

    Constraints:
    * m == grid.length
    * n == grid[i].length
    * 1 <= m, n <= 50
    * 1 <= grid[i][j] <= 100*/

    public int deleteGreatestValue(int[][] grid) {
        for (int[] row : grid) Arrays.sort(row); 
        int ans = 0; 
        for (int j = 0; j < grid[0].length; ++j) {
            int cand = 0; 
            for (int i = 0; i < grid.length; ++i) 
                cand = Math.max(cand, grid[i][j]); 
            ans += cand; 
        }
        return ans; 
    }


    /*2501. Longest Square Streak in an Array (Medium)
    You are given an integer array nums. A subsequence of nums is called a 
    square streak if:
    * The length of the subsequence is at least 2, and
    * after sorting the subsequence, each element (except the first element) is 
      the square of the previous number.
    Return the length of the longest square streak in nums, or return -1 if 
    there is no square streak. A subsequence is an array that can be derived 
    from another array by deleting some or no elements without changing the 
    order of the remaining elements.

    Example 1:
    Input: nums = [4,3,6,16,8,2]
    Output: 3
    Explanation: Choose the subsequence [4,16,2]. After sorting it, it becomes 
                 [2,4,16].
                 - 4 = 2 * 2.
                 - 16 = 4 * 4.
                 Therefore, [4,16,2] is a square streak. It can be shown that 
                 every subsequence of length 4 is not a square streak.
    
    Example 2:
    Input: nums = [2,3,5,6,7]
    Output: -1
    Explanation: There is no square streak in nums so return -1.

    Constraints:
    * 2 <= nums.length <= 10^5
    * 2 <= nums[i] <= 10^5*/

    public int longestSquareStreak(int[] nums) {
        int[] dp = new int[100_001]; 
        Arrays.sort(nums); 
        int ans = 0; 
        for (int x : nums) {
            dp[x] = Math.max(1, dp[x]); 
            int v = (int) Math.sqrt(x); 
            if (v*v == x) dp[x] = 1 + dp[v]; 
            ans = Math.max(ans, dp[x]); 
        }
        return ans > 1 ? ans : -1; 
    }


    /*2503. Maximum Number of Points From Grid Queries (Hard)
    You are given an m x n integer matrix grid and an array queries of size k.
    Find an array answer of size k such that for each integer queres[i] you 
    start in the top left cell of the matrix and repeat the following process:
    * If queries[i] is strictly greater than the value of the current cell that 
      you are in, then you get one point if it is your first time visiting this 
      cell, and you can move to any adjacent cell in all 4 directions: up, down, 
      left, and right.
    * Otherwise, you do not get any points, and you end this process.
    After the process, answer[i] is the maximum number of points you can get. 
    Note that for each query you are allowed to visit the same cell multiple 
    times. Return the resulting array answer.

    Example 1:
    Input: grid = [[1,2,3],[2,5,7],[3,5,1]], queries = [5,6,2]
    Output: [5,8,1]
    Explanation: The diagrams above show which cells we visit to get points for 
                 each query.

    Example 2:
    Input: grid = [[5,2,1],[1,1,2]], queries = [3]
    Output: [0]
    Explanation: We can not get any points because the value of the top left 
                 cell is already greater than or equal to 3.

    Constraints:
    * m == grid.length
    * n == grid[i].length
    * 2 <= m, n <= 1000
    * 4 <= m * n <= 10^5
    * k == queries.length
    * 1 <= k <= 10^4
    * 1 <= grid[i][j], queries[i] <= 10^6*/

    public int[] maxPoints(int[][] grid, int[] queries) {
        int m = grid.length, n = grid[0].length, prev = Integer.MIN_VALUE, prefix = 0; 
        int[][] dir = {{-1, 0}, {0, -1}, {0, 1}, {1, 0}}; 
        Queue<int[]> pq = new PriorityQueue<>((a, b)->(a[0]-b[0])); 
        pq.add(new int[]{grid[0][0], 0, 0}); 
        grid[0][0] = 0; 
        List<Integer> keys = new ArrayList(); 
        List<Integer> vals = new ArrayList(); 
        while (pq.size() > 0) {
            int[] elem = pq.remove(); 
            int v = elem[0], i = elem[1], j = elem[2]; 
            if (prev != v) {
                keys.add(prev); 
                vals.add(prefix); 
            }
            ++prefix; 
            prev = v; 
            for (var d : dir) {
                int ii = i + d[0], jj = j + d[1]; 
                if (0 <= ii && ii < m && 0 <= jj && jj < n && grid[ii][jj] > 0) {
                    int vv = Math.max(v, grid[ii][jj]); 
                    pq.add(new int[]{vv, ii, jj}); 
                    grid[ii][jj] = 0; 
                }
            }
        } 
        keys.add(prev); 
        vals.add(prefix); 
        int sz = queries.length; 
        int[] ans = new int[sz]; 
        for (int i = 0; i < sz; ++i) {
            int k = Collections.binarySearch(keys, queries[i]);
            if (k < 0) k = -k-1; 
            ans[i] = vals.get(k-1); 
        }
        return ans; 
    }


    /*2505. Bitwise OR of All Subsequence Sums (Medium)
    Given an integer array nums, return the value of the bitwise OR of the sum 
    of all possible subsequences in the array. A subsequence is a sequence that 
    can be derived from another sequence by removing zero or more elements 
    without changing the order of the remaining elements.

    Example 1:
    Input: nums = [2,1,0,3]
    Output: 7
    Explanation: All possible subsequence sums that we can have are: 
                 0, 1, 2, 3, 4, 5, 6. And we have 
                 0 OR 1 OR 2 OR 3 OR 4 OR 5 OR 6 = 7, so we return 7.
    
    Example 2:
    Input: nums = [0,0,0]
    Output: 0
    Explanation: 0 is the only possible subsequence sum we can have, so we 
                 return 0.

    Constraints:
    * 1 <= nums.length <= 10^5
    * 0 <= nums[i] <= 10^9*/

    public long subsequenceSumOr(int[] nums) {
        long ans = 0, prefix = 0; 
        for (var x : nums) {
            prefix += x; 
            ans |= x | prefix; 
        }
        return ans; 
    }


    /*2506. Count Pairs Of Similar Strings (Easy)
    You are given a 0-indexed string array words. Two strings are similar if 
    they consist of the same characters.
    * For example, "abca" and "cba" are similar since both consist of 
      characters 'a', 'b', and 'c'.
    * However, "abacba" and "bcfd" are not similar since they do not consist of 
      the same characters.
    Return the number of pairs (i, j) such that 0 <= i < j <= word.length - 1 
    and the two strings words[i] and words[j] are similar.

    Example 1:
    Input: words = ["aba","aabb","abcd","bac","aabc"]
    Output: 2
    Explanation: There are 2 pairs that satisfy the conditions:
                 - i = 0 and j = 1 : both words[0] and words[1] only consist of 
                   characters 'a' and 'b'. 
                 - i = 3 and j = 4 : both words[3] and words[4] only consist of 
                   characters 'a', 'b', and 'c'. 
    
    Example 2:
    Input: words = ["aabb","ab","ba"]
    Output: 3
    Explanation: There are 3 pairs that satisfy the conditions:
                 - i = 0 and j = 1 : both words[0] and words[1] only consist of 
                   characters 'a' and 'b'. 
                 - i = 0 and j = 2 : both words[0] and words[2] only consist of 
                   characters 'a' and 'b'.
                 - i = 1 and j = 2 : both words[1] and words[2] only consist of 
                   characters 'a' and 'b'.
    
    Example 3:
    Input: words = ["nba","cba","dba"]
    Output: 0
    Explanation: Since there does not exist any pair that satisfies the 
                 conditions, we return 0.

    Constraints:
    * 1 <= words.length <= 100
    * 1 <= words[i].length <= 100
    * words[i] consist of only lowercase English letters.*/

    public int similarPairs(String[] words) {
        int ans = 0; 
        HashMap<Integer, Integer> freq = new HashMap(); 
        for (var word : words) {
            int mask = 0; 
            for (var ch : word.toCharArray()) 
                mask |= 1<<ch-'a'; 
            ans += freq.getOrDefault(mask, 0); 
            freq.merge(mask, 1, Integer::sum); 
        }
        return ans; 
    }


    /*2507. Smallest Value After Replacing With Sum of Prime Factors (Medium)
    You are given a positive integer n. Continuously replace n with the sum of 
    its prime factors. 
    * Note that if a prime factor divides n multiple times, it should be 
      included in the sum as many times as it divides n.
    Return the smallest value n will take on.

    Example 1:
    Input: n = 15
    Output: 5
    Explanation: Initially, n = 15.
                 15 = 3 * 5, so replace n with 3 + 5 = 8.
                 8 = 2 * 2 * 2, so replace n with 2 + 2 + 2 = 6.
                 6 = 2 * 3, so replace n with 2 + 3 = 5.
                 5 is the smallest value n will take on.
    
    Example 2:
    Input: n = 3
    Output: 3
    Explanation: Initially, n = 3. 3 is the smallest value n will take on.

    Constraints: 2 <= n <= 10^5*/

    public int smallestValue(int n) {
        while (true) {
            int sm = 0; 
            for (int f = 2, nn = n; f <= nn; ++f)
                for (; nn % f == 0; nn /= f, sm += f); 
            if (sm == n) break; 
            n = sm; 
        }
        return n; 
    }


    /*2508. Add Edges to Make Degrees of All Nodes Even (Hard)
    There is an undirected graph consisting of n nodes numbered from 1 to n. 
    You are given the integer n and a 2D array edges where edges[i] = [ai, bi] 
    indicates that there is an edge between nodes ai and bi. The graph can be 
    disconnected. You can add at most two additional edges (possibly none) to 
    this graph so that there are no repeated edges and no self-loops. Return 
    true if it is possible to make the degree of each node in the graph even, 
    otherwise return false. The degree of a node is the number of edges 
    connected to it.

    Example 1:
    Input: n = 5, edges = [[1,2],[2,3],[3,4],[4,2],[1,4],[2,5]]
    Output: true
    Explanation: The above diagram shows a valid way of adding an edge. Every 
                 node in the resulting graph is connected to an even number of 
                 edges.
    
    Example 2:
    Input: n = 4, edges = [[1,2],[3,4]]
    Output: true
    Explanation: The above diagram shows a valid way of adding two edges.

    Example 3:
    Input: n = 4, edges = [[1,2],[1,3],[1,4]]
    Output: false
    Explanation: It is not possible to obtain a valid graph with adding at most 
                 2 edges.

    Constraints:
    * 3 <= n <= 10^5
    * 2 <= edges.length <= 10^5
    * edges[i].length == 2
    * 1 <= ai, bi <= n
    * ai != bi
    * There are no repeated edges.*/

    public boolean isPossible(int n, List<List<Integer>> edges) {
        HashSet<Integer>[] graph = new HashSet[n]; 
        for (int i = 0; i < n; ++i) graph[i] = new HashSet(); 
        for (var e : edges) {
            graph[e.get(0)-1].add(e.get(1)-1); 
            graph[e.get(1)-1].add(e.get(0)-1); 
        }
        List<Integer> odd = new ArrayList(); 
        for (int i = 0; i < n; ++i) 
            if (graph[i].size() % 2 == 1) odd.add(i); 
        if (odd.size() == 2) {
            for (int i = 0; i < n; ++i) 
                if (!graph[i].contains(odd.get(0)) && !graph[i].contains(odd.get(1))) return true; 
            return false; 
        }
        if (odd.size() == 4) 
            return !graph[odd.get(0)].contains(odd.get(1)) && !graph[odd.get(2)].contains(odd.get(3)) 
                || !graph[odd.get(0)].contains(odd.get(2)) && !graph[odd.get(1)].contains(odd.get(3)) 
                || !graph[odd.get(0)].contains(odd.get(3)) && !graph[odd.get(1)].contains(odd.get(2)); 
        return odd.size() == 0; 
    }


    /*2509. Cycle Length Queries in a Tree (Hard)
    You are given an integer n. There is a complete binary tree with 2n - 1 
    nodes. The root of that tree is the node with the value 1, and every node 
    with a value val in the range [1, 2n - 1 - 1] has two children where:
    * The left node has the value 2 * val, and
    * The right node has the value 2 * val + 1.
    You are also given a 2D integer array queries of length m, where 
    queries[i] = [ai, bi]. For each query, solve the following problem:
    * Add an edge between the nodes with values ai and bi.
    * Find the length of the cycle in the graph.
    * Remove the added edge between nodes with values ai and bi.
    Note that:
    * A cycle is a path that starts and ends at the same node, and each edge in 
      the path is visited only once.
    * The length of a cycle is the number of edges visited in the cycle.
    * There could be multiple edges between two nodes in the tree after adding 
      the edge of the query.
    Return an array answer of length m where answer[i] is the answer to the ith 
    query.

    Example 1:
    Input: n = 3, queries = [[5,3],[4,7],[2,3]]
    Output: [4,5,3]
    Explanation: The diagrams above show the tree of 23 - 1 nodes. Nodes 
                 colored in red describe the nodes in the cycle after adding 
                 the edge.
                 - After adding the edge between nodes 3 and 5, the graph 
                   contains a cycle of nodes [5,2,1,3]. Thus answer to the 
                   first query is 4. We delete the added edge and process the 
                   next query.
                 - After adding the edge between nodes 4 and 7, the graph 
                   contains a cycle of nodes [4,2,1,3,7]. Thus answer to the 
                   second query is 5. We delete the added edge and process the 
                   next query.
                 - After adding the edge between nodes 2 and 3, the graph 
                   contains a cycle of nodes [2,1,3]. Thus answer to the third 
                   query is 3. We delete the added edge.
    
    Example 2:
    Input: n = 2, queries = [[1,2]]
    Output: [2]
    Explanation: The diagram above shows the tree of 22 - 1 nodes. Nodes 
                 colored in red describe the nodes in the cycle after adding 
                 the edge.
                 - After adding the edge between nodes 1 and 2, the graph 
                   contains a cycle of nodes [2,1]. Thus answer for the first 
                   query is 2. We delete the added edge.

    Constraints:
    * 2 <= n <= 30
    * m == queries.length
    * 1 <= m <= 10^5
    * queries[i].length == 2
    * 1 <= ai, bi <= 2n - 1
    * ai != bi*/

    public int[] cycleLengthQueries(int n, int[][] queries) {
        int[] ans = new int[queries.length];
        for (int i = 0; i < queries.length; ++i) {
            int dist = 1; 
            for (int u = queries[i][0], v = queries[i][1]; u != v; u /= 2, ++dist) 
                if (u < v) { int tmp = v; v = u; u = tmp; }
            ans[i] = dist; 
        }
        return ans;  
    }


    /*2510. Check if There is a Path With Equal Number of 0's And 1's (Medium)
    You are given a 0-indexed m x n binary matrix grid. You can move from a 
    cell (row, col) to any of the cells (row + 1, col) or (row, col + 1). 
    Return true if there is a path from (0, 0) to (m - 1, n - 1) that visits an 
    equal number of 0's and 1's. Otherwise return false.

    Example 1:
    Input: grid = [[0,1,0,0],[0,1,0,0],[1,0,1,0]]
    Output: true
    Explanation: The path colored in blue in the above diagram is a valid path 
                 because we have 3 cells with a value of 1 and 3 with a value 
                 of 0. Since there is a valid path, we return true.
    
    Example 2:
    Input: grid = [[1,1,0],[0,0,1],[1,0,0]]
    Output: false
    Explanation: There is no path in this grid with an equal number of 0's and 
                 1's.

    Constraints:
    * m == grid.length
    * n == grid[i].length
    * 2 <= m, n <= 100
    * grid[i][j] is either 0 or 1.*/

    public boolean isThereAPath(int[][] grid) {
        int m = grid.length, n = grid[0].length; 
        if ((m+n) % 2 == 1) {
            int[][] lo = new int[m][n], hi = new int[m][n]; 
            Arrays.stream(lo).forEach(a -> Arrays.fill(a, Integer.MAX_VALUE));
            Arrays.stream(hi).forEach(a -> Arrays.fill(a, Integer.MIN_VALUE));
            lo[0][0] = hi[0][0] = 2*grid[0][0]-1; 
            for (int i = 0; i < m; ++i) 
                for (int j = 0; j < n; ++j) {
                    if (i > 0) {
                        lo[i][j] = Math.min(lo[i][j], lo[i-1][j] + 2*grid[i][j]-1); 
                        hi[i][j] = Math.max(hi[i][j], hi[i-1][j] + 2*grid[i][j]-1); 
                    }
                    if (j > 0) {
                        lo[i][j] = Math.min(lo[i][j], lo[i][j-1] + 2*grid[i][j]-1); 
                        hi[i][j] = Math.max(hi[i][j], hi[i][j-1] + 2*grid[i][j]-1); 
                    }
                }
            return lo[m-1][n-1] <= 0 && 0 <= hi[m-1][n-1]; 
        }
        return false; 
    }


    /*2511. Maximum Enemy Forts That Can Be Captured (Easy)
    You are given a 0-indexed integer array forts of length n representing the 
    positions of several forts. forts[i] can be -1, 0, or 1 where:
    * -1 represents there is no fort at the ith position.
    * 0 indicates there is an enemy fort at the ith position.
    * 1 indicates the fort at the ith the position is under your command.
    Now you have decided to move your army from one of your forts at position i 
    to an empty position j such that:
    * 0 <= i, j <= n - 1
    * The army travels over enemy forts only. Formally, for all k where 
      min(i,j) < k < max(i,j), forts[k] == 0.
    While moving the army, all the enemy forts that come in the way are 
    captured. Return the maximum number of enemy forts that can be captured. In 
    case it is impossible to move your army, or you do not have any fort under 
    your command, return 0.

    Example 1:
    Input: forts = [1,0,0,-1,0,0,0,0,1]
    Output: 4
    Explanation: - Moving the army from position 0 to position 3 captures 2 
                   enemy forts, at 1 and 2.
                 - Moving the army from position 8 to position 3 captures 4 
                   enemy forts.
                 Since 4 is the maximum number of enemy forts that can be 
                 captured, we return 4.
    
    Example 2:
    Input: forts = [0,0,1,-1]
    Output: 0
    Explanation: Since no enemy fort can be captured, 0 is returned.

    Constraints:
    * 1 <= forts.length <= 1000
    * -1 <= forts[i] <= 1*/

    public int captureForts(int[] forts) {
        int ans = 0; 
        for (int i = 0, ii = 0; i < forts.length; ++i) 
            if (forts[i] != 0) {
                if (forts[ii] == -forts[i]) ans = Math.max(ans, i-ii-1); 
                ii = i; 
            }
        return ans; 
    }


    /*2512. Reward Top K Students (Medium)
    You are given two string arrays positive_feedback and negative_feedback, 
    containing the words denoting positive and negative feedback, respectively. 
    Note that no word is both positive and negative. Initially every student 
    has 0 points. Each positive word in a feedback report increases the points 
    of a student by 3, whereas each negative word decreases the points by 1. 
    You are given n feedback reports, represented by a 0-indexed string array 
    report and a 0-indexed integer array student_id, where student_id[i] 
    represents the ID of the student who has received the feedback report 
    report[i]. The ID of each student is unique. Given an integer k, return 
    the top k students after ranking them in non-increasing order by their 
    points. In case more than one student has the same points, the one with the 
    lower ID ranks higher.

    Example 1:
    Input: positive_feedback = ["smart","brilliant","studious"], 
           negative_feedback = ["not"], 
           report = ["this student is studious","the student is smart"], 
           student_id = [1,2], k = 2
    Output: [1,2]
    Explanation: Both the students have 1 positive feedback and 3 points but 
                 since student 1 has a lower ID he ranks higher.
    
    Example 2:
    Input: positive_feedback = ["smart","brilliant","studious"], 
           negative_feedback = ["not"], 
           report = ["this student is not studious","the student is smart"], 
           student_id = [1,2], k = 2
    Output: [2,1]
    Explanation: - The student with ID 1 has 1 positive feedback and 1 negative 
                   feedback, so he has 3-1=2 points. 
                 - The student with ID 2 has 1 positive feedback, so he has 3 
                   points. 
                 Since student 2 has more points, [2,1] is returned.

    Constraints:
    * 1 <= positive_feedback.length, negative_feedback.length <= 10^4
    * 1 <= positive_feedback[i].length, negative_feedback[j].length <= 100
    * Both positive_feedback[i] and negative_feedback[j] consists of lowercase 
      English letters.
    * No word is present in both positive_feedback and negative_feedback.
    * n == report.length == student_id.length
    * 1 <= n <= 10^4
    * report[i] consists of lowercase English letters and spaces ' '.
    * There is a single space between consecutive words of report[i].
    * 1 <= report[i].length <= 100
    * 1 <= student_id[i] <= 10^9
    * All the values of student_id[i] are unique.
    * 1 <= k <= n*/

    public List<Integer> topStudents(String[] positive_feedback, String[] negative_feedback, String[] report, int[] student_id, int k) {
        Set<String> positive = new HashSet(Arrays.asList(positive_feedback)), negative = new HashSet(Arrays.asList(negative_feedback)); 
        Map<Integer, Integer> mp = new HashMap(); 
        for (int i = 0; i < report.length; ++i) {
            int point = 0; 
            for (var word : report[i].split(" ")) {
                if (positive.contains(word)) point += 3; 
                else if (negative.contains(word)) --point; 
            }
            mp.put(student_id[i], point); 
        }
        List<Integer> vals = new ArrayList(); 
        for (var elem : mp.entrySet()) vals.add(elem.getKey()); 
        Collections.sort(vals, (a, b)->(mp.get(a) != mp.get(b) ? Integer.compare(mp.get(b), mp.get(a)) : Integer.compare(a, b))); 
        List<Integer> ans = new ArrayList(); 
        for (int i = 0; i < k; ++i) ans.add(vals.get(i)); 
        return ans; 
    }


    /*2513. Minimize the Maximum of Two Arrays (Medium)
    We have two arrays arr1 and arr2 which are initially empty. You need to add 
    positive integers to them such that they satisfy all the following 
    conditions:
    * arr1 contains uniqueCnt1 distinct positive integers, each of which is not 
      divisible by divisor1.
    * arr2 contains uniqueCnt2 distinct positive integers, each of which is not 
      divisible by divisor2.
    * No integer is present in both arr1 and arr2.
    Given divisor1, divisor2, uniqueCnt1, and uniqueCnt2, return the minimum 
    possible maximum integer that can be present in either array.

    Example 1:
    Input: divisor1 = 2, divisor2 = 7, uniqueCnt1 = 1, uniqueCnt2 = 3
    Output: 4
    Explanation: We can distribute the first 4 natural numbers into arr1 and 
                 arr2. arr1 = [1] and arr2 = [2,3,4]. We can see that both 
                 arrays satisfy all the conditions. Since the maximum value is 
                 4, we return it.
    
    Example 2:
    Input: divisor1 = 3, divisor2 = 5, uniqueCnt1 = 2, uniqueCnt2 = 1
    Output: 3
    Explanation: Here arr1 = [1,2], and arr2 = [3] satisfy all conditions. 
                 Since the maximum value is 3, we return it.
    
    Example 3:
    Input: divisor1 = 2, divisor2 = 4, uniqueCnt1 = 8, uniqueCnt2 = 2
    Output: 15
    Explanation: Here, the final possible arrays can be 
                 arr1 = [1,3,5,7,9,11,13,15], and arr2 = [2,6]. It can be shown 
                 that it is not possible to obtain a lower maximum satisfying 
                 all conditions. 

    Constraints:
    * 2 <= divisor1, divisor2 <= 10^5
    * 1 <= uniqueCnt1, uniqueCnt2 < 10^9
    * 2 <= uniqueCnt1 + uniqueCnt2 <= 10^9*/

    public int minimizeSet(int divisor1, int divisor2, int uniqueCnt1, int uniqueCnt2) {
        int g = divisor1; 
        for (int x = divisor2; x > 0; ) {int tmp = g; g = x; x = tmp % x; }
        long lo = 0, hi = Integer.MAX_VALUE, mult = ((long) divisor1*divisor2/g); 
        while (lo < hi) {
            long mid = lo + (hi-lo)/2;
            if (uniqueCnt1 <= mid-mid/divisor1 && uniqueCnt2 <= mid-mid/divisor2 && uniqueCnt1+uniqueCnt2 <= mid-mid/mult) hi = mid; 
            else lo = mid+1; 
        }
        return (int) lo; 
    }


    /*2514. Count Anagrams (Hard)
    You are given a string s containing one or more words. Every consecutive 
    pair of words is separated by a single space ' '. A string t is an anagram 
    of string s if the ith word of t is a permutation of the ith word of s.
    * For example, "acb dfe" is an anagram of "abc def", but "def cab" and 
      "adc bef" are not.
    Return the number of distinct anagrams of s. Since the answer may be very 
    large, return it modulo 10^9 + 7.

    Example 1:
    Input: s = "too hot"
    Output: 18
    Explanation: Some of the anagrams of the given string are "too hot", 
                 "oot hot", "oto toh", "too toh", and "too oht".
    
    Example 2:
    Input: s = "aa"
    Output: 1
    Explanation: There is only one anagram possible for the given string.

    Constraints:
    * 1 <= s.length <= 10^5
    * s consists of lowercase English letters and spaces ' '.
    * There is single space between consecutive words.*/

    public int countAnagrams(String s) {
        final int mod = 1_000_000_007; 
        int n = s.length(); 
        long[] fact = new long[n+1], ifact = new long[n+1], inv = new long[n+1]; 
        fact[0] = ifact[0] = inv[0] = inv[1] = 1; 
        for (int x = 1; x <= n; ++x) {
            if (x >= 2) inv[x] = mod - mod/x * inv[mod%x] % mod; 
            fact[x] = fact[x-1] * x % mod; 
            ifact[x] = ifact[x-1] * inv[x] % mod; 
        }
        long ans = 1; 
        for (var word : s.split(" ")) {
            ans = ans * fact[word.length()] % mod; 
            int[] freq = new int[26]; 
            for (var ch : word.toCharArray())  ++freq[ch-'a']; 
            for (var x : freq) ans = ans * ifact[x] % mod; 
        }
        return (int) ans; 
    }


    /*2515. Shortest Distance to Target String in a Circular Array (Easy)
    You are given a 0-indexed circular string array words and a string target. 
    A circular array means that the array's end connects to the array's 
    beginning.
    * Formally, the next element of words[i] is words[(i + 1) % n] and the 
      previous element of words[i] is words[(i - 1 + n) % n], where n is the 
      length of words.
    Starting from startIndex, you can move to either the next word or the 
    previous word with 1 step at a time. Return the shortest distance needed to 
    reach the string target. If the string target does not exist in words, 
    return -1.

    Example 1:
    Input: words = ["hello","i","am","leetcode","hello"], target = "hello", startIndex = 1
    Output: 1
    Explanation: We start from index 1 and can reach "hello" by
                 - moving 3 units to the right to reach index 4.
                 - moving 2 units to the left to reach index 4.
                 - moving 4 units to the right to reach index 0.
                 - moving 1 unit to the left to reach index 0.
                 The shortest distance to reach "hello" is 1.
    
    Example 2:
    Input: words = ["a","b","leetcode"], target = "leetcode", startIndex = 0
    Output: 1
    Explanation: We start from index 0 and can reach "leetcode" by
                 - moving 2 units to the right to reach index 3.
                 - moving 1 unit to the left to reach index 3.
                 The shortest distance to reach "leetcode" is 1.
    
    Example 3:
    Input: words = ["i","eat","leetcode"], target = "ate", startIndex = 0
    Output: -1
    Explanation: Since "ate" does not exist in words, we return -1.

    Constraints:
    * 1 <= words.length <= 100
    * 1 <= words[i].length <= 100
    * words[i] and target consist of only lowercase English letters.
    * 0 <= startIndex < words.length*/

    public int closetTarget(String[] words, String target, int startIndex) {
        int ans = Integer.MAX_VALUE; 
        for (int i = 0, n = words.length; i < n; ++i) 
            if (words[i].equals(target)) {
                int cand = Math.abs(i - startIndex); 
                ans = Math.min(ans, Math.min(cand, n - cand)); 
            }
        return ans < Integer.MAX_VALUE ? ans : -1; 
    }


    /*2516. Take K of Each Character From Left and Right (Medium)
    You are given a string s consisting of the characters 'a', 'b', and 'c' and 
    a non-negative integer k. Each minute, you may take either the leftmost 
    character of s, or the rightmost character of s. Return the minimum number 
    of minutes needed for you to take at least k of each character, or return 
    -1 if it is not possible to take k of each character.

    Example 1:
    Input: s = "aabaaaacaabc", k = 2
    Output: 8
    Explanation: Take three characters from the left of s. You now have two 'a' 
                 characters, and one 'b' character. Take five characters from 
                 the right of s. You now have four 'a' characters, two 'b' 
                 characters, and two 'c' characters. A total of 3 + 5 = 8 
                 minutes is needed. It can be proven that 8 is the minimum 
                 number of minutes needed.
    
    Example 2:
    Input: s = "a", k = 1
    Output: -1
    Explanation: It is not possible to take one 'b' or 'c' so return -1.

    Constraints:
    * 1 <= s.length <= 10^5
    * s consists of only the letters 'a', 'b', and 'c'.
    * 0 <= k <= s.length*/

    public int takeCharacters(String s, int k) {
        int ans = Integer.MAX_VALUE; 
        int[] freq= new int[3]; 
        for (int i = 0, ii = 0, n = s.length(); i < 2*n; ++i) {
            ++freq[s.charAt(i % n) - 'a']; 
            while (ii < n && i >= n-1 && freq[s.charAt(ii)-'a'] > k && freq[0] >= k && freq[1] >= k && freq[2] >= k) {
                ans = Math.min(ans, i-ii); 
                --freq[s.charAt(ii++) - 'a']; 
            }
        }
        return ans <= s.length() ? ans : -1; 
    }


    /*2517. Maximum Tastiness of Candy Basket (Medium)
    You are given an array of positive integers price where price[i] denotes 
    the price of the ith candy and a positive integer k. The store sells 
    baskets of k distinct candies. The tastiness of a candy basket is the 
    smallest absolute difference of the prices of any two candies in the basket.
    Return the maximum tastiness of a candy basket.

    Example 1:
    Input: price = [13,5,1,8,21,2], k = 3
    Output: 8
    Explanation: Choose the candies with the prices [13,5,21]. The tastiness of 
                 the candy basket is: 
                 min(|13 - 5|, |13 - 21|, |5 - 21|) = min(8, 8, 16) = 8. It can 
                 be proven that 8 is the maximum tastiness that can be achieved.
    
    Example 2:
    Input: price = [1,3,1], k = 2
    Output: 2
    Explanation: Choose the candies with the prices [1,3]. The tastiness of the 
                 candy basket is: min(|1 - 3|) = min(2) = 2. It can be proven 
                 that 2 is the maximum tastiness that can be achieved.
    
    Example 3:
    Input: price = [7,7,7,7], k = 2
    Output: 0
    Explanation: Choosing any two distinct candies from the candies we have 
                 will result in a tastiness of 0.

    Constraints:
    * 1 <= price.length <= 10^5
    * 1 <= price[i] <= 10^9
    * 2 <= k <= price.length*/

    public int maximumTastiness(int[] price, int k) {
        Arrays.sort(price); 
        int n = price.length; 
        int lo = 0, hi = price[n-1] - price[0]; 
        while (lo < hi) {
            int mid = lo + (hi-lo+1)/2, val = price[0], cnt = 0; 
            for (var x : price) 
                if (x >= val + mid) { ++cnt; val = x; }
            if (cnt >= k-1) lo = mid; 
            else hi = mid-1; 
        }
        return lo; 
    }


    /*2518. Number of Great Partitions (Hard)
    You are given an array nums consisting of positive integers and an integer 
    k. Partition the array into two ordered groups such that each element is in 
    exactly one group. A partition is called great if the sum of elements of 
    each group is greater than or equal to k. Return the number of distinct 
    great partitions. Since the answer may be too large, return it modulo 
    10^9 + 7. Two partitions are considered distinct if some element nums[i] is 
    in different groups in the two partitions.

    Example 1:
    Input: nums = [1,2,3,4], k = 4
    Output: 6
    Explanation: The great partitions are: ([1,2,3], [4]), ([1,3], [2,4]), 
                 ([1,4], [2,3]), ([2,3], [1,4]), ([2,4], [1,3]) and 
                 ([4], [1,2,3]).
    
    Example 2:
    Input: nums = [3,3,3], k = 4
    Output: 0
    Explanation: There are no great partitions for this array.

    Example 3:
    Input: nums = [6,6], k = 2
    Output: 2
    Explanation: We can either put nums[0] in the first partition or in the 
                 second partition. The great partitions will be ([6], [6]) and 
                 ([6], [6]).

    Constraints:
    * 1 <= nums.length, k <= 1000
    * 1 <= nums[i] <= 10^9*/

    public int countPartitions(int[] nums, int k) {
        final int mod = 1_000_000_007; 
        long ans = 1, total = 0; 
        long[] dp = new long[k]; 
        dp[0] = 1; 
        for (var x : nums) {
            ans = 2*ans % mod; 
            total += x; 
            for (int i = k-1-x; i >= 0; --i) 
                dp[i+x] = (dp[i] + dp[i+x]) % mod; 
        }
        ans -= 2*LongStream.of(dp).sum(); 
        return total >= 2*k ? (int) (ans % mod + mod) % mod : 0; 
    }


    /*2519. Count the Number of K-Big Indices (Hard)
    You are given a 0-indexed integer array nums and a positive integer k. We 
    call an index i k-big if the following conditions are satisfied:
    * There exist at least k different indices idx1 such that idx1 < i and 
      nums[idx1] < nums[i].
    * There exist at least k different indices idx2 such that idx2 > i and 
      nums[idx2] < nums[i].
    Return the number of k-big indices.

    Example 1:
    Input: nums = [2,3,6,5,2,3], k = 2
    Output: 2
    Explanation: There are only two 2-big indices in nums:
                 - i = 2 --> There are two valid idx1: 0 and 1. There are three 
                             valid idx2: 2, 3, and 4.
                 - i = 3 --> There are two valid idx1: 0 and 1. There are two 
                             valid idx2: 3 and 4.
    
    Example 2:
    Input: nums = [1,1,1], k = 3
    Output: 0
    Explanation: There are no 3-big indices in nums.

    Constraints:
    * 1 <= nums.length <= 10^5
    * 1 <= nums[i], k <= nums.length*/

    public int kBigIndices(int[] nums, int k) {
        int n = nums.length; 
        boolean[] prefix = new boolean[n]; 
        Queue<Integer> pq = new PriorityQueue(Collections.reverseOrder()); 
        for (int i = 0; i < n; ++i) {
            if (pq.size() == k && pq.peek() < nums[i]) prefix[i] = true; 
            pq.add(nums[i]); 
            if (pq.size() > k) pq.poll(); 
        }
        int ans = 0; 
        pq.clear(); 
        for (int i = n-1; i >= 0; --i) {
            if (pq.size() == k && pq.peek() < nums[i] && prefix[i]) ++ans; 
            pq.add(nums[i]); 
            if (pq.size() > k) pq.poll(); 
        }
        return ans; 
    }


    /*2520. Count the Digits That Divide a Number (Easy)
    Given an integer num, return the number of digits in num that divide num. 
    An integer val divides nums if nums % val == 0.

    Example 1:
    Input: num = 7
    Output: 1
    Explanation: 7 divides itself, hence the answer is 1.

    Example 2:
    Input: num = 121
    Output: 2
    Explanation: 121 is divisible by 1, but not 2. Since 1 occurs twice as a 
                 digit, we return 2.
    
    Example 3:
    Input: num = 1248
    Output: 4
    Explanation: 1248 is divisible by all of its digits, hence the answer is 4.

    Constraints:
    * 1 <= num <= 10^9
    * num does not contain 0 as one of its digits.*/

    public int countDigits(int num) {
        int ans = 0; 
        for (int n = num; n > 0; n /= 10) 
            if (num % (n % 10) == 0) ++ans; 
        return ans; 
    }


    /*2521. Distinct Prime Factors of Product of Array (Medium)
    Given an array of positive integers nums, return the number of distinct 
    prime factors in the product of the elements of nums. Note that:
    * A number greater than 1 is called prime if it is divisible by only 1 and 
      itself.
    * An integer val1 is a factor of another integer val2 if val2 / val1 is an 
      integer.

    Example 1:
    Input: nums = [2,4,3,7,10,6]
    Output: 4
    Explanation: The product of all the elements in nums is: 
                 2 * 4 * 3 * 7 * 10 * 6 = 10080 = 2^5 * 3^2 * 5 * 7.
                 There are 4 distinct prime factors so we return 4.
    
    Example 2:
    Input: nums = [2,4,8,16]
    Output: 1
    Explanation: The product of all the elements in nums is: 
                 2 * 4 * 8 * 16 = 1024 = 2^10.
                 There is 1 distinct prime factor so we return 1.

    Constraints:
    * 1 <= nums.length <= 10^4
    * 2 <= nums[i] <= 1000*/

    public int distinctPrimeFactors(int[] nums) {
        HashSet<Integer> seen = new HashSet(); 
        for (var x : nums) {
            for (int f = 2; f <= Math.sqrt(x); ++f) 
                for (; x % f == 0; x /= f) 
                    seen.add(f); 
            if (1 < x) seen.add(x);
        }
        return seen.size(); 
    }


    /*2522. Partition String Into Substrings With Values at Most K (Medium)
    You are given a string s consisting of digits from 1 to 9 and an integer k.
    A partition of a string s is called good if:
    * Each digit of s is part of exactly one substring.
    * The value of each substring is less than or equal to k.
    Return the minimum number of substrings in a good partition of s. If no 
    good partition of s exists, return -1. Note that:
    * The value of a string is its result when interpreted as an integer. For 
      example, the value of "123" is 123 and the value of "1" is 1.
    * A substring is a contiguous sequence of characters within a string.

    Example 1:
    Input: s = "165462", k = 60
    Output: 4
    Explanation: We can partition the string into substrings "16", "54", "6", 
                 and "2". Each substring has a value less than or equal to 
                 k = 60. It can be shown that we cannot partition the string 
                 into less than 4 substrings.
    
    Example 2:
    Input: s = "238182", k = 5
    Output: -1
    Explanation: There is no good partition for this string.

    Constraints:
    * 1 <= s.length <= 10^5
    * s[i] is a digit from '1' to '9'.
    * 1 <= k <= 10^9*/

    public int minimumPartition(String s, int k) {
        int ans = 1; 
        long val = 0; 
        for (var ch : s.toCharArray()) {
            if (10*val + (ch - '0') > k) {
                ++ans; 
                val = 0; 
            }
            val = 10*val + (ch - '0'); 
            if (val > k) return -1; 
        }
        return ans; 
    }


    /*2523. Closest Prime Numbers in Range (Medium)
    Given two positive integers left and right, find the two integers num1 and 
    num2 such that:
    * left <= nums1 < nums2 <= right .
    * nums1 and nums2 are both prime numbers.
    * nums2 - nums1 is the minimum amongst all other pairs satisfying the above 
      conditions.
    Return the positive integer array ans = [nums1, nums2]. If there are 
    multiple pairs satisfying these conditions, return the one with the minimum 
    nums1 value or [-1, -1] if such numbers do not exist. A number greater than 
    1 is called prime if it is only divisible by 1 and itself.

    Example 1:
    Input: left = 10, right = 19
    Output: [11,13]
    Explanation: The prime numbers between 10 and 19 are 11, 13, 17, and 19. 
                 The closest gap between any pair is 2, which can be achieved 
                 by [11,13] or [17,19]. Since 11 is smaller than 17, we return 
                 the first pair.
    
    Example 2:
    Input: left = 4, right = 6
    Output: [-1,-1]
    Explanation: There exists only one prime number in the given range, so the 
                 conditions cannot be satisfied.

    Constraints: 1 <= left <= right <= 10^6*/

    public int[] closestPrimes(int left, int right) {
        boolean[] sieve = new boolean[right+1]; 
        Arrays.fill(sieve, true); 
        sieve[0] = sieve[1] = false; 
        for (int x = 2; x <= Math.sqrt(right); ++x) 
            if (sieve[x]) 
                for (int xx = x*x; xx <= right; xx +=x) 
                    sieve[xx] = false; 
        int[] ans = {-1, -1}; 
        int prev = 0, least = Integer.MAX_VALUE; 
        for (int x = left; x <= right; ++x) 
            if (sieve[x]) {
                if (prev > 0 && x - prev < least) {
                    ans = new int[]{prev, x}; 
                    least = x - prev; 
                }
                prev = x; 
            }
        return ans; 
    }


    /*2524. Maximum Frequency Score of a Subarray (Hard)
    You are given an integer array nums and a positive integer k. The frequency 
    score of an array is the sum of the distinct values in the array raised to 
    the power of their frequencies, taking the sum modulo 10^9 + 7. For example, 
    the frequency score of the array [5,4,5,7,4,4] is 
    (4^3 + 5^2 + 7^1) modulo (10^9 + 7) = 96. Return the maximum frequency 
    score of a subarray of size k in nums. You should maximize the value under 
    the modulo and not the actual value. A subarray is a contiguous part of an 
    array.

    Example 1:
    Input: nums = [1,1,1,2,1,2], k = 3
    Output: 5
    Explanation: The subarray [2,1,2] has a frequency score equal to 5. It can 
                 be shown that it is the maximum frequency score we can have.
    
    Example 2:
    Input: nums = [1,1,1,1,1,1], k = 4
    Output: 1
    Explanation: All the subarrays of length 4 have a frequency score equal to 
                 1.

    Constraints:
    * 1 <= k <= nums.length <= 10^5
    * 1 <= nums[i] <= 10^6*/

    // private long pow(long x, int p, int m) {
    //     long ans = 1; 
    //     for (; p > 0; p >>= 1) {
    //         if (p % 2 == 1) ans = ans * x % m; 
    //         x = x * x % m; 
    //     }
    //     return ans; 
    // }
    
    public int maxFrequencyScore(int[] nums, int k) {
        final int mod = 1_000_000_007; 
        long ans = 0, val = 0; 
        HashMap<Integer, Integer> freq = new HashMap(); 
        for (int i = 0; i < nums.length; ++i) {
            if (freq.getOrDefault(nums[i], 0) > 0) val = (val - pow(nums[i], freq.get(nums[i]), mod)) % mod; 
            freq.merge(nums[i], 1, Integer::sum); 
            val = (val + pow(nums[i], freq.get(nums[i]), mod)) % mod; 
            if (i >= k) {
                val = (val - pow(nums[i-k], freq.get(nums[i-k]), mod)) % mod; 
                freq.merge(nums[i-k], -1, Integer::sum); 
                if (freq.getOrDefault(nums[i-k], 0) > 0) val = (val + pow(nums[i-k], freq.get(nums[i-k]), mod)) % mod; 
            }
            val = (val + mod) % mod; 
            if (i >= k-1) ans = Math.max(ans, val); 
        }
        return (int) ans; 
    }


    /*2525. Categorize Box According to Criteria (Easy)
    Given four integers length, width, height, and mass, representing the 
    dimensions and mass of a box, respectively, return a string representing 
    the category of the box. 
    * The box is "Bulky" if:
      + Any of the dimensions of the box is greater or equal to 104.
      + Or, the volume of the box is greater or equal to 109.
    * If the mass of the box is greater or equal to 100, it is "Heavy".
    * If the box is both "Bulky" and "Heavy", then its category is "Both".
    * If the box is neither "Bulky" nor "Heavy", then its category is "Neither".
    * If the box is "Bulky" but not "Heavy", then its category is "Bulky".
    * If the box is "Heavy" but not "Bulky", then its category is "Heavy".
    Note that the volume of the box is the product of its length, width and 
    height.

    Example 1:
    Input: length = 1000, width = 35, height = 700, mass = 300
    Output: "Heavy"
    Explanation: None of the dimensions of the box is greater or equal to 10^4. 
                 Its volume = 24500000 <= 109. So it cannot be categorized as 
                 "Bulky". However mass >= 100, so the box is "Heavy". Since the 
                 box is not "Bulky" but "Heavy", we return "Heavy". 
    
    Example 2:
    Input: length = 200, width = 50, height = 800, mass = 50
    Output: "Neither"
    Explanation: None of the dimensions of the box is greater or equal to 10^4.
                 Its volume = 8 * 106 <= 109. So it cannot be categorized as 
                 "Bulky". Its mass is also less than 100, so it cannot be 
                 categorized as "Heavy" either.  Since its neither of the two 
                 above categories, we return "Neither".

    Constraints:
    * 1 <= length, width, height <= 10^5
    * 1 <= mass <= 10^3*/

    public String categorizeBox(int length, int width, int height, int mass) {
        boolean bulky = Math.max(length, Math.max(width, height)) >= 1e4 || (long) length*width*height >= 1e9, heavy = mass >= 100; 
        if (bulky && heavy) return "Both"; 
        if (bulky) return "Bulky"; 
        if (heavy) return "Heavy"; 
        return "Neither"; 
    }


    /*2527. Find Xor-Beauty of Array (Medium)
    You are given a 0-indexed integer array nums. The effective value of three 
    indices i, j, and k is defined as ((nums[i] | nums[j]) & nums[k]). The xor-
    beauty of the array is the XORing of the effective values of all the 
    possible triplets of indices (i, j, k) where 0 <= i, j, k < n. Return the 
    xor-beauty of nums. Note that:
    * val1 | val2 is bitwise OR of val1 and val2.
    * val1 & val2 is bitwise AND of val1 and val2.

    Example 1:
    Input: nums = [1,4]
    Output: 5
    Explanation: The triplets and their corresponding effective values are 
                 listed below:
                 - (0,0,0) with effective value ((1 | 1) & 1) = 1
                 - (0,0,1) with effective value ((1 | 1) & 4) = 0
                 - (0,1,0) with effective value ((1 | 4) & 1) = 1
                 - (0,1,1) with effective value ((1 | 4) & 4) = 4
                 - (1,0,0) with effective value ((4 | 1) & 1) = 1
                 - (1,0,1) with effective value ((4 | 1) & 4) = 4
                 - (1,1,0) with effective value ((4 | 4) & 1) = 0
                 - (1,1,1) with effective value ((4 | 4) & 4) = 4 
                 Xor-beauty of array will be bitwise XOR of all beauties = 
                 1 ^ 0 ^ 1 ^ 4 ^ 1 ^ 4 ^ 0 ^ 4 = 5.
    
    Example 2:
    Input: nums = [15,45,20,2,34,35,5,44,32,30]
    Output: 34
    Explanation: The xor-beauty of the given array is 34.

    Constraints:
    1 <= nums.length <= 10^5
    1 <= nums[i] <= 10^9*/

    public int xorBeauty(int[] nums) {
        int val = 0; 
        for (int x : nums) val ^= x; 
        return (val | val) & val; 
    }


    /*2528. Maximize the Minimum Powered City (Hard)
    You are given a 0-indexed integer array stations of length n, where 
    stations[i] represents the number of power stations in the ith city. Each 
    power station can provide power to every city in a fixed range. In other 
    words, if the range is denoted by r, then a power station at city i can 
    provide power to all cities j such that |i - j| <= r and 0 <= i, j <= n - 1.
    * Note that |x| denotes absolute value. For example, |7 - 5| = 2 and 
      |3 - 10| = 7.
    The power of a city is the total number of power stations it is being 
    provided power from. The government has sanctioned building k more power 
    stations, each of which can be built in any city, and have the same range 
    as the pre-existing ones. Given the two integers r and k, return the 
    maximum possible minimum power of a city, if the additional power stations 
    are built optimally. Note that you can build the k power stations in 
    multiple cities.

    Example 1:
    Input: stations = [1,2,4,5,0], r = 1, k = 2
    Output: 5
    Explanation: One of the optimal ways is to install both the power stations 
                 at city 1. So stations will become [1,4,4,5,0].
                 - City 0 is provided by 1 + 4 = 5 power stations.
                 - City 1 is provided by 1 + 4 + 4 = 9 power stations.
                 - City 2 is provided by 4 + 4 + 5 = 13 power stations.
                 - City 3 is provided by 5 + 4 = 9 power stations.
                 - City 4 is provided by 5 + 0 = 5 power stations.
                 So the minimum power of a city is 5. Since it is not possible 
                 to obtain a larger power, we return 5.
    
    Example 2:
    Input: stations = [4,4,4,4], r = 0, k = 3
    Output: 4
    Explanation: It can be proved that we cannot make the minimum power of a 
                 city greater than 4.

    Constraints:
    * n == stations.length
    * 1 <= n <= 10^5
    * 0 <= stations[i] <= 10^5
    * 0 <= r <= n - 1
    * 0 <= k <= 10^9*/

    public long maxPower(int[] stations, int r, int k) {
        int n = stations.length; 
        long lo = 0, hi = k + Arrays.stream(stations).asLongStream().sum();
        while (lo < hi) {
            long mid = lo + (hi-lo+1)/2, prefix = 0; 
            int kk = k; 
            int[] ss = stations.clone(); 
            boolean ok = true; 
            for (int i = 0; i < n+r; ++i) {
                if (i < n) prefix += ss[i]; 
                if (i >= 2*r+1) prefix -= ss[i-2*r-1]; 
                if (i >= r && prefix < mid) {
                    if (kk < mid - prefix) {
                        ok = false; 
                        break; 
                    }
                    kk -= mid - prefix; 
                    if (i < n) ss[i] += mid - prefix; 
                    prefix = mid; 
                }
            }
            if (ok) lo = mid; 
            else hi = mid - 1; 
        }
        return lo; 
    }
}


/*2502. Design Memory Allocator (Medium)
You are given an integer n representing the size of a 0-indexed memory array. 
All memory units are initially free. You have a memory allocator with the 
following functionalities:
* Allocate a block of size consecutive free memory units and assign it the id 
  mID.
* Free all memory units with the given id mID.
Note that:
* Multiple blocks can be allocated to the same mID.
* You should free all the memory units with mID, even if they were allocated in 
  different blocks.
Implement the Allocator class:
* Allocator(int n) Initializes an Allocator object with a memory array of size 
  n.
* int allocate(int size, int mID) Find the leftmost block of size consecutive 
  free memory units and allocate it with the id mID. Return the block's first 
  index. If such a block does not exist, return -1.
* int free(int mID) Free all memory units with the id mID. Return the number of 
  memory units you have freed.

Example 1:
Input: ["Allocator", "allocate", "allocate", "allocate", "free", "allocate", "allocate", "allocate", "free", "allocate", "free"]
       [[10], [1, 1], [1, 2], [1, 3], [2], [3, 4], [1, 1], [1, 1], [1], [10, 2], [7]]
Output: [null, 0, 1, 2, 1, 3, 1, 6, 3, -1, 0]
Explanation: 
Allocator loc = new Allocator(10); // Initialize a memory array of size 10. All memory units are initially free.
loc.allocate(1, 1); // The leftmost block's first index is 0. The memory array becomes [1,_,_,_,_,_,_,_,_,_]. We return 0.
loc.allocate(1, 2); // The leftmost block's first index is 1. The memory array becomes [1,2,_,_,_,_,_,_,_,_]. We return 1.
loc.allocate(1, 3); // The leftmost block's first index is 2. The memory array becomes [1,2,3,_,_,_,_,_,_,_]. We return 2.
loc.free(2); // Free all memory units with mID 2. The memory array becomes [1,_, 3,_,_,_,_,_,_,_]. We return 1 since there is only 1 unit with mID 2.
loc.allocate(3, 4); // The leftmost block's first index is 3. The memory array becomes [1,_,3,4,4,4,_,_,_,_]. We return 3.
loc.allocate(1, 1); // The leftmost block's first index is 1. The memory array becomes [1,1,3,4,4,4,_,_,_,_]. We return 1.
loc.allocate(1, 1); // The leftmost block's first index is 6. The memory array becomes [1,1,3,4,4,4,1,_,_,_]. We return 6.
loc.free(1); // Free all memory units with mID 1. The memory array becomes [_,_,3,4,4,4,_,_,_,_]. We return 3 since there are 3 units with mID 1.
loc.allocate(10, 2); // We can not find any free block with 10 consecutive free memory units, so we return -1.
loc.free(7); // Free all memory units with mID 7. The memory array remains the same since there is no memory unit with mID 7. We return 0.

Constraints:
* 1 <= n, size, mID <= 1000
* At most 1000 calls will be made to allocate and free.*/

class Allocator {
    private int[] memory; 
    
    public Allocator(int n) {
        memory = new int[n]; 
    }
    
    public int allocate(int size, int mID) {
        int cnt = 0; 
        for (int i = 0; i < memory.length; ++i) {
            if (memory[i] == 0) {
                if (++cnt == size) {
                    for (int ii = i; ii >= i-size+1; --ii) 
                        memory[ii] = mID; 
                    return i-size+1; 
                }
            } else cnt = 0; 
        }
        return -1; 
    }
    
    public int free(int mID) {
        int ans = 0; 
        for (int i = 0; i < memory.length; ++i) 
            if (memory[i] == mID) {
                ++ans; 
                memory[i] = 0; 
            }
        return ans; 
    }
}


/*2526. Find Consecutive Integers from a Data Stream (Medium)
For a stream of integers, implement a data structure that checks if the last k 
integers parsed in the stream are equal to value. Implement the DataStream 
class:
* DataStream(int value, int k) Initializes the object with an empty integer 
  stream and the two integers value and k.
* boolean consec(int num) Adds num to the stream of integers. Returns true if 
  the last k integers are equal to value, and false otherwise. If there are 
  less than k integers, the condition does not hold true, so returns false.

Example 1:
Input: ["DataStream", "consec", "consec", "consec", "consec"]
       [[4, 3], [4], [4], [4], [3]]
Output: [null, false, false, true, false]
Explanation: 
DataStream dataStream = new DataStream(4, 3); //value = 4, k = 3 
dataStream.consec(4); // Only 1 integer is parsed, so returns False. 
dataStream.consec(4); // Only 2 integers are parsed.
                      // Since 2 is less than k, returns False. 
dataStream.consec(4); // The 3 integers parsed are all equal to value, so returns True. 
dataStream.consec(3); // The last k integers parsed in the stream are [4,4,3].
                      // Since 3 is not equal to value, it returns False.
 
Constraints:
* 1 <= value, num <= 10^9
* 1 <= k <= 10^5
* At most 10^5 calls will be made to consec.*/

class DataStream {
    private int value = 0, k = 0, cnt = 0; 

    public DataStream(int value, int k) {
        this.value = value; 
        this.k = k; 
    }
    
    public boolean consec(int num) {
        if (value == num) ++cnt; 
        else cnt = 0; 
        return cnt >= k; 
    }
}