## Pre-requisites 

* Postgresql installed.
* nodeJS + NPM installed.
* git installed.

## Steps for running service in local development machine
* clone this repository 
   ```
    git clone https://github.com/Mikoyan-Gurevich/university-management.git
   ```
* install npm dependencies
  ```
  cd university-management
  npm install
  ```
* Execute university.sql file to initialize database.
  ```
  psql -U postgres -f university.sql
  ```
* Start development server. This will start the service at port 3000.
  ```
  npm start
  ```

## API Formats

### 1. Get All Students
This API returns the students present in database according to the query params present in the URL.
#### URL
```
GET - /students?classes=1&classes=2&admissionYearAfter=2017&active=true
```
#### Response
```JSON
[
    {
        "roll_no": 1,
        "name": "Name 1",
        "admission_date": "2018-08-04",
        "is_active": 1,
        "sem_class_id": null
    },
    {
        "roll_no": 2,
        "name": "Name 2",
        "admission_date": "2018-08-02",
        "is_active": 1,
        "sem_class_id": null
    }
]
```
### 2. Get Student By student ID
Returns a single student whose ID is given
#### URL
```
GET - /students/:id
```
#### Response
```JSON
[
    {
        "roll_no": 1,
        "name": "Gaurav Sharma",
        "admission_date": "1992-11-07",
        "is_active": 1,
        "sem_class_id": null
    }
]
```
### 3. Get student with semester class
Returns the semester classes student is part of, including the professor teaching the class.
#### URL
```
GET - /students/:studentId/classes
```
#### Response
```JSON
[
    {
        "student_name": "Gaurav Sharma",
        "professor_name": "Gaitonde",
        "sem_class": "Maths"
    }
]
```
### 4. Create new student
Creates a new student
#### URL 
```
POST - /students
```
#### Body
```JSON
{
	"name":"Saurabh Sharma",
	"admissionDate": "1990-08-23"
}
```
### 5. Update student name
#### URL
Updates the name of student
```
PATCH - /students/:id
```
#### Body
```JSON
{
	"name":"Saurav Sharma"
}
```
### 6. Delete student with student ID
Marks the student as inactive in database.
#### URL
```
DELETE - /students/:id
```
### 7. Get classes
Returns list of classes.
#### URL
```
GET - /classes
```
#### Response
```JSON
[
    {
        "id": 1,
        "title": "Maths"
    },
    {
        "id": 2,
        "title": "English"
    }
]
```
### 8. Add students to class
Adds provided students to a semester class.
#### URL
```
POST - /classes/:classId/students?studentId=:studentId1&studentId=:studentId2
```
#### Body
```JSON
{}
```
