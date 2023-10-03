import { hasPageConfig, testDoubleNumberMetric, testSingleNumber } from '../common/validations';
import { abbreviateNumber } from '../../utils/strings';
import reelsInsights from '../../constants/reels-insights.json';

const testVideoSocialActions = (metric, reelId) => {
    const values = metric.values[0].value;
    cy.get(`#${reelId} #chart-${metric.name}`).should(($card) => {
        expect($card.find('.comment .metric-value')).to.contain(abbreviateNumber(values.COMMENT));
        expect($card.find('.share .metric-value')).to.contain(abbreviateNumber(values.SHARE));
    })
}

describe('Reels Insights', () => {
  it('should have metrics to the charts', () => {

    const metrics = new Map([
        ['post_video_social_actions', testVideoSocialActions],
        ['blue_reels_play_count', testSingleNumber],
        ['post_video_view_time', testDoubleNumberMetric],
        ['post_video_avg_time_watched', testDoubleNumberMetric]
    ]);

    cy.visitLocal();

    cy.get('#reels-tab').click();

    cy.wait(2000);

    if (hasPageConfig()) {
      cy.get("#reels").then($el => {
        if ($el.find('.section').length > 0) {
          cy.window().should('have.property', 'store');
          cy.window().its('store')
            .invoke('getState')
            .then((state) => {
              const reelsInsightsData = state.reelsInsights;
              expect(reelsInsightsData).to.be.a('array').and.not.to.be.empty;

              const reelInsightsData = reelsInsightsData[0];
              expect(reelInsightsData.insights).to.be.a('array').and.not.to.be.empty;

              reelInsightsData.insights.forEach(metric => {
                expect(metric.name).to.be.oneOf(reelsInsights.metrics);
                expect(metric.values).to.be.a('array').and.not.to.be.empty;

                if (metrics.has(metric.name)) {
                    const testFn = metrics.get(metric.name);
                    testFn(metric, reelInsightsData.id);
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
