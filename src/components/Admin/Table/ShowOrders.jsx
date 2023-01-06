import { Table } from "antd";
import { useEffect } from "react";

import useOrder from "../../../services/api/useOrder";

const ShowOrders = () => {
  const { updateOrder, getAllOrders, orders, status } = useOrder();

  useEffect(() => {
    getAllOrders();
  }, [status]);

  const acceptData = (data) => {
    const payload = {
      status: "ACCEPT",
      userId: data.userId,
      paymentId: data.paymentId,
      scheduleId: data.scheduleId,
      travelerListId: data.travelerListId,
    };
    updateOrder(data.orderId, payload);
  };

  const canceledData = (data) => {
    const payload = {
      status: "CANCELED",
      userId: data.userId,
      paymentId: data.paymentId,
      scheduleId: data.scheduleId,
      travelerListId: data.travelerListId,
    };
    updateOrder(data.orderId, payload);
  };

  const columns = [
    {
      title: "Nama Pemesan",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "departureCity",
      dataIndex: "departureCity",
    },
    {
      title: "arrivalCity",
      dataIndex: "arrivalCity",
    },
    {
      title: "status",
      dataIndex: "status",
    },

    {
      title: "Action",
      dataIndex: "",
      render: (_, rec) => (
        <div className="flex gap-x-2">
          <button className="font-semibold text-white px-3 py-2 bg-[#52c41a] rounded-lg" onClick={() => acceptData(rec)}>
            Accept
          </button>
          <button className="font-semibold text-white px-3 py-2 bg-[#db053f] rounded-lg" onClick={() => canceledData(rec)}>
            Canceled
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={orders} columns={columns} />;
    </>
  );
};

export default ShowOrders;
