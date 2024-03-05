
/*176. Second Highest Salary (Medium)
SQL Schema
Table: Employee
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| salary      | int  |
+-------------+------+
id is the primary key column for this table. Each row of this table contains 
information about the salary of an employee.

Write an SQL query to report the second highest salary from the Employee table. 
If there is no second highest salary, the query should report null. The query 
result format is in the following example.

Example 1:
Input: 
Employee table: +----+--------+
                | id | salary |
                +----+--------+
                | 1  | 100    |
                | 2  | 200    |
                | 3  | 300    |
                +----+--------+
Output: +---------------------+
        | SecondHighestSalary |
        +---------------------+
        | 200                 |
        +---------------------+

Example 2:
Input: 
Employee table: +----+--------+
                | id | salary |
                +----+--------+
                | 1  | 100    |
                +----+--------+
Output: +---------------------+
        | SecondHighestSalary |
        +---------------------+
        | null                |
        +---------------------+*/

SELECT 
    IFNULL(
        (SELECT DISTINCT Salary #parenthesis is necessary!
         FROM Employee 
         ORDER BY Salary DESC LIMIT 1 OFFSET 1), 
    NULL) AS SecondHighestSalary


/*177. Nth Highest Salary (Medium)
SQL Schema
Table: Employee
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| salary      | int  |
+-------------+------+
id is the primary key column for this table. Each row of this table contains 
information about the salary of an employee.

Write an SQL query to report the nth highest salary from the Employee table. If 
there is no nth highest salary, the query should report null. The query result 
format is in the following example.

Example 1:
Input: 
Employee table:    +----+--------+
                   | id | salary |
                   +----+--------+
                   | 1  | 100    |
                   | 2  | 200    |
                   | 3  | 300    |
                   +----+--------+
n = 2
Output: +------------------------+
        | getNthHighestSalary(2) |
        +------------------------+
        | 200                    |
        +------------------------+

Example 2:
Input: 
Employee table:    +----+--------+
                   | id | salary |
                   +----+--------+
                   | 1  | 100    |
                   +----+--------+
n = 2
Output: +------------------------+
        | getNthHighestSalary(2) |
        +------------------------+
        | null                   |
        +------------------------+*/

CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  RETURN (
    SELECT DISTINCT Salary
    FROM Employee e1
    WHERE N-1 = (SELECT COUNT(DISTINCT Salary) FROM Employee e2 WHERE e1.Salary < e2.Salary)
  );
END


/*178. Rank Scores (Medium)
SQL Schema
Table: Scores
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| score       | decimal |
+-------------+---------+
id is the primary key for this table. Each row of this table contains the score 
of a game. Score is a floating point value with two decimal places.

Write an SQL query to rank the scores. The ranking should be calculated 
according to the following rules:
* The scores should be ranked from the highest to the lowest.
* If there is a tie between two scores, both should have the same ranking.
* After a tie, the next ranking number should be the next consecutive integer 
  value. In other words, there should be no holes between ranks.
Return the result table ordered by score in descending order. The query result 
format is in the following example.

Example 1:
Input: 
Scores table: +----+-------+
              | id | score |
              +----+-------+
              | 1  | 3.50  |
              | 2  | 3.65  |
              | 3  | 4.00  |
              | 4  | 3.85  |
              | 5  | 4.00  |
              | 6  | 3.65  |
              +----+-------+
Output:     +-------+------+
            | score | rank |
            +-------+------+
            | 4.00  | 1    |
            | 4.00  | 1    |
            | 3.85  | 2    |
            | 3.65  | 3    |
            | 3.65  | 3    |
            | 3.50  | 4    |
            +-------+------+*/

SELECT Score, @i:=@i+(@prev <> (@prev:=Score)) AS Rank
FROM Scores, (SELECT @i:=0, @prev:=-1) init
ORDER BY Score DESC; 


/*180. Consecutive Numbers (Medium)
SQL Schema
Table: Logs
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| num         | varchar |
+-------------+---------+
id is the primary key for this table. id is an autoincrement column.

Write an SQL query to find all numbers that appear at least three times 
consecutively. Return the result table in any order. The query result format is 
in the following example.

Example 1:
Input: 
Logs table:    +----+-----+
               | id | num |
               +----+-----+
               | 1  | 1   |
               | 2  | 1   |
               | 3  | 1   |
               | 4  | 2   |
               | 5  | 1   |
               | 6  | 2   |
               | 7  | 2   |
               +----+-----+
Output: +-----------------+
        | ConsecutiveNums |
        +-----------------+
        | 1               |
        +-----------------+
Explanation: 1 is the only number that appears consecutively for at least three 
             times.*/

SELECT DISTINCT Num AS ConsecutiveNums
FROM 
(SELECT Num, @i:=@j AS i, @j:=@k AS j, @k:=CAST(Num AS CHAR) AS k
FROM Logs, (SELECT @i:=NULL, @j:=NULL, @k:=NULL) a) b
WHERE i = j AND j = k; 


/*184. Department Highest Salary (Medium)
SQL Schema
Table: Employee
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| id           | int     |
| name         | varchar |
| salary       | int     |
| departmentId | int     |
+--------------+---------+
id is the primary key column for this table. departmentId is a foreign key of 
the ID from the Department table. Each row of this table indicates the ID, name, 
and salary of an employee. It also contains the ID of their department.

Table: Department 
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+
id is the primary key column for this table. Each row of this table indicates 
the ID of a department and its name.

Write an SQL query to find employees who have the highest salary in each of the 
departments. Return the result table in any order. The query result format is 
in the following example.

Example 1:
Input: 
Employee table: +----+-------+--------+--------------+
                | id | name  | salary | departmentId |
                +----+-------+--------+--------------+
                | 1  | Joe   | 70000  | 1            |
                | 2  | Jim   | 90000  | 1            |
                | 3  | Henry | 80000  | 2            |
                | 4  | Sam   | 60000  | 2            |
                | 5  | Max   | 90000  | 1            |
                +----+-------+--------+--------------+
Department table:                       +----+-------+
                                        | id | name  |
                                        +----+-------+
                                        | 1  | IT    |
                                        | 2  | Sales |
                                        +----+-------+
Output:             +------------+----------+--------+
                    | Department | Employee | Salary |
                    +------------+----------+--------+
                    | IT         | Jim      | 90000  |
                    | Sales      | Henry    | 80000  |
                    | IT         | Max      | 90000  |
                    +------------+----------+--------+
Explanation: Max and Jim both have the highest salary in the IT department and 
             Henry has the highest salary in the Sales department.*/

SELECT a.Name AS Department, b.Name AS Employee, Salary
FROM 
    Department a, 
    Employee b
WHERE a.Id = b.DepartmentId AND Salary = (SELECT MAX(Salary) FROM Employee c WHERE b.DepartmentId = c.DepartmentId); 


/*534. Game Play Analysis III (Medium)
SQL Schema
Table: Activity
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| player_id    | int     |
| device_id    | int     |
| event_date   | date    |
| games_played | int     |
+--------------+---------+
(player_id, event_date) is the primary key of this table. This table shows the 
activity of players of some games. Each row is a record of a player who logged 
in and played a number of games (possibly 0) before logging out on someday 
using some device.

Write an SQL query to report for each player and date, how many games played so 
far by the player. That is, the total number of games played by the player 
until that date. Check the example for clarity. Return the result table in any 
order. The query result format is in the following example.

Example 1:
Input: 
Activity table: +-----------+-----------+------------+--------------+
                | player_id | device_id | event_date | games_played |
                +-----------+-----------+------------+--------------+
                | 1         | 2         | 2016-03-01 | 5            |
                | 1         | 2         | 2016-05-02 | 6            |
                | 1         | 3         | 2017-06-25 | 1            |
                | 3         | 1         | 2016-03-02 | 0            |
                | 3         | 4         | 2018-07-03 | 5            |
                +-----------+-----------+------------+--------------+
Output:              +-----------+------------+---------------------+
                     | player_id | event_date | games_played_so_far |
                     +-----------+------------+---------------------+
                     | 1         | 2016-03-01 | 5                   |
                     | 1         | 2016-05-02 | 11                  |
                     | 1         | 2017-06-25 | 12                  |
                     | 3         | 2016-03-02 | 0                   |
                     | 3         | 2018-07-03 | 5                   |
                     +-----------+------------+---------------------+
Explanation: For the player with id 1, 5 + 6 = 11 games played by 2016-05-02, 
             and 5 + 6 + 1 = 12 games played by 2017-06-25. For the player with 
             id 3, 0 + 5 = 5 games played by 2018-07-03. Note that for each 
             player we only care about the days when the player logged in.*/

SELECT 
    a.player_id, 
    a.event_date, 
    SUM(b.games_played) AS games_played_so_far
FROM 
    Activity a, Activity b
WHERE a.event_date >= b.event_date AND a.player_id = b.player_id
GROUP BY a.player_id, a.event_date; 


/*550. Game Play Analysis IV (Medium)
SQL Schema
Table: Activity
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| player_id    | int     |
| device_id    | int     |
| event_date   | date    |
| games_played | int     |
+--------------+---------+
(player_id, event_date) is the primary key of this table. This table shows the 
activity of players of some games. Each row is a record of a player who logged 
in and played a number of games (possibly 0) before logging out on someday 
using some device.

Write an SQL query to report the fraction of players that logged in again on 
the day after the day they first logged in, rounded to 2 decimal places. In 
other words, you need to count the number of players that logged in for at 
least two consecutive days starting from their first login date, then divide 
that number by the total number of players. The query result format is in the 
following example.

Example 1:
Input: 
Activity table: +-----------+-----------+------------+--------------+
                | player_id | device_id | event_date | games_played |
                +-----------+-----------+------------+--------------+
                | 1         | 2         | 2016-03-01 | 5            |
                | 1         | 2         | 2016-03-02 | 6            |
                | 2         | 3         | 2017-06-25 | 1            |
                | 3         | 1         | 2016-03-02 | 0            |
                | 3         | 4         | 2018-07-03 | 5            |
                +-----------+-----------+------------+--------------+
Output:                                                 +-----------+
                                                        | fraction  |
                                                        +-----------+
                                                        | 0.33      |
                                                        +-----------+
Explanation: Only the player with id 1 logged back in after the first day he 
             had logged in so the answer is 1/3 = 0.33*/

SELECT 
    ROUND(COUNT(*)/(SELECT COUNT(DISTINCT player_id) FROM Activity), 2) AS fraction
FROM 
    Activity
WHERE 
    CONCAT(player_id, event_date) IN (SELECT CONCAT(player_id, ADDDATE(MIN(event_date), 1)) FROM Activity GROUP BY player_id);


/*570. Managers with at Least 5 Direct Reports (Medium)
SQL Schema
Table: Employee
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| department  | varchar |
| managerId   | int     |
+-------------+---------+
id is the primary key column for this table. Each row of this table indicates 
the name of an employee, their department, and the id of their manager. If 
managerId is null, then the employee does not have a manager. No employee will 
be the manager of themself.

Write an SQL query to report the managers with at least five direct reports. 
Return the result table in any order. The query result format is in the 
following example.

Example 1:
Input: 
Employee table: +-----+-------+------------+-----------+
                | id  | name  | department | managerId |
                +-----+-------+------------+-----------+
                | 101 | John  | A          | None      |
                | 102 | Dan   | A          | 101       |
                | 103 | James | A          | 101       |
                | 104 | Amy   | A          | 101       |
                | 105 | Anne  | A          | 101       |
                | 106 | Ron   | B          | 101       |
                +-----+-------+------------+-----------+
Output:                                         +------+
                                                | name |
                                                +------+
                                                | John |
                                                +------+*/

SELECT Name
FROM Employee 
WHERE Id IN
    (SELECT ManagerId 
     FROM Employee
     GROUP BY ManagerId
     HAVING COUNT(ManagerId) >= 5)


/*574. Winning Candidate (Medium)
SQL Schema
Table: Candidate
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| id          | int      |
| name        | varchar  |
+-------------+----------+
id is the primary key column for this table. Each row of this table contains 
information about the id and the name of a candidate.

Table: Vote
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| candidateId | int  |
+-------------+------+
id is an auto-increment primary key. candidateId is a foreign key to id from 
the Candidate table. Each row of this table determines the candidate who got 
the ith vote in the elections.

Write an SQL query to report the name of the winning candidate (i.e., the 
candidate who got the largest number of votes). The test cases are generated so 
that exactly one candidate wins the elections. The query result format is in 
the following example.

Example 1:
Input: 
Candidate table:   +----+------+
                   | id | name |
                   +----+------+
                   | 1  | A    |
                   | 2  | B    |
                   | 3  | C    |
                   | 4  | D    |
                   | 5  | E    |
                   +----+------+
Vote table: +----+-------------+
            | id | candidateId |
            +----+-------------+
            | 1  | 2           |
            | 2  | 4           |
            | 3  | 3           |
            | 4  | 2           |
            | 5  | 5           |
            +----+-------------+
Output:                 +------+
                        | name |
                        +------+
                        | B    |
                        +------+
Explanation: Candidate B has 2 votes. Candidates C, D, and E have 1 vote each.
             The winner is candidate B.*/

SELECT Name
FROM 
    Candidate a, 
    (SELECT CandidateId
     FROM Vote
     GROUP BY CandidateId
     ORDER BY COUNT(*) DESC
     LIMIT 1) b
WHERE a.id = b.CandidateId; 


/*578. Get Highest Answer Rate Question (Medium)
SQL Schema
Table: SurveyLog
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| action      | ENUM |
| question_id | int  |
| answer_id   | int  |
| q_num       | int  |
| timestamp   | int  |
+-------------+------+
There is no primary key for this table. It may contain duplicates. action is an 
ENUM of the type: "show", "answer", or "skip". Each row of this table indicates 
the user with ID = id has taken an action with the question question_id at time 
timestamp. If the action taken by the user is "answer", answer_id will contain 
the id of that answer, otherwise, it will be null. q_num is the numeral order 
of the question in the current session. The answer rate for a question is the 
number of times a user answered the question by the number of times a user 
showed the question.

Write an SQL query to report the question that has the highest answer rate. If 
multiple questions have the same maximum answer rate, report the question with 
the smallest question_id. The query result format is in the following example.

Example 1:
Input: 
SurveyLog table: +----+--------+-------------+-----------+-------+-----------+
                 | id | action | question_id | answer_id | q_num | timestamp |
                 +----+--------+-------------+-----------+-------+-----------+
                 | 5  | show   | 285         | null      | 1     | 123       |
                 | 5  | answer | 285         | 124124    | 1     | 124       |
                 | 5  | show   | 369         | null      | 2     | 125       |
                 | 5  | skip   | 369         | null      | 2     | 126       |
                 +----+--------+-------------+-----------+-------+-----------+
Output:                                                         +------------+
                                                                | survey_log |
                                                                +------------+
                                                                | 285        |
                                                                +------------+
Explanation: Question 285 was showed 1 time and answered 1 time. The answer 
             rate of question 285 is 1.0. Question 369 was showed 1 time and 
             was not answered. The answer rate of question 369 is 0.0. Question 
             285 has the highest answer rate.*/

SELECT question_id AS survey_log
FROM survey_log
GROUP BY question_id
ORDER BY SUM(action="answer")/SUM(action="show") DESC
LIMIT 1; 


/*580. Count Student Number in Departments (Medium)
SQL Schema
Table: Student
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| student_id   | int     |
| student_name | varchar |
| gender       | varchar |
| dept_id      | int     |
+--------------+---------+
student_id is the primary key column for this table. dept_id is a foreign key 
to dept_id in the Department tables. Each row of this table indicates the name 
of a student, their gender, and the id of their department.

Table: Department
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| dept_id     | int     |
| dept_name   | varchar |
+-------------+---------+
dept_id is the primary key column for this table. Each row of this table 
contains the id and the name of a department.

Write an SQL query to report the respective department name and number of 
students majoring in each department for all departments in the Department 
table (even ones with no current students). Return the result table ordered by 
student_number in descending order. In case of a tie, order them by dept_name 
alphabetically. The query result format is in the following example.

Example 1:
Input: 
Student table: +------------+--------------+--------+---------+
               | student_id | student_name | gender | dept_id |
               +------------+--------------+--------+---------+
               | 1          | Jack         | M      | 1       |
               | 2          | Jane         | F      | 1       |
               | 3          | Mark         | M      | 2       |
               +------------+--------------+--------+---------+
Department table:                     +---------+-------------+
                                      | dept_id | dept_name   |
                                      +---------+-------------+
                                      | 1       | Engineering |
                                      | 2       | Science     |
                                      | 3       | Law         |
                                      +---------+-------------+
Output:                        +-------------+----------------+
                               | dept_name   | student_number |
                               +-------------+----------------+
                               | Engineering | 2              |
                               | Science     | 1              |
                               | Law         | 0              |
                               +-------------+----------------+*/

SELECT dept_name, IFNULL(student_number, 0) AS student_number
FROM 
    department a
    LEFT JOIN (SELECT dept_id, COUNT(*) AS student_number FROM student GROUP BY dept_id) b
    USING (dept_id)
ORDER BY student_number DESC, dept_name ASC


/*602. Friend Requests II: Who Has the Most Friends (Medium)
SQL Schema
Table: RequestAccepted
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| requester_id   | int     |
| accepter_id    | int     |
| accept_date    | date    |
+----------------+---------+
(requester_id, accepter_id) is the primary key for this table. This table 
contains the ID of the user who sent the request, the ID of the user who 
received the request, and the date when the request was accepted.
 
Write an SQL query to find the people who have the most friends and the most 
friends number. The test cases are generated so that only one person has the 
most friends. The query result format is in the following example.

Example 1:
Input: 
RequestAccepted table: +--------------+-------------+-------------+
                       | requester_id | accepter_id | accept_date |
                       +--------------+-------------+-------------+
                       | 1            | 2           | 2016/06/03  |
                       | 1            | 3           | 2016/06/08  |
                       | 2            | 3           | 2016/06/08  |
                       | 3            | 4           | 2016/06/09  |
                       +--------------+-------------+-------------+
Output:                                                +----+-----+
                                                       | id | num |
                                                       +----+-----+
                                                       | 3  | 3   |
                                                       +----+-----+
Explanation: The person with id 3 is a friend of people 1, 2, and 4, so he has 
             three friends in total, which is the most number than any others.

Follow up: In the real world, multiple people could have the same most number 
           of friends. Could you find all these people in this case?*/

SELECT 
    id, 
    COUNT(*) AS num
FROM (SELECT requester_id AS id FROM request_accepted 
      UNION ALL
      SELECT accepter_id AS id FROM request_accepted) a
GROUP BY id
ORDER BY num DESC
LIMIT 1


/*608. Tree Node (Medium)
SQL Schema
Table: Tree
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| p_id        | int  |
+-------------+------+
id is the primary key column for this table. Each row of this table contains 
information about the id of a node and the id of its parent node in a tree. The 
given structure is always a valid tree. Each node in the tree can be one of 
three types:
* "Leaf": if the node is a leaf node.
* "Root": if the node is the root of the tree.
* "Inner": If the node is neither a leaf node nor a root node.

Write an SQL query to report the type of each node in the tree. Return the 
result table ordered by id in ascending order. The query result format is in 
the following example.

Example 1:
Input: 
Tree table: +----+------+
            | id | p_id |
            +----+------+
            | 1  | null |
            | 2  | 1    |
            | 3  | 1    |
            | 4  | 2    |
            | 5  | 2    |
            +----+------+
Output:    +----+-------+
           | id | type  |
           +----+-------+
           | 1  | Root  |
           | 2  | Inner |
           | 3  | Leaf  |
           | 4  | Leaf  |
           | 5  | Leaf  |
           +----+-------+
Explanation: Node 1 is the root node because its parent node is null and it has 
             child nodes 2 and 3. Node 2 is an inner node because it has parent 
             node 1 and child node 4 and 5. Nodes 3, 4, and 5 are leaf nodes 
             because they have parent nodes and they do not have child nodes.

Example 2:
Input: 
Tree table: +----+------+
            | id | p_id |
            +----+------+
            | 1  | null |
            +----+------+
Output:    +----+-------+
           | id | type  |
           +----+-------+
           | 1  | Root  |
           +----+-------+
Explanation: If there is only one node on the tree, you only need to output its 
             root attributes.*/

SELECT 
    id, 
    CASE WHEN p_id IS NULL THEN "Root" 
         WHEN id NOT IN (SELECT IFNULL(p_id, 0) FROM tree) THEN "Leaf"
    ELSE "Inner" END AS Type
FROM tree
ORDER BY id


/*612. Shortest Distance in a Plane (Medium)
SQL Schema
Table: Point2D
+-------------+------+
| Column Name | Type |
+-------------+------+
| x           | int  |
| y           | int  |
+-------------+------+
(x, y) is the primary key column for this table. Each row of this table 
indicates the position of a point on the X-Y plane. The distance between two 
points p1(x1, y1) and p2(x2, y2) is sqrt((x2 - x1)2 + (y2 - y1)2).

Write an SQL query to report the shortest distance between any two points from 
the Point2D table. Round the distance to two decimal points. The query result 
format is in the following example.

Example 1:
Input: 
Point2D table: +----+----+
               | x  | y  |
               +----+----+
               | -1 | -1 |
               | 0  | 0  |
               | -1 | -2 |
               +----+----+
Output:       +----------+
              | shortest |
              +----------+
              | 1.00     |
              +----------+
Explanation: The shortest distance is 1.00 from point (-1, -1) to (-1, 2).*/

SELECT ROUND(SQRT(MIN(POWER(a.x-b.x, 2) + POWER(a.y-b.y, 2))), 2) AS shortest
FROM point_2d a 
    JOIN point_2d b ON NOT (a.x = b.x AND a.y = b.y)


/*614. Second Degree Follower (Medium)
SQL Schema
Table: Follow
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| followee    | varchar |
| follower    | varchar |
+-------------+---------+
(followee, follower) is the primary key column for this table. Each row of this 
table indicates that the user follower follows the user followee on a social 
network. There will not be a user following themself. A second-degree follower 
is a user who:
* follows at least one user, and
* is followed by at least one user.

Write an SQL query to report the second-degree users and the number of their 
followers. Return the result table ordered by follower in alphabetical order.
The query result format is in the following example.

Example 1:
Input: 
Follow table: +----------+----------+
              | followee | follower |
              +----------+----------+
              | Alice    | Bob      |
              | Bob      | Cena     |
              | Bob      | Donald   |
              | Donald   | Edward   |
              +----------+----------+
Output:            +----------+-----+
                   | follower | num |
                   +----------+-----+
                   | Bob      | 2   |
                   | Donald   | 1   |
                   +----------+-----+
Explanation: User Bob has 2 followers. Bob is a second-degree follower because 
             he follows Alice, so we include him in the result table. User 
             Donald has 1 follower. Donald is a second-degree follower because 
             he follows Bob, so we include him in the result table. User Alice 
             has 1 follower. Alice is not a second-degree follower because she 
             does not follow anyone, so we don not include her in the result 
             table.*/

SELECT 
    followee AS follower, 
    COUNT(DISTINCT follower) AS num
FROM follow
WHERE followee IN (SELECT follower FROM follow)
GROUP BY followee
ORDER BY followee


/*626. Exchange Seats (Medium)
SQL Schema
Table: Seat
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| student     | varchar |
+-------------+---------+
id is the primary key column for this table. Each row of this table indicates 
the name and the ID of a student. id is a continuous increment.

Write an SQL query to swap the seat id of every two consecutive students. If 
the number of students is odd, the id of the last student is not swapped. 
Return the result table ordered by id in ascending order. The query result 
format is in the following example.

Example 1:
Input: 
Seat table: +----+---------+
            | id | student |
            +----+---------+
            | 1  | Abbot   |
            | 2  | Doris   |
            | 3  | Emerson |
            | 4  | Green   |
            | 5  | Jeames  |
            +----+---------+
Output:     +----+---------+
            | id | student |
            +----+---------+
            | 1  | Doris   |
            | 2  | Abbot   |
            | 3  | Green   |
            | 4  | Emerson |
            | 5  | Jeames  |
            +----+---------+
Explanation: Note that if the number of students is odd, there is no need to 
             change the last one's seat.*/

SELECT 
    CASE WHEN MOD(id, 2) AND id = (SELECT COUNT(*) FROM seat) THEN id
         ELSE (id+1)^1-1
    END AS id, student
FROM 
    seat
ORDER BY id


/*1045. Customers Who Bought All Products (Medium)
SQL Schema
Table: Customer
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| customer_id | int     |
| product_key | int     |
+-------------+---------+
There is no primary key for this table. It may contain duplicates. product_key 
is a foreign key to Product table.

Table: Product
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_key | int     |
+-------------+---------+
product_key is the primary key column for this table.

Write an SQL query to report the customer ids from the Customer table that 
bought all the products in the Product table. Return the result table in any 
order. The query result format is in the following example.

Example 1:
Input: 
Customer table: +-------------+-------------+
                | customer_id | product_key |
                +-------------+-------------+
                | 1           | 5           |
                | 2           | 6           |
                | 3           | 5           |
                | 3           | 6           |
                | 1           | 6           |
                +-------------+-------------+
Product table:                +-------------+
                              | product_key |
                              +-------------+
                              | 5           |
                              | 6           |
                              +-------------+
Output:                       +-------------+
                              | customer_id |
                              +-------------+
                              | 1           |
                              | 3           |
                              +-------------+
Explanation: The customers who bought all the products (5 and 6) are customers 
             with IDs 1 and 3.*/

SELECT customer_id
FROM Customer
GROUP BY customer_id
HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product)


/*1070. Product Sales Analysis III (Medium)
SQL Schema
Table: Sales
+-------------+-------+
| Column Name | Type  |
+-------------+-------+
| sale_id     | int   |
| product_id  | int   |
| year        | int   |
| quantity    | int   |
| price       | int   |
+-------------+-------+
(sale_id, year) is the primary key of this table. product_id is a foreign key 
to Product table. Each row of this table shows a sale on the product product_id 
in a certain year. Note that the price is per unit.

Table: Product
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| product_id   | int     |
| product_name | varchar |
+--------------+---------+
product_id is the primary key of this table. Each row of this table indicates 
the product name of each product.

Write an SQL query that selects the product id, year, quantity, and price for 
the first year of every product sold. Return the resulting table in any order.
The query result format is in the following example.
 
Example 1:
Input: 
Sales table: +---------+------------+------+----------+-------+
             | sale_id | product_id | year | quantity | price |
             +---------+------------+------+----------+-------+ 
             | 1       | 100        | 2008 | 10       | 5000  |
             | 2       | 100        | 2009 | 12       | 5000  |
             | 7       | 200        | 2011 | 15       | 9000  |
             +---------+------------+------+----------+-------+
Product table:                    +------------+--------------+
                                  | product_id | product_name |
                                  +------------+--------------+
                                  | 100        | Nokia        |
                                  | 200        | Apple        |
                                  | 300        | Samsung      |
                                  +------------+--------------+
Output:          +------------+------------+----------+-------+
                 | product_id | first_year | quantity | price |
                 +------------+------------+----------+-------+ 
                 | 100        | 2008       | 10       | 5000  |
                 | 200        | 2011       | 15       | 9000  |
                 +------------+------------+----------+-------+*/

SELECT 
    product_id, 
    year AS first_year, 
    quantity, 
    price
FROM 
    Sales 
WHERE CONCAT(product_id, year) IN 
    (SELECT CONCAT(product_id, MIN(year)) FROM Sales GROUP BY product_id)


/*1077. Project Employees III (Medium)
SQL Schema
Table: Project
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| project_id  | int     |
| employee_id | int     |
+-------------+---------+
(project_id, employee_id) is the primary key of this table. employee_id is a 
foreign key to Employee table. Each row of this table indicates that the 
employee with employee_id is working on the project with project_id.

Table: Employee
+------------------+---------+
| Column Name      | Type    |
+------------------+---------+
| employee_id      | int     |
| name             | varchar |
| experience_years | int     |
+------------------+---------+
employee_id is the primary key of this table. Each row of this table contains 
information about one employee.

Write an SQL query that reports the most experienced employees in each project. 
In case of a tie, report all employees with the maximum number of experience 
years. Return the result table in any order. The query result format is in the 
following example.

Example 1:
Input: 
Project table:                +-------------+-------------+
                              | project_id  | employee_id |
                              +-------------+-------------+
                              | 1           | 1           |
                              | 1           | 2           |
                              | 1           | 3           |
                              | 2           | 1           |
                              | 2           | 4           |
                              +-------------+-------------+
Employee table: +-------------+--------+------------------+
                | employee_id | name   | experience_years |
                +-------------+--------+------------------+
                | 1           | Khaled | 3                |
                | 2           | Ali    | 2                |
                | 3           | John   | 3                |
                | 4           | Doe    | 2                |
                +-------------+--------+------------------+
Output:                     +-------------+---------------+
                            | project_id  | employee_id   |
                            +-------------+---------------+
                            | 1           | 1             |
                            | 1           | 3             |
                            | 2           | 1             |
                            +-------------+---------------+
Explanation: Both employees with id 1 and 3 have the most experience among the 
             employees of the first project. For the second project, the 
             employee with id 1 has the most experience.*/

SELECT 
    project_id, 
    employee_id 
FROM 
    Project a
    JOIN Employee USING (employee_id)
WHERE 
    experience_years = (SELECT MAX(experience_years) FROM Project JOIN Employee USING (employee_id) WHERE project_id = a.project_id);


/*1098. Unpopular Books (Medium)
SQL Schema
Table: Books
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| book_id        | int     |
| name           | varchar |
| available_from | date    |
+----------------+---------+
book_id is the primary key of this table.

Table: Orders
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| order_id       | int     |
| book_id        | int     |
| quantity       | int     |
| dispatch_date  | date    |
+----------------+---------+
order_id is the primary key of this table. book_id is a foreign key to the 
Books table.
 
Write an SQL query that reports the books that have sold less than 10 copies in 
the last year, excluding books that have been available for less than one month 
from today. Assume today is 2019-06-23. Return the result table in any order.
The query result format is in the following example.

Example 1:
Input: 
Books table:  +---------+--------------------+----------------+
              | book_id | name               | available_from |
              +---------+--------------------+----------------+
              | 1       | "Kalila And Demna" | 2010-01-01     |
              | 2       | "28 Letters"       | 2012-05-12     |
              | 3       | "The Hobbit"       | 2019-06-10     |
              | 4       | "13 Reasons Why"   | 2019-06-01     |
              | 5       | "The Hunger Games" | 2008-09-21     |
              +---------+--------------------+----------------+
Orders table: +----------+---------+----------+---------------+
              | order_id | book_id | quantity | dispatch_date |
              +----------+---------+----------+---------------+
              | 1        | 1       | 2        | 2018-07-26    |
              | 2        | 1       | 1        | 2018-11-05    |
              | 3        | 3       | 8        | 2019-06-11    |
              | 4        | 4       | 6        | 2019-06-05    |
              | 5        | 4       | 5        | 2019-06-20    |
              | 6        | 5       | 9        | 2009-02-02    |
              | 7        | 5       | 8        | 2010-04-13    |
              +----------+---------+----------+---------------+
Output:                      +-----------+--------------------+
                             | book_id   | name               |
                             +-----------+--------------------+
                             | 1         | "Kalila And Demna" |
                             | 2         | "28 Letters"       |
                             | 5         | "The Hunger Games" |
                             +-----------+--------------------+*/

SELECT book_id, name 
FROM Books
WHERE 
    available_from < ADDDATE("2019-06-23", INTERVAL -1 MONTH) #excluding books available less than one month
    AND 
    book_id NOT IN (SELECT book_id #popular books
                    FROM Orders 
                    WHERE dispatch_date > ADDDATE(DATE("2019-06-23"), INTERVAL -1 YEAR) 
                    GROUP BY book_id 
                    HAVING SUM(quantity) >= 10)


/*1107. New Users Daily Count (Medium)
SQL Schema
Table: Traffic
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user_id       | int     |
| activity      | enum    |
| activity_date | date    |
+---------------+---------+
There is no primary key for this table, it may have duplicate rows. The 
activity column is an ENUM type of ('login', 'logout', 'jobs', 'groups', 
'homepage').

Write an SQL query to reports for every date within at most 90 days from today, 
the number of users that logged in for the first time on that date. Assume 
today is 2019-06-30. Return the result table in any order. The query result 
format is in the following example.

Example 1:
Input: 
Traffic table: +---------+----------+---------------+
               | user_id | activity | activity_date |
               +---------+----------+---------------+
               | 1       | login    | 2019-05-01    |
               | 1       | homepage | 2019-05-01    |
               | 1       | logout   | 2019-05-01    |
               | 2       | login    | 2019-06-21    |
               | 2       | logout   | 2019-06-21    |
               | 3       | login    | 2019-01-01    |
               | 3       | jobs     | 2019-01-01    |
               | 3       | logout   | 2019-01-01    |
               | 4       | login    | 2019-06-21    |
               | 4       | groups   | 2019-06-21    |
               | 4       | logout   | 2019-06-21    |
               | 5       | login    | 2019-03-01    |
               | 5       | logout   | 2019-03-01    |
               | 5       | login    | 2019-06-21    |
               | 5       | logout   | 2019-06-21    |
               +---------+----------+---------------+
Output:                  +------------+-------------+
                         | login_date | user_count  |
                         +------------+-------------+
                         | 2019-05-01 | 1           |
                         | 2019-06-21 | 2           |
                         +------------+-------------+
Explanation: Note that we only care about dates with non zero user count. The 
             user with id 5 first logged in on 2019-03-01 so he's not counted 
             on 2019-06-21.*/

SELECT login_date, COUNT(*) AS user_count
FROM (SELECT user_id, MIN(activity_date) AS login_date 
      FROM Traffic 
      WHERE activity = "login" 
      GROUP BY user_id 
      HAVING login_date >= ADDDATE(DATE("2019-06-30"), INTERVAL -90 DAY)) a
GROUP BY login_date


/*1112. Highest Grade For Each Student (Medium)
SQL Schema
Table: Enrollments
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| student_id    | int     |
| course_id     | int     |
| grade         | int     |
+---------------+---------+
(student_id, course_id) is the primary key of this table.

Write a SQL query to find the highest grade with its corresponding course for 
each student. In case of a tie, you should find the course with the smallest 
course_id. Return the result table ordered by student_id in ascending order. 
The query result format is in the following example.

Example 1:
Input: 
Enrollments table: +------------+-------------------+
                   | student_id | course_id | grade |
                   +------------+-----------+-------+
                   | 2          | 2         | 95    |
                   | 2          | 3         | 95    |
                   | 1          | 1         | 90    |
                   | 1          | 2         | 99    |
                   | 3          | 1         | 80    |
                   | 3          | 2         | 75    |
                   | 3          | 3         | 82    |
                   +------------+-----------+-------+
Output:            +------------+-------------------+
                   | student_id | course_id | grade |
                   +------------+-----------+-------+
                   | 1          | 2         | 99    |
                   | 2          | 2         | 95    |
                   | 3          | 3         | 82    |
                   +------------+-----------+-------+*/

SELECT student_id, MIN(course_id) AS course_id, grade
FROM 
    Enrollments
    JOIN (SELECT student_id, MAX(grade) AS max_grade 
          FROM Enrollments 
          GROUP BY student_id) a USING (student_id)
WHERE grade = max_grade
GROUP BY 1, 3
ORDER BY 1


/*1126. Active Businesses (Medium)
SQL Schema
Table: Events
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| business_id   | int     |
| event_type    | varchar |
| occurences    | int     | 
+---------------+---------+
(business_id, event_type) is the primary key of this table. Each row in the 
table logs the info that an event of some type occurred at some business for a 
number of times. The average activity for a particular event_type is the 
average occurences across all companies that have this event. An active 
business is a business that has more than one event_type such that their 
occurences is strictly greater than the average activity for that event.

Write an SQL query to find all active businesses. Return the result table in 
any order. The query result format is in the following example.

Example 1:
Input: 
Events table: +-------------+------------+------------+
              | business_id | event_type | occurences |
              +-------------+------------+------------+
              | 1           | reviews    | 7          |
              | 3           | reviews    | 3          |
              | 1           | ads        | 11         |
              | 2           | ads        | 7          |
              | 3           | ads        | 6          |
              | 1           | page views | 3          |
              | 2           | page views | 12         |
              +-------------+------------+------------+
Output:                                 +-------------+
                                        | business_id |
                                        +-------------+
                                        | 1           |
                                        +-------------+
Explanation: The average activity for each event can be calculated as follows:
             - 'reviews': (7+3)/2 = 5
             - 'ads': (11+7+6)/3 = 8
             - 'page views': (3+12)/2 = 7.5
             The business with id=1 has 7 'reviews' events (more than 5) and 11 
             'ads' events (more than 8), so it is an active business.*/

SELECT business_id
FROM 
    Events a
    JOIN (SELECT event_type, AVG(occurences) as occurences
          FROM Events 
          GROUP BY event_type) b ON a.event_type = b.event_type AND a.occurences > b.occurences
GROUP BY business_id
HAVING COUNT(a.event_type) > 1


/*1132. Reported Posts II (Medium)
SQL Schema
Table: Actions
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user_id       | int     |
| post_id       | int     |
| action_date   | date    | 
| action        | enum    |
| extra         | varchar |
+---------------+---------+
There is no primary key for this table, it may have duplicate rows. The action 
column is an ENUM type of ('view', 'like', 'reaction', 'comment', 'report', 
'share'). The extra column has optional information about the action, such as a 
reason for the report or a type of reaction.

Table: Removals
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| post_id       | int     |
| remove_date   | date    | 
+---------------+---------+
post_id is the primary key of this table. Each row in this table indicates that 
some post was removed due to being reported or as a result of an admin review.

Write an SQL query to find the average daily percentage of posts that got 
removed after being reported as spam, rounded to 2 decimal places. The query 
result format is in the following example.

Example 1:
Input: 
Actions table: +---------+---------+-------------+--------+--------+
               | user_id | post_id | action_date | action | extra  |
               +---------+---------+-------------+--------+--------+
               | 1       | 1       | 2019-07-01  | view   | null   |
               | 1       | 1       | 2019-07-01  | like   | null   |
               | 1       | 1       | 2019-07-01  | share  | null   |
               | 2       | 2       | 2019-07-04  | view   | null   |
               | 2       | 2       | 2019-07-04  | report | spam   |
               | 3       | 4       | 2019-07-04  | view   | null   |
               | 3       | 4       | 2019-07-04  | report | spam   |
               | 4       | 3       | 2019-07-02  | view   | null   |
               | 4       | 3       | 2019-07-02  | report | spam   |
               | 5       | 2       | 2019-07-03  | view   | null   |
               | 5       | 2       | 2019-07-03  | report | racism |
               | 5       | 5       | 2019-07-03  | view   | null   |
               | 5       | 5       | 2019-07-03  | report | racism |
               +---------+---------+-------------+--------+--------+
Removals table:                            +---------+-------------+
                                           | post_id | remove_date |
                                           +---------+-------------+
                                           | 2       | 2019-07-20  |
                                           | 3       | 2019-07-18  |
                                           +---------+-------------+
Output:                                    +-----------------------+
                                           | average_daily_percent |
                                           +-----------------------+
                                           | 75.00                 |
                                           +-----------------------+
Explanation: The percentage for 2019-07-04 is 50% because only one post of two 
             spam reported posts were removed. The percentage for 2019-07-02 is 
             100% because one post was reported as spam and it was removed. The 
             other days had no spam reports so the average is 
             (50 + 100) / 2 = 75%. Note that the output is only one number and 
             that we do not care about the remove dates.*/

SELECT ROUND(AVG(result), 2) AS average_daily_percent
FROM (SELECT 100*COUNT(DISTINCT b.post_id)/COUNT(DISTINCT a.post_id) AS result 
      FROM Actions a
      LEFT JOIN Removals b ON a.post_id = b.post_id 
      WHERE a.action = "report" AND a.extra = "spam" 
      GROUP BY action_date) c


/*1149. Article Views II (Medium)
SQL Schema
Table: Views
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| article_id    | int     |
| author_id     | int     |
| viewer_id     | int     |
| view_date     | date    |
+---------------+---------+
There is no primary key for this table, it may have duplicate rows. Each row of 
this table indicates that some viewer viewed an article (written by some author) 
on some date.  Note that equal author_id and viewer_id indicate the same person.

Write an SQL query to find all the people who viewed more than one article on 
the same date. Return the result table sorted by id in ascending order. The 
query result format is in the following example.

Example 1:
Input: 
Views table: +------------+-----------+-----------+------------+
             | article_id | author_id | viewer_id | view_date  |
             +------------+-----------+-----------+------------+
             | 1          | 3         | 5         | 2019-08-01 |
             | 3          | 4         | 5         | 2019-08-01 |
             | 1          | 3         | 6         | 2019-08-02 |
             | 2          | 7         | 7         | 2019-08-01 |
             | 2          | 7         | 6         | 2019-08-02 |
             | 4          | 7         | 1         | 2019-07-22 |
             | 3          | 4         | 4         | 2019-07-21 |
             | 3          | 4         | 4         | 2019-07-21 |
             +------------+-----------+-----------+------------+
Output:                                                 +------+
                                                        | id   |
                                                        +------+
                                                        | 5    |
                                                        | 6    |
                                                        +------+*/

SELECT DISTINCT viewer_id AS id
FROM Views
GROUP BY view_date, viewer_id
HAVING COUNT(DISTINCT article_id) > 1
ORDER BY viewer_id


/*1158. Market Analysis I (Medium)
SQL Schema
Table: Users
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| user_id        | int     |
| join_date      | date    |
| favorite_brand | varchar |
+----------------+---------+
user_id is the primary key of this table. This table has the info of the users 
of an online shopping website where users can sell and buy items.

Table: Orders
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| order_date    | date    |
| item_id       | int     |
| buyer_id      | int     |
| seller_id     | int     |
+---------------+---------+
order_id is the primary key of this table. item_id is a foreign key to the 
Items table. buyer_id and seller_id are foreign keys to the Users table.

Table: Items
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| item_id       | int     |
| item_brand    | varchar |
+---------------+---------+
item_id is the primary key of this table.

Write an SQL query to find for each user, the join date and the number of 
orders they made as a buyer in 2019. Return the result table in any order. The 
query result format is in the following example.

Example 1:
Input: 
Users table:                   +---------+------------+----------------+
                               | user_id | join_date  | favorite_brand |
                               +---------+------------+----------------+
                               | 1       | 2018-01-01 | Lenovo         |
                               | 2       | 2018-02-09 | Samsung        |
                               | 3       | 2018-01-19 | LG             |
                               | 4       | 2018-05-21 | HP             |
                               +---------+------------+----------------+
Orders table: +----------+------------+---------+----------+-----------+
              | order_id | order_date | item_id | buyer_id | seller_id |
              +----------+------------+---------+----------+-----------+
              | 1        | 2019-08-01 | 4       | 1        | 2         |
              | 2        | 2018-08-02 | 2       | 1        | 3         |
              | 3        | 2019-08-03 | 3       | 2        | 3         |
              | 4        | 2018-08-04 | 1       | 4        | 2         |
              | 5        | 2018-08-04 | 1       | 3        | 4         |
              | 6        | 2019-08-05 | 2       | 2        | 4         |
              +----------+------------+---------+----------+-----------+
Items table:                                    +---------+------------+
                                                | item_id | item_brand |
                                                +---------+------------+
                                                | 1       | Samsung    |
                                                | 2       | Lenovo     |
                                                | 3       | LG         |
                                                | 4       | HP         |
                                                +---------+------------+
Output:                      +-----------+------------+----------------+
                             | buyer_id  | join_date  | orders_in_2019 |
                             +-----------+------------+----------------+
                             | 1         | 2018-01-01 | 1              |
                             | 2         | 2018-02-09 | 2              |
                             | 3         | 2018-01-19 | 0              |
                             | 4         | 2018-05-21 | 0              |
                             +-----------+------------+----------------+*/

SELECT 
    user_id AS buyer_id, 
    join_date, 
    COUNT(order_id) AS orders_in_2019
FROM 
    Users a
    LEFT JOIN Orders b ON a.user_id = b.buyer_id AND YEAR(order_date) = 2019
GROUP BY user_id


/*1164. Product Price at a Given Date (Medium)
SQL Schema
Table: Products
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| product_id    | int     |
| new_price     | int     |
| change_date   | date    |
+---------------+---------+
(product_id, change_date) is the primary key of this table. Each row of this 
table indicates that the price of some product was changed to a new price at 
some date.

Write an SQL query to find the prices of all products on 2019-08-16. Assume the 
price of all products before any change is 10. Return the result table in any 
order. The query result format is in the following example.

Example 1:
Input: 
Products table: +------------+-----------+-------------+
                | product_id | new_price | change_date |
                +------------+-----------+-------------+
                | 1          | 20        | 2019-08-14  |
                | 2          | 50        | 2019-08-14  |
                | 1          | 30        | 2019-08-15  |
                | 1          | 35        | 2019-08-16  |
                | 2          | 65        | 2019-08-17  |
                | 3          | 20        | 2019-08-18  |
                +------------+-----------+-------------+
Output:                           +------------+-------+
                                  | product_id | price |
                                  +------------+-------+
                                  | 2          | 50    |
                                  | 1          | 35    |
                                  | 3          | 10    |
                                  +------------+-------+*/

(SELECT product_id, new_price AS price 
 FROM 
    Products 
    JOIN (SELECT product_id, MAX(change_date) AS change_date 
          FROM Products 
          WHERE change_date <= "2019-08-16" 
          GROUP BY product_id) a USING (product_id, change_date))    
UNION 
(SELECT product_id, 10 AS price 
 FROM Products 
 GROUP BY product_id 
 HAVING MIN(change_date) > "2019-08-16")


/*1174. Immediate Food Delivery II (Medium)
SQL Schema
Table: Delivery
+-----------------------------+---------+
| Column Name                 | Type    |
+-----------------------------+---------+
| delivery_id                 | int     |
| customer_id                 | int     |
| order_date                  | date    |
| customer_pref_delivery_date | date    |
+-----------------------------+---------+
delivery_id is the primary key of this table. The table holds information about 
food delivery to customers that make orders at some date and specify a 
preferred delivery date (on the same order date or after it). If the customer's 
preferred delivery date is the same as the order date, then the order is called 
immediate; otherwise, it is called scheduled. The first order of a customer is 
the order with the earliest order date that the customer made. It is guaranteed 
that a customer has precisely one first order.

Write an SQL query to find the percentage of immediate orders in the first 
orders of all customers, rounded to 2 decimal places. The query result format 
is in the following example.

Example 1:
Input: 
Delivery table: +-------------+-------------+------------+-----------------------------+
                | delivery_id | customer_id | order_date | customer_pref_delivery_date |
                +-------------+-------------+------------+-----------------------------+
                | 1           | 1           | 2019-08-01 | 2019-08-02                  |
                | 2           | 2           | 2019-08-02 | 2019-08-02                  |
                | 3           | 1           | 2019-08-11 | 2019-08-12                  |
                | 4           | 3           | 2019-08-24 | 2019-08-24                  |
                | 5           | 3           | 2019-08-21 | 2019-08-22                  |
                | 6           | 2           | 2019-08-11 | 2019-08-13                  |
                | 7           | 4           | 2019-08-09 | 2019-08-09                  |
                +-------------+-------------+------------+-----------------------------+
Output:                                                         +----------------------+
                                                                | immediate_percentage |
                                                                +----------------------+
                                                                | 50.00                |
                                                                +----------------------+
Explanation: The customer id 1 has a first order with delivery id 1 and it is 
             scheduled. The customer id 2 has a first order with delivery id 2 
             and it is immediate. The customer id 3 has a first order with 
             delivery id 5 and it is scheduled. The customer id 4 has a first 
             order with delivery id 7 and it is immediate. Hence, half the 
             customers have immediate first orders.*/

SELECT 
    ROUND(100*AVG(order_date = customer_pref_delivery_date), 2) AS immediate_percentage
FROM 
    Delivery 
    JOIN (SELECT customer_id, MIN(order_date) AS order_date FROM Delivery GROUP BY customer_id) a USING (customer_id, order_date)


/*1193. Monthly Transactions I (Medium)
SQL Schema
Table: Transactions
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| country       | varchar |
| state         | enum    |
| amount        | int     |
| trans_date    | date    |
+---------------+---------+
id is the primary key of this table. The table has information about incoming 
transactions. The state column is an enum of type ["approved", "declined"].

Write an SQL query to find for each month and country, the number of 
transactions and their total amount, the number of approved transactions and 
their total amount. Return the result table in any order. The query result 
format is in the following example.

Example 1:
Input: 
Transactions table: +------+---------+----------+--------+------------+
                    | id   | country | state    | amount | trans_date |
                    +------+---------+----------+--------+------------+
                    | 121  | US      | approved | 1000   | 2018-12-18 |
                    | 122  | US      | declined | 2000   | 2018-12-19 |
                    | 123  | US      | approved | 2000   | 2019-01-01 |
                    | 124  | DE      | approved | 2000   | 2019-01-07 |
                    +------+---------+----------+--------+------------+
Output: +----------+---------+-------------+----------------+--------------------+-----------------------+
        | month    | country | trans_count | approved_count | trans_total_amount | approved_total_amount |
        +----------+---------+-------------+----------------+--------------------+-----------------------+
        | 2018-12  | US      | 2           | 1              | 3000               | 1000                  |
        | 2019-01  | US      | 1           | 1              | 2000               | 2000                  |
        | 2019-01  | DE      | 1           | 1              | 2000               | 2000                  |
        +----------+---------+-------------+----------------+--------------------+-----------------------+*/

SELECT 
    LEFT(trans_date, 7) AS month, 
    country, 
    COUNT(*) AS trans_count, 
    COUNT(IF(state = "approved", 1, NULL)) AS approved_count, 
    SUM(amount) AS trans_total_amount, 
    SUM(IF(state = "approved", amount, 0)) AS approved_total_amount
FROM 
    Transactions
GROUP BY 
    LEFT(trans_date, 7), country


/*1204. Last Person to Fit in the Bus (Medium)
SQL Schema
Table: Queue
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| person_id   | int     |
| person_name | varchar |
| weight      | int     |
| turn        | int     |
+-------------+---------+
person_id is the primary key column for this table. This table has the 
information about all people waiting for a bus. The person_id and turn columns 
will contain all numbers from 1 to n, where n is the number of rows in the 
table. turn determines the order of which the people will board the bus, where 
turn=1 denotes the first person to board and turn=n denotes the last person to 
board. weight is the weight of the person in kilograms. There is a queue of 
people waiting to board a bus. However, the bus has a weight limit of 1000 
kilograms, so there may be some people who cannot board.

Write an SQL query to find the person_name of the last person that can fit on 
the bus without exceeding the weight limit. The test cases are generated such 
that the first person does not exceed the weight limit. The query result format 
is in the following example.

Example 1:
Input: 
Queue table: +-----------+-------------+--------+------+
             | person_id | person_name | weight | turn |
             +-----------+-------------+--------+------+
             | 5         | Alice       | 250    | 1    |
             | 4         | Bob         | 175    | 5    |
             | 3         | Alex        | 350    | 2    |
             | 6         | John Cena   | 400    | 3    |
             | 1         | Winston     | 500    | 6    |
             | 2         | Marie       | 200    | 4    |
             +-----------+-------------+--------+------+
Output:                                  +-------------+
                                         | person_name |
                                         +-------------+
                                         | John Cena   |
                                         +-------------+
Explanation: The folowing table is ordered by the turn for simplicity.
             +------+----+-----------+--------+--------------+
             | Turn | ID | Name      | Weight | Total Weight |
             +------+----+-----------+--------+--------------+
             | 1    | 5  | Alice     | 250    | 250          |
             | 2    | 3  | Alex      | 350    | 600          |
             | 3    | 6  | John Cena | 400    | 1000         | (last person to board)
             | 4    | 2  | Marie     | 200    | 1200         | (cannot board)
             | 5    | 4  | Bob       | 175    | ___          |
             | 6    | 1  | Winston   | 500    | ___          |
             +------+----+-----------+--------+--------------+*/

SELECT a.person_name
FROM 
    Queue a
    JOIN Queue b ON a.turn >= b.turn 
GROUP BY a.turn
HAVING SUM(b.weight) <= 1000
ORDER BY SUM(b.weight) DESC
LIMIT 1


/*1205. Monthly Transactions II (Medium)
SQL Schema
Table: Transactions
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| id             | int     |
| country        | varchar |
| state          | enum    |
| amount         | int     |
| trans_date     | date    |
+----------------+---------+
id is the primary key of this table. The table has information about incoming 
transactions. The state column is an enum of type ["approved", "declined"].
Table: Chargebacks
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| trans_id       | int     |
| trans_date     | date    |
+----------------+---------+
Chargebacks contains basic information regarding incoming chargebacks from some 
transactions placed in Transactions table. trans_id is a foreign key to the id 
column of Transactions table. Each chargeback corresponds to a transaction made 
previously even if they were not approved.

Write an SQL query to find for each month and country: the number of approved 
transactions and their total amount, the number of chargebacks, and their total 
amount. Note: In your query, given the month and country, ignore rows with all 
zeros. Return the result table in any order. The query result format is in the 
following example.

Example 1:
Input: 
Transactions table: +-----+---------+----------+--------+------------+
                    | id  | country | state    | amount | trans_date |
                    +-----+---------+----------+--------+------------+
                    | 101 | US      | approved | 1000   | 2019-05-18 |
                    | 102 | US      | declined | 2000   | 2019-05-19 |
                    | 103 | US      | approved | 3000   | 2019-06-10 |
                    | 104 | US      | declined | 4000   | 2019-06-13 |
                    | 105 | US      | approved | 5000   | 2019-06-15 |
                    +-----+---------+----------+--------+------------+
Chargebacks table:                           +----------+------------+
                                             | trans_id | trans_date |
                                             +----------+------------+
                                             | 102      | 2019-05-29 |
                                             | 101      | 2019-06-30 |
                                             | 105      | 2019-09-18 |
                                             +----------+------------+
Output: +---------+---------+----------------+-----------------+------------------+-------------------+
        | month   | country | approved_count | approved_amount | chargeback_count | chargeback_amount |
        +---------+---------+----------------+-----------------+------------------+-------------------+
        | 2019-05 | US      | 1              | 1000            | 1                | 2000              |
        | 2019-06 | US      | 2              | 8000            | 1                | 1000              |
        | 2019-09 | US      | 0              | 0               | 1                | 5000              |
        +---------+---------+----------------+-----------------+------------------+-------------------+*/

SELECT 
    LEFT(trans_date, 7) AS month, 
    country, 
    SUM(state = "approved") AS approved_count, 
    SUM(IF(state = "approved", amount, 0)) AS approved_amount, 
    SUM(state = "chargebacks") AS chargeback_count, 
    SUM(IF(state = "chargebacks", amount, 0)) AS chargeback_amount
FROM ((SELECT * FROM Transactions WHERE state = "approved") 
      UNION ALL
      (SELECT a.id, country, "chargebacks" AS state, amount, b.trans_date 
       FROM Transactions a 
       RIGHT JOIN Chargebacks b ON a.id = b.trans_id)) c
GROUP BY LEFT(trans_date, 7), country


/*1212. Team Scores in Football Tournament (Medium)
SQL Schema
Table: Teams
+---------------+----------+
| Column Name   | Type     |
+---------------+----------+
| team_id       | int      |
| team_name     | varchar  |
+---------------+----------+
team_id is the primary key of this table. Each row of this table represents a 
single football team.

Table: Matches
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| match_id      | int     |
| host_team     | int     |
| guest_team    | int     | 
| host_goals    | int     |
| guest_goals   | int     |
+---------------+---------+
match_id is the primary key of this table. Each row is a record of a finished 
match between two different teams. Teams host_team and guest_team are 
represented by their IDs in the Teams table (team_id), and they scored 
host_goals and guest_goals goals, respectively. You would like to compute the 
scores of all teams after all matches. Points are awarded as follows:
* A team receives three points if they win a match (i.e., Scored more goals 
  than the opponent team).
* A team receives one point if they draw a match (i.e., Scored the same number 
  of goals as the opponent team).
* A team receives no points if they lose a match (i.e., Scored fewer goals than 
  the opponent team).
Write an SQL query that selects the team_id, team_name and num_points of each 
team in the tournament after all described matches. Return the result table 
ordered by num_points in decreasing order. In case of a tie, order the records 
by team_id in increasing order. The query result format is in the following 
example.

Example 1:
Input: 
Teams table:   +-----------+--------------+
               | team_id   | team_name    |
               +-----------+--------------+
               | 10        | Leetcode FC  |
               | 20        | NewYork FC   |
               | 30        | Atlanta FC   |
               | 40        | Chicago FC   |
               | 50        | Toronto FC   |
               +-----------+--------------+
Matches table: +------------+--------------+---------------+-------------+--------------+
               | match_id   | host_team    | guest_team    | host_goals  | guest_goals  |
               +------------+--------------+---------------+-------------+--------------+
               | 1          | 10           | 20            | 3           | 0            |
               | 2          | 30           | 10            | 2           | 2            |
               | 3          | 10           | 50            | 5           | 1            |
               | 4          | 20           | 30            | 1           | 0            |
               | 5          | 50           | 30            | 1           | 0            |
               +------------+--------------+---------------+-------------+--------------+
Output:        +------------+--------------+---------------+
               | team_id    | team_name    | num_points    |
               +------------+--------------+---------------+
               | 10         | Leetcode FC  | 7             |
               | 20         | NewYork FC   | 3             |
               | 50         | Toronto FC   | 3             |
               | 30         | Atlanta FC   | 1             |
               | 40         | Chicago FC   | 0             |
               +------------+--------------+---------------+*/

SELECT 
    team_id, 
    team_name, 
    IFNULL(SUM(IF(team_id = host_team, 3*(host_goals>guest_goals), 3*(host_goals<guest_goals)) + (host_goals=guest_goals)), 0) AS num_points
FROM 
    Teams LEFT JOIN 
    Matches ON team_id = host_team OR team_id = guest_team 
GROUP BY team_id
ORDER BY num_points DESC, team_id ASC


/*1264. Page Recommendations (Medium)
SQL Schema
Table: Friendship
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user1_id      | int     |
| user2_id      | int     |
+---------------+---------+
(user1_id, user2_id) is the primary key for this table. Each row of this table 
indicates that there is a friendship relation between user1_id and user2_id.

Table: Likes
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| user_id     | int     |
| page_id     | int     |
+-------------+---------+
(user_id, page_id) is the primary key for this table. Each row of this table 
indicates that user_id likes page_id.

Write an SQL query to recommend pages to the user with user_id = 1 using the 
pages that your friends liked. It should not recommend pages you already liked.
Return result table in any order without duplicates. The query result format is 
in the following example.

Example 1:
Input: 
Friendship table: +----------+----------+
                  | user1_id | user2_id |
                  +----------+----------+
                  | 1        | 2        |
                  | 1        | 3        |
                  | 1        | 4        |
                  | 2        | 3        |
                  | 2        | 4        |
                  | 2        | 5        |
                  | 6        | 1        |
                  +----------+----------+
Likes table:      +---------+---------+
                  | user_id | page_id |
                  +---------+---------+
                  | 1       | 88      |
                  | 2       | 23      |
                  | 3       | 24      |
                  | 4       | 56      |
                  | 5       | 11      |
                  | 6       | 33      |
                  | 2       | 77      |
                  | 3       | 77      |
                  | 6       | 88      |
                  +---------+---------+
Output:           +------------------+
                  | recommended_page |
                  +------------------+
                  | 23               |
                  | 24               |
                  | 56               |
                  | 33               |
                  | 77               |
                  +------------------+
Explanation: User one is friend with users 2, 3, 4 and 6. Suggested pages are 
             23 from user 2, 24 from user 3, 56 from user 3 and 33 from user 6.
             Page 77 is suggested from both user 2 and user 3. Page 88 is not 
             suggested because user 1 already likes it.*/

SELECT DISTINCT page_id AS recommended_page
FROM Likes
WHERE 
    user_id IN (SELECT 
                CASE WHEN user1_id=1 THEN user2_id
                     WHEN user2_id=1 THEN user1_id END
                FROM Friendship)
AND 
    page_id NOT IN (SELECT page_id FROM Likes WHERE user_id=1)


/*1270. All People Report to the Given Manager (Medium)
SQL Schema
Table: Employees
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| employee_id   | int     |
| employee_name | varchar |
| manager_id    | int     |
+---------------+---------+
employee_id is the primary key for this table. Each row of this table indicates 
that the employee with ID employee_id and name employee_name reports his work 
to his/her direct manager with manager_id. The head of the company is the 
employee with employee_id = 1.

Write an SQL query to find employee_id of all employees that directly or 
indirectly report their work to the head of the company. The indirect relation 
between managers will not exceed three managers as the company is small. Return 
the result table in any order. The query result format is in the following 
example.

Example 1:
Input: 
Employees table: +-------------+---------------+------------+
                 | employee_id | employee_name | manager_id |
                 +-------------+---------------+------------+
                 | 1           | Boss          | 1          |
                 | 3           | Alice         | 3          |
                 | 2           | Bob           | 1          |
                 | 4           | Daniel        | 2          |
                 | 7           | Luis          | 4          |
                 | 8           | Jhon          | 3          |
                 | 9           | Angela        | 8          |
                 | 77          | Robert        | 1          |
                 +-------------+---------------+------------+
Output:          +-------------+
                 | employee_id |
                 +-------------+
                 | 2           |
                 | 77          |
                 | 4           |
                 | 7           |
                 +-------------+
Explanation: The head of the company is the employee with employee_id 1. The 
             employees with employee_id 2 and 77 report their work directly to 
             the head of the company. The employee with employee_id 4 reports 
             their work indirectly to the head of the company 4 --> 2 --> 1. 
             The employee with employee_id 7 reports their work indirectly to 
             the head of the company 7 --> 4 --> 2 --> 1. The employees with 
             employee_id 3, 8, and 9 do not report their work to the head of 
             the company directly or indirectly. */

SELECT DISTINCT t1.employee_id AS employee_id
FROM Employees AS t1
JOIN Employees AS t2 ON t1.manager_id = t2.employee_id
JOIN Employees AS t3 ON t2.manager_id = t3.employee_id
WHERE t1.employee_id <>1 AND t3.manager_id = 1


/*1285. Find the Start and End Number of Continuous Ranges (Medium)
SQL Schema
Table: Logs
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| log_id        | int     |
+---------------+---------+
log_id is the primary key for this table. Each row of this table contains the 
ID in a log Table.

Write an SQL query to find the start and end number of continuous ranges in the 
table Logs. Return the result table ordered by start_id. The query result 
format is in the following example.

Example 1:
Input: 
Logs table: +------------+
            | log_id     |
            +------------+
            | 1          |
            | 2          |
            | 3          |
            | 7          |
            | 8          |
            | 10         |
            +------------+
Output:     +------------+--------------+
            | start_id   | end_id       |
            +------------+--------------+
            | 1          | 3            |
            | 7          | 8            |
            | 10         | 10           |
            +------------+--------------+
Explanation: The result table should contain all ranges in table Logs. From 1 
             to 3 is contained in the table. From 4 to 6 is missing in the 
             table From 7 to 8 is contained in the table. Number 9 is missing 
             from the table. Number 10 is contained in the table.*/

SELECT 
    MIN(log_id) AS start_id, 
    MAX(log_id) AS end_id
FROM 
    (SELECT *, @id:=@id+1 AS id 
     FROM Logs, (SELECT @id:=0) init) a
GROUP BY log_id - id


/*1308. Running Total for Different Genders (Medium)
SQL Schema
Table: Scores
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| player_name   | varchar |
| gender        | varchar |
| day           | date    |
| score_points  | int     |
+---------------+---------+
(gender, day) is the primary key for this table. A competition is held between 
the female team and the male team. Each row of this table indicates that a 
player_name and with gender has scored score_point in someday. Gender is 'F' if 
the player is in the female team and 'M' if the player is in the male team.

Write an SQL query to find the total score for each gender on each day. Return 
the result table ordered by gender and day in ascending order. The query result 
format is in the following example.

Example 1:
Input: 
Scores table: +-------------+--------+------------+--------------+
              | player_name | gender | day        | score_points |
              +-------------+--------+------------+--------------+
              | Aron        | F      | 2020-01-01 | 17           |
              | Alice       | F      | 2020-01-07 | 23           |
              | Bajrang     | M      | 2020-01-07 | 7            |
              | Khali       | M      | 2019-12-25 | 11           |
              | Slaman      | M      | 2019-12-30 | 13           |
              | Joe         | M      | 2019-12-31 | 3            |
              | Jose        | M      | 2019-12-18 | 2            |
              | Priya       | F      | 2019-12-31 | 23           |
              | Priyanka    | F      | 2019-12-30 | 17           |
              +-------------+--------+------------+--------------+
Output:       +--------+------------+-------+
              | gender | day        | total |
              +--------+------------+-------+
              | F      | 2019-12-30 | 17    |
              | F      | 2019-12-31 | 40    |
              | F      | 2020-01-01 | 57    |
              | F      | 2020-01-07 | 80    |
              | M      | 2019-12-18 | 2     |
              | M      | 2019-12-25 | 13    |
              | M      | 2019-12-30 | 26    |
              | M      | 2019-12-31 | 29    |
              | M      | 2020-01-07 | 36    |
              +--------+------------+-------+
Explanation: For the female team:
             - The first day is 2019-12-30, Priyanka scored 17 points and the 
               total score for the team is 17.
             - The second day is 2019-12-31, Priya scored 23 points and the 
               total score for the team is 40.
             - The third day is 2020-01-01, Aron scored 17 points and the total 
               score for the team is 57.
             - The fourth day is 2020-01-07, Alice scored 23 points and the 
               total score for the team is 80.
             For the male team:
             - The first day is 2019-12-18, Jose scored 2 points and the total 
               score for the team is 2.
             - The second day is 2019-12-25, Khali scored 11 points and the 
               total score for the team is 13.
             - The third day is 2019-12-30, Slaman scored 13 points and the 
               total score for the team is 26.
             - The fourth day is 2019-12-31, Joe scored 3 points and the total 
               score for the team is 29.
             - The fifth day is 2020-01-07, Bajrang scored 7 points and the 
               total score for the team is 36.*/

SELECT 
    gender, 
    day, 
    CASE WHEN @g <> @g:=gender THEN @s:=score
    ELSE @s:=@s+score END AS total 
FROM (SELECT gender, day, score_points AS score 
      FROM Scores 
      ORDER BY gender, day) a, (SELECT @s:=0, @g:="F") init


/*1321. Restaurant Growth (Medium)
SQL Schema
Table: Customer
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| customer_id   | int     |
| name          | varchar |
| visited_on    | date    |
| amount        | int     |
+---------------+---------+
(customer_id, visited_on) is the primary key for this table. This table 
contains data about customer transactions in a restaurant. visited_on is the 
date on which the customer with ID (customer_id) has visited the restaurant.
amount is the total paid by a customer. You are the restaurant owner and you 
want to analyze a possible expansion (there will be at least one customer every 
day).

Write an SQL query to compute the moving average of how much the customer paid 
in a seven days window (i.e., current day + 6 days before). average_amount 
should be rounded to two decimal places. Return result table ordered by 
visited_on in ascending order. The query result format is in the following 
example.

Example 1:
Input: 
Customer table: +-------------+--------------+--------------+-------------+
                | customer_id | name         | visited_on   | amount      |
                +-------------+--------------+--------------+-------------+
                | 1           | Jhon         | 2019-01-01   | 100         |
                | 2           | Daniel       | 2019-01-02   | 110         |
                | 3           | Jade         | 2019-01-03   | 120         |
                | 4           | Khaled       | 2019-01-04   | 130         |
                | 5           | Winston      | 2019-01-05   | 110         | 
                | 6           | Elvis        | 2019-01-06   | 140         | 
                | 7           | Anna         | 2019-01-07   | 150         |
                | 8           | Maria        | 2019-01-08   | 80          |
                | 9           | Jaze         | 2019-01-09   | 110         | 
                | 1           | Jhon         | 2019-01-10   | 130         | 
                | 3           | Jade         | 2019-01-10   | 150         | 
                +-------------+--------------+--------------+-------------+
Output:         +--------------+--------------+----------------+
                | visited_on   | amount       | average_amount |
                +--------------+--------------+----------------+
                | 2019-01-07   | 860          | 122.86         |
                | 2019-01-08   | 840          | 120            |
                | 2019-01-09   | 840          | 120            |
                | 2019-01-10   | 1000         | 142.86         |
                +--------------+--------------+----------------+
Explanation: - 1st moving average from 2019-01-01 to 2019-01-07 has an 
               average_amount of (100 + 110 + 120 + 130 + 110 + 140 + 150)/7 
               = 122.86
             - 2nd moving average from 2019-01-02 to 2019-01-08 has an 
               average_amount of (110 + 120 + 130 + 110 + 140 + 150 + 80)/7 
               = 120
             - 3rd moving average from 2019-01-03 to 2019-01-09 has an 
               average_amount of (120 + 130 + 110 + 140 + 150 + 80 + 110)/7 
               = 120
             - 4th moving average from 2019-01-04 to 2019-01-10 has an 
               average_amount of (130 + 110 + 140 + 150 + 80 + 110 + 130 + 150)/7 
               = 142.86*/

SELECT 
    a.visited_on, 
    SUM(b.amount) AS amount, 
    ROUND(SUM(b.amount)/7, 2) AS average_amount
FROM 
    (SELECT DISTINCT visited_on FROM Customer) a #distinct date is required 
    JOIN Customer b ON DATEDIFF(a.visited_on, b.visited_on) BETWEEN 0 AND 6
GROUP BY a.visited_on
HAVING a.visited_on >= MIN(b.visited_on) + 6


/*1341. Movie Rating (Medium)
SQL Schema
Table: Movies
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| movie_id      | int     |
| title         | varchar |
+---------------+---------+
movie_id is the primary key for this table. title is the name of the movie.

Table: Users
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user_id       | int     |
| name          | varchar |
+---------------+---------+
user_id is the primary key for this table.

Table: MovieRating
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| movie_id      | int     |
| user_id       | int     |
| rating        | int     |
| created_at    | date    |
+---------------+---------+
(movie_id, user_id) is the primary key for this table. This table contains the 
rating of a movie by a user in their review. created_at is the user's review 
date. 

Write an SQL query to:
* Find the name of the user who has rated the greatest number of movies. In 
  case of a tie, return the lexicographically smaller user name.
* Find the movie name with the highest average rating in February 2020. In case 
  of a tie, return the lexicographically smaller movie name.
The query result format is in the following example.

Example 1:
Input: 
Movies table:      +-------------+--------------+
                   | movie_id    |  title       |
                   +-------------+--------------+
                   | 1           | Avengers     |
                   | 2           | Frozen 2     |
                   | 3           | Joker        |
                   +-------------+--------------+
Users table:       +-------------+--------------+
                   | user_id     |  name        |
                   +-------------+--------------+
                   | 1           | Daniel       |
                   | 2           | Monica       |
                   | 3           | Maria        |
                   | 4           | James        |
                   +-------------+--------------+
MovieRating table: +-------------+--------------+--------------+-------------+
                   | movie_id    | user_id      | rating       | created_at  |
                   +-------------+--------------+--------------+-------------+
                   | 1           | 1            | 3            | 2020-01-12  |
                   | 1           | 2            | 4            | 2020-02-11  |
                   | 1           | 3            | 2            | 2020-02-12  |
                   | 1           | 4            | 1            | 2020-01-01  |
                   | 2           | 1            | 5            | 2020-02-17  | 
                   | 2           | 2            | 2            | 2020-02-01  | 
                   | 2           | 3            | 2            | 2020-03-01  |
                   | 3           | 1            | 3            | 2020-02-22  | 
                   | 3           | 2            | 4            | 2020-02-25  | 
                   +-------------+--------------+--------------+-------------+
Output:            +--------------+
                   | results      |
                   +--------------+
                   | Daniel       |
                   | Frozen 2     |
                   +--------------+
Explanation: Daniel and Monica have rated 3 movies ("Avengers", "Frozen 2" and 
             "Joker") but Daniel is smaller lexicographically. Frozen 2 and 
             Joker have a rating average of 3.5 in February but Frozen 2 is 
             smaller lexicographically.*/

(SELECT name AS results 
 FROM Movie_Rating JOIN Users USING (user_id) 
 GROUP BY user_id 
 ORDER BY COUNT(movie_id) DESC, name ASC 
 LIMIT 1)
UNION
(SELECT title AS results 
 FROM Movie_Rating JOIN Movies USING (movie_id) 
 WHERE created_at LIKE "2020-02%" 
 GROUP BY movie_id 
 ORDER BY AVG(rating) DESC, title ASC 
 LIMIT 1)


/*1355. Activity Participants (Medium)
SQL Schema
Table: Friends
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| name          | varchar |
| activity      | varchar |
+---------------+---------+
id is the id of the friend and primary key for this table. name is the name of 
the friend. activity is the name of the activity which the friend takes part in.

Table: Activities
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| name          | varchar |
+---------------+---------+
id is the primary key for this table. name is the name of the activity.

Write an SQL query to find the names of all the activities with neither the 
maximum nor the minimum number of participants. Each activity in the Activities 
table is performed by any person in the table Friends. Return the result table 
in any order. The query result format is in the following example.

Example 1:
Input: 
Friends table:    +------+--------------+---------------+
                  | id   | name         | activity      |
                  +------+--------------+---------------+
                  | 1    | Jonathan D.  | Eating        |
                  | 2    | Jade W.      | Singing       |
                  | 3    | Victor J.    | Singing       |
                  | 4    | Elvis Q.     | Eating        |
                  | 5    | Daniel A.    | Eating        |
                  | 6    | Bob B.       | Horse Riding  |
                  +------+--------------+---------------+
Activities table: +------+--------------+
                  | id   | name         |
                  +------+--------------+
                  | 1    | Eating       |
                  | 2    | Singing      |
                  | 3    | Horse Riding |
                  +------+--------------+
Output:           +--------------+
                  | activity     |
                  +--------------+
                  | Singing      |
                  +--------------+
Explanation: Eating activity is performed by 3 friends, maximum number of 
             participants, (Jonathan D. , Elvis Q. and Daniel A.) Horse Riding 
             activity is performed by 1 friend, minimum number of participants, 
             (Bob B.) Singing is performed by 2 friends (Victor J. and Jade W.)*/

SELECT activity
FROM Friends 
GROUP BY activity
HAVING 
    COUNT(*) <> (SELECT COUNT(*) FROM Friends GROUP BY activity ORDER BY 1 LIMIT 1)
    AND
    COUNT(*) <> (SELECT COUNT(*) FROM Friends GROUP BY activity ORDER BY 1 DESC LIMIT 1)


/*1364. Number of Trusted Contacts of a Customer (Medium)
SQL Schema
Table: Customers

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| customer_id   | int     |
| customer_name | varchar |
| email         | varchar |
+---------------+---------+
customer_id is the primary key for this table. Each row of this table contains 
the name and the email of a customer of an online shop.

Table: Contacts

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user_id       | id      |
| contact_name  | varchar |
| contact_email | varchar |
+---------------+---------+
(user_id, contact_email) is the primary key for this table. Each row of this 
table contains the name and email of one contact of customer with user_id. This 
table contains information about people each customer trust. The contact may or 
may not exist in the Customers table.

Table: Invoices

+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| invoice_id   | int     |
| price        | int     |
| user_id      | int     |
+--------------+---------+
invoice_id is the primary key for this table. Each row of this table indicates 
that user_id has an invoice with invoice_id and a price.

Write an SQL query to find the following for each invoice_id:
* customer_name: The name of the customer the invoice is related to.
* price: The price of the invoice.
* contacts_cnt: The number of contacts related to the customer.
* trusted_contacts_cnt: The number of contacts related to the customer and at 
  the same time they are customers to the shop. (i.e His/Her email exists in 
  the Customers table.)
Order the result table by invoice_id.

The query result format is in the following example:

Customers table:
+-------------+---------------+--------------------+
| customer_id | customer_name | email              |
+-------------+---------------+--------------------+
| 1           | Alice         | alice@leetcode.com |
| 2           | Bob           | bob@leetcode.com   |
| 13          | John          | john@leetcode.com  |
| 6           | Alex          | alex@leetcode.com  |
+-------------+---------------+--------------------+
Contacts table:
+-------------+--------------+--------------------+
| user_id     | contact_name | contact_email      |
+-------------+--------------+--------------------+
| 1           | Bob          | bob@leetcode.com   |
| 1           | John         | john@leetcode.com  |
| 1           | Jal          | jal@leetcode.com   |
| 2           | Omar         | omar@leetcode.com  |
| 2           | Meir         | meir@leetcode.com  |
| 6           | Alice        | alice@leetcode.com |
+-------------+--------------+--------------------+
Invoices table:
+------------+-------+---------+
| invoice_id | price | user_id |
+------------+-------+---------+
| 77         | 100   | 1       |
| 88         | 200   | 1       |
| 99         | 300   | 2       |
| 66         | 400   | 2       |
| 55         | 500   | 13      |
| 44         | 60    | 6       |
+------------+-------+---------+
Result table:
+------------+---------------+-------+--------------+----------------------+
| invoice_id | customer_name | price | contacts_cnt | trusted_contacts_cnt |
+------------+---------------+-------+--------------+----------------------+
| 44         | Alex          | 60    | 1            | 1                    |
| 55         | John          | 500   | 0            | 0                    |
| 66         | Bob           | 400   | 2            | 0                    |
| 77         | Alice         | 100   | 3            | 2                    |
| 88         | Alice         | 200   | 3            | 2                    |
| 99         | Bob           | 300   | 2            | 0                    |
+------------+---------------+-------+--------------+----------------------+
Alice has three contacts, two of them are trusted contacts (Bob and John).
Bob has two contacts, none of them is a trusted contact.
Alex has one contact and it is a trusted contact (Alice).
John doesn't have any contacts.*/

SELECT 
    invoice_id, 
    customer_name, 
    price, 
    IFNULL(COUNT(contact_name), 0) AS contacts_cnt, 
    IFNULL(SUM(IF(contact_email IN (SELECT email FROM Customers), 1, 0)), 0) AS trusted_contacts_cnt
FROM 
    Invoices
    LEFT JOIN Customers ON Customers.customer_id = Invoices.user_id
    LEFT JOIN Contacts ON Customers.customer_id = Contacts.user_id
GROUP BY 1
ORDER BY 1


/*1393. Capital Gain/Loss (Medium)
SQL Schema
Table: Stocks

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| stock_name    | varchar |
| operation     | enum    |
| operation_day | int     |
| price         | int     |
+---------------+---------+
(stock_name, operation_day) is the primary key for this table. The operation 
column is an ENUM of type ('Sell', 'Buy'). Each row of this table indicates 
that the stock which has stock_name had an operation on the day operation_day 
with the price. It is guaranteed that each 'Sell' operation for a stock has a 
corresponding 'Buy' operation in a previous day.

Write an SQL query to report the Capital gain/loss for each stock. The capital 
gain/loss of a stock is total gain or loss after buying and selling the stock 
one or many times. Return the result table in any order.

The query result format is in the following example:

Stocks table:
+---------------+-----------+---------------+--------+
| stock_name    | operation | operation_day | price  |
+---------------+-----------+---------------+--------+
| Leetcode      | Buy       | 1             | 1000   |
| Corona Masks  | Buy       | 2             | 10     |
| Leetcode      | Sell      | 5             | 9000   |
| Handbags      | Buy       | 17            | 30000  |
| Corona Masks  | Sell      | 3             | 1010   |
| Corona Masks  | Buy       | 4             | 1000   |
| Corona Masks  | Sell      | 5             | 500    |
| Corona Masks  | Buy       | 6             | 1000   |
| Handbags      | Sell      | 29            | 7000   |
| Corona Masks  | Sell      | 10            | 10000  |
+---------------+-----------+---------------+--------+

Result table:
+---------------+-------------------+
| stock_name    | capital_gain_loss |
+---------------+-------------------+
| Corona Masks  | 9500              |
| Leetcode      | 8000              |
| Handbags      | -23000            |
+---------------+-------------------+
Leetcode stock was bought at day 1 for 1000$ and was sold at day 5 for 9000$. Capital gain = 9000 - 1000 = 8000$.
Handbags stock was bought at day 17 for 30000$ and was sold at day 29 for 7000$. Capital loss = 7000 - 30000 = -23000$.
Corona Masks stock was bought at day 1 for 10$ and was sold at day 3 for 1010$. It was bought again at day 4 for 1000$ 
and was sold at day 5 for 500$. At last, it was bought at day 6 for 1000$ and was sold at day 10 for 10000$. Capital 
gain/loss is the sum of capital gains/losses for each ('Buy' --> 'Sell') 
operation = (1010 - 10) + (500 - 1000) + (10000 - 1000) = 1000 - 500 + 9000 = 9500$.*/

SELECT 
    stock_name, 
    SUM(IF(operation = "Sell", price, -price)) AS capital_gain_loss
FROM Stocks
GROUP BY stock_name


/*1398. Customers Who Bought Products A and B but Not C (Medium)
SQL Schema
Table: Customers

+---------------------+---------+
| Column Name         | Type    |
+---------------------+---------+
| customer_id         | int     |
| customer_name       | varchar |
+---------------------+---------+
customer_id is the primary key for this table. customer_name is the name of the 
customer.

Table: Orders

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| customer_id   | int     |
| product_name  | varchar |
+---------------+---------+
order_id is the primary key for this table. customer_id is the id of the 
customer who bought the product "product_name".

Write an SQL query to report the customer_id and customer_name of customers who 
bought products "A", "B" but did not buy the product "C" since we want to 
recommend them buy this product. Return the result table ordered by customer_id.

The query result format is in the following example.

Customers table:
+-------------+---------------+
| customer_id | customer_name |
+-------------+---------------+
| 1           | Daniel        |
| 2           | Diana         |
| 3           | Elizabeth     |
| 4           | Jhon          |
+-------------+---------------+

Orders table:
+------------+--------------+---------------+
| order_id   | customer_id  | product_name  |
+------------+--------------+---------------+
| 10         |     1        |     A         |
| 20         |     1        |     B         |
| 30         |     1        |     D         |
| 40         |     1        |     C         |
| 50         |     2        |     A         |
| 60         |     3        |     A         |
| 70         |     3        |     B         |
| 80         |     3        |     D         |
| 90         |     4        |     C         |
+------------+--------------+---------------+

Result table:
+-------------+---------------+
| customer_id | customer_name |
+-------------+---------------+
| 3           | Elizabeth     |
+-------------+---------------+
Only the customer_id with id 3 bought the product A and B but not the product C.*/

SELECT DISTINCT customer_id, customer_name
FROM
    Orders
    LEFT JOIN Customers USING (customer_id)
WHERE 
    customer_id IN (SELECT customer_id FROM Orders WHERE product_name = "A") AND 
    customer_id IN (SELECT customer_id FROM Orders WHERE product_name = "B") AND
    customer_id NOT IN (SELECT customer_id FROM Orders WHERE product_name = "C")
ORDER BY 1


/*1407. Top Travellers (Easy)
SQL Schema
Table: Users
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| name          | varchar |
+---------------+---------+
id is the primary key for this table.
name is the name of the user.

Table: Rides
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| user_id       | int     |
| distance      | int     |
+---------------+---------+
id is the primary key for this table.
user_id is the id of the user who travelled the distance "distance".

Write an SQL query to report the distance travelled by each user. Return the 
result table ordered by travelled_distance in descending order, if two or more 
users travelled the same distance, order them by their name in ascending order.
The query result format is in the following example.

Users table:
+------+-----------+
| id   | name      |
+------+-----------+
| 1    | Alice     |
| 2    | Bob       |
| 3    | Alex      |
| 4    | Donald    |
| 7    | Lee       |
| 13   | Jonathan  |
| 19   | Elvis     |
+------+-----------+

Rides table:
+------+----------+----------+
| id   | user_id  | distance |
+------+----------+----------+
| 1    | 1        | 120      |
| 2    | 2        | 317      |
| 3    | 3        | 222      |
| 4    | 7        | 100      |
| 5    | 13       | 312      |
| 6    | 19       | 50       |
| 7    | 7        | 120      |
| 8    | 19       | 400      |
| 9    | 7        | 230      |
+------+----------+----------+

Result table:
+----------+--------------------+
| name     | travelled_distance |
+----------+--------------------+
| Elvis    | 450                |
| Lee      | 450                |
| Bob      | 317                |
| Jonathan | 312                |
| Alex     | 222                |
| Alice    | 120                |
| Donald   | 0                  |
+----------+--------------------+
Elvis and Lee travelled 450 miles, Elvis is the top traveller as his name is 
alphabetically smaller than Lee. Bob, Jonathan, Alex and Alice have only one 
ride and we just order them by the total distances of the ride. Donald didn't 
have any rides, the distance travelled by him is 0.*/

SELECT name, IFNULL(SUM(distance), 0) AS travelled_distance
FROM Users LEFT JOIN Rides ON Users.id = Rides.user_id
GROUP BY name 
ORDER BY travelled_distance DESC, name ASC


/*1421. NPV Queries (Medium)
SQL Schema
Table: NPV

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| year          | int     |
| npv           | int     |
+---------------+---------+
(id, year) is the primary key of this table. The table has information about 
the id and the year of each inventory and the corresponding net present value.

Table: Queries

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| year          | int     |
+---------------+---------+
(id, year) is the primary key of this table. The table has information about 
the id and the year of each inventory query.
 
Write an SQL query to find the npv of all each query of queries table. Return 
the result table in any order. 

The query result format is in the following example:

NPV table:
+------+--------+--------+
| id   | year   | npv    |
+------+--------+--------+
| 1    | 2018   | 100    |
| 7    | 2020   | 30     |
| 13   | 2019   | 40     |
| 1    | 2019   | 113    |
| 2    | 2008   | 121    |
| 3    | 2009   | 12     |
| 11   | 2020   | 99     |
| 7    | 2019   | 0      |
+------+--------+--------+

Queries table:
+------+--------+
| id   | year   |
+------+--------+
| 1    | 2019   |
| 2    | 2008   |
| 3    | 2009   |
| 7    | 2018   |
| 7    | 2019   |
| 7    | 2020   |
| 13   | 2019   |
+------+--------+

Result table:
+------+--------+--------+
| id   | year   | npv    |
+------+--------+--------+
| 1    | 2019   | 113    |
| 2    | 2008   | 121    |
| 3    | 2009   | 12     |
| 7    | 2018   | 0      |
| 7    | 2019   | 0      |
| 7    | 2020   | 30     |
| 13   | 2019   | 40     |
+------+--------+--------+

The npv value of (7, 2018) is not present in the NPV table, we consider it 0.
The npv values of all other queries can be found in the NPV table.*/

SELECT 
    id, 
    year, 
    IFNULL(npv, 0) AS npv
FROM 
    Queries
    LEFT JOIN NPV USING (id, year)


/*1435. Create a Session Bar Chart (Easy)
SQL Schema
Table: Sessions
+---------------------+---------+
| Column Name         | Type    |
+---------------------+---------+
| session_id          | int     |
| duration            | int     |
+---------------------+---------+
session_id is the primary key for this table. duration is the time in seconds 
that a user has visited the application. You want to know how long a user 
visits your application. You decided to create bins of "[0-5>", "[5-10>",
 "[10-15>" and "15 minutes or more" and count the number of sessions on it. 
 Write an SQL query to report the (bin, total) in any order.

The query result format is in the following example.

Sessions table:
+-------------+---------------+
| session_id  | duration      |
+-------------+---------------+
| 1           | 30            |
| 2           | 199           |
| 3           | 299           |
| 4           | 580           |
| 5           | 1000          |
+-------------+---------------+

Result table:
+--------------+--------------+
| bin          | total        |
+--------------+--------------+
| [0-5>        | 3            |
| [5-10>       | 1            |
| [10-15>      | 0            |
| 15 or more   | 1            |
+--------------+--------------+

For session_id 1, 2 and 3 have a duration greater or equal than 0 minutes and 
less than 5 minutes. For session_id 4 has a duration greater or equal than 5 
minutes and less than 10 minutes. There are no session with a duration greater 
or equial than 10 minutes and less than 15 minutes. For session_id 5 has a 
duration greater or equal than 15 minutes.*/

SELECT bin, IFNULL(total, 0) AS total FROM 
(SELECT 
    CASE 
        WHEN duration < 300 THEN "[0-5>"
        WHEN duration < 600 THEN "[5-10>"
        WHEN duration < 900 THEN "[10-15>"
        ELSE "15 or more" 
    END AS bin, COUNT(*) AS total
FROM Sessions
GROUP BY 1) a RIGHT JOIN (SELECT "[0-5>" bin
                          UNION ALL
                          SELECT "[5-10>"
                          UNION ALL
                          SELECT "[10-15>"
                          UNION ALL
                          SELECT "15 or more") B USING (bin)
ORDER BY FIELD(bin, "[0-5>", "[5-10>", "[10-15>", "15 or more")


/*1440. Evaluate Boolean Expression (Medium)
SQL Schema
Table Variables:

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| name          | varchar |
| value         | int     |
+---------------+---------+
name is the primary key for this table. This table contains the stored 
variables and their values.

Table Expressions:

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| left_operand  | varchar |
| operator      | enum    |
| right_operand | varchar |
+---------------+---------+
(left_operand, operator, right_operand) is the primary key for this table. This 
table contains a boolean expression that should be evaluated. operator is an 
enum that takes one of the values ('<', '>', '='). The values of left_operand 
and right_operand are guaranteed to be in the Variables table.

Write an SQL query to evaluate the boolean expressions in Expressions table. 
Return the result table in any order.

The query result format is in the following example.

Variables table:
+------+-------+
| name | value |
+------+-------+
| x    | 66    |
| y    | 77    |
+------+-------+

Expressions table:
+--------------+----------+---------------+
| left_operand | operator | right_operand |
+--------------+----------+---------------+
| x            | >        | y             |
| x            | <        | y             |
| x            | =        | y             |
| y            | >        | x             |
| y            | <        | x             |
| x            | =        | x             |
+--------------+----------+---------------+

Result table:
+--------------+----------+---------------+-------+
| left_operand | operator | right_operand | value |
+--------------+----------+---------------+-------+
| x            | >        | y             | false |
| x            | <        | y             | true  |
| x            | =        | y             | false |
| y            | >        | x             | true  |
| y            | <        | x             | false |
| x            | =        | x             | true  |
+--------------+----------+---------------+-------+
As shown, you need find the value of each boolean exprssion in the table using 
the variables table.*/

SELECT 
    left_operand, 
    operator, 
    right_operand, 
    CASE WHEN operator = ">" AND v0.value > v1.value THEN "true"
         WHEN operator = "<" AND v0.value < v1.value THEN "true"
         WHEN operator = "=" AND v0.value = v1.value THEN "true"
    ELSE "false" END AS value 
FROM 
    Expressions e
    LEFT JOIN Variables v0 ON e.left_operand = v0.name 
    LEFT JOIN Variables v1 ON e.right_operand = v1.name 


/*1445. Apples & Oranges (Medium)
SQL Schema
Table: Sales

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| sale_date     | date    |
| fruit         | enum    | 
| sold_num      | int     | 
+---------------+---------+
(sale_date,fruit) is the primary key for this table. This table contains the 
sales of "apples" and "oranges" sold each day. Write an SQL query to report the 
difference between number of apples and oranges sold each day. Return the 
result table ordered by sale_date in format ('YYYY-MM-DD').

The query result format is in the following example:

Sales table:
+------------+------------+-------------+
| sale_date  | fruit      | sold_num    |
+------------+------------+-------------+
| 2020-05-01 | apples     | 10          |
| 2020-05-01 | oranges    | 8           |
| 2020-05-02 | apples     | 15          |
| 2020-05-02 | oranges    | 15          |
| 2020-05-03 | apples     | 20          |
| 2020-05-03 | oranges    | 0           |
| 2020-05-04 | apples     | 15          |
| 2020-05-04 | oranges    | 16          |
+------------+------------+-------------+

Result table:
+------------+--------------+
| sale_date  | diff         |
+------------+--------------+
| 2020-05-01 | 2            |
| 2020-05-02 | 0            |
| 2020-05-03 | 20           |
| 2020-05-04 | -1           |
+------------+--------------+

Day 2020-05-01, 10 apples and 8 oranges were sold (Difference  10 - 8 = 2).
Day 2020-05-02, 15 apples and 15 oranges were sold (Difference 15 - 15 = 0).
Day 2020-05-03, 20 apples and 0 oranges were sold (Difference 20 - 0 = 20).
Day 2020-05-04, 15 apples and 16 oranges were sold (Difference 15 - 16 = -1).*/

SELECT 
    sale_date, 
    SUM(IF(fruit = "apples", 1, -1) * sold_num) As diff
FROM Sales
GROUP BY 1


/*1454. Active Users (Medium)
SQL Schema
Table: Accounts
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| name          | varchar |
+---------------+---------+
id is the primary key for this table. This table contains the account id and 
the user name of each account.

Table: Logins
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| login_date    | date    |
+---------------+---------+
There is no primary key for this table, it may contain duplicates. This table 
contains the account id of the user who logged in and the login date. A user 
may log in multiple times in the day. Active users are those who logged in to 
their accounts for five or more consecutive days.

Write an SQL query to find the id and the name of active users. Return the 
result table ordered by id. The query result format is in the following example.

Example 1:
Input: 
Accounts table:
+----+----------+
| id | name     |
+----+----------+
| 1  | Winston  |
| 7  | Jonathan |
+----+----------+
Logins table:
+----+------------+
| id | login_date |
+----+------------+
| 7  | 2020-05-30 |
| 1  | 2020-05-30 |
| 7  | 2020-05-31 |
| 7  | 2020-06-01 |
| 7  | 2020-06-02 |
| 7  | 2020-06-02 |
| 7  | 2020-06-03 |
| 1  | 2020-06-07 |
| 7  | 2020-06-10 |
+----+------------+
Output: 
+----+----------+
| id | name     |
+----+----------+
| 7  | Jonathan |
+----+----------+
Explanation: User Winston with id = 1 logged in 2 times only in 2 different 
             days, so, Winston is not an active user. User Jonathan with id = 7 
             logged in 7 times in 6 different days, five of them were 
             consecutive days, so, Jonathan is an active user.

Follow up: Could you write a general solution if the active users are those who 
           logged in to their accounts for n or more consecutive days?*/

WITH Cte AS (
    SELECT  
        id,
        login_date,
        DATE_ADD(login_date, INTERVAL -DENSE_RANK() OVER(PARTITION BY id ORDER BY login_date) DAY) AS grp
    FROM Logins
)
SELECT DISTINCT id, name -- "Gaps & Islands" problem
FROM Cte JOIN Accounts USING (id)
GROUP BY id, grp
HAVING DATEDIFF(MAX(login_date), MIN(login_date)) >= 4
ORDER BY 1


/*1459. Rectangles Area (Medium)
SQL Schema
Table: Points
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| x_value       | int     |
| y_value       | int     |
+---------------+---------+
id is the primary key for this table. Each point is represented as a 2D 
coordinate (x_value, y_value).

Write an SQL query to report all possible axis-aligned rectangles with a non-
zero area that can be formed by any two points from the Points table. Each row 
in the result should contain three columns (p1, p2, area) where:
* p1 and p2 are the id's of the two points that determine the opposite corners 
  of a rectangle.
* area is the area of the rectangle and must be non-zero.
Return the result table ordered by area in descending order. If there is a tie, 
order them by p1 in ascending order. If there is still a tie, order them by p2 
in ascending order. The query result format is in the following table.

Example 1:
Input: 
Points table:
+----------+-------------+-------------+
| id       | x_value     | y_value     |
+----------+-------------+-------------+
| 1        | 2           | 7           |
| 2        | 4           | 8           |
| 3        | 2           | 10          |
+----------+-------------+-------------+
Output: 
+----------+-------------+-------------+
| p1       | p2          | area        |
+----------+-------------+-------------+
| 2        | 3           | 4           |
| 1        | 2           | 2           |
+----------+-------------+-------------+
Explanation: The rectangle formed by p1 = 2 and p2 = 3 has an area equal to 
             |4-2| * |8-10| = 4. The rectangle formed by p1 = 1 and p2 = 2 has 
             an area equal to |2-4| * |7-8| = 2. Note that the rectangle formed 
             by p1 = 1 and p2 = 3 is invalid because the area is 0.*/

SELECT 
    a.id AS p1, 
    b.id AS p2, 
    ABS(a.x_value - b.x_value) * ABS(a.y_value - b.y_value) AS area
FROM 
    Points a JOIN Points b ON 
        a.id < b.id AND 
        a.x_value <> b.x_value AND 
        a.y_value <> b.y_value
ORDER BY 3 DESC, 1, 2


/*1468. Calculate Salaries (Medium)
SQL Schema
Table Salaries:

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| company_id    | int     |
| employee_id   | int     |
| employee_name | varchar |
| salary        | int     |
+---------------+---------+
(company_id, employee_id) is the primary key for this table. This table 
contains the company id, the id, the name and the salary for an employee. Write 
an SQL query to find the salaries of the employees after applying taxes. The 
tax rate is calculated for each company based on the following criteria:
* 0% If the max salary of any employee in the company is less than 1000$.
* 24% If the max salary of any employee in the company is in the range [1000, 10000] inclusive.
* 49% If the max salary of any employee in the company is greater than 10000$.
Return the result table in any order. Round the salary to the nearest integer.

The query result format is in the following example:

Salaries table:
+------------+-------------+---------------+--------+
| company_id | employee_id | employee_name | salary |
+------------+-------------+---------------+--------+
| 1          | 1           | Tony          | 2000   |
| 1          | 2           | Pronub        | 21300  |
| 1          | 3           | Tyrrox        | 10800  |
| 2          | 1           | Pam           | 300    |
| 2          | 7           | Bassem        | 450    |
| 2          | 9           | Hermione      | 700    |
| 3          | 7           | Bocaben       | 100    |
| 3          | 2           | Ognjen        | 2200   |
| 3          | 13          | Nyancat       | 3300   |
| 3          | 15          | Morninngcat   | 7777   |
+------------+-------------+---------------+--------+

Result table:
+------------+-------------+---------------+--------+
| company_id | employee_id | employee_name | salary |
+------------+-------------+---------------+--------+
| 1          | 1           | Tony          | 1020   |
| 1          | 2           | Pronub        | 10863  |
| 1          | 3           | Tyrrox        | 5508   |
| 2          | 1           | Pam           | 300    |
| 2          | 7           | Bassem        | 450    |
| 2          | 9           | Hermione      | 700    |
| 3          | 7           | Bocaben       | 76     |
| 3          | 2           | Ognjen        | 1672   |
| 3          | 13          | Nyancat       | 2508   |
| 3          | 15          | Morninngcat   | 5911   |
+------------+-------------+---------------+--------+
For company 1, Max salary is 21300. Employees in company 1 have taxes = 49%
For company 2, Max salary is 700. Employees in company 2 have taxes = 0%
For company 3, Max salary is 7777. Employees in company 3 have taxes = 24%
The salary after taxes = salary - (taxes percentage / 100) * salary
For example, Salary for Morninngcat (3, 15) after taxes = 7777 - 7777 * (24 / 100) = 7777 - 1866.48 = 5910.52, which is rounded to 5911.*/

SELECT 
    company_id, 
    employee_id, 
    employee_name, 
    CASE 
        WHEN msal < 1000 THEN salary
        WHEN msal <= 10000 THEN ROUND(salary * (1-0.24))
        ELSE ROUND(salary * (1-0.49)) 
    END AS salary
FROM
    (SELECT *, MAX(salary) OVER (PARTITION BY company_id) AS msal
     FROM Salaries) a


/*1484. Group Sold Products By The Date (Easy)
SQL Schema
Table Activities:
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| sell_date   | date    |
| product     | varchar |
+-------------+---------+
There is no primary key for this table, it may contains duplicates. Each row of 
this table contains the product name and the date it was sold in a market. 
Write an SQL query to find for each date, the number of distinct products sold 
and their names. The sold-products names for each date should be sorted 
lexicographically. Return the result table ordered by sell_date. The query 
result format is in the following example.

Activities table:
+------------+-------------+
| sell_date  | product     |
+------------+-------------+
| 2020-05-30 | Headphone   |
| 2020-06-01 | Pencil      |
| 2020-06-02 | Mask        |
| 2020-05-30 | Basketball  |
| 2020-06-01 | Bible       |
| 2020-06-02 | Mask        |
| 2020-05-30 | T-Shirt     |
+------------+-------------+

Result table:
+------------+----------+------------------------------+
| sell_date  | num_sold | products                     |
+------------+----------+------------------------------+
| 2020-05-30 | 3        | Basketball,Headphone,T-shirt |
| 2020-06-01 | 2        | Bible,Pencil                 |
| 2020-06-02 | 1        | Mask                         |
+------------+----------+------------------------------+
For 2020-05-30, Sold items were (Headphone, Basketball, T-shirt), we sort them 
lexicographically and separate them by comma. For 2020-06-01, Sold items were 
(Pencil, Bible), we sort them lexicographically and separate them by comma. For 
2020-06-02, Sold item is (Mask), we just return it.*/

SELECT sell_date, COUNT(DISTINCT product) AS num_sold, GROUP_CONCAT(DISTINCT product ORDER BY product ASC) AS products
FROM Activities
GROUP BY sell_date


/*1495. Friendly Movies Streamed Last Month (Easy)
SQL Schema
Table: TVProgram
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| program_date  | date    |
| content_id    | int     |
| channel       | varchar |
+---------------+---------+
(program_date, content_id) is the primary key for this table. This table 
contains information of the programs on the TV. content_id is the id of the 
program in some channel on the TV.

Table: Content
+------------------+---------+
| Column Name      | Type    |
+------------------+---------+
| content_id       | varchar |
| title            | varchar |
| Kids_content     | enum    |
| content_type     | varchar |
+------------------+---------+
content_id is the primary key for this table. Kids_content is an enum that 
takes one of the values ('Y', 'N') where: 'Y' means is content for kids 
otherwise 'N' is not content for kids. content_type is the category of the 
content as movies, series, etc. Write an SQL query to report the distinct 
titles of the kid-friendly movies streamed in June 2020. Return the result 
table in any order. The query result format is in the following example.

TVProgram table:
+--------------------+--------------+-------------+
| program_date       | content_id   | channel     |
+--------------------+--------------+-------------+
| 2020-06-10 08:00   | 1            | LC-Channel  |
| 2020-05-11 12:00   | 2            | LC-Channel  |
| 2020-05-12 12:00   | 3            | LC-Channel  |
| 2020-05-13 14:00   | 4            | Disney Ch   |
| 2020-06-18 14:00   | 4            | Disney Ch   |
| 2020-07-15 16:00   | 5            | Disney Ch   |
+--------------------+--------------+-------------+

Content table:
+------------+----------------+---------------+---------------+
| content_id | title          | Kids_content  | content_type  |
+------------+----------------+---------------+---------------+
| 1          | Leetcode Movie | N             | Movies        |
| 2          | Alg. for Kids  | Y             | Series        |
| 3          | Database Sols  | N             | Series        |
| 4          | Aladdin        | Y             | Movies        |
| 5          | Cinderella     | Y             | Movies        |
+------------+----------------+---------------+---------------+

Result table:
+--------------+
| title        |
+--------------+
| Aladdin      |
+--------------+
"Leetcode Movie" is not a content for kids.
"Alg. for Kids" is not a movie.
"Database Sols" is not a movie
"Alladin" is a movie, content for kids and was streamed in June 2020.
"Cinderella" was not streamed in June 2020.*/

SELECT DISTINCT title
FROM TVProgram LEFT JOIN Content USING (content_id)
WHERE 
    program_date BETWEEN "2020-06-01" AND "2020-06-30"
    AND Kids_content = "Y" 
    AND content_type = "Movies"


/*1501. Countries You Can Safely Invest In (Medium)
SQL Schema
Table Person:

+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| id             | int     |
| name           | varchar |
| phone_number   | varchar |
+----------------+---------+
id is the primary key for this table. Each row of this table contains the name 
of a person and their phone number. Phone number will be in the form 'xxx-yyyyyyy' 
where xxx is the country code (3 characters) and yyyyyyy is the phone number 
(7 characters) where x and y are digits. Both can contain leading zeros.

Table Country:

+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| name           | varchar |
| country_code   | varchar |
+----------------+---------+
country_code is the primary key for this table. Each row of this table contains 
the country name and its code. country_code will be in the form 'xxx' where x 
is digits.

Table Calls:

+-------------+------+
| Column Name | Type |
+-------------+------+
| caller_id   | int  |
| callee_id   | int  |
| duration    | int  |
+-------------+------+
There is no primary key for this table, it may contain duplicates. Each row of 
this table contains the caller id, callee id and the duration of the call in 
minutes. caller_id != callee_id. A telecommunications company wants to invest 
in new countries. The company intends to invest in the countries where the 
average call duration of the calls in this country is strictly greater than the 
global average call duration.

Write an SQL query to find the countries where this company can invest. Return 
the result table in any order.

The query result format is in the following example.

Person table:
+----+----------+--------------+
| id | name     | phone_number |
+----+----------+--------------+
| 3  | Jonathan | 051-1234567  |
| 12 | Elvis    | 051-7654321  |
| 1  | Moncef   | 212-1234567  |
| 2  | Maroua   | 212-6523651  |
| 7  | Meir     | 972-1234567  |
| 9  | Rachel   | 972-0011100  |
+----+----------+--------------+

Country table:
+----------+--------------+
| name     | country_code |
+----------+--------------+
| Peru     | 051          |
| Israel   | 972          |
| Morocco  | 212          |
| Germany  | 049          |
| Ethiopia | 251          |
+----------+--------------+

Calls table:
+-----------+-----------+----------+
| caller_id | callee_id | duration |
+-----------+-----------+----------+
| 1         | 9         | 33       |
| 2         | 9         | 4        |
| 1         | 2         | 59       |
| 3         | 12        | 102      |
| 3         | 12        | 330      |
| 12        | 3         | 5        |
| 7         | 9         | 13       |
| 7         | 1         | 3        |
| 9         | 7         | 1        |
| 1         | 7         | 7        |
+-----------+-----------+----------+

Result table:
+----------+
| country  |
+----------+
| Peru     |
+----------+
The average call duration for Peru is (102 + 102 + 330 + 330 + 5 + 5) / 6 = 145.666667
The average call duration for Israel is (33 + 4 + 13 + 13 + 3 + 1 + 1 + 7) / 8 = 9.37500
The average call duration for Morocco is (33 + 4 + 59 + 59 + 3 + 7) / 6 = 27.5000 
Global call duration average = (2 * (33 + 3 + 59 + 102 + 330 + 5 + 13 + 3 + 1 + 7)) / 20 = 55.70000
Since Peru is the only country where average call duration is greater than the 
global average, it's the only recommended country.*/

SELECT 
    Country.name AS country
FROM
    Calls
    LEFT JOIN Person ON Calls.caller_id = Person.id OR Calls.callee_id = Person.id
    LEFT JOIN Country ON LEFT(Person.phone_number, 3) = Country.country_code
GROUP BY 1
HAVING AVG(duration) > (SELECT AVG(duration) FROM Calls)


/*1511. Customer Order Frequency (Easy)
SQL Schema
Table: Customers
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| customer_id   | int     |
| name          | varchar |
| country       | varchar |
+---------------+---------+
customer_id is the primary key for this table. This table contains information 
of the customers in the company.

Table: Product
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| product_id    | int     |
| description   | varchar |
| price         | int     |
+---------------+---------+
product_id is the primary key for this table. This table contains information 
of the products in the company. price is the product cost.

Table: Orders
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| customer_id   | int     |
| product_id    | int     |
| order_date    | date    |
| quantity      | int     |
+---------------+---------+
order_id is the primary key for this table. This table contains information on 
customer orders. customer_id is the id of the customer who bought "quantity" 
products with id "product_id". Order_date is the date in format ('YYYY-MM-DD') 
when the order was shipped. Write an SQL query to report the customer_id and 
customer_name of customers who have spent at least $100 in each month of June 
and July 2020. Return the result table in any order.

The query result format is in the following example.

Customers
+--------------+-----------+-------------+
| customer_id  | name      | country     |
+--------------+-----------+-------------+
| 1            | Winston   | USA         |
| 2            | Jonathan  | Peru        |
| 3            | Moustafa  | Egypt       |
+--------------+-----------+-------------+

Product
+--------------+-------------+-------------+
| product_id   | description | price       |
+--------------+-------------+-------------+
| 10           | LC Phone    | 300         |
| 20           | LC T-Shirt  | 10          |
| 30           | LC Book     | 45          |
| 40           | LC Keychain | 2           |
+--------------+-------------+-------------+

Orders
+--------------+-------------+-------------+-------------+-----------+
| order_id     | customer_id | product_id  | order_date  | quantity  |
+--------------+-------------+-------------+-------------+-----------+
| 1            | 1           | 10          | 2020-06-10  | 1         |
| 2            | 1           | 20          | 2020-07-01  | 1         |
| 3            | 1           | 30          | 2020-07-08  | 2         |
| 4            | 2           | 10          | 2020-06-15  | 2         |
| 5            | 2           | 40          | 2020-07-01  | 10        |
| 6            | 3           | 20          | 2020-06-24  | 2         |
| 7            | 3           | 30          | 2020-06-25  | 2         |
| 9            | 3           | 30          | 2020-05-08  | 3         |
+--------------+-------------+-------------+-------------+-----------+

Result table:
+--------------+------------+
| customer_id  | name       |  
+--------------+------------+
| 1            | Winston    |
+--------------+------------+ 
Winston spent $300 (300 * 1) in June and $100 ( 10 * 1 + 45 * 2) in July 2020.
Jonathan spent $600 (300 * 2) in June and $20 ( 2 * 10) in July 2020.
Moustafa spent $110 (10 * 2 + 45 * 2) in June and $0 in July 2020.*/

SELECT 
    customer_id, 
    name
FROM 
    Orders 
    JOIN Customers USING (customer_id)
    JOIN Product USING (product_id)
WHERE order_date BETWEEN "2020-06-01" AND "2020-07-31"
GROUP BY customer_id
HAVING 
    SUM(CASE WHEN MONTH(order_date) = 6 THEN price*quantity ELSE 0 END) >= 100 AND 
    SUM(CASE WHEN MONTH(order_date) = 7 THEN price*quantity ELSE 0 END) >= 100


/*1517. Find Users With Valid E-Mails (Easy)
SQL Schema
Table: Users
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user_id       | int     |
| name          | varchar |
| mail          | varchar |
+---------------+---------+
user_id is the primary key for this table. This table contains information of 
the users signed up in a website. Some e-mails are invalid. Write an SQL query 
to find the users who have valid emails. A valid e-mail has a prefix name and a 
domain where: 
* The prefix name is a string that may contain letters (upper or lower case), 
  digits, underscore '_', period '.' and/or dash '-'. The prefix name must 
  start with a letter.
* The domain is '@leetcode.com'.
Return the result table in any order. The query result format is in the following example.

Users
+---------+-----------+-------------------------+
| user_id | name      | mail                    |
+---------+-----------+-------------------------+
| 1       | Winston   | winston@leetcode.com    |
| 2       | Jonathan  | jonathanisgreat         |
| 3       | Annabelle | bella-@leetcode.com     |
| 4       | Sally     | sally.come@leetcode.com |
| 5       | Marwan    | quarz#2020@leetcode.com |
| 6       | David     | david69@gmail.com       |
| 7       | Shapiro   | .shapo@leetcode.com     |
+---------+-----------+-------------------------+

Result table:
+---------+-----------+-------------------------+
| user_id | name      | mail                    |
+---------+-----------+-------------------------+
| 1       | Winston   | winston@leetcode.com    |
| 3       | Annabelle | bella-@leetcode.com     |
| 4       | Sally     | sally.come@leetcode.com |
+---------+-----------+-------------------------+
The mail of user 2 doesn't have a domain.
The mail of user 5 has # sign which is not allowed.
The mail of user 6 doesn't have leetcode domain.
The mail of user 7 starts with a period.*/

SELECT * 
FROM Users
WHERE mail REGEXP '^[a-zA-Z]+[a-zA-Z0-9_.\-]*@leetcode.com$'


/*1527. Patients With a Condition (Easy)
SQL Schema
Table: Patients
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| patient_id   | int     |
| patient_name | varchar |
| conditions   | varchar |
+--------------+---------+
patient_id is the primary key for this table. 'conditions' contains 0 or more 
code separated by spaces. This table contains information of the patients in 
the hospital. Write an SQL query to report the patient_id, patient_name all 
conditions of patients who have Type I Diabetes. Type I Diabetes always starts 
with DIAB1 prefix. Return the result table in any order. The query result 
format is in the following example.

Patients
+------------+--------------+--------------+
| patient_id | patient_name | conditions   |
+------------+--------------+--------------+
| 1          | Daniel       | YFEV COUGH   |
| 2          | Alice        |              |
| 3          | Bob          | DIAB100 MYOP |
| 4          | George       | ACNE DIAB100 |
| 5          | Alain        | DIAB201      |
+------------+--------------+--------------+

Result table:
+------------+--------------+--------------+
| patient_id | patient_name | conditions   |
+------------+--------------+--------------+
| 3          | Bob          | DIAB100 MYOP |
| 4          | George       | ACNE DIAB100 | 
+------------+--------------+--------------+
Bob and George both have a condition that starts with DIAB1.*/

SELECT * 
FROM Patients
WHERE conditions LIKE "DIAB1%" OR conditions LIKE "% DIAB1%"


/*1532. The Most Recent Three Orders (Medium)
SQL Schema
Table: Customers
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| customer_id   | int     |
| name          | varchar |
+---------------+---------+
customer_id is the primary key for this table. This table contains information 
about customers.

Table: Orders
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| order_date    | date    |
| customer_id   | int     |
| cost          | int     |
+---------------+---------+
order_id is the primary key for this table. This table contains information 
about the orders made by customer_id. Each customer has one order per day.

Write an SQL query to find the most recent three orders of each user. If a user 
ordered less than three orders, return all of their orders. Return the result 
table ordered by customer_name in ascending order and in case of a tie by the 
customer_id in ascending order. If there is still a tie, order them by 
order_date in descending order. The query result format is in the following 
example.

Example 1:
Input: 
Customers table:
+-------------+-----------+
| customer_id | name      |
+-------------+-----------+
| 1           | Winston   |
| 2           | Jonathan  |
| 3           | Annabelle |
| 4           | Marwan    |
| 5           | Khaled    |
+-------------+-----------+
Orders table:
+----------+------------+-------------+------+
| order_id | order_date | customer_id | cost |
+----------+------------+-------------+------+
| 1        | 2020-07-31 | 1           | 30   |
| 2        | 2020-07-30 | 2           | 40   |
| 3        | 2020-07-31 | 3           | 70   |
| 4        | 2020-07-29 | 4           | 100  |
| 5        | 2020-06-10 | 1           | 1010 |
| 6        | 2020-08-01 | 2           | 102  |
| 7        | 2020-08-01 | 3           | 111  |
| 8        | 2020-08-03 | 1           | 99   |
| 9        | 2020-08-07 | 2           | 32   |
| 10       | 2020-07-15 | 1           | 2    |
+----------+------------+-------------+------+
Output: 
+---------------+-------------+----------+------------+
| customer_name | customer_id | order_id | order_date |
+---------------+-------------+----------+------------+
| Annabelle     | 3           | 7        | 2020-08-01 |
| Annabelle     | 3           | 3        | 2020-07-31 |
| Jonathan      | 2           | 9        | 2020-08-07 |
| Jonathan      | 2           | 6        | 2020-08-01 |
| Jonathan      | 2           | 2        | 2020-07-30 |
| Marwan        | 4           | 4        | 2020-07-29 |
| Winston       | 1           | 8        | 2020-08-03 |
| Winston       | 1           | 1        | 2020-07-31 |
| Winston       | 1           | 10       | 2020-07-15 |
+---------------+-------------+----------+------------+
Explanation: Winston has 4 orders, we discard the order of "2020-06-10" because 
             it is the oldest order. Annabelle has only 2 orders, we return 
             them. Jonathan has exactly 3 orders. Marwan ordered only one time.
             We sort the result table by customer_name in ascending order, by 
             customer_id in ascending order, and by order_date in descending 
             order in case of a tie.

Follow up: Could you write a general solution for the most recent n orders?*/

SELECT 
    name AS customer_name, 
    customer_id, 
    order_id, 
    order_date
FROM 
    (SELECT *, RANK() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rnk
     FROM Orders LEFT JOIN Customers USING (customer_id)) a
WHERE rnk <= 3
ORDER BY 1, 2, 4 DESC


/*1543. Fix Product Name Format (Easy)
SQL Schema
Table: Sales
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| sale_id      | int     |
| product_name | varchar |
| sale_date    | date    |
+--------------+---------+
sale_id is the primary key for this table. Each row of this table contains the 
product name and the date it was sold. Since table Sales was filled manually in 
the year 2000, product_name may contain leading and/or trailing white spaces, 
also they are case-insensitive. Write an SQL query to report.
* product_name in lowercase without leading or trailing white spaces.
* sale_date in the format ('YYYY-MM') 
* total the number of times the product was sold in this month.
Return the result table ordered by product_name in ascending order, in case of 
a tie order it by sale_date in ascending order. The query result format is in 
the following example.

Sales
+------------+------------------+--------------+
| sale_id    | product_name     | sale_date    |
+------------+------------------+--------------+
| 1          |      LCPHONE     | 2000-01-16   |
| 2          |    LCPhone       | 2000-01-17   |
| 3          |     LcPhOnE      | 2000-02-18   |
| 4          |      LCKeyCHAiN  | 2000-02-19   |
| 5          |   LCKeyChain     | 2000-02-28   |
| 6          | Matryoshka       | 2000-03-31   | 
+------------+------------------+--------------+

Result table:
+--------------+--------------+----------+
| product_name | sale_date    | total    |
+--------------+--------------+----------+
| lcphone      | 2000-01      | 2        |
| lckeychain   | 2000-02      | 2        | 
| lcphone      | 2000-02      | 1        | 
| matryoshka   | 2000-03      | 1        | 
+--------------+--------------+----------+

In January, 2 LcPhones were sold, please note that the product names are not 
case sensitive and may contain spaces. In Februery, 2 LCKeychains and 1 LCPhone 
were sold. In March, 1 matryoshka was sold.*/

SELECT 
    LOWER(TRIM(product_name)) AS product_name, 
    DATE_FORMAT(sale_date, "%Y-%m") AS sale_date, 
    COUNT(*) AS total
FROM Sales
GROUP BY 1,2
ORDER BY 1,2


/*1549. The Most Recent Orders for Each Product (Medium)
SQL Schema
Table: Customers

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| customer_id   | int     |
| name          | varchar |
+---------------+---------+
customer_id is the primary key for this table. This table contains information 
about the customers.

Table: Orders

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| order_date    | date    |
| customer_id   | int     |
| product_id    | int     |
+---------------+---------+
order_id is the primary key for this table. This table contains information 
about the orders made by customer_id. There will be no product ordered by the 
same user more than once in one day.

Table: Products

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| product_id    | int     |
| product_name  | varchar |
| price         | int     |
+---------------+---------+
product_id is the primary key for this table. This table contains information 
about the Products.

Write an SQL query to find the most recent order(s) of each product. Return the 
result table sorted by product_name in ascending order and in case of a tie by 
the product_id in ascending order. If there still a tie, order them by the 
order_id in ascending order.

The query result format is in the following example:

Customers
+-------------+-----------+
| customer_id | name      |
+-------------+-----------+
| 1           | Winston   |
| 2           | Jonathan  |
| 3           | Annabelle |
| 4           | Marwan    |
| 5           | Khaled    |
+-------------+-----------+

Orders
+----------+------------+-------------+------------+
| order_id | order_date | customer_id | product_id |
+----------+------------+-------------+------------+
| 1        | 2020-07-31 | 1           | 1          |
| 2        | 2020-07-30 | 2           | 2          |
| 3        | 2020-08-29 | 3           | 3          |
| 4        | 2020-07-29 | 4           | 1          |
| 5        | 2020-06-10 | 1           | 2          |
| 6        | 2020-08-01 | 2           | 1          |
| 7        | 2020-08-01 | 3           | 1          |
| 8        | 2020-08-03 | 1           | 2          |
| 9        | 2020-08-07 | 2           | 3          |
| 10       | 2020-07-15 | 1           | 2          |
+----------+------------+-------------+------------+

Products
+------------+--------------+-------+
| product_id | product_name | price |
+------------+--------------+-------+
| 1          | keyboard     | 120   |
| 2          | mouse        | 80    |
| 3          | screen       | 600   |
| 4          | hard disk    | 450   |
+------------+--------------+-------+

Result table:
+--------------+------------+----------+------------+
| product_name | product_id | order_id | order_date |
+--------------+------------+----------+------------+
| keyboard     | 1          | 6        | 2020-08-01 |
| keyboard     | 1          | 7        | 2020-08-01 |
| mouse        | 2          | 8        | 2020-08-03 |
| screen       | 3          | 3        | 2020-08-29 |
+--------------+------------+----------+------------+
keyboard's most recent order is in 2020-08-01, it was ordered two times this day.
mouse's most recent order is in 2020-08-03, it was ordered only once this day.
screen's most recent order is in 2020-08-29, it was ordered only once this day.
The hard disk was never ordered and we don't include it in the result table.*/

SELECT 
    product_name, 
    product_id, 
    order_id, 
    order_date
FROM 
    Orders
    LEFT JOIN Products USING (product_id)
WHERE (product_id, order_date) 
    IN 
    (SELECT product_id, MAX(order_date) AS latest 
     FROM Orders 
     GROUP BY 1)
ORDER BY 1, 2, 3


/*1555. Bank Account Summary (Medium)
SQL Schema
Table: Users
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| user_id      | int     |
| user_name    | varchar |
| credit       | int     |
+--------------+---------+
user_id is the primary key for this table. Each row of this table contains the 
current credit information for each user.

Table: Transactions
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| trans_id      | int     |
| paid_by       | int     |
| paid_to       | int     |
| amount        | int     |
| transacted_on | date    |
+---------------+---------+
trans_id is the primary key for this table. Each row of this table contains 
information about the transaction in the bank. User with id (paid_by) transfer 
money to user with id (paid_to). Leetcode Bank (LCB) helps its coders in making 
virtual payments. Our bank records all transactions in the table Transaction, 
we want to find out the current balance of all users and check whether they 
have breached their credit limit (If their current credit is less than 0).

Write an SQL query to report.
* user_id,
* user_name,
* credit, current balance after performing transactions, and
* credit_limit_breached, check credit_limit ("Yes" or "No")
Return the result table in any order. The query result format is in the 
following example.

Example 1:
Input: 
Users table:
+------------+--------------+-------------+
| user_id    | user_name    | credit      |
+------------+--------------+-------------+
| 1          | Moustafa     | 100         |
| 2          | Jonathan     | 200         |
| 3          | Winston      | 10000       |
| 4          | Luis         | 800         | 
+------------+--------------+-------------+
Transactions table:
+------------+------------+------------+----------+---------------+
| trans_id   | paid_by    | paid_to    | amount   | transacted_on |
+------------+------------+------------+----------+---------------+
| 1          | 1          | 3          | 400      | 2020-08-01    |
| 2          | 3          | 2          | 500      | 2020-08-02    |
| 3          | 2          | 1          | 200      | 2020-08-03    |
+------------+------------+------------+----------+---------------+
Output: 
+------------+------------+------------+-----------------------+
| user_id    | user_name  | credit     | credit_limit_breached |
+------------+------------+------------+-----------------------+
| 1          | Moustafa   | -100       | Yes                   | 
| 2          | Jonathan   | 500        | No                    |
| 3          | Winston    | 9900       | No                    |
| 4          | Luis       | 800        | No                    |
+------------+------------+------------+-----------------------+
Explanation: Moustafa paid $400 on "2020-08-01" and received $200 on 
             "2020-08-03", credit (100 -400 +200) = -$100. Jonathan received 
             $500 on "2020-08-02" and paid $200 on "2020-08-08", credit 
             (200 +500 -200) = $500. Winston received $400 on "2020-08-01" and 
             paid $500 on "2020-08-03", credit (10000 +400 -500) = $9990. Luis 
             did not received any transfer, credit = $800*/

SELECT 
    user_id, 
    user_name, 
    credit - IFNULL(paid_by_amount, 0) + IFNULL(paid_to_amount, 0)  AS credit, 
    IF(credit - IFNULL(paid_by_amount, 0) + IFNULL(paid_to_amount, 0) < 0, "Yes", "No") AS credit_limit_breached
FROM 
    Users 
    LEFT JOIN (SELECT paid_by, SUM(amount) AS paid_by_amount FROM Transactions GROUP BY paid_by) a ON Users.user_id = a.paid_by    
    LEFT JOIN (SELECT paid_to, SUM(amount) AS paid_to_amount FROM Transactions GROUP BY paid_to) b ON Users.user_id = b.paid_to


/*1565. Unique Orders and Customers Per Month (Easy)
SQL Schema
Table: Orders
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| order_date    | date    |
| customer_id   | int     |
| invoice       | int     |
+---------------+---------+
order_id is the primary key for this table. This table contains information 
about the orders made by customer_id. Write an SQL query to find the number 
of unique orders and the number of unique customers with invoices > $20 for 
each different month. Return the result table sorted in any order. The query 
result format is in the following example:

Orders
+----------+------------+-------------+------------+
| order_id | order_date | customer_id | invoice    |
+----------+------------+-------------+------------+
| 1        | 2020-09-15 | 1           | 30         |
| 2        | 2020-09-17 | 2           | 90         |
| 3        | 2020-10-06 | 3           | 20         |
| 4        | 2020-10-20 | 3           | 21         |
| 5        | 2020-11-10 | 1           | 10         |
| 6        | 2020-11-21 | 2           | 15         |
| 7        | 2020-12-01 | 4           | 55         |
| 8        | 2020-12-03 | 4           | 77         |
| 9        | 2021-01-07 | 3           | 31         |
| 10       | 2021-01-15 | 2           | 20         |
+----------+------------+-------------+------------+

Result table:
+---------+-------------+----------------+
| month   | order_count | customer_count |
+---------+-------------+----------------+
| 2020-09 | 2           | 2              |
| 2020-10 | 1           | 1              |
| 2020-12 | 2           | 1              |
| 2021-01 | 1           | 1              |
+---------+-------------+----------------+
In September 2020 we have two orders from 2 different customers with invoices > $20. 
In October 2020 we have two orders from 1 customer, and only one of the two orders 
has invoice > $20. In November 2020 we have two orders from 2 different customers 
but invoices < $20, so we don't include that month. In December 2020 we have two 
orders from 1 customer both with invoices > $20. In January 2021 we have two orders 
from 2 different customers, but only one of them with invoice > $20.*/

SELECT 
    DATE_FORMAT(order_date, "%Y-%m") AS month, 
    COUNT(DISTINCT order_id) AS order_count, 
    COUNT(DISTINCT customer_id) AS customer_count
FROM Orders
WHERE invoice > 20
GROUP BY 1


/*1571. Warehouse Manager (Easy)
SQL Schema
Table: Warehouse
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| name         | varchar |
| product_id   | int     |
| units        | int     |
+--------------+---------+
(name, product_id) is the primary key for this table. Each row of this table 
contains the information of the products in each warehouse. 

Table: Products
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| product_id    | int     |
| product_name  | varchar |
| Width         | int     |
| Length        | int     |
| Height        | int     |
+---------------+---------+
product_id is the primary key for this table. Each row of this table contains 
the information about the product dimensions (Width, Lenght and Height) in 
feets of each product. Write an SQL query to report, How much cubic feet of 
volume does the inventory occupy in each warehouse.
* warehouse_name
* volume
Return the result table in any order. The query result format is in the 
following example. 

Warehouse table:
+------------+--------------+-------------+
| name       | product_id   | units       |
+------------+--------------+-------------+
| LCHouse1   | 1            | 1           |
| LCHouse1   | 2            | 10          |
| LCHouse1   | 3            | 5           |
| LCHouse2   | 1            | 2           |
| LCHouse2   | 2            | 2           |
| LCHouse3   | 4            | 1           |
+------------+--------------+-------------+

Products table:
+------------+--------------+------------+----------+-----------+
| product_id | product_name | Width      | Length   | Height    |
+------------+--------------+------------+----------+-----------+
| 1          | LC-TV        | 5          | 50       | 40        |
| 2          | LC-KeyChain  | 5          | 5        | 5         |
| 3          | LC-Phone     | 2          | 10       | 10        |
| 4          | LC-T-Shirt   | 4          | 10       | 20        |
+------------+--------------+------------+----------+-----------+

Result table:
+----------------+------------+
| warehouse_name | volume     | 
+----------------+------------+
| LCHouse1       | 12250      | 
| LCHouse2       | 20250      |
| LCHouse3       | 800        |
+----------------+------------+
Volume of product_id = 1 (LC-TV), 5x50x40 = 10000
Volume of product_id = 2 (LC-KeyChain), 5x5x5 = 125 
Volume of product_id = 3 (LC-Phone), 2x10x10 = 200
Volume of product_id = 4 (LC-T-Shirt), 4x10x20 = 800
LCHouse1: 1 unit of LC-TV + 10 units of LC-KeyChain + 5 units of LC-Phone.
          Total volume: 1*10000 + 10*125  + 5*200 = 12250 cubic feet
LCHouse2: 2 units of LC-TV + 2 units of LC-KeyChain.
          Total volume: 2*10000 + 2*125 = 20250 cubic feet
LCHouse3: 1 unit of LC-T-Shirt.
          Total volume: 1*800 = 800 cubic feet.*/

SELECT 
    name AS warehouse_name, 
    SUM(Width*Length*Height*units) AS volume
FROM Warehouse LEFT JOIN Products USING (product_id)
GROUP BY name 


/*1581. Customer Who Visited but Did Not Make Any Transactions (Easy)
SQL Schema
Table: Visits
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| visit_id    | int     |
| customer_id | int     |
+-------------+---------+
visit_id is the primary key for this table. This table contains information 
about the customers who visited the mall. 

Table: Transactions
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| transaction_id | int     |
| visit_id       | int     |
| amount         | int     |
+----------------+---------+
transaction_id is the primary key for this table. This table contains 
information about the transactions made during the visit_id. Write an SQL query 
to find the IDs of the users who visited without making any transactions and 
the number of times they made these types of visits. Return the result table 
sorted in any order. The query result format is in the following example:

Visits
+----------+-------------+
| visit_id | customer_id |
+----------+-------------+
| 1        | 23          |
| 2        | 9           |
| 4        | 30          |
| 5        | 54          |
| 6        | 96          |
| 7        | 54          |
| 8        | 54          |
+----------+-------------+

Transactions
+----------------+----------+--------+
| transaction_id | visit_id | amount |
+----------------+----------+--------+
| 2              | 5        | 310    |
| 3              | 5        | 300    |
| 9              | 5        | 200    |
| 12             | 1        | 910    |
| 13             | 2        | 970    |
+----------------+----------+--------+

Result table:
+-------------+----------------+
| customer_id | count_no_trans |
+-------------+----------------+
| 54          | 2              |
| 30          | 1              |
| 96          | 1              |
+-------------+----------------+
Customer with id = 23 visited the mall once and made one transaction during the 
visit with id = 12. Customer with id = 9 visited the mall once and made one 
transaction during the visit with id = 13. Customer with id = 30 visited the 
mall once and did not make any transactions. Customer with id = 54 visited the 
mall three times. During 2 visits they did not make any transactions, and during 
one visit they made 3 transactions. Customer with id = 96 visited the mall once 
and did not make any transactions. As we can see, users with IDs 30 and 96 
visited the mall one time without making any transactions. Also user 54 visited 
the mall twice and did not make any transactions.*/

SELECT customer_id, COUNT(*) count_no_trans
FROM Visits
WHERE visit_id NOT IN (SELECT DISTINCT visit_id FROM Transactions)
GROUP BY 1


/*1587. Bank Account Summary II (Easy)
SQL Schema
Table: Users
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| account      | int     |
| name         | varchar |
+--------------+---------+
account is the primary key for this table. Each row of this table contains the 
account number of each user in the bank. 

Table: Transactions
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| trans_id      | int     |
| account       | int     |
| amount        | int     |
| transacted_on | date    |
+---------------+---------+
trans_id is the primary key for this table. Each row of this table contains all 
changes made to all accounts. amount is positive if the user received money and 
negative if they transferred money. All accounts start with a balance 0. Write 
an SQL query to report the name and balance of users with a balance higher than 
10000. The balance of an account is equal to the sum of the amounts of all 
transactions involving that account. Return the result table in any order. 

The query result format is in the following example.

Users table:
+------------+--------------+
| account    | name         |
+------------+--------------+
| 900001     | Alice        |
| 900002     | Bob          |
| 900003     | Charlie      |
+------------+--------------+

Transactions table:
+------------+------------+------------+---------------+
| trans_id   | account    | amount     | transacted_on |
+------------+------------+------------+---------------+
| 1          | 900001     | 7000       |  2020-08-01   |
| 2          | 900001     | 7000       |  2020-09-01   |
| 3          | 900001     | -3000      |  2020-09-02   |
| 4          | 900002     | 1000       |  2020-09-12   |
| 5          | 900003     | 6000       |  2020-08-07   |
| 6          | 900003     | 6000       |  2020-09-07   |
| 7          | 900003     | -4000      |  2020-09-11   |
+------------+------------+------------+---------------+

Result table:
+------------+------------+
| name       | balance    |
+------------+------------+
| Alice      | 11000      |
+------------+------------+
Alice's balance is (7000 + 7000 - 3000) = 11000.
Bob's balance is 1000.
Charlie's balance is (6000 + 6000 - 4000) = 8000.*/

SELECT name, SUM(amount) AS balance
FROM Users JOIN Transactions USING (account) 
GROUP BY account
HAVING SUM(amount) > 10000


/*1596. The Most Frequently Ordered Products for Each Customer (Medium)
SQL Schema
Table: Customers

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| customer_id   | int     |
| name          | varchar |
+---------------+---------+
customer_id is the primary key for this table. This table contains information 
about the customers.

Table: Orders

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| order_date    | date    |
| customer_id   | int     |
| product_id    | int     |
+---------------+---------+
order_id is the primary key for this table. This table contains information 
about the orders made by customer_id. No customer will order the same product 
more than once in a single day.
 
Table: Products

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| product_id    | int     |
| product_name  | varchar |
| price         | int     |
+---------------+---------+
product_id is the primary key for this table. This table contains information 
about the products.
 
Write an SQL query to find the most frequently ordered product(s) for each 
customer. The result table should have the product_id and product_name for each 
customer_id who ordered at least one order. Return the result table in any order.

The query result format is in the following example:

Customers
+-------------+-------+
| customer_id | name  |
+-------------+-------+
| 1           | Alice |
| 2           | Bob   |
| 3           | Tom   |
| 4           | Jerry |
| 5           | John  |
+-------------+-------+

Orders
+----------+------------+-------------+------------+
| order_id | order_date | customer_id | product_id |
+----------+------------+-------------+------------+
| 1        | 2020-07-31 | 1           | 1          |
| 2        | 2020-07-30 | 2           | 2          |
| 3        | 2020-08-29 | 3           | 3          |
| 4        | 2020-07-29 | 4           | 1          |
| 5        | 2020-06-10 | 1           | 2          |
| 6        | 2020-08-01 | 2           | 1          |
| 7        | 2020-08-01 | 3           | 3          |
| 8        | 2020-08-03 | 1           | 2          |
| 9        | 2020-08-07 | 2           | 3          |
| 10       | 2020-07-15 | 1           | 2          |
+----------+------------+-------------+------------+

Products
+------------+--------------+-------+
| product_id | product_name | price |
+------------+--------------+-------+
| 1          | keyboard     | 120   |
| 2          | mouse        | 80    |
| 3          | screen       | 600   |
| 4          | hard disk    | 450   |
+------------+--------------+-------+
Result table:
+-------------+------------+--------------+
| customer_id | product_id | product_name |
+-------------+------------+--------------+
| 1           | 2          | mouse        |
| 2           | 1          | keyboard     |
| 2           | 2          | mouse        |
| 2           | 3          | screen       |
| 3           | 3          | screen       |
| 4           | 1          | keyboard     |
+-------------+------------+--------------+

Alice (customer 1) ordered the mouse three times and the keyboard one time, so 
the mouse is the most frquently ordered product for them. Bob (customer 2) 
ordered the keyboard, the mouse, and the screen one time, so those are the most 
frquently ordered products for them. Tom (customer 3) only ordered the screen 
(two times), so that is the most frquently ordered product for them. Jerry 
(customer 4) only ordered the keyboard (one time), so that is the most 
frquently ordered product for them. John (customer 5) did not order anything, 
so we do not include them in the result table.*/

WITH freq AS (
    SELECT *, COUNT(*) AS cnt
    FROM 
        Orders 
        LEFT JOIN Customers USING (customer_id)
        LEFT JOIN Products USING (product_id)
    GROUP BY 1, 2
    ORDER BY 1, 2
) 
SELECT
    customer_id, 
    product_id,
    product_name
FROM (SELECT *, MAX(cnt) OVER (PARTITION BY customer_id) AS most FROM freq) a
WHERE cnt = most


/*1607. Sellers With No Sales (Easy)
SQL Schema
Table: Customer
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| customer_id   | int     |
| customer_name | varchar |
+---------------+---------+
customer_id is the primary key for this table. Each row of this table contains 
the information of each customer in the WebStore. 

Table: Orders
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| sale_date     | date    |
| order_cost    | int     |
| customer_id   | int     |
| seller_id     | int     |
+---------------+---------+
order_id is the primary key for this table. Each row of this table contains all 
orders made in the webstore. sale_date is the date when the transaction was 
made between the customer (customer_id) and the seller (seller_id).
 
Table: Seller
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| seller_id     | int     |
| seller_name   | varchar |
+---------------+---------+
seller_id is the primary key for this table. Each row of this table contains 
the information of each seller. Write an SQL query to report the names of all 
sellers who did not make any sales in 2020. Return the result table ordered by 
seller_name in ascending order. The query result format is in the following 
example.

Customer table:
+--------------+---------------+
| customer_id  | customer_name |
+--------------+---------------+
| 101          | Alice         |
| 102          | Bob           |
| 103          | Charlie       |
+--------------+---------------+

Orders table:
+-------------+------------+--------------+-------------+-------------+
| order_id    | sale_date  | order_cost   | customer_id | seller_id   |
+-------------+------------+--------------+-------------+-------------+
| 1           | 2020-03-01 | 1500         | 101         | 1           |
| 2           | 2020-05-25 | 2400         | 102         | 2           |
| 3           | 2019-05-25 | 800          | 101         | 3           |
| 4           | 2020-09-13 | 1000         | 103         | 2           |
| 5           | 2019-02-11 | 700          | 101         | 2           |
+-------------+------------+--------------+-------------+-------------+

Seller table:
+-------------+-------------+
| seller_id   | seller_name |
+-------------+-------------+
| 1           | Daniel      |
| 2           | Elizabeth   |
| 3           | Frank       |
+-------------+-------------+

Result table:
+-------------+
| seller_name |
+-------------+
| Frank       |
+-------------+
Daniel made 1 sale in March 2020. Elizabeth made 2 sales in 2020 and 1 sale in 
2019. Frank made 1 sale in 2019 but no sales in 2020.*/

SELECT seller_name 
FROM Seller
WHERE seller_id NOT IN (SELECT seller_id FROM Orders WHERE YEAR(sale_date) = 2020)
ORDER BY 1


/*1613. Find the Missing IDs (Medium)
SQL Schema
Table: Customers

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| customer_id   | int     |
| customer_name | varchar |
+---------------+---------+
customer_id is the primary key for this table. Each row of this table contains 
the name and the id customer. Write an SQL query to find the missing customer 
IDs. The missing IDs are ones that are not in the Customers table but are in 
the range between 1 and the maximum customer_id present in the table. Notice 
that the maximum customer_id will not exceed 100. Return the result table 
ordered by ids in ascending order.

The query result format is in the following example.

Customers table:
+-------------+---------------+
| customer_id | customer_name |
+-------------+---------------+
| 1           | Alice         |
| 4           | Bob           |
| 5           | Charlie       |
+-------------+---------------+

Result table:
+-----+
| ids |
+-----+
| 2   |
| 3   |
+-----+
The maximum customer_id present in the table is 5, so in the range [1,5], IDs 2 
and 3 are missing from the table.*/

WITH RECURSIVE seq (n) AS (
  SELECT 1
  UNION ALL
  SELECT n + 1 FROM seq WHERE n + 1 <= (SELECT MAX(Customer_id) FROM Customers)
)
SELECT n AS ids
FROM seq
WHERE n NOT IN (SELECT DISTINCT customer_id FROM Customers)


/*1623. All Valid Triplets That Can Represent a Country (Easy)
SQL Schema
Table: SchoolA
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| student_id    | int     |
| student_name  | varchar |
+---------------+---------+
student_id is the primary key for this table. Each row of this table contains 
the name and the id of a student in school A. All student_name are distinct.

Table: SchoolB
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| student_id    | int     |
| student_name  | varchar |
+---------------+---------+
student_id is the primary key for this table. Each row of this table contains 
the name and the id of a student in school B. All student_name are distinct.

Table: SchoolC
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| student_id    | int     |
| student_name  | varchar |
+---------------+---------+
student_id is the primary key for this table. Each row of this table contains 
the name and the id of a student in school C. All student_name are distinct.

There is a country with three schools, where each student is enrolled in 
exactly one school. The country is joining a competition and wants to select 
one student from each school to represent the country such that:
* member_A is selected from SchoolA,
* member_B is selected from SchoolB,
* member_C is selected from SchoolC, and
* The selected students' names and IDs are pairwise distinct (i.e. no two 
  students share the same name, and no two students share the same ID).
Write an SQL query to find all the possible triplets representing the country 
under the given constraints. Return the result table in any order.

The query result format is in the following example.

SchoolA table:
+------------+--------------+
| student_id | student_name |
+------------+--------------+
| 1          | Alice        |
| 2          | Bob          |
+------------+--------------+

SchoolB table:
+------------+--------------+
| student_id | student_name |
+------------+--------------+
| 3          | Tom          |
+------------+--------------+

SchoolC table:
+------------+--------------+
| student_id | student_name |
+------------+--------------+
| 3          | Tom          |
| 2          | Jerry        |
| 10         | Alice        |
+------------+--------------+

Result table:
+----------+----------+----------+
| member_A | member_B | member_C |
+----------+----------+----------+
| Alice    | Tom      | Jerry    |
| Bob      | Tom      | Alice    |
+----------+----------+----------+
Let us see all the possible triplets.
- (Alice, Tom, Tom) --> Rejected because member_B and member_C have the same name and the same ID.
- (Alice, Tom, Jerry) --> Valid triplet.
- (Alice, Tom, Alice) --> Rejected because member_A and member_C have the same name.
- (Bob, Tom, Tom) --> Rejected because member_B and member_C have the same name and the same ID.
- (Bob, Tom, Jerry) --> Rejected because member_A and member_C have the same ID.
- (Bob, Tom, Alice) --> Valid triplet.*/

SELECT 
    a.student_name member_A,
    b.student_name member_B, 
    c.student_name member_C
FROM 
    SchoolA a, SchoolB b, SchoolC c
WHERE 
    a.student_id <> b.student_id AND 
    b.student_id <> c.student_id AND 
    c.student_id <> a.student_id AND 
    a.student_name <> b.student_name AND 
    b.student_name <> c.student_name AND 
    c.student_name <> a.student_name


/*1633. Percentage of Users Attended a Contest (Easy)
SQL Schema
Table: Users
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| user_id     | int     |
| user_name   | varchar |
+-------------+---------+
user_id is the primary key for this table. Each row of this table contains the 
name and the id of a user.

Table: Register
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| contest_id  | int     |
| user_id     | int     |
+-------------+---------+
(contest_id, user_id) is the primary key for this table. Each row of this table 
contains the id of a user and the contest they registered into. Write an SQL 
query to find the percentage of the users registered in each contest rounded to 
two decimals. Return the result table ordered by percentage in descending order. 
In case of a tie, order it by contest_id in ascending order. The query result 
format is in the following example.

Users table:
+---------+-----------+
| user_id | user_name |
+---------+-----------+
| 6       | Alice     |
| 2       | Bob       |
| 7       | Alex      |
+---------+-----------+

Register table:
+------------+---------+
| contest_id | user_id |
+------------+---------+
| 215        | 6       |
| 209        | 2       |
| 208        | 2       |
| 210        | 6       |
| 208        | 6       |
| 209        | 7       |
| 209        | 6       |
| 215        | 7       |
| 208        | 7       |
| 210        | 2       |
| 207        | 2       |
| 210        | 7       |
+------------+---------+

Result table:
+------------+------------+
| contest_id | percentage |
+------------+------------+
| 208        | 100.0      |
| 209        | 100.0      |
| 210        | 100.0      |
| 215        | 66.67      |
| 207        | 33.33      |
+------------+------------+
All the users registered in contests 208, 209, and 210. The percentage is 100% 
and we sort them in the answer table by contest_id in ascending order. Alice 
and Alex registered in contest 215 and the percentage is ((2/3) * 100) = 66.67%
Bob registered in contest 207 and the percentage is ((1/3) * 100) = 33.33%*/

SELECT 
    contest_id, 
    ROUND(100*COUNT(DISTINCT user_id) / (SELECT COUNT(*) FROM Users), 2) AS percentage
FROM Register
GROUP BY 1
ORDER BY 2 DESC, 1 ASC


/*1661. Average Time of Process per Machine (Easy)
SQL Schema
Table: Activity
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| machine_id     | int     |
| process_id     | int     |
| activity_type  | enum    |
| timestamp      | float   |
+----------------+---------+
The table shows the user activities for a factory website. 
(machine_id, process_id, activity_type) is the primary key of this table. 
machine_id is the ID of a machine. process_id is the ID of a process running on 
the machine with ID machine_id. activity_type is an ENUM of type ('start', 'end').
timestamp is a float representing the current time in seconds. 'start' means the 
machine starts the process at the given timestamp and 'end' means the machine 
ends the process at the given timestamp. The 'start' timestamp will always be 
before the 'end' timestamp for every (machine_id, process_id) pair. There is a 
factory website that has several machines each running the same number of 
processes. Write an SQL query to find the average time each machine takes to 
complete a process. The time to complete a process is the 'end' timestamp minus 
the 'start' timestamp. The average time is calculated by the total time to 
complete every process on the machine divided by the number of processes that 
were run. The resulting table should have the machine_id along with the average 
time as processing_time, which should be rounded to 3 decimal places. 

The query result format is in the following example:

Activity table:
+------------+------------+---------------+-----------+
| machine_id | process_id | activity_type | timestamp |
+------------+------------+---------------+-----------+
| 0          | 0          | start         | 0.712     |
| 0          | 0          | end           | 1.520     |
| 0          | 1          | start         | 3.140     |
| 0          | 1          | end           | 4.120     |
| 1          | 0          | start         | 0.550     |
| 1          | 0          | end           | 1.550     |
| 1          | 1          | start         | 0.430     |
| 1          | 1          | end           | 1.420     |
| 2          | 0          | start         | 4.100     |
| 2          | 0          | end           | 4.512     |
| 2          | 1          | start         | 2.500     |
| 2          | 1          | end           | 5.000     |
+------------+------------+---------------+-----------+

Result table:
+------------+-----------------+
| machine_id | processing_time |
+------------+-----------------+
| 0          | 0.894           |
| 1          | 0.995           |
| 2          | 1.456           |
+------------+-----------------+

There are 3 machines running 2 processes each.
Machine 0's average time is ((1.520 - 0.712) + (4.120 - 3.140)) / 2 = 0.894
Machine 1's average time is ((1.550 - 0.550) + (1.420 - 0.430)) / 2 = 0.995
Machine 2's average time is ((4.512 - 4.100) + (5.000 - 2.500)) / 2 = 1.456*/

SELECT 
    machine_id, 
    ROUND(SUM(CASE WHEN activity_type = "end" THEN timestamp ELSE -timestamp END)/COUNT(DISTINCT process_id), 3) AS processing_time
FROM Activity
GROUP BY 1


/*1667. Fix Names in a Table (Easy)
SQL Schema
Table: Users
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| user_id        | int     |
| name           | varchar |
+----------------+---------+
user_id is the primary key for this table. This table contains the ID and the 
name of the user. The name consists of only lowercase and uppercase characters. 
Write an SQL query to fix the names so that only the first character is 
uppercase and the rest are lowercase. Return the result table ordered by user_id.

The query result format is in the following example:

Users table:
+---------+-------+
| user_id | name  |
+---------+-------+
| 1       | aLice |
| 2       | bOB   |
+---------+-------+

Result table:
+---------+-------+
| user_id | name  |
+---------+-------+
| 1       | Alice |
| 2       | Bob   |
+---------+-------+*/

SELECT 
    user_id, 
    CONCAT(UPPER(LEFT(name, 1)), LOWER(SUBSTRING(name, 2))) name
FROM Users
ORDER BY 1


/*1677. Product's Worth Over Invoices (Easy)
SQL Schema
Table: Product
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_id  | int     |
| name        | varchar |
+-------------+---------+
product_id is the primary key for this table. This table contains the ID and 
the name of the product. The name consists of only lowercase English letters. 
No two products have the same name.

Table: Invoice
+-------------+------+
| Column Name | Type |
+-------------+------+
| invoice_id  | int  |
| product_id  | int  |
| rest        | int  |
| paid        | int  |
| canceled    | int  |
| refunded    | int  |
+-------------+------+
invoice_id is the primary key for this table and the id of this invoice. 
product_id is the id of the product for this invoice. rest is the amount left 
to pay for this invoice. paid is the amount paid for this invoice. canceled is 
the amount canceled for this invoice. refunded is the amount refunded for this 
invoice. Write an SQL query that will, for all products, return each product 
name with total amount due, paid, canceled, and refunded across all invoices. 
Return the result table ordered by product_name.

The query result format is in the following example:

Product table:
+------------+-------+
| product_id | name  |
+------------+-------+
| 0          | ham   |
| 1          | bacon |
+------------+-------+

Invoice table:
+------------+------------+------+------+----------+----------+
| invoice_id | product_id | rest | paid | canceled | refunded |
+------------+------------+------+------+----------+----------+
| 23         | 0          | 2    | 0    | 5        | 0        |
| 12         | 0          | 0    | 4    | 0        | 3        |
| 1          | 1          | 1    | 1    | 0        | 1        |
| 2          | 1          | 1    | 0    | 1        | 1        |
| 3          | 1          | 0    | 1    | 1        | 1        |
| 4          | 1          | 1    | 1    | 1        | 0        |
+------------+------------+------+------+----------+----------+

Result table:
+-------+------+------+----------+----------+
| name  | rest | paid | canceled | refunded |
+-------+------+------+----------+----------+
| bacon | 3    | 3    | 3        | 3        |
| ham   | 2    | 4    | 5        | 3        |
+-------+------+------+----------+----------+
- The amount of money left to pay for bacon is 1 + 1 + 0 + 1 = 3
- The amount of money paid for bacon is 1 + 0 + 1 + 1 = 3
- The amount of money canceled for bacon is 0 + 1 + 1 + 1 = 3
- The amount of money refunded for bacon is 1 + 1 + 1 + 0 = 3
- The amount of money left to pay for ham is 2 + 0 = 2
- The amount of money paid for ham is 0 + 4 = 4
- The amount of money canceled for ham is 5 + 0 = 5
- The amount of money refunded for ham is 0 + 3 = 3*/

SELECT 
    name, 
    SUM(rest) AS rest, 
    SUM(paid) AS paid, 
    SUM(canceled) AS canceled, 
    SUM(refunded) AS refunded
FROM Product JOIN Invoice USING (product_id)
GROUP BY 1
ORDER BY 1


/*1683. Invalid Tweets (Easy)
SQL Schema
Table: Tweets
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| tweet_id       | int     |
| content        | varchar |
+----------------+---------+
tweet_id is the primary key for this table. This table contains all the tweets 
in a social media app. Write an SQL query to find the IDs of the invalid tweets. 
The tweet is invalid if the number of characters used in the content of the 
tweet is strictly greater than 15. Return the result table in any order.

The query result format is in the following example:

Tweets table:
+----------+----------------------------------+
| tweet_id | content                          |
+----------+----------------------------------+
| 1        | Vote for Biden                   |
| 2        | Let us make America great again! |
+----------+----------------------------------+

Result table:
+----------+
| tweet_id |
+----------+
| 2        |
+----------+
Tweet 1 has length = 14. It is a valid tweet.
Tweet 2 has length = 32. It is an invalid tweet.*/

SELECT tweet_id
FROM Tweets
WHERE CHAR_LENGTH(content) > 15


/*1693. Daily Leads and Partners (Easy)
SQL Schema
Table: DailySales
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| date_id     | date    |
| make_name   | varchar |
| lead_id     | int     |
| partner_id  | int     |
+-------------+---------+
This table does not have a primary key. This table contains the date and the 
name of the product sold and the IDs of the lead and partner it was sold to.
The name consists of only lowercase English letters. Write an SQL query that 
will, for each date_id and make_name, return the number of distinct lead_id's 
and distinct partner_id's. Return the result table in any order.

The query result format is in the following example:

DailySales table:
+-----------+-----------+---------+------------+
| date_id   | make_name | lead_id | partner_id |
+-----------+-----------+---------+------------+
| 2020-12-8 | toyota    | 0       | 1          |
| 2020-12-8 | toyota    | 1       | 0          |
| 2020-12-8 | toyota    | 1       | 2          |
| 2020-12-7 | toyota    | 0       | 2          |
| 2020-12-7 | toyota    | 0       | 1          |
| 2020-12-8 | honda     | 1       | 2          |
| 2020-12-8 | honda     | 2       | 1          |
| 2020-12-7 | honda     | 0       | 1          |
| 2020-12-7 | honda     | 1       | 2          |
| 2020-12-7 | honda     | 2       | 1          |
+-----------+-----------+---------+------------+

Result table:
+-----------+-----------+--------------+-----------------+
| date_id   | make_name | unique_leads | unique_partners |
+-----------+-----------+--------------+-----------------+
| 2020-12-8 | toyota    | 2            | 3               |
| 2020-12-7 | toyota    | 1            | 2               |
| 2020-12-8 | honda     | 2            | 2               |
| 2020-12-7 | honda     | 3            | 2               |
+-----------+-----------+--------------+-----------------+
For 2020-12-8, toyota gets leads = [0, 1] and partners = [0, 1, 2] while honda 
gets leads = [1, 2] and partners = [1, 2]. For 2020-12-7, toyota gets leads = [0] 
and partners = [1, 2] while honda gets leads = [0, 1, 2] and partners = [1, 2].*/

SELECT 
    date_id, 
    make_name, 
    COUNT(DISTINCT lead_id) AS unique_leads, 
    COUNT(DISTINCT partner_id) AS unique_partners
FROM DailySales
GROUP BY 1, 2


/*1699. Number of Calls Between Two Persons (Medium)
SQL Schema
Table: Calls

+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| from_id     | int     |
| to_id       | int     |
| duration    | int     |
+-------------+---------+
This table does not have a primary key, it may contain duplicates. This table 
contains the duration of a phone call between from_id and to_id. from_id != to_id
Write an SQL query to report the number of calls and the total call duration 
between each pair of distinct persons (person1, person2) where person1 < person2.
Return the result table in any order.

The query result format is in the following example:

Calls table:
+---------+-------+----------+
| from_id | to_id | duration |
+---------+-------+----------+
| 1       | 2     | 59       |
| 2       | 1     | 11       |
| 1       | 3     | 20       |
| 3       | 4     | 100      |
| 3       | 4     | 200      |
| 3       | 4     | 200      |
| 4       | 3     | 499      |
+---------+-------+----------+

Result table:
+---------+---------+------------+----------------+
| person1 | person2 | call_count | total_duration |
+---------+---------+------------+----------------+
| 1       | 2       | 2          | 70             |
| 1       | 3       | 1          | 20             |
| 3       | 4       | 4          | 999            |
+---------+---------+------------+----------------+
Users 1 and 2 had 2 calls and the total duration is 70 (59 + 11).
Users 1 and 3 had 1 call and the total duration is 20.
Users 3 and 4 had 4 calls and the total duration is 999 (100 + 200 + 200 + 499).*/

SELECT 
    LEAST(from_id, to_id) AS person1, 
    GREATEST(from_id, to_id) AS person2, 
    COUNT(*) AS call_count, 
    SUM(duration) AS total_duration
FROM Calls
GROUP BY 1, 2


/*1709. Biggest Window Between Visits (Medium)
SQL Schema
Table: UserVisits
+-------------+------+
| Column Name | Type |
+-------------+------+
| user_id     | int  |
| visit_date  | date |
+-------------+------+
This table does not have a primary key. This table contains logs of the dates 
that users visited a certain retailer. Assume today's date is '2021-1-1'. 

Write an SQL query that will, for each user_id, find out the largest window of 
days between each visit and the one right after it (or today if you are 
considering the last visit). Return the result table ordered by user_id. The 
query result format is in the following example.

Example 1:
Input: 
UserVisits table:
+---------+------------+
| user_id | visit_date |
+---------+------------+
| 1       | 2020-11-28 |
| 1       | 2020-10-20 |
| 1       | 2020-12-3  |
| 2       | 2020-10-5  |
| 2       | 2020-12-9  |
| 3       | 2020-11-11 |
+---------+------------+
Output: 
+---------+---------------+
| user_id | biggest_window|
+---------+---------------+
| 1       | 39            |
| 2       | 65            |
| 3       | 51            |
+---------+---------------+
Explanation: For the first user, the windows in question are between dates:
                 - 2020-10-20 and 2020-11-28 with a total of 39 days. 
                 - 2020-11-28 and 2020-12-3 with a total of 5 days. 
                 - 2020-12-3 and 2021-1-1 with a total of 29 days.
             Making the biggest window the one with 39 days.
             For the second user, the windows in question are between dates:
                 - 2020-10-5 and 2020-12-9 with a total of 65 days.
                 - 2020-12-9 and 2021-1-1 with a total of 23 days.
             Making the biggest window the one with 65 days.
             For the third user, the only window in question is between dates 
             2020-11-11 and 2021-1-1 with a total of 51 days.*/

SELECT 
    user_id, 
    MAX(diff) AS biggest_window
FROM (
    SELECT 
        user_id, 
        DATEDIFF(LEAD(visit_date, 1, "2021-1-1") OVER (PARTITION BY user_id ORDER BY visit_date), visit_date) AS diff
    FROM UserVisits) a
GROUP BY 1
ORDER BY 1


/*1715. Count Apples and Oranges (Medium)
SQL Schema
Table: Boxes
+--------------+------+
| Column Name  | Type |
+--------------+------+
| box_id       | int  |
| chest_id     | int  |
| apple_count  | int  |
| orange_count | int  |
+--------------+------+
box_id is the primary key for this table. chest_id is a foreign key of the 
chests table. This table contains information about the boxes and the number 
of oranges and apples they contain. Each box may contain a chest, which also 
can contain oranges and apples.

Table: Chests
+--------------+------+
| Column Name  | Type |
+--------------+------+
| chest_id     | int  |
| apple_count  | int  |
| orange_count | int  |
+--------------+------+
chest_id is the primary key for this table. This table contains information 
about the chests we have, and the corresponding number if oranges and apples 
they contain. Write an SQL query to count the number of apples and oranges in 
all the boxes. If a box contains a chest, you should also include the number of 
apples and oranges it has. Return the result table in any order.

The query result format is in the following example:

Boxes table:
+--------+----------+-------------+--------------+
| box_id | chest_id | apple_count | orange_count |
+--------+----------+-------------+--------------+
| 2      | null     | 6           | 15           |
| 18     | 14       | 4           | 15           |
| 19     | 3        | 8           | 4            |
| 12     | 2        | 19          | 20           |
| 20     | 6        | 12          | 9            |
| 8      | 6        | 9           | 9            |
| 3      | 14       | 16          | 7            |
+--------+----------+-------------+--------------+

Chests table:
+----------+-------------+--------------+
| chest_id | apple_count | orange_count |
+----------+-------------+--------------+
| 6        | 5           | 6            |
| 14       | 20          | 10           |
| 2        | 8           | 8            |
| 3        | 19          | 4            |
| 16       | 19          | 19           |
+----------+-------------+--------------+

Result table:
+-------------+--------------+
| apple_count | orange_count |
+-------------+--------------+
| 151         | 123          |
+-------------+--------------+
box 2 has 6 apples and 15 oranges.
box 18 has 4 + 20 (from the chest) = 24 apples and 15 + 10 (from the chest) = 25 oranges.
box 19 has 8 + 19 (from the chest) = 27 apples and 4 + 4 (from the chest) = 8 oranges.
box 12 has 19 + 8 (from the chest) = 27 apples and 20 + 8 (from the chest) = 28 oranges.
box 20 has 12 + 5 (from the chest) = 17 apples and 9 + 6 (from the chest) = 15 oranges.
box 8 has 9 + 5 (from the chest) = 14 apples and 9 + 6 (from the chest) = 15 oranges.
box 3 has 16 + 20 (from the chest) = 36 apples and 7 + 10 (from the chest) = 17 oranges.
Total number of apples = 6 + 24 + 27 + 27 + 17 + 14 + 36 = 151
Total number of oranges = 15 + 25 + 8 + 28 + 15 + 15 + 17 = 123*/

SELECT 
    SUM(b.apple_count + IFNULL(c.apple_count, 0)) AS apple_count, 
    SUM(b.orange_count + IFNULL(c.orange_count, 0)) AS orange_count
FROM Boxes b LEFT JOIN Chests c USING (chest_id)


/*1729. Find Followers Count (Easy)
SQL Schema
Table: Followers
+-------------+------+
| Column Name | Type |
+-------------+------+
| user_id     | int  |
| follower_id | int  |
+-------------+------+
(user_id, follower_id) is the primary key for this table. This table contains 
the IDs of a user and a follower in a social media app where the follower 
follows the user. Write an SQL query that will, for each user, return the 
number of followers. Return the result table ordered by user_id.

The query result format is in the following example:

Followers table:
+---------+-------------+
| user_id | follower_id |
+---------+-------------+
| 0       | 1           |
| 1       | 0           |
| 2       | 0           |
| 2       | 1           |
+---------+-------------+

Result table:
+---------+----------------+
| user_id | followers_count|
+---------+----------------+
| 0       | 1              |
| 1       | 1              |
| 2       | 2              |
+---------+----------------+
The followers of 0 are {1} 
The followers of 1 are {0}
The followers of 2 are {0,1}*/

SELECT 
    user_id, 
    COUNT(DISTINCT follower_id) AS followers_count
FROM Followers
GROUP BY 1
ORDER BY 1


/*1731. The Number of Employees Which Report to Each Employee (Easy)
SQL Schema
Table: Employees
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| employee_id | int      |
| name        | varchar  |
| reports_to  | int      |
| age         | int      |
+-------------+----------+
employee_id is the primary key for this table. This table contains information 
about the employees and the id of the manager they report to. Some employees do 
not report to anyone (reports_to is null). Write an SQL query to report the ids 
and the names of the people that other employees reported to (excluding null 
values), the number of employees who report to them, and the average age of 
those members rounded to the nearest integer. Return the result table ordered 
by employee_id.

The query result format is in the following example:

Employees table:
+-------------+---------+------------+-----+
| employee_id | name    | reports_to | age |
+-------------+---------+------------+-----+
| 9           | Hercy   | null       | 43  |
| 6           | Alice   | 9          | 41  |
| 4           | Bob     | 9          | 36  |
| 2           | Winston | null       | 37  |
+-------------+---------+------------+-----+

Result table:
+-------------+-------+---------------+-------------+
| employee_id | name  | reports_count | average_age |
+-------------+-------+---------------+-------------+
| 9           | Hercy | 2             | 39          |
+-------------+-------+---------------+-------------+
Alice and Bob report to Hercy, hence Hercy has 2 people report to him, and the 
average of their age is (41+36)/2 = 38.5 which is 39 after rounding it to the 
nearest integer.*/

SELECT 
    b.employee_id AS employee_id, 
    b.name AS name, 
    COUNT(*) AS reports_count, 
    ROUND(AVG(a.age)) AS average_age
FROM 
    Employees a JOIN Employees b ON a.reports_to = b.employee_id
GROUP BY 1
ORDER BY 1


/*1747. Leetflex Banned Accounts (Medium)
SQL Schema
Table: LogInfo
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| account_id  | int      |
| ip_address  | int      |
| login       | datetime |
| logout      | datetime |
+-------------+----------+
There is no primary key for this table, and it may contain duplicates. The 
table contains information about the login and logout dates of Leetflex 
accounts. It also contains the IP address from which the account logged in and 
out. It is guaranteed that the logout time is after the login time. Write an 
SQL query to find the account_id of the accounts that should be banned from 
Leetflex. An account should be banned if it was logged in at some moment from 
two different IP addresses. Return the result table in any order. The query 
result format is in the following example:

LogInfo table:
+------------+------------+---------------------+---------------------+
| account_id | ip_address | login               | logout              |
+------------+------------+---------------------+---------------------+
| 1          | 1          | 2021-02-01 09:00:00 | 2021-02-01 09:30:00 |
| 1          | 2          | 2021-02-01 08:00:00 | 2021-02-01 11:30:00 |
| 2          | 6          | 2021-02-01 20:30:00 | 2021-02-01 22:00:00 |
| 2          | 7          | 2021-02-02 20:30:00 | 2021-02-02 22:00:00 |
| 3          | 9          | 2021-02-01 16:00:00 | 2021-02-01 16:59:59 |
| 3          | 13         | 2021-02-01 17:00:00 | 2021-02-01 17:59:59 |
| 4          | 10         | 2021-02-01 16:00:00 | 2021-02-01 17:00:00 |
| 4          | 11         | 2021-02-01 17:00:00 | 2021-02-01 17:59:59 |
+------------+------------+---------------------+---------------------+

Result table:
+------------+
| account_id |
+------------+
| 1          |
| 4          |
+------------+
Account ID 1 --> The account was active from "2021-02-01 09:00:00" to "2021-02-01 09:30:00" with two different IP addresses (1 and 2). It should be banned.
Account ID 2 --> The account was active from two different addresses (6, 7) but in two different times.
Account ID 3 --> The account was active from two different addresses (9, 13) on the same day but they do not intersect at any moment.
Account ID 4 --> The account was active from "2021-02-01 17:00:00" to "2021-02-01 17:00:00" with two different IP addresses (10 and 11). It should be banned.*/

SELECT 
    DISTINCT a.account_id
FROM 
    LogInfo a, LogInfo b 
WHERE 
    (a.login BETWEEN b.login AND b.logout) 
    AND a.account_id = b.account_id 
    AND a.ip_address <> b.ip_address


/*1757. Recyclable and Low Fat Products (Easy)
SQL Schema
Table: Products
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_id  | int     |
| low_fats    | enum    |
| recyclable  | enum    |
+-------------+---------+
product_id is the primary key for this table. low_fats is an ENUM of type ('Y', 'N') 
where 'Y' means this product is low fat and 'N' means it is not. recyclable is 
an ENUM of types ('Y', 'N') where 'Y' means this product is recyclable and 'N' 
means it is not. Write an SQL query to find the ids of products that are both 
low fat and recyclable. Return the result table in any order.

The query result format is in the following example:

Products table:
+-------------+----------+------------+
| product_id  | low_fats | recyclable |
+-------------+----------+------------+
| 0           | Y        | N          |
| 1           | Y        | Y          |
| 2           | N        | Y          |
| 3           | Y        | Y          |
| 4           | N        | N          |
+-------------+----------+------------+
Result table:
+-------------+
| product_id  |
+-------------+
| 1           |
| 3           |
+-------------+
Only products 1 and 3 are both low fat and recyclable.*/

SELECT product_id
FROM Products
WHERE low_fats = "Y" AND recyclable = "Y"


/*1777. Product's Price for Each Store (Easy)
SQL Schema
Table: Products
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_id  | int     |
| store       | enum    |
| price       | int     |
+-------------+---------+
(product_id,store) is the primary key for this table. store is an ENUM of type 
('store1', 'store2', 'store3') where each represents the store this product is 
available at. price is the price of the product at this store.

Write an SQL query to find the price of each product in each store. Return the 
result table in any order. The query result format is in the following example:

Products table:
+-------------+--------+-------+
| product_id  | store  | price |
+-------------+--------+-------+
| 0           | store1 | 95    |
| 0           | store3 | 105   |
| 0           | store2 | 100   |
| 1           | store1 | 70    |
| 1           | store3 | 80    |
+-------------+--------+-------+
Result table:
+-------------+--------+--------+--------+
| product_id  | store1 | store2 | store3 |
+-------------+--------+--------+--------+
| 0           | 95     | 100    | 105    |
| 1           | 70     | null   | 80     |
+-------------+--------+--------+--------+
Product 0 price's are 95 for store1, 100 for store2 and, 105 for store3. 
Product 1 price's are 70 for store1, 80 for store3 and, it's not sold in store2.*/

SELECT 
    product_id, 
    SUM(CASE WHEN store = "store1" THEN price END) AS store1, 
    SUM(CASE WHEN store = "store2" THEN price END) AS store2, 
    SUM(CASE WHEN store = "store3" THEN price END) AS store3
FROM Products
GROUP BY 1


/*1783. Grand Slam Titles (Medium)
SQL Schema
Table: Players
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| player_id      | int     |
| player_name    | varchar |
+----------------+---------+
player_id is the primary key for this table. Each row in this table contains 
the name and the ID of a tennis player.

Table: Championships
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| year          | int     |
| Wimbledon     | int     |
| Fr_open       | int     |
| US_open       | int     |
| Au_open       | int     |
+---------------+---------+
year is the primary key for this table. Each row of this table containts the 
IDs of the players who won one each tennis tournament of the grand slam.
Write an SQL query to report the number of grand slam tournaments won by each 
player. Do not include the players who did not win any tournament. Return the 
result table in any order. The query result format is in the following example:

Players table:
+-----------+-------------+
| player_id | player_name |
+-----------+-------------+
| 1         | Nadal       |
| 2         | Federer     |
| 3         | Novak       |
+-----------+-------------+

Championships table:
+------+-----------+---------+---------+---------+
| year | Wimbledon | Fr_open | US_open | Au_open |
+------+-----------+---------+---------+---------+
| 2018 | 1         | 1       | 1       | 1       |
| 2019 | 1         | 1       | 2       | 2       |
| 2020 | 2         | 1       | 2       | 2       |
+------+-----------+---------+---------+---------+

Result table:
+-----------+-------------+-------------------+
| player_id | player_name | grand_slams_count |
+-----------+-------------+-------------------+
| 2         | Federer     | 5                 |
| 1         | Nadal       | 7                 |
+-----------+-------------+-------------------+

Player 1 (Nadal) won 7 titles: Wimbledon (2018, 2019), Fr_open (2018, 2019, 
2020), US_open (2018), and Au_open (2018). Player 2 (Federer) won 5 titles: 
Wimbledon (2020), US_open (2019, 2020), and Au_open (2019, 2020). Player 3 
(Novak) did not win anything, we did not include them in the result table.*/

WITH Cte AS (
    SELECT Wimbledon AS player_id FROM Championships 
    UNION ALL
    SELECT Fr_open AS player_id FROM Championships
    UNION ALL
    SELECT US_open AS player_id FROM Championships 
    UNION ALL
    SELECT Au_open AS player_id FROM Championships
)
SELECT player_id, player_name, COUNT(*) AS grand_slams_count
FROM Cte JOIN Players USING (player_id)
GROUP BY 1


/*1789. Primary Department for Each Employee (Easy)
SQL Schema
Table: Employee
+---------------+---------+
| Column Name   |  Type   |
+---------------+---------+
| employee_id   | int     |
| department_id | int     |
| primary_flag  | varchar |
+---------------+---------+
(employee_id, department_id) is the primary key for this table. employee_id is 
the id of the employee. department_id is the id of the department to which the 
employee belongs. primary_flag is an ENUM of type ('Y', 'N'). If the flag is 
'Y', the department is the primary department for the employee. If the flag is 
'N', the department is not the primary. Employees can belong to multiple 
departments. When the employee joins other departments, they need to decide 
which department is their primary department. Note that when an employee 
belongs to only one department, their primary column is 'N'.

Write an SQL query to report all the employees with their primary department. 
For employees who belong to one department, report their only department. 
Return the result table in any order. The query result format is in the 
following example.

Employee table:
+-------------+---------------+--------------+
| employee_id | department_id | primary_flag |
+-------------+---------------+--------------+
| 1           | 1             | N            |
| 2           | 1             | Y            |
| 2           | 2             | N            |
| 3           | 3             | N            |
| 4           | 2             | N            |
| 4           | 3             | Y            |
| 4           | 4             | N            |
+-------------+---------------+--------------+

Result table:
+-------------+---------------+
| employee_id | department_id |
+-------------+---------------+
| 1           | 1             |
| 2           | 1             |
| 3           | 3             |
| 4           | 3             |
+-------------+---------------+
- The Primary department for employee 1 is 1.
- The Primary department for employee 2 is 1.
- The Primary department for employee 3 is 3.
- The Primary department for employee 4 is 3.*/

SELECT 
    employee_id, 
    department_id
FROM 
    Employee 
    JOIN (SELECT employee_id, COUNT(*) AS cnt FROM Employee GROUP BY 1) a USING (employee_id)
WHERE cnt = 1 OR primary_flag = 'Y'


/*1795. Rearrange Products Table (Easy)
SQL Schema
Table: Products
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_id  | int     |
| store1      | int     |
| store2      | int     |
| store3      | int     |
+-------------+---------+
product_id is the primary key for this table. Each row in this table indicates 
the product's price in 3 different stores: store1, store2, and store3. If the 
product is not available in a store, the price will be null in that store's 
column.

Write an SQL query to rearrange the Products table so that each row has 
(product_id, store, price). If a product is not available in a store, do not 
include a row with that product_id and store combination in the result table.
Return the result table in any order. The query result format is in the 
following example:

Products table:
+------------+--------+--------+--------+
| product_id | store1 | store2 | store3 |
+------------+--------+--------+--------+
| 0          | 95     | 100    | 105    |
| 1          | 70     | null   | 80     |
+------------+--------+--------+--------+

Result table:
+------------+--------+-------+
| product_id | store  | price |
+------------+--------+-------+
| 0          | store1 | 95    |
| 0          | store2 | 100   |
| 0          | store3 | 105   |
| 1          | store1 | 70    |
| 1          | store3 | 80    |
+------------+--------+-------+

Product 0 is available in all three stores with prices 95, 100, and 105 
respectively. Product 1 is available in store1 with price 70 and store3 with 
price 80. The product is not available in store2.*/

SELECT product_id, 'store1' AS store, store1 AS price FROM Products WHERE store1 IS NOT NULL
UNION
SELECT product_id, 'store2' AS store, store2 AS price FROM Products WHERE store2 IS NOT NULL
UNION
SELECT product_id, 'store3' AS store, store3 AS price FROM Products WHERE store3 IS NOT NULL


/*1809. Ad-Free Sessions (Easy)
SQL Schema
Table: Playback
+-------------+------+
| Column Name | Type |
+-------------+------+
| session_id  | int  |
| customer_id | int  |
| start_time  | int  |
| end_time    | int  |
+-------------+------+
session_id is the primary key for this table. customer_id is the ID of the 
customer watching this session. The session runs during the inclusive interval 
between start_time and end_time. It is guaranteed that start_time <= end_time 
and that two sessions for the same customer do not intersect.

Table: Ads
+-------------+------+
| Column Name | Type |
+-------------+------+
| ad_id       | int  |
| customer_id | int  |
| timestamp   | int  |
+-------------+------+
ad_id is the primary key for this table. customer_id is the ID of the customer 
viewing this ad. timestamp is the moment of time at which the ad was shown.

Write an SQL query to report all the sessions that did not get shown any ads.
Return the result table in any order. The query result format is in the 
following example:

Playback table:
+------------+-------------+------------+----------+
| session_id | customer_id | start_time | end_time |
+------------+-------------+------------+----------+
| 1          | 1           | 1          | 5        |
| 2          | 1           | 15         | 23       |
| 3          | 2           | 10         | 12       |
| 4          | 2           | 17         | 28       |
| 5          | 2           | 2          | 8        |
+------------+-------------+------------+----------+

Ads table:
+-------+-------------+-----------+
| ad_id | customer_id | timestamp |
+-------+-------------+-----------+
| 1     | 1           | 5         |
| 2     | 2           | 17        |
| 3     | 2           | 20        |
+-------+-------------+-----------+

Result table:
+------------+
| session_id |
+------------+
| 2          |
| 3          |
| 5          |
+------------+
The ad with ID 1 was shown to user 1 at time 5 while they were in session 1.
The ad with ID 2 was shown to user 2 at time 17 while they were in session 4.
The ad with ID 3 was shown to user 2 at time 20 while they were in session 4.
We can see that sessions 1 and 4 had at least one ad. Sessions 2, 3, and 5 did 
not have any ads, so we return them.*/

SELECT session_id
FROM 
    Playback 
    LEFT JOIN Ads 
    ON Playback.customer_id = Ads.customer_id AND timestamp BETWEEN start_time AND end_time 
WHERE Ads.customer_id IS NULL


/*1811. Find Interview Candidates (Medium)
SQL Schema
Table: Contests
+--------------+------+
| Column Name  | Type |
+--------------+------+
| contest_id   | int  |
| gold_medal   | int  |
| silver_medal | int  |
| bronze_medal | int  |
+--------------+------+
contest_id is the primary key for this table. This table contains the LeetCode 
contest ID and the user IDs of the gold, silver, and bronze medalists. It is 
guaranteed that any consecutive contests have consecutive IDs and that no ID is 
skipped.

Table: Users
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| user_id     | int     |
| mail        | varchar |
| name        | varchar |
+-------------+---------+
user_id is the primary key for this table. This table contains information 
about the users.

Write an SQL query to report the name and the mail of all interview candidates. 
A user is an interview candidate if at least one of these two conditions is 
true:
* The user won any medal in three or more consecutive contests.
* The user won the gold medal in three or more different contests (not 
  necessarily consecutive).
Return the result table in any order. The query result format is in the 
following example.

Example 1:
Input: 
Contests table:
+------------+------------+--------------+--------------+
| contest_id | gold_medal | silver_medal | bronze_medal |
+------------+------------+--------------+--------------+
| 190        | 1          | 5            | 2            |
| 191        | 2          | 3            | 5            |
| 192        | 5          | 2            | 3            |
| 193        | 1          | 3            | 5            |
| 194        | 4          | 5            | 2            |
| 195        | 4          | 2            | 1            |
| 196        | 1          | 5            | 2            |
+------------+------------+--------------+--------------+
Users table:
+---------+--------------------+-------+
| user_id | mail               | name  |
+---------+--------------------+-------+
| 1       | sarah@leetcode.com | Sarah |
| 2       | bob@leetcode.com   | Bob   |
| 3       | alice@leetcode.com | Alice |
| 4       | hercy@leetcode.com | Hercy |
| 5       | quarz@leetcode.com | Quarz |
+---------+--------------------+-------+
Output: 
+-------+--------------------+
| name  | mail               |
+-------+--------------------+
| Sarah | sarah@leetcode.com |
| Bob   | bob@leetcode.com   |
| Alice | alice@leetcode.com |
| Quarz | quarz@leetcode.com |
+-------+--------------------+
Explanation: Sarah won 3 gold medals (190, 193, and 196), so we include her in 
             the result table. Bob won a medal in 3 consecutive contests (190, 
             191, and 192), so we include him in the result table.
                 - Note that he also won a medal in 3 other consecutive 
                   contests (194, 195, and 196).
             Alice won a medal in 3 consecutive contests (191, 192, and 193), 
             so we include her in the result table. Quarz won a medal in 5 
             consecutive contests (190, 191, 192, 193, and 194), so we include 
             them in the result table.

Follow up:
* What if the first condition changed to be "any medal in n or more consecutive 
  contests"? How would you change your solution to get the interview candidates? 
  Imagine that n is the parameter of a stored procedure.
* Some users may not participate in every contest but still perform well in the 
  ones they do. How would you change your solution to only consider contests 
  where the user was a participant? Suppose the registered users for each 
  contest are given in another table.*/

WITH Cte AS (
    SELECT contest_id,   gold_medal AS user_id FROM Contests
    UNION 
    SELECT contest_id, silver_medal AS user_id FROM Contests
    UNION 
    SELECT contest_id, bronze_medal AS user_id FROM Contests
), Consecutive AS ( 
    SELECT 
        user_id, 
        contest_id, 
        ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY contest_id) AS rn
    FROM Cte
)
SELECT name, mail 
FROM (SELECT user_id FROM Consecutive GROUP BY user_id, contest_id - rn HAVING COUNT(*) >= 3
      UNION 
      SELECT gold_medal AS user_id FROM Contests GROUP BY 1 HAVING COUNT(*) >= 3) tmp 
JOIN Users USING (user_id)


/*1821. Find Customers With Positive Revenue this Year (Easy)
SQL Schema
Table: Customers
+--------------+------+
| Column Name  | Type |
+--------------+------+
| customer_id  | int  |
| year         | int  |
| revenue      | int  |
+--------------+------+
(customer_id, year) is the primary key for this table. This table contains the 
customer ID and the revenue of customers in different years. Note that this 
revenue can be negative.

Write an SQL query to report the customers with postive revenue in the year 
2021. Return the result table in any order. The query result format is in the 
following example:

Customers
+-------------+------+---------+
| customer_id | year | revenue |
+-------------+------+---------+
| 1           | 2018 | 50      |
| 1           | 2021 | 30      |
| 1           | 2020 | 70      |
| 2           | 2021 | -50     |
| 3           | 2018 | 10      |
| 3           | 2016 | 50      |
| 4           | 2021 | 20      |
+-------------+------+---------+

Result table:
+-------------+
| customer_id |
+-------------+
| 1           |
| 4           |
+-------------+

Customer 1 has revenue equal to 30 in year 2021.
Customer 2 has revenue equal to -50 in year 2021.
Customer 3 has no revenue in year 2021.
Customer 4 has revenue equal to 20 in year 2021.
Thus only customers 1 and 4 have postive revenue in year 2021.*/

SELECT 
    customer_id 
FROM Customers
WHERE year = 2021 AND revenue > 0 


/*1831. Maximum Transaction Each Day (Medium)
SQL Schema
Table: Transactions
+----------------+----------+
| Column Name    | Type     |
+----------------+----------+
| transaction_id | int      |
| day            | datetime |
| amount         | int      |
+----------------+----------+
transaction_id is the primary key for this table. Each row contains information 
about one transaction. Write an SQL query to report the IDs of the transactions 
with the maximum amount on their respective day. If in one day there are 
multiple such transactions, return all of them. Return the result table in 
ascending order by transaction_id. The query result format is in the following 
example:

Transactions table:
+----------------+--------------------+--------+
| transaction_id | day                | amount |
+----------------+--------------------+--------+
| 8              | 2021-4-3 15:57:28  | 57     |
| 9              | 2021-4-28 08:47:25 | 21     |
| 1              | 2021-4-29 13:28:30 | 58     |
| 5              | 2021-4-28 16:39:59 | 40     |
| 6              | 2021-4-29 23:39:28 | 58     |
+----------------+--------------------+--------+

Result table:
+----------------+
| transaction_id |
+----------------+
| 1              |
| 5              |
| 6              |
| 8              |
+----------------+
"2021-4-3"  --> We have one transaction with ID 8, so we add 8 to the result 
table. "2021-4-28" --> We have two transactions with IDs 5 and 9. The 
transaction with ID 5 has an amount of 40, while the transaction with ID 9 has 
an amount of 21. We only include the transaction with ID 5 as it has the 
maximum amount this day. "2021-4-29" --> We have two transactions with IDs 1 
and 6. Both transactions have the same amount of 58, so we include both in the 
result table. We order the result table by transaction_id after collecting 
these IDs.

Follow up: Could you solve it without using the MAX() function?*/

SELECT transaction_id 
FROM Transactions
WHERE (DATE(day), amount) IN (SELECT DATE(day), MAX(amount) FROM Transactions GROUP BY 1)
ORDER BY 1


/*1841. League Statistics (Medium)
SQL Schema
Table: Teams
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| team_id        | int     |
| team_name      | varchar |
+----------------+---------+
team_id is the primary key for this table. Each row contains information about 
one team in the league.

Table: Matches
+-----------------+---------+
| Column Name     | Type    |
+-----------------+---------+
| home_team_id    | int     |
| away_team_id    | int     |
| home_team_goals | int     |
| away_team_goals | int     |
+-----------------+---------+
(home_team_id, away_team_id) is the primary key for this table. Each row 
contains information about one match. home_team_goals is the number of goals 
scored by the home team. away_team_goals is the number of goals scored by the 
away team. The winner of the match is the team with the higher number of goals.

Write an SQL query to report the statistics of the league. The statistics 
should be built using the played matches where the winning team gets three 
points and the losing team gets no points. If a match ends with a draw, both 
teams get one point. Each row of the result table should contain:
* team_name - The name of the team in the Teams table.
* matches_played - The number of matches played as either a home or away team.
* points - The total points the team has so far.
* goal_for - The total number of goals scored by the team across all matches.
* goal_against - The total number of goals scored by opponent teams against 
  this team across all matches.
* goal_diff - The result of goal_for - goal_against.
Return the result table in descending order by points. If two or more teams 
have the same points, order them in descending order by goal_diff. If there is 
still a tie, order them by team_name in lexicographical order.

The query result format is in the following example:

Teams table:
+---------+-----------+
| team_id | team_name |
+---------+-----------+
| 1       | Ajax      |
| 4       | Dortmund  |
| 6       | Arsenal   |
+---------+-----------+

Matches table:
+--------------+--------------+-----------------+-----------------+
| home_team_id | away_team_id | home_team_goals | away_team_goals |
+--------------+--------------+-----------------+-----------------+
| 1            | 4            | 0               | 1               |
| 1            | 6            | 3               | 3               |
| 4            | 1            | 5               | 2               |
| 6            | 1            | 0               | 0               |
+--------------+--------------+-----------------+-----------------+

Result table:
+-----------+----------------+--------+----------+--------------+-----------+
| team_name | matches_played | points | goal_for | goal_against | goal_diff |
+-----------+----------------+--------+----------+--------------+-----------+
| Dortmund  | 2              | 6      | 6        | 2            | 4         |
| Arsenal   | 2              | 2      | 3        | 3            | 0         |
| Ajax      | 4              | 2      | 5        | 9            | -4        |
+-----------+----------------+--------+----------+--------------+-----------+

Ajax (team_id=1) played 4 matches: 2 losses and 2 draws. Total points = 0 + 0 + 1 + 1 = 2.
Dortmund (team_id=4) played 2 matches: 2 wins. Total points = 3 + 3 = 6.
Arsenal (team_id=6) played 2 matches: 2 draws. Total points = 1 + 1 = 2.
Dortmund is the first team in the table. Ajax and Arsenal have the same points, 
but since Arsenal has a higher goal_diff than Ajax, Arsenal comes before Ajax 
in the table.*/

SELECT 
    team_name, 
    COUNT(*) AS matches_played, 
    SUM(CASE WHEN goal_for > goal_against THEN 3 WHEN goal_for = goal_against THEN 1 ELSE 0 END) AS points, 
    SUM(goal_for) AS goal_for, 
    SUM(goal_against) AS goal_against, 
    SUM(goal_for - goal_against) AS goal_diff
FROM (SELECT home_team_id AS team_id, home_team_goals AS goal_for, away_team_goals AS goal_against FROM Matches 
      UNION ALL 
      SELECT away_team_id AS team_id, away_team_goals AS goal_for, home_team_goals AS goal_against FROM Matches) a 
    JOIN Teams USING (team_id)
GROUP BY 1
ORDER BY 3 DESC, 6 DESC, 1


/*1843. Suspicious Bank Accounts (Medium)
SQL Schema
Table: Accounts
+----------------+------+
| Column Name    | Type |
+----------------+------+
| account_id     | int  |
| max_income     | int  |
+----------------+------+
account_id is the primary key for this table. Each row contains information 
about the maximum monthly income for one bank account.

Table: Transactions
+----------------+----------+
| Column Name    | Type     |
+----------------+----------+
| transaction_id | int      |
| account_id     | int      |
| type           | ENUM     |
| amount         | int      |
| day            | datetime |
+----------------+----------+
transaction_id is the primary key for this table. Each row contains information 
about one transaction. type is ENUM ('Creditor','Debtor') where 'Creditor' 
means the user deposited money into their account and 'Debtor' means the user 
withdrew money from their account. amount is the amount of money 
deposited/withdrawn during the transaction. A bank account is suspicious if the 
total income exceeds the max_income for this account for two or more 
consecutive months. The total income of an account in some month is the sum of 
all its deposits in that month (i.e., transactions of the type 'Creditor'). 
Write an SQL query to report the IDs of all suspicious bank accounts. Return 
the result table ordered by transaction_id in ascending order. The query result 
format is in the following example.

Example 1:
Input: 
Accounts table:
+------------+------------+
| account_id | max_income |
+------------+------------+
| 3          | 21000      |
| 4          | 10400      |
+------------+------------+
Transactions table:
+----------------+------------+----------+--------+---------------------+
| transaction_id | account_id | type     | amount | day                 |
+----------------+------------+----------+--------+---------------------+
| 2              | 3          | Creditor | 107100 | 2021-06-02 11:38:14 |
| 4              | 4          | Creditor | 10400  | 2021-06-20 12:39:18 |
| 11             | 4          | Debtor   | 58800  | 2021-07-23 12:41:55 |
| 1              | 4          | Creditor | 49300  | 2021-05-03 16:11:04 |
| 15             | 3          | Debtor   | 75500  | 2021-05-23 14:40:20 |
| 10             | 3          | Creditor | 102100 | 2021-06-15 10:37:16 |
| 14             | 4          | Creditor | 56300  | 2021-07-21 12:12:25 |
| 19             | 4          | Debtor   | 101100 | 2021-05-09 15:21:49 |
| 8              | 3          | Creditor | 64900  | 2021-07-26 15:09:56 |
| 7              | 3          | Creditor | 90900  | 2021-06-14 11:23:07 |
+----------------+------------+----------+--------+---------------------+
Output: 
+------------+
| account_id |
+------------+
| 3          |
+------------+
Explanation: For account 3:
             - In 6-2021, the user had an income of 
               107100 + 102100 + 90900 = 300100.
             - In 7-2021, the user had an income of 64900.
             We can see that the income exceeded the max income of 21000 for 
             two consecutive months, so we include 3 in the result table.
             
             For account 4:
             - In 5-2021, the user had an income of 49300.
             - In 6-2021, the user had an income of 10400.
             - In 7-2021, the user had an income of 56300.
             We can see that the income exceeded the max income in May and July, 
             but not in June. Since the account did not exceed the max income 
             for two consecutive months, we do not include it in the result 
             table.*/

WITH Cte AS (
    SELECT 
        account_id, 
        DATE_FORMAT(day, '%Y%m') AS date, 
        SUM(amount) AS income, 
        max_income
    FROM Transactions JOIN Accounts USING (account_id)
    WHERE type = 'Creditor'
    GROUP BY 1, 2
    HAVING SUM(amount) > max_income
)
SELECT a.account_id
FROM Cte a 
    JOIN Cte b ON a.account_id = b.account_id AND PERIOD_DIFF(a.date, b.date) = 1
GROUP BY 1
ORDER BY 1


/*1853. Convert Date Format (Easy)
SQL Schema
Table: Days
+-------------+------+
| Column Name | Type |
+-------------+------+
| day         | date |
+-------------+------+
day is the primary key for this table. 

Write an SQL query to convert each date in Days into a string formatted as 
"day_name, month_name day, year". Return the result table in any order.
The query result format is in the following example:

Days table:
+------------+
| day        |
+------------+
| 2022-04-12 |
| 2021-08-09 |
| 2020-06-26 |
+------------+

Result table:
+-------------------------+
| day                     |
+-------------------------+
| Tuesday, April 12, 2022 |
| Monday, August 9, 2021  |
| Friday, June 26, 2020   |
+-------------------------+
Please note that the output is case-sensitive.*/

SELECT DATE_FORMAT(day, "%W, %M %e, %Y") AS day
FROM Days


/*1873. Calculate Special Bonus (Easy)
SQL Schema
Table: Employees
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| employee_id | int     |
| name        | varchar |
| salary      | int     |
+-------------+---------+
employee_id is the primary key for this table. Each row of this table indicates 
the employee ID, employee name, and salary.

Write an SQL query to calculate the bonus of each employee. The bonus of an 
employee is 100% of their salary if the ID of the employee is an odd number and 
the employee name does not start with the character 'M'. The bonus of an 
employee is 0 otherwise. Return the result table ordered by employee_id. The 
query result format is in the following example:

Employees table:
+-------------+---------+--------+
| employee_id | name    | salary |
+-------------+---------+--------+
| 2           | Meir    | 3000   |
| 3           | Michael | 3800   |
| 7           | Addilyn | 7400   |
| 8           | Juan    | 6100   |
| 9           | Kannon  | 7700   |
+-------------+---------+--------+

Result table:
+-------------+-------+
| employee_id | bonus |
+-------------+-------+
| 2           | 0     |
| 3           | 0     |
| 7           | 7400  |
| 8           | 0     |
| 9           | 7700  |
+-------------+-------+

The employees with IDs 2 and 8 get 0 bonus because they have an even 
employee_id. The employee with ID 3 gets 0 bonus because their name starts with 
'M'. The rest of the employees get a 100% bonus.*/

SELECT 
    employee_id, 
    IF(employee_id % 2 = 1 AND name NOT LIKE 'M%', salary, 0) AS bonus
FROM Employees


/*1875. Group Employees of the Same Salary (Medium)
SQL Schema
Table: Employees
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| employee_id | int     |
| name        | varchar |
| salary      | int     |
+-------------+---------+
employee_id is the primary key for this table. Each row of this table indicates 
the employee ID, employee name, and salary. A company wants to divide the 
employees into teams such that all the members on each team have the same 
salary. The teams should follow these criteria:
* Each team should consist of at least two employees.
* All the employees on a team should have the same salary.
* All the employees of the same salary should be assigned to the same team.
* If the salary of an employee is unique, we do not assign this employee to any 
  team.
* A team's ID is assigned based on the rank of the team's salary relative to 
  the other teams' salaries, where the team with the lowest salary has 
  team_id = 1. Note that the salaries for employees not on a team are not 
  included in this ranking.

Write an SQL query to get the team_id of each employee that is in a team. 
Return the result table ordered by team_id in ascending order. In case of a tie, 
order it by employee_id in ascending order. The query result format is in the 
following example:

Employees table:
+-------------+---------+--------+
| employee_id | name    | salary |
+-------------+---------+--------+
| 2           | Meir    | 3000   |
| 3           | Michael | 3000   |
| 7           | Addilyn | 7400   |
| 8           | Juan    | 6100   |
| 9           | Kannon  | 7400   |
+-------------+---------+--------+

Result table:
+-------------+---------+--------+---------+
| employee_id | name    | salary | team_id |
+-------------+---------+--------+---------+
| 2           | Meir    | 3000   | 1       |
| 3           | Michael | 3000   | 1       |
| 7           | Addilyn | 7400   | 2       |
| 9           | Kannon  | 7400   | 2       |
+-------------+---------+--------+---------+

Meir (employee_id=2) and Michael (employee_id=3) are in the same team because 
they have the same salary of 3000. Addilyn (employee_id=7) and Kannon 
(employee_id=9) are in the same team because they have the same salary of 7400.
Juan (employee_id=8) is not included in any team because their salary of 6100 
is unique (i.e. no other employee has the same salary). The team IDs are 
assigned as follows (based on salary ranking, lowest first):
- team_id=1: Meir and Michael, salary of 3000
- team_id=2: Addilyn and Kannon, salary of 7400
Juan's salary of 6100 is not included in the ranking because they are not on a team.*/

SELECT employee_id, name, salary, team_id
FROM Employees as d1
    JOIN (SELECT salary, ROW_NUMBER() OVER(ORDER BY salary ASC) as team_id 
          FROM Employees 
          GROUP BY salary 
          HAVING COUNT(employee_id) > 1) a USING (salary)
ORDER BY 4,1;


/*1890. The Latest Login in 2020 (Easy)
SQL Schema
Table: Logins
+----------------+----------+
| Column Name    | Type     |
+----------------+----------+
| user_id        | int      |
| time_stamp     | datetime |
+----------------+----------+
(user_id, time_stamp) is the primary key for this table. Each row contains 
information about the login time for the user with ID user_id.

Write an SQL query to report the latest login for all users in the year 2020. 
Do not include the users who did not login in 2020. Return the result table in 
any order. The query result format is in the following example:

Logins table:
+---------+---------------------+
| user_id | time_stamp          |
+---------+---------------------+
| 6       | 2020-06-30 15:06:07 |
| 6       | 2021-04-21 14:06:06 |
| 6       | 2019-03-07 00:18:15 |
| 8       | 2020-02-01 05:10:53 |
| 8       | 2020-12-30 00:46:50 |
| 2       | 2020-01-16 02:49:50 |
| 2       | 2019-08-25 07:59:08 |
| 14      | 2019-07-14 09:00:00 |
| 14      | 2021-01-06 11:59:59 |
+---------+---------------------+

Result table:
+---------+---------------------+
| user_id | last_stamp          |
+---------+---------------------+
| 6       | 2020-06-30 15:06:07 |
| 8       | 2020-12-30 00:46:50 |
| 2       | 2020-01-16 02:49:50 |
+---------+---------------------+

User 6 logged into their account 3 times but only once in 2020, so we include 
this login in the result table. User 8 logged into their account 2 times in 
2020, once in February and once in December. We include only the latest one 
(December) in the result table. User 2 logged into their account 2 times but 
only once in 2020, so we include this login in the result table. User 14 did 
not login in 2020, so we do not include them in the result table.*/

SELECT 
    user_id, 
    MAX(time_stamp) AS last_stamp
FROM Logins
WHERE YEAR(time_stamp) = 2020
GROUP BY user_id


/*1907. Count Salary Categories (Medium)
SQL Schema
Table: Accounts
+-------------+------+
| Column Name | Type |
+-------------+------+
| account_id  | int  |
| income      | int  |
+-------------+------+
account_id is the primary key for this table. Each row contains information 
about the monthly income for one bank account.

Write an SQL query to report the number of bank accounts of each salary 
category. The salary categories are:
* "Low Salary": All the salaries strictly less than $20000.
* "Average Salary": All the salaries in the inclusive range [$20000, $50000].
* "High Salary": All the salaries strictly greater than $50000.
The result table must contain all three categories. If there are no accounts in 
a category, then report 0. Return the result table in any order. The query 
result format is in the following example.

Accounts table:
+------------+--------+
| account_id | income |
+------------+--------+
| 3          | 108939 |
| 2          | 12747  |
| 8          | 87709  |
| 6          | 91796  |
+------------+--------+

Result table:
+----------------+----------------+
| category       | accounts_count |
+----------------+----------------+
| Low Salary     | 1              |
| Average Salary | 0              |
| High Salary    | 3              |
+----------------+----------------+

Low Salary: Account 2.
Average Salary: No accounts.
High Salary: Accounts 3, 6, and 8.*/

SELECT "Low Salary" As category, COUNT(*) AS accounts_count FROM Accounts WHERE income < 20000
UNION 
SELECT "Average Salary" AS category, COUNT(*) AS accounts_count FROM Accounts WHERE 20000 <= income AND income <= 50000
UNION
SELECT "High Salary" AS category, COUNT(*) AS accounts_count FROM Accounts WHERE 50000 < income


/*1934. Confirmation Rate (Medium)
SQL Schema
Table: Signups
+----------------+----------+
| Column Name    | Type     |
+----------------+----------+
| user_id        | int      |
| time_stamp     | datetime |
+----------------+----------+
user_id is the primary key for this table. Each row contains information about 
the signup time for the user with ID user_id.

Table: Confirmations
+----------------+----------+
| Column Name    | Type     |
+----------------+----------+
| user_id        | int      |
| time_stamp     | datetime |
| action         | ENUM     |
+----------------+----------+
(user_id, time_stamp) is the primary key for this table. user_id is a foreign 
key with a reference to the Signups table. action is an ENUM of the type 
('confirmed', 'timeout') Each row of this table indicates that the user with ID 
user_id requested a confirmation message at time_stamp and that confirmation 
message was either confirmed ('confirmed') or expired without confirming 
('timeout'). The confirmation rate of a user is the number of 'confirmed' 
messages divided by the total number of requested confirmation messages. The 
confirmation rate of a user that did not request any confirmation messages is 0. 
Round the confirmation rate to two decimal places. Write an SQL query to find 
the confirmation rate of each user. Return the result table in any order. The 
query result format is in the following example:

Signups table:
+---------+---------------------+
| user_id | time_stamp          |
+---------+---------------------+
| 3       | 2020-03-21 10:16:13 |
| 7       | 2020-01-04 13:57:59 |
| 2       | 2020-07-29 23:09:44 |
| 6       | 2020-12-09 10:39:37 |
+---------+---------------------+

Confirmations table:
+---------+---------------------+-----------+
| user_id | time_stamp          | action    |
+---------+---------------------+-----------+
| 3       | 2021-01-06 03:30:46 | timeout   |
| 3       | 2021-07-14 14:00:00 | timeout   |
| 7       | 2021-06-12 11:57:29 | confirmed |
| 7       | 2021-06-13 12:58:28 | confirmed |
| 7       | 2021-06-14 13:59:27 | confirmed |
| 2       | 2021-01-22 00:00:00 | confirmed |
| 2       | 2021-02-28 23:59:59 | timeout   |
+---------+---------------------+-----------+

Result table
+---------+-------------------+
| user_id | confirmation_rate |
+---------+-------------------+
| 6       | 0.00              |
| 3       | 0.00              |
| 7       | 1.00              |
| 2       | 0.50              |
+---------+-------------------+

User 6 did not request any confirmation messages. The confirmation rate is 0.
User 3 made 2 requests and both timed out. The confirmation rate is 0. User 7 
made 3 requests and all were confirmed. The confirmation rate is 1. User 2 made 
2 requests where one was confirmed and the other timed out. The confirmation 
rate is 1 / 2 = 0.5.*/

SELECT 
    user_id,
    ROUND(AVG(IF(action = 'confirmed', 1, 0)), 2) AS confirmation_rate
FROM Signups LEFT JOIN Confirmations USING (user_id)
GROUP BY 1
ORDER BY 1


/*1939. Users That Actively Request Confirmation Messages (Easy)
SQL Schema
Table: Signups
+----------------+----------+
| Column Name    | Type     |
+----------------+----------+
| user_id        | int      |
| time_stamp     | datetime |
+----------------+----------+
user_id is the primary key for this table. Each row contains information about 
the signup time for the user with ID user_id.

Table: Confirmations
+----------------+----------+
| Column Name    | Type     |
+----------------+----------+
| user_id        | int      |
| time_stamp     | datetime |
| action         | ENUM     |
+----------------+----------+
(user_id, time_stamp) is the primary key for this table. user_id is a foreign 
key with a reference to the Signups table. action is an ENUM of the type 
('confirmed', 'timeout') Each row of this table indicates that the user with ID 
user_id requested a confirmation message at time_stamp and that confirmation 
message was either confirmed ('confirmed') or expired without confirming 
('timeout').

Write an SQL query to find the IDs of the users that requested a confirmation 
message twice within a 24-hour window. Two messages exactly 24 hours apart are 
considered to be within the window. The action does not affect the answer, only 
the request time. Return the result table in any order. The query result format 
is in the following example:

Signups table:
+---------+---------------------+
| user_id | time_stamp          |
+---------+---------------------+
| 3       | 2020-03-21 10:16:13 |
| 7       | 2020-01-04 13:57:59 |
| 2       | 2020-07-29 23:09:44 |
| 6       | 2020-12-09 10:39:37 |
+---------+---------------------+

Confirmations table:
+---------+---------------------+-----------+
| user_id | time_stamp          | action    |
+---------+---------------------+-----------+
| 3       | 2021-01-06 03:30:46 | timeout   |
| 3       | 2021-01-06 03:37:45 | timeout   |
| 7       | 2021-06-12 11:57:29 | confirmed |
| 7       | 2021-06-13 11:57:30 | confirmed |
| 2       | 2021-01-22 00:00:00 | confirmed |
| 2       | 2021-01-23 00:00:00 | timeout   |
| 6       | 2021-10-23 14:14:14 | confirmed |
| 6       | 2021-10-24 14:14:13 | timeout   |
+---------+---------------------+-----------+

Result table
+---------+
| user_id |
+---------+
| 2       |
| 3       |
| 6       |
+---------+

User 2 requested two messages within exactly 24 hours of each other, so we 
include them. User 3 requested two messages within 6 minutes and 59 seconds of 
each other, so we include them. User 6 requested two messages within 23 hours, 
59 minutes, and 59 seconds of each other, so we include them. User 7 requested 
two messages within 24 hours and 1 second of each other, so we exclude them 
from the answer.*/

SELECT DISTINCT a.user_id
FROM Confirmations a, Confirmations b
WHERE
    a.user_id = b.user_id 
    AND a.time_stamp < b.time_stamp 
    AND TIMESTAMPDIFF(SECOND, a.time_stamp, b.time_stamp) <= 86400


/*1949. Strong Friendship (Medium)
SQL Schema
Table: Friendship
+-------------+------+
| Column Name | Type |
+-------------+------+
| user1_id    | int  |
| user2_id    | int  |
+-------------+------+
(user1_id, user2_id) is the primary key for this table. Each row of this table 
indicates that the users user1_id and user2_id are friends. Note that 
user1_id < user2_id. A friendship between a pair of friends x and y is strong 
if x and y have at least three common friends.

Write an SQL query to find all the strong friendships. Note that the result 
table should not contain duplicates with user1_id < user2_id. Return the result 
table in any order. The query result format is in the following example:

Friendship table:
+----------+----------+
| user1_id | user2_id |
+----------+----------+
| 1        | 2        |
| 1        | 3        |
| 2        | 3        |
| 1        | 4        |
| 2        | 4        |
| 1        | 5        |
| 2        | 5        |
| 1        | 7        |
| 3        | 7        |
| 1        | 6        |
| 3        | 6        |
| 2        | 6        |
+----------+----------+

Result table:
+----------+----------+---------------+
| user1_id | user2_id | common_friend |
+----------+----------+---------------+
| 1        | 2        | 4             |
| 1        | 3        | 3             |
+----------+----------+---------------+
Users 1 and 2 have 4 common friends (3, 4, 5, and 6). Users 1 and 3 have 3 
common friends (2, 6, and 7). We did not include the friendship of users 2 and 
3 because they only have two common friends (1 and 6).*/

WITH Cte AS (
    SELECT user1_id, user2_id FROM Friendship 
    UNION
    SELECT user2_id AS user1_id, user1_id AS user2_id FROM Friendship
)
SELECT a.user1_id AS user1_id, b.user2_id AS user2_id, COUNT(*) AS common_friend
FROM 
    Cte a 
    JOIN Cte b ON a.user2_id = b.user1_id AND a.user1_id < b.user2_id
    JOIN Friendship c ON a.user1_id = c.user1_id AND b.user2_id = c.user2_id
GROUP BY 1, 2
HAVING COUNT(*) >= 3


/*1951. All the Pairs With the Maximum Number of Common Followers (Medium)
SQL Schema
Table: Relations
+-------------+------+
| Column Name | Type |
+-------------+------+
| user_id     | int  |
| follower_id | int  |
+-------------+------+
(user_id, follower_id) is the primary key for this table. Each row of this 
table indicates that the user with ID follower_id is following the user with ID 
user_id.

Write an SQL query to find all the pairs of users with the maximum number of 
common followers. In other words, if the maximum number of common followers 
between any two users is maxCommon, then you have to return all pairs of users 
that have maxCommon common followers. The result table should contain the pairs 
user1_id and user2_id where user1_id < user2_id. Return the result table in any 
order. 

The query result format is in the following example:

Relations table:
+---------+-------------+
| user_id | follower_id |
+---------+-------------+
| 1       | 3           |
| 2       | 3           |
| 7       | 3           |
| 1       | 4           |
| 2       | 4           |
| 7       | 4           |
| 1       | 5           |
| 2       | 6           |
| 7       | 5           |
+---------+-------------+

Result table:
+----------+----------+
| user1_id | user2_id |
+----------+----------+
| 1        | 7        |
+----------+----------+

Users 1 and 2 have 2 common followers (3 and 4). Users 1 and 7 have 3 common 
followers (3, 4, and 5). Users 2 and 7 have 2 common followers (3 and 4). Since 
the maximum number of common followers between any two users is 3, we return 
all pairs of users with 3 common followers, which is only the pair (1, 7). We 
return the pair as (1, 7), not as (7, 1). Note that we do not have any 
information about the users that follow users 3, 4, and 5, so we consider them 
to have 0 followers.*/

SELECT user1_id, user2_id
FROM (SELECT 
          a.user_id as user1_id, 
          b.user_id as user2_id, 
          DENSE_RANK() OVER(ORDER BY COUNT(a.follower_id) DESC) AS rnk
      FROM Relations a, Relations b 
      WHERE a.user_id < b.user_id AND a.follower_id = b.follower_id 
      GROUP BY a.user_id, b.user_id) c
WHERE rnk = 1


/*1965. Employees With Missing Information (Easy)
SQL Schema
Table: Employees
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| employee_id | int     |
| name        | varchar |
+-------------+---------+
employee_id is the primary key for this table. Each row of this table indicates 
the name of the employee whose ID is employee_id.

Table: Salaries
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| employee_id | int     |
| salary      | int     |
+-------------+---------+
employee_id is the primary key for this table. Each row of this table indicates 
the salary of the employee whose ID is employee_id. 

Write an SQL query to report the IDs of all the employees with missing 
information. The information of an employee is missing if:
* The employee's name is missing, or
* The employee's salary is missing.
Return the result table ordered by employee_id in ascending order. The query 
result format is in the following example:

Employees table:
+-------------+----------+
| employee_id | name     |
+-------------+----------+
| 2           | Crew     |
| 4           | Haven    |
| 5           | Kristian |
+-------------+----------+
Salaries table:
+-------------+--------+
| employee_id | salary |
+-------------+--------+
| 5           | 76071  |
| 1           | 22517  |
| 4           | 63539  |
+-------------+--------+

Result table:
+-------------+
| employee_id |
+-------------+
| 1           |
| 2           |
+-------------+

Employees 1, 2, 4, and 5 are working at this company. The name of employee 1 is 
missing. The salary of employee 2 is missing.*/

SELECT employee_id FROM Employees WHERE employee_id NOT IN (SELECT employee_id FROM Salaries)
UNION 
SELECT employee_id FROM Salaries WHERE employee_id NOT IN (SELECT employee_id FROM Employees)
ORDER BY 1


/*1978. Employees Whose Manager Left the Company (Easy)
SQL Schema
Table: Employees
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| employee_id | int      |
| name        | varchar  |
| manager_id  | int      |
| salary      | int      |
+-------------+----------+
employee_id is the primary key for this table. This table contains information 
about the employees, their salary, and the ID of their manager. Some employees 
do not have a manager (manager_id is null). 

Write an SQL query to report the IDs of the employees whose salary is strictly 
less than $30000 and whose manager left the company. When a manager leaves the 
company, their information is deleted from the Employees table, but the reports 
still have their manager_id set to the manager that left. Return the result 
table ordered by employee_id.

The query result format is in the following example.

Example 1:
Input:  
Employees table:
+-------------+-----------+------------+--------+
| employee_id | name      | manager_id | salary |
+-------------+-----------+------------+--------+
| 3           | Mila      | 9          | 60301  |
| 12          | Antonella | null       | 31000  |
| 13          | Emery     | null       | 67084  |
| 1           | Kalel     | 11         | 21241  |
| 9           | Mikaela   | null       | 50937  |
| 11          | Joziah    | 6          | 28485  |
+-------------+-----------+------------+--------+
Output: 
+-------------+
| employee_id |
+-------------+
| 11          |
+-------------+

Explanation: The employees with a salary less than $30000 are 1 (Kalel) and 11 
(Joziah). Kalel's manager is employee 11, who is still in the company (Joziah).
Joziah's manager is employee 6, who left the company because there is no row 
for employee 6 as it was deleted.*/

SELECT employee_id
FROM Employees
WHERE 
    salary < 30000 
    AND manager_id NOT IN (SELECT employee_id FROM Employees)
ORDER BY 1


/*1988. Find Cutoff Score for Each School (Medium)
SQL Schema
Table: Schools
+-------------+------+
| Column Name | Type |
+-------------+------+
| school_id   | int  |
| capacity    | int  |
+-------------+------+
school_id is the primary key for this table. This table contains information 
about the capacity of some schools. The capacity is the maximum number of 
students the school can accept.

Table: Exam
+---------------+------+
| Column Name   | Type |
+---------------+------+
| score         | int  |
| student_count | int  |
+---------------+------+
score is the primary key for this table. Each row in this table indicates that 
there are student_count students that got at least score points in the exam.
The data in this table will be logically correct, meaning a row recording a 
higher score will have the same or smaller student_count compared to a row 
recording a lower score. More formally, for every two rows i and j in the table, 
if scorei > scorej then student_counti <= student_countj. Every year, each 
school announces a minimum score requirement that a student needs to apply to 
it. The school chooses the minimum score requirement based on the exam results 
of all the students:
* They want to ensure that even if every student meeting the requirement 
  applies, the school can accept everyone.
* They also want to maximize the possible number of students that can apply.
* They must use a score that is in the Exam table.
Write an SQL query to report the minimum score requirement for each school. If 
there are multiple score values satisfying the above conditions, choose the 
smallest one. If the input data is not enough to determine the score, report -1.

Return the result table in any order. The query result format is in the 
following example.

Example 1:
Input:
Schools table:
+-----------+----------+
| school_id | capacity |
+-----------+----------+
| 11        | 151      |
| 5         | 48       |
| 9         | 9        |
| 10        | 99       |
+-----------+----------+
Exam table:
+-------+---------------+
| score | student_count |
+-------+---------------+
| 975   | 10            |
| 966   | 60            |
| 844   | 76            |
| 749   | 76            |
| 744   | 100           |
+-------+---------------+
Output:
+-----------+-------+
| school_id | score |
+-----------+-------+
| 5         | 975   |
| 9         | -1    |
| 10        | 749   |
| 11        | 744   |
+-----------+-------+
Explanation: 
- School 5: The school's capacity is 48. Choosing 975 as the min score 
  requirement, the school will get at most 10 applications, which is within 
  capacity.
- School 10: The school's capacity is 99. Choosing 844 or 749 as the min score 
  requirement, the school will get at most 76 applications, which is within 
  capacity. We choose the smallest of them, which is 749.
- School 11: The school's capacity is 151. Choosing 744 as the min score 
  requirement, the school will get at most 100 applications, which is within 
  capacity.
- School 9: The data given is not enough to determine the min score requirement. 
  Choosing 975 as the min score, the school may get 10 requests while its 
  capacity is 9. We do not have information about higher scores, hence we 
  report -1.*/

SELECT school_id, IFNULL(MIN(score), -1) AS score
FROM Schools LEFT JOIN Exam ON capacity >= student_count
GROUP BY 1


/*1990. Count the Number of Experiments (Easy)
SQL Schema
Table: Experiments
+-----------------+------+
| Column Name     | Type |
+-----------------+------+
| experiment_id   | int  |
| platform        | enum |
| experiment_name | enum |
+-----------------+------+
experiment_id is the primary key for this table. platform is an enum with one 
of the values ('Android', 'IOS', 'Web'). experiment_name is an enum with one of 
the values ('Reading', 'Sports', 'Programming'). This table contains 
information about the ID of an experiment done with a random person, the 
platform used to do the experiment, and the name of the experiment.

Write an SQL query to report the number of experiments done on each of the 
three platforms for each of the three given experiments. Notice that all the 
pairs of (platform, experiment) should be included in the output including the 
pairs with zero experiments. Return the result table in any order.

The query result format is in the following example.

Example 1:
Input:
Experiments table:
+---------------+----------+-----------------+
| experiment_id | platform | experiment_name |
+---------------+----------+-----------------+
| 4             | IOS      | Programming     |
| 13            | IOS      | Sports          |
| 14            | Android  | Reading         |
| 8             | Web      | Reading         |
| 12            | Web      | Reading         |
| 18            | Web      | Programming     |
+---------------+----------+-----------------+
Output: 
+----------+-----------------+-----------------+
| platform | experiment_name | num_experiments |
+----------+-----------------+-----------------+
| Android  | Reading         | 1               |
| Android  | Sports          | 0               |
| Android  | Programming     | 0               |
| IOS      | Reading         | 0               |
| IOS      | Sports          | 1               |
| IOS      | Programming     | 1               |
| Web      | Reading         | 2               |
| Web      | Sports          | 0               |
| Web      | Programming     | 1               |
+----------+-----------------+-----------------+
Explanation: 
On the platform "Android", we had only one "Reading" experiment.
On the platform "IOS", we had one "Sports" experiment and one "Programming" experiment.
On the platform "Web", we had two "Reading" experiments and one "Programming" experiment.*/

SELECT 
    platform, 
    experiment_name, 
    IFNULL(num_experiments, 0) AS num_experiments
FROM 
    (SELECT "Android" AS platform
     UNION
     SELECT "IOS" AS platform
     UNION
     SELECT "Web" AS platform) a 
    CROSS JOIN (SELECT "Reading" AS experiment_name
                UNION 
                SELECT "Sports" AS experiment_name
                UNION
                SELECT "Programming" AS experiment_name) b
    LEFT JOIN (SELECT platform, experiment_name, COUNT(*) AS num_experiments 
               FROM Experiments 
               GROUP BY 1, 2) c
    USING (platform, experiment_name)
ORDER BY 1, 2


/*2020. Number of Accounts That Did Not Stream (Medium)
SQL Schema
Table: Subscriptions
+-------------+------+
| Column Name | Type |
+-------------+------+
| account_id  | int  |
| start_date  | date |
| end_date    | date |
+-------------+------+
account_id is the primary key column for this table. Each row of this table 
indicates the start and end dates of an account's subscription. Note that 
always start_date < end_date.

Table: Streams
+-------------+------+
| Column Name | Type |
+-------------+------+
| session_id  | int  |
| account_id  | int  |
| stream_date | date |
+-------------+------+
session_id is the primary key column for this table. account_id is a foreign 
key from the Subscriptions table. Each row of this table contains information 
about the account and the date associated with a stream session. Write an SQL 
query to report the number of accounts that bought a subscription in 2021 but 
did not have any stream session. The query result format is in the following 
example.

Example 1:
Input: 
Subscriptions table:
+------------+------------+------------+
| account_id | start_date | end_date   |
+------------+------------+------------+
| 9          | 2020-02-18 | 2021-10-30 |
| 3          | 2021-09-21 | 2021-11-13 |
| 11         | 2020-02-28 | 2020-08-18 |
| 13         | 2021-04-20 | 2021-09-22 |
| 4          | 2020-10-26 | 2021-05-08 |
| 5          | 2020-09-11 | 2021-01-17 |
+------------+------------+------------+
Streams table:
+------------+------------+-------------+
| session_id | account_id | stream_date |
+------------+------------+-------------+
| 14         | 9          | 2020-05-16  |
| 16         | 3          | 2021-10-27  |
| 18         | 11         | 2020-04-29  |
| 17         | 13         | 2021-08-08  |
| 19         | 4          | 2020-12-31  |
| 13         | 5          | 2021-01-05  |
+------------+------------+-------------+
Output: 
+----------------+
| accounts_count |
+----------------+
| 2              |
+----------------+
Explanation: Users 4 and 9 did not stream in 2021. User 11 did not subscribe in 
             2021.*/

SELECT COUNT(*) AS accounts_count
FROM Subscriptions JOIN Streams USING (account_id)
WHERE YEAR(end_date) = 2021 AND YEAR(stream_date) <> 2021


/*2026. Low-Quality Problems (Easy)
SQL Schema
Table: Problems
+-------------+------+
| Column Name | Type |
+-------------+------+
| problem_id  | int  |
| likes       | int  |
| dislikes    | int  |
+-------------+------+
problem_id is the primary key column for this table. Each row of this table 
indicates the number of likes and dislikes for a LeetCode problem. Write an 
SQL query to report the IDs of the low-quality problems. A LeetCode problem is 
low-quality if the like percentage of the problem (number of likes divided by 
the total number of votes) is strictly less than 60%. Return the result table 
ordered by problem_id in ascending order. The query result format is in the 
following example.

Example 1:
Input: 
Problems table:
+------------+-------+----------+
| problem_id | likes | dislikes |
+------------+-------+----------+
| 6          | 1290  | 425      |
| 11         | 2677  | 8659     |
| 1          | 4446  | 2760     |
| 7          | 8569  | 6086     |
| 13         | 2050  | 4164     |
| 10         | 9002  | 7446     |
+------------+-------+----------+
Output: 
+------------+
| problem_id |
+------------+
| 7          |
| 10         |
| 11         |
| 13         |
+------------+
Explanation: The like percentages are as follows:
- Problem 1: (4446 / (4446 + 2760)) * 100 = 61.69858%
- Problem 6: (1290 / (1290 + 425)) * 100 = 75.21866%
- Problem 7: (8569 / (8569 + 6086)) * 100 = 58.47151%
- Problem 10: (9002 / (9002 + 7446)) * 100 = 54.73006%
- Problem 11: (2677 / (2677 + 8659)) * 100 = 23.61503%
- Problem 13: (2050 / (2050 + 4164)) * 100 = 32.99002%
Problems 7, 10, 11, and 13 are low-quality problems because their like 
percentages are less than 60%.*/

SELECT problem_id
FROM Problems
WHERE likes/(likes + dislikes) < 0.6
ORDER BY 1


/*2041. Accepted Candidates From the Interviews (Medium)
SQL Schema
Table: Candidates
+--------------+----------+
| Column Name  | Type     |
+--------------+----------+
| candidate_id | int      |
| name         | varchar  |
| years_of_exp | int      |
| interview_id | int      |
+--------------+----------+
candidate_id is the primary key column for this table. Each row of this table 
indicates the name of a candidate, their number of years of experience, and 
their interview ID.

Table: Rounds
+--------------+------+
| Column Name  | Type |
+--------------+------+
| interview_id | int  |
| round_id     | int  |
| score        | int  |
+--------------+------+
(interview_id, round_id) is the primary key column for this table. Each row of 
this table indicates the score of one round of an interview. Write an SQL query 
to report the IDs of the candidates who have at least two years of experience 
and the sum of the score of their interview rounds is strictly greater than 15.
Return the result table in any order. The query result format is in the 
following example.

Example 1:
Input: 
Candidates table:
+--------------+---------+--------------+--------------+
| candidate_id | name    | years_of_exp | interview_id |
+--------------+---------+--------------+--------------+
| 11           | Atticus | 1            | 101          |
| 9            | Ruben   | 6            | 104          |
| 6            | Aliza   | 10           | 109          |
| 8            | Alfredo | 0            | 107          |
+--------------+---------+--------------+--------------+
Rounds table:
+--------------+----------+-------+
| interview_id | round_id | score |
+--------------+----------+-------+
| 109          | 3        | 4     |
| 101          | 2        | 8     |
| 109          | 4        | 1     |
| 107          | 1        | 3     |
| 104          | 3        | 6     |
| 109          | 1        | 4     |
| 104          | 4        | 7     |
| 104          | 1        | 2     |
| 109          | 2        | 1     |
| 104          | 2        | 7     |
| 107          | 2        | 3     |
| 101          | 1        | 8     |
+--------------+----------+-------+
Output: 
+--------------+
| candidate_id |
+--------------+
| 9            |
+--------------+
Explanation: - Candidate 11: The total score is 16, and they have one year of 
                             experience. We do not include them in the result 
                             table because of their years of experience.
             - Candidate 9: The total score is 22, and they have six years of 
                            experience. We include them in the result table.
             - Candidate 6: The total score is 10, and they have ten years of 
                            experience. We do not include them in the result 
                            table because the score is not good enough.
             - Candidate 8: The total score is 6, and they have zero years of 
                            experience. We do not include them in the result 
                            table because of their years of experience and the 
                            score.*/

SELECT candidate_id
FROM Candidates JOIN Rounds USING (interview_id)
WHERE years_of_exp >= 2 
GROUP BY candidate_id
HAVING SUM(score) > 15


/*2051. The Category of Each Member in the Store (Medium)
SQL Schema
Table: Members
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| member_id   | int     |
| name        | varchar |
+-------------+---------+
member_id is the primary key column for this table. Each row of this table 
indicates the name and the ID of a member.

Table: Visits
+-------------+------+
| Column Name | Type |
+-------------+------+
| visit_id    | int  |
| member_id   | int  |
| visit_date  | date |
+-------------+------+
visit_id is the primary key column for this table. member_id is a foreign key 
to member_id from the Members table. Each row of this table contains 
information about the date of a visit to the store and the member who visited it.

Table: Purchases
+----------------+------+
| Column Name    | Type |
+----------------+------+
| visit_id       | int  |
| charged_amount | int  |
+----------------+------+
visit_id is the primary key column for this table. visit_id is a foreign key to 
visit_id from the Visits table. Each row of this table contains information 
about the amount charged in a visit to the store.

A store wants to categorize its members. There are three tiers:
* "Diamond": if the conversion rate is greater than or equal to 80.
* "Gold": if the conversion rate is greater than or equal to 50 and less than 
  80.
* "Silver": if the conversion rate is less than 50.
* "Bronze": if the member never visited the store.
The conversion rate of a member is (100 * total number of purchases for the 
member) / total number of visits for the member. Write an SQL query to report 
the id, the name, and the category of each member. Return the result table in 
any order. The query result format is in the following example.

Example 1:
Input: 
Members table:
+-----------+---------+
| member_id | name    |
+-----------+---------+
| 9         | Alice   |
| 11        | Bob     |
| 3         | Winston |
| 8         | Hercy   |
| 1         | Narihan |
+-----------+---------+
Visits table:
+----------+-----------+------------+
| visit_id | member_id | visit_date |
+----------+-----------+------------+
| 22       | 11        | 2021-10-28 |
| 16       | 11        | 2021-01-12 |
| 18       | 9         | 2021-12-10 |
| 19       | 3         | 2021-10-19 |
| 12       | 11        | 2021-03-01 |
| 17       | 8         | 2021-05-07 |
| 21       | 9         | 2021-05-12 |
+----------+-----------+------------+
Purchases table:
+----------+----------------+
| visit_id | charged_amount |
+----------+----------------+
| 12       | 2000           |
| 18       | 9000           |
| 17       | 7000           |
+----------+----------------+
Output: 
+-----------+---------+----------+
| member_id | name    | category |
+-----------+---------+----------+
| 1         | Narihan | Bronze   |
| 3         | Winston | Silver   |
| 8         | Hercy   | Diamond  |
| 9         | Alice   | Gold     |
| 11        | Bob     | Silver   |
+-----------+---------+----------+
Explanation: - User Narihan with id = 1 did not make any visits to the store. 
               She gets a Bronze category.
             - User Winston with id = 3 visited the store one time and did not 
               purchase anything. The conversion rate = (100 * 0) / 1 = 0. He 
               gets a Silver category.
             - User Hercy with id = 8 visited the store one time and purchased 
               one time. The conversion rate = (100 * 1) / 1 = 1. He gets a 
               Diamond category.
             - User Alice with id = 9 visited the store two times and purchased 
               one time. The conversion rate = (100 * 1) / 2 = 50. She gets a 
               Gold category.
             - User Bob with id = 11 visited the store three times and 
               purchased one time. The conversion rate = (100 * 1) / 3 = 33.33. 
               He gets a Silver category.*/

SELECT 
    member_id, 
    name, 
    CASE 
        WHEN 100*AVG(CASE WHEN charged_amount IS NULL THEN 0 ELSE 1 END) >= 80 THEN "Diamond"
        WHEN 100*AVG(CASE WHEN charged_amount IS NULL THEN 0 ELSE 1 END) >= 50 THEN "Gold"
        WHEN COUNT(visit_id) = 0 THEN "Bronze"
        ELSE "Silver" 
    END AS category
FROM 
    Members
    LEFT JOIN Visits USING (member_id)
    LEFT JOIN Purchases USING (visit_id)
GROUP BY member_id


/*2066. Account Balance (Medium)
SQL Schema
Table: Transactions
+-------------+------+
| Column Name | Type |
+-------------+------+
| account_id  | int  |
| day         | date |
| type        | ENUM |
| amount      | int  |
+-------------+------+
(account_id, day) is the primary key for this table. Each row contains 
information about one transaction, including the transaction type, the day it 
occurred on, and the amount. type is an ENUM of the type ('Deposit','Withdraw') 
Write an SQL query to report the balance of each user after each transaction. 
You may assume that the balance of each account before any transaction is 0 and 
that the balance will never be below 0 at any moment. Return the result table 
in ascending order by account_id, then by day in case of a tie. The query 
result format is in the following example.

Example 1:
Input: 
Transactions table:
+------------+------------+----------+--------+
| account_id | day        | type     | amount |
+------------+------------+----------+--------+
| 1          | 2021-11-07 | Deposit  | 2000   |
| 1          | 2021-11-09 | Withdraw | 1000   |
| 1          | 2021-11-11 | Deposit  | 3000   |
| 2          | 2021-12-07 | Deposit  | 7000   |
| 2          | 2021-12-12 | Withdraw | 7000   |
+------------+------------+----------+--------+
Output: 
+------------+------------+---------+
| account_id | day        | balance |
+------------+------------+---------+
| 1          | 2021-11-07 | 2000    |
| 1          | 2021-11-09 | 1000    |
| 1          | 2021-11-11 | 4000    |
| 2          | 2021-12-07 | 7000    |
| 2          | 2021-12-12 | 0       |
+------------+------------+---------+
Explanation: Account 1:
             - Initial balance is 0.
             - 2021-11-07 --> deposit 2000. Balance is 0 + 2000 = 2000.
             - 2021-11-09 --> withdraw 1000. Balance is 2000 - 1000 = 1000.
             - 2021-11-11 --> deposit 3000. Balance is 1000 + 3000 = 4000.
             Account 2:
             - Initial balance is 0.
             - 2021-12-07 --> deposit 7000. Balance is 0 + 7000 = 7000.
             - 2021-12-12 --> withdraw 7000. Balance is 7000 - 7000 = 0.*/

SELECT 
    account_id, 
    day, 
    SUM(IF(type = "Deposit", amount, -amount)) OVER (PARTITION BY account_id ORDER BY day) AS balance
FROM Transactions
ORDER BY 1, 2


/*2072. The Winner University (Easy)
SQL Schema
Table: NewYork
+-------------+------+
| Column Name | Type |
+-------------+------+
| student_id  | int  |
| score       | int  |
+-------------+------+
student_id is the primary key for this table. Each row contains information 
about the score of one student from New York University in an exam.

Table: California
+-------------+------+
| Column Name | Type |
+-------------+------+
| student_id  | int  |
| score       | int  |
+-------------+------+
student_id is the primary key for this table. Each row contains information 
about the score of one student from California University in an exam. There is 
a competition between New York University and California University. The 
competition is held between the same number of students from both universities. 
The university that has more excellent students wins the competition. If the 
two universities have the same number of excellent students, the competition 
ends in a draw. An excellent student is a student that scored 90% or more in 
the exam. Write an SQL query to report:
"New York University" if New York University wins the competition.
"California University" if California University wins the competition.
"No Winner" if the competition ends in a draw.
The query result format is in the following example.

Example 1:
Input: 
NewYork table:
+------------+-------+
| student_id | score |
+------------+-------+
| 1          | 90    |
| 2          | 87    |
+------------+-------+
California table:
+------------+-------+
| student_id | score |
+------------+-------+
| 2          | 89    |
| 3          | 88    |
+------------+-------+
Output: 
+---------------------+
| winner              |
+---------------------+
| New York University |
+---------------------+
Explanation: New York University has 1 excellent student, and California 
             University has 0 excellent students.

Example 2:
Input: 
NewYork table:
+------------+-------+
| student_id | score |
+------------+-------+
| 1          | 89    |
| 2          | 88    |
+------------+-------+
California table:
+------------+-------+
| student_id | score |
+------------+-------+
| 2          | 90    |
| 3          | 87    |
+------------+-------+
Output: 
+-----------------------+
| winner                |
+-----------------------+
| California University |
+-----------------------+
Explanation: New York University has 0 excellent students, and California 
             University has 1 excellent student.

Example 3:
Input: 
NewYork table:
+------------+-------+
| student_id | score |
+------------+-------+
| 1          | 89    |
| 2          | 90    |
+------------+-------+
California table:
+------------+-------+
| student_id | score |
+------------+-------+
| 2          | 87    |
| 3          | 99    |
+------------+-------+
Output: 
+-----------+
| winner    |
+-----------+
| No Winner |
+-----------+
Explanation: Both New York University and California University have 1 
             excellent student.*/

WITH cte AS (
    SELECT 
        (SELECT COUNT(*) FROM NewYork WHERE score >= 90) AS NY,
        (SELECT COUNT(*) FROM California WHERE score >= 90) AS CA
)
SELECT CASE
        WHEN NY > CA THEN 'New York University'
        WHEN NY < CA THEN 'California University'
    ELSE 'No Winner'
    END AS winner
FROM cte


/*2082. The Number of Rich Customers (Easy)
SQL Schema
Table: Store
+-------------+------+
| Column Name | Type |
+-------------+------+
| bill_id     | int  |
| customer_id | int  |
| amount      | int  |
+-------------+------+
bill_id is the primary key for this table. Each row contains information about 
the amount of one bill and the customer associated with it. Write an SQL query 
to report the number of customers who had at least one bill with an amount 
strictly greater than 500. The query result format is in the following example.

Example 1:
Input: 
Store table:
+---------+-------------+--------+
| bill_id | customer_id | amount |
+---------+-------------+--------+
| 6       | 1           | 549    |
| 8       | 1           | 834    |
| 4       | 2           | 394    |
| 11      | 3           | 657    |
| 13      | 3           | 257    |
+---------+-------------+--------+
Output: 
+------------+
| rich_count |
+------------+
| 2          |
+------------+
Explanation: 
Customer 1 has two bills with amounts strictly greater than 500.
Customer 2 does not have any bills with an amount strictly greater than 500.
Customer 3 has one bill with an amount strictly greater than 500.*/

SELECT COUNT(DISTINCT customer_id) AS rich_count
FROM Store
WHERE amount > 500


/*2084. Drop Type 1 Orders for Customers With Type 0 Orders (Medium)
SQL Schema
Table: Orders
+-------------+------+
| Column Name | Type |
+-------------+------+
| order_id    | int  | 
| customer_id | int  |
| order_type  | int  | 
+-------------+------+
order_id is the primary key column for this table. Each row of this table 
indicates the ID of an order, the ID of the customer who ordered it, and the 
order type. The orders could be of type 0 or type 1.

Write an SQL query to report all the orders based on the following criteria:
* If a customer has at least one order of type 0, do not report any order of 
  type 1 from that customer.
* Otherwise, report all the orders of the customer.
Return the result table in any order. The query result format is in the 
following example.

Example 1:
Input:
Orders table:
+----------+-------------+------------+
| order_id | customer_id | order_type |
+----------+-------------+------------+
| 1        | 1           | 0          |
| 2        | 1           | 0          |
| 11       | 2           | 0          |
| 12       | 2           | 1          |
| 21       | 3           | 1          |
| 22       | 3           | 0          |
| 31       | 4           | 1          |
| 32       | 4           | 1          |
+----------+-------------+------------+
Output:
+----------+-------------+------------+
| order_id | customer_id | order_type |
+----------+-------------+------------+
| 31       | 4           | 1          |
| 32       | 4           | 1          |
| 1        | 1           | 0          |
| 2        | 1           | 0          |
| 11       | 2           | 0          |
| 22       | 3           | 0          |
+----------+-------------+------------+
Explanation: Customer 1 has two orders of type 0. We return both of them.
             Customer 2 has one order of type 0 and one order of type 1. We 
                        only return the order of type 0.
             Customer 3 has one order of type 0 and one order of type 1. We 
                        only return the order of type 0.
             Customer 4 has two orders of type 1. We return both of them.*/

SELECT *
FROM Orders
WHERE 
    order_type = 0 
    OR order_type = 1 
    AND customer_id NOT IN (SELECT customer_id FROM Orders WHERE order_type = 0)


/*2112. The Airport With the Most Traffic (Medium)
SQL Schema
Table: Flights
+-------------------+------+
| Column Name       | Type |
+-------------------+------+
| departure_airport | int  |
| arrival_airport   | int  |
| flights_count     | int  |
+-------------------+------+
(departure_airport, arrival_airport) is the primary key column for this table.
Each row of this table indicates that there were flights_count flights that 
departed from departure_airport and arrived at arrival_airport. Write an SQL 
query to report the ID of the airport with the most traffic. The airport with 
the most traffic is the airport that has the largest total number of flights 
that either departed from or arrived at the airport. If there is more than one 
airport with the most traffic, report them all. Return the result table in any 
order. The query result format is in the following example.

Example 1:
Input: 
Flights table:
+-------------------+-----------------+---------------+
| departure_airport | arrival_airport | flights_count |
+-------------------+-----------------+---------------+
| 1                 | 2               | 4             |
| 2                 | 1               | 5             |
| 2                 | 4               | 5             |
+-------------------+-----------------+---------------+
Output: 
+------------+
| airport_id |
+------------+
| 2          |
+------------+
Explanation: Airport 1 was engaged with 9 flights (4 departures, 5 arrivals).
             Airport 2 was engaged with 14 flights (10 departures, 4 arrivals).
             Airport 4 was engaged with 5 flights (5 arrivals).
             The airport with the most traffic is airport 2.

Example 2:
Input: 
Flights table:
+-------------------+-----------------+---------------+
| departure_airport | arrival_airport | flights_count |
+-------------------+-----------------+---------------+
| 1                 | 2               | 4             |
| 2                 | 1               | 5             |
| 3                 | 4               | 5             |
| 4                 | 3               | 4             |
| 5                 | 6               | 7             |
+-------------------+-----------------+---------------+
Output: 
+------------+
| airport_id |
+------------+
| 1          |
| 2          |
| 3          |
| 4          |
+------------+
Explanation: Airport 1 was engaged with 9 flights (4 departures, 5 arrivals).
             Airport 2 was engaged with 9 flights (5 departures, 4 arrivals).
             Airport 3 was engaged with 9 flights (5 departures, 4 arrivals).
             Airport 4 was engaged with 9 flights (4 departures, 5 arrivals).
             Airport 5 was engaged with 7 flights (7 departures).
             Airport 6 was engaged with 7 flights (7 arrivals).
             The airports with the most traffic are airports 1, 2, 3, and 4.*/

WITH Cte AS (
    SELECT airport_id, RANK() OVER (ORDER BY SUM(flights_count) DESC) AS rn
    FROM (SELECT departure_airport AS airport_id, flights_count FROM Flights 
          UNION ALL 
          SELECT arrival_airport AS airport_id, flights_count FROM Flights) a 
    GROUP BY airport_id
)
SELECT airport_id
FROM Cte 
WHERE rn = 1


/*2142. The Number of Passengers in Each Bus I (Medium)
SQL Schema
Table: Buses
+--------------+------+
| Column Name  | Type |
+--------------+------+
| bus_id       | int  |
| arrival_time | int  |
+--------------+------+
bus_id is the primary key column for this table. Each row of this table 
contains information about the arrival time of a bus at the LeetCode station.
No two buses will arrive at the same time.

Table: Passengers
+--------------+------+
| Column Name  | Type |
+--------------+------+
| passenger_id | int  |
| arrival_time | int  |
+--------------+------+
passenger_id is the primary key column for this table. Each row of this table 
contains information about the arrival time of a passenger at the LeetCode 
station. Buses and passengers arrive at the LeetCode station. If a bus arrives 
at the station at time tbus and a passenger arrived at time tpassenger where 
tpassenger <= tbus and the passenger did not catch any bus, the passenger will 
use that bus. Write an SQL query to report the number of users that used each 
bus. Return the result table ordered by bus_id in ascending order. The query 
result format is in the following example.
 
Example 1:
Input: 
Buses table:
+--------+--------------+
| bus_id | arrival_time |
+--------+--------------+
| 1      | 2            |
| 2      | 4            |
| 3      | 7            |
+--------+--------------+
Passengers table:
+--------------+--------------+
| passenger_id | arrival_time |
+--------------+--------------+
| 11           | 1            |
| 12           | 5            |
| 13           | 6            |
| 14           | 7            |
+--------------+--------------+
Output: 
+--------+----------------+
| bus_id | passengers_cnt |
+--------+----------------+
| 1      | 1              |
| 2      | 0              |
| 3      | 3              |
+--------+----------------+
Explanation: - Passenger 11 arrives at time 1.
             - Bus 1 arrives at time 2 and collects passenger 11.
             - Bus 2 arrives at time 4 and does not collect any passengers.
             - Passenger 12 arrives at time 5.
             - Passenger 13 arrives at time 6.
             - Passenger 14 arrives at time 7.
             - Bus 3 arrives at time 7 and collects passengers 12, 13, and 14.*/

WITH Cte AS (
    SELECT passenger_id, MIN(b.arrival_time) AS arrival_time
    FROM 
        Buses b 
        JOIN 
        Passengers p ON p.arrival_time <= b.arrival_time
    GROUP BY passenger_id
)
SELECT bus_id, COUNT(c.arrival_time) AS passengers_cnt
FROM Buses b
    LEFT JOIN Cte c USING (arrival_time)
GROUP BY 1
ORDER BY 1


/*2159. Order Two Columns Independently (Medium)
SQL Schema
Table: Data
+-------------+------+
| Column Name | Type |
+-------------+------+
| first_col   | int  |
| second_col  | int  |
+-------------+------+
There is no primary key for this table and it may contain duplicates.
 
Write an SQL query to independently:
* order first_col in ascending order.
* order second_col in descending order.
The query result format is in the following example.

Example 1:
Input: 
Data table: +-----------+------------+
            | first_col | second_col |
            +-----------+------------+
            | 4         | 2          |
            | 2         | 3          |
            | 3         | 1          |
            | 1         | 4          |
            +-----------+------------+
Output:     +-----------+------------+
            | first_col | second_col |
            +-----------+------------+
            | 1         | 4          |
            | 2         | 3          |
            | 3         | 2          |
            | 4         | 1          |
            +-----------+------------+*/

SELECT 
    first_col, 
    second_col
FROM 
    (SELECT first_col, ROW_NUMBER() OVER (ORDER BY first_col ASC) AS rn FROM Data) a 
    JOIN 
    (SELECT second_col, ROW_NUMBER() OVER (ORDER BY second_col DESC) AS rn FROM Data) b 
    USING (rn)


/*2175. The Change in Global Rankings (Medium)
SQL Schema
Table: TeamPoints
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| team_id     | int     |
| name        | varchar |
| points      | int     |
+-------------+---------+
team_id is the primary key for this table. Each row of this table contains the 
ID of a national team, the name of the country it represents, and the points it 
has in the global rankings. No two teams will represent the same country.

Table: PointsChange
+---------------+------+
| Column Name   | Type |
+---------------+------+
| team_id       | int  |
| points_change | int  |
+---------------+------+
team_id is the primary key for this table. Each row of this table contains the 
ID of a national team and the change in its points in the global rankings. 
points_change can be:
- 0: indicates no change in points.
- positive: indicates an increase in points.
- negative: indicates a decrease in points.
Each team_id that appears in TeamPoints will also appear in this table. The 
global ranking of a national team is its rank after sorting all the teams by 
their points in descending order. If two teams have the same points, we break 
the tie by sorting them by their name in lexicographical order. The points of 
each national team should be updated based on its corresponding points_change 
value.

Write an SQL query to calculate the change in the global rankings after 
updating each team's points. Return the result table in any order. The query 
result format is in the following example.

Example 1:
Input: 
TeamPoints table:   +---------+-------------+--------+
                    | team_id | name        | points |
                    +---------+-------------+--------+
                    | 3       | Algeria     | 1431   |
                    | 1       | Senegal     | 2132   |
                    | 2       | New Zealand | 1402   |
                    | 4       | Croatia     | 1817   |
                    +---------+-------------+--------+
PointsChange table:        +---------+---------------+
                           | team_id | points_change |
                           +---------+---------------+
                           | 3       | 399           |
                           | 2       | 0             |
                           | 4       | 13            |
                           | 1       | -22           |
                           +---------+---------------+
Output:          +---------+-------------+-----------+
                 | team_id | name        | rank_diff |
                 +---------+-------------+-----------+
                 | 1       | Senegal     | 0         |
                 | 4       | Croatia     | -1        |
                 | 3       | Algeria     | 1         |
                 | 2       | New Zealand | 0         |
                 +---------+-------------+-----------+
Explanation: The global rankings were as follows:
             +---------+-------------+--------+------+
             | team_id | name        | points | rank |
             +---------+-------------+--------+------+
             | 1       | Senegal     | 2132   | 1    |
             | 4       | Croatia     | 1817   | 2    |
             | 3       | Algeria     | 1431   | 3    |
             | 2       | New Zealand | 1402   | 4    |
             +---------+-------------+--------+------+
             After updating the points of each team, the rankings became the 
             following:
             +---------+-------------+--------+------+
             | team_id | name        | points | rank |
             +---------+-------------+--------+------+
             | 1       | Senegal     | 2110   | 1    |
             | 3       | Algeria     | 1830   | 2    |
             | 4       | Croatia     | 1830   | 3    |
             | 2       | New Zealand | 1402   | 4    |
             +---------+-------------+--------+------+
             Since after updating the points Algeria and Croatia have the same 
             points, they are ranked according to their lexicographic order.
             Senegal lost 22 points but their rank did not change. Croatia 
             gained 13 points but their rank decreased by one. Algeria gained 
             399 points and their rank increased by one. New Zealand did not 
             gain or lose points and their rank did not change.*/

SELECT 
    team_id, 
    name,
    CAST(ROW_NUMBER() OVER (ORDER BY points DESC, name ASC) AS SIGNED) - CAST(ROW_NUMBER() OVER (ORDER BY points+points_change DESC, name ASC) AS SIGNED) AS rank_diff
FROM TeamPoints JOIN Pointschange USING (team_id)


/*2205. The Number of Users That Are Eligible for Discount (Easy)
SQL Schema
Table: Purchases
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| user_id     | int      |
| time_stamp  | datetime |
| amount      | int      |
+-------------+----------+
(user_id, time_stamp) is the primary key for this table. Each row contains 
information about the purchase time and the amount paid for the user with ID 
user_id. A user is eligible for a discount if they had a purchase in the 
inclusive interval of time [startDate, endDate] with at least minAmount amount. 
To convert the dates to times, both dates should be considered as the start of 
the day (i.e., endDate = 2022-03-05 should be considered as the time 2022-03-05 
00:00:00). Write an SQL query to report the number of users that are eligible 
for a discount. The query result format is in the following example.

Example 1:
Input: Purchases table:
       +---------+---------------------+--------+
       | user_id | time_stamp          | amount |
       +---------+---------------------+--------+
       | 1       | 2022-04-20 09:03:00 | 4416   |
       | 2       | 2022-03-19 19:24:02 | 678    |
       | 3       | 2022-03-18 12:03:09 | 4523   |
       | 3       | 2022-03-30 09:43:42 | 626    |
       +---------+---------------------+--------+
       startDate = 2022-03-08, endDate = 2022-03-20, minAmount = 1000
Output: +----------+
        | user_cnt |
        +----------+
        | 1        |
        +----------+
Explanation: Out of the three users, only User 3 is eligible for a discount.
             - User 1 had one purchase with at least minAmount amount, but not 
               within the time interval.
             - User 2 had one purchase within the time interval, but with less 
               than minAmount amount.
             - User 3 is the only user who had a purchase that satisfies both 
               conditions.*/

CREATE FUNCTION getUserIDs(startDate DATE, endDate DATE, minAmount INT) RETURNS INT
BEGIN
  RETURN (
      SELECT COUNT(DISTINCT user_id) AS user_cnt
      FROM Purchases
      WHERE time_stamp BETWEEN startDate AND endDate AND amount >= minAmount
  );
END


/*2228. Users With Two Purchases Within Seven Days (Medium)
SQL Schema
Table: Purchases
+---------------+------+
| Column Name   | Type |
+---------------+------+
| purchase_id   | int  |
| user_id       | int  |
| purchase_date | date |
+---------------+------+
purchase_id is the primary key for this table. This table contains logs of the 
dates that users purchased from a certain retailer.

Write an SQL query to report the IDs of the users that made any two purchases 
at most 7 days apart. Return the result table ordered by user_id. The query 
result format is in the following example.

Example 1:
Input: 
Purchases table: +-------------+---------+---------------+
                 | purchase_id | user_id | purchase_date |
                 +-------------+---------+---------------+
                 | 4           | 2       | 2022-03-13    |
                 | 1           | 5       | 2022-02-11    |
                 | 3           | 7       | 2022-06-19    |
                 | 6           | 2       | 2022-03-20    |
                 | 5           | 7       | 2022-06-19    |
                 | 2           | 2       | 2022-06-08    |
                 +-------------+---------+---------------+
Output: +---------+
        | user_id |
        +---------+
        | 2       |
        | 7       |
        +---------+
Explanation: User 2 had two purchases on 2022-03-13 and 2022-03-20. Since the 
             second purchase is within 7 days of the first purchase, we add 
             their ID. User 5 had only 1 purchase. User 7 had two purchases on 
             the same day so we add their ID.*/

SELECT DISTINCT user_id 
FROM (SELECT 
        user_id, 
        purchase_date, 
        LAG(purchase_date) OVER (PARTITION BY user_id ORDER BY purchase_date) prev_date 
      FROM Purchases) a
WHERE DATEDIFF(purchase_date, prev_date) <= 7


/*2230. The Users That Are Eligible for Discount (Easy)
SQL Schema
Table: Purchases
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| user_id     | int      |
| time_stamp  | datetime |
| amount      | int      |
+-------------+----------+
(user_id, time_stamp) is the primary key for this table. Each row contains 
information about the purchase time and the amount paid for the user with ID 
user_id. A user is eligible for a discount if they had a purchase in the 
inclusive interval of time [startDate, endDate] with at least minAmount amount. 
To convert the dates to times, both dates should be considered as the start of 
the day (i.e., endDate = 2022-03-05 should be considered as the time 2022-03-05 
00:00:00). Write an SQL query to report the IDs of the users that are eligible 
for a discount. Return the result table ordered by user_id. The query result 
format is in the following example.

Example 1:
Input: Purchases table:
       +---------+---------------------+--------+
       | user_id | time_stamp          | amount |
       +---------+---------------------+--------+
       | 1       | 2022-04-20 09:03:00 | 4416   |
       | 2       | 2022-03-19 19:24:02 | 678    |
       | 3       | 2022-03-18 12:03:09 | 4523   |
       | 3       | 2022-03-30 09:43:42 | 626    |
       +---------+---------------------+--------+
       startDate = 2022-03-08, endDate = 2022-03-20, minAmount = 1000
Output: +---------+
        | user_id |
        +---------+
        | 3       |
        +---------+
Explanation: Out of the three users, only User 3 is eligible for a discount.
             - User 1 had one purchase with at least minAmount amount, but not 
               within the time interval.
             - User 2 had one purchase within the time interval, but with less 
               than minAmount amount.
             - User 3 is the only user who had a purchase that satisfies both 
               conditions.

Important Note: This problem is basically the same as The Number of Users That 
                Are Eligible for Discount.*/

CREATE PROCEDURE getUserIDs(startDate DATE, endDate DATE, minAmount INT)
BEGIN
    SELECT DISTINCT user_id
    FROM Purchases
    WHERE startDate <= time_stamp AND time_stamp <= endDate AND amount >= minAmount
    ORDER BY 1;
END


/*2238. Number of Times a Driver Was a Passenger (Medium)
SQL Schema
Table: Rides
+--------------+------+
| Column Name  | Type |
+--------------+------+
| ride_id      | int  |
| driver_id    | int  |
| passenger_id | int  |
+--------------+------+
ride_id is the primary key for this table. Each row of this table contains the 
ID of the driver and the ID of the passenger that rode in ride_id. Note that 
driver_id != passenger_id.

Write an SQL query to report the ID of each driver and the number of times they 
were a passenger. Return the result table in any order. The query result format 
is in the following example.

Example 1:
Input: 
Rides table: +---------+-----------+--------------+
             | ride_id | driver_id | passenger_id |
             +---------+-----------+--------------+
             | 1       | 7         | 1            |
             | 2       | 7         | 2            |
             | 3       | 11        | 1            |
             | 4       | 11        | 7            |
             | 5       | 11        | 7            |
             | 6       | 11        | 3            |
             +---------+-----------+--------------+
Output: +-----------+-----+
        | driver_id | cnt |
        +-----------+-----+
        | 7         | 2   |
        | 11        | 0   |
        +-----------+-----+
Explanation: There are two drivers in all the given rides: 7 and 11. The driver 
             with ID = 7 was a passenger two times. The driver with ID = 11 was 
             never a passenger.*/

SELECT 
    a.driver_id, 
    COUNT(Rides.passenger_id) AS cnt
FROM 
    (SELECT DISTINCT driver_id FROM Rides) a 
    LEFT JOIN Rides ON a.driver_id = Rides.passenger_id
GROUP BY a.driver_id


/*2292. Products With Three or More Orders in Two Consecutive Years (Medium)
SQL Schema
Table: Orders
+---------------+------+
| Column Name   | Type |
+---------------+------+
| order_id      | int  |
| product_id    | int  |
| quantity      | int  |
| purchase_date | date |
+---------------+------+
order_id is the primary key for this table. Each row in this table contains the 
ID of an order, the id of the product purchased, the quantity, and the purchase 
date.

Write an SQL query to report the IDs of all the products that were ordered 
three or more times in two consecutive years. Return the result table in any 
order. The query result format is shown in the following example.

Example 1:
Input: 
Orders table: +----------+------------+----------+---------------+
              | order_id | product_id | quantity | purchase_date |
              +----------+------------+----------+---------------+
              | 1        | 1          | 7        | 2020-03-16    |
              | 2        | 1          | 4        | 2020-12-02    |
              | 3        | 1          | 7        | 2020-05-10    |
              | 4        | 1          | 6        | 2021-12-23    |
              | 5        | 1          | 5        | 2021-05-21    |
              | 6        | 1          | 6        | 2021-10-11    |
              | 7        | 2          | 6        | 2022-10-11    |
              +----------+------------+----------+---------------+
Output: +------------+
        | product_id |
        +------------+
        | 1          |
        +------------+
Explanation: Product 1 was ordered in 2020 three times and in 2021 three times. 
             Since it was ordered three times in two consecutive years, we 
             include it in the answer. Product 2 was ordered one time in 2022. 
             We do not include it in the answer.*/

SELECT 
    DISTINCT product_id 
FROM (SELECT 
        product_id, 
        YEAR(purchase_date) AS curr_year, 
        LEAD(YEAR(purchase_date)) OVER(PARTITION BY product_id ORDER BY YEAR(purchase_date)) AS next_year 
      FROM orders 
      GROUP BY 1, 2 
      HAVING COUNT(order_id) >= 3) a
WHERE next_year = curr_year+1


/*2298. Tasks Count in the Weekend (Medium)
SQL Schema
Table: Tasks
+-------------+------+
| Column Name | Type |
+-------------+------+
| task_id     | int  |
| assignee_id | int  |
| submit_date | date |
+-------------+------+
task_id is the primary key for this table. Each row in this table contains the 
ID of a task, the id of the assignee, and the submission date.

Write an SQL query to report:
* the number of the tasks that were submitted during the weekend (Saturday, 
  Sunday) as weekend_cnt, and
* the number of the tasks that were submitted during the working days as 
  working_cnt.
Return the result table in any order. The query result format is shown in the 
following example.

Example 1:
Input: 
Tasks table: +---------+-------------+-------------+
             | task_id | assignee_id | submit_date |
             +---------+-------------+-------------+
             | 1       | 1           | 2022-06-13  |
             | 2       | 6           | 2022-06-14  |
             | 3       | 6           | 2022-06-15  |
             | 4       | 3           | 2022-06-18  |
             | 5       | 5           | 2022-06-19  |
             | 6       | 7           | 2022-06-19  |
             +---------+-------------+-------------+
Output: +-------------+-------------+
        | weekend_cnt | working_cnt |
        +-------------+-------------+
        | 3           | 3           |
        +-------------+-------------+
Explanation: Task 1 was submitted on Monday.
             Task 2 was submitted on Tuesday.
             Task 3 was submitted on Wednesday.
             Task 4 was submitted on Saturday.
             Task 5 was submitted on Sunday.
             Task 6 was submitted on Sunday.
             3 tasks were submitted during the weekend.
             3 tasks were submitted during the working days.*/

SELECT 
    SUM(WEEKDAY(submit_date) >= 5) AS weekend_cnt,
    SUM(WEEKDAY(submit_date) <= 4) AS working_cnt
FROM Tasks


/*2308. Arrange Table by Gender (Medium)
SQL Schema
Table: Genders
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| user_id     | int     |
| gender      | varchar |
+-------------+---------+
user_id is the primary key for this table. gender is ENUM of type 'female', 
'male', or 'other'. Each row in this table contains the ID of a user and their 
gender. The table has an equal number of 'female', 'male', and 'other'. 

Write an SQL query to rearrange the Genders table such that the rows alternate 
between 'female', 'other', and 'male' in order. The table should be rearranged 
such that the IDs of each gender are sorted in ascending order. Return the 
result table in the mentioned order. The query result format is shown in the 
following example.

Example 1:
Input: 
Genders table: +---------+--------+
               | user_id | gender |
               +---------+--------+
               | 4       | male   |
               | 7       | female |
               | 2       | other  |
               | 5       | male   |
               | 3       | female |
               | 8       | male   |
               | 6       | other  |
               | 1       | other  |
               | 9       | female |
               +---------+--------+
Output: +---------+--------+
        | user_id | gender |
        +---------+--------+
        | 3       | female |
        | 1       | other  |
        | 4       | male   |
        | 7       | female |
        | 2       | other  |
        | 5       | male   |
        | 9       | female |
        | 6       | other  |
        | 8       | male   |
        +---------+--------+
Explanation: Female gender: IDs 3, 7, and 9. Other gender: IDs 1, 2, and 6. 
             Male gender: IDs 4, 5, and 8. We arrange the table alternating 
             between 'female', 'other', and 'male'. Note that the IDs of each 
             gender are sorted in ascending order.*/

SELECT user_id, gender
FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY gender ORDER BY user_id) AS rnk FROM Genders) a
ORDER BY rnk, gender


/*2314. The First Day of the Maximum Recorded Degree in Each City (Medium)
SQL Schema
Table: Weather
+-------------+------+
| Column Name | Type |
+-------------+------+
| city_id     | int  |
| day         | date |
| degree      | int  |
+-------------+------+
(city_id, day) is the primary key for this table. Each row in this table 
contains the degree of the weather of a city on a certain day. All the degrees 
are recorded in the year 2022.

Write an SQL query to report the day that has the maximum recorded degree in 
each city. If the maximum degree was recorded for the same city multiple times, 
return the earliest day among them. Return the result table ordered by city_id 
in ascending order. The query result format is shown in the following example.

Example 1:
Input: 
Weather table: +---------+------------+--------+
               | city_id | day        | degree |
               +---------+------------+--------+
               | 1       | 2022-01-07 | -12    |
               | 1       | 2022-03-07 | 5      |
               | 1       | 2022-07-07 | 24     |
               | 2       | 2022-08-07 | 37     |
               | 2       | 2022-08-17 | 37     |
               | 3       | 2022-02-07 | -7     |
               | 3       | 2022-12-07 | -6     |
               +---------+------------+--------+
Output: +---------+------------+--------+
        | city_id | day        | degree |
        +---------+------------+--------+
        | 1       | 2022-07-07 | 24     |
        | 2       | 2022-08-07 | 37     |
        | 3       | 2022-12-07 | -6     |
        +---------+------------+--------+
Explanation: For city 1, the maximum degree was recorded on 2022-07-07 with 24 
                         degrees.
             For city 1, the maximum degree was recorded on 2022-08-07 and 
                         2022-08-17 with 37 degrees. We choose the earlier date 
                         (2022-08-07).
             For city 3, the maximum degree was recorded on 2022-12-07 with -6 
                         degrees.*/

SELECT 
    city_id, 
    day, 
    degree
FROM (SELECT 
        *, 
        RANK() OVER (PARTITION BY city_id ORDER BY degree DESC, day ASC) AS rnk 
      FROM Weather) a 
WHERE rnk = 1
ORDER BY 1 ASC


/*2324. Product Sales Analysis IV (Medium)
SQL Schema
Table: Sales
+-------------+-------+
| Column Name | Type  |
+-------------+-------+
| sale_id     | int   |
| product_id  | int   |
| user_id     | int   |
| quantity    | int   |
+-------------+-------+
sale_id is the primary key of this table. product_id is a foreign key to 
Product table. Each row of this table shows the ID of the product and the 
quantity purchased by a user.

Table: Product
+-------------+------+
| Column Name | Type |
+-------------+------+
| product_id  | int  |
| price       | int  |
+-------------+------+
product_id is the primary key of this table. Each row of this table indicates 
the price of each product. Write an SQL query that reports for each user the 
product id on which the user spent the most money. In case the same user spent 
the most money on two or more products, report all of them. 

Return the resulting table in any order. The query result format is in the 
following example.

Example 1:
Input: 
Sales table:
+---------+------------+---------+----------+
| sale_id | product_id | user_id | quantity |
+---------+------------+---------+----------+
| 1       | 1          | 101     | 10       |
| 2       | 3          | 101     | 7        |
| 3       | 1          | 102     | 9        |
| 4       | 2          | 102     | 6        |
| 5       | 3          | 102     | 10       |
| 6       | 1          | 102     | 6        |
+---------+------------+---------+----------+
Product table:
+------------+-------+
| product_id | price |
+------------+-------+
| 1          | 10    |
| 2          | 25    |
| 3          | 15    |
+------------+-------+
Output: 
+---------+------------+
| user_id | product_id |
+---------+------------+
| 101     | 3          |
| 102     | 1          |
| 102     | 2          |
| 102     | 3          |
+---------+------------+ 
Explanation: User 101:
                 - Spent 10 * 10 = 100 on product 1.
                 - Spent 7 * 15 = 105 on product 3.
             User 101 spent the most money on product 3.
             User 102:
                 - Spent (9 + 7) * 10 = 150 on product 1.
                 - Spent 6 * 25 = 150 on product 2.
                 - Spent 10 * 15 = 150 on product 3.
             User 102 spent the most money on products 1, 2, and 3.*/

SELECT 
    user_id, 
    product_id
FROM (SELECT 
        user_id, 
        product_id, 
        RANK() OVER (PARTITION BY user_id ORDER BY SUM(price * quantity) DESC) AS rnk 
      FROM Sales JOIN Product USING (product_id) 
      GROUP BY 1, 2) a 
WHERE rnk = 1


/*2329. Product Sales Analysis V (Easy)
SQL Schema
Table: Sales
+-------------+-------+
| Column Name | Type  |
+-------------+-------+
| sale_id     | int   |
| product_id  | int   |
| user_id     | int   |
| quantity    | int   |
+-------------+-------+
sale_id is the primary key of this table. product_id is a foreign key to 
Product table. Each row of this table shows the ID of the product and the 
quantity purchased by a user.

Table: Product
+-------------+------+
| Column Name | Type |
+-------------+------+
| product_id  | int  |
| price       | int  |
+-------------+------+
product_id is the primary key of this table. Each row of this table indicates 
the price of each product.

Write an SQL query that reports the spending of each user. Return the resulting 
table ordered by spending in descending order. In case of a tie, order them by 
user_id in ascending order. The query result format is in the following example.
 
Example 1:
Input:  Sales table:                                   Product table:
        +---------+------------+---------+----------+  +------------+-------+
        | sale_id | product_id | user_id | quantity |  | product_id | price |
        +---------+------------+---------+----------+  +------------+-------+
        | 1       | 1          | 101     | 10       |  | 1          | 10    |
        | 2       | 2          | 101     | 1        |  | 2          | 25    |
        | 3       | 3          | 102     | 3        |  | 3          | 15    |
        | 4       | 3          | 102     | 2        |  +------------+-------+
        | 5       | 2          | 103     | 3        |
        +---------+------------+---------+----------+
Output: +---------+----------+
        | user_id | spending |
        +---------+----------+
        | 101     | 125      |
        | 102     | 75       |
        | 103     | 75       |
        +---------+----------+
Explanation: User 101 spent 10 * 10 + 1 * 25 = 125.
             User 102 spent 3 * 15 + 2 * 15 = 75.
             User 103 spent 3 * 25 = 75.
             Users 102 and 103 spent the same amount and we break the tie by 
             their ID while user 101 is on the top.*/

SELECT user_id, SUM(price * quantity) AS spending
FROM Sales LEFT JOIN Product USING (product_id)
GROUP BY user_id
ORDER BY 2 DESC, 1 ASC


/*2339. All the Matches of the League (Easy)
SQL Schema
Table: Teams
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| team_name   | varchar |
+-------------+---------+
team_name is the primary key of this table. Each row of this table shows the 
name of a team.

Write an SQL query that reports all the possible matches of the league. Note 
that every two teams play two matches with each other, with one team being the 
home_team once and the other time being the away_team. Return the result table 
in any order. The query result format is in the following example.

Example 1:
Input:  Teams table:
        +-------------+
        | team_name   |
        +-------------+
        | Leetcode FC |
        | Ahly SC     |
        | Real Madrid |
        +-------------+
Output: +-------------+-------------+
        | home_team   | away_team   |
        +-------------+-------------+
        | Real Madrid | Leetcode FC |
        | Real Madrid | Ahly SC     |
        | Leetcode FC | Real Madrid |
        | Leetcode FC | Ahly SC     |
        | Ahly SC     | Real Madrid |
        | Ahly SC     | Leetcode FC |
        +-------------+-------------+
Explanation: All the matches of the league are shown in the table.*/

SELECT a.team_name AS home_team, b.team_name AS away_team
FROM Teams AS a CROSS JOIN Teams AS b
WHERE a.team_name != b.team_name


/*2346. Compute the Rank as a Percentage (Medium)
SQL Schema
Table: Students
+---------------+------+
| Column Name   | Type |
+---------------+------+
| student_id    | int  |
| department_id | int  |
| mark          | int  |
+---------------+------+
student_id is the primary key of this table. Each row of this table indicates a 
student's ID, the ID of the department in which the student enrolled, and their 
mark in the exam.

Write an SQL query that reports the rank of each student in their department as 
a percentage, where the rank as a percentage is computed using the following 
formula: (student_rank_in_the_department - 1) * 100 / (the_number_of_students_in_the_department - 1). 
The percentage should be rounded to 2 decimal places. student_rank_in_the_department 
is determined by descending mark, such that the student with the highest mark 
is rank 1. If two students get the same mark, they also get the same rank. 
Return the result table in any order. The query result format is in the 
following example.

Example 1:
Input: 
Students table:
+------------+---------------+------+
| student_id | department_id | mark |
+------------+---------------+------+
| 2          | 2             | 650  |
| 8          | 2             | 650  |
| 7          | 1             | 920  |
| 1          | 1             | 610  |
| 3          | 1             | 530  |
+------------+---------------+------+
Output: 
+------------+---------------+------------+
| student_id | department_id | percentage |
+------------+---------------+------------+
| 7          | 1             | 0.0        |
| 1          | 1             | 50.0       |
| 3          | 1             | 100.0      |
| 2          | 2             | 0.0        |
| 8          | 2             | 0.0        |
+------------+---------------+------------+
Explanation: For Department 1:
              - Student 7: percentage = (1 - 1) * 100 / (3 - 1) = 0.0
              - Student 1: percentage = (2 - 1) * 100 / (3 - 1) = 50.0
              - Student 3: percentage = (3 - 1) * 100 / (3 - 1) = 100.0
             For Department 2:
              - Student 2: percentage = (1 - 1) * 100 / (2 - 1) = 0.0
              - Student 8: percentage = (1 - 1) * 100 / (2 - 1) = 0.0*/

SELECT 
    student_id, 
    department_id, 
    ROUND(100*PERCENT_RANK() OVER (
        PARTITION BY department_id
        ORDER BY mark DESC), 2) AS percentage
FROM Students

/*2356. Number of Unique Subjects Taught by Each Teacher (Easy)
SQL Schema
Table: Teacher
+-------------+------+
| Column Name | Type |
+-------------+------+
| teacher_id  | int  |
| subject_id  | int  |
| dept_id     | int  |
+-------------+------+
(subject_id, dept_id) is the primary key for this table. Each row in this table 
indicates that the teacher with teacher_id teaches the subject subject_id in 
the department dept_id.

Write an SQL query to report the number of unique subjects each teacher teaches 
in the university. Return the result table in any order. The query result 
format is shown in the following example.

Example 1:
Input:  Teacher table:
        +------------+------------+---------+
        | teacher_id | subject_id | dept_id |
        +------------+------------+---------+
        | 1          | 2          | 3       |
        | 1          | 2          | 4       |
        | 1          | 3          | 3       |
        | 2          | 1          | 1       |
        | 2          | 2          | 1       |
        | 2          | 3          | 1       |
        | 2          | 4          | 1       |
        +------------+------------+---------+
Output: +------------+-----+
        | teacher_id | cnt |
        +------------+-----+
        | 1          | 2   |
        | 2          | 4   |
        +------------+-----+
Explanation: Teacher 1:
             - They teach subject 2 in departments 3 and 4.
             - They teach subject 3 in department 3.
             Teacher 2:
             - They teach subject 1 in department 1.
             - They teach subject 2 in department 1.
             - They teach subject 3 in department 1.
             - They teach subject 4 in department 1.*/

SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt
FROM Teacher
GROUP BY teacher_id


/*2362. Generate the Invoice (Hard)
SQL Schema
Table: Products
+-------------+------+
| Column Name | Type |
+-------------+------+
| product_id  | int  |
| price       | int  |
+-------------+------+
product_id is the primary key for this table. Each row in this table shows the 
ID of a product and the price of one unit.

Table: Purchases
+-------------+------+
| Column Name | Type |
+-------------+------+
| invoice_id  | int  |
| product_id  | int  |
| quantity    | int  |
+-------------+------+
(invoice_id, product_id) is the primary key for this table. Each row in this 
table shows the quantity ordered from one product in an invoice. 

Write an SQL query to show the details of the invoice with the highest price. 
If two or more invoices have the same price, return the details of the one with 
the smallest invoice_id. Return the result table in any order. The query result 
format is shown in the following example.

Example 1:
Input: 
Products table:
+------------+-------+
| product_id | price |
+------------+-------+
| 1          | 100   |
| 2          | 200   |
+------------+-------+
Purchases table:
+------------+------------+----------+
| invoice_id | product_id | quantity |
+------------+------------+----------+
| 1          | 1          | 2        |
| 3          | 2          | 1        |
| 2          | 2          | 3        |
| 2          | 1          | 4        |
| 4          | 1          | 10       |
+------------+------------+----------+
Output: 
+------------+----------+-------+
| product_id | quantity | price |
+------------+----------+-------+
| 2          | 3        | 600   |
| 1          | 4        | 400   |
+------------+----------+-------+
Explanation: Invoice 1: price = (2 * 100) = $200
             Invoice 2: price = (4 * 100) + (3 * 200) = $1000
             Invoice 3: price = (1 * 200) = $200
             Invoice 4: price = (10 * 100) = $1000
The highest price is $1000, and the invoices with the highest prices are 2 and 
4. We return the details of the one with the smallest ID, which is invoice 2.*/

WITH Cte AS (
    SELECT 
        invoice_id, 
        product_id, 
        quantity, 
        price
    FROM Products JOIN Purchases USING (product_id)
)
SELECT 
    product_id, 
    quantity, 
    price*quantity AS price
FROM Cte JOIN (SELECT invoice_id, SUM(price * quantity) AS total 
               FROM Cte 
               GROUP BY invoice_id 
               ORDER BY 2 DESC, 1 ASC LIMIT 1) a USING (invoice_id)


/*2372. Calculate the Influence of Each Salesperson (Medium)
SQL Schema
Table: Salesperson
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| salesperson_id | int     |
| name           | varchar |
+----------------+---------+
salesperson_id is the primary key for this table. Each row in this table shows 
the ID of a salesperson.

Table: Customer
+----------------+------+
| Column Name    | Type |
+----------------+------+
| customer_id    | int  |
| salesperson_id | int  |
+----------------+------+
customer_id is the primary key for this table. salesperson_id is a foreign key 
from the Salesperson table. Each row in this table shows the ID of a customer 
and the ID of the salesperson. 

Table: Sales
+-------------+------+
| Column Name | Type |
+-------------+------+
| sale_id     | int  |
| customer_id | int  |
| price       | int  |
+-------------+------+
sale_id is the primary key for this table. customer_id is a foreign key from 
the Customer table. Each row in this table shows ID of a customer and the price 
they paid for the sale with sale_id.

Write an SQL query to report the sum of prices paid by the customers of each 
salesperson. If a salesperson does not have any customers, the total value 
should be 0. Return the result table in any order. The query result format is 
shown in the following example.

Example 1:
Input: 
Salesperson table:
+----------------+-------+
| salesperson_id | name  |
+----------------+-------+
| 1              | Alice |
| 2              | Bob   |
| 3              | Jerry |
+----------------+-------+
Customer table:
+-------------+----------------+
| customer_id | salesperson_id |
+-------------+----------------+
| 1           | 1              |
| 2           | 1              |
| 3           | 2              |
+-------------+----------------+
Sales table:
+---------+-------------+-------+
| sale_id | customer_id | price |
+---------+-------------+-------+
| 1       | 2           | 892   |
| 2       | 1           | 354   |
| 3       | 3           | 988   |
| 4       | 3           | 856   |
+---------+-------------+-------+
Output: 
+----------------+-------+-------+
| salesperson_id | name  | total |
+----------------+-------+-------+
| 1              | Alice | 1246  |
| 2              | Bob   | 1844  |
| 3              | Jerry | 0     |
+----------------+-------+-------+
Explanation: Alice is the salesperson for customers 1 and 2.
               - Customer 1 made one purchase with 354.
               - Customer 2 made one purchase with 892.
             The total for Alice is 354 + 892 = 1246.
             
             Bob is the salesperson for customers 3.
               - Customer 1 made one purchase with 988 and 856.
             The total for Bob is 988 + 856 = 1844.
             
             Jerry is not the salesperson of any customer.
             The total for Jerry is 0.*/

SELECT 
    salesperson_id, 
    name, 
    COALESCE(SUM(price), 0) AS total
FROM 
    Salesperson 
    LEFT JOIN Customer USING (salesperson_id)
    LEFT JOIN Sales USING (customer_id)
GROUP BY 1


/*2377. Sort the Olympic Table (Easy)
SQL Schema
Table: Olympic
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| country       | varchar |
| gold_medals   | int     |
| silver_medals | int     |
| bronze_medals | int     |
+---------------+---------+
country is the primary key for this table. Each row in this table shows a 
country name and the number of gold, silver, and bronze medals it won in the 
Olympic games.

The Olympic table is sorted according to the following rules:
* The country with more gold medals comes first.
* If there is a tie in the gold medals, the country with more silver medals 
  comes first.
* If there is a tie in the silver medals, the country with more bronze medals 
  comes first.
* If there is a tie in the bronze medals, the countries with the tie are sorted 
  in ascending order lexicographically.
Write an SQL query to sort the Olympic table. The query result format is shown 
in the following example.

Example 1:
Input:  Olympic table: 
        +-------------+-------------+---------------+---------------+
        | country     | gold_medals | silver_medals | bronze_medals |
        +-------------+-------------+---------------+---------------+
        | China       | 10          | 10            | 20            |
        | South Sudan | 0           | 0             | 1             |
        | USA         | 10          | 10            | 20            |
        | Israel      | 2           | 2             | 3             |
        | Egypt       | 2           | 2             | 2             |
        +-------------+-------------+---------------+---------------+
Output: +-------------+-------------+---------------+---------------+
        | country     | gold_medals | silver_medals | bronze_medals |
        +-------------+-------------+---------------+---------------+
        | China       | 10          | 10            | 20            |
        | USA         | 10          | 10            | 20            |
        | Israel      | 2           | 2             | 3             |
        | Egypt       | 2           | 2             | 2             |
        | South Sudan | 0           | 0             | 1             |
        +-------------+-------------+---------------+---------------+
Explanation: The tie between China and USA is broken by their lexicographical 
             names. Since "China" is lexicographically smaller than "USA", it 
             comes first. Israel comes before Egypt because it has more bronze 
             medals.*/

SELECT country, gold_medals, silver_medals, bronze_medals
FROM Olympic
ORDER BY 2 DESC, 3 DESC, 4 DESC, 1 ASC


/*2388. Change Null Values in a Table to the Previous Value (Medium)
SQL Schema
Table: CoffeeShop
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| drink       | varchar |
+-------------+---------+
id is the primary key for this table. Each row in this table shows the order id 
and the name of the drink ordered. Some drink rows are nulls. 

Write an SQL query to replace the null values of drink with the name of the 
drink of the previous row that is not null. It is guaranteed that the drink of 
the first row of the table is not null. Return the result table in the same 
order as the input. The query result format is shown in the following example.

Example 1:
Input: 
CoffeeShop table:
+----+------------------+
| id | drink            |
+----+------------------+
| 9  | Mezcal Margarita |
| 6  | null             |
| 7  | null             |
| 3  | Americano        |
| 1  | Daiquiri         |
| 2  | null             |
+----+------------------+
Output: 
+----+------------------+
| id | drink            |
+----+------------------+
| 9  | Mezcal Margarita |
| 6  | Mezcal Margarita |
| 7  | Mezcal Margarita |
| 3  | Americano        |
| 1  | Daiquiri         |
| 2  | Daiquiri         |
+----+------------------+
Explanation: For ID 6, the previous value that is not null is from ID 9. We 
                       replace the null with "Mezcal Margarita".
             For ID 7, the previous value that is not null is from ID 9. We 
                       replace the null with "Mezcal Margarita".
             For ID 2, the previous value that is not null is from ID 1. We 
                       replace the null with "Daiquiri".
             Note that the rows in the output are the same as in the input.*/

WITH Cte AS (
SELECT 
    id, 
    IFNULL(drink, @prev) AS drink, 
    @prev := IFNULL(drink, @prev) AS prev
FROM (SELECT @prev := null) as init, Coffeeshop AS c
)
SELECT 
    id, 
    drink 
FROM Cte


/*2394. Employees With Deductions (Medium)
SQL Schema
Table: Employees
+--------------+------+
| Column Name  | Type |
+--------------+------+
| employee_id  | int  |
| needed_hours | int  |
+--------------+------+
employee_id is the primary key for this table. Each row contains the id of an 
employee and the minimum number of hours needed for them to work to get their 
salary.

Table: Logs
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| employee_id | int      |
| in_time     | datetime |
| out_time    | datetime |
+-------------+----------+
(employee_id, in_time, out_time) is the primary key for this table. Each row of 
this table shows the time stamps for an employee. in_time is the time the 
employee started to work, and out_time is the time the employee ended work. All 
the times are in October 2022. out_time can be one day after in_time which 
means the employee worked after the midnight.

In a company, each employee must work a certain number of hours every month. 
Employees work in sessions. The number of hours an employee worked can be 
calculated from the sum of the number of minutes the employee worked in all of 
their sessions. The number of minutes in each session is rounded up. For 
example, if the employee worked for 51 minutes and 2 seconds in a session, we 
consider it 52 minutes. Write an SQL query to report the IDs of the employees 
that will be deducted. In other words, report the IDs of the employees that did 
not work the needed hours. Return the result table in any order. The query 
result format is in the following example.

Example 1:
Input: 
Employees table:
+-------------+--------------+
| employee_id | needed_hours |
+-------------+--------------+
| 1           | 20           |
| 2           | 12           |
| 3           | 2            |
+-------------+--------------+
Logs table:
+-------------+---------------------+---------------------+
| employee_id | in_time             | out_time            |
+-------------+---------------------+---------------------+
| 1           | 2022-10-01 09:00:00 | 2022-10-01 17:00:00 |
| 1           | 2022-10-06 09:05:04 | 2022-10-06 17:09:03 |
| 1           | 2022-10-12 23:00:00 | 2022-10-13 03:00:01 |
| 2           | 2022-10-29 12:00:00 | 2022-10-29 23:58:58 |
+-------------+---------------------+---------------------+
Output: 
+-------------+
| employee_id |
+-------------+
| 2           |
| 3           |
+-------------+
Explanation: 
Employee 1:
 - Worked for three sessions:
    - On 2022-10-01, they worked for 8 hours.
    - On 2022-10-06, they worked for 8 hours and 4 minutes.
    - On 2022-10-12, they worked for 4 hours and 1 minute. Note that they 
      worked through midnight.
 - Employee 1 worked a total of 20 hours and 5 minutes across sessions and will 
   not be deducted.
Employee 2:
 - Worked for one session:
    - On 2022-10-29, they worked for 11 hours and 59 minutes.
 - Employee 2 did not work their hours and will be deducted.
Employee 3:
 - Did not work any session.
 - Employee 3 did not work their hours and will be deducted.*/

SELECT 
    employee_id
FROM 
    Employees LEFT JOIN Logs USING (employee_id)
GROUP BY 
    1, 
    needed_hours
HAVING SUM(CEIL(IFNULL(TIMESTAMPDIFF(SECOND, in_time, out_time), 0)/60)/60) < needed_hours


/*2474. Customers With Strictly Increasing Purchases (Hard)
SQL Schema
Table: Orders
+--------------+------+
| Column Name  | Type |
+--------------+------+
| order_id     | int  |
| customer_id  | int  |
| order_date   | date |
| price        | int  |
+--------------+------+
order_id is the primary key for this table. Each row contains the id of an 
order, the id of customer that ordered it, the date of the order, and its price.

Write an SQL query to report the IDs of the customers with the total purchases 
strictly increasing yearly. The total purchases of a customer in one year is 
the sum of the prices of their orders in that year. If for some year the 
customer did not make any order, we consider the total purchases 0. The first 
year to consider for each customer is the year of their first order. The last 
year to consider for each customer is the year of their last order. Return the 
result table in any order. The query result format is in the following example.

Example 1:
Input: 
Orders table:
+----------+-------------+------------+-------+
| order_id | customer_id | order_date | price |
+----------+-------------+------------+-------+
| 1        | 1           | 2019-07-01 | 1100  |
| 2        | 1           | 2019-11-01 | 1200  |
| 3        | 1           | 2020-05-26 | 3000  |
| 4        | 1           | 2021-08-31 | 3100  |
| 5        | 1           | 2022-12-07 | 4700  |
| 6        | 2           | 2015-01-01 | 700   |
| 7        | 2           | 2017-11-07 | 1000  |
| 8        | 3           | 2017-01-01 | 900   |
| 9        | 3           | 2018-11-07 | 900   |
+----------+-------------+------------+-------+
Output: 
+-------------+
| customer_id |
+-------------+
| 1           |
+-------------+
Explanation: Customer 1: The first year is 2019 and the last year is 2022
               - 2019: 1100 + 1200 = 2300
               - 2020: 3000
               - 2021: 3100
               - 2022: 4700
               We can see that the total purchases are strictly increasing 
               yearly, so we include customer 1 in the answer.
         
             Customer 2: The first year is 2015 and the last year is 2017
               - 2015: 700
               - 2016: 0
               - 2017: 1000
               We do not include customer 2 in the answer because the total 
               purchases are not strictly increasing. Note that customer 2 did 
               not make any purchases in 2016.
         
             Customer 3: The first year is 2017, and the last year is 2018
               - 2017: 900
               - 2018: 900
               We can see that the total purchases are strictly increasing 
               yearly, so we include customer 1 in the answer.*/

WITH Yearly AS (
    SELECT 
        customer_id, 
        YEAR(order_date) AS yr, 
        SUM(price) AS total 
    FROM Orders
    GROUP BY 1, 2
)
SELECT a.customer_id
FROM 
    Yearly a 
    LEFT JOIN Yearly b ON a.customer_id = b.customer_id AND a.yr+1 = b.yr
GROUP BY a.customer_id 
HAVING SUM(a.total >= IFNULL(b.total, 0)) = 1


/*2480. Form a Chemical Bond (Easy)
SQL Schema
Table: Elements
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| symbol      | varchar |
| type        | enum    |
| electrons   | int     |
+-------------+---------+
symbol is the primary key for this table. Each row of this table contains 
information of one element. type is an ENUM of type ('Metal', 'Nonmetal', 
'Noble')
 - If type is Noble, electrons is 0.
 - If type is Metal, electrons is the number of electrons that one atom of this 
   element can give.
 - If type is Nonmetal, electrons is the number of electrons that one atom of 
   this element needs.
Two elements can form a bond if one of them is 'Metal' and the other is 
'Nonmetal'.

Write an SQL query to find all the pairs of elements that can form a bond. 
Return the result table in any order. The query result format is in the 
following example.

Example 1:
Input: 
Elements table:
+--------+----------+-----------+
| symbol | type     | electrons |
+--------+----------+-----------+
| He     | Noble    | 0         |
| Na     | Metal    | 1         |
| Ca     | Metal    | 2         |
| La     | Metal    | 3         |
| Cl     | Nonmetal | 1         |
| O      | Nonmetal | 2         |
| N      | Nonmetal | 3         |
+--------+----------+-----------+
Output: 
+-------+----------+
| metal | nonmetal |
+-------+----------+
| La    | Cl       |
| Ca    | Cl       |
| Na    | Cl       |
| La    | O        |
| Ca    | O        |
| Na    | O        |
| La    | N        |
| Ca    | N        |
| Na    | N        |
+-------+----------+
Explanation: Metal elements are La, Ca, and Na. Nonmeal elements are Cl, O, and 
             N. Each Metal element pairs with a Nonmetal element in the output 
             table.*/

SELECT 
    a.symbol AS metal, 
    b.symbol AS nonmetal 
FROM Elements a, Elements b 
WHERE a.type = "Metal" AND b.type = "Nonmetal"


/*2504. Concatenate the Name and the Profession (Easy)
SQL Schema
Table: Person
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| person_id   | int     |
| name        | varchar |
| profession  | ENUM    |
+-------------+---------+
person_id is the primary key for this table. Each row in this table contains a 
person's ID, name, and profession. The profession   column in an enum of the 
type ('Doctor', 'Singer', 'Actor', 'Player', 'Engineer', or 'Lawyer')

Write an SQL query to report each person's name followed by the first letter of 
their profession enclosed in parentheses. Return the result table ordered by 
person_id in descending order. The query result format is shown in the 
following example.

Example 1:
Input: 
Person table:
+-----------+-------+------------+
| person_id | name  | profession |
+-----------+-------+------------+
| 1         | Alex  | Singer     |
| 3         | Alice | Actor      |
| 2         | Bob   | Player     |
| 4         | Messi | Doctor     |
| 6         | Tyson | Engineer   |
| 5         | Meir  | Lawyer     |
+-----------+-------+------------+
Output: 
+-----------+----------+
| person_id | name     |
+-----------+----------+
| 6         | Tyson(E) |
| 5         | Meir(L)  |
| 4         | Messi(D) |
| 3         | Alice(A) |
| 2         | Bob(P)   |
| 1         | Alex(S)  |
+-----------+----------+
Explanation: Note that there should not be any white space between the name and 
             the first letter of the profession.*/

SELECT 
    person_id, 
    CONCAT(name, "(", LEFT(profession, 1), ")") AS name
FROM Person
ORDER BY 1 DESC


/*2668. Find Latest Salaries (Easy)
SQL Schema
Table: Salary
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| emp_id        | int     |
| firstname     | varchar |
| lastname      | varchar |
| salary        | varchar |
| department_id | varchar |
+---------------+---------+
(emp_id, salary) is the primary key (combination of columns with unique values)
for this table. Each row contains employees details and their yearly salaries,
however, some of the records are old and contain outdated salary information.
Write a solution to find the current salary of each employee assuming that
salaries increase each year. Output their emp_id, firstname, lastname, salary,
and department_id. Return the result table ordered by emp_id in ascending order.
The result format is in the following example.

Example 1:
Input:
Salary table:
+--------+-----------+----------+--------+---------------+
| emp_id | firstname | lastname | salary | department_id |
+--------+-----------+----------+--------+---------------+
| 1      | Todd      | Wilson   | 110000 | D1006         |
| 1      | Todd      | Wilson   | 106119 | D1006         |
| 2      | Justin    | Simon    | 128922 | D1005         |
| 2      | Justin    | Simon    | 130000 | D1005         |
| 3      | Kelly     | Rosario  | 42689  | D1002         |
| 4      | Patricia  | Powell   | 162825 | D1004         |
| 4      | Patricia  | Powell   | 170000 | D1004         |
| 5      | Sherry    | Golden   | 44101  | D1002         |
| 6      | Natasha   | Swanson  | 79632  | D1005         |
| 6      | Natasha   | Swanson  | 90000  | D1005         |
+--------+-----------+----------+--------+---------------+
Output:
+--------+-----------+----------+--------+---------------+
| emp_id | firstname | lastname | salary | department_id |
+--------+-----------+----------+--------+---------------+
| 1      | Todd      | Wilson   | 110000 | D1006         |
| 2      | Justin    | Simon    | 130000 | D1005         |
| 3      | Kelly     | Rosario  | 42689  | D1002         |
| 4      | Patricia  | Powell   | 170000 | D1004         |
| 5      | Sherry    | Golden   | 44101  | D1002         |
| 6      | Natasha   | Swanson  | 90000  | D1005         |
+--------+-----------+----------+--------+---------------+

Explanation:
- emp_id 1 has two records with a salary of 110000, 106119 out of these 110000
  is an updated salary (Assuming salary is increasing each year)
- emp_id 2 has two records with a salary of 128922, 130000 out of these 130000
  is an updated salary.
- emp_id 3 has only one salary record so that is already an updated salary.
- emp_id 4 has two records with a salary of 162825, 170000 out of these 170000
  is an updated salary.
- emp_id 5 has only one salary record so that is already an updated salary.
- emp_id 6 has two records with a salary of 79632, 90000 out of these 90000 is
  an updated salary.*/

  SELECT DISTINCT
      emp_id,
      firstname,
      lastname,
      MAX(salary) OVER (PARTITION BY emp_id) salary,
      department_id
  FROM Salary


/*2669. Count Artist Occurrences On Spotify Ranking List (Easy)
SQL Schema
Table: Spotify
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| track_name  | varchar |
| artist      | varchar |
+-------------+---------+
id is the primary key (column with unique values) for this table. Each row
contains an id, track_name, and artist. Write a solution to find how many times
each artist appeared on the Spotify ranking list. Return the result table having
the artist's name along with the corresponding number of occurrences ordered by
occurrence count in descending order. If the occurrences are equal, then it’s
ordered by the artist’s name in ascending order. The result format is in the
following example.

Example 1:
Input:
Spotify table:
+---------+--------------------+------------+
| id      | track_name         | artist     |
+---------+--------------------+------------+
| 303651  | Heart Won't Forget | Sia        |
| 1046089 | Shape of you       | Ed Sheeran |
| 33445   | I'm the one        | DJ Khalid  |
| 811266  | Young Dumb & Broke | DJ Khalid  |
| 505727  | Happier            | Ed Sheeran |
+---------+--------------------+------------+
Output:
+------------+-------------+
| artist     | occurrences |
+------------+-------------+
| DJ Khalid  | 2           |
| Ed Sheeran | 2           |
| Sia        | 1           |
+------------+-------------+

Explanation: The count of occurrences is listed in descending order under the
             column name "occurrences". If the number of occurrences is the
             same, the artist's names are sorted in ascending order.*/

SELECT
    artist,
    COUNT(*) AS occurrences
FROM
    Spotify
GROUP BY 1
ORDER BY 2 DESC, 1 ASC


/*2686. Immediate Food Delivery III (Medium)
Table: Delivery
+-----------------------------+---------+
| Column Name                 | Type    |
+-----------------------------+---------+
| delivery_id                 | int     |
| customer_id                 | int     |
| order_date                  | date    |
| customer_pref_delivery_date | date    |
+-----------------------------+---------+
delivery_id is the column with unique values of this table. Each row contains
information about food delivery to a customer that makes an order at some date
and specifies a preferred delivery date (on the order date or after it). If the
customer's preferred delivery date is the same as the order date, then the order
is called immediate, otherwise, it is scheduled. Write a solution to find the
percentage of immediate orders on each unique order_date, rounded to 2 decimal
places. Return the result table ordered by order_date in ascending order. The
result format is in the following example.

Example 1:
Input:
Delivery table:
+-------------+-------------+------------+-----------------------------+
| delivery_id | customer_id | order_date | customer_pref_delivery_date |
+-------------+-------------+------------+-----------------------------+
| 1           | 1           | 2019-08-01 | 2019-08-02                  |
| 2           | 2           | 2019-08-01 | 2019-08-01                  |
| 3           | 1           | 2019-08-01 | 2019-08-01                  |
| 4           | 3           | 2019-08-02 | 2019-08-13                  |
| 5           | 3           | 2019-08-02 | 2019-08-02                  |
| 6           | 2           | 2019-08-02 | 2019-08-02                  |
| 7           | 4           | 2019-08-03 | 2019-08-03                  |
| 8           | 1           | 2019-08-03 | 2019-08-03                  |
| 9           | 5           | 2019-08-04 | 2019-08-08                  |
| 10          | 2           | 2019-08-04 | 2019-08-18                  |
+-------------+-------------+------------+-----------------------------+
Output:
+------------+----------------------+
| order_date | immediate_percentage |
+------------+----------------------+
| 2019-08-01 | 66.67                |
| 2019-08-02 | 66.67                |
| 2019-08-03 | 100.00               |
| 2019-08-04 | 0.00                 |
+------------+----------------------+
Explanation:
- On 2019-08-01 there were three orders, out of those, two were immediate and
  one was scheduled. So, immediate percentage for that date was 66.67.
- On 2019-08-02 there were three orders, out of those, two were immediate and
  one was scheduled. So, immediate percentage for that date was 66.67.
- On 2019-08-03 there were two orders, both were immediate. So, the immediate
  percentage for that date was 100.00.
- On 2019-08-04 there were two orders, both were scheduled. So, the immediate
  percentage for that date was 0.00.
order_date is sorted in ascending order.*/

SELECT
    order_date,
    ROUND(AVG(order_date = customer_pref_delivery_date)*100, 2) AS immediate_percentage
FROM Delivery
GROUP BY 1
ORDER BY 1


/*2687. Bikes Last Time Used (Easy)
SQL Schema
Table: Bikes
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| ride_id     | int      |
| bike_number | int      |
| start_time  | datetime |
| end_time    | datetime |
+-------------+----------+
ride_id column contains unique values. Each row contains a ride information that
includes ride_id, bike number, start and end time of the ride. Write a solution
to find the last time when each bike was used. Return the result table ordered
by the bikes that were most recently used. The result format is in the following
example.

Example 1:
Input:
Bikes table:
+---------+-------------+---------------------+---------------------+
| ride_id | bike_number | start_time          | end_time            |
+---------+-------------+---------------------+---------------------+
| 1       | W00576      | 2012-03-25 11:30:00 | 2012-03-25 12:40:00 |
| 2       | W00300      | 2012-03-25 10:30:00 | 2012-03-25 10:50:00 |
| 3       | W00455      | 2012-03-26 14:30:00 | 2012-03-26 17:40:00 |
| 4       | W00455      | 2012-03-25 12:30:00 | 2012-03-25 13:40:00 |
| 5       | W00576      | 2012-03-25 08:10:00 | 2012-03-25 09:10:00 |
| 6       | W00576      | 2012-03-28 02:30:00 | 2012-03-28 02:50:00 |
+---------+-------------+---------------------+---------------------+

Output:
+-------------+---------------------+
| bike_number | end_time            |
+-------------+---------------------+
| W00576      | 2012-03-28 02:50:00 |
| W00455      | 2012-03-26 17:40:00 |
| W00300      | 2012-03-25 10:50:00 |
+-------------+---------------------+
Explanation:
- bike with number W00576 has three rides, out of that, most recent ride is with
  ride_id 6 which ended on 2012-03-28 02:50:00.
- bike with number W00300 has only 1 ride so we will include end_time in output
  directly.
- bike with number W00455 has two rides, out of that, most recent ride is with
  ride_id 3 which ended on 2012-03-26 17:40:00.
- Returning output in order by the bike that were most recently used.*/

SELECT
    bike_number,
    MAX(end_time) AS end_time
FROM
    Bikes
GROUP BY 1
ORDER BY 2 DESC


/*2738. Count Occurrences in Text (Medium)
SQL Schema
Table: Files
+-------------+---------+
| Column Name | Type    |
+-- ----------+---------+
| file_name   | varchar |
| content     | text    |
+-------------+---------+
file_name is the column with unique values of this table. Each row contains
file_name and the content of that file. Write a solution to find the number of
files that have at least one occurrence of the words 'bull' and 'bear' as a
standalone word, respectively, disregarding any instances where it appears
without space on either side (e.g. 'bullet', 'bears', 'bull.', or 'bear' at the
beginning or end of a sentence will not be considered). Return the word 'bull'
and 'bear' along with the corresponding number of occurrences in any order. The
result format is in the following example.

Example 1:
Input:
Files table:
+------------+----------------------------------------------------------------------------------+
| file_name  | content                                                                          |
+------------+----------------------------------------------------------------------------------+
| draft1.txt | The stock exchange predicts a bull market which would make many investors happy. |
| draft2.txt | The stock exchange predicts a bull market which would make many investors happy, |
|            | but analysts warn of possibility of too much optimism and that in fact we are    |
|            | awaiting a bear market.                                                          |
| draft3.txt | The stock exchange predicts a bull market which would make many investors happy, |
|            | but analysts warn of possibility of too much optimism and that in fact we are    |
|            | awaiting a bear market. As always predicting the future market is an uncertain   |
|            | game and all investors should follow their instincts and best practices.         |
+------------+----------------------------------------------------------------------------------+
Output:
+------+-------+
| word | count |
+------+-------+
| bull | 3     |
| bear | 2     |
+------+-------+
Explanation:
- The word "bull" appears 1 time in "draft1.txt", 1 time in "draft2.txt", and 1
  time in "draft3.txt". Therefore, the total number of occurrences for the word
  "bull" is 3.
- The word "bear" appears 1 time in "draft2.txt", and 1 time in "draft3.txt".
  Therefore, the total number of occurrences for the word "bear" is 2.*/

SELECT
    "bull" AS word,
    COUNT(*) AS count
FROM Files
WHERE content LIKE '% bull %'
UNION
SELECT
    "bear" AS word,
    COUNT(*) AS count
FROM Files
WHERE content LIKE '% bear %'


/*2837. Total Traveled Distance (Easy)
SQL Schema
Table: Users
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| user_id     | int     |
| name        | varchar |
+-------------+---------+
user_id is the column with unique values for this table. Each row of this table
contains user id and name.

Table: Rides
+--------------+------+
| Column Name  | Type |
+--------------+------+
| ride_id      | int  |
| user_id      | int  |
| distance     | int  |
+--------------+------+
ride_id is the column of unique values for this table. Each row of this table
contains ride id, user id, and traveled distance. Write a solution to calculate
the distance traveled by each user. If there is a user who hasn't completed any
rides, then their distance should be considered as 0. Output the user_id, name
and total traveled distance. Return the result table ordered by user_id in
ascending order. The result format is in the following example.

Example 1:
Input:
Users table:
+---------+---------+
| user_id | name    |
+---------+---------+
| 17      | Addison |
| 14      | Ethan   |
| 4       | Michael |
| 2       | Avery   |
| 10      | Eleanor |
+---------+---------+
Rides table:
+---------+---------+----------+
| ride_id | user_id | distance |
+---------+---------+----------+
| 72      | 17      | 160      |
| 42      | 14      | 161      |
| 45      | 4       | 59       |
| 32      | 2       | 197      |
| 15      | 4       | 357      |
| 56      | 2       | 196      |
| 10      | 14      | 25       |
+---------+---------+----------+
Output:
+---------+---------+-------------------+
| user_id | name    | traveled distance |
+---------+---------+-------------------+
| 2       | Avery   | 393               |
| 4       | Michael | 416               |
| 10      | Eleanor | 0                 |
| 14      | Ethan   | 186               |
| 17      | Addison | 160               |
+---------+---------+-------------------+
Explanation:
-  User id 2 completed two journeys of 197 and 196, resulting in a combined
   travel distance of 393.
-  User id 4 completed two journeys of 59 and 357, resulting in a combined
   travel distance of 416.
-  User id 14 completed two journeys of 161 and 25, resulting in a combined
   travel distance of 186.
-  User id 16 completed only one journey of 160.
-  User id 10 did not complete any journeys, thus the total travel distance
   remains at 0.
Returning the table orderd by user_id in ascending order.*/

SELECT
    user_id,
    name,
    IFNULL(SUM(distance), 0) AS "traveled distance"
FROM
    Users
    LEFT JOIN
    Rides USING (user_id)
GROUP BY 1
ORDER BY 1


/*2853. Highest Salaries Difference (Easy)
SQL Schema
Table: Salaries
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| emp_name    | varchar |
| department  | varchar |
| salary      | int     |
+-------------+---------+
(emp_name, department) is the primary key (combination of unique values) for
this table. Each row of this table contains emp_name, department and salary.
There will be at least one entry for the engineering and marketing departments.
Write a solution to calculate the difference between the highest salaries in the
marketing and engineering department. Output the absolute difference in salaries.
Return the result table. The result format is in the following example.

Example 1:
Input:
Salaries table:
+----------+-------------+--------+
| emp_name | department  | salary |
+----------+-------------+--------+
| Kathy    | Engineering | 50000  |
| Roy      | Marketing   | 30000  |
| Charles  | Engineering | 45000  |
| Jack     | Engineering | 85000  |
| Benjamin | Marketing   | 34000  |
| Anthony  | Marketing   | 42000  |
| Edward   | Engineering | 102000 |
| Terry    | Engineering | 44000  |
| Evelyn   | Marketing   | 53000  |
| Arthur   | Engineering | 32000  |
+----------+-------------+--------+
Output:
+-------------------+
| salary_difference |
+-------------------+
| 49000             |
+-------------------+
Explanation:
- The Engineering and Marketing departments have the highest salaries of 102,000
  and 53,000, respectively. Resulting in an absolute difference of 49,000.*/

  SELECT ABS(
      (SELECT MAX(salary)
       FROM Salaries
       WHERE department = "Marketing"
      )
      -
      (SELECT MAX(salary)
       FROM Salaries
       WHERE department = "Engineering"
      )
  ) AS salary_difference


/*2985. Calculate Compressed Mean (Easy)
SQL Schema
Table: Orders
+-------------------+------+
| Column Name       | Type |
+-------------------+------+
| order_id          | int  |
| item_count        | int  |
| order_occurrences | int  |
+-------------------+------+
order_id is column of unique values for this table. This table contains
order_id, item_count, and order_occurrences. Write a solution to calculate the
average number of items per order, rounded to 2 decimal places. Return the
result table in any order. The result format is in the following example.

Example 1:
Input:
Orders table:
+----------+------------+-------------------+
| order_id | item_count | order_occurrences |
+----------+------------+-------------------+
| 10       | 1          | 500               |
| 11       | 2          | 1000              |
| 12       | 3          | 800               |
| 13       | 4          | 1000              |
+----------+------------+-------------------+
Output
+-------------------------+
| average_items_per_order |
+-------------------------+
| 2.70                    |
+-------------------------+
Explanation
The calculation is as follows:
 - Total items: (1 * 500) + (2 * 1000) + (3 * 800) + (4 * 1000) = 8900
 - Total orders: 500 + 1000 + 800 + 1000 = 3300
 - Therefore, the average items per order is 8900 / 3300 = 2.70*/

 SELECT ROUND(
     SUM(item_count * order_occurrences) / SUM(order_occurrences),
     2
 ) AS average_items_per_order
 FROM Orders


/*2987. Find Expensive Cities (Easy)
SQL Schema
Table: Listings
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| listing_id  | int     |
| city        | varchar |
| price       | int     |
+-------------+---------+
listing_id is column of unique values for this table. This table contains
listing_id, city, and price. Write a solution to find cities where the average
home prices exceed the national average home price. Return the result table
sorted by city in ascending order. The result format is in the following
example.

Example 1:
Input:
Listings table:
+------------+--------------+---------+
| listing_id | city         | price   |
+------------+--------------+---------+
| 113        | LosAngeles   | 7560386 |
| 136        | SanFrancisco | 2380268 |
| 92         | Chicago      | 9833209 |
| 60         | Chicago      | 5147582 |
| 8          | Chicago      | 5274441 |
| 79         | SanFrancisco | 8372065 |
| 37         | Chicago      | 7939595 |
| 53         | LosAngeles   | 4965123 |
| 178        | SanFrancisco | 999207  |
| 51         | NewYork      | 5951718 |
| 121        | NewYork      | 2893760 |
+------------+--------------+---------+
Output
+------------+
| city       |
+------------+
| Chicago    |
| LosAngeles |
+------------+
Explanation
The national average home price is $6,122,059.45. Among the cities listed:
- Chicago has an average price of $7,043,706.75
- Los Angeles has an average price of $6,277,754.5
- San Francisco has an average price of $3,900,513.33
- New York has an average price of $4,422,739
Only Chicago and Los Angeles have average home prices exceeding the national
average. Therefore, these two cities are included in the output table. The
output table is sorted in ascending order based on the city names.*/

SELECT
    city
FROM
    Listings
GROUP BY 1
HAVING AVG(price) > (SELECT AVG(price) FROM Listings)
ORDER BY 1


/*2988. Manager of the Largest Department (Medium)
SQL Schema
Table: Employees
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| emp_id      | int     |
| emp_name    | varchar |
| dep_id      | int     |
| position    | varchar |
+-------------+---------+
emp_id is column of unique values for this table. This table contains emp_id,
emp_name, dep_id, and position. Write a solution to find the name of the manager
from the largest department. There may be multiple largest departments when the
number of employees in those departments is the same. Return the result table
sorted by dep_id in ascending order. The result format is in the following
example.

Example 1:
Input:
Employees table:
+--------+----------+--------+---------------+
| emp_id | emp_name | dep_id | position      |
+--------+----------+--------+---------------+
| 156    | Michael  | 107    | Manager       |
| 112    | Lucas    | 107    | Consultant    |
| 8      | Isabella | 101    | Manager       |
| 160    | Joseph   | 100    | Manager       |
| 80     | Aiden    | 100    | Engineer      |
| 190    | Skylar   | 100    | Freelancer    |
| 196    | Stella   | 101    | Coordinator   |
| 167    | Audrey   | 100    | Consultant    |
| 97     | Nathan   | 101    | Supervisor    |
| 128    | Ian      | 101    | Administrator |
| 81     | Ethan    | 107    | Administrator |
+--------+----------+--------+---------------+
Output
+--------------+--------+
| manager_name | dep_id |
+--------------+--------+
| Joseph       | 100    |
| Isabella     | 101    |
+--------------+--------+
Explanation
- Departments with IDs 100 and 101 each has a total of 4 employees, while
  department 107 has 3 employees. Since both departments 100 and 101 have an
  equal number of employees, their respective managers will be included. Output
  table is ordered by dep_id in ascending order.*/

SELECT
    emp_name AS manager_name,
    dep_id
FROM Employees
    JOIN (SELECT
            dep_id,
            RANK() OVER (ORDER BY COUNT(*) DESC) rnk
          FROM Employees
          GROUP BY 1) a
    USING (dep_id)
WHERE position = "Manager" AND rnk = 1
ORDER BY 2


/*2989. Class Performance (Medium)
SQL Schema
Table: Scores
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| student_id   | int     |
| student_name | varchar |
| assignment1  | int     |
| assignment2  | int     |
| assignment3  | int     |
+--------------+---------+
student_id is column of unique values for this table. This table contains
student_id, student_name, assignment1, assignment2, and assignment3. Write a
solution to calculate the difference in the total score (sum of all 3
assignments) between the highest score obtained by students and the lowest score
obtained by them. Return the result table in any order. The result format is in
the following example.

Example 1:
Input:
Scores table:
+------------+--------------+-------------+-------------+-------------+
| student_id | student_name | assignment1 | assignment2 | assignment3 |
+------------+--------------+-------------+-------------+-------------+
| 309        | Owen         | 88          | 47          | 87          |
| 321        | Claire       | 98          | 95          | 37          |
| 338        | Julian       | 100         | 64          | 43          |
| 423        | Peyton       | 60          | 44          | 47          |
| 896        | David        | 32          | 37          | 50          |
| 235        | Camila       | 31          | 53          | 69          |
+------------+--------------+-------------+-------------+-------------+
Output
+---------------------+
| difference_in_score |
+---------------------+
| 111                 |
+---------------------+
Explanation
- student_id 309 has a total score of 88 + 47 + 87 = 222.
- student_id 321 has a total score of 98 + 95 + 37 = 230.
- student_id 338 has a total score of 100 + 64 + 43 = 207.
- student_id 423 has a total score of 60 + 44 + 47 = 151.
- student_id 896 has a total score of 32 + 37 + 50 = 119.
- student_id 235 has a total score of 31 + 53 + 69 = 153.
student_id 321 has the highest score of 230, while student_id 896 has the lowest
score of 119. Therefore, the difference between them is 111.*/

SELECT
    MAX(assignment1+assignment2+assignment3)
    -
    MIN(assignment1+assignment2+assignment3) AS difference_in_score
FROM Scores


/*2990. Loan Types (Easy)
SQL Schema
Table: Loans
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| loan_id     | int     |
| user_id     | int     |
| loan_type   | varchar |
+-------------+---------+
loan_id is column of unique values for this table. This table contains loan_id,
user_id, and loan_type. Write a solution to find all distinct user_id's that
have at least one Refinance loan type and at least one Mortgage loan type.
Return the result table ordered by user_id in ascending order. The result format
is in the following example.

Example 1:
Input:
Loans table:
+---------+---------+-----------+
| loan_id | user_id | loan_type |
+---------+---------+-----------+
| 683     | 101     | Mortgage  |
| 218     | 101     | AutoLoan  |
| 802     | 101     | Inschool  |
| 593     | 102     | Mortgage  |
| 138     | 102     | Refinance |
| 294     | 102     | Inschool  |
| 308     | 103     | Refinance |
| 389     | 104     | Mortgage  |
+---------+---------+-----------+
Output
+---------+
| user_id |
+---------+
| 102     |
+---------+
Explanation
- User_id 101 has three loan types, one of which is a Mortgage. However, this
  user does not have any loan type categorized as Refinance, so user_id 101
  won't be considered.
- User_id 102 possesses three loan types: one for Mortgage and one for
  Refinance. Hence, user_id 102 will be included in the result.
- User_id 103 has a loan type of Refinance but lacks a Mortgage loan type, so
  user_id 103 won't be considered.
- User_id 104 has a Mortgage loan type but doesn't have a Refinance loan type,
  thus, user_id 104 won't be considered.
Output table is ordered by user_id in ascending order.*/

SELECT DISTINCT user_id
FROM
    Loans a
    JOIN
    Loans b USING (user_id)
WHERE a.loan_type = "Mortgage" AND b.loan_type = "Refinance"
ORDER BY 1


/*2993. Friday Purchases I (Medium)
Table: Purchases
+---------------+------+
| Column Name   | Type |
+---------------+------+
| user_id       | int  |
| purchase_date | date |
| amount_spend  | int  |
+---------------+------+
(user_id, purchase_date, amount_spend) is the primary key (combination of
columns with unique values) for this table. purchase_date will range from
November 1, 2023, to November 30, 2023, inclusive of both dates. Each row
contains user id, purchase date, and amount spend. Write a solution to calculate
the total spending by users on each Friday of every week in November 2023.
Output only weeks that include at least one purchase on a Friday. Return the
result table ordered by week of month in ascending order. The result format is
in the following example.

Example 1:
Input:
Purchases table:
+---------+---------------+--------------+
| user_id | purchase_date | amount_spend |
+---------+---------------+--------------+
| 11      | 2023-11-07    | 1126         |
| 15      | 2023-11-30    | 7473         |
| 17      | 2023-11-14    | 2414         |
| 12      | 2023-11-24    | 9692         |
| 8       | 2023-11-03    | 5117         |
| 1       | 2023-11-16    | 5241         |
| 10      | 2023-11-12    | 8266         |
| 13      | 2023-11-24    | 12000        |
+---------+---------------+--------------+
Output:
+---------------+---------------+--------------+
| week_of_month | purchase_date | total_amount |
+---------------+---------------+--------------+
| 1             | 2023-11-03    | 5117         |
| 4             | 2023-11-24    | 21692        |
+---------------+---------------+--------------+
Explanation:
- During the first week of November 2023, transactions amounting to $5,117
  occurred on Friday, 2023-11-03.
- For the second week of November 2023, there were no transactions on Friday,
  2023-11-10.
- Similarly, during the third week of November 2023, there were no transactions
  on Friday, 2023-11-17.
- In the fourth week of November 2023, two transactions took place on Friday,
  2023-11-24, amounting to $12,000 and $9,692 respectively, summing up to a
  total of $21,692.
Output table is ordered by week_of_month in ascending order.*/

SELECT
    (WEEK(purchase_date) - WEEK('2023-11-01') + 1) week_of_month,
    purchase_date,
    SUM(amount_spend) AS total_amount
FROM
    Purchases
WHERE WEEKDAY(purchase_date) = 4
GROUP BY 1
ORDER BY 1
