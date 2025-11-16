'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const categories = ['Window Glass', 'Door Glass', 'Safety Glass', 'Decorative'];

export default function AddProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0],
    description: '',
    stock: '',
    threshold: '',
    price: '',
    sku: '',
    dimensions: '',
    notes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Add product submission logic
    setTimeout(() => {
      setIsLoading(false);
      router.push('/products');
    }, 1000);
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <div className='border-b bg-card sticky top-0 z-10'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
          <div className='flex items-center gap-4'>
            <Link href='/products'>
              <Button variant='ghost' size='icon'>
                <ArrowLeft className='h-4 w-4' />
              </Button>
            </Link>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-foreground'>
                Add Product
              </h1>
              <p className='text-sm text-muted-foreground mt-1'>
                Add a new glass product to your inventory
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
            <CardDescription>
              Fill in all the details for your new product
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Basic Information */}
              <div className='space-y-4'>
                <h3 className='font-semibold text-foreground'>
                  Basic Information
                </h3>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label htmlFor='name' className='text-sm font-medium'>
                      Product Name *
                    </label>
                    <Input
                      id='name'
                      name='name'
                      type='text'
                      placeholder='e.g., Clear Glass 5mm'
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <label htmlFor='sku' className='text-sm font-medium'>
                      SKU
                    </label>
                    <Input
                      id='sku'
                      name='sku'
                      type='text'
                      placeholder='e.g., CG-5MM-001'
                      value={formData.sku}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label htmlFor='category' className='text-sm font-medium'>
                      Category *
                    </label>
                    <select
                      id='category'
                      name='category'
                      value={formData.category}
                      onChange={handleChange}
                      className='w-full px-3 py-2 border border-input rounded-md bg-background text-sm'
                      required
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='space-y-2'>
                    <label htmlFor='dimensions' className='text-sm font-medium'>
                      Dimensions
                    </label>
                    <Input
                      id='dimensions'
                      name='dimensions'
                      type='text'
                      placeholder='e.g., 1000x2000x5mm'
                      value={formData.dimensions}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label htmlFor='description' className='text-sm font-medium'>
                    Description
                  </label>
                  <textarea
                    id='description'
                    name='description'
                    placeholder='Add product description...'
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className='w-full px-3 py-2 border border-input rounded-md bg-background text-sm resize-none'
                  />
                </div>
              </div>

              {/* Inventory Information */}
              <div className='space-y-4 pt-4 border-t'>
                <h3 className='font-semibold text-foreground'>
                  Inventory Information
                </h3>

                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  <div className='space-y-2'>
                    <label htmlFor='stock' className='text-sm font-medium'>
                      Stock Quantity *
                    </label>
                    <Input
                      id='stock'
                      name='stock'
                      type='number'
                      placeholder='0'
                      value={formData.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <label htmlFor='threshold' className='text-sm font-medium'>
                      Low Stock Threshold *
                    </label>
                    <Input
                      id='threshold'
                      name='threshold'
                      type='number'
                      placeholder='Minimum stock level'
                      value={formData.threshold}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <label htmlFor='price' className='text-sm font-medium'>
                      Price ($) *
                    </label>
                    <Input
                      id='price'
                      name='price'
                      type='number'
                      step='0.01'
                      placeholder='0.00'
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label htmlFor='notes' className='text-sm font-medium'>
                    Additional Notes
                  </label>
                  <textarea
                    id='notes'
                    name='notes'
                    placeholder='Add any additional notes about this product...'
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className='w-full px-3 py-2 border border-input rounded-md bg-background text-sm resize-none'
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className='flex flex-col sm:flex-row gap-3 pt-6 border-t'>
                <Link href='/products' className='sm:order-2'>
                  <Button variant='outline' className='w-full'>
                    Cancel
                  </Button>
                </Link>
                <Button
                  type='submit'
                  className='w-full sm:order-1'
                  disabled={isLoading}
                >
                  {isLoading ? 'Adding Product...' : 'Add Product'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
