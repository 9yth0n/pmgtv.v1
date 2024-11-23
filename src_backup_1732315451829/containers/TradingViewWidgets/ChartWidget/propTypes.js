import PropTypes from 'prop-types';

export const chartWidgetPropTypes = {
  symbol: PropTypes.string,
  interval: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark']),
  autosize: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export const chartWidgetDefaultProps = {
  symbol: 'BTCUSDT',
  interval: '1D',
  theme: 'dark',
  autosize: true,
  height: 760,
  width: '100%',
};
