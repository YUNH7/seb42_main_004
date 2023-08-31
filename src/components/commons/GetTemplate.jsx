import { HelmetTitle, Loading } from '.';
import { Error } from '../../pages';

function GetTemplate({ isPending, error, res, children, title }) {
  return (
    <>
      {title && <HelmetTitle title={title} />}
      {isPending ? <Loading /> : error ? <Error /> : res ? children : <Error />}
    </>
  );
}

export default GetTemplate;
