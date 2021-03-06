import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";


import { DataService } from "../../../data.service";
import { RestApiService } from "../../../rest-api.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = "push-right";
    username: string;
    userToken: string;
    serachContent: string;
    course: Array<string>;

    constructor(
        private translate: TranslateService,
        public router: Router,
        private rest: RestApiService,
        private data: DataService
    ) {
        this.translate.addLangs([
            "en",
            "fr",
            "ur",
            "es",
            "it",
            "fa",
            "de",
            "zh-CHS"
        ]);
        this.translate.setDefaultLang("en");
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(
            browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/)
                ? browserLang
                : "en"
        );

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.username = "Visitor";
        this.findUser();
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector("body");
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector("body");
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector("body");
        dom.classList.toggle("rtl");
    }

    onLoggedout() {
        localStorage.removeItem("isLoggedin");
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    findUsername() {
        try {
            var token = localStorage.getItem("token");
            this.userToken = token;
            console.log(token);
        } catch (error) {
            console.log("cannot get token");
            console.log(error);
        }
    }

    async findUser() {
        const data = await this.rest.get(
            "http://localhost:3030/api/accounts/profile"
            //     {
            //     Authorization: this.userToken
            //   },
        );
        if (data["success"]) {
            //   localStorage.setItem('token', data['token']);
            //   this.router.navigate(['/']);
            this.username = data["user"]["name"];
            console.log(this.username);
        } else {
            console.log("is not match any record");
            this.data.error(data["message"]);
        }
    }

    onSearch() {
        console.log("searchContent is: " + this.serachContent);
        if(this.serachContent == undefined){
            localStorage.removeItem("searchContent");
            window.location.href = 'http://localhost:4200/components';
        }else{
            localStorage.setItem("searchContent", this.serachContent);
            console.log("localStorage have: " + localStorage.getItem("searchContent"));
            window.location.href = 'http://localhost:4200/components';
        }
        // const data = await this.rest.get(
        //     "http://localhost:3030/api/search/course?query=" +
        //         this.serachContent
        //     //'http://localhost:3030/api/search/course?query=computer'
        //     //     {
        //     //     Authorization: this.userToken
        //     //   },
        // );
        // if (data["success"]) {
        //     //   localStorage.setItem('token', data['token']);
        //     //   this.router.navigate(['/']);
        //     this.course = data["content"]["hits"];
        //     console.log("data is: ");
        //     console.log(data["content"]["hits"]);
        //     console.log("course is: ");
        //     console.log(this.course);
        //     localStorage.setItem("searchResult", data["content"]["hits"]);
        // } else {
        //     console.log("connot get data");
        //     this.data.error(data["message"]);
        // }
    }
}
