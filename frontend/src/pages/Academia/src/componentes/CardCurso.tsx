interface CardCursoProps {
  titulo: string;
  descricao: string;
}

export default function CardCurso({ titulo, descricao }: CardCursoProps) {
  return (
    <div className="card-curso">
      <h3>{titulo}</h3>
      <p>{descricao}</p>
    </div>
  );
}