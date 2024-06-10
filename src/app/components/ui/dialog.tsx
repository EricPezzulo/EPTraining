"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import React, { useRef, useState } from "react";
import { users } from "../../../../mockDb";
import { v4 as uuidv4 } from "uuid";
import { DialogClose } from "@radix-ui/react-dialog";

interface ChildProps {
  setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>
}

const DialogBox:React.FC<ChildProps> =({setShouldFetch}) => {
  const [loading, setLoading] = useState<Boolean>(false);

  const newClientInfo = useRef<{
    firstName: string;
    lastName: string;
    username: string;
  }>({
    firstName: "",
    lastName: "",
    username: "",
  });

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
    };

    try{
      const response = await fetch('../api/addClient', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dataToPost)
      }) 
      if(!response.ok) {
        throw new Error("Error posting data")
      }
      setShouldFetch((prev)=> !prev)
      const result = await response.json()
      console.log("Data posted successfully", result.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
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
            <Button onClick={()=> addClient} type="button">
              {loading ? "Adding...": "Add Client"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogBox;