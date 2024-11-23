import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

const MarketOverview = () => {
  useEffect(() => {
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
      "showFloatingTooltip": false,
      "width": "100%",
      "height": "100%",
      "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
      "plotLineColorFalling": "rgba(41, 98, 255, 1)",
      "gridLineColor": "rgba(42, 46, 57, 0)",
      "scaleFontColor": "rgba(120, 123, 134, 1)",
      "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
      "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
      "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
      "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
      "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
      "tabs": [
        {
          "title": "Indices",
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
            }
          ],
          "originalTitle": "Indices"
        }
      ]
    });
    document.querySelector('.tradingview-widget-container__widget').appendChild(script);

    return () => {
      if (document.querySelector('.tradingview-widget-container__widget')) {
        document.querySelector('.tradingview-widget-container__widget').innerHTML = '';
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <div className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 400,
    backgroundColor: 'rgba(22, 23, 29, 0.6)',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 16
  }
});

export default MarketOverview;
