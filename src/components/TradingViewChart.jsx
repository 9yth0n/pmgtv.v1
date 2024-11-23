import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const TradingViewChart = ({ symbol = 'BINANCE:BTCUSDT', interval = '15' }) => {
  const webViewRef = useRef(null);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #0B0E11;
          }
          #tradingview_widget {
            height: 620px;
            width: 100vw;
          }
        </style>
      </head>
      <body>
        <div id="tradingview_widget"></div>
        <script type="text/javascript">
          new TradingView.widget({
            "width": "100%",
            "height": "100%",
            "symbol": "${symbol}",
            "interval": "${interval}",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#1C2030",
            "enable_publishing": false,
            "hide_side_toolbar": false,
            "allow_symbol_change": true,
            "details": true,
            "hotlist": true,
            "calendar": true,
            "container_id": "tradingview_widget",
            "studies": [
              "RSI@tv-basicstudies",
              "MACD@tv-basicstudies",
              "Volume@tv-basicstudies",
              "BB@tv-basicstudies",
              "EMA@tv-basicstudies",
              "StochasticRSI@tv-basicstudies"
            ],
            "theme": {
              "chart": {
                "layout": {
                  "background": {
                    "type": "solid",
                    "color": "#0B0E11"
                  },
                  "textColor": "#E0E3EB"
                },
                "watermark": {
                  "color": "rgba(255, 255, 255, 0.1)"
                },
                "grid": {
                  "vertLines": {
                    "color": "#1C2030"
                  },
                  "horzLines": {
                    "color": "#1C2030"
                  }
                }
              },
              "studies": {
                "macd": {
                  "signal": "#FF9800",
                  "macd": "#2196F3",
                  "histogram": "#00BCD4"
                },
                "rsi": {
                  "line": "#64B5F6",
                  "level30": "#FF5252",
                  "level70": "#4CAF50"
                }
              }
            }
          });
        </script>
      </body>
    </html>
  `;

  const webViewStyle = Platform.select({
    web: { height: '620px', width: '100vw' },
    default: StyleSheet.flatten([styles.webview]),
  });

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html }}
        style={webViewStyle}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
        scrollEnabled={false}
        bounces={false}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0E11',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default TradingViewChart;
