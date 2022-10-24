import { v4 as uuidv4 } from 'uuid';

const title = uuidv4();

describe('new post', () => {
  it('user can publish new post', () => {
    cy.visit('/');
    
    // click on Post link
    cy.findByRole('link', {  name: /post/i}).click()

    // Fill Title and Body
    const body = uuidv4();
    cy.findByRole('textbox', {  name: /title/i}).type(title)
    cy.findByRole('textbox', {  name: /body/i}).type(body)

    // Submit
    cy.findByRole('button').click()

    // Verify if post was made
    cy.findByText(title).should('be.visible');

    // Open the post
    cy.findByText(title).click();

    // Verify the post body
    cy.findByText(body).should('be.visible');

  })
})

describe('edit post', () => {
  it('user can edit a post', () => {
    cy.visit('/');
    
    // click on the post title
    cy.findByText(title).click();

    // click on EDIT button
    cy.findByRole('button', { name: /edit post/i}).click();

    // Fill Title and Body
    const newBody = uuidv4();
    cy.findByRole('textbox', {  name: /body/i}).clear();
    cy.findByRole('textbox', {  name: /body/i}).type(newBody)

    // Submit
    cy.findByRole('button').click()

    // Open the post
    cy.findByText(title).click();

    // Verify the post body
    cy.findByText(newBody).should('be.visible');

  })
})


describe('delete post', () => {
  it('user can delete a post', () => {
    cy.visit('/');
    
    // click on the post title
    cy.findByText(title).click();

    // click on delete button
    cy.findByRole('button', { name: /delete post/i}).click();

    // verify if post is not in feed anymore
    cy.findByText(title).should('not.exist');
  })
})