package controllers

import (
	"backend/models"

	beego "github.com/beego/beego/v2/server/web"
)

// Operations about journal
// /v1/journal
type JournalController struct {
	beego.Controller
}

// @Title GetAll
// @Description get all journals
// @Success 200 [] Journal
// @Failure 403 Bad request
// @Failure 500 Server error
// @router / [get]
func (j *JournalController) GetAll() {
	obs := models.GetJournals()
	j.Data["json"] = obs
	j.ServeJSON()
}

// @Title GetById
// @Description get journal by id
// @Success 200 Journal
// @Failure 403 Journal not found
// @Failure 500 Server error
//@router /:journalId [get]
func (j *JournalController) GetById() {
	JournalId := j.Ctx.Input.Param(":journalId")
	Journal, err := models.GetJournal(JournalId)
	if err != nil {
		j.Data["json"] = err.Error()
	} else {
		j.Data["json"] = Journal
	}
	j.ServeJSON()
}
