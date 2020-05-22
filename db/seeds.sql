USE characters_db; 

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

SELECT department.id, role.department_id
FROM department
INNER JOIN role
ON department.id = role.department_id
ORDER BY department.id;

SELECT role.id, employee.role_id
FROM role
INNER JOIN employee
ON role.id = employee.role_id
ORDER BY employee.id;

INSERT INTO department (department_name) VALUES ('Information Technology');
INSERT INTO department (department_name) VALUES ('Programming');
INSERT INTO department (department_name) VALUES ('Sales');


INSERT INTO role (role_title, department_id) VALUES ('IT Specialist', 1);
INSERT INTO role (role_title, department_id) VALUES ('Software Developer', 2);
INSERT INTO role (role_title, department_id) VALUES ('Sales Representative', 3);
INSERT INTO role (role_title, department_id) VALUES ('Lead IT Specialist', 1);
INSERT INTO role (role_title, department_id) VALUES ('Lead Software Developer', 2);
INSERT INTO role (role_title, department_id) VALUES ('Sales Lead', 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jen','Barber', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Bill','Lumbergh', 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Micheal','Scott', 6, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Maurice' 'Moss', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Roy' 'Trenneman', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Peter' 'Gibbons', 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Milton' 'Waddams', 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Samir' 'Nagheenanajar', 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Michael' 'Bolton', 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Dwight' 'Schrute', 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Blake' 'Henderson', 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Adam' 'DeMamp', 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Anders' 'Holm', 3, 3);

