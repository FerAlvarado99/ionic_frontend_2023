import React, { useState } from 'react';
import { environment } from '../environments/environment.dev';
import Apimethods from '../commons/Apimethods';
import { IonContent, IonInput, IonItem, IonLabel, IonPage, IonButton, IonText } from '@ionic/react';
import { useHistory } from 'react-router';
import axios from 'axios';

const changeDataUser: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = Apimethods(`${environment.apiEndpoint}`);
  const [saveEnable, setsaveEnable] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);
  const [color,setColor] = useState('');
  const history2 = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Iniciando sesión...');
    
    try {
      const response = await login(email, password);
      handleAddOrder();
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Verifique las credenciales');
    }
  };
  
  const handleAddOrder = () => {
    if(saveEnable === false){
        return;
    }
    setsaveEnable(false);
    const order = {
 
      client_password: newPassword,

    };

    axios
      .put(`${environment.apiEndpoint}/api/clients/${5}`, order, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('Order added successfully:', response.data);
        setSuccessMessage(true);
        setColor("success");
        setMessage('¡Contraseña cambiada con exito!')
        setTimeout(() => {
            setSuccessMessage(false);
            history2.replace(`/Productos`);
          }, 1000);
      })
      .catch((error) => {
        console.error('Error adding order:', error);
        
        setSuccessMessage(true);
        setColor("danger");
        setMessage('Ocurrio un error al intentar cambiar la ¡Contraseña!')
        setTimeout(() => {
            setSuccessMessage(false);
            setsaveEnable(true);
          }, 3000);
      });
  };

  const handleGoBack = () => {
    history.back();
  };

  return (
    <IonPage>
      <IonButton a href='#' onClick={(e) => { e.preventDefault(); handleGoBack() }} style={{  top: '10px', right: '10px' }}>
        Volver
      </IonButton>
      <IonContent>
      <div className="changeDataUser-container" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h1 style={{fontSize: '50px'}}>Cambiar contraseña</h1>
          <form onSubmit={handleSubmit}>
            <IonItem lines="none">
              <IonLabel position="floating">Email</IonLabel>
              <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem lines="none">
              <IonLabel position="floating"style={{marginTop: '10px'}}>Contraseña actual</IonLabel>
              <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem lines="none">
              <IonLabel position="floating"style={{marginTop: '10px'}}>Contraseña Nueva</IonLabel>
              <IonInput type="password" value={newPassword} onIonChange={(e) => setNewPassword(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonButton type="submit" expand="full" style={{marginTop: '50px'}}>Cambiar contraseña</IonButton>
          </form>
          {message && <IonText color="primary">{message}</IonText>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default changeDataUser;

