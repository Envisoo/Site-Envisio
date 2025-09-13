import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <div>
      <h1>Página Inicial</h1>
      <Link to="/cursos">Ver Cursos</Link>
    </div>
  );
}