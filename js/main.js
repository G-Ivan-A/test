async function includeHTML(id, file) {
  try {
    const el = document.getElementById(id);
    if (!el) return;
    const resp = await fetch(file, {cache: "no-cache"});
    if (!resp.ok) { el.innerHTML = ''; return; }
    el.innerHTML = await resp.text();
    // After inserting header/footer, optionally run on-load hooks
    runAfterIncludes();
  } catch (e) {
    console.error("Include failed:", e);
  }
}

function runAfterIncludes(){
  // mark active nav link
  const links = document.querySelectorAll('.site-nav a');
  links.forEach(a=>{
    if(a.href === location.href || a.getAttribute('href') === location.pathname.split('/').pop()){
      a.classList.add('active');
    }
  });
}

// Expose a function to load header/footer easily
document.addEventListener('DOMContentLoaded', ()=>{
  includeHTML('header', 'partials/header.html');
  includeHTML('footer', 'partials/footer.html');
});
