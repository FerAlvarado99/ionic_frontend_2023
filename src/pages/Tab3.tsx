import React, { useState } from 'react';
import axios from 'axios';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonDatetime, IonSelect, IonSelectOption } from '@ionic/react';
import { environment } from '../environments/environment.dev';
import './Tab3.css';

const Tab3: React.FC = () => {
  const currentDate = new Date();
  const [order_date, setOrderDate] = useState(currentDate.toISOString().slice(0, 10) + 'T' + currentDate.toLocaleTimeString().slice(0, 5));
  const [dish_id, setDishId] = useState('');
  const [client_id, setClientId] = useState('');
  const [status, setStatus] = useState('');

  const statusMap = {
    0: 'delayed',
    1: 'delivered',
    2: 'in_time',
    3: 'over_time',
    4: 'cancelled'
  };

  const handleAddOrder = () => {
    const order = {
      order_date: order_date,
      dish_id: dish_id,
      client_id: client_id,
      status: statusMap[status] // Convert status to text value
    };

    axios
      .post(`${environment.apiEndpoint}/api/orders`, order, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('Order added successfully:', response.data);
        // Optionally, you can show a success message or navigate to a different page
      })
      .catch((error) => {
        console.error('Error adding order:', error);
        // Optionally, you can show an error message
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agregar Orden</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <div className="center">
            <IonDatetime
              className="input"
              placeholder="Fecha y hora de la orden"
              value={order_date}
              onIonChange={(e) => setOrderDate(e.detail.value!)}
            ></IonDatetime>
            <IonInput
              className="input"
              placeholder="ID del plato"
              value={dish_id}
              onIonChange={(e) => setDishId(e.detail.value!)}
            ></IonInput>
            <IonInput
              className="input"
              placeholder="ID del cliente"
              value={client_id}
              onIonChange={(e) => setClientId(e.detail.value!)}
            ></IonInput>
            <IonSelect
              className="input"
              placeholder="Estado"
              value={status}
              onIonChange={(e) => setStatus(e.detail.value)}
            >
              <IonSelectOption value="0">Delayed</IonSelectOption>
              <IonSelectOption value="1">Delivered</IonSelectOption>
              <IonSelectOption value="2">In Time</IonSelectOption>
              <IonSelectOption value="3">Over Time</IonSelectOption>
              <IonSelectOption value="4">Cancelled</IonSelectOption>
            </IonSelect>
            <IonButton expand="full" onClick={handleAddOrder} className="button">
              Agregar Orden
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
