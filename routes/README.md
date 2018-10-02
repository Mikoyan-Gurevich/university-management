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
* Start development server. This will start the service at port 3000.
  ```
  npm start
  ```

## API formats

### Get All Students
This API returns the students present in database according to the query params present in the URL.
#### URL
```
/students?classes=1&classes=2&admissionYearAfter=2017&active=true
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
### Get Student By student ID
Returns a single student whose ID is given
#### URL
```
/students/:id
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
### Get student with semester class
### Create new student
### Update student name
### Delete student with student ID
### Get classes
### Add students to class
