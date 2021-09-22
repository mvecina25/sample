const global = require("../globals.js");

var test = require("../pageObjects/loginPage.js");
// var AddNewUserTestCase = require("../testCases/AddNewUserTestCase.js");

module.exports = {

  before: function(client) {

    // let loginPage = client.page.loginPage();
    // let appAPDPage = client.page.appAPDPage();
    // let login = loginPage.elements.LOGIN_USERNAME.selector;

    // loginPage      
    //   .navigate()
    //   .pause(global.TIMEOUT.LOAD_PAGE)
      // .inputUsername(global.LOGIN_PAGE.LOGIN_NAME)
      // .inputPass(global.LOGIN_PAGE.LOGIN_PASS)
      // .clickLogin()      
      // .pause(global.TIMEOUT.LOAD_PAGE);

    // appAPDPage
    // .cmd_func_shell(global.SHELL_SCRIPT.ATTACK_SCRIPT)
    // .pause(global.TIMEOUT.LOAD_PAGE);
  },

  after: function(client, done){
		client.end(done);
	},

  "LoginTestCase - Login": function(client) {
    let loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .pause(global.TIMEOUT.LOAD_PAGE)
      // .inputUsername(global.LOGIN_PAGE.LOGIN_NAME)
      // .inputPass(global.LOGIN_PAGE.LOGIN_PASS)
      // .clickLogin()
      // .pause(global.TIMEOUT.LOAD_PAGE);
  },

  // 'AddNewUserTestCase - Add New User'    : AddNewUserTestCase["AddNewUserTestCase - Add New User"],



}