'use client';

import CreateProductForm from '@/components/forms/admin/products/createProductForm';
import { useRouter , useSearchParams } from 'next/navigation';


const ProductCreate = () => {
    const router = useRouter();

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">ایجاد محصولات</h1>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <CreateProductForm router={router} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCreate;