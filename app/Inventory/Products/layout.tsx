"use client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/Inventory/Products", imgSrc: "/Shopping-Basket-2--Streamline-Sharp-Remix.svg", alt: "Products" },
  { href: "/Inventory/ProductCategories", imgSrc: "/Tag--Streamline-Flex.svg", alt: "Product Categories" },
  { href: "/Inventory/PurchaseOrder", imgSrc: "/Shopping-Cart-Download--Streamline-Ultimate.svg", alt: "Purchase Order" },
  { href: "/suppliers", imgSrc: "/Business-Product-Supplier-1--Streamline-Freehand.svg", alt: "suppliers" },
];

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="bg-white-100 h-screen flex justify-start items-start">
      {/* Sidebar Navigation */}
      <div className="flex w-16 flex-col h-screen items-center space-y-10 py-2 bg-purple-200">
        <div className="space-y-48 w-20 h-screen rounded-md bg-purple-700">
          <ul>
            {navItems.map((item, index) => (
              <li
                className="p-5 hover:bg-purple-300 active:bg-purple-400 transition duration-200"
                key={index}
              >
                <a href={item.href}>
                  <img
                    src={item.imgSrc}
                    alt={item.alt}
                    onError={(e) => (e.currentTarget.src = "/fallback-image.svg")}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="flex w-full">
        <div className="xl:ml-50 xl:pl-0 xl:w-full xl:flex xl:flex-col mt-5 mx-2">
          {children}
        </div>
      </section>
    </div>
  );
}