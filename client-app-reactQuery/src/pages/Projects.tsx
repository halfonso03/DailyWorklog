/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function get() {
      const response = await axios.get('http://localhost:5000/api/project');
      setProjects(response.data);
    }

    get();
  }, []);

  return (
    <div className='text-white'>
      {projects.map((project: any) => (
        <div key={project.name}>{project.name}</div>
      ))}
    </div>
  );
}
