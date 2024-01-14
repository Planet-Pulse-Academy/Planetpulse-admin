import React from "react";
import DevelopmentTable from "./components/ComponentTable";
import { columnsDataDevelopment } from "./variables/columnsData";

export default function Account() {
  const [data, setData] = React.useState({
    loading: false,
    error: false,
    data: [
      {
        products_id: "05053131",
        title: "Jam",
        image:
          "https://e7.pngegg.com/pngimages/495/486/png-clipart-watches-watches.png",
        desc: "Lorem ipsum dolor",
        price: 15000,
        category: "Electronic"
      },
      {
        products_id: "05053131",
        title: "Jam",
        image:
          "https://e7.pngegg.com/pngimages/495/486/png-clipart-watches-watches.png",
        desc: "Lorem ipsum dolor",
        price: 15000,
        category: "Electronic"

      },
      {
        products_id: "05053131",
        title: "Jam",
        image:
          "https://e7.pngegg.com/pngimages/495/486/png-clipart-watches-watches.png",
        desc: "Lorem ipsum dolor",
        price: 15000,
        category: "Electronic"

      },
      {
        products_id: "05053131",
        title: "Jam",
        image:
          "https://e7.pngegg.com/pngimages/495/486/png-clipart-watches-watches.png",
        desc: "Lorem ipsum dolor",
        price: 15000,
        category: "Electronic"

      },
    ],
  });
  return (
    <div className="mt-5 h-full">
      <DevelopmentTable header={columnsDataDevelopment} data={data} />
    </div>
  );
}
