"use client";
import { useRouter } from "next/navigation";
import {
  act,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/shadcn-ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn-ui/breadcrumb";
import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";
import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn-ui/table";
import { Textarea } from "@/components/shadcn-ui/textarea";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/shadcn-ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shadcn-ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Sidebar from "@/components/custom-ui/Sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn-ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { deleteClient } from "@/utils/helpers/deleteClient";
import { notFound } from "next/navigation";
type Session = {
  sessionType: string;
  sessionDate: string;
};

type Schedule = {
  sessions: Session[];
};
export type User = {
  firstName: string;
  lastName: string;
  middleInitial: string;
  description: string;
  clientEmail: string | null;
  age: number | null;
  DOB?: string | undefined;
  bodyFatPercentage: number | null;
  weight: number | null;
  height: string | null;
  phoneNumber: string | null;
  activeClientStatus: boolean;
  nextSession: string | null;
  currentPTM: string;
  schedule?: Schedule[];
  totalSessions: number;
  firstSession: string;
  clientPicture: string;
  clientId: string;
};

interface Params {
  client: string;
}
interface ClientPageProps {
  params: Params;
}
// type ClientRefType = {
//   phoneNumber: string | null;
//   firstName: string | null;
//   lastName: string | null;
//   description: string | null;
// };
const ClientPage: React.FC<ClientPageProps> = ({ params }) => {
  const [client, setClient] = useState<User | null>(null);
  const [clientRemoved, setClientRemoved] = useState<boolean>(false);
  const clientId = params.client;
  const router = useRouter();
  const phoneNumber = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const [activeStatus, setActiveStatus] = useState<boolean | null>(null);
  const updatedStatus = useRef<boolean | null>(true);
  const weight = useRef<HTMLInputElement>(null);
  const height = useRef<HTMLInputElement>(null);
  const bodyFatPercentage = useRef<HTMLInputElement>(null);
  const clientEmail = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const DOB = useRef<HTMLInputElement>(null);
  const displayDate = useRef<HTMLInputElement>(null);
  const dbSendDate = useRef<string>(null);
  const fetchData = useCallback(
    async (clientId: string) => {
      try {
        const res = await fetch(`/clients/[client]/api?clientId=${clientId}`);

        const data = await res.json();
        if (data.error) {
          return router.push("/404");
        }
        setClient(data);

        // if (displayDate.current)
        //   displayDate.current.value = convertDateToDisplayFormat(data.DOB);
        if (name.current)
          name.current.value = `${data.firstName} ${data.lastName}`;
        if (phoneNumber.current) phoneNumber.current.value = data.phoneNumber;
        if (description.current) description.current.value = data.description;
        if (weight.current) weight.current.value = data.weight;
        if (height.current) height.current.value = data.height;
        if (age.current) age.current.value = data.age;
        if (DOB.current) DOB.current.value = data.DOB;
        if (bodyFatPercentage.current) {
          bodyFatPercentage.current.value = data.bodyFatPercentage;
        }
        if (clientEmail.current) clientEmail.current.value = data.clientEmail;

        setActiveStatus(data.activeClientStatus);
      } catch (error) {
        console.error("There was a problem fetching the data", error);
      }
    },
    [router],
  );

  useEffect(() => {
    fetchData(clientId);
  }, [clientId, fetchData]);

  const handleRemoveClient = async (clientId: string) => {
    try {
      const updatedClient = await deleteClient(clientId);
      setClientRemoved(true);
      setClient(updatedClient);
      router.push("/clients");
    } catch (error) {
      console.error("Error deleting client", error);
    }
  };
  if (clientRemoved) {
    return (
      client && (
        <div>
          {client.firstName} {client.lastName} has been removed
        </div>
      )
    );
  }

  const updateClientInfo = async () => {
    try {
      const res = await fetch(`/clients/${clientId}/api`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phoneNumber.current?.value,
          name: name.current?.value,
          description: description.current?.value,
          activeClientStatus: updatedStatus.current,
          height: height.current?.value,
          weight: weight.current?.value,
          bodyFatPercentage: bodyFatPercentage.current?.value,
          clientId,
          age: age.current?.value,
          clientEmail: clientEmail.current?.value,
          DOB: dbSendDate.current,
        }),
      });

      if (!res.ok) {
        console.error("There was an interal server error");
      }
      fetchData(clientId);
    } catch (error) {
      console.error("There was an issue updating the phone number.");
    }
  };
  const handleClientActiveStatusChange = async (newValue: string) => {
    if (newValue === "true") {
      updatedStatus.current = true;
      setActiveStatus(true);
    } else if (newValue === "false") {
      updatedStatus.current = false;
      setActiveStatus(false);
    }
  };

  // add loading skeleton here
  if (client === null) {
    return <div>loading...</div>;
  }

  const convertDateToDisplayFormat = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${month}-${day}-${year}`;
  };
  const convertDateToDbFormat = (dateString: string) => {
    const [month, day, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };
  if (displayDate.current && client.DOB)
    displayDate.current.value = convertDateToDisplayFormat(client.DOB);
  // TODO: figure out how to send back the YYYY/MM/DD format to the db  when updating.
  console.log(dbSendDate);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/clients/">Clients</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{`${client.firstName} ${client.lastName}`}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src={client?.clientPicture || "/images/Ichigo.jpeg"}
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full object-cover"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link href="/clients/">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>

              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {client.firstName} {client.lastName}
              </h1>
              <Badge
                variant={activeStatus ? "outline" : "secondary"}
                className="ml-auto sm:ml-0"
              >
                {activeStatus ? "Active" : "Inactive"}
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">Remove</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure you want to remove {client.firstName}{" "}
                        {client.lastName}?
                      </DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        remove {client.firstName} {client.lastName} from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => handleRemoveClient(client.clientId)}
                      >
                        Yes
                      </Button>

                      <Button>No</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button size="sm" onClick={updateClientInfo}>
                  Save
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Client Information</CardTitle>
                    <CardDescription>
                      Name, contact information, and a goal or short
                      description.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          ref={name}
                          defaultValue={`${client.firstName} ${client.lastName}`}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="client-email">Email</Label>
                        <Input
                          type="text"
                          id="client-email"
                          ref={clientEmail}
                          className="w-full"
                          defaultValue={client.clientEmail || "(999)999-9999"}
                        />
                      </div>
                      <div className=" grid gap-3">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          type="text"
                          id="phoneNumber"
                          ref={phoneNumber}
                          className="w-fill"
                          defaultValue={client.phoneNumber?.toString()}
                        />
                      <div className=" grid gap-3">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          type="text"
                          id="phoneNumber"
                          ref={phoneNumber}
                          className="w-fill"
                          defaultValue={client.phoneNumber?.toString()}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          ref={description}
                          defaultValue={client?.description}
                          className="min-h-32"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="client-age">Age</Label>
                          <Input
                            type="text"
                            id="client-age"
                            ref={age}
                            className="w-fill"
                            // defaultValue='Hi'
                            placeholder="0"
                            // defaultValue={age.current === null ? "unknown" : client.age?.toString()}
                          />
                        </div>
                        <div>
                          <Label htmlFor="dob">Date Of Birth</Label>
                          <Input
                            type="text"
                            id="dob"
                            ref={displayDate}
                            className="w-fill"
                            placeholder="YYYY/MM/DD"
                            defaultValue={client.DOB}
                          />
                        </div>
                      </div>
                      {/* <Button onClick={updateClientInfo}>Update</Button> */}
                    </div>
                  </CardContent>
                </Card>{" "}
                <Card>
                  <CardHeader>
                    <CardTitle>Client Stats</CardTitle>
                  </CardHeader>{" "}
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="client-weight">Body Weight</Label>
                        <Input
                          ref={weight}
                          defaultValue={client.weight?.toString()}
                          id="client-weight"
                          type="text"
                          className="w-full"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="client-height">Height</Label>
                        <Input
                          ref={height}
                          defaultValue={client.height?.toString() || "0"}
                          className="w-full"
                          id="client-height"
                          type="text"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="bf%">Body Fat Percentage</Label>
                        <Input
                          defaultValue={
                            client.bodyFatPercentage?.toString() || "0"
                          }
                          ref={bodyFatPercentage}
                          className="w-full"
                          id="bf%"
                          type="text"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Workout Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                    <button type='button' className='rounded-md justify-start flex flex-col p-5 border-2 border-slate-100'>
                        <p>Date: 7/12/24</p>
                        <p>Time: N/A</p>
                        <div className="flex">
                          <p className="w-auto">PT Session: </p>
                          <p className="w-auto">No</p>
                        </div>
                        <div className='flex flex-col items-start'>
                          <p>Barbell Bench Press 3x10</p>
                          <p>Back Squat 3x6</p>
                          <p>Preacher Curls 3x10</p>
                          <p>OverHead Shoulder Press 2x8</p>
                        </div>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Active Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          defaultValue={client.activeClientStatus?.toString()}
                          onValueChange={handleClientActiveStatusChange}
                        >
                          <SelectTrigger id="status" aria-label="Select status">
                            <SelectValue
                              placeholder={
                                client.activeClientStatus === true
                                  ? "Active"
                                  : "Inactive"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Active</SelectItem>
                            <SelectItem value="false">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card x-chunk="dashboard-07-chunk-5">
                  <CardHeader>
                    <CardTitle>Client Progress Pictures</CardTitle>
                    <CardDescription>
                      Progress pictures are a great way to track visable changes
                      over time.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" variant="secondary">
                      Upload Picture
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Product</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default ClientPage;
