import AcoModal from './AcoModal.vue'

const defaultComponent = {
    name: 'default-component',
    template: '<div>This is the main content</div>'
}

const headerComponent = {
    name: 'header-component',
    template: '<div>This is the header content</div>'
}

const footerComponent = {
    name: 'footer-component',
    template: '<div>This is the footer component</div>'
}

const slots = { default: defaultComponent, header: headerComponent, footer: footerComponent }

describe('aco-modal', () => {
    it('should be clickable', () => {
        const component = cy.mount(AcoModal, { slots, propsData: { value: true, width: '200px', height: '200px', title: 'Title', showXIcon: true,  }})
        component.get('[data-qa=]').click()
    })
})