// Importation des fonctions nécessaires depuis d'autres modules JavaScript.
// createScene est une fonction qui configure la scène 3D, la caméra et le renderer.
// createRoad est une fonction qui ajoute une route ou un objet similaire à la scène.
import { createScene } from './scene'; 
import { createRoad } from './rue';
import {create_lumiere_ui} from './lumiere_settings';

import {create_person} from './person';
import {create_person_coté} from './person';
import {create_car} from './car';
// Fonction principale qui initie et gère le rendu de la scène.
function main() {
  // Création de la scène, de la caméra et du renderer via la fonction createScene.
  // Ces éléments sont retournés sous forme d'un objet destructuré.
  const { scene, camera, renderer } = createScene();
  
  // Appel de la fonction createRoad pour ajouter un élément (route) à la scène.
  // La fonction prend la scène comme argument pour y ajouter des objets.
  const { updateSolarPanelInclinaison } = createRoad(scene);
  create_lumiere_ui(scene)
 // Interface utilisateur pour l'inclinaison du panneau solaire
  const inclinaisonSelect = document.getElementById('inclinaison');
  inclinaisonSelect.addEventListener('change', (event) => {
    const angle = parseInt(event.target.value); // Récupère l'inclinaison sélectionnée
    updateSolarPanelInclinaison(angle); // Met à jour l'inclinaison du panneau solaire
  });
  

  create_person(scene)
  create_person_coté(scene)
  create_car(scene)
  // Fonction d'animation appelée en boucle pour rendre la scène en continu.
  function animate() {
    // Affiche la scène dans le renderer en utilisant la caméra pour déterminer le point de vue.
    renderer.render(scene, camera);

    // Planifie l'exécution continue de la fonction animate grâce à requestAnimationFrame.
    // Cela permet d'obtenir une animation fluide (synchronisée avec le rafraîchissement de l'écran).
    requestAnimationFrame(animate);
  }

  // Démarre l'animation en appelant la fonction animate.
  window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  

  // Démarre l'animation en appelant la fonction `animate`.
  animate();
}

// Appel de la fonction principale main pour lancer l'application.
main();