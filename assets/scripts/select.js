const customSelect = document.querySelector('.custom-select');
const selected = customSelect.querySelector('.selected');
const options = customSelect.querySelector('.options');
const hiddenInput = document.getElementById('search-engine');

selected.addEventListener('click', () => {
    options.classList.toggle('active');
});

options.addEventListener('click', (e) => {
    const option = e.target.closest('.option');
    if (option) {
        const value = option.getAttribute('data-value');
        setSearchEngine(value);
        hiddenInput.dispatchEvent(new Event('input'));
    }
});

document.addEventListener('click', (e) => {
    if (!customSelect.contains(e.target)) {
        options.classList.remove('active');
    }
});
  
function setSearchEngine(value) {
    const option = options.querySelector(`.option[data-value="${value}"]`);
    if (!option) {
        console.warn(`Option with value "${value}" not found.`);
        return;
    }
    
    const imgSrc = option.querySelector('img').src;
    selected.innerHTML = `<img src="${imgSrc}" alt="">`;
    hiddenInput.value = value;
    
    options.classList.remove('active');
}
