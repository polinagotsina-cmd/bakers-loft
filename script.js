// === 1. ПРОКРУТКА МЫШКОЙ ДЛЯ МЕНЮ КАТЕГОРИЙ ===
const menuSlider = document.querySelector('.all_categories_menu');
let isMenuDown = false;
let startMenuX, scrollMenuLeft;

menuSlider.addEventListener('mousedown', (e) => {
    isMenuDown = true;
    menuSlider.style.cursor = 'grabbing';
    startMenuX = e.pageX - menuSlider.offsetLeft;
    scrollMenuLeft = menuSlider.scrollLeft;
});
menuSlider.addEventListener('mouseleave', () => { isMenuDown = false; menuSlider.style.cursor = 'grab'; });
menuSlider.addEventListener('mouseup', () => { isMenuDown = false; menuSlider.style.cursor = 'grab'; });
menuSlider.addEventListener('mousemove', (e) => {
    if (!isMenuDown) return;
    e.preventDefault();
    const x = e.pageX - menuSlider.offsetLeft;
    const walk = (x - startMenuX) * 1.5;
    menuSlider.scrollLeft = scrollMenuLeft - walk;
});
menuSlider.style.cursor = 'grab';


// === 2. ПРОКРУТКА МЫШКОЙ ДЛЯ БЛОКА С ФОТКАМИ ===
const photosContainer = document.querySelector('.photos_of_food');
let isPhotosDown = false;
let startPhotosX, scrollPhotosLeft;

photosContainer.addEventListener('mousedown', (e) => {
    // Ищем внутренний контейнер .menu_photos, который сейчас активен
    const activePhotos = photosContainer.querySelector('.category_content.show .menu_photos');
    if (!activePhotos) return;

    isPhotosDown = true;
    activePhotos.style.cursor = 'grabbing';
    startPhotosX = e.pageX - activePhotos.offsetLeft;
    scrollPhotosLeft = activePhotos.scrollLeft;
});

photosContainer.addEventListener('mouseleave', () => {
    isPhotosDown = false;
    const activePhotos = photosContainer.querySelector('.category_content.show .menu_photos');
    if (activePhotos) activePhotos.style.cursor = 'grab';
});

photosContainer.addEventListener('mouseup', () => {
    isPhotosDown = false;
    const activePhotos = photosContainer.querySelector('.category_content.show .menu_photos');
    if (activePhotos) activePhotos.style.cursor = 'grab';
});

photosContainer.addEventListener('mousemove', (e) => {
    if (!isPhotosDown) return;
    e.preventDefault();
    const activePhotos = photosContainer.querySelector('.category_content.show .menu_photos');
    if (!activePhotos) return;

    const x = e.pageX - activePhotos.offsetLeft;
    const walk = (x - startPhotosX) * 1.5; // Скорость прокрутки
    activePhotos.scrollLeft = scrollPhotosLeft - walk;
});

// === 3. ПЕРЕКЛЮЧЕНИЕ КАТЕГОРИЙ ПРИ КЛИКЕ ===
const buttons = document.querySelectorAll('.menu_item');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Перевешиваем оранжевый овал
        const currentActiveBtn = document.querySelector('.menu_item.active');
        if (currentActiveBtn) currentActiveBtn.classList.remove('active');
        button.classList.add('active');

        // Получаем имя категории из атрибута data-category
        const targetId = button.getAttribute('data-category'); 
        
        // Находим блок, который открыт сейчас, и скрываем его
        const currentShowContent = document.querySelector('.category_content.show');
        if (currentShowContent) currentShowContent.classList.remove('show');
        
        // Находим новый блок по ID и показываем его
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('show');
        }
    });
});