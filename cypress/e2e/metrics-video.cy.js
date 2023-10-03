import { hasPageConfig, hasIGConfig, testDoubleNumberMetric, testValueType } from '../common/validations';
import { abbreviateNumber } from '../../utils/strings';
import videoInsights from '../../constants/video-insights.json';

const testVideoViewsByDistributionType = (metric, videoId) => {
    const values = metric.values[0].value;
    cy.get(`#${videoId} #chart-${metric.name}`).should(($card) => {
        expect($card.find('.page_owned .metric-value')).to.contain(abbreviateNumber(values.page_owned));
        expect($card.find('.shared .metric-value')).to.contain(abbreviateNumber(values.shared));
    })
}

const testValueTypeIsNumber = (metric) => {
  testValueType(metric, 'number');
}

const testValueTypeIsObject = (metric) => {
  testValueType(metric, 'object');
}


describe('Video Insights', () => {
  it('should have metrics to the charts', () => {

    const metrics = new Map([
        ['total_video_views_by_distribution_type', testVideoViewsByDistributionType],
        ['total_video_view_total_time', testDoubleNumberMetric],
        ['total_video_avg_time_watched', testDoubleNumberMetric],
        ['total_video_impressions', testDoubleNumberMetric],
        ['total_video_impressions_unique', testDoubleNumberMetric],
        ['total_video_views', testValueTypeIsNumber],
        ['total_video_views_organic', testValueTypeIsNumber],
        ['total_video_views_unique', testValueTypeIsNumber],
        ['total_video_complete_views', testValueTypeIsNumber],
        ['total_video_reactions_by_type_total', testValueTypeIsObject],
    ]);

    cy.visitLocal();

    cy.get('#video-tab').click();

    cy.wait(2000);

    if (hasPageConfig()) {
      cy.get("#video").then($el => {
        if ($el.find('.section').length > 0) {
          cy.window().should('have.property', 'store');
          cy.window().its('store')
            .invoke('getState')
            .then((state) => {
              const videosInsightsData = state.videoInsights;
              expect(videosInsightsData).to.be.a('array').and.not.to.be.empty;

              const videoInsightsData = videosInsightsData[0];
              expect(videoInsightsData.insights).to.be.a('array').and.not.to.be.empty;

              videoInsightsData.insights.forEach(metric => {
                expect(metric.name).to.be.oneOf(videoInsights.metrics);
                expect(metric.values).to.be.a('array').and.not.to.be.empty;

                const testFn = metrics.get(metric.name);
                testFn(metric, videoInsightsData.id);

              });
            })
        }
      });
    }
  })
})
