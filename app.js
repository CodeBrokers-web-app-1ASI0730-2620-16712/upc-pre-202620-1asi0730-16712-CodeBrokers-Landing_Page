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