import * as data from "../helpers/default_data.json"

describe('EndToEnd Покупка аватара', function () {

    it('Покупка аватара', function () {
         cy.visit('https://pokemonbattle.ru/');//Переход на сайт
         cy.get(':nth-child(1) > .auth__input').type(data.pok_login);//Ввод верного логина
         cy.get('#password').type(data.pok_password);//Ввод верного пароля
         cy.get('button[type="submit"]').click();//Нажатие на кнопку войти
         cy.intercept('POST', 'https://api.pokemonbattle.ru/v2/technical_routes/auth_control').as('http-request');
         cy.wait('@http-request');//Ожидание ответа от API
         cy.get('.header__container > .header__id').click();//Переход в личный кабинет
         cy.intercept('POST', 'https://api.pokemonbattle.ru/v2/technical_routes/auth_control').as('http-request');
         cy.wait('@http-request');//Ожидание ответа от API
         cy.get('[href="/shop"]').click();//Переход на витрину аватаров
         cy.intercept('POST', 'https://api.pokemonbattle.ru/v2/technical_routes/auth_control').as('http-request');
         cy.wait('@http-request');//Ожидание ответа от API  
         cy.get('.shop__list')
         .find('.shop__item.available')   
         .first()
         .find('.shop__button')
         .click();//поиск первого доступного к покупке аватара и нажатие на кнопку "купить"
         cy.intercept('POST', 'https://api.pokemonbattle.ru/v2/technical_routes/auth_control').as('http-request');
         cy.wait('@http-request');//Ожидание ответа от API         
         cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type(data.test_card.number); //ввод номера карты
         cy.get(':nth-child(1) > .pay_base-input-v2').type(data.test_card.actual);//Ввод срока действия
         cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type(data.test_card.CVV);//Ввод СVV
         cy.get('.pay__input-box-last-of > .pay_base-input-v2').type(data.test_card.name);//Ввод имени владельца
         cy.get('.pay-btn').click();//нажать на "Оплатить"
         cy.intercept('POST', 'https://lavka.pokemonbattle.ru/luhn_check').as('http-request');
         cy.wait('@http-request');//оджидание ответ от микросервиса          
         cy.get('#cardnumber').type(data.test_card.secure);//Ввод СМС-кода
         cy.get('.payment__submit-button').click();//нажать на "Отправить"
         cy.intercept('POST', 'https://lavka.pokemonbattle.ru/payments').as('http-request');
         cy.wait('@http-request');//ожидание ответа от микросервиса 
         cy.get('.success__image').should('be.visible');//Провека символа успешной покупки.
         cy.get('.payment__font-for-success').contains('Покупка прошла успешно').should('be.visible');//Проверка сообщения о покуке на содержание и видимость
     })
 }) 
 