// Referencias a elementos del DOM
const select = document.getElementById('ciudad');
const resultado = document.getElementById('resultado');
const cargando = document.getElementById('cargando');

// Evento al cambiar la ciudad
select.addEventListener('change', () => {
  const code = select.value;
  if (!code) return;

  // Ocultar resultado y mostrar cargando
  resultado.style.display = 'none';
  cargando.style.display = 'block';

  // Petición a la API
  fetch(`https://api.boostr.cl/weather/${code}.json`)
    .then(response => response.json())
    .then(data => {
      // Si la respuesta es exitosa
      if (data.status === 'success') {
        const clima = data.data;

        resultado.innerHTML = `
          <h3 class="text-light">${clima.city}</h3>
          <p><strong>🌡 Temperatura:</strong> ${clima.temperature}°C</p>
          <p><strong>⛅ Condición:</strong> ${clima.condition}</p>
          <p><strong>💧 Humedad:</strong> ${clima.humidity}%</p>
          <p class="text-muted">🕒 ${clima.updated_at}</p>
        `;
      } else {
        resultado.innerHTML = `<p class="text-danger">❌ No se pudo obtener el clima.</p>`;
      }

      // Ocultar spinner y mostrar resultado con animación
      cargando.style.display = 'none';
      resultado.classList.remove('animate__fadeIn');
      void resultado.offsetWidth; // reinicia animación
      resultado.classList.add('animate__fadeIn');
      resultado.style.display = 'block';
    })
    .catch(() => {
      // En caso de error de red o servidor
      cargando.style.display = 'none';
      resultado.style.display = 'block';
      resultado.innerHTML = `<p class="text-danger">❌ Error al conectar con la API.</p>`;
    });
});
