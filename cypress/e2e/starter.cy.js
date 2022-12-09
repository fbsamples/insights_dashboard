import { getAppConfig } from '../../utils/config';
import config_file_errors from '../../constants/config-file-errors.json';
import pageInsights from '../../constants/page-insights.json';


describe('Navigation', () => {
  it('should handle page and video config', () => {
    const config = getAppConfig();
    cy.visitLocal();
    if (config['page_id'] && config['page_id'] !== null && config['page_id'].length > 0
      && config['page_access_token'] && config['page_access_token'] !== null && config['page_access_token'].length > 0
    ) {
      cy.get('#page-tab').should('exist');
      cy.get('#page #documentation').contains(pageInsights.docs.description);
    }
    else {
      cy.get('h1').contains(config_file_errors.header.title)
      cy.get('#error-page_id').should('exist');
      cy.get('#error-page_access_token').should('exist');
    }
  })

  it('should handle instagram config', () => {
    const config = getAppConfig();
    cy.visitLocal();
    if (
      config['page_id'] && config['page_id'] !== null && config['page_id'].length > 0
      && config['page_access_token'] && config['page_access_token'] !== null && config['page_access_token'].length > 0
    ) {
      if (
        config['ig_user_id'] && config['ig_user_id'] !== null && config['ig_user_id'].length > 0
        && config['ig_access_token'] && config['ig_access_token'] !== null && config['ig_access_token'].length > 0
      ) {
        cy.get('#ig-tab').should('exist');
        cy.get('#ig-tab').click();
        cy.wait(2000)
        cy.get('#ig #documentation').contains(pageInsights.docs.description);
      }
      else {
        cy.get('h1').contains(config_file_errors.header.title)
        cy.get('#error-ig_user_id').should('exist');
        cy.get('#error-ig_access_token').should('exist');
      }
    }
  })
})
