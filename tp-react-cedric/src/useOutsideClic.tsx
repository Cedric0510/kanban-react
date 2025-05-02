// import { useEffect } from 'react';

// function useOutsideClick(ref, callback) {
//   useEffect(() => {
//     // Fonction de gestion du clic
//     function handleClickOutside(event) {
//       // Si la ref existe et que le clic n'est pas dans l'élément référencé
//       if (ref.current && !ref.current.contains(event.target)) {
//         callback(event);
//       }
//     }

//     // Ajouter l'écouteur d'événement sur le document
//     document.addEventListener('mousedown', handleClickOutside);

//     // Nettoyage de l'effet lors du démontage ou du changement de ref/callback
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [ref, callback]); // Déclenche l'effet si la ref ou le callback change
// }

// export default useOutsideClick;
