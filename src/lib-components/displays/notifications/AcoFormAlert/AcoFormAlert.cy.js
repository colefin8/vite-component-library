import AcoFormAlert from './AcoFormAlert.vue'
import { _optionsStatus } from '../../../../propTypes'

const testComponent = {
  name: 'test-component',
  template: '<span>Content</span>'
}

describe('aco-form-alert', () => {
  const slots = { default: testComponent };

  it('displays correctly with danger status', () => {
    const component = cy.mount(AcoFormAlert, {slots, propsData: {status: _optionsStatus.DANGER}}).get('[data-qa=form-alert-text]')
    component.should('have.class', 'aco-status-text-danger')
    cy.compareSnapshot('aco-form-alert-danger')
  })

  it('displays correctly with warning status', () => {
    const component = cy.mount(AcoFormAlert, {slots, propsData: {status: _optionsStatus.WARNING}}).get('[data-qa=form-alert-text]')

    component.should('have.class', 'aco-status-text-warning')
    cy.compareSnapshot('aco-form-alert-warning')
  })

  it('displays correctly with positive status', () => {
    const component = cy.mount(AcoFormAlert, {slots, propsData: {status: _optionsStatus.POSITIVE}}).get('[data-qa=form-alert-text]')
    
    component.should('have.class', 'aco-status-text-positive')
    cy.compareSnapshot('aco-form-alert-positive')
  })

  it('displays correctly with neutral status', () => {
    const component = cy.mount(AcoFormAlert, {slots, propsData: {status: _optionsStatus.NEUTRAL}}).get('[data-qa=form-alert-text]')

    component.should('have.class', 'aco-status-text-neutral')
    cy.compareSnapshot('aco-form-alert-neutral')
  })

})