export const renderLoading = (isLoading, form) => {
    const button = form.querySelector('.popup__submit-button')
    if(isLoading) {
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = 'Сохранить'
    }
}
