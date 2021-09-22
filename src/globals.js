// ============= RUN In JENKINS ===========================

// var AGENT_NAME = process.env.AgentFQDN;
// var START_MONTH = process.env.Start_Month;
// var START_DAY = process.env.Start_Day;
// var START_YEAR = process.env.Start_Year;
// var START_COMPILE_TIME = process.env.APDStartTime;
// var END_COMPILE_TIME = process.env.APDEndTime;
// var END_MONTH = process.env.End_Month;
// var END_DAY = process.env.End_Day;
// var END_YEAR = process.env.End_Year;
// var APD_METRIC = process.env.Metric;
// var APD_RULE = process.env.Rule;

// var START_DATE = START_MONTH + " " + START_DAY + " " + START_YEAR;
// var START_TIME = START_COMPILE_TIME;
// var END_DATE = END_MONTH + " " + END_DAY + " " + END_YEAR;
// var END_TIME = END_COMPILE_TIME;

// var APP_NAME = "ATS_" + APD_METRIC + "_" + AGENT_NAME + "_" +  new Date().getTime();

// ======================================================


// ============= RUN LOCALLY ============================

var AGENT_NAME = "qa-rhel76-4";
var APD_RULE = "FileScan";
var APD_METRIC = "FileScan";
var START_DATE = "August 19 2021";
var END_DATE = "August 19 2021";
var START_TIME = "09:00";
var END_TIME = "10:00";

var APP_NAME = "ATS_" + APD_METRIC + "_" + AGENT_NAME + "_" +  "1628702017308";

// ======================================================
 

/* These are the avaiilable helpers/attackers
Helper1 = 192.168.100.151
Helper2 = 192.168.100.103
Helper3 = 192.168.101.10
Helper5 = 10.179.12.238
Helper6 = 10.179.14.52 
*/
var ORG_NAME = "ORG_MNL_AUTO";
var ATTACKER_1 = "192.168.100.103"; 
var ATTACKER_2 = "192.168.100.151";
var ATTACKER_3 = "192.168.101.10";
var ATTACKER_5 = "10.179.12.238";
var ATTACKER_6 = "10.179.14.52";
var PROXY1 = "qa-proxy1-3.qa.truefort.net";
var PROXY2 = "qa-proxy3-3.qa.truefort.net";
var PROXY3 = "qa-proxy5-3.qa.truefort.net";

// Make the agent name in uppercase
var agentNameUpperName = AGENT_NAME.toUpperCase();  

module.exports = {

  // This will save screenshots after each failed test case
  afterEach: function (client, done) {
    var weHaveFailures = client.currentTest.results.errors > 0 || client.currentTest.results.failed > 0;
    if (weHaveFailures) {
      if (!client.sessionId) {
        console.log('Session already ended.');
        done();
        return;
      }
 
      var fileName = client.currentTest.name;
      client.saveScreenshot(fileName, function(result) {
        if (!result || result.status !== 0)  {
           console.log('Error saving screenshot...', result);
         }
        client.end(done);
      });
     } else {
       client.end(function () { 
         done(); 
        });
     }
   },

  COMMON_STRING : {
    AGENT_NAME_OS: agentNameUpperName.substring(3, 10),
    AGENT_NAME_INSTANCE: agentNameUpperName.substring(11),
    INCOMINGFQ: "INCOMINGFQ",
    OUTGOINGFQ: "OUTGOINGFQ",
    LISTEN: "LISTEN",
    SAMURAI: "samurai",
    BUSHIDO: "bushido",
    ROOT: "root",
    NETWORK: "Network",
    PROCESS: "Process",
    FILESCAN: "FileScan",
    IPTOIP: "IPToIP",
    IPTOIPPORTINCOMING: "IPToIPPortIncoming",
    IPTOIPPORTOUTGOING: "IPToIPPortOutgoing",
    NEWTCPPORTLISTENING: "NewTCPPortListening",
    EXISTINGPROCESSRUNNINGBYNEWUSER: "ExistingProcessRunningByNewUser",
    NEWPROCESSLISTENINGTOTCPPORT: "NewProcessListeningToTCPPort",
    NEWINCOMINGPROCESSNETWORKTRAFFIC: "NewIncomingProcessNetworkTraffic",
    NEWOUTGOINGPROCESSNETWORKTRAFFIC: "NewOutgoingProcessNetworkTraffic",
    NEWPROCESS: "NewProcess",
    PROCESSWITHDIFFERENTUSER: "ProcessWithDifferentUser",
    PROCESSWITHDIFFERENTARGUMENT: "ProcessWithDifferentArgument",
    PROCESSTHREADCOUNT: "ProcessThreadCount",
    PROCESSFILEDECRIPTOR: "ProcessFileDecriptor",
    PROCESSCHECKSUM: "ProcessChecksum",
    PROCESSIDENTITY: "ProcessIdentity",
    NEWFILE: "NewFile",
    FILECHECKSUMCHANGED: "FileChecksumChanged",
    FILEPERMISSIONCHANGED: "FilePermissionChanged",
    FILEUSERCHANGED: "FileUserChanged",
    FILEGROUPCHANGED: "FileGroupChanged",
    FILEDELETED: "FileDeleted",
  },
  LINUX_COMMAND : {
    NEWTCPPORTLISTENING: "iperf3 -s -4 -p 1234 -f M -1",
    NEWTCPPORTLISTENINGREGEX: "iperf3 \\-s \\-4 \\-p 1234 \\-f M \\-1",
    NEWPROCESS: "top -n 20 -b",
  },

  SHELL_SCRIPT : {
    CLEAR_AGENT_HISTORY: "./src/scripts/shellhelper/ClearAgentHistory.sh ",
    END_SCREEN_SESSION: "./src/scripts/shellhelper/EndScreenSession.sh " + APD_METRIC,
    PREREQUISITE_NETWORK: "./src/scripts/network/NetworkPrerequisite.sh " + AGENT_NAME + ".qa.truefort.net",
    POSTREQUISITE_NETWORK: "./src/scripts/network/Network.sh " + PROXY1 + " " + ATTACKER_1 + " " + AGENT_NAME + ".qa.truefort.net" + " " + ATTACKER_2,
    PREREQUISITE_PROCESS: "./src/scripts/process/ProcessPrerequisite.sh " + AGENT_NAME + ".qa.truefort.net",
    PREREQUISITE_FILESCAN: "./src/scripts/filescan/FileScanPrerequisite.sh " + AGENT_NAME + ".qa.truefort.net",
    POSTREQUISITE_FILESCAN: "./src/scripts/filescan/FileScan.sh " + PROXY1 + " " + ATTACKER_1 + " " + AGENT_NAME + ".qa.truefort.net" + " " + ATTACKER_2,
    PREREQUISITE_FILESCAN_WIN: "./src/scripts/filescan/FileScanWinPrerequisite.sh " + AGENT_NAME + ".qa.truefort.net",
    ATTACK_SCRIPT: "./src/scripts/" + APD_METRIC + ".sh " + PROXY1 + " " + ATTACKER_1 + " " + AGENT_NAME + ".qa.truefort.net" + " " + ATTACKER_2,
    FILESCAN_REMOVE_FILES: "./src/scripts/filescan/FileScanRemoveFiles.sh",
    PACKAGE_REMOVE: "./src/scripts/package/PackageRemove.sh " + AGENT_NAME + ".qa.truefort.net",
    
  },

  IP_ADDRESS : {
    ATTACKER_1: ATTACKER_1,
    ATTACKER_2: ATTACKER_2,
    ATTACKER_3: ATTACKER_3,
    ATTACKER_5: ATTACKER_5,
    ATTACKER_6: ATTACKER_6,
    PROXY1: PROXY1,
    PROXY2: PROXY2,
    PROXY3: PROXY3,
  },


  TIMEOUT : {
    DROPDOWN: 400,
    DROPDOWN2: 500,
    KEYSTROKE: 400,
    KEYSTROKE2: 500,
    INPUT: 500,
    CLICK: 500,
    CLICK2: 2000,
    MSGBOX: 1000,
    MSGBOX5: 5000,
    SEARCH_RESULT: 1500,
    POPUP: 2000,
    TC_END: 3000,
    LOAD_PAGE: 5000,
    VERIFY: 10000,
    ACTION: 5000,
    WAIT: 10000,
    LONG_WAIT: 30000,
    MINUTE_WAIT: 60000,
  },

  ELEMENT_NAME: {
    LABEL: "label",
    BODY: "body",
  },

  KEYSTROKE : {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN : 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    ELEVEN: 11,
    TWELVE: 12,
    THIRTEEN: 13,
    FOURTEEN: 14,
    FIFTEEN: 15,
    SIXTEEN: 16,
    SEVENTEEN: 17,
    EIGHTEEN: 18,
    NINETEEN: 19,
    TWENTY: 20,
    TWENTYONE: 21,
    TWENTYTWO: 22,
    TWENTYTHREE: 23,
  },

  LOGIN_PAGE : {
    LOGIN_NAME: "admin",
    // LOGIN_PASS: "floatingman",
    LOGIN_PASS: "Floating@2021",
  },

  REALM_PAGE : {
    REALM_TEXT: "Realm",
  },

  APP_PAGE : {
    URL : "/Iris/?screen=profileview",
    TITLE: "Applications",
    APP_NAME: APP_NAME,
    // APP_ORG_NAME: "automation",
    APP_ORG_NAME: "MNL",
    // APP_TEAM_NAME: "chrome",
    APP_TEAM_NAME: "MNL",
    APP_STATE_PROD: "PROD",
    APP_REGION_NAME: "Weehawken",
    APP_DESCRIPTION: "Automated Scripts",
    APP_CREATE_MSBOX: "Application \"" + APP_NAME + "\" created successfully",
  },

  APP_APD_PAGE : {
    APD_METRIC: APD_METRIC,
    APD_RULE: APD_RULE,
    DEPLOYED: "DEPLOYED",
    START_DATE: START_DATE,
    END_DATE: END_DATE,
    START_TIME: START_TIME,
    END_TIME: END_TIME,
    APD_RULES_DEPLOYMENT_MSBOX_SUCCESS: "APD rules deployment scheduled",
  },

  APP_AGENT_PAGE : {
    AGENT_NAME: AGENT_NAME,
    AGENT_ASSIGN_MSBOX_SUCCESS: "Agent(s) assigned successfully",
  },

  APP_RULEPACKS_PAGE : {
    RULEPACKS_ASSIGN_MSBOX_SUCCESS: "Rulepack(s) assigned successfully.",
  },

  USER_MGMT_PAGE : {
    URL : "/Iris/?screen=userview",
    TITLE: "User Management",
    USERNAME: "mnl_user",
    FIRSTNAME: "manila",
    LASTNAME: "team",
    EMAIL_ADDRESS: "manila.team@truefort.com",
    PASSWORD1: "Fr334@11",
    PASSWORD2: "Fr334@11",
    MSBBOX_DELETE: "User deleted successfully",
    COLUMN_FIRSTNAME: 3,
  },

  TEAM_MGMT_PAGE : {
    URL : "/Iris/?screen=teamview",
    NAME : "TEAM_MNL_AUTO",
    EMAIL : "manila.team@truefort.com",
    DESCRIPTION : "TEAM MANILA AUTOMATION",
    USER_ID : "mnl_user",
    COLUMN_NAME : 2,
    COLUMN_USER_ID : 3,
  },

  ORG_MGMT_PAGE : {
    ORG_URL : "/Iris/?screen=orgmanagementview",
    ORG_NAME : ORG_NAME,
    ORG_TYPE : "BUSINESS UNIT",
    ORG_CODE : "010",
    ORG_DESCRIPTION : "AUTOMATED TESTING",
    ORG_ADD_NEW_ORG_MSBOX: "Organization \"" + ORG_NAME + "\" added successfully as a BUSINESS UNIT",
  }

};