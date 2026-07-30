if (sessionStorage.getItem('splashVisto')) {
  document.documentElement.classList.add('no-splash');
}
 
// 2) Marca que ya se ha visto en esta sesión
if (!sessionStorage.getItem('splashVisto')) {
  sessionStorage.setItem('splashVisto', '1');
}
 