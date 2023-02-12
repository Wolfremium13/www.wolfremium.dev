# Agile

## Historia

### Inicios

Lo primero que hay que decir es que lo que ahora se conoce como Agile surgió a
partir de los años ochenta del pasado siglo (e incluso antes) en forma de
metodologías “ligeras” de desarrollo software, como respuesta a las limitaciones
de las metodologías “pesadas” tipo Waterfall.

> Realmente la metodología en sí se basa en metodologías de otro tipo de
> ingenierías o del ámbito científico haciendo una aproximación de cómo debería
> ser en el software.

Sin embargo el desarrollo de programas, por su propia naturaleza, no se ajusta
muy bien a dichas condiciones: la complejidad de los problemas que se suelen
resolver mediante software, la indefinición de los requisitos del cliente, la
importancia de la interacción entre el producto final y sus usuarios, el
continuo cambio tecnológico, etc. hacían imposible que aspectos como la solución
dada al problema del cliente, los requisitos, el diseño e incluso la
arquitectura del programa pudieran mantenerse constantes durante el desarrollo.
Y el modelo en cascada no está preparado para encajar bien esos cambios.

La facilidad para “componentizar”/modularizar el desarrollo, crear prototipos o
automatizar las pruebas y los ( comparativamente) bajos costes de realizar
cambios que aporta su naturaleza “inmaterial”. A partir de los pasados años
ochenta empiezan a aparecer una serie de nuevos modelos para el desarrollo de
software a medida, tales como el Desarrollo Rápido de Aplicaciones, el Espiral o
el Proceso Unificado y -más tarde- metodologías como XP (Extreme Programming) o
FDD (Feature Driven Development). Estas metodologías se basan en un desarrollo
iterativo e incremental en el que los requisitos y las soluciones van
evolucionando gracias a la comunicación con los usuarios y la colaboración entre
equipos multidisciplinares autoorganizados.

### El cambio

En febrero de 2001 diecisiete expertos en desarrollo de software publicaron el
“Manifesto for Agile Software Development”, que dio un nombre, una carta de
naturaleza y una “marca” a todos esos métodos. Básicamente el Manifiesto consta
de cuatro puntos en los que se da prioridad a los individuos y las
interacciones, al software que funciona, a la colaboración con el cliente y a la
respuesta ante el cambio.

Es importante señalar que cuando se habla de Agile se suele hablar en realidad
de alguna de las metodologías precursoras, en particular de dos que son las más
aceptadas (y que son anteriores al Manifiesto):

- Scrum (1995), un marco iterativo e incremental para la gestión de proyectos,
  inicialmente propuesto para proyectos de desarrollo de productos y cuyo uso se
  ha centrado en proyectos de desarrollo de software.
- XP (Extreme Programming, 1996) una metodología iterativa de desarrollo de
  software que aboga por entregas frecuentes de software en ciclos de desarrollo
  cortos y que recibe ese nombre por su énfasis en llevar al extremo esas buenas
  prácticas.

Agile es un conjunto de valores, completamente independiente de la ejecución.
Específicamente, son estos valores:

- Individuos e interacciones sobre procesos y herramientas
- Software de trabajo sobre documentación completa
- Colaboración con el cliente sobre negociación de contratos
- Responder al cambio en lugar de seguir un plan

Estos valores abarcan los procesos y la toma de decisiones. No son reglas y
prácticas para desarrollar software. Las reglas y prácticas provienen de los
marcos ágiles (Scrum, XP, Kanban, SAFe). Los marcos brindan instrucciones
detalladas sobre cómo un equipo puede aprender a pensar de manera ágil y
fomentar los valores ágiles. No son ágiles en sí mismos. Son herramientas que,
cuando se usan correctamente, pueden respaldar los valores ágiles.

> En realidad muchos de los principios de Agile (como por ejemplo incrementar la
> flexibilidad o la comunicación) son ideas de sentido común pensadas para
> enmendar el mal funcionamiento de las metodologías tradicionales en ciertos
> escenarios y para arreglar equipos de proyecto disfuncionales

### Ventajas / Desventajas

Los beneficios en cuanto a flexibilidad, adaptación, comunicación y coordinación
que Agile aporta en escenarios inciertos y volátiles son evidentes. Sin embargo,
en estos años se han alzado voces críticas con esta filosofía debido a posibles
limitaciones como las siguientes:

- Está muy enfocada en la captura de requisitos y el desarrollo, pero pone un
  foco escaso en el diseño y en la experiencia global del usuario de la solución
- Falta de estructura y documentación
- Puede aumentar el riesgo de una expansión incontrolada del alcance del
  proyecto
- Solo funciona bien con desarrolladores experimentados
- Requiere reuniones muy frecuentes con los clientes, con el consiguiente coste
- Dificultad para escalar a proyectos grandes y con personal distribuido
  geográficamente

> Algunas organizaciones encuentran difícil implantar Agile en toda su extensión
> -con el cambio de cultura que requiere- y se quedan en sus prácticas
> superficiales

> Ese es también el motivo por el que las prácticas de Agile llevan años
> evolucionando para solucionar sus carencias y ser aplicables en escenarios más
> generales. En cualquier caso, es evidente que **la flexibilidad que aporta
> Agile no es gratis** y a veces sus costes pueden superar a sus beneficios.

## Dark Agile

El problema es cuando un equipo comienza a **utilizar un marco Agile de forma
incorrecta**. El equipo comienza a centrarse más en su adherencia al proceso que
en mantenerse fieles a los valores ágiles. Esto es Dark Agile.

- El descubrimiento comienza a ser secuencial, donde los requisitos impulsan el
  diseño, que a su vez impulsa el código. Esto se opone a que el trabajo se
  defina y diseñe de manera colaborativa.
- Los resultados esperados comienzan a ser productos , a diferencia de los
  resultados comerciales (resultados).
- Todo riesgo está al final del proceso , en oposición a los riesgos que se
  abordan por adelantado, lo antes posible.

### Síntomas de Dark Agile

Estos síntomas pueden manifestarse de muchas formas. El cambio suele venir de
arriba hacia abajo. Surgirán fechas límite para funciones específicas. Se le
empezará a decir al equipo qué construir y no qué problemas resolver. La
gerencia, o el propietario del producto, comienza a presionar al equipo para que
haga más y más rápidamente. Básicamente, el equipo no puede organizarse por sí
mismo ni participar en el proceso de planificación.

Puede ser que el desarrollo sea completamente ágil, pero el proceso de
descubrimiento no lo es. El descubrimiento se convierte en un proceso en el que
alguien tiene una idea, la convierte en la hoja de ruta sin validación, el
propietario del producto reúne exhaustivamente todos los requisitos necesarios,
el diseño le pone maquillaje y se envía al desarrollo para construir. No hay
prueba ni validación de la idea antes del desarrollo. Una vez que llega a los
desarrolladores, comienzan la primera parte del proyecto que es ágil, pero en
este punto ya es demasiado tarde. No hay pruebas de supuestos antes del
desarrollo. Todo el riesgo se sigue guardando para el final del proceso.

Es fácil caer en estos malos hábitos, especialmente si trabaja en una
organización donde el resto de la empresa opera de manera no ágil. Para encajar
en las actividades de planificación de la organización, se le pide al grupo de
desarrollo que haga hojas de ruta y compromisos, de modo que los otros grupos de
la organización puedan planificar en consecuencia. Dark Agile puede volverse
inevitable.

### Disminuir Dark Agile

Se deben rastrear sus prácticas hasta su raíz en los valores ágiles y socializar
este vínculo con frecuencia. Los valores de Agile deben ser la lente a través de
la cual se vean las estrategias y decisiones. Deben fomentarse las discusiones
frecuentes y detalladas sobre los valores y cómo se aplican a las situaciones
cotidianas. Además de esto, debe observarse un enfoque en los tres principios
que combaten los síntomas comunes de Dark Agile.

- Los riesgos se abordan lo antes posible en el proceso, en lugar de al final.
- El trabajo se define y diseña de manera colaborativa, en lugar de secuencial.
- La atención se centra en resolver problemas, no en implementar funciones.

> No existe una fórmula mágica para conquistar Dark Agile, solo una búsqueda
> incesante de inculcar los valores de Agile.

## Agile Inception o Sprint Cero

Empezamos cada proyecto con Inception, un ejercicio de descubrimiento que crea
el escenario para un producto y produce un backlog inicial. Claro hasta ese
momento no hay software que funcione, pero se tiene una idea clara de por qué
queremos construir algo.

Típicamente el proceso toma un día completo, y la asistencia incluye a todo el
equipo (desarrolladores, gerentes de producto, diseñadores, analistas de
soporte, UX, ingenieros, testers, etc.).

### Objetivos, riesgos y anti-objetivos

En lugar de intentar priorizar al inicio, lo mejor es empezar por capturar todo
lo que se ha podido identificar con los participantes de la sesión y luego
agrupar los temas para los objetivos: políticas de la empresa, propuestas de
valor, riesgos sensibles al tiempo, y posibles nuevas características.

Un buen contrapunto a las metas son los «anti-objetivos» o el «no-haremos», un
término para capturar todo lo que podría ser importante algún día, pero que
representa una amenaza para lograr las metas.

Es importante asegurarse de que cada elemento en los anti-objetivos pertenece
allí, y todo el mundo está de acuerdo (y sabe por qué).

> Los riesgos son interesantes porque la intuición humana es a menudo el mejor
> indicador de los problemas futuros.

## ¿Qué es Flaccid Scrum o Flaccid Agile?

Flaccid Scrum es descrito por Martin Fowler como un escenario en el que un
equipo de Scrum "adopta las prácticas de Scrum, y tal vez incluso los principios
de Scrum", pero "después de un tiempo el progreso es lento porque el código base
es un desastre", porque "no han pagado suficiente atención a la calidad interna
de su software ”. Se postula que esto ocurre porque Scrum está orientado a la
gestión en lugar de a la ingeniería, y este desaire a Scrum no es un desconocido
para la comunidad de Scrum.

> Un ejemplo de esto lo describe "Uncle Bob" con una analogía en la qué una
> metodología muy rápida tiene una deuda técnica muy grande no se puede ser
> rápido y escribir código de calidad al mismo tiempo.

## El marketing alredor de Agile

- **¿Cómo las empresas ven el Agile como una forma de vender proyectos o
  cursos?**

  Realmente no hay una respuesta concreta a esta pregunta, debido a qué cada
  empresa lo interpreta de forma distinta, esto crea varias vertientes en el
  mundo Agile. Hay muchas personas qué piensan que el objetivo original de
  restablecer la La conexión de negocio con el área técnica no ha sido
  suficiente.

  > Por lo tanto vamos a tener empresas que vendan sus cursos como la última
  > coca-cola del desierto y si no te funciona es qué no eres lo suficientemente
  > ágil. La contra parte, la qué te dice: "ey! esto no se aprende en 1 día".

- **¿Cómo afecta qué ten la medalla de Agile sabiendo programar pero sin saber
  diseño, refactoring o pruebas unitarias?**

  Este tipo de cosas suceden muchas veces debido a que los "developers" no les
  interesa tanto el tema cómo a los "proyect managers", esto acarrea una serie
  de problemas a la larga debido a estos últimos, exigen la mayoría de veces a
  las personas a su cargo qué su idea de Agile (o cómo se lo vendieron) es lo
  mejor para su equipo y mejorar los ritmos de trabajo y productividad. Al mismo
  tiempo no tienen cuidado de lo qué en realidad piden al no tener conocimientos
  adecuados del tema.

  > Realmente si lo miras desde fuera tampoco está mal intencionado, pero si
  > reconozco qué si le das una herramienta a alguien se puede hacer daño a él y
  > a los demás si la usa mal o no conoce lo malo de esta.

  Por la parte de los "developers" qué se auto determinan Agile por haber hecho
  un cursito o hacer algún test y desconocen lo mencionado en la pregunta es muy
  probable qué apliquen de forma pobre la idea de Agile si este no busca a
  diario crecer como programador escribiendo mejor código para las personas.
  Otros buscan hacer su empresa Agile y se dan de morros contra sus jefes o
  negocio. Tengo la impresión de qué sucede algo parecido a lo anterior pero
  ahora es el developer el que quiere cambiar, podría usar la misma analogía
  pero realmente no es la misma.

  > Creo qué es más importante ir haciendo tú pequeñas cosas Agile en el día a
  > día qué buscar cambiar la cultura de toda la empresa lo cuál puede
  > destinarla al fracaso a todos los niveles si no lo hacen bien y a tiempo.

## Innovation theather - Steve Blank

A medida que las organizaciones crecen, comienzan a priorizar el proceso sobre
el producto. Eso impide la innovación real. Cuando las organizaciones se dan
cuenta de esto, por lo general responden de tres maneras: contratando
consultores para hacer una reorganización (eso es "organizational theater"),
adoptando nuevos procesos como hackatones para estimular la innovación (eso es
"**innovation theater**") o tomando medidas para intentar reformar sus
comportamientos burocráticos (eso es "process theater"). En cambio, lo que las
organizaciones necesitan es una **Doctrina de Innovación** que aborde la
cultura, la mentalidad, el proceso y oriente los esfuerzos de la organización
para lograr innovaciones reales.

## Agile contra la realidad

- ¿Cómo de compatibles son los principios de entorno colaborativo con el
  rendimiento?

  Además del evidente intercambio de conocimientos que da paso al aprendizaje
  individual y grupal, un entorno colaborativo ofrece muchos otros beneficios
  que impactan positivamente al rendimiento de la empresa como por ejemplo
  fortalecer los lazos de cooperación entre los integrantes

  > El trabajo cooperativo requiere ciertos retos y actitudes para superar las
  > desventajas que tiene y convertirse así en una forma exitosa de
  > organización.

  Existen ciertas trabas que acentúan los inconvenientes del trabajo
  colaborativo. Al igual que ocurre en el trabajo en equipo, la relación entre
  compañeros puede ser complicada por la incompatibilidad de personalidades o
  por una posible competición entre ellos. Por ejemplo si la colaboración no es
  un éxito supondrá un malgasto de recursos y perjudicará a las personas y la
  organización.

- ¿Si Agile es tan bueno por qué hay proyectos qué aún usan Waterfall?

  Sencillo, no vas a encontrar peor metodología que un Agile mal implementado.
  El Agile mal implementado te puede traer costos excesivos de desarrollo,
  implementación de tecnologías no sustentables para los equipos internos,
  cambios constantes y falta de documentación necesaria para el futuro. Es así
  como muchas caen en el “innovation theather”.
