USE employees_db;

INSERT INTO department(name) VALUES
("Human Resources"),
("Information Technology"),
("Customer Service"),
("Engineering"),
("Public Relationships");

INSERT INTO role(title,department_id) VALUES
("Junior Front End Developer", (SELECT id FROM department WHERE name="Information Technology")),
("Senior Developer", (SELECT id FROM department WHERE name="Information Technology")),
("PR consultant", (SELECT id FROM department WHERE name="Public Relationships")),
("Social Media Manager", (SELECT id FROM department WHERE name="Public Relationships")),
("Sales Manager", (SELECT id FROM department WHERE name="Customer Service")),
("Sales representative",(SELECT id FROM department WHERE name="Customer Service")),
("Senior Engineer",(SELECT id FROM department WHERE name="Human Resources")),
("Secretary", (SELECT id FROM department WHERE name="Human Resources"));

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
("John", "Doe", (SELECT id from role WHERE id=1), null),
("Jane", "Smith", (SELECT id from role WHERE id=1), (SELECT t1.employee_id FROM employee t1 WHERE t1.employee_id = 1)),
("Jake", "Flores", (SELECT id from role WHERE id=2),(SELECT t1.employee_id FROM employee t1 WHERE t1.employee_id = 2)),
("Carlos", "Bodega", (SELECT id from role WHERE id=3),(SELECT t1.employee_id FROM employee t1 WHERE t1.employee_id = 1)),
("Kate", "Porter", (SELECT id from role WHERE id=5),(SELECT t1.employee_id FROM employee t1 WHERE t1.employee_id = 2)),
("Donovan", "Kallinsky", (SELECT id from role WHERE id=6),(SELECT t1.employee_id FROM employee t1 WHERE t1.employee_id = 2)),
("Miguel", "Torres", (SELECT id from role WHERE id=7),(SELECT t1.employee_id FROM employee t1 WHERE t1.employee_id = 1));






