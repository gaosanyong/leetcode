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
}