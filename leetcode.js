
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


/*2937. Make Three Strings Equal (Easy)
You are given three strings s1, s2, and s3. You have to perform the 
following operation on these three strings as many times as you want. In 
one operation you can choose one of these three strings such that its 
length is at least 2 and delete the rightmost character of it. Return the 
minimum number of operations you need to perform to make the three strings 
equal if there is a way to make them equal, otherwise, return -1.

Example 1:
Input: s1 = "abc", s2 = "abb", s3 = "ab"
Output: 2
Explanation: Performing operations on s1 and s2 once will lead to three 
             equal strings. It can be shown that there is no way to make 
             them equal with less than two operations.

Example 2:
Input: s1 = "dac", s2 = "bac", s3 = "cac"
Output: -1
Explanation: Because the leftmost letters of s1 and s2 are not equal, they 
             could not be equal after any number of operations. So the 
             answer is -1.

Constraints:
* 1 <= s1.length, s2.length, s3.length <= 100
* s1, s2 and s3 consist only of lowercase English letters.*/

var findMinimumOperations = function(s1, s2, s3) {
    let i = 0; 
    for (let m = Math.min(s1.length, s2.length, s3.length); i < m && s1[i] == s2[i] && s2[i] == s3[i]; ++i); 
    return i > 0 ? s1.length + s2.length + s3.length - 3*i : -1; 
};


/*2938. Separate Black and White Balls (Medium)
There are n balls on a table, each ball has a color black or white. You are 
given a 0-indexed binary string s of length n, where 1 and 0 represent 
black and white balls, respectively. In each step, you can choose two 
adjacent balls and swap them. Return the minimum number of steps to group 
all the black balls to the right and all the white balls to the left.

Example 1:
Input: s = "101"
Output: 1
Explanation: We can group all the black balls to the right in the following 
             way:
             - Swap s[0] and s[1], s = "011".
             Initially, 1s are not grouped together, requiring at least 1 
             step to group them to the right.

Example 2:
Input: s = "100"
Output: 2
Explanation: We can group all the black balls to the right in the following 
             way:
             - Swap s[0] and s[1], s = "010".
             - Swap s[1] and s[2], s = "001".
             It can be proven that the minimum number of steps needed is 2.

Example 3:
Input: s = "0111"
Output: 0
Explanation: All the black balls are already grouped to the right.

Constraints:
* 1 <= n == s.length <= 10^5
* s[i] is either '0' or '1'.*/

var minimumSteps = function(s) {
    let ans = 0, prefix = 0; 
    for (const ch of s) 
        if (ch == '1') ++prefix; 
        else ans += prefix; 
    return ans;
};


/*2939. Maximum Xor Product (Medium)
Given three integers a, b, and n, return the maximum value of 
(a XOR x) * (b XOR x) where 0 <= x < 2n. Since the answer may be too large, 
return it modulo 10^9 + 7. Note that XOR is the bitwise XOR operation.

Example 1:
Input: a = 12, b = 5, n = 4
Output: 98
Explanation: For x = 2, (a XOR x) = 14 and (b XOR x) = 7. Hence, 
             (a XOR x) * (b XOR x) = 98. It can be shown that 98 is the 
             maximum value of (a XOR x) * (b XOR x) for all 0 <= x < 2n.

Example 2:
Input: a = 6, b = 7 , n = 5
Output: 930
Explanation: For x = 25, (a XOR x) = 31 and (b XOR x) = 30. Hence, 
             (a XOR x) * (b XOR x) = 930. It can be shown that 930 is the 
             maximum value of (a XOR x) * (b XOR x) for all 0 <= x < 2n.

Example 3:
Input: a = 1, b = 6, n = 3
Output: 12
Explanation: For x = 5, (a XOR x) = 4 and (b XOR x) = 3. Hence, 
             (a XOR x) * (b XOR x) = 12. It can be shown that 12 is the 
             maximum value of (a XOR x) * (b XOR x) for all 0 <= x < 2n.

Constraints:
* 0 <= a, b < 2^50
* 0 <= n <= 50*/

var maximumXorProduct = function(a, b, n) {
    const mod = 1_000_000_007n; 
    let aa = BigInt(a), bb = BigInt(b); 
    for (let i = BigInt(n)-1n; i >= 0n; --i) 
        if (aa >= bb && (bb & 1n<<i) == 0 || aa < bb && (aa & 1n<<i) == 0) {
            aa ^= 1n<<i; 
            bb ^= 1n<<i; 
        }
    return aa % mod * (bb % mod) % mod; 
};


/*2940. Find Building Where Alice and Bob Can Meet (Hard)
You are given a 0-indexed array heights of positive integers, where 
heights[i] represents the height of the ith building. If a person is in 
building i, they can move to any other building j if and only if i < j and 
heights[i] < heights[j]. You are also given another array queries where 
queries[i] = [ai, bi]. On the ith query, Alice is in building ai while Bob 
is in building bi. Return an array ans where ans[i] is the index of the 
leftmost building where Alice and Bob can meet on the ith query. If Alice 
and Bob cannot move to a common building on query i, set ans[i] to -1.

Example 1:
Input: heights = [6,4,8,5,2,7], queries = [[0,1],[0,3],[2,4],[3,4],[2,2]]
Output: [2,5,-1,5,2]
Explanation: - In the first query, Alice and Bob can move to building 2 
               since heights[0] < heights[2] and heights[1] < heights[2]. 
             - In the second query, Alice and Bob can move to building 5 
               since heights[0] < heights[5] and heights[3] < heights[5]. 
             - In the third query, Alice cannot meet Bob since Alice cannot 
               move to any other building.
             - In the fourth query, Alice and Bob can move to building 5 
               since heights[3] < heights[5] and heights[4] < heights[5].
             - In the fifth query, Alice and Bob are already in the same 
               building.  
             For ans[i] != -1, It can be shown that ans[i] is the leftmost 
             building where Alice and Bob can meet. For ans[i] == -1, It 
             can be shown that there is no building where Alice and Bob can 
             meet.

Example 2:
Input: heights = [5,3,8,2,6,1,4,6], queries = [[0,7],[3,5],[5,2],[3,0],[1,6]]
Output: [7,6,-1,4,6]
Explanation: - In the first query, Alice can directly move to Bob's 
               building since heights[0] < heights[7].
             - In the second query, Alice and Bob can move to building 6 
               since heights[3] < heights[6] and heights[5] < heights[6].
             - In the third query, Alice cannot meet Bob since Bob cannot 
               move to any other building.
             - In the fourth query, Alice and Bob can move to building 4 
               since heights[3] < heights[4] and heights[0] < heights[4].
             - In the fifth query, Alice can directly move to Bob's 
               building since heights[1] < heights[6].
             For ans[i] != -1, It can be shown that ans[i] is the leftmost 
             building where Alice and Bob can meet. For ans[i] == -1, It 
             can be shown that there is no building where Alice and Bob can 
             meet.

Constraints:
* 1 <= heights.length <= 5 * 10^4
* 1 <= heights[i] <= 10^9
* 1 <= queries.length <= 5 * 10^4
* queries[i] = [ai, bi]
* 0 <= ai, bi <= heights.length - 1*/

var leftmostBuildingQueries = function(heights, queries) {
    const m = heights.length, n = queries.length; 
    const qs = Array(m).fill().map(() => []); 
    const ans = Array(n).fill(-1); 
    for (let [i, [a, b]] of queries.entries()) {
        if (a > b) { var temp = a; a = b; b = temp; }
        if (a == b || heights[a] < heights[b]) ans[i] = b; 
        else qs[b].push([heights[a], i]); 
    }
    const pq = new PriorityQueue({ compare: (x, y) => x[0]-y[0] }); 
    for (const[k, x] of heights.entries()) {
        while (pq.size() && pq.front()[0] < x) {
            const [_, i] = pq.dequeue(); 
            ans[i] = k; 
        }
        for (var elem of qs[k]) pq.enqueue(elem); 
    }
    return ans; 
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