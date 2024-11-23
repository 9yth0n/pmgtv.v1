import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import { formatCurrency, formatPercentage } from '../../../utils/formatters/numbers';

const PriceCard = ({ symbol, price, change24h, currency = 'USD' }) => {
  const isPositive = change24h >= 0;

  return (
    <View style={styles.container}>
      <Text style={styles.symbol}>{symbol}</Text>
      <Text style={styles.price}>
        {formatCurrency(price, currency)}
      </Text>
      <Text style={[
        styles.change,
        isPositive ? styles.positive : styles.negative
      ]}>
        {formatPercentage(change24h)}
      </Text>
    </View>
  );
};

PriceCard.propTypes = {
  symbol: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  change24h: PropTypes.number.isRequired,
  currency: PropTypes.string,
};

export default PriceCard;
