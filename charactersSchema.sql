DROP DATABASE IF EXISTS characters_db; 

CREATE DATABASE characters_db; 

USE characters_db; 

CREATE TABLE department (
    id INT NOT NULL,
    engineering VARCHAR(30),
    sales VARCHAR(30),
    information technology VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL,
    engineer VARCHAR(30),
    sales rep VARCHAR(30),
    IT VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL, 
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);