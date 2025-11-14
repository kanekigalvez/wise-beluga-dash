import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();

  useEffect(() => {
    if (isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const handleAuthChange = (event: string) => {
    if (event === 'SIGNED_IN') {
      // Use a timeout to ensure the session is fully set in the context before navigating
      setTimeout(() => navigate('/'), 100);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      handleAuthChange(event);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-primary">Acceso de Administrador</h1>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            theme="dark"
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Correo electrónico',
                  password_label: 'Contraseña',
                  button_label: 'Iniciar sesión',
                  link_text: '¿Ya tienes una cuenta? Inicia sesión',
                },
                sign_up: {
                  email_label: 'Correo electrónico',
                  password_label: 'Contraseña',
                  button_label: 'Registrarse',
                  link_text: '¿No tienes cuenta? Regístrate',
                },
                forgotten_password: {
                  email_label: 'Correo electrónico',
                  button_label: 'Enviar instrucciones',
                  link_text: '¿Olvidaste tu contraseña?',
                }
              },
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;