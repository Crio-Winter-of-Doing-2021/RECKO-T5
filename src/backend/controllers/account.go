package controllers

import (
	"backend/models"

	beego "github.com/beego/beego/v2/server/web"
)

// Operations about journal
// /v1/journal
type AccountController struct {
	beego.Controller
}

// @Title GetAll
// @Description get all employees
// @Success 200 [] Employee
// @Failure 403 Bad request
// @Failure 500 Server error
// @router / [get]
func (a *AccountController) GetAll() {
	obs := models.GetAccounts()
	a.Data["json"] = obs
	a.ServeJSON()
}

// @Title GetById
// @Description get employee by id
// @Success 200 Employee
// @Failure 403 employee not found
// @Failure 500 Server error
//@router /:accountId [get]
func (a *AccountController) GetById() {
	AccountId := a.Ctx.Input.Param(":accountId")
	Account, err := models.GetAccount(AccountId)
	if err != nil {
		a.Data["json"] = err.Error()
	} else {
		a.Data["json"] = Account
	}
	a.ServeJSON()
}
