*Sample Code* ALL FEATURES for REACT CODE SAMPLE (TradingViewWidget.jsx)

// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BINANCE:BTCUSD",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "backgroundColor": "rgba(101, 101, 101, 1)",
          "withdateranges": true,
          "range": "5D",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "watchlist": [
            "BINANCE:BTCUSDT",
            "BINANCE:SOLUSDT",
            "BINANCE:PEPEUSDT",
            "OANDA:XAUUSD",
            "BINANCE:XRPUSDT",
            "NASDAQ:MSTR",
            "NASDAQ:NVDA",
            "NASDAQ:MARA",
            "CRYPTOCAP:TOTAL3"
          ],
          "details": true,
          "hotlist": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
    </div>
  );
}

export default memo(TradingViewWidget);