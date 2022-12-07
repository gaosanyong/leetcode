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
                 "aaa". The letter 'a' in the substring appears exactly 3 
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
}