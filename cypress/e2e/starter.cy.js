import { hasPageConfig, hasIGConfig } from '../common/validations';
import config_file_errors from '../../constants/config-file-errors.json';
import pageInsights from '../../constants/page-insights.json';


describe('Configuration', () => {
  it('should handle page and video config', () => {
    cy.visitLocal();
    if (hasPageConfig()) {
      cy.get('#page-tab').should('exist');
      cy.get('#page .documentation').contains(pageInsights.docs.description);
      cy.get("#page").then($el => {
        if ($el.find('.section').length > 0) {
          cy.get(".section-header h1").should('exist');
          cy.get(".section-body > div")
            .children().its('length')
            .should('be.gt', 0);
        } else {
          cy.get(".error-card .title").contains(config_file_errors.api.title)
        }
      });
    }
    else {
      cy.get('h1').contains(config_file_errors.header.title)
      cy.get('#error-page_id').should('exist');
      cy.get('#error-page_access_token').should('exist');
    }
  })

  it('should handle instagram config', () => {
    cy.visitLocal();
    if (hasPageConfig()) {
      cy.get('#ig-tab').should('exist');
      cy.get('#ig-tab').click();
      cy.wait(2000)
      if (hasIGConfig()) {
        cy.get('#ig .documentation').contains(pageInsights.docs.description);
        cy.get("#ig").then($el => {
          if ($el.find('.section').length > 0) {
            cy.get(".section-header h1").should('exist');
            cy.get(".section-body > div")
              .children().its('length')
              .should('be.gt', 0);
          } else {
            cy.get(".error-card .title").contains(config_file_errors.api.title)
          }
        });
      }
      else {
        cy.get('h1').contains(config_file_errors.header.title)
        cy.get('#error-ig_user_id').should('exist');
        cy.get('#error-ig_access_token').should('exist');
      }
    }
  })
})
