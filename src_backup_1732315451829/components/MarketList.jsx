import React from 'react';
import { View, Platform } from 'react-native';

const MarketList = () => {
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        "colorTheme": "dark",
        "dateRange": "12M",
        "showChart": true,
        "locale": "en",
        "largeChartUrl": "",
        "isTransparent": true,
        "showSymbolLogo": true,
        "width": "100%",
        "height": "400",
        "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
        "plotLineColorFalling": "rgba(41, 98, 255, 1)",
        "gridLineColor": "rgba(240, 243, 250, 0)",
        "scaleFontColor": "rgba(120, 123, 134, 1)",
        "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
        "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
        "tabs": [
          {
            "title": "Crypto 1-50",
            "symbols": [
              {
                "s": "BINANCE:BTCUSDT",
                "d": "Bitcoin"
              },
              {
                "s": "BINANCE:ETHUSDT",
                "d": "Ethereum"
              },
              {
                "s": "BINANCE:BNBUSDT",
                "d": "BNB"
              },
              {
                "s": "BINANCE:SOLUSDT",
                "d": "Solana"
              },
              {
                "s": "BINANCE:XRPUSDT",
                "d": "XRP"
              }
            ]
          },
          {
            "title": "Crypto 51-100",
            "symbols": [
              {
                "s": "BINANCE:ICPUSDT",
                "d": "Internet Computer"
              },
              {
                "s": "BINANCE:RUNEUSDT",
                "d": "THORChain"
              },
              {
                "s": "BINANCE:MKRUSDT",
                "d": "Maker"
              }
            ]
          }
        ]
      });

      const container = document.getElementById('market-overview-widget');
      if (container) {
        container.appendChild(script);
      }

      return () => {
        if (container && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <View style={{
      width: '100%',
      backgroundColor: 'rgba(30, 35, 41, 0.5)',
      borderRadius: 8,
      overflow: 'hidden',
      marginVertical: 16,
    }}>
      <div id="market-overview-widget" style={{ height: 400 }}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </View>
  );
};

export default MarketList;