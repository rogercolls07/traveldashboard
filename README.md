[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/iWvIi_ol)

Travel Dashboard és una aplicació web interactiva desenvolupada exclusivament amb **JavaScript Vanilla**, HTML5 i CSS. Aquest projecte funciona per a viatgers, permetent consultar informació essencial en temps real abans de visitar una ciutat.

El projecte s'ha dissenyat tant per mòbils com per pantalles grans, garantint una experiència d'usuari fluida en qualsevol dispositiu sense l'ús de llibreries externes.

Funcionalitats Principals:
* **Selector de Destinacions:** Permet triar entre 5 ciutats predefinides (Barcelona, London, Paris, New York, Tokyo).
* **Resum de la Ciutat:** Mostra la informació bàsica de la destinació (país, temperatura actual i moneda local).
* **Widget Meteorològic:** Obté dades en temps real sobre la temperatura i calcula la probabilitat de pluja, mostrant un avís visual i textual.
* **Calculadora de Divises:** Permet introduir una quantitat en Euros (EUR) i fer la conversió automàtica a la moneda de la ciutat de destí.
* **Conseller de Viatge:** Genera un consell dinàmic personalitzat basat en la temperatura i les condicions meteorològiques de la destinació.
* **Millora Extra (Mapa):** Utilitza google maps per posar el mapa d'una de les ciutats predefinides.

Tecnologies Utilitzades:
* **Frontend:** HTML5, CSS (Flexbox & CSS Grid, Custom Properties).
* **Lògica:** JavaScript.
* **Asincronia:** Ús exclusiu de `fetch` i `async / await` per al consum d'APIs.
* **Control de Versions:** Git i GitHub.
* **Desplegament:** Vercel. Limk Web: https://traveldashboard-ten.vercel.app/

APIs Integrades:
L'aplicació es comunica amb les següents APIs públiques per obtenir dades en temps real:
1. **[Open-Meteo API](https://open-meteo.com/):** Per a les dades meteorològiques de la destinació.
2. **[Frankfurter API](https://www.frankfurter.app/):** Per a l'actualització de les taxes de canvi de moneda.
4. **Google Maps (Embed):** Per generar la visualització del mapa.

Disseny i UI/UX:
* Estructura visual neta i clara, ocultant els *widgets* fins que l'usuari interactua amb el selector.
* Elements interactius amb transicions suaus (`hover`, `active`).
* Botó flotant *Scroll to Top* per millorar la navegació en pantalles petites.
* Tota l'estructura de dades es guarda en un objecte local (nom, país, latitud, longitud i moneda).
