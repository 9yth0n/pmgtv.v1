import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { chartWidgetPropTypes, chartWidgetDefaultProps } from './propTypes';
import { loadTradingViewScript } from '../../../services/tradingview';

const ChartWidget = ({
  symbol,
  interval,
  theme,
  autosize,
  height,
  width,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let widget = null;

    const initWidget = async () => {
      try {
        await loadTradingViewScript();
        
        if (containerRef.current && window.TradingView) {
          widget = new window.TradingView.widget({
            symbol,
            interval,
            container_id: containerRef.current.id,
            library_path: '/charting_library/',
            locale: 'en',
            charts_storage_url: 'https://saveload.tradingview.com',
            charts_storage_api_version: '1.1',
            client_id: 'tradingview.com',
            user_id: 'public_user_id',
            autosize,
            height,
            width,
            theme,
            overrides: {
              "paneProperties.background": theme === 'dark' ? "rgba(22, 23, 29, 0.6)" : "#ffffff",
              "paneProperties.backgroundType": "solid",
              "mainSeriesProperties.candleStyle.upColor": "#00C805",
              "mainSeriesProperties.candleStyle.downColor": "#FF5000",
              "mainSeriesProperties.candleStyle.borderUpColor": "#00C805",
              "mainSeriesProperties.candleStyle.borderDownColor": "#FF5000",
              "mainSeriesProperties.candleStyle.wickUpColor": "#00C805",
              "mainSeriesProperties.candleStyle.wickDownColor": "#FF5000",
            }
          });
        }
      } catch (error) {
        console.error('Failed to initialize TradingView widget:', error);
      }
    };

    initWidget();

    return () => {
      if (widget?.remove) {
        widget.remove();
      }
    };
  }, [symbol, interval, theme, autosize, height, width]);

  return (
    <View style={styles.container}>
      <div
        ref={containerRef}
        id="tradingview_chart"
        style={{
          height,
          width,
          backgroundColor: theme === 'dark' ? 'rgba(22, 23, 29, 0.6)' : '#ffffff',
          backdropFilter: 'blur(20px)',
          borderRadius: '8px',
          padding: '16px',
        }}
      />
    </View>
  );
};

ChartWidget.propTypes = chartWidgetPropTypes;
ChartWidget.defaultProps = chartWidgetDefaultProps;

export default ChartWidget;
