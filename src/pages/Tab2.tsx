import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { environment } from '../environments/environment.dev';
import Apimethods from '../commons/Apimethods';
import { IonButton, IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';

const Tab2: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = Apimethods(`${environment.apiEndpoint}/api/dishes/${id}`);

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  const constructImageUrl = (redirectUrl: string) => {
    const baseUrl = environment.apiEndpoint;
    return `${baseUrl}${redirectUrl}`;
  };
  const history2 = useHistory();
  const handleItemClick = (id: any) => {
 
  };
  if (data !== null) {
    console.log('Datos del objeto data:');
    console.log(`ID: ${data.dish.id}`);
    console.log(`Nombre: ${data.dish.name}`);
    console.log(`Precio: ${data.dish.price}`);
  } else {
    console.log('El objeto data es null');
  }

  const handleGoBack = () => {
    history.back();
  };

  const handleAddShoppingCar = (name: any,id: any) => {
    
   history2.push(`/tab3/${name}/${id}`);
  };

  if(data !== null && data.dish !== null && data.description !== null){
    return (
    
<IonPage>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Platos Disponibles</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    <div className='dish-list' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className='dish-container'>
        <div className='dish-image'>
          <IonImg src={constructImageUrl(data.dish.picture_url)} alt={data.dish.name} style={{ width: '800px', height: '600px' }} />
        </div>
        <div className='dish-details'>
          <IonButton  onClick={handleGoBack} style={{ position: 'absolute', top: '10px', left: '10px' }}>
            Volver
          </IonButton>
          <IonButton a href='#' onClick={(e) => { e.preventDefault(); handleAddShoppingCar(data.dish.name,data.dish.id) }} style={{ position: 'absolute', top: '10px', right: '10px' }}>
            Agregar a carrito
          </IonButton>

          <h2>Nombre: {data.dish.name}</h2>
          <p>Precio: {data.dish.price}</p>
          <p>Descripcion: {data.dish.description.body}</p>
        </div>
      </div>
    </div>
  </IonContent>
</IonPage>


    );
  };
};
export default Tab2;
