document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        document.body.classList.remove('isPreload')
    }
}