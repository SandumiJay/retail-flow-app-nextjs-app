"use client";
import { useRouter } from 'next/navigation';
export default function SuppliersLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const router = useRouter();  
    return (
      
      <div className="bg-white-100 h-screen flex justify-start items-start">
        <div className="flex w-16 flex-col  h-screen items-center space-y-10 py-2 bg-purple-200">
  
          <div className="space-y-48 w-20 h-screen rounded-md bg-purple-700">
            <ul>
              {/* <li className="p-5"  onClick={() => router.push('inventory')} >
               <img src="/Warehouse-1--Streamline-Core-Remix.svg"></img>
              </li> */}
             <li className="p-5">
  <a href="/Inventory/Products">
    <img src="/Shopping-Basket-2--Streamline-Sharp-Remix.svg" alt="Products" />
  </a>
</li>
<li className="p-5">
  <a href="/Inventory/ProductCategories">
    <img src="/Tag--Streamline-Flex.svg" alt="Product Categories" />
  </a>
</li>
<li className="p-5">
  <a href="/Inventory/PurchaseOrder">
    <img src="/Shopping-Cart-Download--Streamline-Ultimate.svg" alt="Purchase Order" />
  </a>
</li>
<li className="p-5">
  <a href="/Inventory//Suppliers">
    <img src="/Business-Product-Supplier-1--Streamline-Freehand.svg" alt="Suppliers" />
  </a>
</li>
            </ul>
            
          </div>
        </div>
  
        <section className="flex w-full">
          {/* Main Content Area */}
          <div className="xl:ml-50 xl:pl-0 xl:w-full xl:flex xl:flex-col mt-5 mx-2">
            {children}
          </div>
        </section>
      </div>
    );
  }