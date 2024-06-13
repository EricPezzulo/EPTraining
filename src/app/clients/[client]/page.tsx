"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/shadcn-ui/sheet";
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
  age: number;
  DOB?: string | undefined;
  weight: number | null;
  height: string;
  phoneNumber: string;
  activeClientStatus: boolean;
  nextSession: string | null;
  currentPTM: string;
  schedule?: Schedule[];
  totalSessions: number;
  firstSession: string;
  clientPicture: string;
  clientId: string;
};
type Client = {
  address: {
    city: string;
  };
  geo: {
    lat: string;
    lng: string;
  };
  street: string;
  suite: string;
  zipcode: string;
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
};
export default function ClientPage() {
  const pathname = usePathname();
  const clientId = pathname.split("/")[2];
  const [user, setUser] = useState<User | null>(null);
  const [clientData, setClientData] = useState<Client | null>(null);
  const [sendData, setSendData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (clientId: string) => {
      try {
        const res = await fetch(`/clients/[client]/api?clientId=${clientId}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("There was a problem fetching the data", error);
      }
    };
    fetchData(clientId);
  }, [clientId]);

  async function postRequest() {
    const res = fetch("http://localhost:3000/clients/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    });
  }
  async function handleRemoveClient() {
    // const
  }
  return (
    user && (
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
                  <BreadcrumbPage>{`${user.firstName} ${user.lastName}`}</BreadcrumbPage>
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
                    src={user?.clientPicture || "/images/Ichigo.jpeg"}
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
                  {user?.firstName} {user?.lastName}
                </h1>
                <Badge
                  variant={user?.activeClientStatus ? "outline" : "secondary"}
                  className="ml-auto sm:ml-0"
                >
                  {user?.activeClientStatus ? "Active" : "Inactive"}
                </Badge>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">Remove</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Are you sure you want to remove {user?.firstName}{" "}
                          {user?.lastName}?
                        </DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          remove {user?.firstName} {user.lastName} from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center space-x-2">
                        <Button>Yes</Button>
                        <Button>No</Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button size="sm">Save</Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-0">
                    <CardHeader>
                      <CardTitle>Client Information</CardTitle>
                      <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit
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
                            defaultValue={`${user.firstName} ${user.lastName}`}
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                            className="min-h-32"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-1">
                    <CardHeader>
                      <CardTitle>Body Composition Analysis</CardTitle>
                      <CardDescription>
                        The body weight us the sum of Body Fat Mass and Lean
                        Body Mass, which is composed of Dry Lean Mass and Total
                        Body Water.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow className="w-full">
                            <TableHead className="w-full">
                              Body Composition Analysis
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="w-full">
                            <TableCell className="w-full font-semibold ">
                              Total amount of water in body
                            </TableCell>
                            <TableCell className="w-full whitespace-nowrap">
                              <Label
                                htmlFor="total-body-water"
                                className="w-full"
                              >
                                Total Body Water (lbs)
                              </Label>
                            </TableCell>
                            <TableCell className="w-full">
                              <Label
                                htmlFor="total-body-water"
                                className="sr-only"
                              >
                                Total Body Water (lbs)
                              </Label>
                              <Input
                                id="total-body-water"
                                type="number"
                                defaultValue="68"
                                className="w-[75px] text-right"
                              />
                            </TableCell>
                          </TableRow>

                          <TableRow className="w-full">
                            <TableCell className="w-full font-semibold ">
                              For building muscles and strengthening bones
                            </TableCell>
                            <TableCell className="w-full whitespace-nowrap">
                              <Label
                                htmlFor="total-body-water"
                                className="w-full"
                              >
                                Dry Lean Mass (lbs)
                              </Label>
                            </TableCell>
                            <TableCell className="w-full">
                              <Label
                                htmlFor="total-body-water"
                                className="sr-only"
                              >
                                Dry Lean Mass (lbs)
                              </Label>
                              <Input
                                id="total-body-water"
                                type="number"
                                defaultValue="21.6"
                                className="w-[75px] text-right"
                              />
                            </TableCell>
                          </TableRow>

                          <TableRow className="w-full">
                            <TableCell className="w-full font-semibold ">
                              For storing excess energy
                            </TableCell>
                            <TableCell className="w-full whitespace-nowrap">
                              <Label
                                htmlFor="total-body-water"
                                className="w-full"
                              >
                                Body Fat Mass (lbs)
                              </Label>
                            </TableCell>
                            <TableCell className="w-full">
                              <Label
                                htmlFor="total-body-water"
                                className="sr-only"
                              >
                                Body Fat Mass (lbs)
                              </Label>
                              <Input
                                id="total-body-water"
                                type="number"
                                defaultValue="48.7"
                                className="w-[75px] text-right"
                              />
                            </TableCell>
                          </TableRow>

                          <TableRow className="w-full">
                            <TableCell className="w-full font-semibold ">
                              Sum of the above
                            </TableCell>
                            <TableCell className="w-full whitespace-nowrap">
                              <Label
                                htmlFor="total-body-water"
                                className="w-full"
                              >
                                Weight (lbs)
                              </Label>
                            </TableCell>
                            <TableCell className="w-full">
                              <Label
                                htmlFor="total-body-water"
                                className="sr-only"
                              >
                                Weight (lbs)
                              </Label>
                              <Input
                                id="total-body-water"
                                type="number"
                                defaultValue="185"
                                className="w-[75px] text-right"
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>InBody Results</CardTitle>
                      <CardDescription>
                        The InBody results provide a body composition analysis,
                        obesity analysis, muscle-fat analysis, and segmental
                        lean analysis. This is an effective way to track a
                        clients progress.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <div className="grid gap-2">
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="300"
                            src="/placeholder.svg"
                            width="300"
                          />
                          <div className="grid grid-cols-3 gap-2">
                            <button>
                              <Image
                                alt="Product image"
                                className="aspect-square w-full rounded-md object-cover"
                                height="84"
                                src="/placeholder.svg"
                                width="84"
                              />
                            </button>
                            <button>
                              <Image
                                alt="Product image"
                                className="aspect-square w-full rounded-md object-cover"
                                height="84"
                                src="/placeholder.svg"
                                width="84"
                              />
                            </button>
                            <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                              <Upload className="h-4 w-4 text-muted-foreground" />
                              <span className="sr-only">Upload</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-3">
                    <CardHeader>
                      <CardTitle>Product Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="status">Status</Label>
                          <Select>
                            <SelectTrigger
                              id="status"
                              aria-label="Select status"
                            >
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Active</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className="overflow-hidden"
                    x-chunk="dashboard-07-chunk-4"
                  >
                    <CardHeader>
                      <CardTitle>Product Images</CardTitle>
                      <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <Image
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="300"
                          src="/placeholder.svg"
                          width="300"
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <button>
                            <Image
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              src="/placeholder.svg"
                              width="84"
                            />
                          </button>
                          <button>
                            <Image
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              src="/placeholder.svg"
                              width="84"
                            />
                          </button>
                          <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                            <Upload className="h-4 w-4 text-muted-foreground" />
                            <span className="sr-only">Upload</span>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-5">
                    <CardHeader>
                      <CardTitle>Archive Product</CardTitle>
                      <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div></div>
                      <Button size="sm" variant="secondary">
                        Archive Product
                      </Button>
                    </CardContent>
                  </Card>
                  {/* <Card x-chunk="dashboard-07-chunk-5">
                    <CardHeader>
                      <CardTitle>{user?.name}</CardTitle>
                      <CardDescription>
                        {clientData?.company.catchPhrase}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>

                      <Input
                        onChange={(e) => setSendData(e.target.value)}
                        type="text"
                      />
                      <Button
                        onClick={postRequest}
                        size="sm"
                        variant="secondary"
                        className="mt-5"
                      >
                        Send to API
                      </Button>
                    </CardContent>
                  </Card> */}
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
    )
  );
}
