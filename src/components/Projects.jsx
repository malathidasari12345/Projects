import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoMdBookmark } from "react-icons/io";

const Projects = () => {
  const user = useSelector(state => state.user?.user);
  const mail = user?.email;
  const projects = useSelector(state => state.projects?.projects);
  const searchTerm = useSelector(state => state.searchTerm?.searchTerm || "");
  const [filter, setFilter] = useState(null);
  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    if (projects) {
      // Filter projects based on search term
      if (searchTerm.length > 0) {
        setFilter(
          projects.filter(project => {
            const lowercaseItem = project.title.toLowerCase();
            return searchTerm.toLowerCase().split("").every(letter => lowercaseItem.includes(letter));
          })
        );
      } else {
        setFilter(null);
      }
    }
  }, [searchTerm, projects]);

  useEffect(() => {
    if (projects && user) {
      // Filter projects based on the user associated with each project
      const filteredProjects = projects.filter(project => project.user.email === mail);
      setUserProjects(filteredProjects);
    }
  }, [projects, user, mail]);

  if (!projects) {
    return <p>Loading...</p>;
  }

  if (userProjects.length === 0) {
    return <h1 style={{color:"white", textAlign:"center", marginTop:"150px"}}>No projects available.</h1>;
  }

  const displayedProjects = filter || userProjects;

  return (
    <div className="w-full py-6 flex flex-wrap items-center justify-center gap-6 overflow-auto" style={{ maxHeight: '80vh' }}>
      {displayedProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const projectUser = project.user;

  return (
    <div
      className="w-full cursor-pointer md:w-[350px] h-[300px] bg-secondary rounded-md p-4 flex flex-col items-center justify-center gap-3"
    >
      {/* Display output */}
      <div className="bg-primary w-full h-full rounded-md overflow-hidden">
        <iframe
          title="Result"
          srcDoc={project.output}
          style={{ border: "none", width: "100%", height: "100%" }}
        />
      </div>
      
      {/* Title and user details */}
      <div className="flex items-center justify-start gap-3 w-full mt-3">
        {projectUser?.photoURL ? (
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={projectUser.photoURL}
            alt={projectUser.displayName || 'User'}
            referrerPolicy="no-referrer"
          />
        ) : (
          <p className="text-xl text-white font-semibold bg-gray-600 rounded-full w-10 h-10 flex items-center justify-center">
            {projectUser?.email[0].toUpperCase()}
          </p>
        )}
        {/* Title of project */}
        <div>
          <p className="text-white text-lg capitalize">
            {project?.title}
          </p>

          <p className='text-primaryText text-sm capitalize'>
            {projectUser?.displayName
              ? projectUser.displayName
              : `${projectUser?.email.split("@")[0]}`}
          </p>
        </div>
        <div className='cursor-pointer ml-auto'>
          <IoMdBookmark className="text-primaryText text-3xl" /> 
        </div>
      </div>
    </div>
  );
};

export default Projects;
