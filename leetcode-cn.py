class Solution: 


	"""LCP 06. 拿硬币 (简单)
	桌上有 n 堆力扣币，每堆的数量保存在数组 coins 中。我们每次可以选择任意一堆，拿走
	其中的一枚或者两枚，求拿完所有力扣币的最少次数。

	示例 1：
	输入：[4,2,1]
	输出：4
	解释：第一堆力扣币最少需要拿 2 次，第二堆最少需要拿 1 次，第三堆最少需要拿 1 次，
	     总共 4 次即可拿完。

	示例 2：
	输入：[2,3,10]
	输出：8

	限制：
	* 1 <= n <= 4
	* 1 <= coins[i] <= 10"""
	
    def minCount(self, coins: List[int]) -> int:
        return sum((x+1)//2 for x in coins)


    """LCP 07. 传递信息 (简单)
	小朋友 A 在和 ta 的小伙伴们玩传信息游戏，游戏规则如下：
	* 有 n 名玩家，所有玩家编号分别为 0 ～ n-1，其中小朋友 A 的编号为 0
	* 每个玩家都有固定的若干个可传信息的其他玩家（也可能没有）。传信息的关系是单向的（比如 
	  A 可以向 B 传信息，但 B 不能向 A 传信息）。
	* 每轮信息必须需要传递给另一个人，且信息可重复经过同一个人
	给定总玩家数 n，以及按 [玩家编号,对应可传递玩家编号] 关系组成的二维数组 relation。
	返回	信息从小 A (编号 0 ) 经过 k 轮传递到编号为 n-1 的小伙伴处的方案数；若不能到达，
	返回 0。

	示例 1：
	输入：n = 5, relation = [[0,2],[2,1],[3,4],[2,3],[1,4],[2,0],[0,4]], k = 3
	输出：3
	解释：信息从小 A 编号 0 处开始，经 3 轮传递，到达编号 4。共有 3 种方案，分别是 
	     0->2->0->4， 0->2->1->4， 0->2->3->4。

	示例 2：
	输入：n = 3, relation = [[0,2],[2,1]], k = 2
	输出：0
	解释：信息不能从小 A 处经过 2 轮传递到编号 2

	限制：
	* 2 <= n <= 10
	* 1 <= k <= 5
	* 1 <= relation.length <= 90, 且 relation[i].length == 2
	* 0 <= relation[i][0],relation[i][1] < n 且 relation[i][0] != relation[i][1]"""

    def numWays(self, n: int, relation: List[List[int]], k: int) -> int:
        graph = [[] for _ in range(n)]
        for u, v in relation: graph[u].append(v)

        @cache
        def fn(x, i):
            """Return number of ways to reach x with i steps."""
            if i == k: return x == n-1 
            ans = 0 
            for xx in graph[x]: ans += fn(xx, i+1)
            return ans 

        return fn(0, 0)


    """LCP 11. 期望个数统计 (简单)
	某互联网公司一年一度的春招开始了，一共有 n 名面试者入选。每名面试者都会提交一份简历，公
	司会根据提供的简历资料产生一个预估的能力值，数值越大代表越有可能通过面试。小 A 和小 B 
	负责审核面试者，他们均有所有面试者的简历，并且将各自根据面试者能力值从大到小的顺序浏览。
	由于简历事先被打乱过，能力值相同的简历的出现顺序是从它们的全排列中等可能地取一个。现在给
	定 n 名面试者的能力值 scores，设 X 代表小 A 和小 B 的浏览顺序中出现在同一位置的简历数，
	求 X 的期望。	提示：离散的非负随机变量的期望计算公式为 1。在本题中，由于 X 的取值为 0 到 
	n 之间，期望计算公式可以是 2。

	示例 1：
	输入：scores = [1,2,3]
	输出：3
	解释：由于面试者能力值互不相同，小 A 和小 B 的浏览顺序一定是相同的。X的期望是 3 。

	示例 2：
	输入：scores = [1,1]
	输出：1
	解释：设两位面试者的编号为 0, 1。由于他们的能力值都是 1，小 A 和小 B 的浏览顺序都为从全
	      排列 [[0,1],[1,0]] 中等可能地取一个。如果小 A 和小 B 的浏览顺序都是 [0,1] 或者 
	      [1,0] ，那么出现在同一位置的简历数为 2 ，否则是 0 。所以 X 的期望是 
	      (2+0+2+0) * 1/4 = 1

	示例 3：
	输入：scores = [1,1,2]
	输出：2

	限制：
	* 1 <= scores.length <= 10^5
	* 0 <= scores[i] <= 10^6"""

    def expectNumber(self, scores: List[int]) -> int:
        return len(set(scores))


    """LCP 17. 速算机器人 （简单）
	小扣在秋日市集发现了一款速算机器人。店家对机器人说出两个数字（记作 x 和 y），请小扣说出
	计算指令：
	* "A" 运算：使 x = 2 * x + y；
	* "B" 运算：使 y = 2 * y + x。
	在本次游戏中，店家说出的数字为 x = 1 和 y = 0，小扣说出的计算指令记作仅由大写字母 A、B 
	组成的字符串 s，字符串中字符的顺序表示计算顺序，请返回最终 x 与 y 的和为多少。

	示例 1：
	输入：s = "AB"
	输出：4
	解释：经过一次 A 运算后，x = 2, y = 0。再经过一次 B 运算，x = 2, y = 2。最终 x 与 y 
	     之和为 4。

	提示：
	* 0 <= s.length <= 10
	* s 由 'A' 和 'B' 组成"""

    def calculate(self, s: str) -> int:
        return 2**len(s)


    """LCP 18. 早餐组合 (简单)
	小扣在秋日市集选择了一家早餐摊位，一维整型数组 staple 中记录了每种主食的价格，一维整型
	数组 drinks 中记录了每种饮料的价格。小扣的计划选择一份主食和一款饮料，且花费不超过 x 元。
	请返回小扣共有多少种购买方案。注意：答案需要以 1e9 + 7 (1000000007) 为底取模，如：计算
	初始结果为：1000000008，请返回 1

	示例 1：
	输入：staple = [10,20,5], drinks = [5,5,2], x = 15
	输出：6
	解释：小扣有 6 种购买方案，所选主食与所选饮料在数组中对应的下标分别是：
	      第 1 种方案：staple[0] + drinks[0] = 10 + 5 = 15；
	      第 2 种方案：staple[0] + drinks[1] = 10 + 5 = 15；
	      第 3 种方案：staple[0] + drinks[2] = 10 + 2 = 12；
	      第 4 种方案：staple[2] + drinks[0] = 5 + 5 = 10；
	      第 5 种方案：staple[2] + drinks[1] = 5 + 5 = 10；
	      第 6 种方案：staple[2] + drinks[2] = 5 + 2 = 7。

	示例 2：
	输入：staple = [2,1,1], drinks = [8,9,5,1], x = 9
	输出：8
	解释：小扣有 8 种购买方案，所选主食与所选饮料在数组中对应的下标分别是：
	      第 1 种方案：staple[0] + drinks[2] = 2 + 5 = 7；
	      第 2 种方案：staple[0] + drinks[3] = 2 + 1 = 3；
	      第 3 种方案：staple[1] + drinks[0] = 1 + 8 = 9；
	      第 4 种方案：staple[1] + drinks[2] = 1 + 5 = 6；
	      第 5 种方案：staple[1] + drinks[3] = 1 + 1 = 2；
	      第 6 种方案：staple[2] + drinks[0] = 1 + 8 = 9；
	      第 7 种方案：staple[2] + drinks[2] = 1 + 5 = 6；
	      第 8 种方案：staple[2] + drinks[3] = 1 + 1 = 2；

	提示：
	* 1 <= staple.length <= 10^5
	* 1 <= drinks.length <= 10^5
	* 1 <= staple[i],drinks[i] <= 10^5
	* 1 <= x <= 2*10^5"""

    def breakfastNumber(self, staple: List[int], drinks: List[int], x: int) -> int:
        drinks.sort()
        ans, i = 0, len(drinks)-1
        for v in sorted(staple): 
            while 0 <= i and v + drinks[i] > x: i -= 1
            ans += i+1
        return ans % 1_000_000_007


    """LCP 22. 黑白方格画 (简单)
	小扣注意到秋日市集上有一个创作黑白方格画的摊位。摊主给每个顾客提供一个固定在墙上的白色画板，
	画板不能转动。画板上有 n * n 的网格。绘画规则为，小扣可以选择任意多行以及任意多列的格子涂
	成黑色（选择的整行、整列均需涂成黑色），所选行数、列数均可为 0。小扣希望最终的成品上需要有 k 
	个黑色格子，请返回小扣共有多少种涂色方案。注意：两个方案中任意一个相同位置的格子颜色不同，
	就视为不同的方案。

	示例 1：
	输入：n = 2, k = 2
	输出：4
	解释：一共有四种不同的方案：
	      第一种方案：涂第一列；
	      第二种方案：涂第二列；
	      第三种方案：涂第一行；
	      第四种方案：涂第二行。

	示例 2：
	输入：n = 2, k = 1
	输出：0
	解释：不可行，因为第一次涂色至少会涂两个黑格。

	示例 3：
	输入：n = 2, k = 4
	输出：1
	解释：共有 2*2=4 个格子，仅有一种涂色方案。

	限制：
	* 1 <= n <= 6
	* 0 <= k <= n * n"""

    def paintingPlan(self, n: int, k: int) -> int:
        white = n*n - k 
        if white == 0: return 1 # edge case 
        ans = 0 
        for row in range(1, int(sqrt(white))+1): 
            if row <= n: 
                if white % row == 0: 
                    col = white // row 
                    if col <= n: 
                        if row == col: ans += comb(n, row) * comb(n, col)
                        else: ans += 2*comb(n, row) * comb(n, col)
        return ans 


    """LCP 33. 蓄水 (简单)
	给定 N 个无限容量且初始均空的水缸，每个水缸配有一个水桶用来打水，第 i 个水缸配备的水桶
	容量记作 bucket[i]。小扣有以下两种操作：
	* 升级水桶：选择任意一个水桶，使其容量增加为 bucket[i]+1
	* 蓄水：将全部水桶接满水，倒入各自对应的水缸
	每个水缸对应最低蓄水量记作 vat[i]，返回小扣至少需要多少次操作可以完成所有水缸蓄水要求。
	注意：实际蓄水量 达到或超过 最低蓄水量，即完成蓄水要求。

	示例 1：
	输入：bucket = [1,3], vat = [6,8]
	输出：4
	解释：第 1 次操作升级 bucket[0]；
	      第 2 ~ 4 次操作均选择蓄水，即可完成蓄水要求。

	示例 2：
	输入：bucket = [9,0,1], vat = [0,2,2]
	输出：3
	解释：第 1 次操作均选择升级 bucket[1]
	      第 2~3 次操作选择蓄水，即可完成蓄水要求。

	提示：
	* 1 <= bucket.length == vat.length <= 100
	* 0 <= bucket[i], vat[i] <= 10^4"""

    def storeWater(self, bucket: List[int], vat: List[int]) -> int:
        pq = []
        pre = 0 # pre-processing 
        for b, v in zip(bucket, vat):
            if v: 
                if b == 0: b, pre = 1, pre+1
                heappush(pq, (-ceil(v/b), b, v))
        inc = 0 
        ans = inf 
        while pq and inc < ans:
            x, b, v = heappop(pq)
            ans = min(ans, inc - x)
            if -x <= 2: break
            heappush(pq, (-ceil(v/(b+1)), b+1, v))
            inc += 1
        return pre + (ans if ans < inf else 0)


    """LCP 39. 无人机方阵 (简单)
	在 「力扣挑战赛」 开幕式的压轴节目 「无人机方阵」中，每一架无人机展示一种灯光颜色。 无人机方
	阵通过两种操作进行颜色图案变换：
	* 调整无人机的位置布局
	* 切换无人机展示的灯光颜色
	给定两个大小均为 N*M 的二维数组 source 和 target 表示无人机方阵表演的两种颜色图案，由
	于无人机切换灯光颜色的耗能很大，请返回从 source 到 target 最少需要多少架无人机切换灯光
	颜色。注意： 调整无人机的位置布局时无人机的位置可以随意变动。

	示例 1：
	输入：source = [[1,3],[5,4]], target = [[3,1],[6,5]]
	输出：1
	解释：最佳方案为
	      将 [0,1] 处的无人机移动至 [0,0] 处；
	      将 [0,0] 处的无人机移动至 [0,1] 处；
	      将 [1,0] 处的无人机移动至 [1,1] 处；
	      将 [1,1] 处的无人机移动至 [1,0] 处，其灯光颜色切换为颜色编号为 6 的灯光；
	      因此从source 到 target 所需要的最少灯光切换次数为 1。

	示例 2：
	输入：source = [[1,2,3],[3,4,5]], target = [[1,3,5],[2,3,4]]
	输出：0
	解释：仅需调整无人机的位置布局，便可完成图案切换。因此不需要无人机切换颜色

	提示：
	* n == source.length == target.length
	* m == source[i].length == target[i].length
	* 1 <= n, m <=100
	* 1 <= source[i][j], target[i][j] <=10^4"""

    def minimumSwitchingTimes(self, source: List[List[int]], target: List[List[int]]) -> int:
        m, n = len(source), len(source[0])
        freq = Counter()
        for row in source: 
            for x in row: freq[x] += 1
        
        for row in target:
            for x in row: freq[x] -= 1

        return sum(abs(x) for x in freq.values())//2


    """LCP 40. 心算挑战 (简单)
	「力扣挑战赛」心算项目的挑战比赛中，要求选手从 N 张卡牌中选出 cnt 张卡牌，若这 cnt 
	张卡牌数字总和为偶数，则选手成绩「有效」且得分为 cnt 张卡牌数字总和。给定数组 cards 
	和 cnt，其中 cards[i] 表示第 i 张卡牌上的数字。 请帮参赛选手计算最大的有效得分。
	若不存在获取有效得分的卡牌方案，则返回 0。

	示例 1：
	输入：cards = [1,2,8,9], cnt = 3
	输出：18
	解释：选择数字为 1、8、9 的这三张卡牌，此时可获得最大的有效得分 1+8+9=18。

	示例 2：
	输入：cards = [3,3,1], cnt = 1
	输出：0
	解释：不存在获取有效得分的卡牌方案。

	提示：
	* 1 <= cnt <= cards.length <= 10^5
	* 1 <= cards[i] <= 1000"""

    def maxmiumScore(self, cards: List[int], cnt: int) -> int:
        odd, even = [0], [0]
        for x in sorted(cards, reverse=True): 
            if x & 1: odd.append(odd[-1] + x)
            else: even.append(even[-1] + x)
        ans = 0 
        for k in range(0, cnt+1, 2): 
            if k < len(odd) and cnt-k < len(even): ans = max(ans, odd[k] + even[cnt-k])
        return ans 


    """LCP 44. 开幕式焰火 (简单)
	「力扣挑战赛」开幕式开始了，空中绽放了一颗二叉树形的巨型焰火。给定一棵二叉树 root 代表焰火，
	节点值表示巨型焰火这一位置的颜色种类。请帮小扣计算巨型焰火有多少种不同的颜色。

	示例 1：
	输入：root = [1,3,2,1,null,2]
	输出：3
	解释：焰火中有 3 个不同的颜色，值分别为 1、2、3

	示例 2：
	输入：root = [3,3,3]
	输出：1
	解释：焰火中仅出现 1 个颜色，值为 3

	提示：
	* 1 <= 节点个数 <= 1000
	* 1 <= Node.val <= 1000"""

    def numColor(self, root: TreeNode) -> int:
        seen = set()
        stack = [root]
        while stack: 
            node = stack.pop()
            if node: 
                seen.add(node.val)
                stack.append(node.right)
                stack.append(node.left)
        return len(seen)


    """LCS 01. 下载插件 (简单)
	小扣打算给自己的 VS code 安装使用插件，初始状态下带宽每分钟可以完成 1 个插件的下载。
	假定每分钟选择以下两种策略之一:
	* 使用当前带宽下载插件
	* 将带宽加倍（下载插件数量随之加倍）
	请返回小扣完成下载 n 个插件最少需要多少分钟。注意：实际的下载的插件数量可以超过 n 个。

	示例 1：
	输入：n = 2
	输出：2
	解释：以下两个方案，都能实现 2 分钟内下载 2 个插件
	      方案一：第一分钟带宽加倍，带宽可每分钟下载 2 个插件；第二分钟下载 2 个插件
	      方案二：第一分钟下载 1 个插件，第二分钟下载 1 个插件
	
	示例 2：
	输入：n = 4
	输出：3
	解释：最少需要 3 分钟可完成 4 个插件的下载，以下是其中一种方案:
	      第一分钟带宽加倍，带宽可每分钟下载 2 个插件;
	      第二分钟下载 2 个插件;
	      第三分钟下载 2 个插件。

	提示：1 <= n <= 10^5"""

    def leastMinutes(self, n: int) -> int:
        ans = 0 
        while n > 1: 
            ans += 1
            n = (n+1)//2
        return ans + 1


    """LCS 02. 完成一半题目 (简单)
	有 N 位扣友参加了微软与力扣举办了「以扣会友」线下活动。主办方提供了 2*N 道题目，整型数组 
	questions 中每个数字对应了每道题目所涉及的知识点类型。若每位扣友选择不同的一题，请返回
	被选的 N 道题目至少包含多少种知识点类型。

	示例 1：
	输入：questions = [2,1,6,2]
	输出：1
	解释：有 2 位扣友在 4 道题目中选择 2 题。可选择完成知识点类型为 2 的题目时，此时仅一种
	      知识点类型因此至少包含 1 种知识点类型。

	示例 2：
	输入：questions = [1,5,1,3,4,5,2,5,3,3,8,6]
	输出：2
	解释：有 6 位扣友在 12 道题目中选择题目，需要选择 6 题。选择完成知识点类型为 3、5 的题
	      目，因此至少包含 2 种知识点类型。

	提示：
	* questions.length == 2*n
	* 2 <= questions.length <= 10^5
	* 1 <= questions[i] <= 1000"""

    def halfQuestions(self, questions: List[int]) -> int:
        freq = Counter(questions)
        n = len(questions)//2
        ans = 0 
        vals = sorted(freq.values())
        while n > 0: 
            ans += 1
            n -= vals.pop()
        return ans 


    """剑指 Offer 03. 数组中重复的数字 (简单)
	找出数组中重复的数字。在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组
	中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任
	意一个重复的数字。

	示例 1：
	输入：[2, 3, 1, 0, 2, 5, 3]
	输出：2 或 3 

	限制：2 <= n <= 100000"""

    def findRepeatNumber(self, nums: List[int]) -> int:
        seen = set()
        for x in nums: 
            if x in seen: return x 
            seen.add(x)


    """剑指 Offer 05. 替换空格 (简单)
	请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

	示例 1：
	输入：s = "We are happy."
	输出："We%20are%20happy."

	限制：0 <= s 的长度 <= 10000"""

    def replaceSpace(self, s: str) -> str:
        return s.replace(' ', "%20")


    """剑指 Offer 06. 从尾到头打印链表 (简单)
	输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

	示例 1：
	输入：head = [1,3,2]
	输出：[2,3,1]

	限制：0 <= 链表长度 <= 10000"""

    def reversePrint(self, head: ListNode) -> List[int]:
        ans = []
        node = head
        while node: 
            ans.append(node.val)
            node = node.next 
        return ans[::-1]


    """剑指 Offer 10- I. 斐波那契数列 (简单)
	写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：
	* F(0) = 0,   F(1) = 1
	* F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
	斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。答案需要取模 1e9+7
	（1000000007），如计算初始结果为：1000000008，请返回 1。

	示例 1：
	输入：n = 2
	输出：1

	示例 2：
	输入：n = 5
	输出：5

	提示：0 <= n <= 100"""

    def fib(self, n: int) -> int:
        f0, f1 = 0, 1
        for _ in range(n): f0, f1 = f1, (f0+f1) % 1_000_000_007
        return f0


    """剑指 Offer 10- II. 青蛙跳台阶问题 (简单)
	一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
	答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

	示例 1：
	输入：n = 2
	输出：2

	示例 2：
	输入：n = 7
	输出：21

	示例 3：
	输入：n = 0
	输出：1

	提示：0 <= n <= 100"""

    def numWays(self, n: int) -> int:
        f0, f1 = 1, 1
        for _ in range(n): f0, f1 = f1, (f0+f1) % 1_000_000_007
        return f0


    """剑指 Offer 11. 旋转数组的最小数字 (简单)
	把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个
	旋转，输出旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小
	值为1。  

	示例 1：
	输入：[3,4,5,1,2]
	输出：1

	示例 2：
	输入：[2,2,2,0,1]
	输出：0
	注意：本题与主站 154 题相同：
	      https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/"""

    def minArray(self, numbers: List[int]) -> int:
        lo, hi = 0, len(numbers)-1
        while lo < hi: 
            mid = lo + hi >> 1
            if numbers[mid] < numbers[hi]: hi = mid 
            elif numbers[mid] == numbers[hi]: hi -= 1
            else: lo = mid + 1
        return numbers[lo]


    """剑指 Offer 15. 二进制中1的个数 (简单)
	编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 
	的个数（也被称为 汉明重量).）。

	提示：请注意，在某些语言（如 Java）中，没有无符号整数类型。在这种情况下，输入和输出都将被指
	      定为有符号整数类型，并且不应影响您的实现，因为无论整数是有符号的还是无符号的，其内部
	      的二进制表示形式都是相同的。在 Java 中，编译器使用 二进制补码 记法来表示有符号整数。
	      因此，在上面的 示例 3 中，输入表示有符号整数 -3。

	示例 1：
	输入：n = 11 (控制台输入 00000000000000000000000000001011)
	输出：3
	解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。

	示例 2：
	输入：n = 128 (控制台输入 00000000000000000000000010000000)
	输出：1
	解释：输入的二进制串 00000000000000000000000010000000 中，共有一位为 '1'。

	示例 3：
	输入：n = 4294967293 (控制台输入 11111111111111111111111111111101，部分语言中 n = -3）
	输出：31
	解释：输入的二进制串 11111111111111111111111111111101 中，共有 31 位为 '1'。

	提示：输入必须是长度为 32 的 二进制串 。"""

    def hammingWeight(self, n: int) -> int:
        ans = 0 
        while n: 
            ans += 1
            n &= n-1
        return ans 


    """剑指 Offer 17. 打印从1到最大的n位数 (简单)
	输入数字 n，按顺序打印出从 1 到最大的 n 位十进制数。比如输入 3，则打印出 1、2、3 一直到
	最大的 3 位数 999。

	示例 1:
	输入: n = 1
	输出: [1,2,3,4,5,6,7,8,9]

	说明：
	* 用返回一个整数列表来代替打印
	* n 为正整数"""

    def printNumbers(self, n: int) -> List[int]:
        return list(range(1, 10**n))


    """剑指 Offer 18. 删除链表的节点 (简单)
	给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。返回删除后的链表的头节点。
	注意：此题对比原题有改动

	示例 1:
	输入: head = [4,5,1,9], val = 5
	输出: [4,1,9]
	解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.

	示例 2:
	输入: head = [4,5,1,9], val = 1
	输出: [4,5,9]
	解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.

	说明：
	* 题目保证链表中节点的值互不相同
	* 若使用 C 或 C++ 语言，你不需要 free 或 delete 被删除的节点"""

    def deleteNode(self, head: ListNode, val: int) -> ListNode:
        dummy = node = ListNode(next=head)
        while node.next: 
            if node.next.val == val: 
                node.next = node.next.next 
                break
            node = node.next 
        return dummy.next 


    """剑指 Offer 21. 调整数组顺序使奇数位于偶数前面 (简单)
	输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数在数组的前半部分，所有偶数
	在数组的后半部分。

	示例：
	输入：nums = [1,2,3,4]
	输出：[1,3,2,4] 
	注：[3,1,2,4] 也是正确的答案之一。

	提示：
	* 0 <= nums.length <= 50000
	* 0 <= nums[i] <= 10000"""

    def exchange(self, nums: List[int]) -> List[int]:
        lo, hi = 0, len(nums)-1
        while lo < hi: 
            if nums[lo] & 1: lo += 1
            elif not nums[hi] & 1: hi -= 1
            else: 
                nums[lo], nums[hi] = nums[hi], nums[lo]
                lo += 1
                hi -= 1
        return nums


    """剑指 Offer 22. 链表中倒数第k个节点 (简单)
	输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表
	的尾节点是倒数第1个节点。例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 
	1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。

	示例：给定一个链表: 1->2->3->4->5, 和 k = 2.
	返回链表 4->5."""

    def getKthFromEnd(self, head: ListNode, k: int) -> ListNode:
        fast = slow = head 
        while fast: 
            fast = fast.next 
            k -= 1
            if k < 0: slow = slow.next 
        return slow 


    """剑指 Offer 24. 反转链表 (简单)
	定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

	示例:
	输入: 1->2->3->4->5->NULL
	输出: 5->4->3->2->1->NULL

	限制：0 <= 节点个数 <= 5000
	注意：本题与主站 206 题相同：https://leetcode-cn.com/problems/reverse-linked-list/"""

    def reverseList(self, head: ListNode) -> ListNode:
        prev, node = None, head
        while node: node.next, node, prev = prev, node.next, node
        return prev


    """剑指 Offer 25. 合并两个排序的链表 (简单)
	输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。

	示例1：
	输入：1->2->4, 1->3->4
	输出：1->1->2->3->4->4

	限制：0 <= 链表长度 <= 1000
	注意：本题与主站 21 题相同：https://leetcode-cn.com/problems/merge-two-sorted-lists/"""

    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        dummy = node = ListNode()
        while l1 and l2: 
            if l1.val <= l2.val: 
                node.next = node = l1
                l1 = l1.next 
            else: 
                node.next = node = l2
                l2 = l2.next 
        node.next = l1 or l2 
        return dummy.next 


    """剑指 Offer 27. 二叉树的镜像 (简单)
	请完成一个函数，输入一个二叉树，该函数输出它的镜像。

	例如输入：     4
	            /   \
	           2     7
	          / \   / \
	         1   3 6   9
	镜像输出：     4
	            /   \
	           7     2
	          / \   / \
	         9   6 3   1

	示例 1：
	输入：root = [4,2,7,1,3,6,9]
	输出：[4,7,2,9,6,3,1]

	限制：0 <= 节点个数 <= 1000
	注意：本题与主站 226 题相同：https://leetcode-cn.com/problems/invert-binary-tree/"""

    def mirrorTree(self, root: TreeNode) -> TreeNode:
        stack = [root]
        while stack: 
            node = stack.pop()
            if node: 
                node.left, node.right = node.right, node.left 
                stack.append(node.right)
                stack.append(node.left)
        return root


    """剑指 Offer 28. 对称的二叉树 (简单)
	请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称
	的。例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
	    1
	   / \
	  2   2
	 / \ / \
	3  4 4  3
	但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
	    1
	   / \
	  2   2
	   \   \
	   3    3

	示例 1：
	输入：root = [1,2,2,3,4,4,3]
	输出：true

	示例 2：
	输入：root = [1,2,2,null,3,null,3]
	输出：false

	限制：0 <= 节点个数 <= 1000
	注意：本题与主站 101 题相同：https://leetcode-cn.com/problems/symmetric-tree/"""

    def isSymmetric(self, root: TreeNode) -> bool:
        stack = [(root, root)]
        while stack: 
            p, q = stack.pop()
            if p or q:
                if not p or not q or p.val != q.val: return False 
                stack.append((p.left, q.right))
                stack.append((p.right, q.left))
        return True 


    """剑指 Offer 29. 顺时针打印矩阵 (简单)
	输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

	示例 1：
	输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
	输出：[1,2,3,6,9,8,7,4,5]

	示例 2：
	输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
	输出：[1,2,3,4,8,12,11,10,9,5,6,7]

	限制：
	* 0 <= matrix.length <= 100
	* 0 <= matrix[i].length <= 100
	
	注意：本题与主站 54 题相同：https://leetcode-cn.com/problems/spiral-matrix/"""

    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        ans = []
        if matrix: 
            m, n = len(matrix), len(matrix[0])
            i = j = 0 
            di, dj = 0, 1
            for _ in range(m*n): 
                ans.append(matrix[i][j])
                matrix[i][j] = None # mark "visited"
                if not (0 <= i+di < m and 0 <= j+dj < n and matrix[i+di][j+dj] is not None): di, dj = dj, -di
                i, j = i+di, j+dj
        return ans 


    """剑指 Offer 32 - II. 从上到下打印二叉树 II （简单）
	从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

	例如:
	给定二叉树: [3,9,20,null,null,15,7],
	    3
	   / \
	  9  20
	    /  \
	   15   7
	返回其层次遍历结果：[[3],
	                   [9,20],
	                   [15,7]]

	提示：节点总数 <= 1000
	注意：本题与主站 102 题相同：https://leetcode-cn.com/problems/binary-tree-level-order-traversal/"""

    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        ans = []
        if root: 
            queue = deque([root])
            while queue: 
                vals = []
                for _ in range(len(queue)): 
                    node = queue.popleft()
                    vals.append(node.val)
                    if node.left: queue.append(node.left)
                    if node.right: queue.append(node.right)
                ans.append(vals)
        return ans 

 
    """剑指 Offer 39. 数组中出现次数超过一半的数字 (简单)
	数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。	你可以假设数组是非空的，
	并且给定的数组总是存在多数元素。

	示例 1:
	输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
	输出: 2

	限制：1 <= 数组长度 <= 50000
	注意：本题与主站 169 题相同：https://leetcode-cn.com/problems/majority-element/"""

    def majorityElement(self, nums: List[int]) -> int:
        ans = vote = 0 
        for x in nums: 
            if vote == 0: ans = x
            if x == ans: vote += 1
            else: vote -= 1
        return ans


    """剑指 Offer 40. 最小的k个数 (简单)
	输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8
	这8个数字，则最小的4个数字是1、2、3、4。

	示例 1：
	输入：arr = [3,2,1], k = 2
	输出：[1,2] 或者 [2,1]

	示例 2：
	输入：arr = [0,1,2,1], k = 1
	输出：[0]

	限制：
	* 0 <= k <= arr.length <= 10000
	* 0 <= arr[i] <= 10000"""

    def getLeastNumbers(self, arr: List[int], k: int) -> List[int]:
        shuffle(arr)

        def part(lo, hi): 
            """Return arr[lo:hi]"""
            i, j = lo+1, hi-1
            while i <= j: 
                if arr[i] < arr[lo]: i += 1
                elif arr[j] > arr[lo]: j -= 1
                else: 
                    arr[i], arr[j] = arr[j], arr[i]
                    i += 1
                    j -= 1
            arr[lo], arr[j] = arr[j], arr[lo]
            return j 

        lo, hi = 0, len(arr)
        while lo < hi: 
            mid = part(lo, hi)
            if mid+1 < k: lo = mid+1
            elif mid+1 == k: break 
            else: hi = mid 
        return arr[:k]


    """剑指 Offer 42. 连续子数组的最大和 (简单)
	输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。要求
	时间复杂度为O(n)。

	示例1:
	输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
	输出: 6
	解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

	提示：
	* 1 <= arr.length <= 10^5
	* -100 <= arr[i] <= 100
	
	注意：本题与主站 53 题相同：https://leetcode-cn.com/problems/maximum-subarray/"""

    def maxSubArray(self, nums: List[int]) -> int:
        ans = -inf 
        val = 0 
        for x in nums: 
            val = max(val, 0) + x
            ans = max(ans, val)
        return ans 


    """剑指 Offer 45. 把数组排成最小的数 (中等)
	输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。

	示例 1:
	输入: [10,2]
	输出: "102"

	示例 2:
	输入: [3,30,34,5,9]
	输出: "3033459"

	提示: 0 < nums.length <= 100
	
	说明:
	* 输出结果可能非常大，所以你需要返回一个字符串而不是整数
	* 拼接起来的数字可能会有前导 0，最后结果不需要去掉前导 0"""

    def minNumber(self, nums: List[int]) -> str:
        
        def cmp(s1, s2): 
            if s1+s2 < s2+s1: return -1
            elif s1+s2 == s2+s1: return 0
            else: return 1
        
        return "".join(sorted(map(str, nums), key=cmp_to_key(cmp)))


    """剑指 Offer 50. 第一个只出现一次的字符 (简单)
	在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

	示例 1:
	输入：s = "abaccdeff"
	输出：'b'

	示例 2:
	输入：s = "" 
	输出：' '

	限制：0 <= s 的长度 <= 50000"""

    def firstUniqChar(self, s: str) -> str:
        freq = Counter(s)
        return next((ch for ch in s if freq[ch] == 1), ' ')


    """剑指 Offer 52. 两个链表的第一个公共节点 (简单)
	输入两个链表，找出它们的第一个公共节点。

	示例 1：
	输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
	输出：Reference of the node with value = 8
	输入解释：相交节点的值为 8 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，
	         链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 
	         个节点；在 B 中，相交节点前有 3 个节点。

	示例 2：
	输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
	输出：Reference of the node with value = 2
	输入解释：相交节点的值为 2 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，
	         链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。在 A 中，相交节点前有 3 个节点；
	         在 B 中，相交节点前有 1 个节点。

	示例 3：
	输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
	输出：null
	输入解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。由于这两个链表不
	         相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。解释：
	         这两个链表不相交，因此返回 null。

	注意：
	* 如果两个链表没有交点，返回 null.
	* 在返回结果后，两个链表仍须保持原有的结构。
	* 可假定整个链表结构中没有循环。
	* 程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。
	本题与主站 160 题相同：https://leetcode-cn.com/problems/intersection-of-two-linked-lists/"""

    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        nodeA, nodeB = headA, headB 
        while nodeA != nodeB: 
            nodeA = nodeA.next if nodeA else headB
            nodeB = nodeB.next if nodeB else headA
        return nodeA


    """剑指 Offer 53 - I. 在排序数组中查找数字 I (简单)
	统计一个数字在排序数组中出现的次数。

	示例 1:
	输入: nums = [5,7,7,8,8,10], target = 8
	输出: 2

	示例 2:
	输入: nums = [5,7,7,8,8,10], target = 6
	输出: 0

	提示：
	* 0 <= nums.length <= 10^5
	* -10^9 <= nums[i] <= 10^9
	* nums 是一个非递减数组
	* -10^9 <= target <= 10^9

	注意：本题与主站 34 题相同（仅返回值不同）：
	      https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/"""

    def search(self, nums: List[int], target: int) -> int:
        lo = bisect_left(nums, target)
        if lo < len(nums) and nums[lo] == target: return bisect_right(nums, target) - lo
        return 0 

    
    """剑指 Offer 53 - II. 0～n-1中缺失的数字 (简单)
	一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。
	在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。

	示例 1:
	输入: [0,1,3]
	输出: 2

	示例 2:
	输入: [0,1,2,3,4,5,6,7,9]
	输出: 8

	限制：1 <= 数组长度 <= 10000"""

    def missingNumber(self, nums: List[int]) -> int:
        ans = 0
        for x in nums: ans ^= x
        for x in range(len(nums)+1): ans ^= x
        return ans 


    """剑指 Offer 54. 二叉搜索树的第k大节点 (简单)
	给定一棵二叉搜索树，请找出其中第k大的节点。

	示例 1:
	输入: root = [3,1,4,null,2], k = 1
	   3
	  / \
	 1   4
	  \
	   2
	输出: 4

	示例 2:
	输入: root = [5,3,6,2,4,null,null,1], k = 3
	       5
	      / \
	     3   6
	    / \
	   2   4
	  /
	 1
	输出: 4

	限制：1 ≤ k ≤ 二叉搜索树元素个数"""

    def kthLargest(self, root: TreeNode, k: int) -> int:
        node = root
        stack = []
        while node or stack: 
            if node: 
                stack.append(node)
                node = node.right
            else: 
                node = stack.pop()
                k -= 1
                if k == 0: return node.val 
                node = node.left 


    """剑指 Offer 55 - I. 二叉树的深度 (简单)
	输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树
	的一条路径，最长路径的长度为树的深度。

	例如：
	给定二叉树 [3,9,20,null,null,15,7]，
	    3
	   / \
	  9  20
	    /  \
	   15   7
	返回它的最大深度 3 。

	提示：节点总数 <= 10000
	注意：本题与主站 104 题相同：https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/"""

    def maxDepth(self, root: TreeNode) -> int:
        ans = 0 
        if root: 
            stack = [(root, 1)]
            while stack: 
                node, depth = stack.pop()
                ans = max(ans, depth)
                if node.left: stack.append((node.left, depth+1))
                if node.right: stack.append((node.right, depth+1))
        return ans 


    """剑指 Offer 55 - II. 平衡二叉树 (简单)
	输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相
	差不超过1，那么它就是一棵平衡二叉树。

	示例 1:
	给定二叉树 [3,9,20,null,null,15,7]
	    3
	   / \
	  9  20
	    /  \
	   15   7
	返回 true 。

	示例 2:
	给定二叉树 [1,2,2,3,3,null,null,4,4]

	       1
	      / \
	     2   2
	    / \
	   3   3
	  / \
	 4   4
	返回 false 。

	限制：0 <= 树的结点个数 <= 10000
	注意：本题与主站 110 题相同：https://leetcode-cn.com/problems/balanced-binary-tree/"""

    def isBalanced(self, root: TreeNode) -> bool:
        stack = []
        height = {None: 0}
        prev, node = None, root
        while node or stack: 
            if node: 
                stack.append(node)
                node = node.left 
            else: 
                node = stack[-1]
                if node.right and prev != node.right: node = node.right 
                else: 
                    if abs(height[node.left] - height[node.right]) > 1: return False 
                    height[node] = 1 + max(height[node.left], height[node.right])
                    stack.pop()
                    prev = node 
                    node = None 
        return True 


    """剑指 Offer 57. 和为s的两个数字 (简单)
	输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数
	字的和等于s，则输出任意一对即可。

	示例 1：
	输入：nums = [2,7,11,15], target = 9
	输出：[2,7] 或者 [7,2]

	示例 2：
	输入：nums = [10,26,30,31,47,60], target = 40
	输出：[10,30] 或者 [30,10]

	限制：
	* 1 <= nums.length <= 10^5
	* 1 <= nums[i] <= 10^6"""

    def twoSum(self, nums: List[int], target: int) -> List[int]:
        lo, hi = 0, len(nums)-1
        while lo < hi: 
            if nums[lo] + nums[hi] < target: lo += 1
            elif nums[lo] + nums[hi] == target: return [nums[lo], nums[hi]]
            else: hi -= 1


    """剑指 Offer 57 - II. 和为s的连续正数序列 (简单)
	输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。
	序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

	示例 1：
	输入：target = 9
	输出：[[2,3,4],[4,5]]

	示例 2：
	输入：target = 15
	输出：[[1,2,3,4,5],[4,5,6],[7,8]]

	限制：1 <= target <= 10^5"""

    def findContinuousSequence(self, target: int) -> List[List[int]]:
        ans = []
        prefix = 0
        for x in range(1, int((-1+sqrt(8*target-1))//2)+1): 
            prefix += x
            if (target-prefix) % (x+1) == 0: 
                v = (target-prefix)//(x+1)
                ans.append(list(range(v, v+x+1)))
        return ans[::-1]


    """剑指 Offer 58 - I. 翻转单词顺序 (简单)
	输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通
	字母一样处理。例如输入字符串"I am a student. "，则输出"student. a am I"。

	示例 1：
	输入: "the sky is blue"
	输出: "blue is sky the"

	示例 2：
	输入: "  hello world!  "
	输出: "world! hello"
	解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。

	示例 3：
	输入: "a good   example"
	输出: "example good a"
	解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。

	说明：
	* 无空格字符构成一个单词。
	* 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
	* 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
	
	注意：本题与主站 151 题相同：https://leetcode-cn.com/problems/reverse-words-in-a-string/
	注意：此题对比原题有改动"""

    def reverseWords(self, s: str) -> str:
        return ' '.join(reversed(s.split()))


    """剑指 Offer 58 - II. 左旋转字符串 (简单)
	字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左
	旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果
	"cdefgab"。

	示例 1：
	输入: s = "abcdefg", k = 2
	输出: "cdefgab"

	示例 2：
	输入: s = "lrloseumgh", k = 6
	输出: "umghlrlose"

	限制：1 <= k < s.length <= 10000"""

    def reverseLeftWords(self, s: str, n: int) -> str:
        return s[n:] + s[:n]


    """剑指 Offer 61. 扑克牌中的顺子 (简单)
	从若干副扑克牌中随机抽 5 张牌，判断是不是一个顺子，即这5张牌是不是连续的。2～10为数
	字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。

	示例 1:
	输入: [1,2,3,4,5]
	输出: True

	示例 2:
	输入: [0,0,1,2,5]
	输出: True

	限制：
	* 数组长度为 5 
	* 数组的数取值为 [0, 13] ."""

    def isStraight(self, nums: List[int]) -> bool:
        seen = set()
        lo, hi = inf, 0
        for x in nums: 
            if x: 
                if x in seen: return False 
                seen.add(x)
                lo = min(lo, x)
                hi = max(hi, x)
        return hi - lo < 5


    """剑指 Offer 62. 圆圈中最后剩下的数字 (简单)
	0,1,···,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字
	（删除后从下一个数字开始计数）。求出这个圆圈里剩下的最后一个数字。例如，
	0、1、2、3、4这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，则删除的前4个数
	字依次是2、0、4、1，因此最后剩下的数字是3。

	示例 1：
	输入: n = 5, m = 3
	输出: 3

	示例 2：
	输入: n = 10, m = 17
	输出: 2

	限制：
	* 1 <= n <= 10^5
	* 1 <= m <= 10^6"""

    def lastRemaining(self, n: int, m: int) -> int:
        ans = 0 
        for x in range(2, n+1): ans = (ans + m) % x
        return ans 


    """剑指 Offer 65. 不用加减乘除做加法 (简单)
	写一个函数，求两个整数之和，要求在函数体内不得使用 “+”、“-”、“*”、“/” 四则运算符号。

	示例:
	输入: a = 1, b = 1
	输出: 2

	提示：
	* a, b 均可能是负数或 0
	* 结果不会溢出 32 位整数"""

    def add(self, a: int, b: int) -> int:
        mask = 0xffffffff
        while b & mask: a, b = a^b, (a&b) << 1
        return a&mask if b > mask else a 


    """剑指 Offer 68 - I. 二叉搜索树的最近公共祖先 (简单)
	给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。百度百科中最近公共祖先的定义为：
	“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 
	的深度尽可能大（一个节点也可以是它自己的祖先）。”例如，给定如下二叉搜索树:  
	root = [6,2,8,0,4,7,9,null,null,3,5]

	示例 1:
	输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
	输出: 6 
	解释: 节点 2 和节点 8 的最近公共祖先是 6。

	示例 2:
	输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
	输出: 2
	解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。

	说明:
	* 所有节点的值都是唯一的。
	* p、q 为不同节点且均存在于给定的二叉搜索树中。
	注意：本题与主站 235 题相同：
	      https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"""

    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if p.val > q.val: p, q = q, p
        node = root
        while node: 
            if node.val < p.val: node = node.right 
            elif p.val <= node.val <= q.val: return node 
            else: node = node.left 


    """剑指 Offer 68 - II. 二叉树的最近公共祖先 (简单)
	给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。百度百科中最近公共祖先的定义为：
	“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 
	x 的深度尽可能大（一个节点也可以是它自己的祖先）。”例如，给定如下二叉树:  
	root = [3,5,1,6,2,0,8,null,null,7,4]

	示例 1:
	输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
	输出: 3
	解释: 节点 5 和节点 1 的最近公共祖先是节点 3。

	示例 2:
	输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
	输出: 5
	解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。

	说明:
	* 所有节点的值都是唯一的。
	* p、q 为不同节点且均存在于给定的二叉树中。
	注意：本题与主站 236 题相同：
	      https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/"""

    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
        if not root or root in (p, q): return root 
        left, right = self.lowestCommonAncestor(root.left, p, q), self.lowestCommonAncestor(root.right, p, q)
        return root if left and right else left or right 


    """meituan-001. 小美的用户名 (简单)
	小美是美团的前端工程师，为了防止系统被恶意攻击，小美必须要在用户输入用户名之前做一个合法性
	检查，一个合法的用户名必须满足以下几个要求：
	* 用户名的首字符必须是大写或者小写字母。
	* 用户名只能包含大小写字母，数字。
	* 用户名需要包含至少一个字母和一个数字。
	如果用户名合法，请输出 "Accept"，反之输出 "Wrong"。
	
	格式：
	输入：
	- 输入第一行包含一个正整数 T，表示需要检验的用户名数量。
	- 接下来有 T 行，每行一个字符串 s，表示输入的用户名。
	输出：
	- 对于每一个输入的用户名 s，请输出一行，即按题目要求输出一个字符串。

	示例：
	输入：5
	     Ooook
	     Hhhh666
	     ABCD
	     Meituan
	     6666
	输出：Wrong
	     Accept
	     Wrong
	     Wrong
	     Wrong
	提示：
	* 1 <= T <= 100
	* s 的长度不超过 20
	* 请注意，本题需要自行编写「标准输入」和「标准输出」逻辑，以及自行 import/include 需要的 
	  library。了解书写规则"""

    def meituan_001(self): 
        n = int(input())
        for _ in range(n): 
            name = input()
            if name.isalnum() and name[0].isalpha() and any(x.isdigit() for x in name): print("Accept")
            else: print("Wrong")


    """meituan-002. 小美的仓库整理 (中等)
	小美是美团仓库的管理员，她会根据单据的要求按顺序取出仓库中的货物，每取出一件货物后会把剩余
	货物重新堆放，使得自己方便查找。已知货物入库的时候是按顺序堆放在一起的。如果小美取出其中一
	件货物，则会把货物所在的一堆物品以取出的货物为界分成两堆，这样可以保证货物局部的顺序不变。
	已知货物最初是按 1~n 的顺序堆放的，每件货物的重量为 w[i] ,小美会根据单据依次不放回的取出
	货物。请问根据上述操作，小美每取出一件货物之后，重量和最大的一堆货物重量是多少？

	格式：
	输入：
	- 输入第一行包含一个正整数 n ，表示货物的数量。
	- 输入第二行包含 n 个正整数，表示 1~n 号货物的重量 w[i] 。
	- 输入第三行有 n 个数，表示小美按顺序取出的货物的编号，也就是一个 1~n 的全排列。
	输出：
	- 输出包含 n 行，每行一个整数，表示每取出一件货物以后，对于重量和最大的一堆货物，其重量和为多少。

	示例：
	输入：
	     5
	     3 2 4 4 5 
	     4 3 5 2 1
	输出：
	     9
	     5
	     5
	     3
	     0
	解释：
	原本的状态是 {{3,2,4,4,5}} ，取出 4 号货物后，得到 {{3,2,4},{5}} ，第一堆货物的和是 9 ，
	然后取出 3 号货物得到 {{3,2}{5}} ，此时第一堆和第二堆的和都是 5 ，以此类推。
	
	提示：
	* 1 <= n <= 50000
	* 1 <= w[i] <= 100
	* 请注意，本题需要自行编写「标准输入」和「标准输出」逻辑，以及自行 import/include 需要的 
	  library。了解书写规则"""

    def meituan_002(self): 
        n = int(input())
        prefix = [0]
        for x in input().split(): prefix.append(prefix[-1] + int(x))
        ans = []
        most = 0
        seen = [0]*n
        lower = list(range(n))
        upper = list(range(n))
        for i in reversed(input().split()): 
            ans.append(most)
            i = int(i) - 1
            seen[i] = 1
            if i and seen[i-1]: lower[i] = lower[i-1]
            if i+1 < n and seen[i+1]: upper[i] = upper[i+1]
            upper[lower[i]] = upper[i]
            lower[upper[i]] = lower[i]
            most = max(most, prefix[upper[i]+1] - prefix[lower[i]])
        for x in reversed(ans): print(x)