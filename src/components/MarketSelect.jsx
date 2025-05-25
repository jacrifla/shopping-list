import React, { useEffect, useState } from 'react';
import marketService from '../services/marketService';
import Select from './Select';

const MarketSelect = ({ value, onChange }) => {
  const [markets, setMarkets] = useState([]);  

  useEffect(() => {
    const loadMarkets = async () => {
      try {
        const response = await marketService.getAllMarkets();
        setMarkets(response || []);
      } catch (error) {
        console.error('Erro ao carregar mercados', error);
      }
    };

    loadMarkets();
  }, []);

  return (
    <Select
      label="Mercado"
      value={value || ''}
      onChange={(e) => onChange(e.target.value || null)}
      options={markets}
      placeholder="Escolha um mercado"
      keyField="marketId"
      displayField="marketName"
      icon="shop"
    />
  );
};

export default MarketSelect;
