import '../styles/components.css';

const ServiceCard = ({ service }) => {
  return (
    <div className="service-card">
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <div className="service-details">
        <span className="price">{service.price} ₽</span>
        <span className="duration">{service.duration} мин</span>
      </div>
    </div>
  );
};

export default ServiceCard;