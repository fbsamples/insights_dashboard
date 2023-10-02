export default {
    // Facebook Graph API
    domain: process.env.GRAPH_API_URL,

    // Account information
    page_id: process.env.PAGE_ID,
    page_access_token: process.env.PAGE_ACCESS_TOKEN,
    ad_account_id: process.env.AD_ACCOUNT_ID,
    user_access_token: process.env.USER_ACCESS_TOKEN,
    ig_user_id: process.env.IG_USER_ID,
    ig_access_token: process.env.IG_USER_ACCESS_TOKEN,
    waba_id: process.env.WABA_ID,
    template_id: process.env.TEMPLATE_ID,
    mm_access_token: process.env.MM_ACCESS_TOKEN,

    // URL where you host this code
    backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,

    // Settings
    videoLimit: 10,
    pieChart: {
        radius: 100,
        maintainAspecRatio: false,
        responsive: false,
        resizeDelay: 3,
        plugins: {
            legend: {
                position: 'right'
            }
        }
    },
    barChart: {
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
}
