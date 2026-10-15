import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CoinDetailContext = createContext(null);

export function CoinDetailProvider({ children }) {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError('');

    fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudieron cargar los datos de la moneda.');
        }
        return response.json();
      })
      .then(setCoin)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [id]);

  return (
    <CoinDetailContext.Provider value={{ coin, loading, error }}>
      {children}
    </CoinDetailContext.Provider>
  );
}

function useCoinDetail() {
  const context = useContext(CoinDetailContext);

  if (!context) {
    throw new Error('useCoinDetail debe usarse dentro de CoinDetailProvider');
  }

  return context;
}

export function Detail() {
  const { coin, loading, error } = useCoinDetail();

  if (loading) return <p>Cargando moneda...</p>;
  if (error) return <p>{error}</p>;
  if (!coin) return <p>No se encontró la moneda.</p>;

  return (
    <div>
      <img src={coin.image?.small} alt="" />
      <h1>{coin.name}</h1>
      <p>Símbolo: {coin.symbol.toUpperCase()}</p>
      <p>Precio: ${coin.market_data?.current_price?.usd}</p>
      <p>Capitalización: ${coin.market_data?.market_cap?.usd}</p>
    </div>
  );
}
