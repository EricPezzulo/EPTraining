"use client";
import { Button } from "@/components/shadcn-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn-ui/dialog";
import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import { PlusCircle } from "lucide-react";
import React, { useRef, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { ClientDataProps, ClientListProps } from "@/types/types";
import {
  ClientListProvider,
  useData,
} from "@/utils/contexts/clientListContext";

export interface AddClientProps {
  clients: ClientDataProps[];
}

const AddClientDialogBoxWrapper: React.FC<{ clients: AddClientProps }> = ({
  clients,
}) => {
  return (
    <ClientListProvider initialData={clients}>
      <AddClientDialogBox  />
    </ClientListProvider>
  );
};
const AddClientDialogBox: React.FC<AddClientProps> = ({ clients }) => {
  const { data: clientData } = useData();
  const [loading, setLoading] = useState<boolean>(false);
  // const [shouldFetch, setShouldFetch ] = useState<boolean>(false);
  const newClientInfo = useRef<{
    firstName: string;
    lastName: string;
    username: string;
  }>({
    firstName: "",
    lastName: "",
    username: "",
  });
  // console.log(clients)
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    newClientInfo.current.firstName = e.target.value;
  };
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    newClientInfo.current.lastName = e.target.value;
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    newClientInfo.current.username = e.target.value;
  };

  const addClient = async () => {
    setLoading(true);
    const dataToPost = {
      firstName: newClientInfo.current.firstName,
      lastName: newClientInfo.current.lastName,
      username: newClientInfo.current.username,
    };

    try {
      const response = await fetch("/api/addClient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToPost),
      });
      if (!response.ok) {
        throw new Error("Error posting data");
      }

      const data = await response.json();

      const result = data.data[0];
      clientData.push(result);
      console.log("Data posted successfully", result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-7 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            New Client
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Client</DialogTitle>
          <DialogDescription>
            Add a new client here. Click add when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First name
            </Label>
            <Input
              id="firstNameInput"
              onChange={handleFirstNameChange}
              defaultValue="Pedro"
              className="col-span-3"
            />
            <Label htmlFor="lastNameInput" className="text-right">
              Last name
            </Label>
            <Input
              onChange={handleLastNameChange}
              id="lastNameInput"
              defaultValue="Daurte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              onChange={handleUsernameChange}
              id="usernameInput"
              defaultValue="peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={addClient} type="button">
              {loading ? "Adding..." : "Add Client"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientDialogBox;
