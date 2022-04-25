class Solution:

	"""5259. Calculate Amount Paid in Taxes (Easy)
	You are given a 2D integer array brackets where 
	brackets[i] = [upperi, percenti] means that the ith tax bracket has an 
	upper bound of upperi and is taxed at a rate of percenti. The lower bound 
	of the first tax bracket is 0, and the lower bound of the other tax 
	brackets is upperi - 1 + 1. This means that every dollar made between the 
	lower and upper bound (inclusive) of a tax bracket is taxed the tax rate of 
	the tax bracket. You are also given an integer income representing the 
	amount of money you earned that year. Return the amount of money that you 
	have to pay in taxes this year. Answers within 10-5 of the actual answer 
	will be accepted.

	Example 1:
	Input: brackets = [[3,50],[7,10],[12,25]], income = 10
	Output: 2.65000
	Explanation: Dollars $1-3 you earn are taxed at 50%. You have to pay 
	             $3 * 50% = $1.5 dollars in taxes. Dollars $4-7 you earn are 
	             taxed at 10%. You have to pay $4 * 10% = $0.4 dollars in taxes.
	             Dollars $8-10 you earn are taxed at 25%. You have to pay 
	             $3 * 25% = $0.75 dollars in taxes. You have to pay a total of 
	             $1.5 + $0.4 + $0.75 = $2.65 dollars in taxes.
	
	Example 2:
	Input: brackets = [[1,0],[4,25],[5,50]], income = 2
	Output: 0.25000
	Explanation: Dollars $1-1 you earn are taxed at 0%. You have to pay 
	             $1 * 0% = $0 dollars in taxes. Dollars $2-2 you earn are taxed 
	             at 25%. You have to pay $1 * 25% = $0.25 dollars in taxes. You 
	             have to pay a total of $0 + $0.25 = $0.25 dollars in taxes.
	
	Example 3:
	Input: brackets = [[2,50]], income = 0
	Output: 0.00000
	Explanation: Dollars $0-0 you earn are taxed at 50%. You have to pay 
	             $0 * $50% = $0 dollars in taxes. You have to pay a total of $0 
	             dollars in taxes.

	Constraints:
	* 1 <= brackets.length <= 100
	* 1 <= upperi <= 1000
	* 0 <= percenti <= 100
	* 0 <= income <= 1000
	* upperi is sorted in ascending order.
	* All the values of upperi are unique.
	* The upper bound of the last tax bracket is greater than or equal to 
	  income."""

    def calculateTax(self, brackets: List[List[int]], income: int) -> float:
        ans = prev = 0 
        for hi, pct in brackets: 
            hi = min(hi, income)
            ans += (hi - prev)*pct/100
            prev = hi 
        return ans 


    """5289. Fair Distribution of Cookies (Medium)
	You are given a 0-indexed integer array cookies, where cookies[i] denotes 
	the number of cookies in the ith bag. You are also given an integer k which 
	denotes the number of children to distribute all the bags of cookies to. 
	All the cookies in the same bag must go to the same child and cannot be 
	split up. The unfairness of a distribution is defined as the maximum total 
	cookies obtained by a single child in the distribution. Return the minimum 
	unfairness of all distributions.

	Example 1:
	Input: cookies = [8,15,10,20,8], k = 2
	Output: 31
	Explanation: One optimal distribution is [8,15,8] and [10,20]
	             - The 1st child receives [8,15,8] which has a total of 
	               8 + 15 + 8 = 31 cookies.
	             - The 2nd child receives [10,20] which has a total of 
	               10 + 20 = 30 cookies.
	             The unfairness of the distribution is max(31,30) = 31. It can 
	             be shown that there is no distribution with an unfairness less 
	             than 31.
	
	Example 2:
	Input: cookies = [6,1,3,2,2,4,1,2], k = 3
	Output: 7
	Explanation: One optimal distribution is [6,1], [3,2,2], and [4,1,2]
	             - The 1st child receives [6,1] which has a total of 
	               6 + 1 = 7 cookies.
	             - The 2nd child receives [3,2,2] which has a total of 
	               3 + 2 + 2 = 7 cookies.
	             - The 3rd child receives [4,1,2] which has a total of 
	               4 + 1 + 2 = 7 cookies.
	             The unfairness of the distribution is max(7,7,7) = 7. It can 
	             be shown that there is no distribution with an unfairness less 
	             than 7.

	Constraints:
	* 2 <= cookies.length <= 8
	* 1 <= cookies[i] <= 10^5
	* 2 <= k <= cookies.length"""

    def distributeCookies(self, cookies: List[int], k: int) -> int:
        n = len(cookies)
        
        @cache
        def fn(mask, k):
            """Return min unfairness of distributing cookies marked by mask to 
               k children."""
            if mask == 0: return 0 
            if k == 0: return inf
            ans = inf 
            orig = mask 
            while mask: 
                mask = orig & (mask - 1)
                amt = sum(cookies[i] for i in range(n) if (orig ^ mask) & 1<<i)
                ans = min(ans, max(amt, fn(mask, k-1)))
            return ans 
        
        return fn((1<<n)-1, k)


    """5270. Minimum Path Cost in a Grid (Medium)
	You are given an m x n integer matrix grid consisting of distinct integers 
	from 0 to m * n - 1. You can move in this matrix from a cell to any other 
	cell in the next row. That is, if you are in cell (x, y) such that x < m-1, 
	you can move to any of the cells (x+1, 0), (x+1, 1), ..., (x+1, n-1). Note 
	that it is not possible to move from cells in the last row. Each possible 
	move has a cost given by a 2D array moveCost of size (m * n) x n, where 
	moveCost[i][j] is the cost of moving from a cell with value i to any cell 
	in column j. The cost of moving from cells in the last row of grid can be 
	ignored. The cost of a path in grid is the sum of all values of cells 
	visited plus the sum of costs of all the moves made. Return the minimum 
	cost of a path that starts from any cell in the first row and ends at any 
	cell in the last row.

	Example 1:
	Input: grid = [[5,3],[3,0],[2,1]], 
	       moveCost = [[9,8],[1,5],[10,12],[18,6],[2,4],[14,3]]
	Output: 20
	Explanation: The path with the minimum possible cost is the path 5 -> 0 -> 1.
 	             - The cost of moving from 5 to 0 is 3.
 	             - The cost of moving from 0 to 1 is 8.
 	             So the total cost of the path is 5 + 3 + 0 + 8 + 1 = 20.
	
	Example 2:
	Input: grid = [[5,1,2],[4,0,3]], 
	       moveCost = [[12,10,15],[20,23,8],[21,7,1],[8,1,13],[9,10,25],[5,3,2]]
	Output: 8
	Explanation: The path with the minimum possible cost is the path 2 -> 3.
	             - The cost of moving from 2 to 3 is 1.
	             So the total cost of this path is 2 + 1 + 3 = 8.

	Constraints:
	* m == grid.length
	* n == grid[i].length
	* 2 <= m, n <= 100
	* moveCost.length == m * n
	* moveCost[i].length == n
	* 1 <= moveCost[i][j] <= 100
	* grid consists of distinct integers from 0 to m * n - 1."""

    def minPathCost(self, grid: List[List[int]], moveCost: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        
        @cache
        def fn(i, j):
            """Return min cost of moving from (i, j) to bottom row."""
            if i == m-1: return grid[i][j]
            ans = inf 
            for jj in range(n): 
                ans = min(ans, grid[i][j] + fn(i+1, jj) + moveCost[grid[i][j]][jj])
            return ans 
        
        return min(fn(0, j) for j in range(n))


    """6094. Naming a Company (Hard)
	You are given an array of strings ideas that represents a list of names to 
	be used in the process of naming a company. The process of naming a company 
	is as follows:
	* Choose 2 distinct names from ideas, call them ideaA and ideaB.
	* Swap the first letters of ideaA and ideaB with each other.
	* If both of the new names are not found in the original ideas, then the 
	  name ideaA ideaB (the concatenation of ideaA and ideaB, separated by a 
	  space) is a valid company name.
	* Otherwise, it is not a valid name.
	Return the number of distinct valid names for the company.

	Example 1:
	Input: ideas = ["coffee","donuts","time","toffee"]
	Output: 6
	Explanation: The following selections are valid:
	    - ("coffee", "donuts"): The company name created is "doffee conuts".
	    - ("donuts", "coffee"): The company name created is "conuts doffee".
	    - ("donuts", "time"): The company name created is "tonuts dime".
	    - ("donuts", "toffee"): The company name created is "tonuts doffee".
	    - ("time", "donuts"): The company name created is "dime tonuts".
	    - ("toffee", "donuts"): The company name created is "doffee tonuts".
	    Therefore, there are a total of 6 distinct company names. The following 
	    are some examples of invalid selections:
	    - ("coffee", "time"): The name "toffee" formed after swapping already 
	      exists in the original array.
	    - ("time", "toffee"): Both names are still the same after swapping and 
	      exist in the original array.
	    - ("coffee", "toffee"): Both names formed after swapping already exist 
	      in the original array.
	
	Example 2:
	Input: ideas = ["lack","back"]
	Output: 0
	Explanation: There are no valid selections. Therefore, 0 is returned.

	Constraints:
	* 2 <= ideas.length <= 5 * 10^4
	* 1 <= ideas[i].length <= 10
	* ideas[i] consists of lowercase English letters.
	* All the strings in ideas are unique."""

    def distinctNames(self, ideas: List[str]) -> int:
        seen = set(ideas)
        freq = Counter()
        letters = {x[0] for x in ideas}
        for idea in ideas: 
            for ch in letters: 
                if ch + idea[1:] not in seen: freq[idea[0], ch] += 1 
        ans = 0 
        for idea in ideas: 
            for ch in letters: 
                if ch + idea[1:] not in seen: ans += freq[ch, idea[0]]
        return ans 