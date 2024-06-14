/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Hiruni Malsha Paththini Durage Student ID: 143446235 Date: 06/14/2024
*
********************************************************************************/ 

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var app = express();
var collegeData = require("./collegeData");

// Setup routes

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});

app.get("/students", (req, res) => {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course)
            .then((students) => {
                if (students.length > 0) {
                    res.json(students);
                } else {
                    res.json({ message: "no results" });
                }
            })
            .catch((err) => {
                res.json({ message: "no results" });
            });
    } else {
        collegeData.getAllStudents()
            .then((students) => {
                if (students.length > 0) {
                    res.json(students);
                } else {
                    res.json({ message: "no results" });
                }
            })
            .catch((err) => {
                res.json({ message: "no results" });
            });
    }
});

app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then((tas) => {
            if (tas.length > 0) {
                res.json(tas);
            } else {
                res.json({ message: "no results" });
            }
        })
        .catch((err) => {
            res.json({ message: "no results" });
        });
});

app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then((courses) => {
            if (courses.length > 0) {
                res.json(courses);
            } else {
                res.json({ message: "no results" });
            }
        })
        .catch((err) => {
            res.json({ message: "no results" });
        });
});

app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num)
        .then((student) => {
            if (student) {
                res.json(student);
            } else {
                res.json({ message: "no results" });
            }
        })
        .catch((err) => {
            res.json({ message: "no results" });
        });
});

// Handle 404 - Page not found
app.use((req, res) => {
    res.status(404).send("Page Not THERE, Are you sure of the path?");
});

// Initialize and start server
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("server listening on port: " + HTTP_PORT);
        });
    })
    .catch((err) => {
        console.log("Unable to start server: " + err);
    });
