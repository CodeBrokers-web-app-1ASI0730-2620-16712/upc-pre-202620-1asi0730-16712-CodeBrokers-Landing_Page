document.addEventListener('DOMContentLoaded', () => {
    const segmentButtons = document.querySelectorAll('[data-audience-option]');
    const languageButtons = document.querySelectorAll('[data-language-option]');
    const body = document.body;
    let currentLanguage = 'es';

    const i18n = {
        es: {
            nav: ['Ventajas Clínicas', 'Alertas', 'Planes', 'Seguridad'],
            audience: ['Médicos', 'Familiares'],
            headerCta: ['Unirme como proveedor', 'Comenzar Plan Familiar'],
            heroPro: ['Optimice el seguimiento preventivo con <span class="highlight-text">monitoreo de precisión 24/7.</span>', 'Reduzca reingresos hospitalarios y mejore el control de pacientes crónicos con alertas en tiempo real e integración con su flujo clínico. Tome decisiones con datos de alta frecuencia en una sola plataforma.', 'Unirme como proveedor <span class="material-symbols-outlined">arrow_forward</span>', 'Solicitar información técnica'],
            heroFamily: ['La tranquilidad de saber que tus padres están bien, <span class="highlight-text">sin interrumpir su día.</span>', 'Monitoreo automático de signos vitales que avisa a la familia y a la clínica si algo no está normal. Todos ven el mismo estado actualizado, sin depender de llamadas constantes ni de que alguien recuerde avisar.', 'Comenzar ahora <span class="material-symbols-outlined">arrow_forward</span>', 'Conocer cómo funciona'],
            metrics: ['Precisión de Alertas', 'Telemetría Continua', 'Pacientes Monitoreados'],
            familyFlow: ['Un ecosistema conectado, sin esfuerzo', 'Cuatro pilares que mantienen comunicados al paciente, la familia y los profesionales de salud sin llamadas constantes ni incertidumbre.'],
            familySteps: [
                ['Sensor Activo', 'El adulto mayor usa un sensor discreto o una aplicación simple en su dispositivo habitual.'],
                ['Tiempo Real', 'Los datos se recopilan y analizan 24/7 de forma automática, identificando cambios importantes.'],
                ['Alerta Inmediata', 'Si hay una anomalía, se avisa a la clínica y a la familia al instante de manera coordinada.'],
                ['Estado Compartido', 'Todos ven el mismo estado actualizado, reduciendo ansiedad y duplicación de esfuerzos.']
            ],
            familyMonitor: ['Monitoreo profesional <span>en tu bolsillo.</span>', 'Visualiza el estado de salud de tus seres queridos con claridad profesional. Una interfaz pensada para mostrar solo lo importante de un vistazo.'],
            familyMonitorFeatures: [
                ['Métricas clave simplificadas', 'Ritmo cardíaco, oxígeno y actividad diaria presentados en formatos fáciles de entender.'],
                ['Historial y tendencias', 'Observa la evolución en el tiempo y comparte datos precisos durante las consultas médicas.']
            ],
            clinical: ['Flujo clínico integrado', 'Un entorno diseñado para minimizar la carga cognitiva del profesional médico, entregando información precisa exactamente cuando se requiere.'],
            clinicalCards: [
                ['Fase 1', 'Captura Continua', 'Recopilacion constante de variables biometricas cruciales (FC, SpO2, PA y Temp) de forma pasiva, continua y sin friccion para el paciente.'],
                ['Fase 2', 'Análisis Algorítmico', 'Procesamiento automatizado mediante modelos predictivos para detectar anomalías tempranas y patrones subclínicos de descompensación.'],
                ['Fase 3', 'Alertas Integradas', 'Notificación inmediata en el panel médico y a la red de cuidado con prioridad escalonada, evitando la fatiga por alarmas innecesarias.']
            ],
            alerts: ['Protocolo de Alerta Inteligente', 'El sistema analiza tendencias multivariable en lugar de aisladas, garantizando una respuesta oportuna sin saturar al equipo medico.'],
            alertFeatures: [
                ['Cero Falsos Positivos', 'Algoritmos de validacion cruzada y filtrado de artefactos de movimiento antes de activar alertas.'],
                ['Escalamiento Multicanal', 'Notificaciones pushed a App, SMS, correo o llamadas de emergencia segun el nivel de severidad determinado.'],
                ['Contexto Historico', 'Cada alerta incluye una ventana previa de 72 horas para evaluar la trayectoria del paciente en segundos.']
            ],
            pricingPro: ['Planes diseñados para la escala de su institución médica', 'Supervisión preventiva, reducción de reingresos y gestión multi-paciente con flexibilidad y precisión.', 'Más Recomendado'],
            pricingFamily: ['Planes de monitoreo adaptados a tu familia', 'Elige el nivel de acompañamiento y tranquilidad que mejor se ajuste a tus necesidades.', 'Más Elegido'],
            proPlans: [
                ['Clinica Basica', 'Clinica Basica', 'Ideal para consultas privadas y primeros consultorios.', '$99 <span>/ mes</span>', ['Hasta 25 pacientes activos', 'Alertas tempranas en tiempo real', 'Acceso al dashboard clinico web', 'Historial de 30 dias de tendencias', 'Soporte tecnico estandar'], 'Comenzar con Clinica Basica'],
                ['Clinica Pro', 'Clinica Pro', 'Para centros medicos con multiples especialistas.', '$299 <span>/ mes</span>', ['Hasta 100 pacientes activos', 'Trazabilidad de alertas con multiples cuidadores', 'Algoritmo de triaje predictivo', 'Integracion HL7 / FHIR basica', 'Exportacion de reportes clinicos en PDF', 'Soporte 24/7 prioritario'], 'Lograr la escala'],
                ['Institucional', 'Institucional', 'Para redes hospitalarias y proveedores a gran escala.', 'Personalizado', ['Pacientes e infraestructura ilimitados', 'Servidores dedicados y cumplimiento regulatorio', 'Gestion de permisos y roles avanzados (RBAC)', 'EMR / HIS Integracion directa a medida', 'Gestor de cuenta dedicado y SLA de 99.99%'], 'Contactar a consultor tecnico']
            ],
            familyPlans: [
                ['Plan Basico', 'Plan Basico', 'Ideal para probar el servicio con 1 familiar conectado.', 'Gratis <span>/ para siempre</span>', ['Vista simple: todo bien o necesita atencion', 'Alertas automaticas cuando un dato este fuera de rango', 'Boton "ya atendi a mi familiar"', 'Historial de los ultimos 7 dias', '1 familiar conectado', 'Modo de captura simple con botones grandes', 'Boton de emergencia SOS basico'], 'Comenzar Gratis'],
                ['Plan Familiar', 'Plan Familiar', 'Coordinacion integral y tranquilidad compartida.', '$9.99 <span>/ mes</span>', ['Hasta 3 familiares conectados con roles diferenciados', 'Alerta detallada: que paso, gravedad y estado de atencion', 'Ver quien ya reviso o atendio la alerta', 'Metrica exacta que origino la alerta', 'Historial ampliado a 30 dias', 'Modo asistido para cuidadores', 'Contactos autorizados y notificaciones por rol'], 'Elegir Plan Familiar'],
                ['Plan Plus', 'Familiar Plus', 'Para cuidado de alta complejidad y supervision medica.', '$19.99 <span>/ mes</span>', ['Hasta 6 familiares conectados', 'Historial ilimitado y reportes PDF', 'Niveles de acceso y privacidad por familiar', 'Vinculacion directa con medico o clinica VitaLink', 'Linea directa con enfermeria 24/7', 'Trazabilidad completa de cada alerta', 'Soporte tecnico prioritario'], 'Elegir Plan Plus']
            ],
            testimonials: ['La tranquilidad de miles de familias', 'Historias de quienes ya confian el cuidado de sus padres a VitaLink.'],
            testimonialCards: [
                ['"Ahora puedo trabajar tranquila sabiendo que si algo pasa, recibire una alerta inmediata. Es un cambio de vida."', 'Elena R.', 'Hija de usuario'],
                ['"Lo que mas valoro es que mi padre no siente que lo estamos vigilando. Sigue con su rutina normal."', 'Carlos M.', 'Hijo de usuario'],
                ['"La precision de los datos y la rapidez de las alertas ayudan a actuar antes de que el problema avance."', 'Dra. Sofia G.', 'Geriatra']
            ],
            security: ['Seguridad de grado medico. Cumplimiento normativo total.', 'La privacidad del paciente y la integridad de los datos de salud son nuestra prioridad absoluta.'],
            securityCards: [
                ['Cifrado E2E', 'Todos los datos en transito y en reposo se cifran con estandar AES-256 bits y TLS 1.3 de extremo a extremo.'],
                ['HIPAA & GDPR', 'Nuestra infraestructura cumple estrictamente con las normativas internacionales mas exigentes en proteccion de datos de salud.'],
                ['Control de Acceso (RBAC)', 'Gestion granular de roles para clinicas, medicos de cabecera y familiares, garantizando acceso autorizado por niveles.']
            ],
            ctaPro: ['Dale a tus pacientes continuidad clinica <span>sin friccion.</span>', 'Implementacion guiada para monitoreo preventivo, alertas oportunas y coordinacion clinica desde una sola plataforma.', '<span class="material-symbols-outlined">stethoscope</span> Unirme como proveedor de salud'],
            ctaFamily: ['Dale a tus padres la tranquilidad y el cuidado <span>que merecen.</span>', 'Instalacion guiada en menos de 5 minutos, sin alterar su independencia ni rutinas diarias, y sin necesidad de conocimientos tecnologicos complejos.', '<span class="material-symbols-outlined">favorite</span> Comenzar a cuidar a mis padres'],
            footer: ['Cuidando conexiones, transformando la salud mediante tecnologia de prevencion continua.', 'Navegacion', 'Legal & Privacidad', 'Contacto', 'Ventajas Clinicas', 'Alertas Inteligentes', 'Planes', 'Seguridad', 'Privacidad', 'Terminos de Servicio', 'Aviso Legal', 'Cumplimiento HIPAA', '© 2026 VitaLink. Todos los derechos reservados. Desarrollado con los mas altos estandares de salud digital.']
        },
        en: {
            nav: ['Clinical Benefits', 'Alerts', 'Plans', 'Security'],
            audience: ['Clinicians', 'Families'],
            headerCta: ['Join as provider', 'Start Family Plan'],
            heroPro: ['Optimize preventive follow-up with <span class="highlight-text">24/7 precision monitoring.</span>', 'Reduce hospital readmissions and improve chronic patient control with real-time alerts and clinical workflow integration. Make decisions with high-frequency data in one platform.', 'Join as provider <span class="material-symbols-outlined">arrow_forward</span>', 'Request technical info'],
            heroFamily: ['Peace of mind knowing your parents are well, <span class="highlight-text">without interrupting their day.</span>', 'Automatic vital-sign monitoring that alerts the family and clinic if something is not normal. Everyone sees the same updated status without constant calls or manual check-ins.', 'Start now <span class="material-symbols-outlined">arrow_forward</span>', 'See how it works'],
            metrics: ['Alert Accuracy', 'Continuous Telemetry', 'Patients Monitored'],
            familyFlow: ['A connected ecosystem, without effort', 'Four pillars keep the patient, family, and healthcare team aligned without constant calls or uncertainty.'],
            familySteps: [
                ['Active Sensor', 'The older adult uses a discreet sensor or a simple app on their usual device.'],
                ['Real Time', 'Data is collected and analyzed automatically 24/7, identifying important changes.'],
                ['Immediate Alert', 'If an anomaly appears, the clinic and family are notified instantly in a coordinated way.'],
                ['Shared Status', 'Everyone sees the same updated status, reducing anxiety and duplicated effort.']
            ],
            familyMonitor: ['Professional monitoring <span>in your pocket.</span>', 'View your loved ones health status with professional clarity. The interface is designed to show only what matters at a glance.'],
            familyMonitorFeatures: [
                ['Simplified key metrics', 'Heart rate, oxygen, and daily activity are shown in easy-to-understand formats.'],
                ['History and trends', 'Track changes over time and share precise data during medical appointments.']
            ],
            clinical: ['Integrated clinical workflow', 'An environment designed to reduce clinicians cognitive load, delivering precise information exactly when it is needed.'],
            clinicalCards: [
                ['Phase 1', 'Continuous Capture', 'Constant collection of key biometric variables (HR, SpO2, BP, and Temp) passively, continuously, and without friction for the patient.'],
                ['Phase 2', 'Algorithmic Analysis', 'Automated processing through predictive models to detect early anomalies and subclinical decompensation patterns.'],
                ['Phase 3', 'Integrated Alerts', 'Immediate notification in the medical dashboard and care network with tiered priority, reducing unnecessary alarm fatigue.']
            ],
            alerts: ['Intelligent Alert Protocol', 'The system analyzes multivariable trends instead of isolated readings, ensuring timely response without overwhelming the care team.'],
            alertFeatures: [
                ['Zero False Positives', 'Cross-validation algorithms and motion artifact filtering before activating alerts.'],
                ['Multichannel Escalation', 'Push notifications to app, SMS, email, or emergency calls based on the severity level.'],
                ['Historical Context', 'Each alert includes a 72-hour lookback window so the patient trajectory can be assessed in seconds.']
            ],
            pricingPro: ['Plans designed for your medical institution scale', 'Preventive supervision, readmission reduction, and multi-patient management with flexibility and precision.', 'Most Recommended'],
            pricingFamily: ['Monitoring plans tailored to your family', 'Choose the level of support and peace of mind that best fits your needs.', 'Most Chosen'],
            proPlans: [
                ['Basic Clinic', 'Basic Clinic', 'Ideal for private practices and first offices.', '$99 <span>/ month</span>', ['Up to 25 active patients', 'Real-time early alerts', 'Access to the clinical web dashboard', '30-day trend history', 'Standard technical support'], 'Start with Basic Clinic'],
                ['Clinic Pro', 'Clinic Pro', 'For medical centers with multiple specialists.', '$299 <span>/ month</span>', ['Up to 100 active patients', 'Alert traceability with multiple caregivers', 'Predictive triage algorithm', 'Basic HL7 / FHIR integration', 'Clinical PDF report exports', 'Priority 24/7 support'], 'Scale your clinic'],
                ['Enterprise', 'Enterprise', 'For hospital networks and large-scale providers.', 'Custom', ['Unlimited patients and infrastructure', 'Dedicated servers and regulatory compliance', 'Advanced permission and role management (RBAC)', 'Custom EMR / HIS direct integration', 'Dedicated account manager and 99.99% SLA'], 'Contact a technical consultant']
            ],
            familyPlans: [
                ['Basic Plan', 'Basic Plan', 'Ideal to try the service with 1 connected family member.', 'Free <span>/ forever</span>', ['Simple status: all good or needs attention', 'Automatic alerts when a reading is out of range', '"I already helped my relative" confirmation button', 'Simple history for the last 7 days', '1 connected family member', 'Simple capture mode with large buttons', 'Basic SOS emergency button'], 'Start Free'],
                ['Family Plan', 'Family Plan', 'Integrated coordination and shared peace of mind.', '$9.99 <span>/ month</span>', ['Up to 3 connected family members with different roles', 'Detailed alert: what happened, severity, and care status', 'See who already reviewed or handled the alert', 'Exact metric that triggered the alert', 'Expanded 30-day history', 'Assisted mode for delegated caregivers', 'Authorized contacts and role-based notifications'], 'Choose Family Plan'],
                ['Plus Plan', 'Family Plus', 'For complex care and medical supervision.', '$19.99 <span>/ month</span>', ['Up to 6 connected family members', 'Unlimited history and PDF reports', 'Access and privacy levels by family member', 'Direct connection with a VitaLink doctor or clinic', 'Direct nursing line 24/7', 'Complete traceability for every alert', 'Priority technical support'], 'Choose Plus Plan']
            ],
            testimonials: ['Peace of mind for thousands of families', 'Stories from people who already trust VitaLink to help care for their parents.'],
            testimonialCards: [
                ['"Now I can work calmly knowing that if something happens, I will receive an immediate alert. It has changed my life."', 'Elena R.', 'Daughter of user'],
                ['"What I value most is that my father does not feel watched. He keeps his normal routine."', 'Carlos M.', 'Son of user'],
                ['"The precision of the data and the speed of the alerts help families act before a problem escalates."', 'Dr. Sofia G.', 'Geriatrician']
            ],
            security: ['Medical-grade security. Complete regulatory compliance.', 'Patient privacy and health data integrity are our absolute priority.'],
            securityCards: [
                ['E2E Encryption', 'All data in transit and at rest is encrypted with AES-256 and TLS 1.3 end to end.'],
                ['HIPAA & GDPR', 'Our infrastructure strictly follows the most demanding international health data protection standards.'],
                ['Access Control (RBAC)', 'Granular role management for clinics, primary doctors, and families, ensuring authorized access by level.']
            ],
            ctaPro: ['Give your patients clinical continuity <span>without friction.</span>', 'Guided implementation for preventive monitoring, timely alerts, and clinical coordination from one platform.', '<span class="material-symbols-outlined">stethoscope</span> Join as healthcare provider'],
            ctaFamily: ['Give your parents the peace of mind and care <span>they deserve.</span>', 'Guided setup in less than 5 minutes, without disrupting their independence or daily routines, and without complex technology skills.', '<span class="material-symbols-outlined">favorite</span> Start caring for my parents'],
            footer: ['Caring for connections, transforming health through continuous prevention technology.', 'Navigation', 'Legal & Privacy', 'Contact', 'Clinical Benefits', 'Intelligent Alerts', 'Plans', 'Security', 'Privacy', 'Terms of Service', 'Legal Notice', 'HIPAA Compliance', '© 2026 VitaLink. All rights reserved. Built with the highest digital health standards.']
        }
    };

    const setText = (selector, value) => {
        const element = document.querySelector(selector);
        if (element) element.textContent = value;
    };

    const setHTML = (selector, value) => {
        const element = document.querySelector(selector);
        if (element) element.innerHTML = value;
    };

    const setAllText = (selector, values) => {
        document.querySelectorAll(selector).forEach((element, index) => {
            if (values[index] !== undefined) element.textContent = values[index];
        });
    };

    function setAudienceButton(button, icon, label) {
        button.innerHTML = `<span class="material-symbols-outlined">${icon}</span>${label}`;
    }

    function setTwoLineCards(selector, values) {
        document.querySelectorAll(selector).forEach((card, index) => {
            const data = values[index];
            if (!data) return;
            const heading = card.querySelector('h3');
            const paragraph = card.querySelector('p');
            if (heading) heading.textContent = data[0];
            if (paragraph) paragraph.textContent = data[1];
        });
    }
//Codigo agregado
     function setPricingCards(selector, values, ribbon) {
        const grid = document.querySelector(selector);
        if (!grid) return;
        grid.querySelectorAll('.price-card').forEach((card, index) => {
            const data = values[index];
            if (!data) return;
            const [badge, title, desc, price, features, action] = data;
            card.querySelector('.card-badge').textContent = badge;
            card.querySelector('h3').textContent = title;
            card.querySelector('.card-desc').textContent = desc;
            card.querySelector('.price-tag').innerHTML = price;
            card.querySelectorAll('.price-features li').forEach((item, itemIndex) => {
                if (features[itemIndex]) {
                    item.innerHTML = `<span class="material-symbols-outlined">check</span> ${features[itemIndex]}`;
                }
            });
            card.querySelector('.btn').textContent = action;
        });
        const ribbonEl = grid.querySelector('.popular-ribbon');
        if (ribbonEl) ribbonEl.textContent = ribbon;
    }

    function applyLanguage() {
        const text = i18n[currentLanguage];
        const isFamily = body.dataset.audience === 'pacientes';
        document.documentElement.lang = currentLanguage;

        setAllText('.nav-links .nav-item', text.nav);
        setAudienceButton(document.querySelector('[data-audience-option="profesionales"]'), 'stethoscope', text.audience[0]);
        setAudienceButton(document.querySelector('[data-audience-option="pacientes"]'), 'family_home', text.audience[1]);
        setText('#header-cta-btn', text.headerCta[isFamily ? 1 : 0]);

        setHTML('.view-profesionales h1', text.heroPro[0]);
        setText('.view-profesionales p', text.heroPro[1]);
        setHTML('.view-profesionales .btn-primary', text.heroPro[2]);
        setText('.view-profesionales .btn-outline', text.heroPro[3]);
        setHTML('.view-pacientes h1', text.heroFamily[0]);
        setText('.view-pacientes p', text.heroFamily[1]);
        setHTML('.view-pacientes .btn-primary', text.heroFamily[2]);
        setText('.view-pacientes .btn-outline', text.heroFamily[3]);
        document.querySelector('.view-pacientes .btn-outline')?.setAttribute('href', '#como-funciona-familia');
        setAllText('.metric-label', text.metrics);

        setText('#como-funciona-familia .section-header h2', text.familyFlow[0]);
        setText('#como-funciona-familia .section-header p', text.familyFlow[1]);
        setTwoLineCards('.family-step-card', text.familySteps);
        setHTML('.family-monitor-copy h2', text.familyMonitor[0]);
        setText('.family-monitor-copy > p', text.familyMonitor[1]);
        setTwoLineCards('.family-feature-list li', text.familyMonitorFeatures);

        setText('#ventajas-clinicas .section-header h2', text.clinical[0]);
        setText('#ventajas-clinicas .section-header p', text.clinical[1]);
        document.querySelectorAll('.step-card').forEach((card, index) => {
            const data = text.clinicalCards[index];
            if (!data) return;
            card.querySelector('.step-number').textContent = data[0];
            card.querySelector('h3').textContent = data[1];
            card.querySelector('p').textContent = data[2];
        });

        setText('#alertas .alert-info h2', text.alerts[0]);
        setText('#alertas .section-subtitle', text.alerts[1]);
        setTwoLineCards('#alertas .features-list li', text.alertFeatures);

        const pricing = isFamily ? text.pricingFamily : text.pricingPro;
        setText('#pricing-title', pricing[0]);
        setText('#pricing-subtitle', pricing[1]);
        setPricingCards('.pricing-grid.view-profesionales', text.proPlans, text.pricingPro[2]);
        setPricingCards('.pricing-grid.view-pacientes', text.familyPlans, text.pricingFamily[2]);

        setText('#testimonios-familia .section-header h2', text.testimonials[0]);
        setText('#testimonios-familia .section-header p', text.testimonials[1]);
        document.querySelectorAll('.testimonial-card').forEach((card, index) => {
            const data = text.testimonialCards[index];
            if (!data) return;
            card.querySelector('p').textContent = data[0];
            card.querySelector('strong').textContent = data[1];
            card.querySelector('small').textContent = data[2];
        });