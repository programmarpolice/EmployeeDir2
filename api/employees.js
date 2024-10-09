const express = require("express");
const router = express.Router();
module.exports = router;

const employees = require("../data/employees");

router.get("/", (req, res) => {
  res.json(employees);
});

router.post("/", (req, res, next) => {
  const { name } = req.body;
  if (name) {
    const newEmployee = { id: employees.length + 1, name };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
  } else {
    next({ status: 400, message: "New employee must have a name." });
  }
});

router.get("/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    next({ status: 404, message: `There is no employee with id ${id}.` });
  }
});
