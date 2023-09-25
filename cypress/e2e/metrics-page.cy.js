import { hasPageConfig } from '../common/validations';
import { abbreviateNumber } from '../../utils/strings';
import pageInsights from '../../constants/page-insights.json';

describe('Page Insights', () => {
  it('should have metrics to the charts', () => {
    cy.visitLocal();
    if (hasPageConfig()) {
      cy.get("#page").then($el => {
        if ($el.find('.section').length > 0) {
          cy.window().should('have.property', 'store');
          cy.window().its('store')
            .invoke('getState')
            .then((state) => {
              const insights = state.pageInsights;
              expect(insights).to.be.a('array').and.not.to.be.empty;
              insights.forEach(metric => {
                expect(metric.name).to.be.oneOf(pageInsights.metrics);
                expect(metric.values).to.be.a('array').and.not.to.be.empty;
                switch(metric.name) {
                  case 'page_fans':
                    let lastElement = metric.values.slice(-1);
                    cy.get('#chart-page_fans .metric-value').should(($p) => {
                      expect($p).to.contain(abbreviateNumber(lastElement[0].value))
                    })
                    break;
                  case 'page_positive_feedback_by_type':
                    let comment = 0;
                    let like = 0;
                    let link = 0;
                    let other = 0;
                    metric.values.forEach(item => {
                      comment += item.value.comment;
                      like += item.value.like;
                      link += item.value.link;
                      other += item.value.other;
                    })
                    cy.get('#chart-page_positive_feedback_by_type').should(($card) => {
                      expect($card.find('.like .metric-value')).to.contain(abbreviateNumber(like));
                      expect($card.find('.comment .metric-value')).to.contain(abbreviateNumber(comment));
                      expect($card.find('.link .metric-value')).to.contain(abbreviateNumber(link));
                      expect($card.find('.other .metric-value')).to.contain(abbreviateNumber(other));
                    })
                    break;
                  default:
                    cy.get(`div[id*='${metric.name}']`).should('exist');
                    metric.values.forEach(item => {
                      expect(item.value).to.be.a('number');
                    })
                }
              });

            })
        }
      });
    }
  })
})
