import { hasPageConfig, hasIGConfig } from '../common/validations';
import { getAppConfig } from '../../utils/config';
import { abbreviateNumber } from '../../utils/strings';
import config_file_errors from '../../constants/config-file-errors.json';
import reelsInsights from '../../constants/reels-insights.json';

const testAggregateByProperty = (metric, reelId) => {
    const values = metric.values[0].value;
    cy.get(`#${reelId} #chart-${metric.name}`).should(($card) => {
        expect($card.find('.comment .metric-value')).to.contain(abbreviateNumber(values.COMMENT));
        expect($card.find('.share .metric-value')).to.contain(abbreviateNumber(values.SHARE));
    })
}

const testSingleNumber = (metric, reelId) => {
    let lastElement = metric.values.slice(-1);
    cy.get(`#${reelId} #chart-${metric.name} .metric-value`).should(($p) => {
        expect($p).to.contain(abbreviateNumber(lastElement[0].value))
    })
}

const testDoubleNumberMetric = (metric, reelId) => {
    let lastElement = metric.values.slice(-1);
    cy.get(`#${reelId} .metric-value-${metric.name}`).should(($p) => {
        expect($p).to.contain(abbreviateNumber(lastElement[0].value))
    })
}

describe('Reels Insights', () => {
  it('should have metrics to the charts', () => {

    const metrics = new Map([
        ['post_video_social_actions', testAggregateByProperty],
        ['blue_reels_play_count', testSingleNumber],
        ['post_video_view_time', testDoubleNumberMetric],
        ['post_video_avg_time_watched', testDoubleNumberMetric]
    ]);

    cy.visitLocal();

    cy.get('#reels-tab').click();

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
