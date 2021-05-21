DROP DATABASE IF EXISTS employeees_db;
CREATE DATABASE employees_db;

USE employees_db;
DROP TABLE IF EXISTS department;
CREATE TABLE department(
id	INT	NOT NULL	PRIMARY KEY,
name	VARCHAR(30)
);

DROP TABLE IF EXISTS role;
CREATE TABLE role(
id	INT	AUTO_INCREMENT	PRIMARY KEY,
title	VARCHAR(30),
department_id	INT	NOT NULL,
CONSTRAINT FK_department_id FOREIGN KEY(department_id) 
REFERENCES department(id)
);


DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
employee_id	INT	NOT NULL	AUTO_INCREMENT	PRIMARY KEY,
first_name	VARCHAR(30),
last_name	VARCHAR(30),
role_id		INT,
manager_id	INT,
CONSTRAINT FK_role_id FOREIGN KEY (role_id)
REFERENCES role(id),
CONSTRAINT SR_FK_manager_id FOREIGN KEY (manager_id)
REFERENCES employee(employee_id)
);