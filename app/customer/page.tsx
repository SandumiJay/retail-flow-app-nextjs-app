"use client";

// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  Button,
  Switch,
  Table,
  Modal,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalContent,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { IconX, IconEdit, IconTrashX } from "@tabler/icons-react";
import API_ENPOINTS from "../API";
import config from "../config";
import { Group } from "@mantine/core";
import { countries } from "../data/Countries";

// Define the Customer interface
interface Customer {
  code: string;
  name: string;
  email: string;
  contact: string;
  address: string;
  city: string;
  country: string;
  status: number;
}

// Main component for the Customer page
export default function CustomerPage() {
  // State management for various functionalities
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [EntryCode, setEntryCode] = useState("");
  const [viewEditItem, setViewEditItem] = useState(false);
  const [viewAddItem, setViewAddItem] = useState(false);
  const [viewDeleteItem, setViewDeleteItem] = useState(false);
  const [keepDialogOpen, setKeepDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formValues, setFormValues] = useState({
    code: "",
    name: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    country: "Sri Lanka",
    status: 0,
  });

  // Function to load customers from the API
  const loadCustomers = async () => {
    try {
      const response = await axios.get(API_ENPOINTS.GET_CUSTOMERS);
      if (Array.isArray(response.data)) {
        setCustomers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to load the entry code for new customers
  const loadEntryCode = async () => {
    try {
      const response = await axios.post(API_ENPOINTS.GET_RECIEPT_ENTRY_CODE, {
        codeType: 5,
      });
      setEntryCode(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle delete confirmation
  const handleDeleteConfirm = (customer: Customer) => () => {
    setEditingCustomer(customer);
    setViewDeleteItem(true);
  };

  // Function to open the edit modal with customer data
  const handleEditViewModal = (customer: Customer) => {
    setViewEditItem(true);
    setEditingCustomer(customer);
    setFormValues({
      code: customer.code,
      name: customer.name,
      email: customer.email,
      contact: customer.contact,
      address: customer.address,
      city: customer.city,
      country: customer.country,
      status: customer.status,
    });
  };

  // Load customers when the component mounts
  useEffect(() => {
    loadCustomers();
  }, []);

  // Function to reset the form values
  const resetForm = () => {
    setFormValues({
      code: "",
      name: "",
      email: "",
      contact: "",
      address: "",
      city: "",
      country: "Sri Lanka",
      status: 0,
    });
  };

  // Function to handle adding a new customer
  const handleCustomerAdd = async (values: typeof formValues) => {
    try {
      await axios.post(API_ENPOINTS.ADD_CUSTOMER, {
        code: EntryCode,
        name: values.name,
        email: values.email,
        contact: values.contact,
        address: values.address,
        city: values.city,
        country: values.country,
        status: 1,
      });
      if (!keepDialogOpen) {
        setViewAddItem(false);
      }
      setEntryCode("");
      resetForm();
      loadCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle updating an existing customer
  const handleUpdateCustomer = async () => {
    try {
      await axios.put(API_ENPOINTS.UPDATE_CUSTOMER, formValues);
      setViewEditItem(false);
      loadCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle input changes in the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Function to proceed with customer deletion
  const handleCustomerDeleteProceed = async () => {
    try {
      await axios.post(API_ENPOINTS.DELETE_CUSTOMER, {
        customers: editingCustomer,
      });
      loadCustomers();
      setViewDeleteItem(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to open the add customer modal
  const handleAddCustomerModal = () => {
    loadEntryCode();
    resetForm();
    setViewAddItem(true);
  };

  return (
    <div>
      <div className="sticky top-0 overflow-hidden h-fit w-full items-center justify-between rounded-t-2xl bg-white px-6 pb-[20px] pt-4 shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
        <h1 className="text-3xl font-bold text-purple-800 dark:text-white">Customers</h1>
        <button
          className="absolute top-4 right-1 linear rounded-[20px] bg-purple-400 px-6 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-purple-500 active:bg-purple-500 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
          onClick={() => {
            onOpen();
            handleAddCustomerModal();
          }}
        >
          Add New Customer
        </button>
      </div>

      <div className=" flex w-screen px-10 ">
        <Table className="text-center w-full max-h-[700px]">
          <TableHeader className="sticky top-0 overflow-hidden w-full mb-4">
            <TableColumn  className="p-4 w-1/7">Customer Code</TableColumn>
            <TableColumn  className="p-4 w-1/7">Customer Name</TableColumn>
            <TableColumn  className="p-4 w-1/7">Email</TableColumn>
            <TableColumn  className="p-4 w-1/7">Contact</TableColumn>
            <TableColumn  className="p-4 w-1/7">Address</TableColumn>
            <TableColumn  className="p-4 w-1/7">City</TableColumn>
            <TableColumn  className="p-4 w-1/7">Country</TableColumn>
            <TableColumn  className="p-4 w-1/7" children={undefined}></TableColumn>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.code}>
                <TableCell>{customer.code}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.contact}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.city}</TableCell>
                <TableCell>{customer.country}</TableCell>
                <TableCell>
                  <div className="grid gap-4 grid-cols-2">
                    <Button onClick={() => handleEditViewModal(customer)}>
                      <IconEdit />
                    </Button>
                    <Button color="secondary" onClick={handleDeleteConfirm(customer)}>
                      <IconTrashX />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Customer Modal */}
      <Modal isOpen={viewAddItem} onOpenChange={() => setViewAddItem(false)}>
        <ModalContent>
          <ModalHeader>Add New Customer</ModalHeader>
          <ModalBody>
            <Input label="Customer Name" name="name" value={formValues.name} onChange={handleInputChange} />
            <Input label="Email" name="email" value={formValues.email} onChange={handleInputChange} />
            <Input label="Phone" name="contact" value={formValues.contact} onChange={handleInputChange} />
            <Input label="Address" name="address" value={formValues.address} onChange={handleInputChange} />
            <Input label="City" name="city" value={formValues.city} onChange={handleInputChange} />
            <Select
              label="Country"
              placeholder="select country"
              defaultSelectedKeys={formValues.country}
              items={countries}
              onChange={(e) => setFormValues({ ...formValues, country: e.target.value })}
              className="flex flex-col gap-1 pb-4"
            >
                   {countries.map((country) => (
        <SelectItem key={country.value}>
          {country.label}
        </SelectItem>
      ))}
                </Select>
            {/* <Input label="Country" name="country" value={formValues.country} onChange={handleInputChange} /> */}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleCustomerAdd(formValues)}>Save</Button>
            <Button color="secondary" onClick={() => setViewAddItem(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Customer Modal */}
<Modal isOpen={viewEditItem} onOpenChange={() => setViewEditItem(false)}>
  <ModalContent>
    <ModalHeader>Edit Customer</ModalHeader>
    <ModalBody>
      <Input
        label="Customer Name"
        name="name"
        value={formValues.name}
        onChange={handleInputChange}
      />
      <Input
        label="Email"
        name="email"
        value={formValues.email}
        onChange={handleInputChange}
      />
      <Input
        label="Phone"
        name="contact"
        value={formValues.contact}
        onChange={handleInputChange}
      />
      <Input
        label="Address"
        name="address"
        value={formValues.address}
        onChange={handleInputChange}
      />
      <Input
        label="City"
        name="city"
        value={formValues.city}
        onChange={handleInputChange}
      />
     <Select
              label="Country"
              placeholder="select country"
              defaultSelectedKeys={[formValues.country]}
              items={countries}
              onChange={(e) => setFormValues({ ...formValues, country: e.target.value })}
              className="flex flex-col gap-1 pb-4"
            >
                   {countries.map((country) => (
        <SelectItem key={country.value}>
          {country.label}
        </SelectItem>
      ))}
                </Select>
    </ModalBody>
    <ModalFooter>
      <Button onClick={handleUpdateCustomer} color="default">
        Update
      </Button>
      <Button color="secondary" onClick={() => setViewEditItem(false)}>
        Cancel
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

      {/* Delete Customer Modal */}
      <Modal isOpen={viewDeleteItem} onOpenChange={() => setViewDeleteItem(false)}>
        <ModalContent>
          <ModalBody>
            <p>Are you sure you want to delete {editingCustomer?.name}?</p>
            <div>
              <Button onClick={() => setViewDeleteItem(false)} color="default">Close</Button>
              <Button onClick={handleCustomerDeleteProceed} color="secondary">Delete</Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
