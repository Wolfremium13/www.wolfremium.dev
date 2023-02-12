# Big Data

## Introducción

El big data permite recopilar información de las visitas de la página web, redes
sociales, registros de llamadas y otros orígenes de datos para perfeccionar la
experiencia de interacción, así como optimizar el valor que se ofrece.

En nuestro caso nos servirá para alimentar de datos a nuestra inteligencia
artificial.

Dado que los proyectos de Big Data a han madurado en los últimos años desde
módulos de silos hasta software empresarial y debido a la creciente complejidad
de la escala algorítmica y de datos (3 Vs `[Volumen, Velocidad y Veracidad]`),
surgió la necesidad de ciclos de desarrollo cortos y lanzamientos frecuentes.

## Desafío del TDD en Big Data

- Manejar grandes volumenes de datos implica que no se puede probar todo, porque
  no es rentable y si lo fuese sería poco eficiente.
- El gran número de tecnologías en el ecosistema y la computación distribuida lo
  hace díficil de probar.
- Se requieren conocimientos amplios del negocio o los datos para saber si el
  resultado es realmente correcto e incluso así no se llega al 100% de
  efectividad si el volumen es muy grande.
