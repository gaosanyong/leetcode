
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