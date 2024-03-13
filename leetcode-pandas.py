import numpy as np
import pandas as pd

"""176. Second Highest Salary (Medium)
Table: Employee
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| salary      | int  |
+-------------+------+
id is the primary key (column with unique values) for this table. Each row of 
this table contains information about the salary of an employee. Write a 
solution to find the second highest salary from the Employee table. If there is 
no second highest salary, return null (return None in Pandas). The result 
format is in the following example.

Example 1:
Input: 
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
Output: 
+---------------------+
| SecondHighestSalary |
+---------------------+
| 200                 |
+---------------------+
Example 2:

Input: 
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
+----+--------+
Output: 
+---------------------+
| SecondHighestSalary |
+---------------------+
| null                |
+---------------------+"""

def second_highest_salary(employee: pd.DataFrame) -> pd.DataFrame:
        return pd.DataFrame({f"SecondHighestSalary" : (lambda x: [None] if x.empty else x)(employee["salary"].sort_values(ascending=False).drop_duplicates()[1:2])})


"""177. Nth Highest Salary (Medium)
Table: Employee
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| salary      | int  |
+-------------+------+
id is the primary key (column with unique values) for this table. Each row of 
this table contains information about the salary of an employee. Write a 
solution to find the nth highest salary from the Employee table. If there is no 
nth highest salary, return null. The result format is in the following example.

Example 1:
Input: 
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
n = 2
Output: 
+------------------------+
| getNthHighestSalary(2) |
+------------------------+
| 200                    |
+------------------------+
Example 2:

Input: 
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
+----+--------+
n = 2
Output: 
+------------------------+
| getNthHighestSalary(2) |
+------------------------+
| null                   |
+------------------------+"""

def nth_highest_salary(employee: pd.DataFrame, N: int) -> pd.DataFrame:
    return pd.DataFrame({f"getNthHighestSalary({N})" : employee["salary"].sort_values(ascending=False).drop_duplicates()[N-1:N]})


"""178. Rank Scores (Medium)
Table: Scores
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| score       | decimal |
+-------------+---------+
id is the primary key (column with unique values) for this table. Each row of 
this table contains the score of a game. Score is a floating point value with 
two decimal places. Write a solution to find the rank of the scores. The 
ranking should be calculated according to the following rules:
* The scores should be ranked from the highest to the lowest.
* If there is a tie between two scores, both should have the same ranking.
* After a tie, the next ranking number should be the next consecutive integer 
  value. In other words, there should be no holes between ranks.
Return the result table ordered by score in descending order. The result format 
is in the following example.

Example 1:
Input: 
Scores table:
+----+-------+
| id | score |
+----+-------+
| 1  | 3.50  |
| 2  | 3.65  |
| 3  | 4.00  |
| 4  | 3.85  |
| 5  | 4.00  |
| 6  | 3.65  |
+----+-------+
Output: 
+-------+------+
| score | rank |
+-------+------+
| 4.00  | 1    |
| 4.00  | 1    |
| 3.85  | 2    |
| 3.65  | 3    |
| 3.65  | 3    |
| 3.50  | 4    |
+-------+------+"""

def order_scores(scores: pd.DataFrame) -> pd.DataFrame:
    return scores.assign(
        rank = scores["score"].rank(ascending=False, method="dense")
    ).sort_values(
        by = "rank"
    )[["score", "rank"]]


"""183. Customers Who Never Order (Easy)
Table: Customers
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+
id is the primary key (column with unique values) for this table. Each row of 
this table indicates the ID and name of a customer.

Table: Orders
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| customerId  | int  |
+-------------+------+
* id is the primary key (column with unique values) for this table.
* customerId is a foreign key (reference columns) of the ID from the Customers 
  table.
Each row of this table indicates the ID of an order and the ID of the customer 
who ordered it. Write a solution to find all customers who never order anything. 
Return the result table in any order. The result format is in the following 
example.

Example 1:
Input: 
Customers table:
+----+-------+
| id | name  |
+----+-------+
| 1  | Joe   |
| 2  | Henry |
| 3  | Sam   |
| 4  | Max   |
+----+-------+
Orders table:
+----+------------+
| id | customerId |
+----+------------+
| 1  | 3          |
| 2  | 1          |
+----+------------+
Output: 
+-----------+
| Customers |
+-----------+
| Henry     |
| Max       |
+-----------+"""

def find_customers(customers: pd.DataFrame, orders: pd.DataFrame) -> pd.DataFrame:
    customers = customers.merge(orders, how='left', left_on='id', right_on='customerId')
    return customers[customers["customerId"].isnull()][["name"]].rename(columns = {"name" : "Customers"})


"""184. Department Highest Salary (Medium)
Table: Employee
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| id           | int     |
| name         | varchar |
| salary       | int     |
| departmentId | int     |
+--------------+---------+
id is the primary key (column with unique values) for this table. departmentId 
is a foreign key (reference columns) of the ID from the Department table. Each 
row of this table indicates the ID, name, and salary of an employee. It also 
contains the ID of their department.

Table: Department
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+
id is the primary key (column with unique values) for this table. It is 
guaranteed that department name is not NULL. Each row of this table indicates 
the ID of a department and its name. Write a solution to find employees who 
have the highest salary in each of the departments. Return the result table in 
any order. The result format is in the following example.

Example 1:
Input: 
Employee table:
+----+-------+--------+--------------+
| id | name  | salary | departmentId |
+----+-------+--------+--------------+
| 1  | Joe   | 70000  | 1            |
| 2  | Jim   | 90000  | 1            |
| 3  | Henry | 80000  | 2            |
| 4  | Sam   | 60000  | 2            |
| 5  | Max   | 90000  | 1            |
+----+-------+--------+--------------+
Department table:
+----+-------+
| id | name  |
+----+-------+
| 1  | IT    |
| 2  | Sales |
+----+-------+
Output: 
+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| IT         | Jim      | 90000  |
| Sales      | Henry    | 80000  |
| IT         | Max      | 90000  |
+------------+----------+--------+
Explanation: Max and Jim both have the highest salary in the IT department and 
             Henry has the highest salary in the Sales department."""

def department_highest_salary(employee: pd.DataFrame, department: pd.DataFrame) -> pd.DataFrame:
    return employee.merge(
        employee.groupby(by="departmentId", as_index=False).agg(Salary=("salary", "max")), 
        on="departmentId"
    ).merge(
        department, 
        left_on="departmentId", 
        right_on="id"
    ).query("salary == Salary")[
        ["name_y", "name_x", "Salary"]
    ].rename(
        columns = {"name_y" : "Department", "name_x" : "Employee"}
    )


"""196. Delete Duplicate Emails (Easy)
Table: Person
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| email       | varchar |
+-------------+---------+
id is the primary key (column with unique values) for this table. Each row of 
this table contains an email. The emails will not contain uppercase letters.
Write a solution to delete all duplicate emails, keeping only one unique email 
with the smallest id. For SQL users, please note that you are supposed to write 
a DELETE statement and not a SELECT one. For Pandas users, please note that you 
are supposed to modify Person in place. After running your script, the answer 
shown is the Person table. The driver will first compile and run your piece of 
code and then show the Person table. The final order of the Person table does 
not matter. The result format is in the following example.

Example 1:
Input: 
Person table:
+----+------------------+
| id | email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
| 3  | john@example.com |
+----+------------------+
Output: 
+----+------------------+
| id | email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
+----+------------------+
Explanation: john@example.com is repeated two times. We keep the row with the 
             smallest Id = 1."""

def delete_duplicate_emails(person: pd.DataFrame) -> None:
    person.sort_values(by = "id", inplace = True)
    person.drop_duplicates(subset = "email", inplace = True)


"""511. Game Play Analysis I (Easy)
Table: Activity
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| player_id    | int     |
| device_id    | int     |
| event_date   | date    |
| games_played | int     |
+--------------+---------+
(player_id, event_date) is the primary key (combination of columns with unique 
values) of this table. This table shows the activity of players of some games.
Each row is a record of a player who logged in and played a number of games 
(possibly 0) before logging out on someday using some device. Write a solution 
to find the first login date for each player. Return the result table in any 
order. The result format is in the following example.

Example 1:
Input: 
Activity table:
+-----------+-----------+------------+--------------+
| player_id | device_id | event_date | games_played |
+-----------+-----------+------------+--------------+
| 1         | 2         | 2016-03-01 | 5            |
| 1         | 2         | 2016-05-02 | 6            |
| 2         | 3         | 2017-06-25 | 1            |
| 3         | 1         | 2016-03-02 | 0            |
| 3         | 4         | 2018-07-03 | 5            |
+-----------+-----------+------------+--------------+
Output: 
+-----------+-------------+
| player_id | first_login |
+-----------+-------------+
| 1         | 2016-03-01  |
| 2         | 2017-06-25  |
| 3         | 2016-03-02  |
+-----------+-------------+"""

def game_analysis(activity: pd.DataFrame) -> pd.DataFrame:
    return activity.groupby(
        by="player_id", 
        as_index=False
    ).agg(
        first_login=("event_date", "min")
    )


"""570. Managers with at Least 5 Direct Reports (Medium)
Table: Employee
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| department  | varchar |
| managerId   | int     |
+-------------+---------+
id is the primary key (column with unique values) for this table. Each row of 
this table indicates the name of an employee, their department, and the id of 
their manager. If managerId is null, then the employee does not have a manager.
No employee will be the manager of themself. Write a solution to find managers 
with at least five direct reports. Return the result table in any order. The 
result format is in the following example.

Example 1:
Input: 
Employee table:
+-----+-------+------------+-----------+
| id  | name  | department | managerId |
+-----+-------+------------+-----------+
| 101 | John  | A          | None      |
| 102 | Dan   | A          | 101       |
| 103 | James | A          | 101       |
| 104 | Amy   | A          | 101       |
| 105 | Anne  | A          | 101       |
| 106 | Ron   | B          | 101       |
+-----+-------+------------+-----------+
Output: 
+------+
| name |
+------+
| John |
+------+"""

def find_managers(employee: pd.DataFrame) -> pd.DataFrame:
    return employee.groupby(
        by="managerId", 
        as_index=False
    ).size().query(
        'size >= 5'
    ).merge(
        employee, 
        left_on="managerId", 
        right_on="id"
    )[["name"]]


"""586. Customer Placing the Largest Number of Orders (Easy)
Table: Orders
+-----------------+----------+
| Column Name     | Type     |
+-----------------+----------+
| order_number    | int      |
| customer_number | int      |
+-----------------+----------+
order_number is the primary key (column with unique values) for this table. 
This table contains information about the order ID and the customer ID. Write a 
solution to find the customer_number for the customer who has placed the 
largest number of orders. The test cases are generated so that exactly one 
customer will have placed more orders than any other customer. The result 
format is in the following example.

Example 1:
Input: 
Orders table:
+--------------+-----------------+
| order_number | customer_number |
+--------------+-----------------+
| 1            | 1               |
| 2            | 2               |
| 3            | 3               |
| 4            | 3               |
+--------------+-----------------+
Output: 
+-----------------+
| customer_number |
+-----------------+
| 3               |
+-----------------+
Explanation: The customer with number 3 has two orders, which is greater than 
             either customer 1 or 2 because each of them only has one order. So 
             the result is customer_number 3.

Follow up: What if more than one customer has the largest number of orders, can 
           you find all the customer_number in this case?"""

def largest_orders(orders: pd.DataFrame) -> pd.DataFrame:
    return orders["customer_number"].mode().to_frame()


"""595. Big Countries (Easy)
Table: World
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| name        | varchar |
| continent   | varchar |
| area        | int     |
| population  | int     |
| gdp         | bigint  |
+-------------+---------+
name is the primary key (column with unique values) for this table. Each row of 
this table gives information about the name of a country, the continent to 
which it belongs, its area, the population, and its GDP value.

A country is big if:
* it has an area of at least three million (i.e., 3000000 km2), or
* it has a population of at least twenty-five million (i.e., 25000000).
Write a solution to find the name, population, and area of the big countries. 
Return the result table in any order. The result format is in the following 
example.

Example 1:
Input: 
World table:
+-------------+-----------+---------+------------+--------------+
| name        | continent | area    | population | gdp          |
+-------------+-----------+---------+------------+--------------+
| Afghanistan | Asia      | 652230  | 25500100   | 20343000000  |
| Albania     | Europe    | 28748   | 2831741    | 12960000000  |
| Algeria     | Africa    | 2381741 | 37100000   | 188681000000 |
| Andorra     | Europe    | 468     | 78115      | 3712000000   |
| Angola      | Africa    | 1246700 | 20609294   | 100990000000 |
+-------------+-----------+---------+------------+--------------+
Output: 
+-------------+------------+---------+
| name        | population | area    |
+-------------+------------+---------+
| Afghanistan | 25500100   | 652230  |
| Algeria     | 37100000   | 2381741 |
+-------------+------------+---------+"""

def big_countries(world: pd.DataFrame) -> pd.DataFrame:
    return world.query('area >= 3000000 | population >= 25000000')[["name", "population", "area"]]


"""596. Classes More Than 5 Students (Easy)
Table: Courses
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| student     | varchar |
| class       | varchar |
+-------------+---------+
(student, class) is the primary key (combination of columns with unique values) 
for this table. Each row of this table indicates the name of a student and the 
class in which they are enrolled. Write a solution to find all the classes that 
have at least five students. Return the result table in any order. The result 
format is in the following example.

Example 1:
Input: 
Courses table:
+---------+----------+
| student | class    |
+---------+----------+
| A       | Math     |
| B       | English  |
| C       | Math     |
| D       | Biology  |
| E       | Math     |
| F       | Computer |
| G       | Math     |
| H       | Math     |
| I       | Math     |
+---------+----------+
Output: 
+---------+
| class   |
+---------+
| Math    |
+---------+
Explanation: 
- Math has 6 students, so we include it.
- English has 1 student, so we do not include it.
- Biology has 1 student, so we do not include it.
- Computer has 1 student, so we do not include it."""

def find_classes(courses: pd.DataFrame) -> pd.DataFrame:
    return courses.groupby(
        by="class", 
        as_index=False
    ).agg(
        cnt=("student", "nunique")
    ).query(
        "cnt >= 5"
    ).drop(
        labels=["cnt"], 
        axis=1
    )


"""607. Sales Person (Easy)
Table: SalesPerson
+-----------------+---------+
| Column Name     | Type    |
+-----------------+---------+
| sales_id        | int     |
| name            | varchar |
| salary          | int     |
| commission_rate | int     |
| hire_date       | date    |
+-----------------+---------+
sales_id is the primary key (column with unique values) for this table. Each 
row of this table indicates the name and the ID of a salesperson alongside 
their salary, commission rate, and hire date.

Table: Company
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| com_id      | int     |
| name        | varchar |
| city        | varchar |
+-------------+---------+
com_id is the primary key (column with unique values) for this table. Each row 
of this table indicates the name and the ID of a company and the city in which 
the company is located.

Table: Orders
+-------------+------+
| Column Name | Type |
+-------------+------+
| order_id    | int  |
| order_date  | date |
| com_id      | int  |
| sales_id    | int  |
| amount      | int  |
+-------------+------+
order_id is the primary key (column with unique values) for this table. com_id 
is a foreign key (reference column) to com_id from the Company table. sales_id 
is a foreign key (reference column) to sales_id from the SalesPerson table. 
Each row of this table contains information about one order. This includes the 
ID of the company, the ID of the salesperson, the date of the order, and the 
amount paid. Write a solution to find the names of all the salespersons who did 
not have any orders related to the company with the name "RED". Return the 
result table in any order. The result format is in the following example.

Example 1:
Input: 
SalesPerson table:
+----------+------+--------+-----------------+------------+
| sales_id | name | salary | commission_rate | hire_date  |
+----------+------+--------+-----------------+------------+
| 1        | John | 100000 | 6               | 4/1/2006   |
| 2        | Amy  | 12000  | 5               | 5/1/2010   |
| 3        | Mark | 65000  | 12              | 12/25/2008 |
| 4        | Pam  | 25000  | 25              | 1/1/2005   |
| 5        | Alex | 5000   | 10              | 2/3/2007   |
+----------+------+--------+-----------------+------------+
Company table:
+--------+--------+----------+
| com_id | name   | city     |
+--------+--------+----------+
| 1      | RED    | Boston   |
| 2      | ORANGE | New York |
| 3      | YELLOW | Boston   |
| 4      | GREEN  | Austin   |
+--------+--------+----------+
Orders table:
+----------+------------+--------+----------+--------+
| order_id | order_date | com_id | sales_id | amount |
+----------+------------+--------+----------+--------+
| 1        | 1/1/2014   | 3      | 4        | 10000  |
| 2        | 2/1/2014   | 4      | 5        | 5000   |
| 3        | 3/1/2014   | 1      | 1        | 50000  |
| 4        | 4/1/2014   | 1      | 4        | 25000  |
+----------+------------+--------+----------+--------+
Output: 
+------+
| name |
+------+
| Amy  |
| Mark |
| Alex |
+------+
Explanation: According to orders 3 and 4 in the Orders table, it is easy to 
             tell that only salesperson John and Pam have sales to company RED, 
             so we report all the other names in the table salesperson."""

def sales_person(sales_person: pd.DataFrame, company: pd.DataFrame, orders: pd.DataFrame) -> pd.DataFrame:
    com_id = company.query("name == 'RED'")["com_id"]
    sales_id = orders[orders["com_id"].isin(com_id)]["sales_id"]
    return sales_person[~sales_person["sales_id"].isin(sales_id)][["name"]]


"""1050. Actors and Directors Who Cooperated At Least Three Times (Easy)
Table: ActorDirector
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| actor_id    | int     |
| director_id | int     |
| timestamp   | int     |
+-------------+---------+
timestamp is the primary key (column with unique values) for this table. Write 
a solution to find all the pairs (actor_id, director_id) where the actor has 
cooperated with the director at least three times. Return the result table in 
any order. The result format is in the following example.

Example 1:
Input: 
ActorDirector table:
+-------------+-------------+-------------+
| actor_id    | director_id | timestamp   |
+-------------+-------------+-------------+
| 1           | 1           | 0           |
| 1           | 1           | 1           |
| 1           | 1           | 2           |
| 1           | 2           | 3           |
| 1           | 2           | 4           |
| 2           | 1           | 5           |
| 2           | 1           | 6           |
+-------------+-------------+-------------+
Output: 
+-------------+-------------+
| actor_id    | director_id |
+-------------+-------------+
| 1           | 1           |
+-------------+-------------+
Explanation: The only pair is (1, 1) where they cooperated exactly 3 times."""

def actors_and_directors(actor_director: pd.DataFrame) -> pd.DataFrame:
    return actor_director.groupby(
        by=["actor_id", "director_id"], 
        as_index=False
    ).size().query(
        "size >= 3"
    ).drop(
        labels="size", 
        axis=1
    )


"""1148. Article Views I (Easy)
Table: Views
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| article_id    | int     |
| author_id     | int     |
| viewer_id     | int     |
| view_date     | date    |
+---------------+---------+
There is no primary key (column with unique values) for this table, the table 
may have duplicate rows. Each row of this table indicates that some viewer 
viewed an article (written by some author) on some date. Note that equal 
author_id and viewer_id indicate the same person. Write a solution to find all 
the authors that viewed at least one of their own articles. Return the result 
table sorted by id in ascending order. The result format is in the following 
example.

Example 1:
Input: 
Views table:
+------------+-----------+-----------+------------+
| article_id | author_id | viewer_id | view_date  |
+------------+-----------+-----------+------------+
| 1          | 3         | 5         | 2019-08-01 |
| 1          | 3         | 6         | 2019-08-02 |
| 2          | 7         | 7         | 2019-08-01 |
| 2          | 7         | 6         | 2019-08-02 |
| 4          | 7         | 1         | 2019-07-22 |
| 3          | 4         | 4         | 2019-07-21 |
| 3          | 4         | 4         | 2019-07-21 |
+------------+-----------+-----------+------------+
Output: 
+------+
| id   |
+------+
| 4    |
| 7    |
+------+"""

def article_views(views: pd.DataFrame) -> pd.DataFrame:
    return views.query('author_id == viewer_id')[["author_id"]].rename(columns = {"author_id" : "id"}).sort_values(by = "id").drop_duplicates()


"""1173. Immediate Food Delivery I (Easy)
Table: Delivery
+-----------------------------+---------+
| Column Name                 | Type    |
+-----------------------------+---------+
| delivery_id                 | int     |
| customer_id                 | int     |
| order_date                  | date    |
| customer_pref_delivery_date | date    |
+-----------------------------+---------+
delivery_id is the primary key (column with unique values) of this table. The 
table holds information about food delivery to customers that make orders at 
some date and specify a preferred delivery date (on the same order date or 
after it). If the customer's preferred delivery date is the same as the order 
date, then the order is called immediate; otherwise, it is called scheduled.
Write a solution to find the percentage of immediate orders in the table, 
rounded to 2 decimal places. The result format is in the following example.

Example 1:
Input: 
Delivery table:
+-------------+-------------+------------+-----------------------------+
| delivery_id | customer_id | order_date | customer_pref_delivery_date |
+-------------+-------------+------------+-----------------------------+
| 1           | 1           | 2019-08-01 | 2019-08-02                  |
| 2           | 5           | 2019-08-02 | 2019-08-02                  |
| 3           | 1           | 2019-08-11 | 2019-08-11                  |
| 4           | 3           | 2019-08-24 | 2019-08-26                  |
| 5           | 4           | 2019-08-21 | 2019-08-22                  |
| 6           | 2           | 2019-08-11 | 2019-08-13                  |
+-------------+-------------+------------+-----------------------------+
Output: 
+----------------------+
| immediate_percentage |
+----------------------+
| 33.33                |
+----------------------+
Explanation: The orders with delivery id 2 and 3 are immediate while the others 
             are scheduled."""

def food_delivery(delivery: pd.DataFrame) -> pd.DataFrame:
    return pd.DataFrame(
        {
            "immediate_percentage" : [
                round(100*delivery.query('order_date == customer_pref_delivery_date').shape[0] / delivery.shape[0], 2)
            ]
        }
    )


"""1280. Students and Examinations (Easy)
Table: Students
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| student_id    | int     |
| student_name  | varchar |
+---------------+---------+
student_id is the primary key (column with unique values) for this table. Each 
row of this table contains the ID and the name of one student in the school.

Table: Subjects
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| subject_name | varchar |
+--------------+---------+
subject_name is the primary key (column with unique values) for this table. 
Each row of this table contains the name of one subject in the school.

Table: Examinations
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| student_id   | int     |
| subject_name | varchar |
+--------------+---------+
There is no primary key (column with unique values) for this table. It may 
contain duplicates. Each student from the Students table takes every course 
from the Subjects table. Each row of this table indicates that a student with 
ID student_id attended the exam of subject_name. Write a solution to find the 
number of times each student attended each exam. Return the result table 
ordered by student_id and subject_name. The result format is in the following 
example.

Example 1:
Input: 
Students table:
+------------+--------------+
| student_id | student_name |
+------------+--------------+
| 1          | Alice        |
| 2          | Bob          |
| 13         | John         |
| 6          | Alex         |
+------------+--------------+
Subjects table:
+--------------+
| subject_name |
+--------------+
| Math         |
| Physics      |
| Programming  |
+--------------+
Examinations table:
+------------+--------------+
| student_id | subject_name |
+------------+--------------+
| 1          | Math         |
| 1          | Physics      |
| 1          | Programming  |
| 2          | Programming  |
| 1          | Physics      |
| 1          | Math         |
| 13         | Math         |
| 13         | Programming  |
| 13         | Physics      |
| 2          | Math         |
| 1          | Math         |
+------------+--------------+
Output: 
+------------+--------------+--------------+----------------+
| student_id | student_name | subject_name | attended_exams |
+------------+--------------+--------------+----------------+
| 1          | Alice        | Math         | 3              |
| 1          | Alice        | Physics      | 2              |
| 1          | Alice        | Programming  | 1              |
| 2          | Bob          | Math         | 1              |
| 2          | Bob          | Physics      | 0              |
| 2          | Bob          | Programming  | 1              |
| 6          | Alex         | Math         | 0              |
| 6          | Alex         | Physics      | 0              |
| 6          | Alex         | Programming  | 0              |
| 13         | John         | Math         | 1              |
| 13         | John         | Physics      | 1              |
| 13         | John         | Programming  | 1              |
+------------+--------------+--------------+----------------+
Explanation: 
* The result table should contain all students and all subjects.
* Alice attended the Math exam 3 times, the Physics exam 2 times, and the 
  Programming exam 1 time.
* Bob attended the Math exam 1 time, the Programming exam 1 time, and did not 
  attend the Physics exam.
* Alex did not attend any exams.
* John attended the Math exam 1 time, the Physics exam 1 time, and the 
  Programming exam 1 time."""

def students_and_examinations(students: pd.DataFrame, subjects: pd.DataFrame, examinations: pd.DataFrame) -> pd.DataFrame:
    return students.merge(
        subjects, 
        how="cross"
    ).merge(
        examinations.groupby(
            by=["student_id", "subject_name"], 
            as_index=False
        ).agg(
            attended_exams=("student_id", "count")
        ), 
        how="left", 
        on=["student_id", "subject_name"]
    ).fillna(0).sort_values(
        ["student_id", "subject_name"]
    )[
        ["student_id", "student_name", "subject_name", "attended_exams"]
    ]


"""1378. Replace Employee ID With The Unique Identifier (Easy)
Table: Employees
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| name          | varchar |
+---------------+---------+
id is the primary key (column with unique values) for this table. Each row of 
this table contains the id and the name of an employee in a company.

Table: EmployeeUNI
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| unique_id     | int     |
+---------------+---------+
(id, unique_id) is the primary key (combination of columns with unique values) 
for this table. Each row of this table contains the id and the corresponding 
unique id of an employee in the company. Write a solution to show the unique ID 
of each user, If a user does not have a unique ID replace just show null. 
Return the result table in any order. The result format is in the following 
example.

Example 1:
Input: 
Employees table:
+----+----------+
| id | name     |
+----+----------+
| 1  | Alice    |
| 7  | Bob      |
| 11 | Meir     |
| 90 | Winston  |
| 3  | Jonathan |
+----+----------+
EmployeeUNI table:
+----+-----------+
| id | unique_id |
+----+-----------+
| 3  | 1         |
| 11 | 2         |
| 90 | 3         |
+----+-----------+
Output: 
+-----------+----------+
| unique_id | name     |
+-----------+----------+
| null      | Alice    |
| null      | Bob      |
| 2         | Meir     |
| 3         | Winston  |
| 1         | Jonathan |
+-----------+----------+
Explanation: 
* Alice and Bob do not have a unique ID, We will show null instead.
* The unique ID of Meir is 2.
* The unique ID of Winston is 3.
* The unique ID of Jonathan is 1."""

def replace_employee_id(employees: pd.DataFrame, employee_uni: pd.DataFrame) -> pd.DataFrame:
    return employees.merge(
        employee_uni, 
        how="left", 
        on="id"
    ).drop(
        labels="id", 
        axis=1
    )


"""1484. Group Sold Products By The Date (Easy)
Table Activities:
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| sell_date   | date    |
| product     | varchar |
+-------------+---------+
There is no primary key (column with unique values) for this table. It may 
contain duplicates. Each row of this table contains the product name and the 
date it was sold in a market. Write a solution to find for each date the number 
of different products sold and their names. The sold products names for each 
date should be sorted lexicographically. Return the result table ordered by 
sell_date. The result format is in the following example.

Example 1:
Input: 
Activities table:
+------------+------------+
| sell_date  | product     |
+------------+------------+
| 2020-05-30 | Headphone  |
| 2020-06-01 | Pencil     |
| 2020-06-02 | Mask       |
| 2020-05-30 | Basketball |
| 2020-06-01 | Bible      |
| 2020-06-02 | Mask       |
| 2020-05-30 | T-Shirt    |
+------------+------------+
Output: 
+------------+----------+------------------------------+
| sell_date  | num_sold | products                     |
+------------+----------+------------------------------+
| 2020-05-30 | 3        | Basketball,Headphone,T-shirt |
| 2020-06-01 | 2        | Bible,Pencil                 |
| 2020-06-02 | 1        | Mask                         |
+------------+----------+------------------------------+
Explanation: 
* For 2020-05-30, Sold items were (Headphone, Basketball, T-shirt), we sort 
  them lexicographically and separate them by a comma.
* For 2020-06-01, Sold items were (Pencil, Bible), we sort them 
  lexicographically and separate them by a comma.
* For 2020-06-02, the Sold item is (Mask), we just return it."""

def categorize_products(activities: pd.DataFrame) -> pd.DataFrame:
    return activities.sort_values(
        by=["sell_date", "product"]
    ).groupby(
        by="sell_date", 
        as_index=False
    ).agg(
        num_sold=("product", "nunique"), 
        products=("product", lambda x: ','.join(sorted(x.unique())))
    )


"""1517. Find Users With Valid E-Mails (Easy)
Table: Users
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user_id       | int     |
| name          | varchar |
| mail          | varchar |
+---------------+---------+
user_id is the primary key (column with unique values) for this table. This 
table contains information of the users signed up in a website. Some e-mails 
are invalid. Write a solution to find the users who have valid emails. A valid 
e-mail has a prefix name and a domain where:
* The prefix name is a string that may contain letters (upper or lower case), 
  digits, underscore '_', period '.', and/or dash '-'. The prefix name must 
  start with a letter.
* The domain is '@leetcode.com'.
Return the result table in any order. The result format is in the following 
example.

Example 1:
Input: 
Users table:
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
Output: 
+---------+-----------+-------------------------+
| user_id | name      | mail                    |
+---------+-----------+-------------------------+
| 1       | Winston   | winston@leetcode.com    |
| 3       | Annabelle | bella-@leetcode.com     |
| 4       | Sally     | sally.come@leetcode.com |
+---------+-----------+-------------------------+
Explanation: 
* The mail of user 2 does not have a domain.
* The mail of user 5 has the # sign which is not allowed.
* The mail of user 6 does not have the leetcode domain.
* The mail of user 7 starts with a period."""

def valid_emails(users: pd.DataFrame) -> pd.DataFrame:
    return users.loc[users["mail"].str.match(r"^[a-zA-Z]+[a-zA-Z0-9_.-]*@leetcode\.com$")]


"""1527. Patients With a Condition (Easy)
Table: Patients
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| patient_id   | int     |
| patient_name | varchar |
| conditions   | varchar |
+--------------+---------+
patient_id is the primary key (column with unique values) for this table. 
'conditions' contains 0 or more code separated by spaces. This table contains 
information of the patients in the hospital. Write a solution to find the 
patient_id, patient_name, and conditions of the patients who have Type I 
Diabetes. Type I Diabetes always starts with DIAB1 prefix. Return the result 
table in any order. The result format is in the following example.

Example 1:
Input: 
Patients table:
+------------+--------------+--------------+
| patient_id | patient_name | conditions   |
+------------+--------------+--------------+
| 1          | Daniel       | YFEV COUGH   |
| 2          | Alice        |              |
| 3          | Bob          | DIAB100 MYOP |
| 4          | George       | ACNE DIAB100 |
| 5          | Alain        | DIAB201      |
+------------+--------------+--------------+
Output: 
+------------+--------------+--------------+
| patient_id | patient_name | conditions   |
+------------+--------------+--------------+
| 3          | Bob          | DIAB100 MYOP |
| 4          | George       | ACNE DIAB100 | 
+------------+--------------+--------------+
Explanation: Bob and George both have a condition that starts with DIAB1."""

def find_patients(patients: pd.DataFrame) -> pd.DataFrame:
    return patients.loc[patients["conditions"].str.contains(r"\bDIAB1")]


"""1667. Fix Names in a Table (Easy)
Table: Users
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| user_id        | int     |
| name           | varchar |
+----------------+---------+
user_id is the primary key (column with unique values) for this table. This 
table contains the ID and the name of the user. The name consists of only 
lowercase and uppercase characters. Write a solution to fix the names so that 
only the first character is uppercase and the rest are lowercase. Return the 
result table ordered by user_id. The result format is in the following example.

Example 1:
Input: 
Users table:
+---------+-------+
| user_id | name  |
+---------+-------+
| 1       | aLice |
| 2       | bOB   |
+---------+-------+
Output: 
+---------+-------+
| user_id | name  |
+---------+-------+
| 1       | Alice |
| 2       | Bob   |
+---------+-------+"""

def fix_names(users: pd.DataFrame) -> pd.DataFrame:
    return users.eval('name = name.str.capitalize()').sort_values(by="user_id")


"""1683. Invalid Tweets (Easy)
Table: Tweets
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| tweet_id       | int     |
| content        | varchar |
+----------------+---------+
tweet_id is the primary key (column with unique values) for this table. This 
table contains all the tweets in a social media app. Write a solution to find 
the IDs of the invalid tweets. The tweet is invalid if the number of characters 
used in the content of the tweet is strictly greater than 15. Return the result 
table in any order. The result format is in the following example.

Example 1:
Input: 
Tweets table:
+----------+----------------------------------+
| tweet_id | content                          |
+----------+----------------------------------+
| 1        | Vote for Biden                   |
| 2        | Let us make America great again! |
+----------+----------------------------------+
Output: 
+----------+
| tweet_id |
+----------+
| 2        |
+----------+
Explanation: 
* Tweet 1 has length = 14. It is a valid tweet.
* Tweet 2 has length = 32. It is an invalid tweet."""

def invalid_tweets(tweets: pd.DataFrame) -> pd.DataFrame:
    return tweets.query('content.str.len() > 15')[["tweet_id"]]


"""1693. Daily Leads and Partners (Easy)
Table: DailySales
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| date_id     | date    |
| make_name   | varchar |
| lead_id     | int     |
| partner_id  | int     |
+-------------+---------+
There is no primary key (column with unique values) for this table. It may 
contain duplicates. This table contains the date and the name of the product 
sold and the IDs of the lead and partner it was sold to. The name consists of 
only lowercase English letters. For each date_id and make_name, find the number 
of distinct lead_id's and distinct partner_id's. Return the result table in any 
order. The result format is in the following example.

Example 1:
Input: 
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
Output: 
+-----------+-----------+--------------+-----------------+
| date_id   | make_name | unique_leads | unique_partners |
+-----------+-----------+--------------+-----------------+
| 2020-12-8 | toyota    | 2            | 3               |
| 2020-12-7 | toyota    | 1            | 2               |
| 2020-12-8 | honda     | 2            | 2               |
| 2020-12-7 | honda     | 3            | 2               |
+-----------+-----------+--------------+-----------------+
Explanation: 
* For 2020-12-8, toyota gets leads = [0, 1] and partners = [0, 1, 2] while 
  honda gets leads = [1, 2] and partners = [1, 2].
* For 2020-12-7, toyota gets leads = [0] and partners = [1, 2] while honda gets 
  leads = [0, 1, 2] and partners = [1, 2]."""

def daily_leads_and_partners(daily_sales: pd.DataFrame) -> pd.DataFrame:
    return daily_sales.groupby(
        by=["date_id", "make_name"], 
        as_index=False
    ).agg(
        unique_leads=("lead_id", "nunique"), 
        unique_partners=("partner_id", "nunique")
    )


"""1741. Find Total Time Spent by Each Employee (Easy)
Table: Employees
+-------------+------+
| Column Name | Type |
+-------------+------+
| emp_id      | int  |
| event_day   | date |
| in_time     | int  |
| out_time    | int  |
+-------------+------+
(emp_id, event_day, in_time) is the primary key (combinations of columns with 
unique values) of this table. The table shows the employees' entries and exits 
in an office. event_day is the day at which this event happened, in_time is the 
minute at which the employee entered the office, and out_time is the minute at 
which they left the office. in_time and out_time are between 1 and 1440. It is 
guaranteed that no two events on the same day intersect in time, and 
in_time < out_time. Write a solution to calculate the total time in minutes 
spent by each employee on each day at the office. Note that within one day, an 
employee can enter and leave more than once. The time spent in the office for a 
single entry is out_time - in_time. Return the result table in any order. The 
result format is in the following example.

Example 1:
Input: 
Employees table:
+--------+------------+---------+----------+
| emp_id | event_day  | in_time | out_time |
+--------+------------+---------+----------+
| 1      | 2020-11-28 | 4       | 32       |
| 1      | 2020-11-28 | 55      | 200      |
| 1      | 2020-12-03 | 1       | 42       |
| 2      | 2020-11-28 | 3       | 33       |
| 2      | 2020-12-09 | 47      | 74       |
+--------+------------+---------+----------+
Output: 
+------------+--------+------------+
| day        | emp_id | total_time |
+------------+--------+------------+
| 2020-11-28 | 1      | 173        |
| 2020-11-28 | 2      | 30         |
| 2020-12-03 | 1      | 41         |
| 2020-12-09 | 2      | 27         |
+------------+--------+------------+
Explanation: 
* Employee 1 has three events: two on day 2020-11-28 with a total of 
  (32 - 4) + (200 - 55) = 173, and one on day 2020-12-03 with a total of 
  (42 - 1) = 41.
* Employee 2 has two events: one on day 2020-11-28 with a total of 
  (33 - 3) = 30, and one on day 2020-12-09 with a total of (74 - 47) = 27."""

def total_time(employees: pd.DataFrame) -> pd.DataFrame:
    return employees.groupby(
        by = ["event_day", "emp_id"]
    ).sum().assign(
        total_time = lambda x: x["out_time"] - x["in_time"]
    ).drop(
        labels = ["in_time", "out_time"], 
        axis=1
    ).reset_index().rename(
        columns = {"event_day" : "day"}
    )


"""1757. Recyclable and Low Fat Products (Easy)
Table: Products
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_id  | int     |
| low_fats    | enum    |
| recyclable  | enum    |
+-------------+---------+
* product_id is the primary key (column with unique values) for this table. 
* low_fats is an ENUM (category) of type ('Y', 'N') where 'Y' means this 
  product is low fat and 'N' means it is not.
* recyclable is an ENUM (category) of types ('Y', 'N') where 'Y' means this 
  product is recyclable and 'N' means it is not.

Write a solution to find the ids of products that are both low fat and 
recyclable. Return the result table in any order. The result format is in the 
following example.

Example 1:
Input: 
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
Output: 
+-------------+
| product_id  |
+-------------+
| 1           |
| 3           |
+-------------+
Explanation: Only products 1 and 3 are both low fat and recyclable."""

def find_products(products: pd.DataFrame) -> pd.DataFrame:
    return products.query('low_fats == "Y" & recyclable == "Y"')[["product_id"]]


"""1795. Rearrange Products Table (Easy)
Table: Products
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_id  | int     |
| store1      | int     |
| store2      | int     |
| store3      | int     |
+-------------+---------+
product_id is the primary key (column with unique values) for this table. Each 
row in this table indicates the product's price in 3 different stores: store1, 
store2, and store3. If the product is not available in a store, the price will 
be null in that store's column. Write a solution to rearrange the Products 
table so that each row has (product_id, store, price). If a product is not 
available in a store, do not include a row with that product_id and store 
combination in the result table. Return the result table in any order. The 
result format is in the following example.

Example 1:
Input: 
Products table:
+------------+--------+--------+--------+
| product_id | store1 | store2 | store3 |
+------------+--------+--------+--------+
| 0          | 95     | 100    | 105    |
| 1          | 70     | null   | 80     |
+------------+--------+--------+--------+
Output: 
+------------+--------+-------+
| product_id | store  | price |
+------------+--------+-------+
| 0          | store1 | 95    |
| 0          | store2 | 100   |
| 0          | store3 | 105   |
| 1          | store1 | 70    |
| 1          | store3 | 80    |
+------------+--------+-------+
Explanation: - Product 0 is available in all three stores with prices 95, 100, 
               and 105 respectively.
             - Product 1 is available in store1 with price 70 and store3 with 
               price 80. The product is not available in store2."""

def rearrange_products_table(products: pd.DataFrame) -> pd.DataFrame:
    return products.melt(id_vars='product_id', var_name='store', value_name='price').dropna()


"""1873. Calculate Special Bonus (Easy)
Table: Employees
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| employee_id | int     |
| name        | varchar |
| salary      | int     |
+-------------+---------+
employee_id is the primary key (column with unique values) for this table. Each 
row of this table indicates the employee ID, employee name, and salary. Write a 
solution to calculate the bonus of each employee. The bonus of an employee is 
100% of their salary if the ID of the employee is an odd number and the 
employee's name does not start with the character 'M'. The bonus of an employee 
is 0 otherwise. Return the result table ordered by employee_id. The result 
format is in the following example.

Example 1:
Input: 
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
Output: 
+-------------+-------+
| employee_id | bonus |
+-------------+-------+
| 2           | 0     |
| 3           | 0     |
| 7           | 7400  |
| 8           | 0     |
| 9           | 7700  |
+-------------+-------+
Explanation: 
* The employees with IDs 2 and 8 get 0 bonus because they have an even 
  employee_id.
* The employee with ID 3 gets 0 bonus because their name starts with 'M'.
* The rest of the employees get a 100% bonus."""

def calculate_special_bonus(employees: pd.DataFrame) -> pd.DataFrame:
    return employees.assign(bonus = np.where(employees["employee_id"] % 2 & (~employees["name"].str.startswith('M')), employees["salary"], 0))[["employee_id", "bonus"]].sort_values(by = "employee_id")


"""1907. Count Salary Categories (Medium)
Table: Accounts
+-------------+------+
| Column Name | Type |
+-------------+------+
| account_id  | int  |
| income      | int  |
+-------------+------+
account_id is the primary key (column with unique values) for this table. Each 
row contains information about the monthly income for one bank account. Write a 
solution to calculate the number of bank accounts for each salary category. The 
salary categories are:
* "Low Salary": All the salaries strictly less than $20000.
* "Average Salary": All the salaries in the inclusive range [$20000, $50000].
* "High Salary": All the salaries strictly greater than $50000.
The result table must contain all three categories. If there are no accounts in 
a category, return 0. Return the result table in any order. The result format 
is in the following example.

Example 1:
Input: 
Accounts table:
+------------+--------+
| account_id | income |
+------------+--------+
| 3          | 108939 |
| 2          | 12747  |
| 8          | 87709  |
| 6          | 91796  |
+------------+--------+
Output: 
+----------------+----------------+
| category       | accounts_count |
+----------------+----------------+
| Low Salary     | 1              |
| Average Salary | 0              |
| High Salary    | 3              |
+----------------+----------------+
Explanation: 
* Low Salary: Account 2.
* Average Salary: No accounts.
* High Salary: Accounts 3, 6, and 8."""

def count_salary_categories(accounts: pd.DataFrame) -> pd.DataFrame:
    return accounts.assign(
        category = np.where(
            accounts["income"] < 20_000, 
            "Low Salary", 
            np.where(
                accounts["income"] <= 50_000, 
                "Average Salary", 
                "High Salary"
            )
        )
    ).groupby(
        by="category"
    ).agg(
        accounts_count=("category", "count")
    ).reindex(
        ["Low Salary", "Average Salary", "High Salary"], 
        fill_value=0
    ).reset_index()


"""2082. The Number of Rich Customers (Easy)
Table: Store
+-------------+------+
| Column Name | Type |
+-------------+------+
| bill_id     | int  |
| customer_id | int  |
| amount      | int  |
+-------------+------+
bill_id is the primary key (column with unique values) for this table. Each row 
contains information about the amount of one bill and the customer associated 
with it. Write a solution to report the number of customers who had at least 
one bill with an amount strictly greater than 500. The result format is in the 
following example.

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
* Customer 1 has two bills with amounts strictly greater than 500.
* Customer 2 does not have any bills with an amount strictly greater than 500.
* Customer 3 has one bill with an amount strictly greater than 500."""

def count_rich_customers(store: pd.DataFrame) -> pd.DataFrame:
    return pd.DataFrame({
        "rich_count" : [
            store.query(
                "amount > 500"
            ).drop_duplicates(
                subset = "customer_id"
            ).shape[0]
        ]
    })


"""2356. Number of Unique Subjects Taught by Each Teacher (Easy)
Table: Teacher
+-------------+------+
| Column Name | Type |
+-------------+------+
| teacher_id  | int  |
| subject_id  | int  |
| dept_id     | int  |
+-------------+------+
(subject_id, dept_id) is the primary key (combinations of columns with unique 
values) of this table. Each row in this table indicates that the teacher with 
teacher_id teaches the subject subject_id in the department dept_id. Write a 
solution to calculate the number of unique subjects each teacher teaches in the 
university. Return the result table in any order. The result format is shown in 
the following example.

Example 1:
Input: 
Teacher table:
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
Output:  
+------------+-----+
| teacher_id | cnt |
+------------+-----+
| 1          | 2   |
| 2          | 4   |
+------------+-----+
Explanation: 
Teacher 1:
  - They teach subject 2 in departments 3 and 4.
  - They teach subject 3 in department 3.
Teacher 2:
  - They teach subject 1 in department 1.
  - They teach subject 2 in department 1.
  - They teach subject 3 in department 1.
  - They teach subject 4 in department 1."""

def count_unique_subjects(teacher: pd.DataFrame) -> pd.DataFrame:
    return teacher.groupby(
        by="teacher_id", 
        as_index=False
    ).agg(
        cnt=("subject_id", "nunique")
    )


"""2668. Find Latest Salaries (Easy)
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
  an updated salary."""

  def find_latest_salaries(salary: pd.DataFrame) -> pd.DataFrame:
      return salary.sort_values(
          by=['emp_id', 'salary'],
      ).drop_duplicates(
          subset='emp_id',
          keep='last'
      )


"""2669. Count Artist Occurrences On Spotify Ranking List (Easy)
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
             same, the artist's names are sorted in ascending order."""

def count_occurrences(spotify: pd.DataFrame) -> pd.DataFrame:
    return spotify.groupby(
        by="artist",
        as_index=False
    ).agg(
        occurrences=("artist", "count")
    ).sort_values(
        by=["occurrences", "artist"],
        ascending=[False, True]
    )


"""2686. Immediate Food Delivery III (Medium)
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
order_date is sorted in ascending order."""

def immediate_delivery(delivery: pd.DataFrame) -> pd.DataFrame:
    return delivery.assign(
        immediate_percentage = lambda x: 100*(x['order_date'] == x['customer_pref_delivery_date'])
    ).groupby(
        by="order_date",
        as_index=False
    ).agg(
        immediate_percentage=("immediate_percentage", "mean")
    ).sort_values(
        by="order_date"
    ).round(2)


"""2687. Bikes Last Time Used (Easy)
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
- Returning output in order by the bike that were most recently used."""

def last_used_time(bikes: pd.DataFrame) -> pd.DataFrame:
    return bikes.groupby(
        by="bike_number",
        as_index=False
    ).agg(
        end_time=("end_time", "max")
    ).sort_values(
        by="end_time",
        ascending=False
    )


"""2688. Find Active Users (Medium)
SQL Schema
Table: Users
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| user_id     | int      |
| item        | varchar  |
| created_at  | datetime |
| amount      | int      |
+-------------+----------+
This table may contain duplicate records. Each row includes the user ID, the
purchased item, the date of purchase, and the purchase amount. Write a solution
to identify active users. An active user is a user that has made a second
purchase within 7 days of any other of their purchases. For example, if the
ending date is May 31, 2023. So any date between May 31, 2023, and June 7, 2023
(inclusive) would be considered "within 7 days" of May 31, 2023. Return a list
of user_id which denotes the list of active users in any order. The result
format is in the following example.

Example 1:
Input:
Users table:
+---------+-------------------+------------+--------+
| user_id | item              | created_at | amount |
+---------+-------------------+------------+--------+
| 5       | Smart Crock Pot   | 2021-09-18 | 698882 |
| 6       | Smart Lock        | 2021-09-14 | 11487  |
| 6       | Smart Thermostat  | 2021-09-10 | 674762 |
| 8       | Smart Light Strip | 2021-09-29 | 630773 |
| 4       | Smart Cat Feeder  | 2021-09-02 | 693545 |
| 4       | Smart Bed         | 2021-09-13 | 170249 |
+---------+-------------------+------------+--------+
Output:
+---------+
| user_id |
+---------+
| 6       |
+---------+
Explanation:
- User with user_id 5 has only one transaction, so he is not an active user.
- User with user_id 6 has two transaction his first transaction was on
  2021-09-10 and second transation was on 2021-09-14. The distance between the
  first and second transactions date is <= 7 days. So he is an active user.
- User with user_id 8 has only one transaction, so he is not an active user.
- User with user_id 4 has two transaction his first transaction was on
  2021-09-02 and second transation was on 2021-09-13. The distance between the
  first and second transactions date is > 7 days. So he is not an active user."""

def find_active_users(users: pd.DataFrame) -> pd.DataFrame:
    return users.assign(
        diff = (users['created_at'] - users.sort_values(
            by = ['user_id', 'created_at']
        ).groupby(
            by = 'user_id'
        )['created_at'].shift(1)).dt.days
    ).query(
        expr = 'diff <= 7'
    )[['user_id']].drop_duplicates()


"""2738. Count Occurrences in Text (Medium)
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
  Therefore, the total number of occurrences for the word "bear" is 2."""

def count_occurrences(files: pd.DataFrame) -> pd.DataFrame:
    bulls = files['content'].str.contains(' bull ').sum()
    bears = files['content'].str.contains(' bear ').sum()
    return pd.DataFrame({"word" : ["bull", "bear"], "count" : [bulls, bears]})


"""2820. Election Results (Medium)
SQL Schema
Table: Votes
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| voter       | varchar |
| candidate   | varchar |
+-------------+---------+
(voter, candidate) is the primary key (combination of unique values) for this
table. Each row of this table contains name of the voter and their candidate.
The election is conducted in a city where everyone can vote for one or more
candidates or choose not to vote. Each person has 1 vote so if they vote for
multiple candidates, their vote gets equally split across them. For example, if
a person votes for 2 candidates, these candidates receive an equivalent of 0.5
votes each. Write a solution to find candidate who got the most votes and won
the election. Output the name of the candidate or If multiple candidates have an
equal number of votes, display the names of all of them. Return the result table
ordered by candidate in ascending order. The result format is in the following
example.

Example 1:
Input:
Votes table:
+----------+-----------+
| voter    | candidate |
+----------+-----------+
| Kathy    | null      |
| Charles  | Ryan      |
| Charles  | Christine |
| Charles  | Kathy     |
| Benjamin | Christine |
| Anthony  | Ryan      |
| Edward   | Ryan      |
| Terry    | null      |
| Evelyn   | Kathy     |
| Arthur   | Christine |
+----------+-----------+
Output:
+-----------+
| candidate |
+-----------+
| Christine |
| Ryan      |
+-----------+
Explanation:
- Kathy and Terry opted not to participate in voting, resulting in their votes
  being recorded as 0. Charles distributed his vote among three candidates,
  equating to 0.33 for each candidate. On the other hand, Benjamin, Arthur,
  Anthony, Edward, and Evelyn each cast their votes for a single candidate.
- Collectively, Candidate Ryan and Christine amassed a total of 2.33 votes,
  while Kathy received a combined total of 1.33 votes.
Since Ryan and Christine received an equal number of votes, we will display
their names in ascending order."""

def get_election_results(votes: pd.DataFrame) -> pd.DataFrame:
    return votes.merge(
        right = votes.dropna().groupby(
            by = "voter",
            as_index = False
        ).agg(
            vote = ("voter", lambda x : 1/x.count())
        ),
        on = "voter"
    ).groupby(
        by = "candidate",
        as_index = False
    ).agg(
        vote = ("vote", "sum")
    ).query(
        expr = 'vote == vote.max()'
    ).sort_values(
        by = 'candidate'
    )[['candidate']]


"""2837. Total Traveled Distance (Easy)
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
Returning the table orderd by user_id in ascending order."""

def get_total_distance(users: pd.DataFrame, rides: pd.DataFrame) -> pd.DataFrame:
    return users.merge(
        rides,
        how="left",
        on="user_id"
    ).groupby(
        by=["name", "user_id"],
        as_index=False
    ).agg(
        traveled_distance=("distance", "sum")
    ).fillna(
        value=0
    ).sort_values(
        by="user_id"
    ).rename(
        columns={"traveled_distance" : "traveled distance"}
    )[["user_id", "name", "traveled distance"]]


"""2853. Highest Salaries Difference (Easy)
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
  and 53,000, respectively. Resulting in an absolute difference of 49,000."""

def salaries_difference(salaries: pd.DataFrame) -> pd.DataFrame:
    return pd.DataFrame(
        data=[
            abs(
                np.max(salaries.query('department == "Marketing"')["salary"])
                -
                np.max(salaries.query('department == "Engineering"')["salary"])
            )
        ],
        columns=["salary_difference"]
    )


"""2984. Find Peak Calling Hours for Each City (Medium)
SQL Schema
Table: Calls
+--------------+----------+
| Column Name  | Type     |
+--------------+----------+
| caller_id    | int      |
| recipient_id | int      |
| call_time    | datetime |
| city         | varchar  |
+--------------+----------+
(caller_id, recipient_id, call_time) is the primary key (combination of columns
with unique values) for this table. Each row contains caller id, recipient id,
call time, and city. Write a solution to find the peak calling hour for each
city. If multiple hours have the same number of calls, all of those hours will
be recognized as peak hours for that specific city. Return the result table
ordered by peak calling hour and city in descending order. The result format is
in the following example.

Example 1:
Input:
Calls table:
+-----------+--------------+---------------------+----------+
| caller_id | recipient_id | call_time           | city     |
+-----------+--------------+---------------------+----------+
| 8         | 4            | 2021-08-24 22:46:07 | Houston  |
| 4         | 8            | 2021-08-24 22:57:13 | Houston  |
| 5         | 1            | 2021-08-11 21:28:44 | Houston  |
| 8         | 3            | 2021-08-17 22:04:15 | Houston  |
| 11        | 3            | 2021-08-17 13:07:00 | New York |
| 8         | 11           | 2021-08-17 14:22:22 | New York |
+-----------+--------------+---------------------+----------+
Output:
+----------+-------------------+-----------------+
| city     | peak_calling_hour | number_of_calls |
+----------+-------------------+-----------------+
| Houston  | 22                | 3               |
| New York | 14                | 1               |
| New York | 13                | 1               |
+----------+-------------------+-----------------+
Explanation:
For Houston:
  - The peak time is 22:00, with a total of 3 calls recorded.
For New York:
  - Both 13:00 and 14:00 hours have equal call counts of 1, so both times are
    considered peak hours.
Output table is ordered by peak_calling_hour and city in descending order."""

def peak_calling_hours(calls: pd.DataFrame) -> pd.DataFrame:
    return calls.assign(
        calling_hour = lambda x: x['call_time'].dt.hour
    ).groupby(
        by = ['city', 'calling_hour'],
        as_index = False
    ).agg(
        number_of_calls = ('caller_id', 'count')
    ).assign(
        rank = lambda x: x.groupby(by = 'city')['number_of_calls'].rank(method = 'dense', ascending=False)
    ).query(
        expr = 'rank == 1'
    ).rename(
        columns = {'calling_hour' : 'peak_calling_hour'}
    ).sort_values(
        by = ['peak_calling_hour', 'city'],
        ascending = [False, False]
    )[['city', 'peak_calling_hour', 'number_of_calls']]


"""2985. Calculate Compressed Mean (Easy)
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
 - Therefore, the average items per order is 8900 / 3300 = 2.70"""

def compressed_mean(orders: pd.DataFrame) -> pd.DataFrame:
    return pd.DataFrame(
        data = [round((orders['item_count'] * orders['order_occurrences']).sum() / orders['order_occurrences'].sum(), 2)],
        columns = ["average_items_per_order"]
    )


"""2986. Find Third Transaction (Medium)
SQL Schema
Table: Transactions
+------------------+----------+
| Column Name      | Type     |
+------------------+----------+
| user_id          | int      |
| spend            | decimal  |
| transaction_date | datetime |
+------------------+----------+
(user_id, transaction_date) is column of unique values for this table. This
table contains user_id, spend, and transaction_date. Write a solution to find
the third transaction (if they have at least three transactions) of every user,
where the spending on the preceding two transactions is lower than the spending
on the third transaction. Return the result table by user_id in ascending order.
The result format is in the following example.

Example 1:
Input:
Transactions table:
+---------+--------+---------------------+
| user_id | spend  | transaction_date    |
+---------+--------+---------------------+
| 1       | 65.56  | 2023-11-18 13:49:42 |
| 1       | 96.0   | 2023-11-30 02:47:26 |
| 1       | 7.44   | 2023-11-02 12:15:23 |
| 1       | 49.78  | 2023-11-12 00:13:46 |
| 2       | 40.89  | 2023-11-21 04:39:15 |
| 2       | 100.44 | 2023-11-20 07:39:34 |
| 3       | 37.33  | 2023-11-03 06:22:02 |
| 3       | 13.89  | 2023-11-11 16:00:14 |
| 3       | 7.0    | 2023-11-29 22:32:36 |
+---------+--------+---------------------+
Output
+---------+-------------------------+------------------------+
| user_id | third_transaction_spend | third_transaction_date |
+---------+-------------------------+------------------------+
| 1       | 65.56                   | 2023-11-18 13:49:42    |
+---------+-------------------------+------------------------+
Explanation
- For user_id 1, their third transaction occurred on 2023-11-18 at 13:49:42 with
  an amount of $65.56, surpassing the expenditures of the previous two
  transactions which were $7.44 on 2023-11-02 at 12:15:23 and $49.78 on
  2023-11-12 at 00:13:46. Thus, this third transaction will be included in the
  output table.
- user_id 2 only has a total of 2 transactions, so there isn't a third
  transaction to consider.
- For user_id 3, the amount of $7.0 for their third transaction is less than
  that of the preceding two transactions, so it won't be included.
Output table is ordered by user_id in ascending order."""

def find_third_transaction(transactions: pd.DataFrame) -> pd.DataFrame:
    transactions = transactions.sort_values(
        by = ['user_id', 'transaction_date']
    )
    return transactions.assign(
        row_number = transactions.groupby('user_id').cumcount()+1,
        spend_prev = transactions.groupby('user_id')['spend'].shift(1),
        spend_prev_prev = transactions.groupby('user_id')['spend'].shift(2)
    ).query(
        expr = 'row_number == 3 & spend > spend_prev & spend > spend_prev_prev'
    ).rename(
        columns = {'spend' : 'third_transaction_spend', 'transaction_date' : 'third_transaction_date'}
    )[['user_id', 'third_transaction_spend', 'third_transaction_date']]


"""2987. Find Expensive Cities (Easy)
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
output table is sorted in ascending order based on the city names."""

def find_expensive_cities(listings: pd.DataFrame) -> pd.DataFrame:
    avg = listings["price"].mean()
    return listings.groupby(
        by="city",
        as_index=False
    ).agg(
        price=("price", "mean")
    ).query(
        expr="price > @avg"
    ).sort_values(
        by="city"
    )[["city"]]


"""2988. Manager of the Largest Department (Medium)
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
  table is ordered by dep_id in ascending order."""

def find_manager(employees: pd.DataFrame) -> pd.DataFrame:
    mode = employees['dep_id'].mode()
    return employees.query(
        expr = 'dep_id in @mode & position == "Manager"'
    ).rename(
        columns = {'emp_name' : 'manager_name'}
    ).sort_values(
        by = 'dep_id'
    )[['manager_name', 'dep_id']]


"""2989. Class Performance (Medium)
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
score of 119. Therefore, the difference between them is 111."""

def class_performance(scores: pd.DataFrame) -> pd.DataFrame:
    return pd.DataFrame({"difference_in_score" : scores.assign(
        total = lambda x: x['assignment1'] + x['assignment2'] + x['assignment3']
    )[['total']].apply(
        func = np.ptp
    )})


"""2990. Loan Types (Easy)
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
Output table is ordered by user_id in ascending order."""

def loan_types(loans: pd.DataFrame) -> pd.DataFrame:
    return loans.merge(
        right=loans,
        on="user_id"
    ).query(
        expr='loan_type_x == "Mortgage" & loan_type_y == "Refinance"'
    ).sort_values(
        by="user_id"
    ).drop_duplicates(
        subset="user_id"
    )[["user_id"]]


"""2993. Friday Purchases I (Medium)
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
Output table is ordered by week_of_month in ascending order."""

def friday_purchases(purchases: pd.DataFrame) -> pd.DataFrame:
    return purchases.assign(
        week_of_month = lambda x: x['purchase_date'].dt.isocalendar().week - pd.to_datetime('2023-11-01').week + 1,
        weekday = lambda x: x['purchase_date'].dt.weekday
    ).query(
        expr = 'weekday == 4'
    ).groupby(
        by = ['week_of_month', 'purchase_date'],
        as_index = False
    ).agg(
        total_amount = ('amount_spend', 'sum')
    ).sort_values(
        by = 'week_of_month'
    )


"""3050. Pizza Toppings Cost Analysis (Medium)
SQL Schema
Table: Toppings
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| topping_name | varchar |
| cost         | decimal |
+--------------+---------+
topping_name is the primary key for this table. Each row of this table contains
topping name and the cost of the topping. Write a solution to calculate the
total cost of all possible 3-topping pizza combinations from a given list of
toppings. The total cost of toppings must be rounded to 2 decimal places.

Note:
* Do not include the pizzas where a topping is repeated. For example,
  ‘Pepperoni, Pepperoni, Onion Pizza’.
* Toppings must be listed in alphabetical order. For example,
  'Chicken, Onions, Sausage'. 'Onion, Sausage, Chicken' is not acceptable.
Return the result table ordered by total cost in descending order and
combination of toppings in ascending order. The result format is in the
following example.

Example 1:
Input:
Toppings table:
+--------------+------+
| topping_name | cost |
+--------------+------+
| Pepperoni    | 0.50 |
| Sausage      | 0.70 |
| Chicken      | 0.55 |
| Extra Cheese | 0.40 |
+--------------+------+
Output:
+--------------------------------+------------+
| pizza                          | total_cost |
+--------------------------------+------------+
| Chicken,Pepperoni,Sausage      | 1.75       |
| Chicken,Extra Cheese,Sausage   | 1.65       |
| Extra Cheese,Pepperoni,Sausage | 1.60       |
| Chicken,Extra Cheese,Pepperoni | 1.45       |
+--------------------------------+------------+
Explanation:
There are only four different combinations possible with the three topings:
- Chicken, Pepperoni, Sausage: Total cost is $1.75 (Chicken $0.55, Pepperoni
  $0.50, Sausage $0.70).
- Chicken, Extra Cheese, Sausage: Total cost is $1.65 (Chicken $0.55, Extra
  Cheese $0.40, Sausage $0.70).
- Extra Cheese, Pepperoni, Sausage: Total cost is $1.60 (Extra Cheese $0.40,
  Pepperoni $0.50, Sausage $0.70).
- Chicken, Extra Cheese, Pepperoni: Total cost is $1.45 (Chicken $0.55, Extra
  Cheese $0.40, Pepperoni $0.50).
Output table is ordered by the total cost in descending order."""

def cost_analysis(toppings: pd.DataFrame) -> pd.DataFrame:
    return toppings.merge(
        right = toppings,
        how = 'cross'
    ).merge(
        right = toppings,
        how = 'cross'
    ).query(
        expr = 'topping_name_x < topping_name_y & topping_name_y < topping_name'
    ).assign(
        pizza = lambda x : x['topping_name_x'] + ',' + x['topping_name_y'] + ',' + x['topping_name'],
        total_cost = lambda x : round(x['cost_x'] + x['cost_y'] + x['cost'], 2)
    ).sort_values(
        by = ['total_cost', 'pizza'],
        ascending = [False, True]
    )[['pizza', 'total_cost']]


"""3051. Find Candidates for Data Scientist Position (Easy)
SQL Schema
Table: Candidates
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| candidate_id | int     |
| skill        | varchar |
+--------------+---------+
(candidate_id, skill) is the primary key (columns with unique values) for this
table. Each row includes candidate_id and skill. Write a query to find the
candidates best suited for a Data Scientist position. The candidate must be
proficient in Python, Tableau, and PostgreSQL. Return the result table ordered
by candidate_id in ascending order. The result format is in the following
example.

Example 1:
Input:
Candidates table:
+---------------+--------------+
| candidate_id  | skill        |
+---------------+--------------+
| 123           | Python       |
| 234           | R            |
| 123           | Tableau      |
| 123           | PostgreSQL   |
| 234           | PowerBI      |
| 234           | SQL Server   |
| 147           | Python       |
| 147           | Tableau      |
| 147           | Java         |
| 147           | PostgreSQL   |
| 256           | Tableau      |
| 102           | DataAnalysis |
+---------------+--------------+
Output:
+--------------+
| candidate_id |
+--------------+
| 123          |
| 147          |
+--------------+
Explanation:
- Candidates 123 and 147 possess the necessary skills in Python, Tableau, and
  PostgreSQL for the data scientist position.
- Candidates 234 and 102 do not possess any of the required skills for this
  position.
- Candidate 256 has proficiency in Tableau but is missing skills in Python and
  PostgreSQL.
The output table is sorted by candidate_id in ascending order."""

def find_candidates(candidates: pd.DataFrame) -> pd.DataFrame:
    return candidates.query(
        expr = 'skill in ["Python", "Tableau", "PostgreSQL"]'
    ).groupby(
        by = 'candidate_id',
        as_index = False
    ).agg(
        cnt = ('skill', 'count')
    ).query(
        expr = 'cnt == 3'
    ).sort_values(
        by = 'candidate_id'
    )[['candidate_id']]


"""3053. Classifying Triangles by Lengths (Easy)
SQL Schema
Table: Triangles
+-------------+------+
| Column Name | Type |
+-------------+------+
| A           | int  |
| B           | int  |
| C           | int  |
+-------------+------+
(A, B, C) is the primary key for this table. Each row include the lengths of
each of a triangle's three sides. Write a query to find the type of triangle.
Output one of the following for each row:
* Equilateral: It's a triangle with 3 sides of equal length.
* Isosceles: It's a triangle with 2 sides of equal length.
* Scalene: It's a triangle with 3 sides of differing lengths.
* Not A Triangle: The given values of A, B, and C don't form a triangle.
Return the result table in any order. The result format is in the following
example.

Example 1:
Input:
Triangles table:
+----+----+----+
| A  | B  | C  |
+----+----+----+
| 20 | 20 | 23 |
| 20 | 20 | 20 |
| 20 | 21 | 22 |
| 13 | 14 | 30 |
+----+----+----+
Output:
+----------------+
| triangle_type  |
+----------------+
| Isosceles      |
| Equilateral    |
| Scalene        |
| Not A Triangle |
+----------------+
Explanation:
- Values in the first row from an Isosceles triangle, because A = B.
- Values in the second row from an Equilateral triangle, because A = B = C.
- Values in the third row from an Scalene triangle, because A != B != C.
- Values in the fourth row cannot form a triangle, because the combined value of
  sides A and B is not larger than that of side C."""

def type_of_triangle(triangles: pd.DataFrame) -> pd.DataFrame:
    return triangles.assign(
        triangle_type = lambda x: np.where((x['A'] == x['B']) & (x['B'] == x['C']), 'Equilateral',
                                  np.where((x['A']+x['B'] <= x['C']) | (x['B']+x['C'] <= x['A']) | (x['C']+x['A'] <= x['B']), 'Not A Triangle',
                                  np.where((x['A'] == x['B']) | (x['B'] == x['C']) | (x['C'] == x['A']), 'Isosceles', 'Scalene')))
    )[['triangle_type']]


"""3054. Binary Tree Nodes (Medium)
SQL Schema
Table: Tree
+-------------+------+
| Column Name | Type |
+-------------+------+
| N           | int  |
| P           | int  |
+-------------+------+
N is the column of unique values for this table. Each row includes N and P,
where N represents the value of a node in Binary Tree, and P is the parent of N.
Write a solution to find the node type of the Binary Tree. Output one of the
following for each node:
* Root: if the node is the root node.
* Leaf: if the node is the leaf node.
* Inner: if the node is neither root nor leaf node.
Return the result table ordered by node value in ascending order. The result
format is in the following example.

Example 1:
Input:
Tree table:
+---+------+
| N | P    |
+---+------+
| 1 | 2    |
| 3 | 2    |
| 6 | 8    |
| 9 | 8    |
| 2 | 5    |
| 8 | 5    |
| 5 | null |
+---+------+
Output:
+---+-------+
| N | Type  |
+---+-------+
| 1 | Leaf  |
| 2 | Inner |
| 3 | Leaf  |
| 5 | Root  |
| 6 | Leaf  |
| 8 | Inner |
| 9 | Leaf  |
+---+-------+
Explanation:
- Node 5 is the root node since it has no parent node.
- Nodes 1, 3, 6, and 8 are leaf nodes because they don't have any child nodes.
- Nodes 2, 4, and 7 are inner nodes as they serve as parents to some of the
  nodes in the structure."""

def binary_tree_nodes(tree: pd.DataFrame) -> pd.DataFrame:
    return tree.assign(
        Type = lambda x: np.where(
            x['P'].isna(), "Root", np.where(x['N'].isin(x['P']), "Inner", "Leaf")
        )
    ).sort_values(
        by = 'N'
    )[['N', 'Type']]


"""3056. Snaps Analysis (Medium)
SQL Schema
Table: Activities
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| activity_id   | int     |
| user_id       | int     |
| activity_type | enum    |
| time_spent    | decimal |
+---------------+---------+
activity_id is column of unique values for this table. activity_type is an ENUM
(category) type of ('send', 'open'). This table contains activity id, user id,
activity type and time spent.

Table: Age
+-------------+------+
| Column Name | Type |
+-------------+------+
| user_id     | int  |
| age_bucket  | enum |
+-------------+------+
user_id is the column of unique values for this table. age_bucket is an ENUM
(category) type of ('21-25', '26-30', '31-35'). This table contains user id and
age group. Write a solution to calculate the percentage of the total time spent
on sending and opening snaps for each age group. Precentage should be rounded to
2 decimal places. Return the result table in any order. The result format is in
the following example.

Example 1:
Input:
Activities table:
+-------------+---------+---------------+------------+
| activity_id | user_id | activity_type | time_spent |
+-------------+---------+---------------+------------+
| 7274        | 123     | open          | 4.50       |
| 2425        | 123     | send          | 3.50       |
| 1413        | 456     | send          | 5.67       |
| 2536        | 456     | open          | 3.00       |
| 8564        | 456     | send          | 8.24       |
| 5235        | 789     | send          | 6.24       |
| 4251        | 123     | open          | 1.25       |
| 1435        | 789     | open          | 5.25       |
+-------------+---------+---------------+------------+
Age table:
+---------+------------+
| user_id | age_bucket |
+---------+------------+
| 123     | 31-35      |
| 789     | 21-25      |
| 456     | 26-30      |
+---------+------------+
Output:
+------------+-----------+-----------+
| age_bucket | send_perc | open_perc |
+------------+-----------+-----------+
| 31-35      | 37.84     | 62.16     |
| 26-30      | 82.26     | 17.74     |
| 21-25      | 54.31     | 45.69     |
+------------+-----------+-----------+
Explanation:
For age group 31-35:
  - There is only one user belonging to this group with the user ID 123.
  - The total time spent on sending snaps by this user is 3.50, and the time
    spent on opening snaps is 4.50 + 1.25 = 5.75.
  - The overall time spent by this user is 3.50 + 5.75 = 9.25.
  - Therefore, the sending snap percentage will be (3.50 / 9.25) * 100 = 37.84,
    and the opening snap percentage will be (5.75 / 9.25) * 100 = 62.16.
For age group 26-30:
  - There is only one user belonging to this group with the user ID 456.
  - The total time spent on sending snaps by this user is 5.67 + 8.24 = 13.91,
    and the time spent on opening snaps is 3.00.
  - The overall time spent by this user is 13.91 + 3.00 = 16.91.
  - Therefore, the sending snap percentage will be (13.91 / 16.91) * 100 =
    82.26, and the opening snap percentage will be (3.00 / 16.91) * 100 = 17.74.
For age group 21-25:
  - There is only one user belonging to this group with the user ID 789.
  - The total time spent on sending snaps by this user is 6.24, and the time
    spent on opening snaps is 5.25.
  - The overall time spent by this user is 6.24 + 5.25 = 11.49.
  - Therefore, the sending snap percentage will be (6.24 / 11.49) * 100 = 54.31,
    and the opening snap percentage will be (5.25 / 11.49) * 100 = 45.69.
All percentages in output table rounded to the two decimal places."""

def snap_analysis(activities: pd.DataFrame, age: pd.DataFrame) -> pd.DataFrame:
    return activities.merge(
        right = age,
        on = 'user_id'
    ).assign(
        send_time = lambda x: np.where(x['activity_type'] == 'send', x['time_spent'], 0),
        open_time = lambda x: np.where(x['activity_type'] == 'open', x['time_spent'], 0)
    ).groupby(
        by = 'age_bucket',
        as_index = False
    ).agg(
        send_time = ('send_time', 'sum'),
        open_time = ('open_time', 'sum')
    ).astype(
        {'send_time' : 'float64', 'open_time' : 'float64'}
    ).assign(
        send_perc = lambda x: round(100*x['send_time'] / (x['open_time'] + x['send_time']), 2),
        open_perc = lambda x: round(100*x['open_time'] / (x['open_time'] + x['send_time']), 2)
    )[['age_bucket', 'send_perc', 'open_perc']]


"""3059. Find All Unique Email Domains (Easy)
SQL Schema
Table: Emails
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| email       | varchar |
+-------------+---------+
id is the primary key (column with unique values) for this table. Each row of
this table contains an email. The emails will not contain uppercase letters.
Write a solution to find all unique email domains and count the number of
individuals associated with each domain. Consider only those domains that end
with .com. Return the result table orderd by email domains in ascending order.
The result format is in the following example.

Example 1:
Input:
Emails table:
+-----+-----------------------+
| id  | email                 |
+-----+-----------------------+
| 336 | hwkiy@test.edu        |
| 489 | adcmaf@outlook.com    |
| 449 | vrzmwyum@yahoo.com    |
| 95  | tof@test.edu          |
| 320 | jxhbagkpm@example.org |
| 411 | zxcf@outlook.com      |
+----+------------------------+
Output:
+--------------+-------+
| email_domain | count |
+--------------+-------+
| outlook.com  | 2     |
| yahoo.com    | 1     |
+--------------+-------+
Explanation:
- The valid domains ending with ".com" are only "outlook.com" and "yahoo.com",
  with respective counts of 2 and 1.
Output table is ordered by email_domains in ascending order."""

def find_unique_email_domains(emails: pd.DataFrame) -> pd.DataFrame:
    return emails.query(
        expr = 'email.str.endswith(".com")'
    ).assign(
        email_domain = lambda x: x['email'].str.split('@').str[1]
    ).groupby(
        by = 'email_domain',
        as_index = False
    ).agg(
        count = ('email_domain', 'count')
    ).sort_values(
        by = 'email_domain'
    )
