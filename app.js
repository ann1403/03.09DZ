const fse = require('fs-extra');
const axios = require('axios');
const puppeteer = require('puppeteer');
const file = './text.txt';

(async function() {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        for (let i = 0; i < 5; i++) {
            await page.goto('http://www.work.ua/jobs-kyiv-it/?advs=1');

            await page.waitForSelector('.container')
            const conten = await page.$$('.container')

            const con = conten[i];
            await page.waitForSelector('.card card-hover card-visited wordwrap job-link js-hot-block')
            const divs = await con.$$('.card card-hover card-visited wordwrap job-link js-hot-block')

            for (const div of divs) {
                // const names = await divs.$$('a');
                await page.waitForSelector('.add-bottom-sm')
                const h2s = await page.$$('.add-bottom-sm > h2')
                for (const h2 of h2s) {
                    const name = await h2.$eval('a', (a) => { return a.innerText })
                    console.log('name', name)
                }
            }
        }
        console.log('It`s showing')
            // console.log(divs.length)
            // console.log(divs)
        fse.outputFile(file, divs)
            .then(() => fse.readFile(file, 'utf8'))
            .then(data => {
                return data // => hello!
            })
            .catch(err => {
                console.error(err)
            });
    } catch (e) {
        console.log('Our error', e)
    }



})()