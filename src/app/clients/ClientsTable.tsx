"use client";

import { Button } from "@/components/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn-ui/table";
import { deleteClient } from "@/utils/helpers/deleteClient";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { User } from "./[client]/page";
import { Badge } from "@/components/shadcn-ui/badge";

interface ClientDataProps {
  id: number;
  created_at: string;
  firstName: string;
  lastName: string;
  middleInital: string;
  weight: number;
  height: number;
  phoneNumber: string;
  activeClientStatus: boolean;
  nextSession: string;
  currentPTM: string;
  totalSessions: string;
  firstSession: string;
  clientPicture: string;
  clientId: string;
  username: string;
  schedule: {}[];
  description: string;
  bodyFatPercentage: number;
  clientEmail: string;
  age: string;
  DOB: string;
}
const ClientsTable = ({ data }: ClientDataProps[]) => {
  const [clientList, setClientList] = useState<User[]>(data);
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const handleDelteClient = async (clientId: string) => {
    try {
      const updatedClients = await deleteClient(clientId);
      setClientList(updatedClients);
      setShouldFetch((prev) => !prev);
    } catch (error) {
      console.error("Error deleting client", error);
    }
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Package type</TableHead>
            <TableHead className="hidden md:table-cell">
              Total sessions
            </TableHead>
            <TableHead className="hidden md:table-cell">
              Date PT started
            </TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientList?.map((client, index) => (
            <TableRow key={index}>
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={client?.clientPicture || "/images/Ichigo.jpeg"}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">
                {client.firstName} {client.lastName}
              </TableCell>
              <TableCell>
                <Badge
                  variant={client?.activeClientStatus ? "outline" : "secondary"}
                >
                  {client?.activeClientStatus ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>{client?.currentPTM}</TableCell>
              <TableCell className="hidden md:table-cell">
                {client?.totalSessions}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {client?.firstSession}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <Link href={`/clients/${client.clientId}`}>
                      <DropdownMenuItem>View</DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem
                      onClick={() => handleDelteClient(client.clientId)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ClientsTable;
