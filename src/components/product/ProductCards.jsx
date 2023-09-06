import styled from 'styled-components';
import ProductLi from './ProductLi';
import { Cards } from '../allboxes';

function ProductCards({ admin, sortedFirstPage, data, getData }) {
  const noData = data?.length === 0;

  return (
    <Products>
      {admin && (sortedFirstPage || noData) && (
        <ProductLi admin={admin} reload={getData} />
      )}
      {!noData &&
        data.map((product) => (
          <ProductLi
            key={product.productId}
            product={product}
            admin={admin}
            reload={getData}
          />
        ))}
    </Products>
  );
}

export default ProductCards;

const Products = styled(Cards)`
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 2vw;
`;
