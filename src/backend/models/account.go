package models

import (
	"fmt"
	"time"

	"github.com/beego/beego/v2/client/orm"
)

// Account Schema
type Account struct {
	ID          int64  `json:"id"`
	AccountName string `json:"accountName"`
	AccountID   string `json:"accountId"`
	Amount      string `json:"amount"`
	Provider    string `json:"provider"`
	Type        string `json:"type"`
	Date        string `json:"date"`
	Created     int64  `json:"created"`
	Updated     int64  `json:"updated"`
}

// InsertAccount ...
func (a *Account) InsertAccount() error {
	a.Created = time.Now().UnixNano()
	a.Updated = a.Created
	fmt.Println(a)
	if _, err := orm.NewOrm().Insert(a); err != nil {
		fmt.Println(err)
		return err
	}
	return nil
}

// Delete ...
func (a *Account) Delete() error {
	if _, err := orm.NewOrm().Delete(a); err != nil {
		return err
	}
	return nil
}

// AllAccounts ...
func AllAccounts() orm.QuerySeter {
	return orm.NewOrm().QueryTable("account")
}

func init() {
	orm.RegisterModel(new(Account))
}
