DROP DATABASE IF EXISTS university;
CREATE DATABASE university;

\c university

CREATE TABLE semester_class (
  id SERIAL PRIMARY KEY,
  title VARCHAR
);

CREATE TABLE professor (
  university_staff_no SERIAL PRIMARY KEY, 
  name VARCHAR,   
  designation VARCHAR,
  sem_class_id INTEGER,
  FOREIGN KEY (sem_class_id) REFERENCES semester_class(id)
);

CREATE TABLE student (
  roll_no SERIAL PRIMARY KEY,
  name VARCHAR,
  admission_date VARCHAR NOT NULL ,
  is_active INTEGER  DEFAULT 1
);

CREATE TABLE class_mapping (
  student_roll_no SERIAL,
  FOREIGN KEY (student_roll_no) REFERENCES student(roll_no),
  semester_class_id SERIAL,
  FOREIGN KEY (semester_class_id) REFERENCES semester_class(id),
  PRIMARY KEY(student_roll_no, semester_class_id)
);


insert into semester_class (title) VALUES('Maths');
insert into semester_class (title) VALUES('English');
insert into semester_class (title) VALUES('Hindi');
insert into semester_class (title) VALUES('Geography');
insert into semester_class (title) VALUES('History');
insert into semester_class (title) VALUES('Civics');
insert into semester_class (title) VALUES('Physics');


insert into professor(name,designation, sem_class_id) values ('Gaitonde','Head Of Departrment', 1);
insert into professor(name,designation, sem_class_id) values ('Choubey','Lecturer', 2); 
insert into professor(name,designation, sem_class_id) values ('Ghuman','Senior Lecturer',3 ); 
insert into professor(name,designation, sem_class_id) values ('Sugian','Associate Professor', 4); 
insert into professor(name,designation, sem_class_id) values ('Mishra','Professor', 5); 
insert into professor(name,designation, sem_class_id) values ('Halder','Junior Professor', 6); 
insert into professor(name,designation, sem_class_id) values ('Tiffin','Senior Professor', 7); 