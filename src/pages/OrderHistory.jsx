import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Empty, Pagination, TabBar } from '../components/commons';
import {
  OrderHistoryByDateDiv,
  OrderHistoryPageButton,
} from '../components/orderHistory';
import { getData } from '../util';

function OrderHistory() {
  const { admin } = useSelector((state) => state.authReducer);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(
    new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10)
  );

  const render = () => {
    getData(admin ? `/admin/orders?page=${page}&date=${date}` : `/orders/user`)
      .then((res) => {
        setTotalPages(res?.pageInfo?.totalPages);
        let data = admin ? res.data : res;
        let filterByDateObj = data.reduce((acc, cur) => {
          let orderDate = cur.createdAt.slice(0, 10);
          acc[orderDate] ? acc[orderDate].push(cur) : (acc[orderDate] = [cur]);
          return acc;
        }, {});

        let filterByDateArr = [];
        for (let date in filterByDateObj) {
          filterByDateArr.push({ date, orders: filterByDateObj[date] });
        }

        return filterByDateArr;
      })
      .then((data) => {
        setData(data);
      });
  };

  // 관리자
  const dateHandler = (e) => setDate(e.target.value);
  const adminGetOrderHistory = () => (page === 1 ? render() : setPage(1));
  const changePage = (page) => () => setPage(page);

  useEffect(() => {
    render();
  }, [page, admin, totalPages]);

  return (
    <OrderHistoryPageWrapper className="margininside">
      <TabBar pathName="Orders">
        <InnerContent>
          {admin && (
            <ManagerMenuDiv>
              <input type="date" onChange={dateHandler} value={date} />
              <OrderHistoryPageButton
                text={'확인'}
                handler={adminGetOrderHistory}
              />
            </ManagerMenuDiv>
          )}
          {!data.length ? (
            <Empty />
          ) : (
            <>
              {data?.map((el) => {
                return (
                  <OrderHistoryByDateDiv key={el.date} ordersPerDate={el} />
                );
              })}
              {admin && (
                <Pagination
                  page={page}
                  totalpage={totalPages}
                  setPage={changePage}
                />
              )}
            </>
          )}
        </InnerContent>
      </TabBar>
    </OrderHistoryPageWrapper>
  );
}

export default OrderHistory;

const ManagerMenuDiv = styled.div`
  display: flex;
  align-items: center;
  > *:not(:last-child) {
    margin-right: 10px;

    @media (max-width: 480px) {
      margin-right: 8px;
    }
  }
`;

const OrderHistoryPageWrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 5rem - 50px);
  flex-direction: column;
`;

const InnerContent = styled.div`
  width: 80%;
  padding-bottom: 4rem;
`;
