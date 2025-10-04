"use client"

import { getImagePath } from "@/src/utils"
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary"
import Image from "next/image"
import { useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"


export default function ImageUpload({ image }: { image: string | undefined }) {

    const [imageUrl, setImageUrl] = useState('')

    return (
        <CldUploadWidget
            onSuccess={(result: CloudinaryUploadWidgetResults, { widget }: { widget: { close: () => void } }) => {
                if (result.event === 'success') {
                    widget.close()

                    // @ts-expect-error
                    const url = result.info?.secureUrl
                    if (url) setImageUrl(url)
                }
            }}
            uploadPreset="tlakoibf"
            options={{
                maxFiles: 1,
            }}
        >
            {({ open }) => (
                <>
                    <div className="space-y-2">
                        <label className="text-slate-800"> Imagen Producto</label>
                        <div className="mt-5 relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
                            onClick={() => open()}
                        >
                            <TbPhotoPlus
                                size={50}
                            />
                            <p className="text-lg font-semibold">Agregar Imagen</p>
                            {imageUrl && (
                                <div
                                    className="absolute inset-0 w-full h-full "
                                >
                                    <Image
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        src={imageUrl}
                                        alt="Imagen del producto"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {image && !imageUrl && (
                        <div className="space-y-2">
                            <label className="mb-10 mt-3 block">Imagen Actual:</label>
                            <div className="relative w-[50%] h-70 mx-auto">
                                <Image
                                    fill
                                    src={getImagePath(image)}
                                    alt="Imagen Producto"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    )}

                    <input
                        type="hidden"
                        name="image"
                        defaultValue={imageUrl ? imageUrl : image} />
                </>
            )}
        </CldUploadWidget>
    )
}
