// hocow18454@qmrbe.com

let puppeteer = require("puppeteer");
let fs = require("fs");
let credentialsFile = process.argv[2];

// let toSearchItem = process.argv[3];
let repo_name= "MY FIRSST REPO";
let description= "This is Automated Repository";
let USERS="jasbir";
let NoOfUsers=50;
let ToExplore="Trending";
//Search User Command and Follow ==>> node script.js credentials.json rishiar4

(async function () {
    try {
        let data = await fs.promises.readFile(credentialsFile, "utf-8");
        // let data2 = await fs.promises.readFile(fileDetails, "utf-8");

        let credentials = JSON.parse(data);
        // let repoData = JSON.parse(data2);
        
        let url = credentials.url;
        let email = credentials.email;
        let pwd = credentials.pwd;
        // let RepoName = repoData.repo_name;
        // let Description = repoData.description;


        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized", "--icognito", "--disable-notifications"]
        });

        let numberOfPages = await browser.pages();
        let tab = numberOfPages[0];

        await tab.goto(url, {
            waitUntil: "networkidle2"
        });

        

        await tab.waitForSelector("input[autocomplete='username']");
        await tab.type("input[autocomplete='username']", email, { delay: 200 });

        await tab.waitForSelector("input[autocomplete='current-password']");
        await tab.type("input[autocomplete='current-password']", pwd, { delay: 200 });

        await tab.waitForSelector(".btn.btn-primary.btn-block");
        await tab.click(".btn.btn-primary.btn-block");

        
        await tab.waitForSelector(".form-control.input-sm.header-search-input.jump-to-field.js-jump-to-field.js-site-search-focus");
        let cUrl = await tab.url();
        console.log(cUrl);

        let newPUrl = cUrl + 'new';

        await tab.goto(newPUrl, { waitUntil: "networkidle2" });

        console.log(newPUrl);


// Create Repo

        await tab.waitForSelector(".form-control.js-repo-name.js-repo-name-auto-check.short");
        await tab.type(".form-control.js-repo-name.js-repo-name-auto-check.short",repo_name );

        await tab.waitForSelector(".form-control.long");
        await tab.type(".form-control.long",description);

        await tab.waitForSelector('#repository_auto_init');
        await tab.click('#repository_auto_init');

        await tab.waitForSelector('button.btn.btn-primary.first-in-line');
        await tab.click('button.btn.btn-primary.first-in-line');
        
        await tab.waitFor(200);
   
// edit profile=>

        let Plink="https://github.com/dhfofiafoijaoi";
        await tab.goto(Plink, {
            waitUntil: "networkidle2"
        });


        await tab.waitForSelector("button.btn.btn-block.mt-2.mb-3.js-profile-editable-edit-button",{visible:true});
        await tab.click("button.btn.btn-block.mt-2.mb-3.js-profile-editable-edit-button");
        
        await tab.waitForSelector("textarea[name='user[profile_bio]']");
        await tab.click("textarea[name='user[profile_bio]']");
        await tab.type("textarea[name='user[profile_bio]']","Music Lover")

        await tab.waitForSelector("input[name='user[profile_company]'] ");
        await tab.click("input[name='user[profile_company]'] ");
        await tab.type("input[name='user[profile_company]'] ","PEPCODING")

        await tab.waitForSelector("input[name='user[profile_location]']");
        await tab.click("input[name='user[profile_location]'] ");
        await tab.type("input[name='user[profile_location]']","DELHi")

        await tab.waitForSelector("input[name='user[profile_blog]']");
        await tab.click("input[name='user[profile_blog]'] ");
        await tab.type("input[name='user[profile_blog]']","www.google.com");

        await tab.waitForSelector("input[name='user[profile_blog]']");
        await tab.click("input[name='user[profile_blog]'] ");
        await tab.type("input[name='user[profile_blog]']","www.google.com");

        await tab.waitForSelector("input[name='user[profile_twitter_username]']");
        await tab.click("input[name='user[profile_twitter_username]']");
        await tab.type("input[name='user[profile_twitter_username]']","NOOOOO");

        await tab.waitForSelector("div.my-3 button[type='submit']");
        await navigationHelper(tab,"div.my-3 button[type='submit']");

      
// to follow
        // await tab.goto(cUrl, {
        //     waitUntil: "networkidle2"
        // });

        await tab.waitForSelector("input[aria-label='Search or jump to…']");
        await tab.click("input[aria-label='Search or jump to…']");
        await tab.type("input[aria-label='Search or jump to…']",USERS)
        await tab.keyboard.press('Enter');
        
        await tab.waitFor(200);

        await tab.waitForSelector("nav.menu.border.d-none.d-md-block a.menu-item");
        let Arr= await tab.$$("nav.menu.border.d-none.d-md-block a.menu-item");
        console.log(Arr.length);
        await Arr[9].click();
        
      
                                           
            await tab.waitForSelector("div.user-list-item.py-4.d-flex.hx_hit-user input[value='Follow']");
            let arr= await tab.$$("div.user-list-item.py-4.d-flex.hx_hit-user input[value='Follow']");
            console.log(arr.length);

            for(let i=0;i<arr.length;i++){
             await arr[i].click();
             console.log( i+1  + "followed");
             await tab.waitFor(2000);
            }
            await navigationHelper(tab,"a.next_page");
            await tab.waitFor(2000);
      
// to explore =>

       await tab.waitForSelector("a[data-selected-links='/explore /trending /trending/developers /integrations /integrations/feature/code /integrations/feature/collaborate /integrations/feature/ship showcases showcases_search showcases_landing /explore']");
       await tab.click("a[data-selected-links='/explore /trending /trending/developers /integrations /integrations/feature/code /integrations/feature/collaborate /integrations/feature/ship showcases showcases_search showcases_landing /explore']");
    
       await tab.waitForSelector("div.d-flex.flex-wrap.flex-items-center.flex-justify-center.flex-md-justify-start.text-center.text-md-left a");
       let menu = await tab.$$("div.d-flex.flex-wrap.flex-items-center.flex-justify-center.flex-md-justify-start.text-center.text-md-left a");
       await menu[2].click();
      
      await tab.waitForSelector("form.unstarred.js-social-form button[aria-label='Unstar this repository']");
      let tot= await tab.$$("form.unstarred.js-social-form button[aria-label='Unstar this repository']");
     console.log(tot.length)
      for(let i=0;i<tot.length;i++){
         
              await tot[i].click();
              console.log(i +1 + "star")
              await tab.waitFor(200);

      }

    }
    catch (err) {
        console.log(err.message);
    }
})();
async function navigationHelper(tab, selector) {
    await Promise.all([tab.waitForNavigation({
        waitUntil: "networkidle2"
    }), tab.click(selector)]);
}

