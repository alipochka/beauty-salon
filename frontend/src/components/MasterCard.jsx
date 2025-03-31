import '../styles/components.css';

const MasterCard = ({ master }) => {
  return (
    <div className="master-card">
      <img src={master.photo} alt={master.name} />
      <h3>{master.name}</h3>
      <p className="specialization">{master.specialization}</p>
      <p className="experience">Опыт: {master.experience} лет</p>
      <div className="master-rating">
        Рейтинг: {master.rating}/5
      </div>
    </div>
  );
};

export default MasterCard;