import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import { environment } from '../environments/environment.dev';
import Apimethods from '../commons/Apimethods';
import { Link, useHistory } from 'react-router-dom';
import './Tab1.css';

const Tab1: React.FC = () => {
  const history = useHistory();
  const { data, loading } = Apimethods(`${environment.apiEndpoint}/api/dishes`);

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  const constructImageUrl = (redirectUrl: string) => {
    const baseUrl = environment.apiEndpoint;
    return `${baseUrl}${redirectUrl}`;
  };

  const handleItemClick = (id: any) => {
    history.push(`/DetalleProducto/${id}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Platos Disponibles</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='dish-list'>
          {data?.map((dish: any) => (
            <div className='dish-container' key={dish.id} onClick={() => handleItemClick(dish.id)}>
              <div className='dish-image'>
                <IonImg src={constructImageUrl(dish.picture_url)} alt={dish.name} style={{ width: '200px', height: '200px' }} />
              </div>
              <div className='dish-details'>
                <h2>Nombre: {dish.name}</h2>
                <p>Precio: {dish.price}</p>
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
