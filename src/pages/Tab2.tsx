import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Apimethods from '../commons/Apimethods';
import { environment } from '../environments/environment.dev';

const Tab2: React.FC = () => {
  const { dishId } = useParams<{ dishId: string }>();
  const [dish, setDish] = useState<any>(null);
  const { getProductById } = Apimethods(`${environment.apiEndpoint}`);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const productData = await getProductById(dishId);
      setDish(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  return (
    <div>
      {dish ? (
        <div className='dish-container' key={dish.id}>
          <div className='dish-image'>
            <img src={dish.picture_url} alt={dish.name} style={{ width: '200px', height: '200px' }} />
          </div>
          <div className='dish-details'>
            <h2>Nombre: {dish.name}</h2>
            <p>Precio: {dish.price}</p>
            <p>Descripción: {dish.description}</p>
          </div>
        </div>
      ) : (
        <p>Cargando detalles del producto...</p>
      )}
    </div>
  );
};

export default Tab2;



