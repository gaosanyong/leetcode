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
	给定总玩家数 n，以及按 [玩家编号,对应可传递玩家编号] 关系组成的二维数组 relation。返回
	信息从小 A (编号 0 ) 经过 k 轮传递到编号为 n-1 的小伙伴处的方案数；若不能到达，返回 0。

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