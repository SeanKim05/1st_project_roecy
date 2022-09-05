import './ItemContainer.scss';
import { useNavigate } from 'react-router-dom';

export default function ItemContainer({ id, img, name, rate, price }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  };

  function starRate() {
    if (rate == 5) return '★★★★★';
    if (rate == 4) return '★★★★☆';
    if (rate == 3) return '★★★☆☆';
    if (rate == 2) return '★★☆☆☆';
    if (rate == 1) return '★☆☆☆☆';
    else return '☆☆☆☆☆';
  }

  const navigate = useNavigate();
  return (
    <div className="items_container">
      <div
        className="item_container flex_center"
        onClick={() => {
          navigate(`/product/detail/${id}`);
          scrollToTop();
        }}
      >
        <img src={img} alt={name} className="img" />
        <div className="name flex_center">{name}</div>
        <div className="rate">{starRate()}</div>
        <div className="price">$ {price.toLocaleString()}</div>
      </div>
    </div>
  );
}
