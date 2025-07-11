import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { 
  MapPin, 
  Calendar, 
  FileText, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Globe,
  ExternalLink,
  Heart,
  Info,
  LogOut
} from 'lucide-react';
import LoginScreen from './components/LoginScreen';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Proteção contra cópia e print
  useEffect(() => {
    // Desabilitar menu de contexto (botão direito)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Desabilitar teclas de atalho
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+A (Selecionar tudo)
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        return false;
      }
      // Ctrl+C (Copiar)
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        return false;
      }
      // Ctrl+V (Colar)
      if (e.ctrlKey && e.key === 'v') {
        e.preventDefault();
        return false;
      }
      // Ctrl+X (Recortar)
      if (e.ctrlKey && e.key === 'x') {
        e.preventDefault();
        return false;
      }
      // Ctrl+S (Salvar)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
      }
      // Ctrl+P (Imprimir)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        return false;
      }
      // F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }
      // Print Screen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        return false;
      }
    };

    // Desabilitar seleção de texto
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Desabilitar drag
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Detectar tentativas de screenshot
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = 'Conteúdo Protegido';
      } else {
        document.title = 'Guia Migramóvil Paraguai';
      }
    };

    // Adicionar event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Desabilitar console
    const devtools = {
      open: false,
      orientation: null
    };

    const threshold = 160;
    const intervalId = setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          console.clear();
          console.log('%cAcesso negado!', 'color: red; font-size: 50px; font-weight: bold;');
          console.log('%cEste conteúdo é protegido.', 'color: red; font-size: 20px;');
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    // Verificar se já está logado
    const savedAuth = localStorage.getItem('migramovel_auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUserEmail(authData.email);
    }
  }, []);

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    localStorage.setItem('migramovel_auth', JSON.stringify({ email, timestamp: Date.now() }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    localStorage.removeItem('migramovel_auth');
  };

  // Componente AnimatedSection corrigido - sempre visível
  const AnimatedSection = ({ children, sectionId, className = "" }: { 
    children: React.ReactNode; 
    sectionId: number; 
    className?: string; 
  }) => (
    <div 
      data-section={sectionId}
      className={`transition-all duration-700 opacity-100 translate-y-0 ${className}`}
    >
      {children}
    </div>
  );

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const cronograma = [
    { cidade: "Cidade del Este (Alto Paraná)", datas: ["24 a 28 de março", "9 a 13 de junho", "8 a 12 de setembro", "3 a 7 de novembro"] },
    { cidade: "Pedro Juan Caballero (Amambay)", datas: ["31 de março a 4 de abril", "23 a 27 de junho", "15 a 19 de setembro", "10 a 14 de novembro"] },
    { cidade: "Yabebyry (Misiones)", datas: ["7 e 8 de abril"] },
    { cidade: "Panchito López (Misiones)", datas: ["10 e 11 de abril"] },
    { cidade: "La Paloma (Canindeyú)", datas: ["21 e 22 de abril"] },
    { cidade: "Katueté (Canindeyú)", datas: ["24 e 25 de abril"] },
    { cidade: "San Alberto (Alto Paraná)", datas: ["30 de junho a 1º de julho"] },
    { cidade: "Santa Rita (Alto Paraná)", datas: ["3 e 4 de julho"] },
    { cidade: "Salto del Guairá (Canindeyú)", datas: ["25 e 26 de agosto"] },
    { cidade: "Nueva Esperanza (Canindeyú)", datas: ["28 e 29 de agosto"] },
    { cidade: "Carmelo Peralta (Alto Paraguai)", datas: ["6 e 7 de outubro"] },
    { cidade: "Concepción (Concepción)", datas: ["9 e 10 de outubro"] },
    { cidade: "Encarnación (Itapúa)", datas: ["14 a 16 de outubro"] }
  ];

  const custosParaguai = [
    { item: "Residência Temporal (inclui Residência Precária e mudança de categoria)", valor: "Gs. 2.787.550" },
    { item: "Multa por vencimento do prazo de estadia", valor: "Gs. 669.012" },
    { item: "Certificado de Radicação", valor: "Gs. 223.004" },
    { item: "Cópias autenticadas nas Escribanías", valor: "Gs. 80.000" },
    { item: "Antecedentes Interpol", valor: "Gs. 450.000" },
    { item: "Legalização INTERPOL pelo Ministério do Interior", valor: "Gs. 220.000" },
    { item: "Antecedentes para Estrangeiros Polícia Nacional", valor: "Gs. 230.000" }
  ];

  const copias = [
    { documento: "Documento de Identificação", quantidade: "5" },
    { documento: "Certidão de Nascimento", quantidade: "2" },
    { documento: "Certificado Antecedentes Criminais Polícia Federal", quantidade: "2" },
    { documento: "Antecedentes Criminais Interpol", quantidade: "1" },
    { documento: "Antecedentes Criminais Polícia Nacional", quantidade: "1" }
  ];

  const passos = [
    "Pegar ticket de entrada no país na ponte (ou carimbo no passaporte)",
    "Trocar real por guarani antes de chegar nos Órgãos onde faz os processos não aceita cartão nem Pix é Paraguai é outro País",
    "Fazer cópias autenticadas dos documentos em Escribanía (RG ou Passaporte x5, Certidão Nascimento x2, Certificado de Antecedentes Polícia Federal x1, Ticket Entrada Paraguai x1)",
    "Ir ao endereço do Migramóvil",
    "Entrada na Residência Temporal por Ley N° 6984/2022",
    "Pedir residência com Certificado de Radicação",
    "Usar o mesmo endereço para todos os documentos (sugestão: Bairro Santa Ana em Ciudad del Este)"
  ];

  const custosCedula = [
    { item: "Cópias autenticadas", valor: "Gs. 30.000" },
    { item: "Legalização INTERPOL", valor: "Gs. 220.000" },
    { item: "Certificado Vida e Residência", valor: "Gs. 50.000" },
    { item: "Carnet de Registro Estrangeiro", valor: "Gs. 740.000" },
    { item: "Emissão da Cédula", valor: "Gs. 8.500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white select-none" style={{
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      WebkitTouchCallout: 'none',
      WebkitUserDrag: 'none',
      KhtmlUserSelect: 'none',
      overflowY: 'auto'
    }}>
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-blue-600 py-16 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <Globe className="w-12 h-12 mr-4 text-yellow-300" />
              <div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
                  RESIDÊNCIA PARAGUAI
                </h1>
                <h2 className="text-xl md:text-2xl font-medium text-gray-100">
                  Guia Completo para Migramóvil (Mutirão) 2025
                </h2>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="text-sm">Sair</span>
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Cronograma 2025</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <FileText className="w-5 h-5 mr-2" />
              <span>Documentos Necessários</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <DollarSign className="w-5 h-5 mr-2" />
              <span>Custos Detalhados</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-200">Email: {userEmail}</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        {/* PÁGINA 1 - O que é o Migramóvil */}
        <AnimatedSection sectionId={1}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <Info className="w-8 h-8 text-blue-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-red-400 mb-4">O QUE É O PROGRAMA MIGRAMÓVIL (Mutirão) ?</h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    O Migramóvil é um programa do governo paraguaio que visa facilitar o acesso a serviços de imigração e regularização migratória para cidadãos estrangeiros.
                  </p>
                  <p>
                    A iniciativa oferece atendimento móvel em diferentes localidades, permitindo que os usuários realizem procedimentos como solicitação de residência, renovação de documentos e esclarecimento de dúvidas sobre a legislação migratória paraguaia.
                  </p>
                  <p>
                    O objetivo principal do Migramóvil é descentralizar os serviços de imigração, tornando-os mais acessíveis e eficientes para todos os interessados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 2 e 3 - Cronograma */}
        <AnimatedSection sectionId={2}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <Calendar className="w-8 h-8 text-green-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-400 mb-4">QUANDO E ONDE ACONTECE O PROGRAMA MIGRAMÓVIL?</h3>
                <p className="text-gray-300 mb-6">As jornadas ocorrem geralmente das 8h às 16h.</p>
                <p className="text-gray-300 mb-6">Para o ano de 2025, algumas das jornadas programadas incluem:</p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  {cronograma.map((item, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-xl p-4 border border-gray-600/30">
                      <div className="flex items-start mb-2">
                        <MapPin className="w-5 h-5 text-red-400 mr-2 mt-1 flex-shrink-0" />
                        <h4 className="font-semibold text-white">{item.cidade}</h4>
                      </div>
                      <div className="ml-7 space-y-1">
                        {item.datas.map((data, idx) => (
                          <div key={idx} className="text-sm text-gray-300 bg-gray-800/50 rounded-md px-2 py-1">
                            {data}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-center mb-2">
                    <ExternalLink className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="font-semibold text-blue-400">Para informações atualizadas sobre o calendário e locais de atendimento do Migramóvil, recomenda-se acompanhar os canais oficiais da Direção Nacional de Migrações:</span>
                  </div>
                  <div className="text-sm text-gray-300 space-y-1">
                    <div>Site oficial: <a href="https://migraciones.gov.py" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">migraciones.gov.py</a></div>
                    <div>Instagram: <a href="https://instagram.com/migracionespy" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">@migracionespy</a></div>
                    <div>Facebook: <a href="https://facebook.com/MigracionesPY" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">MigracionesPY</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 4 - Documentos Brasil */}
        <AnimatedSection sectionId={3}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <FileText className="w-8 h-8 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-400 mb-4">DOCUMENTOS PARA PROVIDENCIAR NO BRASIL</h3>
                <div className="space-y-3">
                  <div className="flex items-start p-3 bg-gray-900/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-gray-300 font-semibold">Certidão de Nascimento, Casamento ou Estado Civil</span>
                      <p className="text-gray-400 text-sm">atualizada e Apostilada em Cartório brasileiro</p>
                    </div>
                  </div>
                  <div className="flex items-start p-3 bg-gray-900/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-gray-300 font-semibold">Documento de Identidade</span>
                      <p className="text-gray-400 text-sm">menos de 10 anos de expedição</p>
                    </div>
                  </div>
                  <div className="flex items-start p-3 bg-gray-900/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-gray-300 font-semibold">Certificado de Antecedentes Criminais</span>
                      <p className="text-gray-400 text-sm">expedido pela POLÍCIA FEDERAL</p>
                      <p className="text-gray-400 text-sm">menos de 3 meses de expedição e Apostilada em cartório brasileiro</p>
                      <a href="https://servicos.pf.gov.br/epol-sinic-publico/" className="text-blue-400 hover:text-blue-300 text-sm" target="_blank" rel="noopener noreferrer">Emitir aqui</a>
                    </div>
                  </div>
                  <div className="flex items-start p-3 bg-gray-900/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-gray-300 font-semibold">Certificado de Vacinação da Febre Amarela</span>
                      <p className="text-gray-400 text-sm">sem ele você não consegue o permisso de entrada no Paraguai</p>
                      <a href="https://www.gov.br/pt-br/servicos/obter-o-certificado-internacional-de-vacinacao-e-profilaxia" className="text-blue-400 hover:text-blue-300 text-sm" target="_blank" rel="noopener noreferrer">Emitir aqui</a>
                    </div>
                  </div>
                  <div className="flex items-start p-3 bg-gray-900/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-gray-300 font-semibold">Duas fotos 3x4</span>
                      <p className="text-gray-400 text-sm">você precisará delas para tirar o certificado da Interpol</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-center">
                    <ExternalLink className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="text-sm text-blue-400">Fonte: <a href="https://migraciones.gov.py/residencia-temporal/" target="_blank" rel="noopener noreferrer">migraciones.gov.py/residencia-temporal/</a></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 5 - Documentos Paraguai */}
        <AnimatedSection sectionId={4}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <FileText className="w-8 h-8 text-purple-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-400 mb-4">DOCUMENTOS PARA PROVIDENCIAR NO PARAGUAI</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Permisso de Entrada ou Carimbo no Passaporte</h4>
                    <p className="text-gray-300 text-sm">fazer cópia autenticada em Cartório Paraguaio</p>
                  </div>
                  
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Certificado de Antecedentes expedido pela INTERPOL Não precisa para Menores de 14 Anos</h4>
                    <div className="text-gray-300 text-sm space-y-2">
                      <p>A INTERPOL geralmente está presente no Migramóvil, mas vou deixar o contato do Oficial Lívio Diaz da INTERPOL na Aduana e solicitá-lo com antecedência.</p>
                      <p className="text-yellow-400">Recomendo fortemente só entrar em contato se realmente vier para fazer a documentação.</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Certificado de Antecedentes para Estrangeiros</h4>
                    <p className="text-gray-300 text-sm mb-2">expedido pelo Departamento de Informática da Polícia Nacional</p>
                    <div className="text-gray-300 text-sm space-y-2">
                      <p>A Polícia Nacional geralmente está presente no Migramóvil, e mesmo assim recomendo solicitá-lo com antecedência com o Oficial da Interpol da Aduana.</p>
                      <p className="text-yellow-400">Aqui é a mesma situação do INTERPOL.</p>
                    <p className="text-blue-400 text-sm mt-2">
                      Contato do Oficial Aduana PY: <a href="https://urlcurta.top/hP08e" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                    </p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Documento de Identidade</h4>
                    <p className="text-gray-300 text-sm">Fazer cópia autenticada em Cartório Paraguaio</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-center">

                    <span className="text-sm text-blue-400">Ao chegar na Aduana do Paraguai onde da entrada na migração para pegar o permisso onde tem os guichê olhando para esquerda vai ver uma escada em caracol e subir no segundo piso e ali procure pela sala da Interpol. <br></br><a href="https://maps.app.goo.gl/N67wJiJgF8eUAomi7" target="_blank" rel="noopener noreferrer">VER NO MAPA</a></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 6 - Custos Brasil */}
        <AnimatedSection sectionId={5}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <DollarSign className="w-8 h-8 text-green-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white mb-4">Custos com cartório brasileiro</h4>
                <p className="text-gray-300 mb-4">O preço do Apostilamento de Haia, varia dependendo do estado do Brasil, mas a média costuma ser entre R$ 80,00 e R$ 160,00 por documento.</p>
                
                <div className="bg-yellow-900/20 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-yellow-400 mb-3">Custos com cartório brasileiro:</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left py-3 px-4 text-white">Item</th>
                          <th className="text-right py-3 px-4 text-white">Valor (R$)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-700/50">
                          <td className="py-3 px-4 text-gray-300">Certidão de nascimento atualizada</td>
                          <td className="py-3 px-4 text-right text-green-400">96,00</td>
                        </tr>
                        <tr className="border-b border-gray-700/50">
                          <td className="py-3 px-4 text-gray-300">Apostilamento da certidão de nascimento</td>
                          <td className="py-3 px-4 text-right text-green-400">75,00</td>
                        </tr>
                        <tr className="border-b border-gray-700/50">
                          <td className="py-3 px-4 text-gray-300">Apostilamento certificado de antecedentes criminais</td>
                          <td className="py-3 px-4 text-right text-green-400">75,00</td>
                        </tr>
                        <tr className="border-b border-gray-700/50">
                          <td className="py-3 px-4 text-gray-300">Selo autenticação certificado antecedentes criminais</td>
                          <td className="py-3 px-4 text-right text-green-400">12,00</td>
                        </tr>
                        <tr className="bg-green-900/30 border border-green-500/30">
                          <td className="py-3 px-4 text-white font-semibold">Totalizando</td>
                          <td className="py-3 px-4 text-right text-green-400 font-bold text-lg">258,00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="text-sm text-gray-400 italic">*Feito em Foz do Iguaçu - PR</div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 7 e 8 - Custos Paraguai */}
        <AnimatedSection sectionId={6}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <DollarSign className="w-8 h-8 text-red-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-400 mb-4">CUSTOS NO PARAGUAI</h3>
                <div className="space-y-3">
                  {custosParaguai.map((custo, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                      <span className="text-gray-300">{custo.item}</span>
                      <span className="text-red-400 font-semibold">{custo.valor}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-yellow-400 mr-2" />
                    <span className="text-sm text-yellow-400">*Atualizado 01/07/2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 9 - Quantidade de Cópias */}
        <AnimatedSection sectionId={7}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <FileText className="w-8 h-8 text-orange-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-400 mb-4">QUANTIDADE DE CÓPIAS AUTENTICADAS</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-3 px-4 text-white">Documento</th>
                        <th className="text-right py-3 px-4 text-white">Nº de Cópias Autenticadas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {copias.map((copia, index) => (
                        <tr key={index} className="border-b border-gray-700/50">
                          <td className="py-3 px-4 text-gray-300">{copia.documento}</td>
                          <td className="py-3 px-4 text-right">
                            <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-sm font-semibold">
                              {copia.quantidade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-3 bg-orange-900/20 rounded-lg border border-orange-500/30">
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 text-orange-400 mr-2" />
                    <span className="text-sm text-orange-400">**Essas cópias autenticadas em Cartório Paraguaio**</span>
                  </div>
                  <p className="text-sm text-orange-400 mt-1">Tem Escribanía no próprio Migramóvil então dá pra fazer tudo no mesmo lugar</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 10 - Prazos */}
        <AnimatedSection sectionId={8}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <Clock className="w-8 h-8 text-blue-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-400 mb-4">PRAZOS</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <p className="text-gray-300">
                      Dando entrada em todos os documentos na <span className="text-green-400 font-semibold">segunda ou terça-feira</span> os documentos ficaram prontos no <span className="text-green-400 font-semibold">sábado</span>.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <p className="text-gray-300">
                      Caso você dê entrada nos outros dias, você precisará verificar o prazo com a equipe do Migramóvil, eles informarão qual o prazo para ficar pronto os documentos.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      <span className="font-semibold text-green-400">Exemplo real:</span>
                    </div>
                    <p className="text-gray-300">No meu caso sempre para meus clientes eu peço estes documentos com antecedencia já para o primeiro dia do Mutirão e assim para já pegar a residência no sábado pela manhã e na proxima semana dar Entrada na Cédula.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 11 - Dicas Importantes */}
        <AnimatedSection sectionId={9}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <AlertTriangle className="w-8 h-8 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-400 mb-4">DICAS IMPORTANTES</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                    <p className="text-gray-300">
                      Embora o programa Migramóvil seja muito bom para agilizar o processo, ele ainda é um pouco confuso, pois não há sinalização clara dos passos a serem feitos, e as pessoas da organização do evento muitas vezes dão informações desencontradas, por isso veja ao redor se há mais de uma fila e para qual procedimento é cada fila, para você não acabar perdendo tempo na fila errada, ou pior descobrir que está faltando algum documento importante depois de horas na fila.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <p className="text-gray-300">
                      Há muitos brasileiros lá, principalmente estudantes, então todos se ajudam para entender e fazer o processo mais fácil, pois como já dito anteriormente, durante o dia que ocorre o mutirão é tudo muito confuso.
                    </p>
                  </div>
                  <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                    <p className="text-gray-300">
                      Não esqueça de fazer cópia autenticada do INTERPOL e do Certificado a Extranjeros, pois assim eles te devolvem o original ao final do processo e você pode utilizá-los para a cédula, se for fazer dentro do prazo de validade desses documentos, poupando assim mais algumas centenas de reais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 12 - Por que fazer sozinho */}
        <AnimatedSection sectionId={10}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <Heart className="w-8 h-8 text-red-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-400 mb-4">POR QUE FAZER SOZINHO?</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                    <p className="text-gray-300">
                      A primeira razão é o custo, como a demanda dos últimos anos tem aumentado significativamente então os advogados e empresas de assessoria tem aumentado o valor para a prestação do serviço. Já vi pediram <span className="text-red-400 font-semibold">R$ 10.000,00 a 20.000,00 por pessoa</span> para fazer o processo.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <p className="text-gray-300">
                      Outro fator é que você terá que ir obrigatoriamente ao Paraguai então, não faz sentido pagar essa quantia de dinheiro sendo que você ainda terá o custo de ir ao Paraguai a não ser que queira comodidade.
                    </p>
                  </div>
                  <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                    <p className="text-gray-300">
                      Lembrando que eu Trabalho de uma Forma diferente não praticando Cobranças abusivas e sim sendo justo nos preços de meu Trabalho. Então o fator custo seria o primeiro a ser levado em conta.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <p className="text-gray-300">
                      Não gosto de colocar preço no trabalho dos outros, mas sei o valor que o dinheiro tem pra mim e tambem a situação Real que o Brasil se Encontra.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 13 e 14 - Passo a Passo */}
        <AnimatedSection sectionId={11}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <CheckCircle className="w-8 h-8 text-green-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-400 mb-4">PASSO A PASSO</h3>
                <h4 className="text-lg font-semibold text-white mb-4">ROTEIRO PARA DIA DO MIGRAMÓVIL (Já dentro do Paraguai)</h4>
                <div className="space-y-3">
                  {passos.map((passo, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-900/50 rounded-lg">
                      <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-300">{passo}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                  <h5 className="font-semibold text-yellow-400 mb-3">ENDEREÇO NO PARAGUAI - IMPORTANTE!</h5>
                  <div className="text-gray-300 text-sm space-y-2">
                    <p>Importante usar o mesmo endereço tanto para o Certificado da INTERPOL como para Cédula quando for solicitá-la, se houver divergência de endereço dará problema no processo da cédula.</p>
                    <p>Para a cédula você precisará do Certificado de vida e Residência e este é obtido na comissaria do bairro onde você declarou que mora, então tome cuidado nessa parte para não travar seu processo e depois e ter que tirar um novo Certificado da INTERPOL.</p>
                    <p className="text-red-400">Vou deixar o contato Tambem de um Oficial da comissaria do Bairro Santa Ana e tambem o Endereço.</p>
                    <p className="text-blue-400 text-sm mt-2">
                      Contato do Oficial Ramirez Policia Nacional Santa Ana: <a href="https://urlcurta.top/BC3LL" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                    </p>
                    <p className="text-blue-400 text-sm mt-2">
                      Localização no Maps: <a href="https://maps.app.goo.gl/X22EakjogP6jYejr7" target="_blank" rel="noopener noreferrer">Ver MAPS</a>
                    </p>
                    <p className="text-green-400 font-semibold">*** Use Bairro Santa Ana como sendo seu endereço ***</p>
                    <p>não precisara comprovar endereço e este, será possível legalizar na própria delegacia de Identificaciones em CIUDAD DEL ESTE em outras cidades eu não sei dizer um endereço pois fiz em CDE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 15 - Quando Retirar Documentos */}
        <AnimatedSection sectionId={12}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <Calendar className="w-8 h-8 text-purple-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-400 mb-4">QUANDO RETIRO MEUS DOCUMENTOS?</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <p className="text-gray-300">
                      Caso você tenha feito tudo corretamente e conseguiu dar entrada no processo na segunda ou terça-feira (no primeiro e segundo dia do Migramóvil) Seus documentos de residência já estarão prontos para serem retirados no sábado pela manhã no mesmo local onde você deu entrada no processo.
                    </p>
                  </div>
                  <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                    <p className="text-gray-300">
                      A Vantagem de conseguir fazer tudo no primeiro e segundo dia é que você já terá boa parte dos documentos prontos para a cédula e na semana seguinte já poderá dar continuidade no processo e solicitar a cédula, sem ter que fazer uma outra viagem só para esse trâmite, isso pode ter economizar muito tempo e dinheiro! Por isso digo, mesmo que esteja cheio e você saia tarde de lá vale a pena aguardar, isso te economizará tempo e dinheiro depois.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 16 - Cédula Paraguaia */}
        <AnimatedSection sectionId={13}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <FileText className="w-8 h-8 text-cyan-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-400 mb-4">CÉDULA PARAGUAIA</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <p className="text-gray-300">
                      Agora que você já conseguiu sua residência temporária, já pode dar entrada na cédula Paraguaia, que é um requisito básico para obter a residência permanente posteriormente.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <p className="text-gray-300">
                      Caso você tenha conseguido seus documentos de residência e os certificados que têm validade ainda estiverem dentro do prazo, você poderá utilizá-los, sem problema nenhum, para a cédula, economizando assim algumas centenas de reais.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <p className="text-gray-300">
                      Vamos explicar o processo a seguir, da mesma forma que fizemos com a residência.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <p className="text-gray-300">
                      Os documentos que estiverem dentro da validade, você já pode contar como pronto e não há necessidade de fazê-lo novamente! Se você fez a quantidade de cópias sugerida na primeira parte, você também já terá a quantidade correta de cópias autenticadas em escribanías paraguaias, caso não tenha, não se preocupe, há uma escribanía ao lado da Delegacia de Identificação em CDE.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 17 - Documentos para Cédula Brasil */}
        <AnimatedSection sectionId={14}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <FileText className="w-8 h-8 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-400 mb-4">DOCUMENTOS PARA PROVIDENCIAR NO BRASIL</h3>
                <div className="space-y-3">
                  <div className="flex items-start p-3 bg-gray-900/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-gray-300 font-semibold">Certidão de Nascimento, Casamento ou Estado Civil</span>
                      <p className="text-gray-400 text-sm">atualizada e Apostilada em Cartório brasileiro</p>
                      <p className="text-gray-400 text-sm">(fazer cópia autenticada em escribanía paraguaia)</p>
                      <p className="text-green-400 text-sm">se o Apostilamento estiver dentro da validade (3 meses) pode ser usada a mesma da residência</p>
                    </div>
                  </div>
                  <div className="flex items-start p-3 bg-gray-900/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-gray-300 font-semibold">Documento de Identidade</span>
                      <p className="text-gray-400 text-sm">menos de 10 anos de expedição</p>
                      <p className="text-gray-400 text-sm">(fazer cópia autenticada em escribanía paraguaia)</p>
                    </div>
                  </div>
                  <div className="flex items-start p-3 bg-gray-900/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-gray-300 font-semibold">Certificado de Antecedentes Criminais</span>
                      <p className="text-gray-400 text-sm">expedido pela POLÍCIA FEDERAL</p>
                      <p className="text-gray-400 text-sm">menos de 3 meses de expedição e Apostilada em cartório brasileiro</p>
                      <a href="https://www.gov.br/pt-br/servicos/emitir-certidao-de-antecedentes-criminais" className="text-blue-400 hover:text-blue-300 text-sm" target="_blank" rel="noopener noreferrer">Emitir aqui</a>
                      <p className="text-green-400 text-sm">se o Apostilamento estiver dentro da validade (3 meses) pode ser usada o mesmo da residência</p>
                    </div>
                  </div>
                  <div className="flex items-start p-3 bg-gray-900/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-gray-300 font-semibold">Duas fotos 3x4</span>
                      <p className="text-gray-400 text-sm">você precisará delas para tirar o certificado da INTERPOL</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-center">
                    <ExternalLink className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="text-sm text-blue-400">
                      <a href="https://www.policianacional.gov.py/identificaciones/cedula-de-identidad-por-primera-vez-a-extranjeros-con-radicacion-permanente/" target="_blank" rel="noopener noreferrer">Saiba mais</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 18 - Documentos para Cédula Paraguai */}
        <AnimatedSection sectionId={15}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <FileText className="w-8 h-8 text-purple-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-400 mb-4">DOCUMENTOS PARA PROVIDENCIAR NO PARAGUAI</h3>
                <div className="space-y-3">
                  {[
                    "Certificado de radicación permanente original, otorgado por la Dirección General de Migraciones",
                    "Fotocopia autenticada por Escribano Público del Carné de Admisión Permanente, otorgado por la Dirección General de Migraciones",
                    "Original del Certificado de Vida y Residencia expedido por la Comisaria Jurisdiccional de su domicilio certificado por el Dpto. de Personal de la Policía Nacional, y la Ayudantía de la Comandancia; o aquel expedido por el Juzgado de Paz Jurisdiccional correspondiente a su domicilio",
                    "Original del informe de Antecedentes Penales expedido por el Departamento de INTERPOL con aclaración de que fue consultada la filial de Interpol del país de origen, certificado por el Departamento Personal y la Ayudantía de la Comandancia de la Policía Nacional y legalizado Ministerio del Interior",
                    "Original del Certificado de Antecedentes a Extranjeros expedido por el Departamento de Informatica de la Policía Nacional",
                    "Fotocopia autenticada por escribano público del carnet de Registro de Extranjeros gestionado en el Departamento de Investigación de delitos de la Policía Nacional"
                  ].map((doc, index) => (
                    <div key={index} className="flex items-start p-3 bg-gray-900/50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{doc}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-center">
                    <ExternalLink className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="text-sm text-blue-400">
                      <a href="https://www.policianacional.gov.py/identificaciones/cedula-de-identidad-por-primera-vez-a-extranjeros-con-radicacion-permanente/" target="_blank" rel="noopener noreferrer">Fonte oficial</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 19 - Custos para Cédula */}
        <AnimatedSection sectionId={16}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <DollarSign className="w-8 h-8 text-green-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-400 mb-4">CUSTOS DA CÉDULA</h3>
                <div className="space-y-3">
                  {custosCedula.map((custo, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                      <span className="text-gray-300">{custo.item}</span>
                      <span className="text-green-400 font-semibold">{custo.valor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 20, 21 e 22 - Passo a Passo para Cédula */}
        <AnimatedSection sectionId={17}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start mb-6">
              <CheckCircle className="w-8 h-8 text-green-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-400 mb-4">PASSO A PASSO</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">1. Certificado de Vida e Residência</h4>
                    <p className="text-gray-300 text-sm">
                      IR ATÉ Comissaria e Perguntar pelo Oficial Ramirez e pedir CERTIFICADO DE VIDA E RESIDÊNCIA para a Cédula Paraguaia fale que o Anderson Indicou
                    </p>
                    <p className="text-blue-400 text-sm mt-2">
                      Endereço da comissaria Santa Ana: <a href="https://maps.app.goo.gl/eq2Vi5qjHiGq8wij9" target="_blank" rel="noopener noreferrer">Ver no mapa</a>
                    </p>
                  </div>
  
                  
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">2. Entrada na Cédula</h4>
                    <p className="text-gray-300 text-sm">
                      Depois de ter recebido esses documentos, você terá os 8 documentos obrigatórios para dar entrada na cédula.
                    </p>
                    <p className="text-gray-300 text-sm">
                      Na delegacia de identificação você vai entrar na porta e olhar a sua direita e vai ver o caixa 9 e pergunta pelo Oficial Sabino no Balcão, ele ira revisar se seus documentos estão corretos, e te direcionar alguma mesa vaga para dar entrada, eles coletarão seus dados biométricos, você fará foto e pagará a taxa de Gs. 960.000 que é o total da Legalização INTERPOL e Carnet de Registro de Estrangeiro Para o Oficial Sabino e  Gs. 8.500 na mesa que deu entrada 
                    </p>
                    <p className="text-gray-300 text-sm">
                      Após isso receberá um protocolo para retirada do documento guarde ele e tire uma foto.
                    </p>
                    <p className="text-blue-400 text-sm mt-2">
                      Endereço onde da entrada na cédula: <a href="https://maps.app.goo.gl/K7ZCzA3QYH7std8E8" target="_blank" rel="noopener noreferrer">Ver no mapa</a>
                    </p>
                  </div>
                  
                  <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                    <h4 className="font-semibold text-red-400 mb-2">⚠️ Prazo de Entrega</h4>
                    <p className="text-gray-300 text-sm">
                      O Prazo para ficar pronto a Cédula é de 90 Dias, mas já vi chegando com menos de 30 Dias.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                    <p className="text-green-400 font-semibold">
                      E é isso! agora só resta aguardar sua Cédula Paraguaia
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-700/30 rounded-lg">
                  <p className="text-gray-400 text-sm">
                    Lembrando que estamos considerando que você participou do Migramóvil e está com os documentos obtidos dentro do prazo de validade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PÁGINA 23 - Considerações Finais */}
        <AnimatedSection sectionId={18}>
          <div className="bg-gradient-to-r from-red-900/20 to-blue-900/20 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-start mb-6">
              <Heart className="w-8 h-8 text-red-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-400 mb-4">CONSIDERAÇÕES FINAIS</h3>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Este é um guia baseado em minha experiencia nos mutirão, é importante salientar que o processo ou prazo ou até mesmo o programa Migramóvil pode ser alterado, então é muito importante acompanhar as redes sociais da departamento de Migraciones do Paraguay e também o site oficial do governo paraguaio, para não terem surpresas indesejadas.
                  </p>
                  <div className="text-center">
                    <p className="text-xl font-semibold text-green-400">
                      🇧🇷 Espero que este guia tenha sido útil para vocês e que o seu processo seja muito mais tranquilo , e o guia é exclusivo apenas para fazer o procedimento em Ciudad del Este 🇵🇾
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-red-400 mr-2" />
            <span className="text-gray-400">Guia Migramóvil Paraguai 2025</span>
          </div>
          <p className="text-gray-500 text-sm">
            Informações baseadas em experiências reais. Sempre consulte fontes oficiais.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;