package controllers

import (
	"backend/models"

	beego "github.com/beego/beego/v2/server/web"
)

// Operations about journal
// /v1/journal
type EmployeeController struct {
	beego.Controller
}

// @Title GetAll
// @Description get all employees
// @Success 200 [] Employee
// @Failure 403 Bad request
// @Failure 500 Server error
// @router / [get]
func (e *EmployeeController) GetAll() {
	obs := models.GetEmployees()
	e.Data["json"] = obs
	e.ServeJSON()
}

// @Title GetById
// @Description get employee by id
// @Success 200 Employee
// @Failure 403 employee not found
// @Failure 500 Server error
//@router /:employeeId [get]
func (e *EmployeeController) GetById() {
	EmployeeId := e.Ctx.Input.Param(":employeeId")
	Employee, err := models.GetEmployee(EmployeeId)
	if err != nil {
		e.Data["json"] = err.Error()
	} else {
		e.Data["json"] = Employee
	}
	e.ServeJSON()
}
