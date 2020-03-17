USE Employee_Tracker;

INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES('Engineering');
INSERT INTO department (name) VALUES('Finance');
INSERT INTO department (name) VALUES('Legal');

INSERT INTO role (title, salary, department_id) VALUES ('Sales Lead', '100000', '1');
INSERT INTO role (title, salary, department_id) VALUES ('Salesperson', '80000', '1');
INSERT INTO role (title, salary, department_id) VALUES ('Lead Engineer', '150000', '2');
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', '120000', '2');
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', '125000', '3');
INSERT INTO role (title, salary, department_id) VALUES ('Legal Team Lead', '250000', '4');
INSERT INTO role (title, salary, department_id) VALUES ('Lawyer', '190000', '4');

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Ashley', 'Rodriguez', 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('kevin', 'Chan', 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('lauraence', 'Tupik', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('sara', 'Brown', 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('chen', 'Lourd', 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('jiten', 'Allen', 7, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('rahul', 'Eckenrode', 3, 3);