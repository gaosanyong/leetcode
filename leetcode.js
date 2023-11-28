
/*2648. Generate Fibonacci Sequence (Easy)
Write a generator function that returns a generator object which yields the 
fibonacci sequence. The fibonacci sequence is defined by the relation 
Xn = Xn-1 + Xn-2. The first few numbers of the series are 
0, 1, 1, 2, 3, 5, 8, 13.

Example 1:
Input: callCount = 5
Output: [0,1,1,2,3]
Explanation: const gen = fibGenerator();
             gen.next().value; // 0
             gen.next().value; // 1
             gen.next().value; // 1
             gen.next().value; // 2
             gen.next().value; // 3

Example 2:
Input: callCount = 0
Output: []
Explanation: gen.next() is never called so nothing is outputted

Constraints: 0 <= callCount <= 50*/

var fibGenerator = function*() {
    let f0 = 0, f1 = 1;
    while (true) {
        yield f0;
        [f0, f1] = [f1, f0+f1];
    }
};


/*2946. Matrix Similarity After Cyclic Shifts (Easy)
You are given a 0-indexed m x n integer matrix mat and an integer k. You 
have to cyclically right shift odd indexed rows k times and cyclically left 
shift even indexed rows k times. Return true if the initial and final 
matrix are exactly the same and false otherwise.

Example 1:
Input: mat = [[1,2,1,2],[5,5,5,5],[6,3,6,3]], k = 2
Output: true
Explanation: Initially, the matrix looks like the first figure. Second 
             figure represents the state of the matrix after one right and 
             left cyclic shifts to even and odd indexed rows. Third figure 
             is the final state of the matrix after two cyclic shifts which 
             is similar to the initial matrix. Therefore, return true.

Example 2:
Input: mat = [[2,2],[2,2]], k = 3
Output: true
Explanation: As all the values are equal in the matrix, even after 
             performing cyclic shifts the matrix will remain the same. 
             Therefeore, we return true.

Example 3:
Input: mat = [[1,2]], k = 1
Output: false
Explanation: After one cyclic shift, mat = [[2,1]] which is not equal to 
             the initial matrix. Therefore we return false.

Constraints:
* 1 <= mat.length <= 25
* 1 <= mat[i].length <= 25
* 1 <= mat[i][j] <= 25
* 1 <= k <= 50*/

var areSimilar = function(mat, k) {
    for (var row of mat) 
        for (var j = 0, n = row.length; j < n; ++j) 
            if (row[j] != row[(j+k) % n]) return false; 
    return true; 
};


/*2947. Count Beautiful Substrings I (Medium)
You are given a string s and a positive integer k. Let vowels and 
consonants be the number of vowels and consonants in a string. A string is 
beautiful if:
* vowels == consonants.
* (vowels * consonants) % k == 0, in other terms the multiplication of 
  vowels and consonants is divisible by k.
Return the number of non-empty beautiful substrings in the given string s.
A substring is a contiguous sequence of characters in a string. Vowel 
letters in English are 'a', 'e', 'i', 'o', and 'u'. Consonant letters in 
English are every letter except vowels. 

Example 1:
Input: s = "baeyh", k = 2
Output: 2
Explanation: There are 2 beautiful substrings in the given string.
             - Substring "baeyh", vowels = 2 (["a",e"]), 
               consonants = 2 (["y","h"]). You can see that string "aeyh" 
               is beautiful as vowels == consonants and 
               vowels * consonants % k == 0.
             - Substring "baeyh", vowels = 2 (["a",e"]), 
               consonants = 2 (["b","y"]). You can see that string "baey" 
               is beautiful as vowels == consonants and 
               vowels * consonants % k == 0.
             It can be shown that there are only 2 beautiful substrings in 
             the given string.

Example 2:
Input: s = "abba", k = 1
Output: 3
Explanation: There are 3 beautiful substrings in the given string.
             - Substring "abba", vowels = 1 (["a"]), consonants = 1 (["b"]). 
             - Substring "abba", vowels = 1 (["a"]), consonants = 1 (["b"]).
             - Substring "abba", vowels = 2 (["a","a"]), 
               consonants = 2 (["b","b"]).
             It can be shown that there are only 3 beautiful substrings in 
             the given string.

Example 3:
Input: s = "bcdf", k = 1
Output: 0
Explanation: There are no beautiful substrings in the given string.

Constraints:
* 1 <= s.length <= 1000
* 1 <= k <= 1000
* s consists of only English lowercase letters.*/

var beautifulSubstrings = function(s, k) {
    let ans = 0; 
    for (var i = 0, n = s.length; i < n; ++i) {
        let vowels = 0, consonants = 0; 
        for (var j = i; j < n; ++j) {
            if ("aeiou".includes(s[j])) ++vowels; 
            else ++consonants; 
            if (vowels == consonants && vowels * consonants % k == 0) ++ans; 
        }
    }
    return ans; 
};


/*2948. Make Lexicographically Smallest Array by Swapping Elements (Medium)
You are given a 0-indexed array of positive integers nums and a positive 
integer limit. In one operation, you can choose any two indices i and j and 
swap nums[i] and nums[j] if |nums[i] - nums[j]| <= limit. Return the 
lexicographically smallest array that can be obtained by performing the 
operation any number of times. An array a is lexicographically smaller than 
an array b if in the first position where a and b differ, array a has an 
element that is less than the corresponding element in b. For example, the 
array [2,10,3] is lexicographically smaller than the array [10,2,3] because 
they differ at index 0 and 2 < 10. 

Example 1:
Input: nums = [1,5,3,9,8], limit = 2
Output: [1,3,5,8,9]
Explanation: Apply the operation 2 times:
             - Swap nums[1] with nums[2]. The array becomes [1,3,5,9,8]
             - Swap nums[3] with nums[4]. The array becomes [1,3,5,8,9]
             We cannot obtain a lexicographically smaller array by applying 
             any more operations. Note that it may be possible to get the 
             same result by doing different operations.

Example 2:
Input: nums = [1,7,6,18,2,1], limit = 3
Output: [1,6,7,18,1,2]
Explanation: Apply the operation 3 times:
             - Swap nums[1] with nums[2]. The array becomes [1,6,7,18,2,1]
             - Swap nums[0] with nums[4]. The array becomes [2,6,7,18,1,1]
             - Swap nums[0] with nums[5]. The array becomes [1,6,7,18,1,2]
             We cannot obtain a lexicographically smaller array by applying 
             any more operations.

Example 3:
Input: nums = [1,7,28,19,10], limit = 3
Output: [1,7,28,19,10]
Explanation: [1,7,28,19,10] is the lexicographically smallest array we can 
             obtain because we cannot apply the operation on any two 
             indices.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^9
* 1 <= limit <= 10^9*/

var lexicographicallySmallestArray = function(nums, limit) {
    let vals = []; 
    for (const [i, x] of nums.entries()) vals.push([x, i]); 
    vals.sort((x, y) => x[0]-y[0]); 
    let idx = [], kk = 0; 
    for (const [k, [x, i]] of vals.entries()) {
        idx.push(i); 
        if (k == vals.length-1 || x+limit < vals[k+1][0]) {
            idx.sort((x, y) => x-y); 
            for (var j = 0; j < idx.length; ++j) nums[idx[j]] = vals[kk+j][0]; 
            idx.length = 0; 
            kk = k+1; 
        }
    }
    return nums; 
};


/*2949. Count Beautiful Substrings II (Hard)
You are given a string s and a positive integer k. Let vowels and 
consonants be the number of vowels and consonants in a string. A string is 
beautiful if:
* vowels == consonants.
* (vowels * consonants) % k == 0, in other terms the multiplication of 
  vowels and consonants is divisible by k.
Return the number of non-empty beautiful substrings in the given string s.
A substring is a contiguous sequence of characters in a string. Vowel 
letters in English are 'a', 'e', 'i', 'o', and 'u'. Consonant letters in 
English are every letter except vowels.

Example 1:
Input: s = "baeyh", k = 2
Output: 2
Explanation: There are 2 beautiful substrings in the given string.
             - Substring "baeyh", vowels = 2 (["a",e"]), 
               consonants = 2 (["y","h"]). You can see that string "aeyh" 
               is beautiful as vowels == consonants and 
               vowels * consonants % k == 0.
             - Substring "baeyh", vowels = 2 (["a",e"]), 
               consonants = 2 (["b","y"]). You can see that string "baey" 
               is beautiful as vowels == consonants and 
               vowels * consonants % k == 0.
             It can be shown that there are only 2 beautiful substrings in 
             the given string.

Example 2:
Input: s = "abba", k = 1
Output: 3
Explanation: There are 3 beautiful substrings in the given string.
             - Substring "abba", vowels = 1 (["a"]), consonants = 1 (["b"]).
             - Substring "abba", vowels = 1 (["a"]), consonants = 1 (["b"]).
             - Substring "abba", vowels = 2 (["a","a"]), consonants = 2 
               (["b","b"]).
             It can be shown that there are only 3 beautiful substrings in 
             the given string.

Example 3:
Input: s = "bcdf", k = 1
Output: 0
Explanation: There are no beautiful substrings in the given string.
 
Constraints:
* 1 <= s.length <= 5 * 10^4
* 1 <= k <= 1000
* s consists of only English lowercase letters.*/

var beautifulSubstrings = function(s, k) {
    for (var n = 1; n <= k; ++n) 
        if (n * n % k === 0) break; 
    n *= 2; 
    const seen = Array(n).fill().map(() => new Map());
    seen[n-1].set(0, 1); 
    let ans = 0, diff = 0; 
    for (const [i, ch] of s.split('').entries()) {
        if ("aeiou".includes(ch)) ++diff; 
        else --diff; 
        if (!(seen[i%n].has(diff))) seen[i%n].set(diff, 0); 
        ans += seen[i%n].get(diff); 
        seen[i%n].set(diff, seen[i%n].get(diff) + 1); 
    }
    return ans; 
};