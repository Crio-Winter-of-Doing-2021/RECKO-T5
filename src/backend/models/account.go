package models

import (
	"errors"
)

type Account struct {
	ID                      string `json:"id"`
	Code                    string `json:"code"`
	Name                    string `json:"name"`
	Type                    string `json:"type"` // can be made enum
	TaxType                 string `json:"taxType"`
	EnablePaymentsToAccount bool   `json:"enablePaymentsToAccount"`
	Description             string `json:"description"`       // all accounts except bank
	BankAccountNumber       string `json:"bankAccountNumber"` // for bank accounts only
	// these can be changed to enum
	BankAccountType string `json:"bankAccountType"` // for bank accounts only
	CurrencyCode    string `json:"currencyCode"`    // for bank accounts only
}

var (
	Accounts []Account
)

func init() {
	Accounts = make([]Account, 3)
	Accounts[0] = Account{"ebd06280-af70-4bed-97c6-7451a454ad85", "091", "Business Savings Account", "BANK", "NONE", false, "", "0209087654321050", "BANK", "NZD"}
	Accounts[1] = Account{"7d05a53d-613d-4eb2-a2fc-dcb6adb80b80", "200", "Sales", "REVENUE", "OUTPUT2", false, "Income from any normal business activity", "", "", ""}
	Accounts[2] = Account{"297c2dc5-cc47-4afd-8ec8-74990b8761e9", "300", "Purchases", "DIRECTCOSTS", "INPUT2", false, "Goods purchased with the intention of selling these to customers", "", "", ""}
}

func GetAccounts() []Account {
	return Accounts
}

func GetAccount(AccountId string) (*Account, error) {
	for i := 0; i < 3; i++ {
		if Accounts[i].ID == AccountId {
			return &Accounts[i], nil
		}
	}
	return nil, errors.New("Account not found")
}

// CRUD operations

// func CreateAccount(payload Account) error {
// 	if payload.Type == "BANK" {

// 	} else {

// 	}
// }
