const puppeteer = require("puppeteer");
const user_ID = '180743918'; // ID пользователя

async function spam(url) {
    // Загрузка сайта и проверка
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    // await page.setViewport({
    //     width: 1280,
    //     height: 720,
    //     deviceScaleFactor: 1,
    //   });
    await page.goto(url).then(()=>{
        console.log("it works\n");
        console.log(page.on('load') + "\n");
    });

    // Вход в аккаунт
    const inp_login = await page.$("#index_email");
    await inp_login.type("+21697829610");
    const inp_pass = await page.$("#index_pass");
    await inp_pass.type("nehJ8yfmSmcPhE");
    await page.keyboard.press("Enter");

    // Мессенджер
    await page.waitForSelector('#l_msg', {visible: true});
    const target = await page.$('#l_msg', {visible: true});
    await target.click().then(()=>{
        console.log('Clicked to the messages');
    }).catch((err)=>{
        console.log('ERRRRRRROR:' + err);
    });
    
    // Переписка и ввод
    await page.goto(url+"im?sel="+user_ID);
    for(let i = 0; i < 100; ++i) {
        await page.type('#im_editable' + user_ID, 'дай похавать' ,{delay: 100});
        await page.keyboard.press("Enter");
        if(i % 20 == 0 && i != 0) {
            await new Promise(r => setTimeout(r, 17000));
        }
    }
}

spam("https://vk.com/").then(()=>{
    browser.close();
})