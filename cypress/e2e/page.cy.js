import { getAppConfig } from '../../utils/config';
import config_file_errors from '../../constants/config-file-errors.json';
import pageInsights from '../../constants/page-insights.json';


describe('Page', () => {
  it('should handle page and video config', () => {
    cy.visitLocal();
    cy.window().should('have.property', 'store');
    cy.window().its('store')
      .invoke('getState')
      .then((state) => {
        expect(state.pageInsights).to.be.a('array').and.not.to.be.empty;

      })
  })
})
