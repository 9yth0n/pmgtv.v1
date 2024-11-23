import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

const MarketData = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "width": "100%",
      "height": "100%",
      "defaultColumn": "overview",
      "defaultScreen": "general",
      "market": "crypto",
      "showToolbar": true,
      "colorTheme": "dark",
      "locale": "en",
      "isTransparent": true,
      "screener_type": "crypto_mkt",
      "displayCurrency": "USD",
      "transparency": true
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
    height: 600,
    backgroundColor: 'rgba(22, 23, 29, 0.6)',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 16
  }
});

export default MarketData;
