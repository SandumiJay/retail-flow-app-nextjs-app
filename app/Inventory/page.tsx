"use client";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Inventory() {
  const router = useRouter();   

  const list = [
    // {
    //   title: "Inventory",
    //   img: "/Warehouse-1--Streamline-Core-Remix.svg",
    //   href: 'Inventory/inventory',
    // },
    {
      title: "Products",
      img: "/Shopping-Basket-2--Streamline-Sharp-Remix.svg",
      href: 'Inventory/Products',
    },
    {
      title: "Product Categories",
      img: "/Tag--Streamline-Flex.svg",
      href: 'Inventory/ProductCategories',
    },
    {
      title: "Purchase Order",
      img: "/Shopping-Cart-Download--Streamline-Ultimate.svg",
      href: 'Inventory/PurchaseOrder',
    },
    // {
    //   title: "Supplier",
    //   img: "/Business-Product-Supplier-1--Streamline-Freehand.svg",
    //   href: 'Inventory/Suppliers',
    // },
  ];

  return (
<div className="container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2">
  <h1 className="text-center text-4xl md:text-5xl pb-12 pt-40">Inventory</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
    {list.map((item, index) => (
      <div 
        key={index} 
        className="relative group h-[350px] sm:h-[400px] md:h-[450px] flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
      >
        <div className="gap-2 grid grid-cols-1 h-full w-full pt-5">
          <Card 
            radius="lg" 
            isPressable 
            className="absolute top-10 left-1/2 transform -translate-x-1/2 z-20 w-[90%] h-[70%] md:h-[75%] bg-purple-500 rounded-xl flex items-center justify-center"
            onClick={() => router.push(item.href)}
          >
            <CardBody className="flex justify-center items-center">
              <Image
                radius="sm"
                width="100%"
                alt={`Image for ${item.title}`}
                className="object-cover h-[140px] sm:h-[160px] md:h-[180px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small text-center text-white justify-center">
              <b>{item.title}</b>
            </CardFooter>
          </Card>

          {/* <div className="pt-40 text-center">
            <p className="text-xl sm:text-lg font-semibold leading-snug tracking-normal text-gray-800 text-center">
              {item.title}
            </p> */}
          {/* </div> */}
        </div>
      </div>
    ))}
  </div>
</div>
  );
}
