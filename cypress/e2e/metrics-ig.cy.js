import { hasPageConfig } from '../common/validations';
import instagramProfileInsights from '../../constants/instagram-insights.json';
import instagramMediaInsights from '../../constants/instagram-media-insights.json';

const testIGMediaMetric = (metric, id) => {
    const value = metric.values[0].value;
    cy.get(`#${id} .ig-media-${metric.name}`).should(($card) => {
        expect($card.find('.metric-value')).to.contain(value);
    })
}

describe('Instagram Insights', () => {
  it('should have metrics to the charts', () => {
      const igMediaMetrics = new Map([
          ['engagement', testIGMediaMetric],
          ['impressions', testIGMediaMetric],
          ['reach', testIGMediaMetric]
      ]);

    cy.visitLocal();

    cy.get('#ig-tab').click();

    cy.wait(2000);

    if (hasPageConfig()) {
      cy.get("#ig").then($el => {
        if ($el.find('.section').length > 0) {
          cy.window().should('have.property', 'store');
          cy.window().its('store')
            .invoke('getState')
            .then((state) => {
              const igInsightsData = state.instagramInsights;
              expect(igInsightsData).to.be.a('array').and.not.to.be.empty;

              igInsightsData.forEach(metric => {
                expect(metric.name).to.be.oneOf(instagramProfileInsights.metrics);
                cy.get(`div[id*='${metric.name}']`).should('exist');
                metric.values.forEach(item => {
                  expect(item.value).to.be.a('number');
                })
              })

              const igMediaInsightsData = state.instagramMediaInsights;
              expect(igMediaInsightsData).to.be.a('array').and.not.to.be.empty;

              const mediaMetrics = igMediaInsightsData[0];
              expect(mediaMetrics.insights).to.be.a('array').and.not.to.be.empty;

              mediaMetrics.insights.forEach(metric => {
                expect(metric.name).to.be.oneOf(instagramMediaInsights.metrics);
                expect(metric.values).to.be.a('array').and.not.to.be.empty;
                if (igMediaMetrics.has(metric.name)) {
                    const testFn = igMediaMetrics.get(metric.name);
                    testFn(metric, mediaMetrics.id);
                } else {
                    metric.values.forEach(item => {
                      expect(item.value).to.be.a('object');
                    });
                }
              });
            })
        }
      });
    }
  })
})
