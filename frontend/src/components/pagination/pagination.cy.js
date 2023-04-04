// import { mount } from 'cypress'
import React from "react";
import Pagination from '../pagination/pagination'

describe('Pagination component', () => {
  it('displays correct number of pages', () => {
    cy.mount(<Pagination amount="10"></Pagination>)
    cy.get('[data-cy="pagination"]').should('have.length', 10)
    })

  })

  it('changes current page when page link is clicked', () => {
    cy.mount(<Pagination amount="10" handleClick={Math.ceil}></Pagination>)
    cy.get('[data-cy="pagination"]').eq(2).click()
    cy.get('button[data-cy="pagination"]').eq(2).should('include.class', 'active:bg-slate-600');
  })

  it('has the correct text and background colour', () => {
    cy.mount(<Pagination amount="10" handleClick={Math.ceil}></Pagination>)
    cy.get('[data-cy="pagination"]').eq(2).click()
    cy.get('button[data-cy="pagination"]').eq(2)
    .should('have.class', 'bg-orange-100')
    .should('have.class', 'text-gray-500')
  })



