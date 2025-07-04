mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWxkaWF6NTIiLCJhIjoiY21jYTJ3bjF5MXBmYzJrcHcwM2Y5ZW14YSJ9.hfBzEthhzvozXmNeDApGtg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-streets-v12',
  center: [-122.33, 47.6], // Default center (Seattle)
  zoom: 9
});

// Toggle Sidebar
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleSidebar');
toggleBtn.addEventListener('click', () => {
  sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
});

// Search by ZIP/Address
function searchLocation() {
  const query = document.getElementById('search').value;
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`)
    .then(res => res.json())
    .then(data => {
      if (data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        map.flyTo({ center: [lng, lat], zoom: 13 });
      }
    });
}
