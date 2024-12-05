import React, { useState } from "react";
import "./App.css";

// Correspondance entre les faces et leurs rotations finales
const faceRotations = [
  { x: 0, y: 0 }, // Face 1 (Star)
  { x: 0, y: 90 }, // Face 2 (Leaf)
  { x: 0, y: 180 }, // Face 3 (Brand Name)
  { x: 0, y: -90 }, // Face 4 (Paw)
  { x: 90, y: 0 }, // Face 5 (Slogan)
  { x: -90, y: 0 }, // Face 6 (Cloud)
];

const App = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 }); // Rotation finale
  const [isRolling, setIsRolling] = useState(false); // Indique si le dé est en train de tourner

  const rollDice = () => {
    if (isRolling) return; // Évite plusieurs lancements simultanés
    setIsRolling(true);

    const rollDuration = 2000; // Durée totale de l'animation en ms
    const finalTransitionDuration = 1000; // Durée pour l'arrêt fluide (1s)
    const intervalDelay = 50; // Fréquence de mise à jour (en ms)

    let currentX = rotation.x;
    let currentY = rotation.y;

    // Animation en temps réel
    const interval = setInterval(() => {
      currentX += 20; // Incrémente l'angle X
      currentY += 30; // Incrémente l'angle Y
      setRotation({ x: currentX, y: currentY });
    }, intervalDelay);

    // Arrête l'animation après la durée définie
    setTimeout(() => {
      clearInterval(interval); // Stoppe l'animation en temps réel

      // Sélectionne une face finale aléatoire
      const faceIndex = Math.floor(Math.random() * 6);
      const finalRotation = faceRotations[faceIndex];

      // Ajoute des tours complets pour une transition fluide
      const smoothX = currentX + (360 - (currentX % 360)) + finalRotation.x;
      const smoothY = currentY + (360 - (currentY % 360)) + finalRotation.y;

      // Transition vers la rotation finale
      setRotation({ x: smoothX, y: smoothY });

      // Permet de réafficher le bouton après l'arrêt complet
      setTimeout(() => {
        setIsRolling(false); // Le bouton redevient visible après l'arrêt complet
      }, finalTransitionDuration); // Ajout du délai pour couvrir la transition
    }, rollDuration);
  };

  return (
    <div className="container">
      <header>
        <img className="logo" src="../public/images/logo-ctrlz.png" alt="" />
      </header>
      <div className="scene">
        <div
          className="cube"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isRolling ? "none" : "transform 1s ease-out",
          }}
        >
          {/* Face 1: Image étoile */}
          <div className="cube-face">
            <img src="/images/Star.png" alt="Star" />
          </div>
          {/* Face 2: Image brin d'herbe */}
          <div className="cube-face">
            <img src="/images/Leaf.png" alt="Leaf" />
          </div>
          {/* Face 3: Texte "Brand Name" */}
          <div className="cube-face">
            <span>Brand Name</span>
          </div>
          {/* Face 4: Image patte de chien */}
          <div className="cube-face">
            <img src="/images/Paw.png" alt="Paw" />
          </div>
          {/* Face 5: Texte "Slogan" */}
          <div className="cube-face">
            <span>Slogan</span>
          </div>
          {/* Face 6: Image nuage */}
          <div className="cube-face">
            <img src="/images/Cloud.png" alt="Cloud" />
          </div>
        </div>
      </div>

      {/* Le bouton reste dans la structure mais devient invisible pendant le lancer */}
      <button
        className={`roll-button ${isRolling ? "hidden" : ""}`}
        onClick={rollDice}
      >
        Roll the Dice
      </button>
    </div>
  );
};

export default App;
