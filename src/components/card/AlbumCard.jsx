import Card from "components/card";
import img from "../../assets/img/thumbnail.jpg";
import CardMenu from "./CardMenu";

const AlbumCard = ({ name, image, extra, alt, id, slug, getData, username, price }) => {
  return (
    <>
      <div className="cursor-pointer">
        <Card
          extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
        >
          <div className="h-full w-full">
            <div className="mb-4 flex justify-end">
              <CardMenu slug={slug} getData={getData} title={name} id={id} />
            </div>
            <div className="relative w-full">
              <img
                src={!image ? img : image}
                className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
                alt={alt}
              />
            </div>

            <div className="flex w-full justify-between">
              <p className="w-72 overflow-hidden text-ellipsis whitespace-nowrap text-left text-lg font-bold text-navy-700 dark:text-white lg:w-52 ">
                {" "}
                {name}{" "}
              </p>
             
            </div>
            <p className="w-72 overflow-hidden text-ellipsis whitespace-nowrap text-left text-lg font-medium text-navy-700 dark:text-white lg:w-52 ">
              {" "}
              {username}{" "}
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AlbumCard;
