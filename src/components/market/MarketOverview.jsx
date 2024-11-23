import React, { useEffect } from 'react';
import { View } from 'react-native';

const MarketOverview = () => {
  useEffect(() => {
    const widgetConfig = {
      "symbols": [
        {
          "description": "Bitcoin",
          "proName": "BINANCE:BTCUSDT"
        },
        {
          "description": "BTC.D",
          "proName": "CRYPTOCAP:BTC.D"
        },
        {
          "description": "TOTAL3 (ex BTC/ETH)",
          "proName": "CRYPTOCAP:TOTAL3"
        },
        {
          "description": "USDT.D",
          "proName": "CRYPTOCAP:USDT.D"
        }
      ],
      "colorTheme": "dark",
      "isTransparent": true,
      "showSymbolLogo": true,
      "locale": "en",
      "hideideas": true,
      "hideDescription": false
    };

    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
    script.async = true;
    script.innerHTML = JSON.stringify(widgetConfig);
    
    // Add CSS to hide TradingView branding
    const style = document.createElement('style');
    style.textContent = `
      .tradingview-widget-copyright,
      .tv-embed-widget-wrapper__footer,
      div[class^="copyright"],
      a[href*="tradingview.com"] {
        display: none !important;
      }
      .tv-embed-widget-wrapper {
        background: transparent !important;
      }
    `;
    document.head.appendChild(style);
    
    const container = document.getElementById('tradingview-widget');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <View style={{
      width: '100%',
      paddingHorizontal: 50,
      marginBottom: 16,
      height: 72,
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
        height: '100%',
      }}>
        <div 
          id="tradingview-widget"
          style={{
            flex: 1,
            height: '100%',
            backgroundColor: 'rgba(30, 35, 41, 0.5)',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </View>
    </View>
  );
};

export default MarketOverview;