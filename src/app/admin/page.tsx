import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { prisma } from '@/db/db';
import { formatCurrency, formatNumber } from '@/lib/formatters';

async function getSalesData() {
  const data = await prisma.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);
  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
}
async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    prisma.product.count({
      where: {
        isAvailableForPurchose: true,
      },
    }),
    prisma.product.count({
      where: {
        isAvailableForPurchose: false,
      },
    }),
  ]);

  return { activeCount, inactiveCount };
}
const AdminDashBoard = async () => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashBoardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashBoardCard
        title="Costumers"
        subtitle={`${formatCurrency(
          userData.averageValuePerUser
        )} Average Value`}
        body={`${formatNumber(userData.userCount)}`}
      />
      <DashBoardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
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
