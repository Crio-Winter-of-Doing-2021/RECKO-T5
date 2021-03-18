package models

import (
	"errors"
)

type Journal struct {
	ID          string `json:"id"`
	AccountID   string `json:"accountId"`
	AccountName string `json:"accountName"`
	Amount      string `json:"amount"`
	Provider    string `json:"provider"`
	Date        string `json:"date"`
	Type        string `json:"type"`
}

var (
	Journals ([]Journal)
)

func init() {
	Journals = make([]Journal, 3)
	Journals[0] = Journal{"1", "dd517756-1b24-4db3-8aee-51d331039012", "Historical Adjustment", "-4130.98", "XERO", "18-01-20", "DEBIT"}
	Journals[1] = Journal{"2", "dd517345-1b24-4db3-8aee-51d331039012", "Bank House", "-4130.98", "QUICKBOOKS", "18-01-20", "DEBIT"}
	Journals[2] = Journal{"3", "dd517756-1b24-4db3-8aee-51d331039012", "Historical Adjustment", "430.98", "XERO", "18-01-20", "CREDIT"}
}

func GetJournals() []Journal {
	return Journals
}

func GetJournal(JournalId string) (*Journal, error) {
	for i := 0; i < 3; i++ {
		if Journals[i].ID == JournalId {
			return &Journals[i], nil
		}
	}
	return nil, errors.New("Journal not found")
}
