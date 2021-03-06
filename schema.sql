CREATE DATABASE Employee_Tracker;

USE Employee_Tracker;

CREATE TABLE department(
id integer auto_increment not null,
name varchar(30) not null,
primary key(id)
);

CREATE TABLE role(
id integer auto_increment not null,
title varchar(30) not null,
salary decimal not null,
department_id Integer not null,
constraint fk_department_id foreign key (department_id) references department(id) ON DELETE CASCADE,
primary key(id)
);


CREATE TABLE employee(
id integer auto_increment not null,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id integer not null,
manager_id integer ,
constraint fk_role_id FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
constraint fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
Primary key(id)
);

select * from employee;
select * from role;
select * from department;


