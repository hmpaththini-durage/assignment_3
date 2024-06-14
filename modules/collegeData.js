const fs = require('fs');

let students = [];
let courses = [];

module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/students.json', 'utf8', (err, data) => {
            if (err) {
                reject("unable to read students.json");
                return;
            }
            students = JSON.parse(data);

            fs.readFile('./data/courses.json', 'utf8', (err, data) => {
                if (err) {
                    reject("unable to read courses.json");
                    return;
                }
                courses = JSON.parse(data);
                resolve();
            });
        });
    });
};

module.exports.getAllStudents = function () {
    return new Promise((resolve, reject) => {
        if (students.length === 0) {
            reject("no results");
            return;
        }
        resolve(students);
    });
};

module.exports.getCourses = function () {
    return new Promise((resolve, reject) => {
        if (courses.length === 0) {
            reject("no results");
            return;
        }
        resolve(courses);
    });
};

module.exports.getStudentsByCourse = function (course) {
    return new Promise((resolve, reject) => {
        const filteredStudents = students.filter(student => student.course === course);
        if (filteredStudents.length === 0) {
            reject("no results returned");
            return;
        }
        resolve(filteredStudents);
    });
};

module.exports.getStudentByNum = function (num) {
    return new Promise((resolve, reject) => {
        const student = students.find(student => student.studentNum == num);
        if (!student) {
            reject("no results returned");
            return;
        }
        resolve(student);
    });
};
