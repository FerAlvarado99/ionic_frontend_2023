import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton } from '@ionic/react';
import { environment } from '../environments/environment.dev';
import Apimethods from '../commons/Apimethods';
import { Link, useHistory } from 'react-router-dom';
import './Tab1.css';

const Tab1: React.FC = () => {
  const history = useHistory();
  const { data, loading } = Apimethods(`${environment.apiEndpoint}/api/dishes`);
  const [filterName, setFilterName] = useState('');

  const handleFilterNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  const handleItemClick = (id: any) => {
    history.push(`/DetalleProducto/${id}`);
    window.location.reload();
  };

  const handlegoShoppingCar = () => {
    history.push(`/tab4/`);
    window.location.reload();
  };

  if (data !== null) {
    const filteredData = data.filter((dish: any) => {
      const lowerCaseName = dish.name.toLowerCase();
      const lowerCaseFilter = filterName.toLowerCase();
      return lowerCaseName.includes(lowerCaseFilter);
    });

    const handleLogin = () => {
      history.replace(`/login`);
    };

  return (
    
    <IonPage style={{marginRight: '20px', marginTop: '20px'  }}>
      <IonButton a href='#' onClick={(e) => { e.preventDefault(); handleLogin() }} 
      style={{ top: '10px', right: '10px',  maxWidth: '200px' }}>
        Cerrar sesion
      </IonButton>

      <IonButton
      className='add-to-cart-button'
      onClick={handlegoShoppingCar}
      style={{ position: 'fixed', top: '-10px', right: '10px', zIndex: 9999, maxWidth: '200px' }}
    >
      Carrito de compras
    </IonButton>

      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ textAlign: 'center' }}>MENU</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='filter-container' style={{ marginTop: '20px'}}>
          <label htmlFor='filterName'>Filtrar por nombre:</label>
          <input type='text' id='filterName' value={filterName} onChange={handleFilterNameChange} />
        </div>
        <div className='dish-list'>
          {filteredData.map((dish: any) => (
            <div className='dish-container' key={dish.id}>
              <div className='dish-details'>
                <h2>
                  <a href='#' onClick={(e) => { e.preventDefault(); handleItemClick(dish.id) }}>{dish.name}</a>
                </h2>
                <p>Precio: {dish.price}</p>
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};
}
export default Tab1;
