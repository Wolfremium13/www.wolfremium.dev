import {Section} from "@/app/shared/components/Section";
import {Press_Start_2P} from "next/font/google";

const pressFont = Press_Start_2P({weight: "400", subsets: ["latin"]});
export default function HomePage() {
    const AboutMeSections = [
        {
            id: 1,
            content: (
                <>
                    <h1 className={`text-2xl md:text-4xl font-bold mb-4 ${pressFont.className} text-lightGreen`}>
                        ¡Hola!
                    </h1>
                    <p className="text-lg mb-4">
                        Me llamo Kevin Hierro, aunque prefiero que me llames Wolfremium porque mi habilidad para
                        desenterrar
                        bugs es tan misteriosa como un lobo acechando en la oscuridad. Mi devoción por el Nestea solo es
                        eclipsada por mi pasión por llevar el código al borde del colapso emocional, utilizando Chsarp
                        como
                        mi herramienta de tortura preferida. Este pasatiempo es considerablemente más entretenido que
                        intentar encontrar sentido en una reunión de desarrolladores JavaScript discutiendo sobre
                        semicolons.
                    </p>
                </>
            ),
        },
        {
            id: 2,
            content: (
                <p className="text-lg mb-4">
                    En mi tiempo libre, me transformo en un ninja del código, erradicando bugs y depurando sistemas con
                    una destreza que haría palidecer a cualquier cirujano. Trabajo en Lean Mind, rodeado de otros
                    apasionados por la tecnología que comparten mi misión de transformar la anarquía de datos en obras
                    maestras funcionales. Entre sesiones de codificación intensas y debates sobre las últimas tendencias
                    en
                    programación, afinamos nuestras herramientas para prepararnos para los desafíos que la tecnología
                    nos
                    reserve. Si alguna vez te preguntas cómo hacer que tu código se comporte o simplemente quieres
                    discutir
                    la belleza oculta de una función recursiva bien escrita, ¡aquí estoy!
                </p>
            ),
        },
    ];
    return (
        <>
            <section className={"relative z-10 mt-10"}>
                <Section>
                    <div className="flex flex-col items-center justify-center gap-8 p-8">
                        {AboutMeSections.map((section) => (
                            <div key={section.id} className={"text-left"}>
                                {section.content}
                            </div>
                        ))}
                    </div>
                </Section>
            </section>
            <section
                className={"invisible lg:visible bg-kakashi-svg bg-center bg-cover bg-no-repeat min-h-screen absolute w-full top-8 brightness-50 blur-sm max-w-screen overflow-x-hidden"}/>
        </>
    );
}
