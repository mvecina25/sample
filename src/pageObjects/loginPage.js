// const { USER_MGNT_PAGE } = require("../globals");
const global = require("../globals.js");

var xSelector = function (selector) {
  return {
      selector: selector,
      locateStrategy: 'xpath'
  }
};

const elements = {  
  LOGIN_USERNAME: xSelector("//input[contains(@type,'text')]"),
  LOGIN_PASSWORD: xSelector("//input[contains(@type,'password')]"),
  LOGIN_BUTTON: xSelector("//span[@data-ref='btnInnerEl'][contains(.,'Login')]"),
  LOGIN_XDR_TOGGLE: xSelector("//div[contains(@data-unchecked,'XDR')]"),
  LOGIN_REPORTER_TOGGLE: xSelector("//div[contains(@data-checked,'Reporter')]"),
};

var commands = [
  {
    inputUsername(user) {
      return this.waitForElementVisible("@LOGIN_USERNAME", global.TIMEOUT.WAIT, "LOGIN: Username is " + user)
                 .setValue("@LOGIN_USERNAME", user)
                 .pause(global.TIMEOUT.INPUT);
    },
    inputPass(pass) {
      return this.waitForElementVisible("@LOGIN_PASSWORD", global.TIMEOUT.WAIT, "LOGIN: Password is " + pass)
                 .setValue("@LOGIN_PASSWORD", pass)
                 .pause(global.TIMEOUT.INPUT);
    },
    clickLogin() {
      return this.waitForElementVisible("@LOGIN_BUTTON", global.TIMEOUT.WAIT, "LOGIN: Login button is clicked")
                 .click("@LOGIN_BUTTON")
                 .pause(global.TIMEOUT.CLICK);
    },
    clickXDRToggle() {
       return this.waitForElementVisible("@LOGIN_XDR_TOGGLE", global.TIMEOUT.WAIT, "LOGIN: XDR toggle is clicked")
                 .click("@LOGIN_XDR_TOGGLE")
                 .pause(global.TIMEOUT.CLICK);
    },
    clickReporterToggle() {
      return this.waitForElementVisible("@LOGIN_REPORTER_TOGGLE", global.TIMEOUT.WAIT, "LOGIN: Reporter toggle is clicked")
                 .click("@LOGIN_REPORTER_TOGGLE")
                 .pause(global.TIMEOUT.CLICK).api.pause(global.TIMEOUT.CLICK);
    },
    verifyTitleDisplay() {
      return this.expect.element(global.ELEMENT_NAME.LABEL).text.to.contain(global.REALM_PAGE.REALM_TEXT).before(global.TIMEOUT.FIVE)
    },
  },
];

module.exports = {
  elements: elements,
  commands: commands,
  url: function () {
    return this.api.launch_url;
  },
};2