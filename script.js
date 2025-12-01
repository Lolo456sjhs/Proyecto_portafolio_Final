document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 900, once: true, easing: 'ease-in-out' });
  particlesJS.load('particles-js', 'particles.json', function() {
    console.log('particles.js loaded');
  });
  loadProjects();
});

const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1";
const itsonId = '252072';

async function loadProjects() {
  try {
    const res = await fetch(`${API_BASE}/publicProjects/${itsonId}`);
    if (!res.ok) throw new Error("Error al cargar proyectos");
    const projects = await res.json();

    const container = document.getElementById('projects-list');
    container.innerHTML = '';

    projects.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'project-card';

      if(proj.images && proj.images.length > 0){
        const img = document.createElement('img');
        img.src = proj.images[0]; 
        img.alt = proj.title;
        img.className = 'project-image';
        img.style.width = '100%';
        img.style.borderRadius = '10px';
        img.style.marginBottom = '10px';
        card.appendChild(img);
      }

      const title = document.createElement('h3');
      title.textContent = proj.title;

      const description = document.createElement('p');
      description.textContent = proj.description;

      const tech = document.createElement('div');
      tech.className = 'project-tech';
      tech.textContent = proj.technologies.join(", ");

      const repo = document.createElement('a');
      repo.href = proj.repository || '#';
      repo.target = '_blank';
      repo.className = 'project-repo';
      repo.textContent = proj.repository ? 'Ver repositorio' : '';

      card.append(title, description, tech, repo);
      container.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    document.getElementById('projects-list').textContent = "No se pudieron cargar los proyectos.";
  }
}
