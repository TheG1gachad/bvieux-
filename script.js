document.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    
    const speedFactor = -0.23;

    document.querySelector('.circle1').style.transform = `translateY(${scrollTop * speedFactor}px)`;
    document.querySelector('.circle2').style.transform = `translateY(${scrollTop * speedFactor}px)`;
    document.querySelector('.circle3').style.transform = `translateY(${scrollTop * speedFactor}px)`;
    document.querySelector('.circle4').style.transform = `translateY(${scrollTop * speedFactor}px)`;
    document.querySelector('.circle5').style.transform = `translateY(${scrollTop * speedFactor}px)`;
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('certificateForm');
    const submitButton = form.querySelector('.form-button');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Afficher "Chargement..." et désactiver le bouton
        submitButton.textContent = 'Chargement...';
        submitButton.disabled = true;

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        const canvas = document.getElementById('certificateCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = 800;
        canvas.height = 600;
        
        const imageUrl = 'https://i.postimg.cc/gJ3XTQj4/certificat.png';
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = imageUrl;

        image.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'black';
            
            ctx.fillText(name, canvas.width / 2, canvas.height * 0.40);
            ctx.fillText(email, canvas.width / 2, canvas.height * 0.58);

            canvas.toBlob(function(blob) {
                saveAs(blob, 'certificat-chadistan.png');
            }, 'image/png');

            submitButton.textContent = 'Téléchargé';
            submitButton.disabled = false;
        };

        image.onerror = function() {
            console.error('Erreur de chargement de l\'image.');

            submitButton.textContent = 'Envoyer';
            submitButton.disabled = false;
        };
    });

    function dataURLToBlob(dataURL) {
        const parts = dataURL.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const raw = window.atob(parts[1]);
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);

        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const horizontalScrollContainer = document.querySelector('.horizontal-scroll-container');
    
    horizontalScrollContainer.addEventListener('wheel', function(event) {
        if (event.deltaY !== 0) {
            event.preventDefault();
            horizontalScrollContainer.scrollLeft += event.deltaY;
        }
    });
});

document.addEventListener('scroll', function() {
    const progressIndicator = document.querySelector('.progress-indicator');
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollPercent = (scrollTop / totalHeight) * 100;
    progressIndicator.style.width = `${scrollPercent}%`;
});

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('show');
});


const cards = document.querySelectorAll('.portrait-card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

function openMailClient() {
    const subject = encodeURIComponent(document.getElementById('objectcontactus').value);
    const message = encodeURIComponent(document.getElementById('messagecontactus').value);

    const mailtoUrl = `mailto:the-gigachad@outlook.fr?subject=${subject}&body=${message}`;

    window.location.href = mailtoUrl;

    return false;
}