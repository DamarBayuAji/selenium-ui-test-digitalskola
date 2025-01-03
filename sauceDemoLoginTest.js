const { Builder, By, Key, Until, until } = require('selenium-webdriver');
const assert = require('assert');
const { time } = require('console');

async function sauceDemoLoginTest(){
    let driver = await new Builder().forBrowser('chrome').build();

    try{
        await driver.get('https://www.saucedemo.com');

        // Masukkan Username dan Password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');
        
        // Click Button Login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        // Memastikan kita di dashboard dengan mencari judul "Swag Labs"
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");

        // Memastikan kita di dashboard dengan mencari "Burger Button"
        let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
        assert.strictEqual(await menuButton.isDisplayed(), true, "Menu Button is not visible");

        // Add item to cart
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();

        // Memastikan item sukses ditambahkan ke cart
        let iconCart = await driver.findElement(By.className("shopping_cart_link"));
        assert.strictEqual(await iconCart.isDisplayed(), true, "Logo Cart is not visible");
        
         
    } finally {
        await driver.quit();
    }
}

sauceDemoLoginTest();