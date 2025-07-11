import React, { useState } from 'react';
import { Mail, Lock, Globe, AlertCircle } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (email: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));

    const authorizedEmails = import.meta.env.VITE_AUTHORIZED_EMAILS?.split(',').map((email: string) => email.trim().toLowerCase()) || [];
    
    if (authorizedEmails.includes(email.toLowerCase())) {
      onLogin(email);
    } else {
      setError('Email não autorizado para acessar este conteúdo.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-12 h-12 text-red-500 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-white">RESIDÊNCIA PARAGUAI</h1>
              <p className="text-gray-400 text-sm">Guia Migramóvil 2025</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-red-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">Acesso Restrito</h2>
          </div>
          
          <p className="text-gray-300 text-center mb-6">
            Este conteúdo é exclusivo. Insira seu email autorizado para continuar.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Autorizado
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="Digite seu email"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Verificando...
                </div>
              ) : (
                'Acessar Guia'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-500 text-center">
              Acesso restrito a usuários autorizados. Entre em contato se precisar de acesso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;