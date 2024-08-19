import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const AdminDashBoard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashBoardCard title="Sales" subtitle="text" body="body" />
      <DashBoardCard title="Costumers" subtitle="text" body="body" />
      <DashBoardCard title="Products" subtitle="text" body="body" />
    </div>
  );
};

export default AdminDashBoard;

type DashBoardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

function DashBoardCard({ title, subtitle, body }: DashBoardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
