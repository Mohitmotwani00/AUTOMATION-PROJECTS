//AIM => TO SUBMIT 4 CODES  ON HACKERANK 

// npm install selenium-driver chromedriver
require("chromedriver");
let swd=require("selenium-webdriver");
let fs=require("fs");
let credentialFile=process.argv[2];
//build browser
let bldr= new swd.Builder();
let login,pwd,email, H3Arr,CodeArr,gCode,GtextArea, GTBox;
//represents single tab
let driver = bldr.forBrowser("chrome").build();
//usrname,pwd reading
let fileWillBeReadPromise=fs.promises.readFile(credentialFile,"utf-8")

fileWillBeReadPromise.then(function(data){
    let credentials=JSON.parse(data);
    login=credentials.login;
    email=credentials.email;
    pwd=credentials.pwd;
    let loginWillBeOpenedpromise=driver.get(login);
    return loginWillBeOpenedpromise;
}).then(function(){
     let waitforEveryonePromise=driver.manage().setTimeouts({
         implicit:10000,
         pageload:10000
     })
     return waitforEveryonePromise;
}).then(function(){
    let emailBoxWillBeSelectedPromise=driver.findElement(swd.By.css("#input-1"));
    return emailBoxWillBeSelectedPromise;
}).then(function(emailBox){
    let emailWillBEEnteredPromise=emailBox.sendKeys(email);
    return emailWillBEEnteredPromise;
}).then(function(){
    let PasswordBoxWillBeSelectedPromise=driver.findElement(swd.By.css("#input-2"));
    return PasswordBoxWillBeSelectedPromise;
}).then(function(PasswordBox){
    let PasswordWillBEEnteredPromise=PasswordBox.sendKeys(pwd);
    return PasswordWillBEEnteredPromise;
}).then(function(){
    let loginButtonWillBeClicked= Navigator("button[data-analytics='LoginPassword']");
    return loginButtonWillBeClicked;
}).then(function(){
    let InterviesprepButtonWillBeClicked=Navigator("#base-card-1-link");
    return InterviesprepButtonWillBeClicked;
}).then(function(){
    let WarmUpButtonWillBeClicked=Navigator("a[data-attr1='warmup']");
    return WarmUpButtonWillBeClicked;
}).then(function(){
    // how to resolve (n)promises in series
    // get the list of questions 
    // let qWillBesolvePromise = questionSolver(qpurl);
    // return qWillBesolvePromise;
    let QListP=driver.findElements(swd.By.css("a.challenge-list-item"));
    return QListP;
}).then(function(QList){
    let HrefArr=[];

    for(let i=0;i<QList.length;i++){
     let qlinkP= QList[i].getAttribute("href");
     HrefArr.push(qlinkP);
    }

    return Promise.all(HrefArr);
}).then(function(LinkArr){
    //serially working job
    let thenp = Qsolver(LinkArr[0]);
    for(let i=1;i<LinkArr.length;i++){
        thenp=thenp.then(function(){
        console.log("Question " + i +" IS Solved");
        return Qsolver(LinkArr[i]);
    })
    }
   return thenp; 
}).catch(function(err){
    console.log(err.message);
})


function Navigator(Selector){
    return new Promise(function(resolve,reject){
     
        let ButtonSelected=driver.findElement(swd.By.css(Selector));
        ButtonSelected.then(function(Button){
              let buttonwillbeclickedpromise= Button.click();
              return  buttonwillbeclickedpromise;      
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject(err);
        })

    })
}

function Qsolver(Qlink){
  return new Promise( function (resolve,reject){
    
    let GoTOPage=driver.get(Qlink);
   
    // .then(function(){
    //     let SolveButtonWillBeclickedPromise=Navigator("a[data-attr1='sock-merchant']")
    //     return SolveButtonWillBeclickedPromise;
    // })
    GoTOPage.then(function(){
        let EditorialWillOpenPromise =Navigator("a[data-attr2='Editorial']");
        return EditorialWillOpenPromise;
    }).then(function(){
        let YesSolveButtonWillBeClickedPromise=Navigator("ui-btn.ui-btn-normal.ui-btn-primary");
        return YesSolveButtonWillBeClickedPromise;
    }).catch(function (err) {
        if (err.message === "Cannot read property 'click' of null") {
            console.log("Lock btn did not occur");
        }
    })
    // .then(function(){
    //     let CodeAreaWillBeSelected=driver.findElement(swd.By.css(".challenge-editorial-block.editorial-setter-code .editorial-code-box .hackdown-content"))
    //    return CodeAreaWillBeSelected;
    // })
    .then(function(){
        let Allh3Promise =driver.findElements(swd.By.css("h3"));
        let  highlightPara = driver.findElements(swd.By.css(".highlight"));
    // All=> array promise=> promise=> all promises of that array get resolved
        let CombinedP= Promise.all([Allh3Promise,highlightPara]);
        return CombinedP;
    }).then(function(ElementsArr){
         H3Arr=ElementsArr[0];
         CodeArr=ElementsArr[1];
        
        let H3TextArr=[];
        for(let i=0;i<H3Arr.length;i++){
            
            let TextP=H3Arr[i].getText();
            H3TextArr.push(TextP);
        }

        return Promise.all(H3TextArr);

    }).then(function(h3TextArr){
      
        let codeP;
            for (let i = 0; i < h3TextArr.length; i++) {
                if (h3TextArr[i].includes("C++")) {
                    codeP = CodeArr[i].getText();
                }
            }
        return codeP;
    }).then(function (code) {
        // console.log(code);
        gCode = code;
        let goToProblemPageP = Navigator("a[data-attr2='Problem']")
        return goToProblemPageP;
    }).then(function () {
        let inputBoxClickedP = Navigator(".custom-input-checkbox");
        return inputBoxClickedP;
    }).then(function () {
        let textAreaP = driver.findElement(swd.By.css(".custominput"));
        return textAreaP;
    }).then(function (textArea) {
        // console.log(gCode);
        GtextArea=textArea;
        let codeWillBeSubmittedP = textArea.sendKeys(gCode);
        return codeWillBeSubmittedP;
    }).then(function(){
        let sendCTRLap=GtextArea.sendKeys(swd.Key.CONTROL +"a");
        return sendCTRLap;
    }).then(function(){
        let sendCTRLcp=GtextArea.sendKeys(swd.Key.CONTROL +"c");
        return sendCTRLcp;
    }).then(function(){
        let EditoretextaresselectedP=driver.findElement(swd.By.css(".inputarea"));
        return EditoretextaresselectedP;
    }).then(function(TBox){
        GTBox=TBox;
       let TboxCTRLaP=TBox.sendKeys(swd.Key.CONTROL +"a");
       return TboxCTRLaP;
    }).then(function(){
        let TboxCTRLvP=GTBox.sendKeys(swd.Key.CONTROL +"v");
       return TboxCTRLvP;
    }).then(function(){
         let SubmitCode=Navigator(" .pull-right.btn.btn-primary.hr-monaco-submit");
         return SubmitCode;
    })
    .then(function () {
        resolve();
    }).catch(function (err) {
        console.log(err);
        reject();
    })

  })
    
}