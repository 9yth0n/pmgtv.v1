import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

let tvScriptLoadingPromise;

const TradingViewChart = ({ symbol = 'BTCUSDT' }) => {
  const containerRef = useRef();
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTradingViewScript = () => {
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

    const createWidget = () => {
      if (document.getElementById('tradingview_chart') && "TradingView" in window) {
        try {
          new window.TradingView.widget({
            symbol: symbol || 'BINANCE:BTCUSDT',
            interval: '1D',
            container_id: 'tradingview_chart',
            library_path: '/charting_library/',
            locale: 'en',
            charts_storage_url: 'https://saveload.tradingview.com',
            charts_storage_api_version: '1.1',
            client_id: 'tradingview.com',
            user_id: 'public_user_id',
            autosize: true,
            fullscreen: false,
            theme: 'dark',
            overrides: {
              "paneProperties.background": "rgba(22, 23, 29, 0.6)",
              "paneProperties.backgroundType": "solid",
              "mainSeriesProperties.candleStyle.upColor": "#00C805",
              "mainSeriesProperties.candleStyle.downColor": "#FF5000",
              "mainSeriesProperties.candleStyle.borderUpColor": "#00C805",
              "mainSeriesProperties.candleStyle.borderDownColor": "#FF5000",
              "mainSeriesProperties.candleStyle.wickUpColor": "#00C805",
              "mainSeriesProperties.candleStyle.wickDownColor": "#FF5000",
              "paneProperties.vertGridProperties.color": "rgba(42, 46, 57, 0.3)",
              "paneProperties.horzGridProperties.color": "rgba(42, 46, 57, 0.3)",
              "scalesProperties.textColor": "rgba(120, 123, 134, 1)",
              "scalesProperties.lineColor": "rgba(42, 46, 57, 0.3)",
            },
            studies_overrides: {
              "MACD.histogram.color.0": "#FF5000",
              "MACD.histogram.color.1": "#00C805",
              "MACD.signal.color": "#FFA500",
              "MACD.signal.linewidth": 2,
              "RSI.upper.line.color": "#FF5000",
              "RSI.lower.line.color": "#00C805",
              "RSI.plot.color": "#BAA489",
              "RSI.plot.linewidth": 2,
              "Moving Average.plottype": "line",
              "Moving Average.color": "#2962FF",
              "Moving Average#1.color": "#FF6B6B",
              "Moving Average#2.color": "#7B1FA2",
              "Moving Average.linewidth": 2,
              "Moving Average#1.linewidth": 2,
              "Moving Average#2.linewidth": 2,
            },
            studies: [
              "MACD@tv-basicstudies",
              "RSI@tv-basicstudies",
              {
                id: "Moving Average@tv-basicstudies",
                inputs: {
                  length: 20,
                  source: "close"
                }
              },
              {
                id: "Moving Average@tv-basicstudies",
                inputs: {
                  length: 50,
                  source: "close"
                }
              },
              {
                id: "Moving Average@tv-basicstudies",
                inputs: {
                  length: 200,
                  source: "close"
                }
              }
            ],
            disabled_features: [
              'header_settings',
              'header_compare',
              'header_undo_redo',
              'header_screenshot',
              'header_fullscreen_button',
              'use_localstorage_for_settings',
              'show_logo_on_all_charts',
              'caption_buttons_text_if_possible',
              'header_saveload',
              'border_around_the_chart',
              'header_widget_dom_node',
            ],
            enabled_features: [
              'hide_left_toolbar_by_default',
              'use_localstorage_for_settings',
              'save_chart_properties_to_local_storage',
              'create_volume_indicator_by_default',
              'header_widget',
              'timeframes_toolbar',
              'volume_force_overlay',
            ],
            loading_screen: {
              backgroundColor: "rgba(22, 23, 29, 0.6)",
              foregroundColor: "#BAA489",
            },
            drawings_access: { type: 'black', tools: [{ name: "Regression Trend" }] },
            onNoDataAvailable: () => {
              setError('This symbol is not available. Please try another one.');
            },
            onLoadError: () => {
              setError('Error loading symbol. Please try another one.');
            }
          });
          setError(null);
        } catch (err) {
          setError('Error loading chart. Please try another symbol.');
        }
      }
    };

    loadTradingViewScript().then(() => {
      createWidget();
    }).catch(() => {
      setError('Error loading TradingView widget. Please refresh the page.');
    });

    return () => {
      const oldWidget = document.getElementById('tradingview_chart');
      if (oldWidget) {
        while (oldWidget.firstChild) {
          oldWidget.removeChild(oldWidget.firstChild);
        }
      }
    };
  }, [symbol]);

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.suggestionText}>
            Try adding a suffix (e.g., USDT, BTC) or check the exact symbol on TradingView
          </Text>
        </View>
      ) : (
        <div 
          id="tradingview_chart_container"
          style={{
            height: '760px',
            backgroundColor: 'rgba(22, 23, 29, 0.6)',
            backdropFilter: 'blur(20px)',
            borderRadius: '8px',
            padding: '16px',
            flex: 'none',
            display: 'block',
          }}
        >
          <div className="tradingview-widget-container" style={{ height: '100%' }}>
            <div id="tradingview_chart" style={{ height: '100%', width: '100%' }}></div>
          </div>
        </div>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    height: 760,
    display: 'block',
  },
  errorContainer: {
    height: 760,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0B0E11'
  },
  errorText: {
    color: '#FF4B4B',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center'
  },
  suggestionText: {
    color: '#808080',
    fontSize: 14,
    textAlign: 'center'
  }
});

export default TradingViewChart;
