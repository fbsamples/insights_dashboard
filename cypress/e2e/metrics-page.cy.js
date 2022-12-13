import { hasPageConfig, hasIGConfig } from '../common/validations';
import { getAppConfig } from '../../utils/config';
import { abbreviateNumber } from '../../utils/strings';
import config_file_errors from '../../constants/config-file-errors.json';
import pageInsights from '../../constants/page-insights.json';

describe('Page Insights', () => {
  it('should have metrics to the charts', () => {
    const summedMetrics = ['page_positive_feedback_by_type', 'page_fans'];
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
                    console.log(abbreviateNumber(like));
                    cy.get('#chart-page_positive_feedback_by_type').should(($card) => {
                      expect($card.find('.like .metric-value')).to.contain(abbreviateNumber(like));
                      expect($card.find('.comment .metric-value')).to.contain(abbreviateNumber(comment));
                      expect($card.find('.link .metric-value')).to.contain(abbreviateNumber(link));
                      expect($card.find('.other .metric-value')).to.contain(abbreviateNumber(other));
                    })
                    break;
                  default:
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
