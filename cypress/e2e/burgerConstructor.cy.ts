import { selectors } from "../support/constants";
const url = 'http://localhost:4000';

describe('тест на успешное добавление ингридиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit(url);
  });

  it('тест на добавление ингридиентов', () => {
    cy.get(selectors.bun).contains('Добавить').click();
    cy.get(selectors.burgerMain).contains('Добавить').click();
    cy.get(selectors.sauce).contains('Добавить').click();
    cy.get(selectors.burgerConstructor).contains('Краторная булка N-200i').should('exist');
    cy.get(selectors.burgerConstructor).contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.get(selectors.burgerConstructor).contains('Соус Spicy-X').should('exist');
  });
});


describe('тесты работы модального окна ингридиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit(url);
  });

  it('тест открытия модального окна', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click({ force: true });
    cy.get(selectors.modal).should('be.visible');
    cy.get(selectors.modal).contains('Детали ингридиента').should('be.visible');
    cy.get(selectors.modal).contains('Биокотлета из марсианской Магнолии').should('be.visible');
  });

  it('тест закрытия модального окна по кнопке крестика', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click({ force: true });
    cy.get(selectors.modal).should('be.visible');
    cy.get(selectors.modal).contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.get(selectors.modalClose).click({ force: true });
  });

  it('тест закрытия модального окна по нажатию на оверлей', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click({ force: true });
    cy.get(selectors.modal).should('be.visible');
    cy.get(selectors.modal).contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.get(selectors.modalCloseOverlay).click({ force: true });
  });
});


describe('тесты создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

    window.localStorage.setItem('refreshToken', 'mockRefreshToken');
    cy.setCookie('accessToken', 'mockAccessToken');
    cy.viewport(1300, 800);
    cy.visit(url);
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearCookies();
  });

  it('тест на оформление заказа', () => {
    //собираем бургер
    cy.get(selectors.bun).contains('Добавить').click();
    cy.get(selectors.burgerMain).contains('Добавить').click();
    cy.get(selectors.sauce).contains('Добавить').click();
    
    //жмем кнопку Оформить заказ и сверяем его номер
    cy.get(selectors.orderButton).click();
    cy.get(selectors.orderNumber).contains('200').should('exist');

    cy.get(selectors.modalClose).click({force: true});
  })
})

