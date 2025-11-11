import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const LoginPage = () => {
  const { session } = useAuth();

  if (session) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md p-8 space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
                    Inicia sesión en tu cuenta
                </h2>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                    Esto es necesario para poder editar el contenido.
                </p>
            </div>
            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={[]}
                theme="light"
                localization={{
                    variables: {
                        sign_in: {
                            email_label: 'Correo electrónico',
                            password_label: 'Contraseña',
                            button_label: 'Iniciar sesión',
                            social_provider_text: 'Iniciar sesión con {{provider}}',
                            link_text: '¿Ya tienes una cuenta? Inicia sesión',
                        },
                        sign_up: {
                            email_label: 'Correo electrónico',
                            password_label: 'Contraseña',
                            button_label: 'Registrarse',
                            social_provider_text: 'Registrarse con {{provider}}',
                            link_text: '¿No tienes una cuenta? Regístrate',
                        },
                        forgotten_password: {
                            email_label: 'Correo electrónico',
                            password_label: 'Contraseña',
                            button_label: 'Enviar instrucciones',
                            link_text: '¿Olvidaste tu contraseña?',
                        },
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