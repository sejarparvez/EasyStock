'use client';

import { AlertTriangle, Clock, Package, Plus, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Mock data
const inventoryData = [
  { name: 'Jan', items: 120 },
  { name: 'Feb', items: 150 },
  { name: 'Mar', items: 130 },
  { name: 'Apr', items: 180 },
  { name: 'May', items: 160 },
  { name: 'Jun', items: 200 },
];

const categoryData = [
  { name: 'Window Glass', value: 450 },
  { name: 'Door Glass', value: 320 },
  { name: 'Decorative', value: 280 },
  { name: 'Safety Glass', value: 200 },
];

const lowStockItems = [
  { id: 1, name: 'Tempered Glass 5mm', stock: 8, threshold: 20 },
  { id: 2, name: 'Frosted Glass 3mm', stock: 5, threshold: 15 },
  { id: 3, name: 'Clear Glass 8mm', stock: 12, threshold: 30 },
];

const recentActivity = [
  {
    id: 1,
    action: 'Added',
    item: 'Window Glass 10mm',
    quantity: 50,
    time: '2 hours ago',
  },
  {
    id: 2,
    action: 'Removed',
    item: 'Door Glass 6mm',
    quantity: 15,
    time: '4 hours ago',
  },
  {
    id: 3,
    action: 'Updated',
    item: 'Safety Glass 5mm',
    quantity: 25,
    time: '1 day ago',
  },
  {
    id: 4,
    action: 'Added',
    item: 'Decorative Glass',
    quantity: 30,
    time: '2 days ago',
  },
];

export default function DashboardPage() {
  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <div className='border-b bg-card '>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-foreground'>
                Dashboard
              </h1>
              <p className='text-sm text-muted-foreground mt-1'>
                Welcome back to easystock
              </p>
            </div>
            <Link href='/products/add'>
              <Button className='w-full sm:w-auto' variant='outline'>
                <Plus className='h-4 w-4 mr-2' />
                Add Product
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
        {/* Key Metrics */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Total Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center justify-between'>
                <div className='text-3xl font-bold'>1,250</div>
                <Package className='h-8 w-8 text-primary opacity-20' />
              </div>
              <p className='text-xs text-muted-foreground mt-2'>
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Low Stock Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center justify-between'>
                <div className='text-3xl font-bold text-amber-600'>3</div>
                <AlertTriangle className='h-8 w-8 text-amber-500 opacity-20' />
              </div>
              <p className='text-xs text-muted-foreground mt-2'>
                Need attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center justify-between'>
                <div className='text-3xl font-bold'>4</div>
                <TrendingUp className='h-8 w-8 text-green-500 opacity-20' />
              </div>
              <p className='text-xs text-muted-foreground mt-2'>
                Product categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Last Updated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center justify-between'>
                <div className='text-sm font-semibold'>Just now</div>
                <Clock className='h-8 w-8 text-blue-500 opacity-20' />
              </div>
              <p className='text-xs text-muted-foreground mt-2'>
                Real-time updates
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Low Stock */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
          {/* Inventory Trend */}
          <Card className='lg:col-span-2'>
            <CardHeader>
              <CardTitle>Inventory Trend</CardTitle>
              <CardDescription>
                Total items over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='w-full h-64 sm:h-80'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={inventoryData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type='monotone'
                      dataKey='items'
                      stroke='#3b82f6'
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Alert */}
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Alert</CardTitle>
              <CardDescription>Items below threshold</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {lowStockItems.map((item) => (
                  <div key={item.id} className='space-y-1'>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm font-medium truncate'>
                        {item.name}
                      </p>
                      <span className='text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded'>
                        {item.stock}/{item.threshold}
                      </span>
                    </div>
                    <div className='w-full bg-muted rounded-full h-2'>
                      <div
                        className='bg-amber-500 h-2 rounded-full'
                        style={{
                          width: `${(item.stock / item.threshold) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href='/products'>
                <Button variant='outline' className='w-full mt-4'>
                  View All Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Category Distribution and Recent Activity */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Items by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='w-full h-64 sm:h-80'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis
                      dataKey='name'
                      angle={-45}
                      textAnchor='end'
                      height={80}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey='value' fill='#3b82f6' />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest inventory changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4 max-h-80 overflow-y-auto'>
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className='flex items-start gap-3 pb-4 border-b last:border-0'
                  >
                    <div className='mt-1'>
                      <div className='h-2 w-2 rounded-full bg-primary mt-1.5'></div>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium'>
                        <span className='text-primary'>{activity.action}</span>{' '}
                        - {activity.item}
                      </p>
                      <p className='text-xs text-muted-foreground mt-1'>
                        Quantity: {activity.quantity} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
