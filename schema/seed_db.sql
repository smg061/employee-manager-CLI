USE employees_db;

INSERT INTO department(name) VALUES
("Human Resources"),
("Information Technology"),
("Customer Service"),
("Engineering"),
("Public Relationships");

INSERT INTO role(title, salary, department_id) VALUES
("Junior Front End Developer", 50000, (SELECT id FROM department WHERE name="Information Technology")),
("Senior Developer", 110000, (SELECT id FROM department WHERE name="Information Technology")),
("PR consultant", 76000, (SELECT id FROM department WHERE name="Public Relationships")),
("Social Media Manager", 45000, (SELECT id FROM department WHERE name="Public Relationships")),
("Sales Manager", 53000,(SELECT id FROM department WHERE name="Customer Service")),
("Sales representative", 46000, (SELECT id FROM department WHERE name="Customer Service")),
("Senior Engineer", 178000, (SELECT id FROM department WHERE name="Engineering")),
("Secretary", 48000, (SELECT id FROM department WHERE name="Human Resources"));

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
("John", "Doe", (SELECT id from role WHERE id=1), null),
("Jane", "Smith", (SELECT id from role WHERE id=1), (SELECT t1.employee_id FROM employee t1 WHERE t1.employee_id = 1)),
("Jake", "Flores", (SELECT id from role WHERE id=2),(SELECT t1.employee_id FROM employee t1 WHERE t1.employee_id = 2)),
("Carlos", "Bodega", (SELECT id from role WHERE id=3),(SELECT t1.employee_id FROM employee t1 WHERE t1.employee_id = 1)),
("Kate", "Porter", (SELECT id from role WHERE id=5),(SELECT t1.employee_id FROM employee t1 WHERE t1.employee_id = 2)),
("Donovan", "Kallinsky", (SELECT id from role WHERE id=6),(SELECT t1.employee_id FROM employee t1 WHERE t1.employee_id = 2)),
("Miguel", "Torres", (SELECT id from role WHERE id=7),(SELECT t1.employee_id FROM employee t1 WHERE t1.employee_id = 1)),
("Gonzalo", "Fernandez", (SELECT id from role WHERE title='Senior Developer'), null);