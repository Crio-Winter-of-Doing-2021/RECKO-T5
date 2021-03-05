package main

import (
	_ "backend/routers"
	"fmt"

	"github.com/beego/beego/v2/client/orm"
	beego "github.com/beego/beego/v2/server/web"
	_ "github.com/lib/pq"
)

func main() {
	if beego.BConfig.RunMode == "dev" {
		beego.BConfig.WebConfig.DirectoryIndex = true
		beego.BConfig.WebConfig.StaticDir["/swagger"] = "swagger"
	}

	if err := orm.RegisterDriver("postgres", orm.DRPostgres); err != nil {
		fmt.Println("register driver failed")
	}
	sqlConnString, _ := beego.AppConfig.String("sqlconn")
	fmt.Println(sqlConnString)
	if err := orm.RegisterDataBase("default", "postgres", "host=127.0.0.1 port=5432 dbname=test sslmode=disable"); err != nil {
		fmt.Println("register database failed")
	} else {
		fmt.Println("database connected")
	}

	beego.Run()
}
