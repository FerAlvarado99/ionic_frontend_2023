import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonText } from '@ionic/react';
import { environment } from '../environments/environment.dev';
import Apimethods from '../commons/Apimethods';
import axios from 'axios';
import { useHistory } from 'react-router';

const Tab4: React.FC = () => {
  const { data, loading } = Apimethods(`${environment.apiEndpoint}/api/orders`);
  const [saveEnable, setsaveEnable] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [color,setColor] = useState('');
  const history2 = useHistory();

  if (loading) {
    return <h1>Cargando...</h1>;
  }
  const handleDeleteOrder = (idEliminar: any) => {
    console.log()
    if(saveEnable === false){
        return;
    }
    setsaveEnable(false);

    axios
      .delete(`${environment.apiEndpoint}/api/orders/${idEliminar}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('Order added successfully:', response.data);
        setSuccessMessage(true);
        setColor("success");
        setMessage('¡Orden eliminada!')
        setTimeout(() => {
            setSuccessMessage(false);
            window.location.reload();
          }, 1000);
      })
      .catch((error) => {
        console.error('Error adding order:', error);
        
        setSuccessMessage(true);
        setColor("danger");
        setMessage('Ocurrio un error al intentar eliminar la orden')
        setTimeout(() => {
            setSuccessMessage(false);
            setsaveEnable(true);
          }, 3000);
      });
  };

  if (data !== null) {
    const filteredData = data.filter((order: any) => {
      const dishId = order.client.client_name;
      const filterValue = "Jairo"; //clientID
    
      return dishId === filterValue;
    });
    
    const handleGoBack = () => {
      history.back();
    };

    const handleEditOrder = (name: any,dish_id: any,order_id: any) => {
    
      history2.push(`/tab5/${name}/${dish_id}/${order_id}`);
     };

  return (
    

    <IonPage>
    <IonButton onClick={handleGoBack} style={{ maxWidth: '200px', top: '10px', left: '10px' }}>
          Volver
    </IonButton>
    {successMessage && (
              <IonText color={color}>{message}</IonText>
            )}
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          Ordenes 
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      {filteredData?.map((order: any) => {
        console.log(order)
        return(
          <IonCard className='Ion_Card'> 
            <IonCardHeader>
              <IonCardTitle className='Ion_Card_Title'> Dia de la orden: {order.order_date}</IonCardTitle>
              <IonCardSubtitle className='Ion_Card_SubTitle'>Estado: {order.status}</IonCardSubtitle>
              <IonCardSubtitle className='Ion_Card_SubTitle'>Plato: {order.dish.name}</IonCardSubtitle>
              <IonButton a href='#' onClick={(e) => { e.preventDefault(); handleEditOrder(order.dish.name,order.dish_id,order.id) }} style={{ position: 'fixed', top: '20px', right: '10px', zIndex: 9999, maxWidth: '200px' }}>
                Editar
              </IonButton>
              <IonButton a href='#' onClick={(e) => { e.preventDefault(); handleDeleteOrder(order.id) }} style={{ position: 'fixed', top: '20px',marginRight: '200px', right: '10px', zIndex: 9999, maxWidth: '200px' }}>
                Eliminar
              </IonButton>
              
            </IonCardHeader>

          </IonCard>
        )
      })}
    </IonContent>
  </IonPage>



  );
};
}
export default Tab4;
