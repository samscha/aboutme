import React, { useState, useEffect } from 'react';
import './Home.scss';

export default ({
  IconsBy,
  Loading,
  LocationMarker,
  Project,
  TechIcon,
  projects,
  techs,
}) => {
  const HomePage = () => {
    const apiBaseUri = process.env.REACT_APP_API_BASE_URL;

    const [skills, setSkills] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
      let ignore = false;

      setLocation(null);

      fetch(`${apiBaseUri}/v1/location`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (!ignore) {
            setLocation(data.location);
          }
        })
        .catch((err) => {
          console.warn('error getting location. using backup location', err);
          if (!ignore) {
            setLocation(backupLocation());
          }
        });

      return () => {
        ignore = true;
      };
    }, []);

    useEffect(() => {
      let ignore = false;

      setSkills(null);

      fetch(`${apiBaseUri}/v1/skills`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (!ignore) {
            setSkills(data);
          }
        })
        .catch((err) => {
          console.warn('error getting skills. using backup techs', err);
          if (!ignore) {
            setSkills(backupTechs(techs));
          }
        });

      return () => {
        ignore = true;
      };
    }, []);

    const filteredProjects = projects.filter((p) => p.enabled);
    const showProjects = JSON.parse(
      process.env.REACT_APP_SHOW_PROJECTS || 'false'
    );

    return (
      <div className="homepage">
        {skills && location ? (
          <React.Fragment>
            <LocationMarker location={location} />

            {skills.primarySkills.length === 0 &&
              skills.secondarySkills.length === 0 && (
                <div className="technology-container">
                  <div className="technology-bar">
                    <div key="no-skills-key" className="technology-bar__icon">
                      <TechIcon
                        {...{
                          icon: [`far`, `file`],
                          link: `#`,
                          text: `No Skills`,
                          title: 'No technical skills to show',
                          type: 'fa',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

            {skills.primarySkills.length > 0 && (
              <div className="technology-container">
                <div className="technology-bar">
                  {skills.primarySkills.map((tech) => (
                    <div key={tech.link} className="technology-bar__icon">
                      <TechIcon
                        {...tech}
                        size="xs"
                        className={tech.text.length > 10 ? 'xl' : ''}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skills.secondarySkills.length > 0 && (
              <div className="technology-container">
                <div className="technology-bar secondary">
                  {skills.secondarySkills.map((tech) => (
                    <div key={tech.link} className="technology-bar__icon">
                      <TechIcon {...tech} text="" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showProjects ? (
              <div className="projects">
                <div className="title">Projects</div>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <div key={project.name} className="project-container">
                      <Project {...project} />
                    </div>
                  ))
                ) : (
                  <div className="no-projects-title">No Projects To Show</div>
                )}
              </div>
            ) : null}

            <IconsBy fa fz />
          </React.Fragment>
        ) : (
          <Loading />
        )}
      </div>
    );
  };

  return HomePage;
};

const backupTechs = (techs) => {
  const primaryTechs = techs
    .filter((t) => t.set === 'primary' && t.enabled)
    .sort((a, b) => {
      a = a.text.toUpperCase();
      b = b.text.toUpperCase();

      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  const secondaryTechs = techs
    .filter((t) => t.set === 'secondary' && t.enabled)
    .sort((a, b) => {
      a = a.text.toUpperCase();
      b = b.text.toUpperCase();

      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

  return {
    primarySkills: primaryTechs,
    secondarySkills: secondaryTechs,
  };
};

const backupLocation = () => {
  return 'Austin, TX';
};
