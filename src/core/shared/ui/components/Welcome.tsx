import Image from "next/image";
import profilePic from "../../../../../public/layout/personal-image-with-kevlin.webp";
import Card from "@/core/shared/ui/components/Card";

const Welcome = () => {
    return (
        <Card>
            <section className="flex flex-col xl:flex-row items-center justify-center gap-8 p-8">
                <div className="w-full xl:w-1/2 max-w-xl">
                    <Image
                        src={profilePic}
                        alt="Kevin Hierro"
                        className="rounded-full p-1 bg-gradient-to-tr from-lightGreen  to-mediumViolet"
                        placeholder="blur"
                    />
                </div>
                <div className="w-full xl:w-1/2 text-center xl:text-left">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4">
                        ¡Hola! Soy Kevin Hierro, pero puedes llamarme Wolfremium.
                    </h1>
                    <p className="text-lg mb-4">
                        Soy un artesano del software con experiencia en la creación de
                        aplicaciones web e ingeniería de datos. Mi amor por el Nestea y la
                        programación me ha llevado a adquirir habilidades en una variedad de
                        lenguajes y tecnologías, incluyendo Python, TypeScript, Java, React
                        y Scala.
                    </p>
                    <p className="text-lg mb-4">
                        A lo largo de mi carrera, he tenido la oportunidad de asistir a
                        multitud de eventos, lo que me ha permitido desarrollar soluciones
                        eficientes y escalables. Mi curiosidad insaciable me ha llevado a
                        explorar el fascinante mundo de la inteligencia artificial y el
                        Agile Testing, áreas en las que estoy ansioso por profundizar y
                        expandir mis conocimientos.
                    </p>
                    <p className="text-lg mb-4">
                        En mi tiempo libre, disfruto contribuyendo a la comunidad de código
                        abierto. Puedes echar un vistazo a algunos de mis proyectos en mi{" "}
                        <a
                            href="https://github.com/Wolfremium13"
                            className="text-blue-500 underline"
                        >
                            perfil de Github
                        </a>
                        . Cada proyecto que emprendo es un viaje de aprendizaje y una
                        oportunidad para mejorar y perfeccionar mis habilidades.
                    </p>
                    <p className="text-lg mb-4">
                        Actualmente, tengo el placer de ser parte del equipo de Leanmind,
                        donde trabajo con un grupo de personas increíblemente talentosas y
                        apasionadas por lo que hacen.
                    </p>
                    <p className="text-lg">
                        Si tienes alguna pregunta, idea de proyecto o simplemente quieres
                        charlar sobre tecnología, ¡no dudes en ponerte en contacto conmigo!
                    </p>
                </div>
            </section>
        </Card>
    );
};

export default Welcome;