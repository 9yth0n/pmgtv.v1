import React, { useEffect, useRef } from 'react';
import { COLORS } from '../../constants/theme';

const CHART_STATE_KEY = 'trading_chart_state';
let tvScriptLoadingPromise;

const TradingViewChart = ({
  symbol = 'BTCUSDT',
  interval = '1D',
  theme = 'dark',
  autosize = true,
  height = 500,
  width = '100%',
  style = {},
  onChartReady = () => {},
}) => {
  const onLoadScriptRef = useRef(null);
  const chartRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

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

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => {
      onLoadScriptRef.current = null;
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem(CHART_STATE_KEY);
    if (savedState && chartRef.current) {
      chartRef.current.load(JSON.parse(savedState));
    }
  }, []);

  const connectWebSocket = (symbolInfo, resolution, onRealtimeCallback) => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    wsRef.current = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbolInfo.name.toLowerCase()}@kline_${resolution}`
    );

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const bar = {
        time: data.k.t,
        open: parseFloat(data.k.o),
        high: parseFloat(data.k.h),
        low: parseFloat(data.k.l),
        close: parseFloat(data.k.c),
        volume: parseFloat(data.k.v)
      };
      onRealtimeCallback(bar);
    };

    return wsRef.current;
  };

  const createWidget = () => {
    if (document.getElementById('tradingview-widget') && 'TradingView' in window) {
      const widget = new window.TradingView.widget({
        container_id: 'tradingview-widget',
        symbol: symbol,
        interval: interval,
        timezone: 'exchange',
        theme: theme,
        style: '1',
        toolbar_bg: COLORS.surface,
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        details: true,
        hotlist: true,
        calendar: true,
        save_image: true,
        studies: [
          'RSI@tv-basicstudies',
          'MASimple@tv-basicstudies',
          'MACD@tv-basicstudies',
          'StochasticRSI@tv-basicstudies',
          'BB@tv-basicstudies'
        ],
        studies_overrides: {
          'volume.volume.color.0': COLORS.error,
          'volume.volume.color.1': COLORS.success,
          'volume.volume.transparency': 30,
          'macd.histogram.color': COLORS.primary,
          'macd.signal.color': COLORS.warning,
          'macd.macd.color': COLORS.info,
          'BB.Upper.color': COLORS.primary,
          'BB.Lower.color': COLORS.primary,
          'BB.Basis.color': COLORS.warning,
          'BB.Upper.linewidth': 2,
          'BB.Lower.linewidth': 2,
          'BB.Basis.linewidth': 2,
          'RSI.upper.line.color': COLORS.error,
          'RSI.lower.line.color': COLORS.success,
          'RSI.plot.color': COLORS.primary,
          'RSI.plot.linewidth': 2,
          'Moving Average.plottype': 'line',
          'Moving Average.color': COLORS.primary,
          'Moving Average#1.color': COLORS.secondary,
          'Moving Average#2.color': COLORS.info,
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
        saved_data: JSON.parse(localStorage.getItem(CHART_STATE_KEY) || 'null'),
        client_id: 'tradingview.com',
        user_id: 'public_user',
        fullscreen: true,
        auto_save_delay: 5,
        study_count_limit: 25,
        container_id: 'tradingview-widget',
        library_path: 'charting_library/',
        custom_css_url: './themed.css',
        loading_screen: { 
          backgroundColor: COLORS.background,
          foregroundColor: COLORS.primary
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
        autosize: autosize,
        height: height,
        width: width,
        overrides: {
          'paneProperties.background': COLORS.background,
          'paneProperties.vertGridProperties.color': COLORS.surface,
          'paneProperties.horzGridProperties.color': COLORS.surface,
          'symbolWatermarkProperties.transparency': 90,
          'scalesProperties.textColor': COLORS.textSecondary,
          'mainSeriesProperties.candleStyle.upColor': COLORS.success,
          'mainSeriesProperties.candleStyle.downColor': COLORS.error,
          'mainSeriesProperties.candleStyle.drawWick': true,
          'mainSeriesProperties.candleStyle.drawBorder': true,
          'mainSeriesProperties.candleStyle.borderUpColor': COLORS.success,
          'mainSeriesProperties.candleStyle.borderDownColor': COLORS.error,
          'mainSeriesProperties.candleStyle.wickUpColor': COLORS.success,
          'mainSeriesProperties.candleStyle.wickDownColor': COLORS.error,
        }
      });

      widget.onChartReady(() => {
        chartRef.current = widget;
        onChartReady(widget);

        // Save chart state periodically
        setInterval(() => {
          widget.save(state => {
            localStorage.setItem(CHART_STATE_KEY, JSON.stringify(state));
          });
        }, 30000);
      });
    }
  };

  return (
    <div
      id="tradingview-widget"
      style={{
        height,
        width,
        backgroundColor: COLORS.background,
        borderRadius: 8,
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        ...style
      }}
    />
  );
};

export default TradingViewChart;
