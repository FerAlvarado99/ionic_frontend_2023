import React, { useState } from 'react';
import { environment } from '../environments/environment.dev';
import Apimethods from '../commons/Apimethods';
import { IonContent, IonInput, IonItem, IonLabel, IonPage, IonButton, IonText } from '@ionic/react';
import { useHistory } from 'react-router';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = Apimethods(`${environment.apiEndpoint}`);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Iniciando sesión...');
    
    try {
      const response = await login(email, password);
      setMessage('¡Inicio de sesión exitoso!'); // Mensaje de felicitación
      history.push('/productos');
      // Aquí puedes realizar acciones adicionales, como redirigir a otra página, guardar el token de autenticación, etc.
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Error durante el inicio de sesión');
    }
  };
  

  return (
    <IonPage>
      <IonButton a href='#' onClick={(e) => { e.preventDefault(); handleLogin() }} style={{ position: 'absolute', top: '10px', right: '10px' }}>
        Ingresar
      </IonButton>
      <IonContent>
      <div className="login-container" style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h1 style={{fontSize: '50px'}}>Iniciar Sesión</h1>
          <form onSubmit={handleSubmit}>
            <IonItem lines="none">
              <IonLabel position="floating">Email</IonLabel>
              <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem lines="none">
              <IonLabel position="floating"style={{marginTop: '10px'}}>Contraseña</IonLabel>
              <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonButton type="submit" expand="full" style={{marginTop: '50px'}}>Iniciar Sesión</IonButton>
          </form>
          {message && <IonText color="primary">{message}</IonText>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;

