"use client";
import Card from "@/core/shared/ui/components/Card";
const AboutMeSections = [
    {
        id: 1,
        content: (
            <>
                <h1 className="text-2xl md:text-4xl font-bold mb-4">
                    ¡Hola! Soy Kevin Hierro, pero puedes llamarme Wolfremium.
                </h1>
                <p className="text-lg mb-4">
                    Soy un artesano del software con experiencia en la creación de aplicaciones web e ingeniería de
                    datos.
                    Mi amor por el Nestea y la programación me ha llevado a adquirir habilidades en una variedad de
                    lenguajes y
                    tecnologías, incluyendo Python, TypeScript, Java, React y Scala.
                </p>
            </>
        ),
    },
    {
        id: 2,
        content: (
            <p className="text-lg mb-4">
                A lo largo de mi carrera, he tenido la oportunidad de asistir a multitud de eventos, lo que me ha
                permitido
                desarrollar soluciones eficientes y escalables. Mi curiosidad insaciable me ha llevado a explorar el
                fascinante
                mundo de la inteligencia artificial y el Agile Testing, áreas en las que estoy ansioso por profundizar y
                expandir
                mis conocimientos.
            </p>
        ),
    },
    {
        id: 3,
        content: (
            <>
                <p className="text-lg mb-4">
                    En mi tiempo libre, disfruto contribuyendo a la comunidad de código abierto. Puedes echar un vistazo
                    a algunos
                    de mis proyectos en mi{" "}
                    <a href="https://github.com/Wolfremium13" className="text-blue-500 underline">
                        perfil de Github
                    </a>
                    . Cada proyecto que emprendo es un viaje de aprendizaje y una oportunidad para mejorar y
                    perfeccionar mis
                    habilidades.
                </p>
                <p className="text-lg">
                    Actualmente, tengo el placer de ser parte del equipo de Leanmind, donde trabajo con un grupo de
                    personas
                    increíblemente talentosas y apasionadas por lo que hacen.
                </p>
            </>
        ),
    },
];

const AboutMe = () => {
    return (
        <>
            <section className={"relative z-10 mt-10"}>
                <Card>
                    <div className="flex flex-col items-center justify-center gap-8 p-8">
                        {AboutMeSections.map((section) => (
                            <div key={section.id} className={"text-left"}>
                                {section.content}
                            </div>
                        ))}
                    </div>
                </Card>
            </section>
            <section className={"bg-kakashi-svg bg-center bg-cover bg-no-repeat min-h-screen absolute w-screen top-8 brightness-50 blur-sm max-w-screen"}/>
        </>
    );
};

export default AboutMe;
