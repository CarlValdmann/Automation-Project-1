beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
*** Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    *** radio buttons and its content
    *** dropdown and dependencies between 2 dropdowns:
        *** list of cities changes depending on the choice of country
        *** if city is already chosen and country is updated, then city choice should be removed
    *** checkboxes, their content and links
    *** email format
 */


describe('Visual tests for registration form 3', () => {

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that the list of cities changes, when the coutry is changed.', () => {
        cy.get('#country').children().should('have.length', 4)

        cy.get('#country').find('option').eq(0).should('have.text', '')
        cy.get('#country').select('')
        cy.get('#city').find('option').eq(0).should('have.text', '')

        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').select('Spain')
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')

        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').select('Estonia')
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
        cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')

        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
        cy.get('#country').select('Austria')
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
        cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
        cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')
    })

    it('If already chosen, the city choice should be removed, after updating the country', () => {
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').select('Estonia')
        cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
        cy.get('#city').select('Tallinn')
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').select('Spain')
    })

    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 179)
            .and('be.greaterThan', 100)   
    })

    it('Checkboxes, their content and links', () => {
        
        cy.get('input[type="checkbox"]').should('have.length', 2)

        cy.get('div').nextUntil('#checkboxAlert').children().should('contain', 'Accept our privacy policy')
        cy.get('input[type="checkbox"]').next().eq(1).should('contain', 'Accept our cookie policy')
        
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')

        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')

        cy.get('input[type="checkbox"]').next().eq(1).children().should('have.attr', 'href', 'cookiePolicy.html').click()

        cy.go('back')
        cy.log('Back in registration form 3')

    })

    it('Check if the format for email is correct', () => {
        cy.get('.email').type('carljohann.valdmanngmail.com')
        cy.get('#emailAlert').should('be.visible')
        cy.get('.email').type('carljohann.valdmann@gmail.com')
        cy.get('#emailAlert').should('not.be.visible')
    })


   

})

/*
BONUS TASK: add functional tests for registration form 3
Task list:
*** Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})


describe('Functional tests for registration form 3', () => {
    
    it('Submitting with all the fields filled', () => {

    cy.get('#name').type('Carl')
    cy.get('.email').type('carljohann.valdmann@gmail.com')

    cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
    cy.get('#country').select('Estonia')
    
    cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
    cy.get('#city').select('Tallinn')

    cy.get(':nth-child(8) > input').type('2009-06-09')
    cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')

    cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    cy.get('input[type="radio"]').eq(1).should('not.be.checked')
    cy.get('input[type="radio"]').eq(2).should('not.be.checked')
    cy.get('input[type="radio"]').eq(3).should('not.be.checked')

    cy.get('input[type="radio"]').eq(1).check().should('be.checked')

    cy.get('#birthday').type('2001-06-09')
})

    })



