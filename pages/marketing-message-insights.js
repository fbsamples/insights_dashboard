import { useSelector } from 'react-redux';

import * as AntDesignIcons from "react-icons/ai";
import ErrorCard from '../components/error-card';
import DocumentationLink from '../components/documentation-link';
import Section from '../components/section';
import SkeletonChart from '../components/skeleton-chart';

import { formatEpochTimeToDateString } from '../utils/date'
import { Line } from 'react-chartjs-2';

import marketingMessageInsights from '../constants/marketing-message-insights.json';

import styles from '../styles/style.module.css';

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Marketing Message Performance',
    },
  },
};

const MarketingMessageInsights = () => {
  const marketingMessageInsightsData = useSelector(state => state.marketingMessageInsights);
  const error = useSelector(state => state.error.marketingMessageInsights);
  const labels = marketingMessageInsightsData.map(data => formatEpochTimeToDateString(data.start));
  const data = {
    labels,
    datasets: [
      {
        label: 'Sent',
        data: marketingMessageInsightsData.map(data => data.sent),
        borderColor: 'rgb(160, 217, 247, 0.5)',
        backgroundColor: 'rgb(160, 217, 247, 0.5)',
      },
      {
        label: 'Delivered',
        data: marketingMessageInsightsData.map(data => data.delivered),
        borderColor: 'rgb(65, 155, 215)',
        backgroundColor: 'rgb(65, 155, 215, 0.5)',
      },
      {
        label: 'Read',
        data: marketingMessageInsightsData.map(data => data.read),
        borderColor: 'rgb(115, 50, 120)',
        backgroundColor: 'rgb(115, 50, 120, 0.5)',
      },
      {
        label: 'Link Clicked',
        data: marketingMessageInsightsData.map(data => (data.clicked && data.clicked.length > 0) ? data.clicked[0].count : 0),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  const totalSent = marketingMessageInsightsData.reduce((accumulator, current) => accumulator + current.sent, 0);
  const totalDelivered = marketingMessageInsightsData.reduce((accumulator, current) => accumulator + current.delivered, 0);
  const totalRead = marketingMessageInsightsData.reduce((accumulator, current) => accumulator + current.read, 0);
  const totalClicks = marketingMessageInsightsData.reduce((accumulator, current) => (current.clicked && current.clicked.length > 0) ? accumulator + current.clicked[0].count : accumulator, 0);
  const ctr = Math.round(totalClicks / totalRead * 100.0);

  return <div>
    <DocumentationLink
      description={marketingMessageInsights.docs.description}
      link={marketingMessageInsights.docs.link}
      linkLabel={marketingMessageInsights.docs.linkLabel} />
    {error
      ? <ErrorCard icon="AiFillWarning" error={error} />
      : marketingMessageInsights.sections.map(section => {
        return <Section title={section.title} key={section.title}>
          {<div className={styles.rowContainer}>
            {marketingMessageInsightsData.length === 0 && <SkeletonChart size={'big'} />}
            {marketingMessageInsightsData.length > 0 && <Line options={options} data={data} />}
            {marketingMessageInsightsData.length > 0 && <div> <p className={styles.metricContainer}>
              <span className={styles.icon}>{AntDesignIcons["AiOutlineSend"]()}</span>
              <span className="metric-value">{totalSent} Messages Sent</span>
              <span className={styles.icon}>{AntDesignIcons["AiOutlineDeliveredProcedure"]()}</span>
              <span className="metric-value">{totalDelivered} Messages Delivered</span>
              <span className={styles.icon}>{AntDesignIcons["AiOutlineRead"]()}</span>
              <span className="metric-value">{totalRead} Messages Read</span>
              <span className={styles.icon}>{AntDesignIcons["AiFillForward"]()}</span>
              <span className="metric-value">{ctr}% Click Through Rate</span>
            </p></div>}
          </div>
          }
        </Section>
      })
    }
  </div>;
}

export default MarketingMessageInsights;
