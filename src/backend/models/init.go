package models

import (
	"fmt"

	"github.com/panjf2000/ants/v2"
)

var (
	AntsPool *ants.Pool
)

func Init() {

	var err error
	AntsPool, err = ants.NewPool(1000)
	if err != nil {
		fmt.Println("ants pool init failed")
		panic(err)
	}

}
