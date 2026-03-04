/**
 * Actualiza el año del copyright automáticamente
 */
document.addEventListener('DOMContentLoaded', function() {
  const copyrightElement = document.getElementById('copyright-year');
  if (copyrightElement) {
    copyrightElement.textContent = new Date().getFullYear();
  }
});
