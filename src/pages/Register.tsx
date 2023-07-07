import React, { useState } from 'react';
import { environment } from '../environments/environment.dev';
import Apimethods from '../commons/Apimethods';
import { IonContent, IonInput, IonItem, IonLabel, IonPage, IonButton, IonText } from '@ionic/react';
import { useHistory } from 'react-router';

const RegisterClient: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [client_name, setName] = useState('');
  const [direction, setAddress] = useState('');
  const [client_password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { registerClient } = Apimethods(`${environment.apiEndpoint}/api/clients`);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerClient(email, client_name, direction, client_password);
      setMessage('Registrado correctamente');
      history.push('/login');
    } catch (error) {
      setMessage('Error al registrar el cliente');
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="login-container" style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h1 style={{ fontSize: '50px' }}>Registrarse</h1>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <IonItem lines="none">
              <IonLabel position="floating">Email</IonLabel>
              <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem lines="none">
              <IonLabel position="floating" style={{ marginTop: '10px' }}>Nombre completo</IonLabel>
              <IonInput type="text" value={client_name} onIonChange={(e) => setName(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem lines="none">
              <IonLabel position="floating" style={{ marginTop: '10px' }}>Dirección</IonLabel>
              <IonInput type="text" value={direction} onIonChange={(e) => setAddress(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem lines="none">
              <IonLabel position="floating" style={{ marginTop: '10px' }}>Contraseña</IonLabel>
              <IonInput type="password" value={client_password} onIonChange={(e) => setPassword(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonButton type="submit" expand="full" style={{ marginTop: '50px' }}>Registrarse</IonButton>
          </form>
          {message && <IonText color="primary">{message}</IonText>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterClient;

