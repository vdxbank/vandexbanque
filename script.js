let selectedPlan = '';

// Fonction pour basculer le menu mobile
function toggleMenu() {
    const burger = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
}

// Fonction pour fermer le menu mobile
function closeMenu() {
    const burger = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    burger.classList.remove('active');
    navLinks.classList.remove('active');
    body.classList.remove('menu-open');
}

function scrollToPlans() {
    document.getElementById('plans').scrollIntoView({ behavior: 'smooth' });
    closeMenu();
}

function openForm(planName) {
    selectedPlan = planName;
    const planSelect = document.getElementById('plan');

    if (planName === 'Plan Basic') planSelect.value = 'Basic - 5 500£';
    else if (planName === 'Plan Premium') planSelect.value = 'Premium - 10 000£';
    else if (planName === 'Plan Elite') planSelect.value = 'Elite - 15 000£';

    document.getElementById('formModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    closeMenu();
}

function closeForm() {
    document.getElementById('formModal').style.display = 'none';
    document.getElementById('investmentForm').reset();
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    const modal = document.getElementById('formModal');
    if (event.target == modal) {
        closeForm();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeForm();
        closeZoomModal();
    }
});

// Fermer le menu mobile si on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Fonction pour le slider unique
function slideMedia(direction) {
    const slider = document.getElementById('mediaSlider');
    const scrollAmount = 345; // Largeur média (320px) + gap (25px)
    
    if (direction === 'prev') {
        slider.scrollLeft -= scrollAmount;
    } else {
        slider.scrollLeft += scrollAmount;
    }
}

// Fonction pour zoomer sur les images
function zoomImage(img) {
    const modal = document.getElementById('imageZoomModal');
    const zoomedImg = document.getElementById('zoomedImage');
    zoomedImg.src = img.src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeZoomModal() {
    const modal = document.getElementById('imageZoomModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Ajout du scroll tactile et drag pour le slider
function initSlider() {
    const slider = document.getElementById('mediaSlider');
    
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Support tactile
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

function submitForm(event) {
    event.preventDefault();

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const plan = document.getElementById('plan').value;
    const paiement = document.getElementById('paiement').value;

    let montant = '150£';
    if (plan.includes('Premium') || plan.includes('10 000')) montant = '400 £';
    else if (plan.includes('Elite') || plan.includes('15 000')) montant = '500 £';

    const message = `*🔔 NOUVELLE DEMANDE D'INVESTISSEMENT - Vantex Banque*%0A%0A` +
                  `*👤 INFORMATIONS PERSONNELLES*%0A` +
                  `Nom complet : ${prenom} ${nom}%0A` +
                  `📧 Email : ${email}%0A` +
                  `*💰 DÉTAILS DE L'INVESTISSEMENT*%0A` +
                  `Plan choisi : ${plan}%0A` +
                  `Montant à investir : ${montant}%0A` +
                  `💳 Moyen de paiement : ${paiement}%0A%0A` +
                  `*📅 DATE DE LA DEMANDE*%0A` +
                  `${new Date().toLocaleString('fr-FR')}%0A%0A` +
                  `_🔔 Nouvel investisseur potentiel - À contacter dans les plus brefs délais_`;

    const whatsappNumber = "33756911686";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');
    closeForm();

    alert('✅ Votre demande a été prise en compte ! Vous allez être redirigé vers WhatsApp pour finaliser votre investissement avec un conseiller.');
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    
    // Vérifier si plus de médias sont nécessaires
    console.log('Slider unique initialisé avec vidéos et images mélangés');
});