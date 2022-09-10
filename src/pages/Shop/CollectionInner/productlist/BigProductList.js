import './bigproductlist.scss';
import { useNavigate } from 'react-router-dom';

function ProductList(props) {
  const { goodsdata, id } = props;
  const navigate = useNavigate();
  const rating = goodsdata.rating;

  let starnumber;
  if (rating === '1') {
    starnumber = <img className="big_star_img" src="./image/rating/1.jpg" />;
  } else if (rating === '2') {
    starnumber = <img className="big_star_img" src="./image/rating/2.jpg" />;
  } else if (rating === '3') {
    starnumber = <img className="big_star_img" src="./image/rating/3.jpg" />;
  } else if (rating === '4') {
    starnumber = <img className="big_star_img" src="./image/rating/4.jpg" />;
  } else if (rating === '5') {
    starnumber = <img className="big_star_img" src="./image/rating/5.jpg" />;
  }

  const goDetail = () => {
    navigate(`/product/detail/${id}`);
  };

  return (
    <div className="big_product_wrapper">
      <div className="big_product">
        <div id="big_goods_img_wrapper" onClick={goDetail}>
          <img id="big_goods_img" src={goodsdata.photos} />
        </div>
        <div className="big_product_name" onClick={goDetail}>
          {goodsdata.name}
        </div>
        <div className="big_star">{starnumber}</div>
        <div id="big_product_price">${goodsdata.price}</div>
      </div>
    </div>
  );
}

export default ProductList;
