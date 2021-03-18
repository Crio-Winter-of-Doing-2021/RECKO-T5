package models

import (
	"errors"
)

type ExternalLink struct {
	Url         string `json:"url"`
	Description string `json:"description"`
}

type Employee struct {
	ID           string       `json:"id"`
	FirstName    string       `json:"firstName"`
	LastName     string       `json:"lastName"`
	ExternalLink ExternalLink `json:"externalLink"`
}

var (
	Employees ([]Employee)
)

func init() {
	Employees = make([]Employee, 3)
	externalLink1 := ExternalLink{"http://twitter.com/#!/search/John+Doe", "Go to external link"}
	Employees[0] = Employee{"1", "John", "Doe", externalLink1}
	Employees[1] = Employee{"2", "Nick", "Fury", externalLink1}
	Employees[2] = Employee{"3", "Creed", "Branton", externalLink1}

}

func GetEmployees() []Employee {
	return Employees
}

func GetEmployee(EmployeeId string) (*Employee, error) {
	for i := 0; i < 3; i++ {
		if Employees[i].ID == EmployeeId {
			return &Employees[i], nil
		}
	}
	return nil, errors.New("Employee not found")
}
