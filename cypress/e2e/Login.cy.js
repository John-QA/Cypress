import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/default_data.json"
describe('Проверка авторизации', function () {
    
    beforeEach('Начало теста', function () {
        cy.visit('/');
    })

    afterEach('Наличие и видимость "крестика"', function(){
        cy.get(result_page.exit).should('be.visible');//есть крестик и он виден пользователю 
    })

    it('Верный пароль и верный логин', function () {
         cy.get(main_page.email).type(data.login);//Ввод верного логина
         cy.get(main_page.password).type(data.password);//Ввод верного пароля 
         cy.get(main_page.authoriz_button).click();//Нажатие на кнопку войти
         cy.get(result_page.text).contains('Авторизация прошла успешно').should('be.visible');//ответ содержит текст и виден пользователю
    }) 
    
    it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();//Нажатие на кнопку "Забыли пароль"
        cy.get(recovery_password_page.email).type(data.login);//Ввод почты
        cy.get(recovery_password_page.send_button).click();//Нажатие на "Отправить код"
        cy.get(result_page.text).contains('Успешно отправили пароль на e-mail').should('be.visible');//ответ содержит текст и виден пользователю
    })
    
    it('Не верный логин и верный пароль', function () {
        cy.get(main_page.email).type(data.login);//Ввод верного логина //user_login
        cy.get(main_page.password).type('123');//Ввод не верного пароля  user_password
        cy.get(main_page.authoriz_button).click();//Нажатие на кнопку войти
        cy.get(result_page.text).contains('Такого логина или пароля нет').should('be.visible');//ответ содержит текст и виден пользователю
    })
    
    it('Верный логин и не верный пароль', function () {
        cy.get(main_page.email).type('german@dnikov.ru');//Ввод не верного логина
        cy.get(main_page.password).type(data.password);//Ввод верного пароля 
        cy.get(main_page.authoriz_button).click();//Нажатие на кнопку войти
        cy.get(result_page.text).contains('Такого логина или пароля нет').should('be.visible');//ответ содержит текст и виден пользователю
    })

    it('Ошибка валидации логина', function () {
        cy.get(main_page.email).type('germandolnikov.ru');//Ввод логина без "@"
        cy.get(main_page.password).type(data.password);//Ввод верного пароля 
        cy.get(main_page.authoriz_button).click();//Нажатие на кнопку войти
        cy.get(result_page.text).contains('Нужно исправить проблему валидации').should('be.visible');//ответ содержит текст и виден пользователю
    })

    it('Приведение регистра', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');//Ввод логина с заглавными 
        cy.get(main_page.password).type(data.password);//Ввод верного пароля 
        cy.get(main_page.authoriz_button).click();//Нажатие на кнопку войти
        cy.get(result_page.text).contains('Авторизация прошла успешно').should('be.visible');//ответ содержит текст и виден пользователю
    })

})
 