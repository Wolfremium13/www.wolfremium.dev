import { VscGithub } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { Card } from "@/components/page/Card";
import { SocialMediaButton } from "@/components/navigation/SocialMediaButton";
import { socialLinks } from "@/data/constants/socialLinks";

export default function Contact() {
  return (
    <>
      <div className="flex items-center justify-center">
        <section className="w-full max-w-4xl">
          <Card>
            <div className="p-8 space-y-6">
              <div className="flex justify-center space-x-4 mb-8">
                <SocialMediaButton
                  href={socialLinks.youtube}
                  icon={<IoLogoYoutube size={27} />}
                  label="Youtube"
                  classes="hover:text-lightViolet"
                />
                <SocialMediaButton
                  href={socialLinks.github}
                  icon={<VscGithub size={27} />}
                  label="Github"
                  classes="hover:text-lightViolet"
                />
                <SocialMediaButton
                  href={socialLinks.linkedIn}
                  icon={<FaLinkedin size={27} />}
                  label="Linkedin"
                  classes="hover:text-lightViolet"
                />
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

                <section
                  id="email-section"
                  className="p-4 bg-darkViolet rounded shadow-md"
                >
                  <h2 className="text-xl font-bold text-lightGreen">Email</h2>
                  <p>
                    Si quieres contactar conmigo puedes hacerlo a través de mi
                    correo electrónico.
                  </p>
                  <a
                    href={`mailto:${socialLinks.gmail}`}
                    className="text-mediumViolet hover:text-lightGreen"
                  >
                    {socialLinks.gmail}
                  </a>
                </section>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
}
