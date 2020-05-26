USE characters_db;

-- Show all --  
SELECT e.first_name, e.last_name, e.id AS employee_id, r.salary, r.role_title, d.department_name
FROM employee e
LEFT JOIN employee em ON e.manager_id = em.id
INNER JOIN role r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id
ORDER BY e.id;

-- Viewing by Employments Department-- 
SELECT d.department_name, e.first_name, e.last_name, e.id AS employee_id, r.salary, r.role_title
FROM employee e
LEFT JOIN employee em ON e.manager_id = em.id
INNER JOIN role r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id
ORDER BY d.department_name;


SELECT d.department_name AS Department, r.role_title AS Postion, r.salary AS Salary
FROM department d
RIGHT JOIN role r ON r.department_id = d.id
ORDER BY d.department_name;

SELECT role_title, salary FROM role
ORDER BY role_title; 

-- delete employees-- 
DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

INSERT INTO department (department_name) VALUES ('Information Technology');
INSERT INTO department (department_name) VALUES ('Software Engineering');
INSERT INTO department (department_name) VALUES ('Sales');


INSERT INTO role (role_title, department_id, salary) VALUES ('IT Specialist', 1, 60000.00);
INSERT INTO role (role_title, department_id, salary) VALUES ('Software Developer', 2, 80000.00);
INSERT INTO role (role_title, department_id, salary) VALUES ('Sales Representative', 3, 50000.00);
INSERT INTO role (role_title, department_id, salary) VALUES ('Lead IT Specialist', 1, 70000.00);
INSERT INTO role (role_title, department_id, salary) VALUES ('Lead Software Developer', 2, 900000.00);
INSERT INTO role (role_title, department_id, salary) VALUES ('Sales Lead', 3, 65000.00);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jen','Barber', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Bill','Lumbergh', 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Micheal','Scott', 6, 3);


INSERT INTO employee (first_name, last_name, role_id) VALUES ('Maurice','Moss', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Roy','Trenneman', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Peter','Gibbons', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Milton','Waddams', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Samir','Nagheenanajar', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Michael','Bolton', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Dwight','Schrute', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Blake','Henderson', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Adam','DeMamp', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Anders','Holm', 3);

