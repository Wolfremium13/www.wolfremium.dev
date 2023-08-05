import { VscGithub } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { Card } from "@/components/page/Card";

export default function Contact() {
  return (
    <>
      <div className="flex items-center justify-center">
        <section className="w-full max-w-4xl">
          <Card>
            <div className="p-8 space-y-6">
              <div className="flex justify-center space-x-4 mb-8">
                <a
                  href="#github-section"
                  className="bookmark hover:text-lightViolet"
                  title={"Github"}
                >
                  <VscGithub size={27} />
                </a>
                <a
                  href="#linkedin-section"
                  className="bookmark hover:text-lightViolet"
                  title={"Linkedin"}
                >
                  <FaLinkedin size={27} />
                </a>
                <a
                  href="#youtube-section"
                  className="bookmark hover:text-lightViolet"
                  title={"Youtube"}
                >
                  <IoLogoYoutube size={27} />
                </a>
              </div>

              <div className="flex flex-col justify-center content-center space-y-4">
                <section
                  id="github-section"
                  className="p-4 bg-darkViolet rounded shadow-md"
                >
                  <h2 className="text-xl font-bold text-lightGreen">Github</h2>
                  <p>
                    Subo ejercicios de programación y proyectos personales a mi
                    cuenta, suelo practicar TDD y Clean Code.
                  </p>
                </section>

                <section
                  id="linkedin-section"
                  className="p-4 bg-darkViolet rounded shadow-md"
                >
                  <h2 className="text-xl font-bold text-lightGreen">
                    Linkedin
                  </h2>
                  <p>
                    Suelo recomendar publicaciones interesantes acerca de
                    testing Lean Mind u otras personas de influencia.
                  </p>
                </section>

                <section
                  id="youtube-section"
                  className="p-4 bg-darkViolet rounded shadow-md"
                >
                  <h2 className="text-xl font-bold text-lightGreen">Youtube</h2>
                  <p>
                    No hago contenido con regularidad pero hay alguna cosa
                    interesante.
                  </p>
                </section>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
}
