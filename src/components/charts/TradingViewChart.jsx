import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/theme';

const CHART_STATE_KEY = 'trading_chart_state_mobile';

const TradingViewChart = ({
  symbol = 'BTCUSDT',
  interval = '1D',
  theme = 'dark',
  height = 500,
  style = {},
  onChartReady = () => {},
}) => {
  const webViewRef = useRef(null);
  const wsRef = useRef(null);

  const getChartHtml = () => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: ${COLORS.background};
          }
          #tv_chart_container {
            height: 100vh;
            width: 100vw;
          }
        </style>
      </head>
      <body>
        <div id="tv_chart_container"></div>
        <script type="text/javascript">
          const savedState = localStorage.getItem('${CHART_STATE_KEY}');
          const widget = new TradingView.widget({
            symbol: '${symbol}',
            interval: '${interval}',
            timezone: 'exchange',
            theme: '${theme}',
            style: '1',
            toolbar_bg: '${COLORS.surface}',
            enable_publishing: false,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            details: true,
            hotlist: true,
            calendar: true,
            studies: [
              'RSI@tv-basicstudies',
              'MASimple@tv-basicstudies',
              'MACD@tv-basicstudies',
              'StochasticRSI@tv-basicstudies',
              'BB@tv-basicstudies'
            ],
            studies_overrides: {
              'volume.volume.color.0': '${COLORS.error}',
              'volume.volume.color.1': '${COLORS.success}',
              'volume.volume.transparency': 30,
              'macd.histogram.color': '${COLORS.primary}',
              'macd.signal.color': '${COLORS.warning}',
              'macd.macd.color': '${COLORS.info}',
              'BB.Upper.color': '${COLORS.primary}',
              'BB.Lower.color': '${COLORS.primary}',
              'BB.Basis.color': '${COLORS.warning}',
              'BB.Upper.linewidth': 2,
              'BB.Lower.linewidth': 2,
              'BB.Basis.linewidth': 2,
              'RSI.upper.line.color': '${COLORS.error}',
              'RSI.lower.line.color': '${COLORS.success}',
              'RSI.plot.color': '${COLORS.primary}',
              'RSI.plot.linewidth': 2,
              'Moving Average.plottype': 'line',
              'Moving Average.color': '${COLORS.primary}',
              'Moving Average#1.color': '${COLORS.secondary}',
              'Moving Average#2.color': '${COLORS.info}',
              'Moving Average.linewidth': 2,
              'Moving Average#1.linewidth': 2,
              'Moving Average#2.linewidth': 2,
            },
            drawings_access: {
              type: 'all',
              tools: [
                { name: 'Regression Trend' },
                { name: 'Trend Lines' },
                { name: 'Fibonacci Retracement' }
              ]
            },
            saved_data: savedState ? JSON.parse(savedState) : null,
            client_id: 'tradingview.com',
            user_id: 'public_user',
            fullscreen: true,
            auto_save_delay: 5,
            study_count_limit: 25,
            container_id: 'tv_chart_container',
            library_path: 'charting_library/',
            custom_css_url: './themed.css',
            loading_screen: { 
              backgroundColor: '${COLORS.background}',
              foregroundColor: '${COLORS.primary}'
            },
            enabled_features: [
              'study_templates',
              'use_localstorage_for_settings',
              'countdown',
              'support_multicharts',
              'side_toolbar_in_fullscreen_mode',
              'save_chart_properties_to_local_storage'
            ],
            disabled_features: [
              'header_symbol_search',
              'header_screenshot',
              'header_compare'
            ],
            overrides: {
              'paneProperties.background': '${COLORS.background}',
              'paneProperties.vertGridProperties.color': '${COLORS.surface}',
              'paneProperties.horzGridProperties.color': '${COLORS.surface}',
              'symbolWatermarkProperties.transparency': 90,
              'scalesProperties.textColor': '${COLORS.textSecondary}',
              'mainSeriesProperties.candleStyle.upColor': '${COLORS.success}',
              'mainSeriesProperties.candleStyle.downColor': '${COLORS.error}',
              'mainSeriesProperties.candleStyle.drawWick': true,
              'mainSeriesProperties.candleStyle.drawBorder': true,
              'mainSeriesProperties.candleStyle.borderUpColor': '${COLORS.success}',
              'mainSeriesProperties.candleStyle.borderDownColor': '${COLORS.error}',
              'mainSeriesProperties.candleStyle.wickUpColor': '${COLORS.success}',
              'mainSeriesProperties.candleStyle.wickDownColor': '${COLORS.error}',
            }
          });

          widget.onChartReady(() => {
            // Save chart state periodically
            setInterval(() => {
              widget.save(state => {
                localStorage.setItem('${CHART_STATE_KEY}', JSON.stringify(state));
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'SAVE_CHART_STATE',
                  state: state
                }));
              });
            }, 30000);

            // Notify React Native that chart is ready
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'CHART_READY'
            }));
          });
        </script>
      </body>
    </html>
  `;

  const handleMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'SAVE_CHART_STATE') {
      AsyncStorage.setItem(CHART_STATE_KEY, data.state);
    } else if (data.type === 'CHART_READY') {
      onChartReady();
    }
  };

  return (
    <View style={[styles.container, { height }, style]}>
      <WebView
        ref={webViewRef}
        source={{ html: getChartHtml() }}
        style={styles.webview}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        bounces={false}
        scrollEnabled={false}
        androidLayerType="hardware"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  webview: {
    flex: 1,
    backgroundColor: COLORS.background,
  }
});

export default TradingViewChart;
