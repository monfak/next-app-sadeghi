'use client';

import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { GetSignleProduct } from '../../../../services/product';
import ValidationError from '../../../../exceptions/validationError';
import EditProductForm from '../../../../forms/admin/product/editProductForm';
import CanAccess from '../../../../components/shared/canAccess';


const ProductEdit = ({ params }: any) => {
    const router = useRouter();
    // get the product with productId
    const { data , error } = useSWR({ url : `/admin/products/${params.productId}/edit` , productId : params.productId} , GetSignleProduct );

    const isLoading = !data && !error;

    // if the product is not exists return 404 , redirect to products admin page
    if( error instanceof ValidationError) {
        router.push('/admin/products');
        return <></>;
    }

    return (
        <CanAccess permissions='edit_product'>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">ویرایش محصول</h1>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                {
                                    isLoading
                                    ? <span>Loading ...</span>
                                    : <EditProductForm product={data.product} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CanAccess>
    )
}


export default ProductEdit;