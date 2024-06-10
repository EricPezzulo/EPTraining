export function classnames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface ClientRowType {
  user: {
    firstName: string;
    lastName: string;
    middleInitial: string;
    age: number;
    weight: number | null;
    height: string;
    phoneNumber: string;
    activeClientStatus: boolean;
    nextSession: string | null;
  };
  index: number;
}

const ClientRow = ({ user, index }: ClientRowType) => {
  console.log(index);
  return (
    <div
      className={classnames(
        "grid grid-cols-4 px-2 py-1 first:rounded-t last:rounded-b",
        index % 2 === 0 ? "bg-white" : " bg-slate-100",
      )}
    >
      <li>
        {user.firstName} {user.lastName}
      </li>
      <li>{user.phoneNumber}</li>
      <li className="flex items-center">
        {user.activeClientStatus ? (
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        ) : (
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
        )}
      </li>
      <li>{user.nextSession ? user.nextSession : "Unscheduled"}</li>
    </div>
  );
};

export default ClientRow;
