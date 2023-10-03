import config from '../../utils/config';
import { abbreviateNumber } from '../../utils/strings';

export const hasPageConfig = () => {
  return config['page_id'] && config['page_id'] !== null && config['page_id'].length > 0
  && config['page_access_token'] && config['page_access_token'] !== null && config['page_access_token'].length > 0;
}

export const hasIGConfig = () => {
  return config['ig_user_id'] && config['ig_user_id'] !== null && config['ig_user_id'].length > 0
  && config['ig_access_token'] && config['ig_access_token'] !== null && config['ig_access_token'].length > 0
}

export const testSingleNumber = (metric, id) => {
  let lastElement = metric.values.slice(-1);
  cy.get(`#${id} #chart-${metric.name} .metric-value`).should(($p) => {
      expect($p).to.contain(abbreviateNumber(lastElement[0].value))
  })
}


export const testDoubleNumberMetric = (metric, id) => {
  let lastElement = metric.values.slice(-1);
  cy.get(`#${id} .metric-value-${metric.name}`).should(($p) => {
      expect($p).to.contain(abbreviateNumber(lastElement[0].value))
  })
}

export const testValueType = (metric, type) => {
  metric.values.forEach(item => {
    expect(item.value).to.be.a(type);
  });
}
