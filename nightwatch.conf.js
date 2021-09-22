var HOST_NAME = process.env.HostName; 

module.exports = {

  src_folders: ["./src/testRun","./src/testCases"],
  output_folder: "./src/reports",
  custom_commands_path: "",
  custom_assertions_path: "",
  page_objects_path: "./src/pageObjects",
  globals_path: "./src/globals.js",
  
  selenium: {
    start_process: true,
    server_path: "./selenium/selenium-server-standalone-3.8.1.jar",
    selenium_host: "localhost",
    log_path: "",
    port: 4445,
    cli_args: {
      "webdriver.chrome.driver": "./selenium/chromedriver.exe",
    },
  },

  test_settings: {

    default: {
      launch_url: "https://www.google.com",
      selenium_port: 4445,
      selenium_host: "localhost",
      silent: true,      
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: "./src/screenshots/",
      },
      desiredCapabilities: {
        browserName: "chrome",
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },

    jenkins_chrome: {
      launch_url: "https://www.facebook.com",         
      use_xpath: true,
      selenium_port: 4445,
      selenium_host  : "10.179.12.19",
      cli_args: {
        "webdriver.chrome.driver": "./selenium/chromedriver.exe",
      },
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: "./src/screenshots",
      },
      desiredCapabilities: {
        browserName: "chrome",
        acceptSslCerts: true,
        acceptInsecureCerts: true,
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: [
            "--no-sandbox",
            "--allow-insecure-localhost", 
            "start-maximized"],
        },
      },
    },

    local_chrome: {
      launch_url: "https://www.facebook.com",      
      use_xpath: true,
      selenium_port: 4445,
      cli_args: {
        "webdriver.chrome.driver": "./selenium/chromedriver.exe",
      },
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: "./src/screenshots/",
      },
      desiredCapabilities: {
        browserName: "chrome",
        acceptSslCerts: true,
        acceptInsecureCerts: true,
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: [
            "--no-sandbox",
            "--allow-insecure-localhost", 
            "start-maximized"],
        },
      },
    },
  },
};
