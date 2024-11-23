let tvScriptLoadingPromise = null;

export const loadTradingViewScript = () => {
  if (!tvScriptLoadingPromise) {
    tvScriptLoadingPromise = new Promise((resolve) => {
      const script = document.createElement('script');
      script.id = 'tradingview-widget-loading-script';
      script.src = 'https://s3.tradingview.com/tv.js';
      script.type = 'text/javascript';
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }
  return tvScriptLoadingPromise;
};

export const loadMarketOverviewScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = resolve;
    document.head.appendChild(script);
  });
};

export const loadTickerScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = resolve;
    document.head.appendChild(script);
  });
};
