import React, { useState } from 'react';
import axios from 'axios';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonDatetime, IonSelect, IonSelectOption, IonLabel, IonText } from '@ionic/react';
import { environment } from '../environments/environment.dev';
import './Tab3.css';
import { useHistory, useParams } from 'react-router';

const Tab3: React.FC = () => {
  const currentDate = new Date();
  const { name } = useParams<{ name: string }>();
  const { id } = useParams<{ id: string }>();
  const [order_date, setOrderDate] = useState(currentDate.toISOString().slice(0, 10) + 'T' + currentDate.toLocaleTimeString().slice(0, 5));
  const [saveEnable, setsaveEnable] = useState(true);
  const [client_id, setClientId] = useState('');
  const [status, setStatus] = useState('');
  const history2 = useHistory();
  const [successMessage, setSuccessMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [color,setColor] = useState('');
  
  const statusMap = {
    0: 'delayed',
    1: 'delivered',
    2: 'in_time',
    3: 'over_time',
    4: 'cancelled'
  };
  
  const handleAddOrder = () => {
    if(saveEnable === false){
        return;
    }
    setsaveEnable(false);
    const order = {
      order_date: order_date,
      dish_id: id,
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
        setSuccessMessage(true);
        setColor("success");
        setMessage('¡Orden agregada exitosamente!')
        setTimeout(() => {
            setSuccessMessage(false);
            history2.replace(`/Productos`);
          }, 1000);
      })
      .catch((error) => {
        console.error('Error adding order:', error);
        
        setSuccessMessage(true);
        setColor("danger");
        setMessage('Ocurrio un error al intentar guardar la orden')
        setTimeout(() => {
            setSuccessMessage(false);
            setsaveEnable(true);
          }, 3000);
      });
  };
  const handleGoBack = () => {
    history.back();
  };
  const goHome = () => {
    history2.replace(`/Productos`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agregar Orden</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonButton onClick={handleGoBack} style={{ position: 'absolute', top: '10px', left: '10px' }}>
            Volver
      </IonButton>
      <IonButton onClick={goHome} style={{ position: 'absolute', top: '10px', right: '10px' }}>
          Menu principal
      </IonButton>

        <div className="container">
          <div className="center">
            <IonDatetime
              className="input"
              placeholder="Fecha y hora de la orden"
              value={order_date}
              onIonChange={(e) => setOrderDate(e.detail.value!)}
            ></IonDatetime>
            <IonLabel className="input" style={{ pointerEvents: 'none' }} placeholder="ID del plato">
                {name}
            </IonLabel>

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
              <IonSelectOption value="0">Demorado</IonSelectOption>
              <IonSelectOption value="1">Entregado</IonSelectOption>
              <IonSelectOption value="2">En Tiempo</IonSelectOption>
              <IonSelectOption value="3">Fuera de tiempo</IonSelectOption>
              <IonSelectOption value="4">Cancelado</IonSelectOption>
            </IonSelect>
            <IonButton expand="full" onClick={handleAddOrder} className="button">
              Agregar Orden
            </IonButton>
            {successMessage && (
              <IonText color={color}>{message}</IonText>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;