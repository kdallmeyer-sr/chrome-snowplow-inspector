declare const Snowplow: any;

/* global Snowplow:false */
const sp = Snowplow.getTrackerUrl('d.snowflake-analytics.com');
sp.setAppId('snowplow-chrome-extension');
sp.setPlatform('app');

const seenCollectors = {};

const trackerAnalytics = (collector, pageUrl, appId) => {
    collector = collector.toLowerCase();
    pageUrl = (new URL(pageUrl)).host.toLowerCase();
    appId = (appId || '').toLowerCase();

    const appKey = pageUrl + ':' + appId;

    if (!(collector in seenCollectors)) {
        seenCollectors[collector] = [];
    }

    if (!seenCollectors[collector].includes(appKey)) {
        seenCollectors[collector].push(appKey);

        chrome.storage.sync.get({ enableTracking: true }, (settings) => {
            if (settings.enableTracking) {
                sp.trackStructEvent('New Tracker', collector, pageUrl, appId);
            }
        });
    }
};

const repoAnalytics = (repo) => {
    if (repo !== 'http://iglucentral.com') {
        chrome.storage.sync.get({ enableTracking: true }, (settings) => {
            if (settings.enableTracking) {
                sp.trackStructEvent('Custom Repo', 'Loaded', repo);
            }
        });
    }
};

const landingUrl = 'https://www.snowflake-analytics.com/?' + [
    'utm_source=debugger%20extension',
    'utm_medium=software',
    'utm_campaign=Chrome%20extension%20debugger%20window%20top-left',
].join('&');

export = { trackerAnalytics, repoAnalytics, landingUrl };
