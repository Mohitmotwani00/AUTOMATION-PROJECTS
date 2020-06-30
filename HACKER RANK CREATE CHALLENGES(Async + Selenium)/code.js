//AIM => TO ADD 10 CHALLENGES ON HACKERANK 

// npm install selenium-webdriver chromedriver
require("chromedriver");
let swd=require("selenium-webdriver");
let fs=require("fs");
let credentialFile=process.argv[2];
//build browser
let bldr= new swd.Builder();
let login,pwd,email;
let quesions =require("./questions");

// console.log(quesions[0]);
//represents single tab
let driver = bldr.forBrowser("chrome").build();

(async function(){
    
    try{
          await Loginfunc();
          console.log("userlogged In");
          let profileTab = await driver.findElement(swd.By.css("a[data-analytics='NavBarProfileDropDown']"));
          await profileTab.click();
          let adminBtn = await driver.findElement(swd.By.css("a[data-analytics='NavBarProfileDropDownAdministration']"));
          await adminBtn.click();
          let ManageBtn =await driver.findElement(swd.By.css("a[href='/administration/challenges']"));
           await ManageBtn.click();
           let CreatePageurl = await driver.getCurrentUrl();
          
          for(let i=0;i<quesions.length;i++){
          (await driver).get(CreatePageurl);
           await CreateChlnge(quesions[i]);
          console.log(i + ". challenge created");
          
          }
          // await driver.get(CreatePageurl);
          // await CreateChlnge(quesions[0]);

    }catch(err){    
        console.log(err.message);
    }  
})()

async function Loginfunc(){
       
          let Data= await fs.promises.readFile(credentialFile,"utf-8");
          let jsondata=JSON.parse(Data)
          login=jsondata.login;
          pwd=jsondata.pwd;
          email=jsondata.email;

          
          await driver.get(login);
          await driver.manage().window().maximize();
          
           await driver.manage().setTimeouts({
            implicit:15000,
            pageload:15000
          })
          let emailboxselected = await driver.findElement(swd.By.css("#input-1"));
          await emailboxselected.sendKeys(email); 
          let passwordboxselected= await driver.findElement(swd.By.css("#input-2"));
          await passwordboxselected.sendKeys(pwd);
          let lgbBtnselected= await driver.findElement(swd.By.css("button[data-analytics='LoginPassword']"));
          await lgbBtnselected.click();
}

async function waitForLoader() {
  let loader = await driver.findElement(swd.By.css("#ajax-msg"));
  // explicit wait 
  await driver.wait(swd.until.elementIsNotVisible(loader));
}

async function CreateChlnge(Queobj){
  try{
    await waitForLoader();
    let CreatchallengeBtn =await driver.findElement(swd.By.css("button.btn.btn-green.backbone.pull-right"));
    await CreatchallengeBtn.click();


    let Nameareaselected= await driver.findElement(swd.By.css("#name"));
    let Descriptionselected= await driver.findElement(swd.By.css("#preview"));
    let psBox = await driver.findElement(swd.By.css("#problem_statement-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
    let ifBox = await driver.findElement(swd.By.css("#input_format-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
    let cnBox = await driver.findElement(swd.By.css("#constraints-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
    let ofBox = await driver.findElement(swd.By.css("#output_format-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
    let tags = await driver.findElement(swd.By.css(".tagsinput input"))
    
    
    
    
    
    await Nameareaselected.sendKeys(Queobj["Challenge Name"]);
    await Descriptionselected.sendKeys(Queobj["Description"]);
    await sendData("#problem_statement-container", psBox, Queobj["Problem Statement"]);
    await sendData("#input_format-container", ifBox, Queobj["Input Format"]);
    await sendData("#constraints-container", cnBox,Queobj["Constraints"]);
    await sendData("#output_format-container", ofBox, Queobj["Output Format"]);
    await tags.sendKeys(Queobj["Tags"]);
    await tags.sendKeys(swd.Key.ENTER);
    let submitBtn = await driver.findElement(swd.By.css("button.save-challenge.btn.btn-green"));
    await submitBtn.click();
     
    
    
    
  }catch(err){
      console.log(err);
  }
}

async function sendData(parentId,element ,Data){

  await driver.executeScript(
    `document.querySelector('${parentId} .CodeMirror.cm-s-default.CodeMirror-wrap div').style.height='10px'`);
    await element.sendKeys(Data);

}