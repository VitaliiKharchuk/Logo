webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/_components/data/data.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/_components/data/data.component.html":
/***/ (function(module, exports) {

module.exports = "<app-menu>\r\n</app-menu>\r\n<div class=\"placefornav\">\r\n\r\n</div>\r\n<div class=\"container vertical-align\">\r\n  <div>\r\n    <div class=\"success\">Вы успешно зарегистрированы!</div>\r\n    <div class=\"row\">\r\n      \r\n        <div class=\"text\">Теперь вы можете начать использовать LOGO! <br>Загружайте свои файлы и делитесь ими <br>с остальными пользователями!</div>\r\n\r\n    </div>\r\n\r\n    <div class=\"col-sm-8 col-sm-offset-2\">\r\n      <div class=\"col-md-6 col-md-offset-3\">\r\n        <button class=\"button\" data-toggle=\"modal\" data-target=\"#createFolderModal\">Создать папку</button>\r\n      </div>\r\n      <!-- Modal -->\r\n      <div class=\"modal fade\" id=\"createFolderModal\" role=\"dialog\" >\r\n        <div class=\"modal-dialog\">\r\n      \r\n          <!-- Modal content-->\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <h4 class=\"modal-title\">Создание папки</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <form name=\"form\" (ngSubmit)=\"f.form.valid && createfolder()\" #f=\"ngForm\" novalidate>\r\n                <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !foldername.valid }\">\r\n                  <label for=\"foldername\"></label>\r\n                  <input type=\"text\" class=\"form-control\" name=\"foldername\" placeholder=\"Имя пользователя\" [(ngModel)]=\"model.foldername\" #foldername=\"ngModel\"\r\n                    required maxlength=\"50\" />\r\n                  <div *ngIf=\"foldername.errors && (foldername.dirty && foldername.touched)\" class=\"alerts\"><br>\r\n                    <div [hidden]=\"!foldername.errors.required\">\r\n                      Имя папки необходимо.\r\n                    </div>\r\n                    <div [hidden]=\"!foldername.errors.maxlength\">\r\n                      Максимальная длинна папки 50 символов.\r\n                    </div>\r\n                  </div>\r\n                  <!-- <div *ngIf=\"f.submitted && !name.valid\" class=\"help-block\">Имя пользователя необходимо</div> -->\r\n                </div>\r\n                <div class=\"form-group\">\r\n                  <button [disabled]=\"loading\" class=\"button\">Готово</button>\r\n                  <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" #closeBtn>Close</button>\r\n                </div>\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<h3>Папки</h3>\r\n<div class=\"row\">\r\n  <div class=\"col-md-4\" *ngFor=\"let folder of folders | async\">\r\n    <div class=\"thumbnail\">\r\n        <h4>\r\n          <div (dblclick)=\"moveToSelectedFolder(folder.folderId)\">{{ folder.name }}</div>\r\n        </h4>      \r\n    </div>\r\n  </div>\r\n</div>\r\n<h3>Файлы</h3>\r\n<div class=\"row\">\r\n  <div class=\"col-md-4\" *ngFor=\"let folder of folders | async\">\r\n    <div class=\"thumbnail\">\r\n        <h4>\r\n          <div (dblclick)=\"moveToSelectedFolder(folder.folderId)\">{{ folder.name }}</div>\r\n        </h4>      \r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/_components/data/data.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_service__ = __webpack_require__("../../../../../src/app/_components/data/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home_service__ = __webpack_require__("../../../../../src/app/_components/home/home.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DataComponent = (function () {
    function DataComponent(dataService, homeService, router, route) {
        this.dataService = dataService;
        this.homeService = homeService;
        this.router = router;
        this.route = route;
        this.model = {};
        this.loading = false;
        this.folders = [];
        this.files = [];
    }
    DataComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params
            .switchMap(function (params) {
            _this.folderId = params['folderId'];
            return _this.dataService.loadAllFolders(_this.folder.folderId);
        })
            .subscribe(function (res) { return _this.folders = res; });
    };
    DataComponent.prototype.loadAllFolders = function (folderId) {
        var _this = this;
        this.dataService.loadAllFolders(folderId).subscribe(function (data) {
            _this.folders = data.json();
            console.log('Loading folders successfull');
        }, function (error) {
            //show info about error
            console.log('Loading folders unsuccessfull');
        });
    };
    DataComponent.prototype.createfolder = function () {
        var _this = this;
        this.loading = true;
        this.homeService.createfolder(this.model.foldername, null)
            .subscribe(function (data) {
            console.log('Creating folder successfull');
            _this.closeModal();
            _this.loadAllFolders(_this.folderId);
        }, function (error) {
            console.log('Cant create folder');
            _this.loading = false;
        });
    };
    DataComponent.prototype.closeModal = function () {
        this.closeBtn.nativeElement.click();
    };
    DataComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    return DataComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewChild */])('closeBtn'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object)
], DataComponent.prototype, "closeBtn", void 0);
DataComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-data',
        template: __webpack_require__("../../../../../src/app/_components/data/data.component.html"),
        styles: [__webpack_require__("../../../../../src/app/_components/data/data.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__data_service__["a" /* DataService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__home_home_service__["a" /* HomeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__home_home_service__["a" /* HomeService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _e || Object])
], DataComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=data.component.js.map

/***/ }),

/***/ "../../../../../src/app/_components/data/data.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DataService = (function () {
    function DataService(http) {
        this.http = http;
    }
    DataService.prototype.loadAllFolders = function (folderId) {
        return this.http.post('api/folder/get-folder', folderId, this.jwt()).map(function (response) { return response.json(); });
    };
    DataService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Authorization': 'Bearer ' + currentUser.token });
            return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        }
    };
    return DataService;
}());
DataService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], DataService);

var _a;
//# sourceMappingURL=data.service.js.map

/***/ }),

/***/ "../../../../../src/app/_components/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".fill { \r\n    min-height: 100vh;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center\r\n}\r\n.button {\r\n    background-color: transparent !important;\r\n    width: 200px;\r\n    height: 60px;\r\n    color: #7a7a7a;\r\n    padding: 9px 0px;\r\n    text-align: center;\r\n    text-decoration: none;\r\n    display: inline-block;\r\n    font-size: 16px;\r\n    margin: 0px 0px;\r\n    cursor: pointer;\r\n    border-radius: 30px; /* Safari */\r\n    transition-duration: 0.4s;\r\n    border: 2px solid #34d3bb;\r\n    margin-top: 60px;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1.4em;\r\n}\r\n\r\n.button:focus {\r\n    outline:0;\r\n}\r\n\r\n.button:hover {\r\n    background-color: #34d3bb !important;\r\n    color: white;\r\n    border: 2px solid #34d3bb;\r\n}\r\n\r\n.button-color {\r\n    background-color: #34d3bb !important;\r\n    width: 200px;\r\n    height: 60px;\r\n    color: white;\r\n    padding: 9px 0px;\r\n    text-align: center;\r\n    text-decoration: none;\r\n    display: inline-block;\r\n    font-size: 16px;\r\n    margin: 0px 0px;\r\n    cursor: pointer;\r\n    border-radius: 30px; /* Safari */\r\n    transition-duration: 0.4s;\r\n    border: 2px solid #34d3bb;\r\n    margin-top: 60px;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1.4em;\r\n}\r\n\r\n.button-color:focus {\r\n    outline:0;\r\n}\r\n\r\n.button-color:hover {\r\n    background-color: #34d3bb !important;\r\n    color: white;\r\n    border: 2px solid #34d3bb;\r\n}\r\n\r\n.button-transparent {\r\n    background-color: transparent !important;\r\n    width: 200px;\r\n    height: 60px;\r\n    color: #7a7a7a;\r\n    padding: 9px 0px;\r\n    text-align: center;\r\n    text-decoration: none;\r\n    display: inline-block;\r\n    font-size: 16px;\r\n    margin: 0px 0px;\r\n    cursor: pointer;\r\n    border-radius: 30px; /* Safari */\r\n    transition-duration: 0.4s;\r\n    border: 2px solid transparent;\r\n    margin-top: 60px;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1.4em;\r\n}\r\n\r\n.button-transparent:focus {\r\n    outline:0;\r\n}\r\n\r\n.button-transparent:hover {\r\n    background-color: #34d3bb !important;\r\n    color: white;\r\n    border: 2px solid #34d3bb;\r\n}\r\n\r\n.form-control-on-upload-file {\r\n    \r\n    border: none !important;\r\n    color: #333333;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1.2em;\r\n}\r\n\r\n.form-control-on-add-folder {\r\n    height: 60px !important;\r\n    border: 2px solid #999999 !important;\r\n    border-radius: 4px !important; \r\n    padding-left: 20px !important; \r\n    color: #7a7a7a;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1.2em;\r\n}\r\n.form-control-on-add-folder:focus {\r\n    outline:0;\r\n}\r\n.success{\r\n    font-size: 3.1em;\r\n    letter-spacing: 7px;\r\n    color: #333333;\r\n    font-family: Raleway-Black;\r\n    border-bottom: 2px solid #f0f1f7;\r\n    text-align: center;\r\n}\r\n\r\n.text{\r\n    padding: 15px;\r\n    color:  #7a7a7a !important;\r\n    height: 60px !important;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1.2em;\r\n    text-align: center;\r\n}\r\n\r\n.placefornav{\r\n    height: 340px;\r\n}\r\n\r\n.file_upload{\r\n    position: relative;\r\n    overflow: hidden;\r\n    font-size: 1em;        /* example */\r\n    height: 2em;           /* example */\r\n    line-height: 2em;\r\n    margin-bottom: 5px;       /* the same as height */\r\n}\r\n.file_upload > button{\r\n    float: right;\r\n    width: 8em;            /* example */\r\n    height: 100%;\r\n    background-color: #34d3bb !important;\r\n    color: white;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1em;\r\n    border-radius: 30px;\r\n    border: 2px solid #34d3bb;\r\n\r\n}\r\n.file_upload > div{\r\n    padding-left: 1em      /* example */\r\n}\r\n\r\n.file_upload input[type=file]{\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    -webkit-transform: scale(20);\r\n            transform: scale(20);\r\n    letter-spacing: 10em;     /* IE 9 fix */\r\n    -ms-transform: scale(20); /* IE 9 fix */\r\n    opacity: 0;\r\n    cursor: pointer\r\n}\r\n\r\n.custom-header{\r\n    background-color: #f0f1f7 !important;\r\n    border-top-left-radius: 10px;\r\n    border-top-right-radius: 10px;\r\n}\r\n\r\n.custom-modal{\r\n    border-radius: 10px;\r\n}\r\n\r\n.modal-title{\r\n    color: #333333;\r\n    font-family: Raleway-Bold;\r\n    font-size: 1.4em;\r\n    padding: 5px;\r\n}\r\n\r\n.modal {\r\n    text-align: center;\r\n  }\r\n  \r\n  @media screen and (min-width: 768px) { \r\n    .modal:before {\r\n      display: inline-block;\r\n      vertical-align: middle;\r\n      content: \" \";\r\n      height: 100%;\r\n    }\r\n  }\r\n  \r\n  .modal-dialog {\r\n    display: inline-block;\r\n    text-align: left;\r\n    vertical-align: middle;\r\n  }\r\n\r\n  .name-file-in-table{\r\n    color:  #7a7a7a !important;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1.2em;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/_components/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<app-menu>\r\n</app-menu>\r\n<div class=\"placefornav\">\r\n\r\n</div>\r\n<div class=\"container vertical-align\">\r\n  <div>\r\n    <div class=\"success\">Вы успешно зарегистрированы!</div>\r\n    <div class=\"row\">\r\n\r\n      <div class=\"text\">Теперь вы можете начать использовать LOGO! <br>Загружайте свои файлы и делитесь ими <br>с остальными пользователями!</div>\r\n\r\n    </div>\r\n\r\n    <div class=\"col-sm-8 col-sm-offset-2\">\r\n      <div class=\"col-md-6 col-md-offset-3\">\r\n        <button class=\"button\" data-toggle=\"modal\" data-target=\"#createFolderModal\">Создать папку</button>\r\n      </div>\r\n      <!-- Modal -->\r\n      <div class=\"modal fade\" id=\"createFolderModal\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n\r\n          <!-- Modal content-->\r\n          <div class=\"modal-content custom-modal\">\r\n            <div class=\"modal-header custom-header\">\r\n              <h4 class=\"modal-title\">Создание папки</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <form name=\"form\" (ngSubmit)=\"f.form.valid && createfolder()\" #f=\"ngForm\" novalidate>\r\n                <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !foldername.valid }\">\r\n                  <label for=\"foldername\"></label>\r\n                  <input type=\"text\" class=\"form-control form-control-on-add-folder\" name=\"foldername\" placeholder=\"Имя пользователя\" [(ngModel)]=\"model.foldername\" #foldername=\"ngModel\"\r\n                    required maxlength=\"50\" />\r\n                  <div *ngIf=\"f.submitted && foldername.errors && (foldername.dirty || foldername.touched)\" class=\"alerts\"><br>\r\n                    <div [hidden]=\"!foldername.errors.required\">\r\n                      Имя папки необходимо.\r\n                    </div>\r\n                    <div [hidden]=\"!foldername.errors.maxlength\">\r\n                      Максимальная длинна папки 50 символов.\r\n                    </div>\r\n                  </div>\r\n                  <!-- <div *ngIf=\"f.submitted && !name.valid\" class=\"help-block\">Имя пользователя необходимо</div> -->\r\n                </div>\r\n                <div class=\"form-group\">\r\n                  <button class=\"button-transparent\" data-dismiss=\"modal\" #closeBtn>Отмена</button>\r\n                  <button class=\"button-color\">Готово</button>\r\n                </div>\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-6 col-md-offset-3\">\r\n        <button class=\"button-color\" data-toggle=\"modal\" data-target=\"#uploadFileModal\">Загрузить файл</button>\r\n      </div>\r\n      <!-- Modal -->\r\n      <div class=\"modal fade\" id=\"uploadFileModal\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n\r\n          <!-- Modal content-->\r\n          <div class=\"modal-content custom-modal\">\r\n            <div class=\"modal-header custom-header\">\r\n              <h4 class=\"modal-title\">Загрузка файлов</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <div class=\"file_upload\">\r\n                <button type=\"button\">Выбрать</button>\r\n\r\n                <input type=\"file\" #inputfiles (change)=\"onChange(inputfiles.files)\" placeholder=\"Upload file\" accept=\".jpg,.png,.avi\" multiple>\r\n              </div>\r\n              <table class=\"table\">\r\n                <tbody>\r\n                  <tr *ngFor=\"let f of uploadFiles; let i = index\">\r\n                    <td><img src=\"assets\\icons\\success.svg\" width=\"20\" height=\"20\"></td>\r\n                    <td><img src=\"assets\\icons\\picture.svg\" width=\"20\" height=\"20\" *ngIf=\"checkIfImage(f.name)\">\r\n                      <img src=\"assets\\icons\\video-player.svg\" width=\"20\" height=\"20\" *ngIf=\"!checkIfImage(f.name)\"></td>\r\n                    <td class=\"name-file-in-table\">{{f.name}}</td>\r\n                    <td>\r\n                      <form name=\"form\" (ngSubmit)=\"frm.form.valid\" #frm=\"ngForm\" novalidate>\r\n                        <div [ngClass]=\"{ 'has-error': frm.submitted && !hashtag.valid }\">\r\n                          <input type=\"text\" class=\"form-control-on-upload-file\" name=\"f.name-{{i}}\" placeholder=\"+Добавить тег\" [(ngModel)]=\"f.hashtag\" #hashtag=\"ngModel\"\r\n                          />\r\n                          <div *ngIf=\"hashtag.errors && (hashtag.dirty && hashtag.touched)\" class=\"alerts\"><br>\r\n                            <div [hidden]=\"!hashtag.errors\">\r\n                              Введите корректный тег.\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </form>\r\n                    </td>\r\n\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n              <button class=\"button-transparent\" data-dismiss=\"modal\" #closeBtn>Отмена</button>\r\n              <button class=\"button-color\">Готово</button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div *ngIf=\"folders?.length > 0\">\r\n  <h3>Папки</h3>\r\n  <div class=\"row\">\r\n    <div class=\"col-md-4\" *ngFor=\"let folder of folders | async\">\r\n      <div class=\"thumbnail\">\r\n        <h4>\r\n          <div (dblclick)=\"moveToSelectedFolder(folder.folderId)\">{{ folder.name }}</div>\r\n        </h4>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div *ngIf=\"files?.length > 0\">\r\n  <h3>Файлы</h3>\r\n  <div class=\"row\">\r\n    <div class=\"col-md-4\" *ngFor=\"let folder of folders | async\">\r\n      <div class=\"thumbnail\">\r\n        <h4>\r\n          <div (dblclick)=\"moveToSelectedFolder(folder.folderId)\">{{ folder.name }}</div>\r\n        </h4>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/_components/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_service__ = __webpack_require__("../../../../../src/app/_components/home/home.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeComponent = (function () {
    function HomeComponent(homeService, router) {
        this.homeService = homeService;
        this.router = router;
        this.model = {};
        this.loading = false;
        this.folders = [];
        this.files = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.loadRootFolders();
    };
    HomeComponent.prototype.onChange = function (files) {
        this.uploadFiles = files;
    };
    HomeComponent.prototype.checkIfImage = function (name) {
        var fileExtension = "";
        if (name.lastIndexOf(".") > 0) {
            fileExtension = name.substring(name.lastIndexOf(".") + 1, name.length);
        }
        if (fileExtension.toLowerCase() == "jpg") {
            return true;
        }
        if (fileExtension.toLowerCase() == "png") {
            return false;
        }
        else {
            return false;
        }
    };
    HomeComponent.prototype.loadRootFolders = function () {
        var _this = this;
        this.homeService.loadRootFolders().subscribe(function (data) {
            _this.folders = data.json();
            console.log('Loading root folders successfull');
        }, function (error) {
            //show info about error
            console.log('Loading root folders unsuccessfull');
        });
    };
    HomeComponent.prototype.createfolder = function () {
        var _this = this;
        this.loading = true;
        this.homeService.createfolder(this.model.foldername, null)
            .subscribe(function (data) {
            console.log('Creating folder successfull');
            _this.closeModal();
            _this.loadRootFolders();
        }, function (error) {
            console.log('Cant create folder');
            _this.loading = false;
        });
    };
    HomeComponent.prototype.closeModal = function () {
        this.closeBtn.nativeElement.click();
    };
    HomeComponent.prototype.moveToSelectedFolder = function (folderId) {
        this.router.navigate(['', folderId]);
    };
    return HomeComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewChild */])('closeBtn'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object)
], HomeComponent.prototype, "closeBtn", void 0);
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-home',
        template: __webpack_require__("../../../../../src/app/_components/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/_components/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__home_service__["a" /* HomeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__home_service__["a" /* HomeService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _c || Object])
], HomeComponent);

var _a, _b, _c;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/_components/home/home.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeService = (function () {
    function HomeService(http) {
        this.http = http;
    }
    HomeService.prototype.createfolder = function (folderName, parentFolderId) {
        var folderNameWithParentFolderId = {
            name: folderName,
            parentId: parentFolderId,
        };
        return this.http.post('/api/folders/create-folder', folderNameWithParentFolderId, this.jwt()).map(function (response) { return response.json(); });
    };
    HomeService.prototype.loadRootFolders = function () {
        return this.http.post('api/folder/get-root-folders', this.jwt()).map(function (response) { return response.json(); });
    };
    HomeService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Authorization': 'Bearer ' + currentUser.token });
            return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        }
    };
    return HomeService;
}());
HomeService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], HomeService);

var _a;
//# sourceMappingURL=home.service.js.map

/***/ }),

/***/ "../../../../../src/app/_components/login/authentification.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthentificationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthentificationService = (function () {
    function AuthentificationService(http) {
        this.http = http;
    }
    AuthentificationService.prototype.login = function (email, password) {
        var userCredentials = {
            email: email,
            password: password
        };
        return this.http.post('/api/users/auth-token', userCredentials)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var userInfoWithToken = response.json();
            if (userInfoWithToken && userInfoWithToken.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(userInfoWithToken));
            }
            return userInfoWithToken;
        });
    };
    AuthentificationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    };
    AuthentificationService.prototype.addUser = function (name, email, password) {
        var userCredentialsWithName = {
            name: name,
            email: email,
            password: password
        };
        return this.http.post('/api/users/add-user', userCredentialsWithName)
            .map(function (response) {
            // // login successful if there's a jwt token in the response
            // let userInfoWithToken = response.json();
            // if (userInfoWithToken && userInfoWithToken.token) {
            //     // store user details and jwt token in local storage to keep user logged in between page refreshes
            //     localStorage.setItem('currentUser', JSON.stringify(userInfoWithToken));
            // }
            //return userInfoWithToken;
        });
    };
    AuthentificationService.prototype.get = function (url, options) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser && !currentUser.token) {
            // log error
        }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Authorization': 'Bearer ' + currentUser.token });
        if (!options) {
            options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        }
        options.headers = headers;
        return this.http.get(url, options);
    };
    AuthentificationService.prototype.post = function (url, body, options) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser && !currentUser.token) {
            // log error
        }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Authorization': 'Bearer ' + currentUser.token });
        if (!options) {
            options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        }
        options.headers = headers;
        return this.http.post(url, options);
    };
    return AuthentificationService;
}());
AuthentificationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], AuthentificationService);

var _a;
//# sourceMappingURL=authentification.service.js.map

/***/ }),

/***/ "../../../../../src/app/_components/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".fill { \r\n    min-height: 100vh;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center\r\n}\r\n\r\np.logo {\r\n     text-align: center;\r\n     text-transform: uppercase;\r\n     font-weight: bold;\r\n     font-size: 3.5em;\r\n     letter-spacing: 10px;\r\n     color: #676767;\r\n     font-family: Raleway-Black;\r\n}\r\n\r\np.welcome {\r\n    text-align: center;\r\n    font-size: 1.6em;\r\n    color: #999999;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 3px;\r\n}\r\n\r\n.title {\r\n    width: 550px; /* Ширина блока */ /* Для Firefox */  \r\n    box-sizing: border-box; /* Ширина блока с полями */\r\n    padding-bottom: 20px;\r\n}\r\n\r\np.login {\r\n    text-align: center;\r\n    font-weight: bold;\r\n    color: #333333;\r\n    font-size: 2.4em;\r\n    font-family: Raleway-Black;\r\n    letter-spacing: 2px;\r\n}\r\n\r\n.textchoose {\r\n    padding-bottom: 40px;\r\n    color: #7a7a7a;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 2px;\r\n}\r\n\r\np.register {\r\n    text-align: center;\r\n    font-size: 1.4em;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 2px;\r\n}\r\n\r\n.link {\r\n    text-decoration: none;\r\n    color: #d3346c;\r\n    font-size: 1em;\r\n}\r\n\r\n.whiteblock {\r\n    background-color: #FFFFFF;\r\n    width: 550px; /* Ширина блока */\r\n    height: 700px;\r\n    padding-bottom: 100px; /* Поля */\r\n    padding-right: 95px;\r\n    padding-left: 95px;\r\n    padding-top: 100px;\r\n    margin-top: 10px; /* Отступ сверху */\r\n    border-radius: 5px; /* Для Firefox */  \r\n    box-sizing: border-box; /* Ширина блока с полями */\r\n    box-shadow: 0px 3px 4px 0px #b9b9b9;\r\n}\r\n\r\n.form-control {\r\n     height: 60px !important;\r\n     border: 2px solid #999999 !important;\r\n     border-radius: 4px !important; \r\n     padding-left: 20px !important; \r\n     color: #7a7a7a;\r\n     font-family: Raleway-SemiBold;\r\n     letter-spacing: 1px;\r\n     font-size: 1.2em;\r\n }\r\n\r\n.button {\r\n    background-color: #34d3bb !important;/* Green */\r\n    width: 360px;\r\n    height: 60px;\r\n    color: white;\r\n    padding: 9px 0px;\r\n    text-align: center;\r\n    text-decoration: none;\r\n    display: inline-block;\r\n    font-size: 16px;\r\n    margin: 0px 0px;\r\n    cursor: pointer;\r\n    border-radius: 30px; /* Safari */\r\n    transition-duration: 0.4s;\r\n    border: 2px solid #34d3bb;\r\n    margin-top: 60px;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1.4em;\r\n}\r\n\r\n.button:focus {\r\n    outline:0;\r\n}\r\n\r\n.button:hover {\r\n    background-color: #FFFFFF !important;\r\n    color: #616161;\r\n    border: 2px solid #999999;\r\n}\r\n\r\n.vertical-align {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n}\r\n\r\n.form-group{\r\n    margin: 0px;\r\n}\r\n\r\n.alerts {\r\n    padding: 0px;\r\n    margin:  0px;\r\n    color: #b13748;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1em;\r\n    max-height: 15px;\r\n    position: relative;\r\n    bottom: 20px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/_components/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container fill vertical-align\">\r\n    <div>\r\n        <div class=\"title\">\r\n            <p class=\"logo\">logo</p>\r\n            <p class=\"welcome\">Добро пожаловать!</p>\r\n        </div>\r\n        <div class=\"whiteblock\">\r\n            <div class=\"textchoose\">\r\n                <p class=\"login\">Войдите в аккаунт</p>\r\n\r\n                <p class=\"register\">или <a [routerLink]=\"['/register']\" class=\"link\">Cоздайте аккаунт</a></p>\r\n            </div>\r\n            <form name=\"form\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\" novalidate>\r\n                <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !email.valid }\">\r\n                    <label for=\"email\"></label>\r\n                    <input type=\"email\" class=\"form-control\" name=\"email\" placeholder=\"E-mail\" [(ngModel)]=\"model.email\" #email=\"ngModel\" required\r\n                        email />\r\n\r\n                    <div *ngIf=\"email.errors && (email.dirty && email.touched)\" class=\"alerts\"><br>\r\n                        <div [hidden]=\"!email.errors.required\">\r\n                            Email необходим.\r\n                        </div>\r\n                        <div [hidden]=\"!email.errors.email\">\r\n                            Введите корректный email.\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                    <!-- <div *ngIf=\"f.submitted && !email.valid\" class=\"help-block\">E-mail необходим</div> -->\r\n                </div>\r\n                <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\r\n                    <label for=\"password\"></label>\r\n                    <input type=\"password\" class=\"form-control\" name=\"password\" placeholder=\"Пароль\" [(ngModel)]=\"model.password\" #password=\"ngModel\"\r\n                        required minlength=\"6\" maxlength=\"50\" />\r\n\r\n                    <div *ngIf=\"password.errors && (password.dirty && password.touched)\" class=\"alerts\"><br>\r\n                        <div [hidden]=\"!password.errors.required\">\r\n                            Пароль необходим.\r\n                        </div>\r\n                        <div [hidden]=\"!password.errors.minlength\">\r\n                            Минимальная длинна пароля 6 символов.\r\n                        </div>\r\n                        <div [hidden]=\"!password.errors.maxlength\">\r\n                            Максимальная длинна пароля 50 символов.\r\n                        </div>\r\n                    </div>\r\n                    <!-- <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Пароль необходим</div> -->\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <button [disabled]=\"loading\" class=\"button\">Войти</button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/_components/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_index__ = __webpack_require__("../../../../../src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__authentification_service__ = __webpack_require__("../../../../../src/app/_components/login/authentification.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(route, router, authentificationService, alertService) {
        this.route = route;
        this.router = router;
        this.authentificationService = authentificationService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authentificationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authentificationService.login(this.model.email, this.model.password)
            .subscribe(function (data) {
            console.log('Login succesfull');
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            console.log('Login unsuccesfull');
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-login',
        template: __webpack_require__("../../../../../src/app/_components/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/_components/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__authentification_service__["a" /* AuthentificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__authentification_service__["a" /* AuthentificationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* AlertService */]) === "function" && _d || Object])
], LoginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/_components/menu/menu.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".navbar-brand\r\n{\r\n    position: absolute;\r\n    width: 100%;\r\n    left: 0;\r\n    text-align: center;\r\n    margin-top: -10px;\r\n    padding: 43px;\r\n    text-align: center;\r\n    text-transform: uppercase;\r\n    font-weight: bold;\r\n    font-size: 3.5em;\r\n    letter-spacing: 10px;\r\n    color: #676767;\r\n    font-family: Raleway-Black;\r\n    border-bottom: 2px solid #f0f1f7;\r\n}\r\n\r\n.img-color-circle {\r\n    background-color:#f0f1f7;\r\n    border-radius: 50%;\r\n    width: 60px;\r\n    height: 60px;\r\n}\r\n\r\n.img-circle{\r\n    padding: 15px;\r\n    width: 60px;\r\n    height: 60px;\r\n}\r\n\r\n.link{\r\n    margin-right: 100px;\r\n}\r\n\r\n.text-name{\r\n    padding: 15px;\r\n    color:  #7a7a7a !important;\r\n    height: 60px !important;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1.2em;\r\n}\r\n\r\n.logout{\r\n    padding: 15px;\r\n    padding-right: 25px;\r\n}\r\n\r\n.right-block{\r\n    margin-bottom: 8px;\r\n    margin-top: 8px;\r\n}\r\n\r\n.navcustom{\r\n    background-color: white;\r\n    box-shadow: 0px 3px 10px 0px #999999;\r\n}\r\n\r\n.top-navbar{\r\n    border-left: 2px solid #999999;\r\n}\r\n\r\n.search-holder{\r\n    border-radius: 0px;\r\n    color:  #949495 !important;\r\n    background-color: #f0f1f7;\r\n    height: 60px !important;\r\n    padding-left: 20px !important; \r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1.2em;\r\n    border: none;\r\n    width: 100%  !important;\r\n    box-shadow: none;\r\n}\r\n\r\n.search-group{\r\n    width: 500px;\r\n    margin-left: 100px;\r\n}\r\n\r\n.search-buttons{\r\n    background-color: #f0f1f7 !important;\r\n    border-radius: 7px;\r\n    height: 60px;\r\n    width: 100%;\r\n}\r\n\r\n.search-buttons:active {\r\n    box-shadow: 0 0px #666;\r\n    -webkit-transform: none;\r\n            transform: none;\r\n}\r\n\r\n.search-buttons:focus {\r\n    outline:0;\r\n}\r\n\r\n.rotateimg90 {\r\n    -webkit-transform:rotate(90deg);\r\n    transform: rotate(90deg);\r\n}\r\n\r\n.dropdown-menu{\r\n    background-color: #f0f1f7;\r\n    padding: 5px;\r\n    font-size: 16px;\r\n    border: none;\r\n    cursor: pointer;\r\n}\r\n\r\n.droplist-el{\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1em;\r\n    padding: 10px;\r\n    color:  #949495 !important;\r\n}\r\n\r\n.droplist-el:hover{\r\n    background-color: #f0f1f7;\r\n}\r\n\r\n.dropdown-menu:hover{\r\n    background-color: #f0f1f7;\r\n}\r\n\r\n.bottom-navbar{\r\n    margin-top: 76px; \r\n}\r\n\r\n.bottom-navbar-container{\r\n    padding-left: 30px;\r\n    padding-right: 30px;\r\n    padding-top: 10px;\r\n    padding-bottom: 10px; \r\n}\r\n\r\n.text-myfiles{\r\n    font-family: Raleway-Bold;\r\n    letter-spacing: 1px;\r\n    font-size: 1.2em;\r\n    padding: 20px;\r\n    color:  #333333;\r\n    margin-left: 100px;\r\n}\r\n\r\n.sort-button{\r\n    background-color: transparent;\r\n    border-radius: 7px;\r\n    height: 43px;\r\n    width: 43px;\r\n}\r\n\r\n.sort-button:active {\r\n    box-shadow: 0 0px #666;\r\n    -webkit-transform: none;\r\n            transform: none;\r\n}\r\n\r\n.sort-button:focus {\r\n    outline:0;\r\n}\r\n\r\n.text-right{\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1em;\r\n    padding: 10px;\r\n    color:  #949495 !important;\r\n    vertical-align: middle; \r\n}\r\n\r\n.icons{\r\n    padding: 5px;\r\n}\r\n\r\n.divicons{\r\n    margin-top: 20px;\r\n    margin-right: 125px;\r\n}\r\n\r\n.access-params{\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1em;\r\n    padding: 10px;\r\n    color:  #949495 !important;\r\n    vertical-align: middle; \r\n    background-color: transparent;\r\n    border: none;\r\n    padding-top: 20px;\r\n}\r\n\r\n.access-params:focus {\r\n    outline:0;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/_components/menu/menu.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar-fixed-top navcustom\">\r\n\r\n  <div>\r\n    <span class=\"navbar-brand\">LOGO</span>\r\n  </div>\r\n  <div class=\"navbar-left\">\r\n    <form class=\"navbar-form\" role=\"search\">\r\n      <div class=\"input-group search-group\">\r\n        <div class=\"input-group-btn\">\r\n          <button type=\"button\" class=\"btn search-buttons\">  \r\n              <img src=\"assets\\icons\\search.svg\" width=\"20\" height=\"20\">\r\n          </button>\r\n        </div>\r\n        <input type=\"text\" class=\"form-control search-holder\" placeholder=\"Поиск файлов\">\r\n        <div class=\"input-group-btn\">\r\n          <button type=\"button\" class=\"btn search-buttons dropdown-toggle\" data-toggle=\"dropdown\">\r\n              <span><img src=\"assets\\icons\\next.svg\" width=\"15\" height=\"15\" class=\"rotateimg90\"></span>\r\n          </button>\r\n          <ul class=\"dropdown-menu\" role=\"menu\">\r\n            <li>\r\n              <a class=\"droplist-el\" href=\"#\">\r\n                  <span class=\"droplist-el\">Поиск по файлам</span>\r\n              </a>\r\n            </li>\r\n            <li>\r\n              <a class=\"droplist-el\" href=\"#\">\r\n                <span class=\"droplist-el\">Поиск по тегам</span>\r\n                </a>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n\r\n      </div>\r\n    </form>\r\n  </div>\r\n  <ul class=\"nav navbar-nav navbar-right\">\r\n\r\n    <li *ngIf=\"currentUser\" class=\"text-name right-block\">{{currentUser.name}}</li>\r\n    <li>\r\n      <div>\r\n        <div class=\"img-color-circle right-block\"><img src=\"assets\\img\\user.svg\" class=\"img-circle\"></div>\r\n      </div>\r\n    </li>\r\n    <li>\r\n      <div class=\"logout right-block\">\r\n\r\n        <a [routerLink]=\"['/login']\" class=\"link\">\r\n          <span><img src=\"assets\\icons\\next.svg\" width=\"30\" height=\"30\"></span>\r\n        </a>\r\n\r\n      </div>\r\n    </li>\r\n\r\n  </ul>\r\n  <div class=\"bottom-navbar\">\r\n    <div>\r\n      <div class=\"navbar-left\">\r\n        <div class=\"text-myfiles\">Мои файлы\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <ul class=\"nav navbar-nav navbar-right\">\r\n      <li><button class=\"access-params\">Настройки доступа</button></li>\r\n      <li class=\"text-right\">Сортировка\r\n        <button type=\"button\" class=\"btn sort-button dropdown-toggle\" data-toggle=\"dropdown\">\r\n          <span><img src=\"assets\\icons\\next.svg\" width=\"15\" height=\"15\" class=\"rotateimg90\"></span>\r\n      </button>\r\n        <div class=\"dropdown-menu\">\r\n          <li>\r\n            <a class=\"droplist-el\" href=\"#\">\r\n                <span class=\"droplist-el\">По дате создания</span>\r\n                </a>\r\n          </li>\r\n          <li>\r\n            <a class=\"droplist-el\" href=\"#\">\r\n              <span class=\"droplist-el\">По дате добавления</span>\r\n              </a>\r\n          </li>\r\n          <li>\r\n              <a class=\"droplist-el\" href=\"#\">\r\n              <span class=\"droplist-el\">По размеру</span>\r\n              </a>\r\n            </li>\r\n        </div>\r\n      </li>\r\n      <li>\r\n        <div class=\"divicons\">\r\n          <span class=\"icons\"><img src=\"assets\\icons\\list.svg\" width=\"30\" height=\"30\"></span>\r\n          <span class=\"icons\"><img src=\"assets\\icons\\tile.svg\" width=\"30\" height=\"30\"></span>\r\n        </div>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</nav>"

/***/ }),

/***/ "../../../../../src/app/_components/menu/menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MenuComponent = (function () {
    function MenuComponent() {
        var userInfoWithToken = JSON.parse(localStorage.getItem('currentUser'));
        this.currentUser = userInfoWithToken.userInfo;
        console.log(userInfoWithToken);
        console.log(userInfoWithToken.userInfo);
        console.log(this.currentUser);
    }
    MenuComponent.prototype.ngOnInit = function () {
    };
    return MenuComponent;
}());
MenuComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-menu',
        template: __webpack_require__("../../../../../src/app/_components/menu/menu.component.html"),
        styles: [__webpack_require__("../../../../../src/app/_components/menu/menu.component.css")]
    }),
    __metadata("design:paramtypes", [])
], MenuComponent);

//# sourceMappingURL=menu.component.js.map

/***/ }),

/***/ "../../../../../src/app/_components/register/register.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".fill { \r\n    min-height: 100vh;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center\r\n}\r\n\r\np.logo {\r\n     text-align: center;\r\n     text-transform: uppercase;\r\n     font-weight: bold;\r\n     font-size: 3.5em;\r\n     letter-spacing: 10px;\r\n     color: #676767;\r\n     font-family: Raleway-Black;\r\n}\r\n\r\np.welcome {\r\n    text-align: center;\r\n    font-size: 1.6em;\r\n    color: #999999;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 3px;\r\n}\r\n\r\n.title {\r\n    width: 550px; /* Ширина блока */ /* Для Firefox */  \r\n    box-sizing: border-box; /* Ширина блока с полями */\r\n    padding-bottom: 20px;\r\n}\r\n\r\np.login {\r\n    text-align: center;\r\n    font-weight: bold;\r\n    color: #333333;\r\n    font-size: 2.4em;\r\n    font-family: Raleway-Black;\r\n    letter-spacing: 2px;\r\n}\r\n\r\n.textchoose {\r\n    padding-bottom: 40px;\r\n    color: #7a7a7a;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 2px;\r\n}\r\n\r\np.register {\r\n    text-align: center;\r\n    font-size: 1.4em;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 2px;\r\n}\r\n\r\n.link {\r\n    text-decoration: none;\r\n    color: #d3346c;\r\n    font-size: 1em;\r\n}\r\n\r\n.whiteblock {\r\n    background-color: #FFFFFF;\r\n    width: 550px; /* Ширина блока */\r\n    height: 700px;\r\n    padding-bottom: 100px; /* Поля */\r\n    padding-right: 95px;\r\n    padding-left: 95px;\r\n    padding-top: 100px;\r\n    margin-top: 10px; /* Отступ сверху */\r\n    border-radius: 5px; /* Для Firefox */  \r\n    box-sizing: border-box; /* Ширина блока с полями */\r\n    box-shadow: 0px 3px 4px 0px #b9b9b9;\r\n}\r\n\r\n.form-control {\r\n     height: 60px !important;\r\n     border: 2px solid #999999 !important;\r\n     border-radius: 4px !important; \r\n     padding-left: 20px !important; \r\n     color: #7a7a7a;\r\n     font-family: Raleway-SemiBold;\r\n     letter-spacing: 1px;\r\n     font-size: 1.2em;\r\n }\r\n\r\n .button {\r\n    background-color: #34d3bb !important;/* Green */\r\n    width: 360px;\r\n    height: 60px;\r\n    color: white;\r\n    padding: 9px 0px;\r\n    text-align: center;\r\n    text-decoration: none;\r\n    display: inline-block;\r\n    font-size: 16px;\r\n    margin: 0px 0px;\r\n    cursor: pointer;\r\n    border-radius: 30px; /* Safari */\r\n    transition-duration: 0.4s;\r\n    border: 2px solid #34d3bb;\r\n    margin-top: 60px;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1.4em;\r\n}\r\n\r\n.button:focus {\r\n    outline:0;\r\n}\r\n\r\n.button:hover {\r\n    background-color: #FFFFFF !important;\r\n    color: #616161;\r\n    border: 2px solid #999999;\r\n}\r\n\r\n.vertical-align {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n}\r\n\r\n.form-group{\r\n    margin: 0px;\r\n}\r\n\r\n.alerts {\r\n    padding: 0px;\r\n    margin:  0px;\r\n    color: #b13748;\r\n    font-family: Raleway-SemiBold;\r\n    letter-spacing: 1px;\r\n    font-size: 1em;\r\n    max-height: 15px;\r\n    position: relative;\r\n    bottom: 20px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/_components/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container fill vertical-align\">\r\n\r\n    <div>\r\n        <div class=\"title\">\r\n            <p class=\"logo\">logo</p>\r\n            <p class=\"welcome\">Добро пожаловать!</p>\r\n        </div>\r\n        <div class=\"whiteblock\">\r\n            <div class=\"textchoose\">\r\n                <p class=\"login\">Зарегистрируйтесь</p>\r\n                <div>\r\n                    <p class=\"register\">или <a [routerLink]=\"['/login']\" class=\"link\">Войдите в свой аккаунт</a></p>\r\n                </div>\r\n            </div>\r\n            <form name=\"form\" (ngSubmit)=\"f.form.valid && register()\" #f=\"ngForm\" novalidate>\r\n                <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !name.valid }\">\r\n                    <label for=\"name\"></label>\r\n                    <input type=\"text\" class=\"form-control\" name=\"name\" placeholder=\"Имя пользователя\" [(ngModel)]=\"model.name\" #name=\"ngModel\"\r\n                        required maxlength=\"50\" />\r\n                    <div *ngIf=\"name.errors && (name.dirty && name.touched)\" class=\"alerts\"><br>\r\n                        <div [hidden]=\"!name.errors.required\">\r\n                            Имя пользователя необходимо.\r\n                        </div>\r\n                        <div [hidden]=\"!password.errors.maxlength\">\r\n                            Максимальная длинна имени 50 символов.\r\n                        </div>\r\n                    </div>\r\n                    <!-- <div *ngIf=\"f.submitted && !name.valid\" class=\"help-block\">Имя пользователя необходимо</div> -->\r\n                </div>\r\n                <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !email.valid }\">\r\n                    <label for=\"email\"></label>\r\n                    <input type=\"email\" class=\"form-control\" name=\"email\" placeholder=\"E-mail\" [(ngModel)]=\"model.email\" #email=\"ngModel\" required\r\n                        email />\r\n                    <div *ngIf=\"email.errors && (email.dirty && email.touched)\" class=\"alerts\"><br>\r\n                        <div [hidden]=\"!email.errors.required\">\r\n                            Email необходим.\r\n                        </div>\r\n                        <div [hidden]=\"!email.errors.email\">\r\n                            Введите корректный email.\r\n                        </div>\r\n                    </div>\r\n                    <!-- <div *ngIf=\"f.submitted && !email.valid\" class=\"help-block\">E-mail необходим</div> -->\r\n                </div>\r\n                <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\r\n                    <label for=\"password\"></label>\r\n                    <input type=\"password\" class=\"form-control\" name=\"password\" placeholder=\"Пароль\" [(ngModel)]=\"model.password\" #password=\"ngModel\"\r\n                        required minlength=\"6\" maxlength=\"50\"/>\r\n                    <div *ngIf=\"password.errors && (password.dirty && password.touched)\" class=\"alerts\"><br>\r\n                        <div [hidden]=\"!password.errors.required\">\r\n                            Пароль необходим.\r\n                        </div>\r\n                        <div [hidden]=\"!password.errors.minlength\">\r\n                            Минимальная длинна пароля 6 символов.\r\n                        </div>\r\n                        <div [hidden]=\"!password.errors.maxlength\">\r\n                            Максимальная длинна пароля 50 символов.\r\n                        </div>\r\n                    </div>\r\n                    <!-- <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Пароль необходим</div> -->\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <button [disabled]=\"loading\" class=\"button\">Зарегистрироваться</button>\r\n                </div>\r\n            </form>\r\n\r\n        </div>\r\n    </div>"

/***/ }),

/***/ "../../../../../src/app/_components/register/register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_index__ = __webpack_require__("../../../../../src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_authentification_service__ = __webpack_require__("../../../../../src/app/_components/login/authentification.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterComponent = (function () {
    function RegisterComponent(route, router, userService, authentificationService, alertService) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.authentificationService = authentificationService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.loading = true;
        this.authentificationService.addUser(this.model.name, this.model.email, this.model.password)
            .subscribe(function (data) {
            // set success message and pass true paramater to persist the message after redirecting to the login page
            //this.alertService.success('Registration successful', true);
            console.log('AddingUser succesfull');
            _this.authentificationService.login(_this.model.email, _this.model.password)
                .subscribe(function (data) {
                console.log('Login succesfull');
                _this.router.navigate([_this.returnUrl]);
            }, function (error) {
                console.log('Login unsuccesfull');
                _this.alertService.error(error);
                _this.loading = false;
            });
        }, function (error) {
            console.log('AddingUser unsuccesfull');
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-register',
        template: __webpack_require__("../../../../../src/app/_components/register/register.component.html"),
        styles: [__webpack_require__("../../../../../src/app/_components/register/register.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_index__["b" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_index__["b" /* UserService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__login_authentification_service__["a" /* AuthentificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__login_authentification_service__["a" /* AuthentificationService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* AlertService */]) === "function" && _e || Object])
], RegisterComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ "../../../../../src/app/_directives/alert/alert.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/_directives/alert/alert.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"message\" [ngClass]=\"{ 'alert': message, 'alert-success': message.type === 'success', 'alert-danger': message.type === 'error' }\">{{message.text}}</div>"

/***/ }),

/***/ "../../../../../src/app/_directives/alert/alert.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__("../../../../../src/app/_services/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertComponent = (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.alertService.getMessage().subscribe(function (message) { _this.message = message; });
    };
    return AlertComponent;
}());
AlertComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-alert',
        template: __webpack_require__("../../../../../src/app/_directives/alert/alert.component.html"),
        styles: [__webpack_require__("../../../../../src/app/_directives/alert/alert.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* AlertService */]) === "function" && _a || Object])
], AlertComponent);

var _a;
//# sourceMappingURL=alert.component.js.map

/***/ }),

/***/ "../../../../../src/app/_guards/authentification.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthentificationGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthentificationGuard = (function () {
    function AuthentificationGuard(router) {
        this.router = router;
    }
    AuthentificationGuard.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    return AuthentificationGuard;
}());
AuthentificationGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object])
], AuthentificationGuard);

var _a;
//# sourceMappingURL=authentification.guard.js.map

/***/ }),

/***/ "../../../../../src/app/_guards/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__authentification_guard__ = __webpack_require__("../../../../../src/app/_guards/authentification.guard.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__authentification_guard__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/_services/alert.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AlertService = (function () {
    function AlertService(router) {
        var _this = this;
        this.router = router;
        this.subject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
        this.keepAfterNavigationChange = false;
        // clear alert message on route change
        router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationStart */]) {
                if (_this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    _this.keepAfterNavigationChange = false;
                }
                else {
                    // clear alert
                    _this.subject.next();
                }
            }
        });
    }
    AlertService.prototype.success = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    };
    AlertService.prototype.error = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    };
    AlertService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    return AlertService;
}());
AlertService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object])
], AlertService);

var _a;
//# sourceMappingURL=alert.service.js.map

/***/ }),

/***/ "../../../../../src/app/_services/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alert_service__ = __webpack_require__("../../../../../src/app/_services/alert.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__alert_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_service__ = __webpack_require__("../../../../../src/app/_services/user.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__user_service__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/_services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    // private helper methods
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Authorization': 'Bearer ' + currentUser.token });
            return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        }
    };
    return UserService;
}());
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], UserService);

var _a;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-alert></app-alert>\r\n          <router-outlet></router-outlet>\r\n          \r\n\r\n<!-- <body class=\"body-style\"></body> -->\r\n<!-- <h1><span style=\"color:#285783\">{{title}}</span></h1>\r\n\r\n<hr />\r\n<table class='table' style=\"background-color:#FFFFFF; border:2px #6D7B8D; padding:5px;width:99%;table-layout:fixed;\" cellpadding=\"2\"\r\n  cellspacing=\"2\" *ngIf=\"apiValues\">\r\n  <tr>\r\n    <td width=\"180\" align=\"center\"><strong>Names</strong></td>\r\n  </tr>\r\n  <tbody *ngFor=\"let value of apiValues\">\r\n    <tr>\r\n      <td align=\"center\" style=\"border: solid 1px #659EC7; padding: 5px;table-layout:fixed;\">\r\n        <span style=\"color:#9F000F\">{{value}}</span>\r\n      </td>\r\n    </tr>\r\n  </tbody>\r\n</table> -->"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(_httpService) {
        this._httpService = _httpService;
        this.title = "Logo";
        this.apiValues = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        // this._httpService.get('/api/files').subscribe(values => {
        //   this.apiValues = values.json() as string[];
        // });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing__ = __webpack_require__("../../../../../src/app/app.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_menu_menu_component__ = __webpack_require__("../../../../../src/app/_components/menu/menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__guards_index__ = __webpack_require__("../../../../../src/app/_guards/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__directives_alert_alert_component__ = __webpack_require__("../../../../../src/app/_directives/alert/alert.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__ = __webpack_require__("../../../../../src/app/_components/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_login_login_component__ = __webpack_require__("../../../../../src/app/_components/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_register_register_component__ = __webpack_require__("../../../../../src/app/_components/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_index__ = __webpack_require__("../../../../../src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_login_authentification_service__ = __webpack_require__("../../../../../src/app/_components/login/authentification.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_home_home_service__ = __webpack_require__("../../../../../src/app/_components/home/home.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_data_data_component__ = __webpack_require__("../../../../../src/app/_components/data/data.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_6__components_menu_menu_component__["a" /* MenuComponent */], __WEBPACK_IMPORTED_MODULE_8__directives_alert_alert_component__["a" /* AlertComponent */], __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__["a" /* HomeComponent */], __WEBPACK_IMPORTED_MODULE_10__components_login_login_component__["a" /* LoginComponent */], __WEBPACK_IMPORTED_MODULE_11__components_register_register_component__["a" /* RegisterComponent */], __WEBPACK_IMPORTED_MODULE_15__components_data_data_component__["a" /* DataComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__app_routing__["a" /* routing */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__guards_index__["a" /* AuthentificationGuard */],
            __WEBPACK_IMPORTED_MODULE_12__services_index__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_13__components_login_authentification_service__["a" /* AuthentificationService */],
            __WEBPACK_IMPORTED_MODULE_12__services_index__["b" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_14__components_home_home_service__["a" /* HomeService */]
            // providers used to create fake backend
            //fakeBackendProvider,
            //MockBackend,
            //BaseRequestOptions
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_home_home_component__ = __webpack_require__("../../../../../src/app/_components/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_login_login_component__ = __webpack_require__("../../../../../src/app/_components/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_register_register_component__ = __webpack_require__("../../../../../src/app/_components/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__guards_index__ = __webpack_require__("../../../../../src/app/_guards/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_data_data_component__ = __webpack_require__("../../../../../src/app/_components/data/data.component.ts");






var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__components_home_home_component__["a" /* HomeComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_4__guards_index__["a" /* AuthentificationGuard */]] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_2__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_3__components_register_register_component__["a" /* RegisterComponent */] },
    { path: ':folderid', component: __WEBPACK_IMPORTED_MODULE_5__components_data_data_component__["a" /* DataComponent */] },
    //{ path: ':fileid', component: FilePreviewComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map